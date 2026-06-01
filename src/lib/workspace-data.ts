import { createClient } from "@supabase/supabase-js";

import type {
  ActivityEventRow,
  ApprovalRow,
  BookingRow,
  ClientRow,
  FileRow,
  InvoiceRow,
  PortalUserRow,
  ProjectRow,
} from "@/types/workspace";

type WorkspaceTableName =
  | "clients"
  | "projects"
  | "bookings"
  | "approvals"
  | "activity_events"
  | "invoices"
  | "files"
  | "portal_users";

type WorkspaceRows = {
  clients: ClientRow;
  projects: ProjectRow;
  bookings: BookingRow;
  approvals: ApprovalRow;
  activity_events: ActivityEventRow;
  invoices: InvoiceRow;
  files: FileRow;
  portal_users: PortalUserRow;
};

export type WorkspaceDataSet = {
  clients: ClientRow[];
  projects: ProjectRow[];
  bookings: BookingRow[];
  approvals: ApprovalRow[];
  activityEvents: ActivityEventRow[];
  invoices: InvoiceRow[];
  files: FileRow[];
  portalUsers: PortalUserRow[];
  source: "supabase" | "preview";
  error?: string;
};

export type WorkspaceDataOptions = {
  clientId?: string | null;
};

function getWorkspaceClient() {
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

async function readTable<TName extends WorkspaceTableName>(
  table: TName,
  options: WorkspaceDataOptions = {},
): Promise<{ rows: WorkspaceRows[TName][]; error?: string }> {
  const supabase = getWorkspaceClient();

  if (!supabase) {
    return { rows: [], error: "Supabase environment is not configured." };
  }

  try {
    let query = supabase.from(table).select("*").limit(100);

    if (
      options.clientId &&
      [
        "clients",
        "projects",
        "bookings",
        "activity_events",
        "invoices",
        "files",
        "portal_users",
      ].includes(table)
    ) {
      query =
        table === "clients"
          ? query.eq("id", options.clientId)
          : query.eq("client_id", options.clientId);
    }

    const { data, error } = await query;

    if (error) {
      return { rows: [], error: error.message };
    }

    return { rows: (data ?? []) as WorkspaceRows[TName][] };
  } catch (error) {
    return {
      rows: [],
      error: error instanceof Error ? error.message : "Supabase read failed.",
    };
  }
}

export async function getWorkspaceData(
  options: WorkspaceDataOptions = {},
): Promise<WorkspaceDataSet> {
  const [
    clients,
    projects,
    bookings,
    approvals,
    activityEvents,
    invoices,
    files,
    portalUsers,
  ] = await Promise.all([
    readTable("clients", options),
    readTable("projects", options),
    readTable("bookings", options),
    readTable("approvals"),
    readTable("activity_events", options),
    readTable("invoices", options),
    readTable("files", options),
    readTable("portal_users", options),
  ]);

  const hasRows =
    clients.rows.length > 0 ||
    projects.rows.length > 0 ||
    bookings.rows.length > 0 ||
    approvals.rows.length > 0 ||
    activityEvents.rows.length > 0 ||
    invoices.rows.length > 0 ||
    files.rows.length > 0 ||
    portalUsers.rows.length > 0;

  const firstError = [
    clients.error,
    projects.error,
    bookings.error,
    approvals.error,
    activityEvents.error,
    invoices.error,
    files.error,
    portalUsers.error,
  ].find(Boolean);

  return {
    clients: clients.rows,
    projects: projects.rows,
    bookings: bookings.rows,
    approvals: approvals.rows,
    activityEvents: activityEvents.rows,
    invoices: invoices.rows,
    files: files.rows,
    portalUsers: portalUsers.rows,
    source: hasRows ? "supabase" : "preview",
    error: firstError,
  };
}

export async function getPortalWorkspaceData(options: WorkspaceDataOptions = {}) {
  const data = await getWorkspaceData(options);

  if (!options.clientId || data.projects.length === 0) {
    return data;
  }

  const projectIds = new Set(data.projects.map((project) => project.id));

  return {
    ...data,
    approvals: data.approvals.filter((approval) =>
      approval.project_id ? projectIds.has(approval.project_id) : false,
    ),
  };
}

export async function getAdminCrmWorkspaceData() {
  return getWorkspaceData();
}
