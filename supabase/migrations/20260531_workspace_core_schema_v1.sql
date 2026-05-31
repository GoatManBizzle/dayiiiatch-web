-- DAYIIIatch Workspace OS - Supabase Core Schema v1
-- Non-destructive baseline: creates missing tables and adds missing columns.
-- Future RLS: enable per-table policies after Supabase Auth is wired.

create extension if not exists "pgcrypto";

create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  name text not null,
  company text,
  email text not null unique,
  phone text,
  status text not null default 'active',
  portal_enabled boolean not null default false,
  notes text
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references public.clients(id) on delete cascade,
  name text not null,
  description text,
  status text not null default 'active',
  progress integer not null default 0 check (progress >= 0 and progress <= 100),
  current_phase text,
  launch_readiness integer not null default 0 check (launch_readiness >= 0 and launch_readiness <= 100),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references public.clients(id) on delete set null,
  service text not null,
  date date not null,
  time text not null,
  status text not null default 'pending',
  notes text,
  created_at timestamptz not null default now()
);

alter table if exists public.bookings
  add column if not exists client_id uuid references public.clients(id) on delete set null,
  add column if not exists notes text,
  add column if not exists created_at timestamptz not null default now();

create table if not exists public.approvals (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references public.projects(id) on delete cascade,
  title text not null,
  status text not null default 'pending_review',
  submitted_at timestamptz not null default now(),
  approved_at timestamptz,
  feedback text
);

create table if not exists public.activity_events (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references public.clients(id) on delete cascade,
  project_id uuid references public.projects(id) on delete cascade,
  event_type text not null,
  title text not null,
  description text,
  created_at timestamptz not null default now()
);

create table if not exists public.invoices (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references public.clients(id) on delete cascade,
  project_id uuid references public.projects(id) on delete set null,
  invoice_number text not null unique,
  amount numeric(12, 2) not null default 0,
  status text not null default 'draft',
  due_date date,
  paid_date date,
  created_at timestamptz not null default now()
);

create table if not exists public.portal_users (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references public.clients(id) on delete cascade,
  email text not null unique,
  role text not null default 'viewer',
  last_login timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.files (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references public.clients(id) on delete cascade,
  project_id uuid references public.projects(id) on delete set null,
  file_name text not null,
  file_type text,
  storage_path text not null,
  uploaded_at timestamptz not null default now()
);

create index if not exists clients_email_idx on public.clients(email);
create index if not exists projects_client_id_idx on public.projects(client_id);
create index if not exists bookings_client_id_idx on public.bookings(client_id);
create index if not exists approvals_project_id_idx on public.approvals(project_id);
create index if not exists activity_events_client_id_idx on public.activity_events(client_id);
create index if not exists activity_events_project_id_idx on public.activity_events(project_id);
create index if not exists invoices_client_id_idx on public.invoices(client_id);
create index if not exists invoices_project_id_idx on public.invoices(project_id);
create index if not exists portal_users_client_id_idx on public.portal_users(client_id);
create index if not exists files_client_id_idx on public.files(client_id);
create index if not exists files_project_id_idx on public.files(project_id);

comment on table public.clients is 'Core client account records for CRM and portal workspaces.';
comment on table public.projects is 'Client project records linked to timelines, approvals, invoices, files, and activity.';
comment on table public.bookings is 'Scheduler bookings optionally connected to client records.';
comment on table public.approvals is 'Project approval decisions and revision feedback.';
comment on table public.activity_events is 'Operational activity stream for workspace transparency.';
comment on table public.invoices is 'Billing records prepared for future Stripe integration.';
comment on table public.portal_users is 'Portal access records linked to clients and future Supabase Auth users.';
comment on table public.files is 'Supabase Storage metadata for uploaded client/project files.';

-- Future tables:
-- crm_leads: public lead capture and qualification records.
-- crm_pipeline: stage movement from lead to client to project.
-- messages: client/admin communication threads.
-- notifications: portal/admin notification queue.
-- automation_logs: workflow, reminder, and system action audit log.
-- damarko_ai: AI summaries, recommendations, risk scores, and assistant output.

-- Future RLS recommendations:
-- 1. Enable RLS on every table once Supabase Auth is connected.
-- 2. Map auth.users.id to portal_users.id or add auth_user_id to portal_users.
-- 3. Allow client users to select only rows matching their client_id.
-- 4. Allow DAYIIIatch admins full access through an admin role claim.
-- 5. Restrict inserts/updates for approvals, files, messages, and payments by role.
