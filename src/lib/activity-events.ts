import { createClient } from "@supabase/supabase-js";

import { createBrowserSupabaseClient } from "@/lib/portal-auth";

export type ActivityEventType =
  | "file_uploaded"
  | "approval_approved"
  | "revision_requested"
  | "approval_rejected"
  | "invoice_created"
  | "invoice_viewed"
  | "payment_started"
  | "payment_completed"
  | "message_sent"
  | "booking_created"
  | "lead_converted"
  | "portal_invite_sent"
  | "booking_rescheduled"
  | "status_updated"
  | "project_updated"
  | "approval"
  | "meeting"
  | "file_upload"
  | "invoice"
  | "timeline"
  | string;

export type ActivityEventRow = {
  id: string;
  client_id: string | null;
  project_id: string | null;
  actor_id: string | null;
  actor_role: string;
  actor_name: string;
  event_type: ActivityEventType;
  title: string;
  description: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
};

export type PortalActivityEvent = {
  id: string;
  eventType: string;
  title: string;
  description: string;
  timestamp: string;
  createdAt: string;
  createdBy: string;
  status: string;
  icon: string;
  relatedProject: string;
  relatedDeliverable: string;
};

export type ActivityEventInput = {
  clientId?: string | null;
  projectId?: string | null;
  actorId?: string | null;
  actorRole?: string;
  actorName?: string;
  eventType: ActivityEventType;
  title: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
};

export type ActivityEventDataSet = {
  events: ActivityEventRow[];
  source: "supabase" | "preview";
  error?: string;
};

function getServerSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return null;
  }

  return createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
    },
  });
}

function safeMetadata(metadata?: Record<string, unknown>) {
  if (!metadata) return {};

  const blockedKeys = [
    "token",
    "secret",
    "password",
    "authorization",
    "card",
    "signedUrl",
    "signed_url",
  ];

  return Object.fromEntries(
    Object.entries(metadata).filter(([key]) => {
      const lowered = key.toLowerCase();
      return !blockedKeys.some((blocked) => lowered.includes(blocked));
    }),
  );
}

export async function createActivityEvent(input: ActivityEventInput) {
  const supabase = createBrowserSupabaseClient();

  if (!supabase || !input.clientId) {
    return { event: null, error: null };
  }

  const { data, error } = await supabase
    .from("activity_events")
    .insert({
      client_id: input.clientId,
      project_id: input.projectId ?? null,
      actor_id: input.actorId ?? null,
      actor_role: input.actorRole ?? "client",
      actor_name: input.actorName ?? "Client",
      event_type: input.eventType,
      title: input.title,
      description: input.description ?? null,
      metadata: safeMetadata(input.metadata),
    })
    .select("*")
    .single();

  return {
    event: (data as ActivityEventRow | null) ?? null,
    error: error?.message ?? null,
  };
}

async function readActivityEvents(
  column: "client_id" | "project_id",
  id?: string | null,
  limit = 50,
): Promise<ActivityEventDataSet> {
  if (!id) {
    return { events: [], source: "preview" };
  }

  const supabase = getServerSupabaseClient();

  if (!supabase) {
    return {
      events: [],
      source: "preview",
      error: "Supabase environment is not configured.",
    };
  }

  try {
    const { data, error } = await supabase
      .from("activity_events")
      .select("*")
      .eq(column, id)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) {
      return { events: [], source: "preview", error: error.message };
    }

    return {
      events: (data ?? []) as ActivityEventRow[],
      source: "supabase",
    };
  } catch (error) {
    return {
      events: [],
      source: "preview",
      error:
        error instanceof Error ? error.message : "Activity event read failed.",
    };
  }
}

export function getActivityEventsByClient(clientId?: string | null, limit = 50) {
  return readActivityEvents("client_id", clientId, limit);
}

export function getActivityEventsByProject(projectId?: string | null, limit = 50) {
  return readActivityEvents("project_id", projectId, limit);
}

function eventTypeLabel(type: string) {
  if (type.includes("approval") || type.includes("revision")) return "Approvals";
  if (type.includes("meeting") || type.includes("booking")) return "Meetings";
  if (type.includes("deliverable")) return "Deliverables";
  if (type.includes("invoice") || type.includes("payment")) return "Invoices";
  if (type.includes("file") || type.includes("upload")) return "Files";
  if (type.includes("timeline") || type.includes("project")) return "Timeline";
  if (type.includes("message")) return "Messages";
  if (type.includes("portal")) return "Portal Access";
  return "Timeline";
}

function statusForType(type: string) {
  if (type.includes("approved") || type.includes("completed")) return "Approved";
  if (type.includes("revision")) return "Needs Revision";
  if (type.includes("rejected")) return "Rejected";
  if (type.includes("payment") || type.includes("invoice")) return "Due Soon";
  if (type.includes("upload") || type.includes("message")) return "New";
  return "Active";
}

function initials(label: string) {
  return label
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

export function mapActivityEventForPortal(
  event: ActivityEventRow,
): PortalActivityEvent {
  const eventType = eventTypeLabel(event.event_type);
  const metadata = event.metadata ?? {};

  return {
    id: event.id,
    eventType,
    title: event.title,
    description: event.description ?? "Workspace activity event.",
    timestamp: new Date(event.created_at).toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }),
    createdAt: event.created_at,
    createdBy: event.actor_name || "Workspace System",
    status:
      typeof metadata.status === "string"
        ? metadata.status
        : statusForType(event.event_type),
    icon: initials(eventType),
    relatedProject:
      typeof metadata.project_name === "string"
        ? metadata.project_name
        : event.project_id ?? "Workspace",
    relatedDeliverable:
      typeof metadata.deliverable_name === "string"
        ? metadata.deliverable_name
        : typeof metadata.record_label === "string"
          ? metadata.record_label
          : "Workspace record",
  };
}

// Future producers should call createActivityEvent for:
// file_uploaded, approval_approved, revision_requested, invoice_viewed,
// payment_started, message_sent, booking_rescheduled, and status_updated.
// Admin pages can hydrate by client_id/project_id using the read helpers above.
