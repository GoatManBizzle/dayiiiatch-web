export type WorkspaceStatus =
  | "active"
  | "inactive"
  | "pending"
  | "archived"
  | "completed"
  | "draft";

export type ClientRow = {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  company: string | null;
  email: string;
  phone: string | null;
  status: string;
  portal_enabled: boolean;
  notes: string | null;
};

export type ProjectRow = {
  id: string;
  client_id: string | null;
  name: string;
  description: string | null;
  status: string;
  progress: number;
  current_phase: string | null;
  launch_readiness: number;
  created_at: string;
  updated_at: string;
};

export type BookingRow = {
  id: string;
  client_id: string | null;
  service: string;
  date: string;
  time: string;
  status: string;
  notes: string | null;
  created_at: string;
};

export type ApprovalRow = {
  id: string;
  project_id: string | null;
  title: string;
  status: string;
  submitted_at: string;
  approved_at: string | null;
  feedback: string | null;
};

export type ActivityEventRow = {
  id: string;
  client_id: string | null;
  project_id: string | null;
  event_type: string;
  title: string;
  description: string | null;
  created_at: string;
};

export type InvoiceRow = {
  id: string;
  client_id: string | null;
  project_id: string | null;
  invoice_number: string;
  amount: number;
  status: string;
  due_date: string | null;
  paid_date: string | null;
  created_at: string;
};

export type PortalUserRow = {
  id: string;
  client_id: string | null;
  email: string;
  role: string;
  last_login: string | null;
  created_at: string;
};

export type FileRow = {
  id: string;
  client_id: string | null;
  project_id: string | null;
  file_name: string;
  file_type: string | null;
  storage_path: string;
  uploaded_at: string;
};

export type WorkspaceCoreTables = {
  clients: ClientRow;
  projects: ProjectRow;
  bookings: BookingRow;
  approvals: ApprovalRow;
  activity_events: ActivityEventRow;
  invoices: InvoiceRow;
  portal_users: PortalUserRow;
  files: FileRow;
};

export type ClientWithRelationships = ClientRow & {
  projects: ProjectRow[];
  invoices: InvoiceRow[];
  meetings: BookingRow[];
  activity: ActivityEventRow[];
  portal_account: PortalUserRow | null;
  approvals: ApprovalRow[];
};

export type ProjectWithRelationships = ProjectRow & {
  client: ClientRow | null;
  timeline: ActivityEventRow[];
  deliverables: FileRow[];
  approvals: ApprovalRow[];
  invoices: InvoiceRow[];
  activity_events: ActivityEventRow[];
};

export type FutureWorkspaceTables = {
  crm_leads: "Future lead intake and qualification table";
  crm_pipeline: "Future lead/client/project stage movement table";
  messages: "Future client communication thread table";
  notifications: "Future admin and portal notification queue";
  automation_logs: "Future workflow/reminder/system action audit log";
  damarko_ai: "Future AI summaries, risk scores, and recommendations";
};
