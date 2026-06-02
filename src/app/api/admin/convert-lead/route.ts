import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

import { requireAdminApiAuth } from "@/lib/admin-auth";
import { sendPortalInviteEmail } from "@/lib/portal-invite-email";

const projectStages = [
  "Discovery",
  "Strategy",
  "Build",
  "Review",
  "Launch",
  "Optimization",
];

function isValidEmail(value: string) {
  return /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(value);
}

function getSupabaseAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return null;
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
    },
  });
}

export async function POST(req: NextRequest) {
  const unauthorized = await requireAdminApiAuth();
  if (unauthorized) return unauthorized;

  try {
    const body = (await req.json()) as {
      clientName?: string;
      email?: string;
      company?: string;
      serviceInterest?: string;
      starterProjectName?: string;
      projectType?: string;
      initialPhase?: string;
      portalAccess?: boolean;
      source?: string;
    };

    const clientName = String(body.clientName ?? "").trim();
    const email = String(body.email ?? "").trim().toLowerCase();
    const company = String(body.company ?? "").trim();
    const serviceInterest = String(body.serviceInterest ?? "").trim();
    const starterProjectName = String(body.starterProjectName ?? "").trim();
    const projectType = String(body.projectType ?? serviceInterest).trim();
    const initialPhase = String(body.initialPhase ?? "Discovery").trim();
    const portalAccess = Boolean(body.portalAccess);
    const portalAccessUrl = `${req.nextUrl.origin}/portal/setup?email=${encodeURIComponent(
      email,
    )}`;

    if (
      !clientName ||
      !isValidEmail(email) ||
      !starterProjectName ||
      !projectStages.includes(initialPhase)
    ) {
      return NextResponse.json(
        { error: "Missing or invalid conversion fields." },
        { status: 400 },
      );
    }

    const supabase = getSupabaseAdminClient();

    if (!supabase) {
      return NextResponse.json({
        success: true,
        mode: "simulated",
        inviteStatus: portalAccess ? "Invite Sent" : "Not Requested",
        message:
          "Lead conversion simulated. Portal invite simulated in preview mode.",
      });
    }

    const { data: existingClient, error: clientLookupError } = await supabase
      .from("clients")
      .select("id")
      .ilike("email", email)
      .maybeSingle();

    if (clientLookupError) {
      return NextResponse.json(
        { error: clientLookupError.message },
        { status: 500 },
      );
    }

    let clientId = existingClient?.id as string | undefined;

    if (clientId) {
      const { error: updateClientError } = await supabase
        .from("clients")
        .update({
          name: clientName,
          company: company || null,
          status: "active",
          portal_enabled: portalAccess,
          updated_at: new Date().toISOString(),
        })
        .eq("id", clientId);

      if (updateClientError) {
        return NextResponse.json(
          { error: updateClientError.message },
          { status: 500 },
        );
      }
    } else {
      const { data: newClient, error: createClientError } = await supabase
        .from("clients")
        .insert({
          name: clientName,
          email,
          company: company || null,
          status: "active",
          portal_enabled: portalAccess,
          notes: `Converted from CRM lead. Interest: ${
            serviceInterest || "Not specified"
          }.`,
        })
        .select("id")
        .single();

      if (createClientError) {
        return NextResponse.json(
          { error: createClientError.message },
          { status: 500 },
        );
      }

      clientId = newClient.id;
    }

    const { data: project, error: projectError } = await supabase
      .from("projects")
      .insert({
        client_id: clientId,
        name: starterProjectName,
        description: `Starter ${projectType || "project"} created from CRM lead conversion.`,
        status: "active",
        progress: 0,
        current_phase: initialPhase,
        launch_readiness: 0,
      })
      .select("id")
      .single();

    if (projectError) {
      return NextResponse.json({ error: projectError.message }, { status: 500 });
    }

    let inviteStatus: "Portal Ready" | "Invite Sent" | "Invite Failed" | "Not Requested" =
      portalAccess ? "Portal Ready" : "Not Requested";
    let inviteError = "";

    if (portalAccess) {
      const { error: portalUserError } = await supabase
        .from("portal_users")
        .upsert(
          {
            client_id: clientId,
            email,
            role: "client_owner",
          },
          { onConflict: "email" },
        );

      if (portalUserError) {
        return NextResponse.json(
          { error: portalUserError.message },
          { status: 500 },
        );
      }

      const invite = await sendPortalInviteEmail({
        email,
        name: clientName,
        company,
        portalAccessUrl,
      });

      inviteStatus = invite.sent ? "Invite Sent" : "Invite Failed";
      inviteError = invite.error;

      if (invite.sent) {
        await supabase.from("activity_events").insert({
          client_id: clientId,
          actor_role: "admin",
          actor_name: "DAYIIIatch Admin",
          event_type: "portal_invite_sent",
          title: "Portal invite sent",
          description: `Portal invite sent to ${clientName}.`,
          metadata: {
            email,
            company,
            email_id: invite.emailId,
          },
        });
      }
    }

    const { error: activityError } = await supabase
      .from("activity_events")
      .insert({
        client_id: clientId,
        project_id: project.id,
        actor_role: "admin",
        actor_name: "DAYIIIatch Admin",
        event_type: "lead_converted",
        title: "Lead converted to client",
        description: `Lead converted and starter project "${starterProjectName}" created.`,
        metadata: {
          service_interest: serviceInterest,
          project_type: projectType,
          initial_phase: initialPhase,
          portal_access: portalAccess,
          source: body.source ?? "CRM",
        },
      });

    return NextResponse.json({
      success: true,
      mode: "supabase",
      clientId,
      projectId: project.id,
      portalAccess,
      inviteStatus,
      inviteError: inviteError || null,
      activityWarning: activityError?.message ?? null,
      message: portalAccess
        ? `Lead converted, starter project created, and portal access prepared. ${inviteStatus}.`
        : "Lead converted and starter project created.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Lead conversion failed.",
      },
      { status: 500 },
    );
  }
}
