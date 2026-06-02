import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

import { requireAdminApiAuth } from "@/lib/admin-auth";
import {
  isValidInviteEmail,
  sendPortalInviteEmail,
} from "@/lib/portal-invite-email";

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
      clientId?: string;
      email?: string;
      name?: string;
      company?: string;
      portalAccessUrl?: string;
    };

    const clientId = String(body.clientId ?? "").trim();
    const email = String(body.email ?? "").trim().toLowerCase();
    const name = String(body.name ?? "").trim();
    const company = String(body.company ?? "").trim();
    const portalAccessUrl =
      String(body.portalAccessUrl ?? "").trim() ||
      `${req.nextUrl.origin}/portal/setup?email=${encodeURIComponent(email)}`;

    if (!clientId || !name || !isValidInviteEmail(email)) {
      return NextResponse.json(
        { error: "Missing or invalid portal invite fields." },
        { status: 400 },
      );
    }

    const supabase = getSupabaseAdminClient();

    if (!supabase) {
      return NextResponse.json({
        success: true,
        mode: "simulated",
        invite: {
          sent: true,
          status: "Invite Sent",
        },
        message:
          "Portal invite simulated. Supabase admin credentials are not configured.",
      });
    }

    const invite = await sendPortalInviteEmail({
      email,
      name,
      company,
      portalAccessUrl,
    });

    if (invite.sent) {
      await supabase.from("activity_events").insert({
        client_id: clientId,
        actor_role: "admin",
        actor_name: "DAYIIIatch Admin",
        event_type: "portal_invite_sent",
        title: "Portal invite sent",
        description: `Portal invite sent to ${name}.`,
        metadata: {
          email,
          company,
          email_id: invite.emailId,
        },
      });
    }

    return NextResponse.json({
      success: invite.sent,
      mode: "supabase",
      invite: {
        sent: invite.sent,
        status: invite.sent ? "Invite Sent" : "Invite Failed",
        emailId: invite.emailId,
      },
      error: invite.error || undefined,
      message: invite.sent
        ? "Portal invite sent."
        : "Portal invite failed. Check safe diagnostics.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Portal invite failed.",
      },
      { status: 500 },
    );
  }
}
