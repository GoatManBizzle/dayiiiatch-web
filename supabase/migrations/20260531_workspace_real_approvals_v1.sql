-- DAYIIIatch Workspace OS - Real Approvals v1
-- Client/project approval workflow with comments, immutable history, and activity hooks.

create table if not exists public.approval_requests (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references public.clients(id) on delete cascade,
  project_id uuid references public.projects(id) on delete set null,
  deliverable_id uuid references public.files(id) on delete set null,
  title text not null,
  category text,
  status text not null default 'pending_review',
  due_date date,
  submitted_at timestamptz not null default now(),
  decided_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.approval_comments (
  id uuid primary key default gen_random_uuid(),
  approval_id uuid references public.approval_requests(id) on delete cascade,
  commenter_role text not null,
  commenter_name text not null,
  comment text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.approval_history (
  id uuid primary key default gen_random_uuid(),
  approval_id uuid references public.approval_requests(id) on delete cascade,
  action text not null,
  actor_role text not null,
  actor_name text not null,
  created_at timestamptz not null default now()
);

create index if not exists approval_requests_client_id_idx on public.approval_requests(client_id);
create index if not exists approval_requests_project_id_idx on public.approval_requests(project_id);
create index if not exists approval_requests_deliverable_id_idx on public.approval_requests(deliverable_id);
create index if not exists approval_comments_approval_id_idx on public.approval_comments(approval_id);
create index if not exists approval_history_approval_id_idx on public.approval_history(approval_id);

alter table public.approval_requests enable row level security;
alter table public.approval_comments enable row level security;
alter table public.approval_history enable row level security;

drop policy if exists "service_role_manage_all_approval_requests" on public.approval_requests;
create policy "service_role_manage_all_approval_requests"
on public.approval_requests
for all
to service_role
using (true)
with check (true);

drop policy if exists "portal_users_read_client_approval_requests" on public.approval_requests;
create policy "portal_users_read_client_approval_requests"
on public.approval_requests
for select
to authenticated
using (
  exists (
    select 1
    from public.portal_users portal_user
    where portal_user.email = auth.email()
      and portal_user.client_id = approval_requests.client_id
  )
);

drop policy if exists "portal_users_update_client_approval_requests" on public.approval_requests;
create policy "portal_users_update_client_approval_requests"
on public.approval_requests
for update
to authenticated
using (
  exists (
    select 1
    from public.portal_users portal_user
    where portal_user.email = auth.email()
      and portal_user.client_id = approval_requests.client_id
  )
)
with check (
  exists (
    select 1
    from public.portal_users portal_user
    where portal_user.email = auth.email()
      and portal_user.client_id = approval_requests.client_id
  )
);

drop policy if exists "service_role_manage_all_approval_comments" on public.approval_comments;
create policy "service_role_manage_all_approval_comments"
on public.approval_comments
for all
to service_role
using (true)
with check (true);

drop policy if exists "portal_users_read_client_approval_comments" on public.approval_comments;
create policy "portal_users_read_client_approval_comments"
on public.approval_comments
for select
to authenticated
using (
  exists (
    select 1
    from public.approval_requests request
    join public.portal_users portal_user
      on portal_user.client_id = request.client_id
    where portal_user.email = auth.email()
      and request.id = approval_comments.approval_id
  )
);

drop policy if exists "portal_users_insert_client_approval_comments" on public.approval_comments;
create policy "portal_users_insert_client_approval_comments"
on public.approval_comments
for insert
to authenticated
with check (
  exists (
    select 1
    from public.approval_requests request
    join public.portal_users portal_user
      on portal_user.client_id = request.client_id
    where portal_user.email = auth.email()
      and request.id = approval_comments.approval_id
  )
);

drop policy if exists "service_role_manage_all_approval_history" on public.approval_history;
create policy "service_role_manage_all_approval_history"
on public.approval_history
for all
to service_role
using (true)
with check (true);

drop policy if exists "portal_users_read_client_approval_history" on public.approval_history;
create policy "portal_users_read_client_approval_history"
on public.approval_history
for select
to authenticated
using (
  exists (
    select 1
    from public.approval_requests request
    join public.portal_users portal_user
      on portal_user.client_id = request.client_id
    where portal_user.email = auth.email()
      and request.id = approval_history.approval_id
  )
);

drop policy if exists "portal_users_insert_client_approval_history" on public.approval_history;
create policy "portal_users_insert_client_approval_history"
on public.approval_history
for insert
to authenticated
with check (
  exists (
    select 1
    from public.approval_requests request
    join public.portal_users portal_user
      on portal_user.client_id = request.client_id
    where portal_user.email = auth.email()
      and request.id = approval_history.approval_id
  )
);

drop policy if exists "portal_users_insert_client_activity_events" on public.activity_events;
create policy "portal_users_insert_client_activity_events"
on public.activity_events
for insert
to authenticated
with check (
  exists (
    select 1
    from public.portal_users portal_user
    where portal_user.email = auth.email()
      and portal_user.client_id = activity_events.client_id
  )
);

comment on table public.approval_requests is 'Client-facing approval queue for deliverables, project decisions, and revision workflows.';
comment on table public.approval_comments is 'Revision notes and client/admin comments attached to approval requests.';
comment on table public.approval_history is 'Immutable approval action history for approve, reject, and revision events.';

-- Future admin hooks:
-- /admin/crm/client/[id] and /admin/projects/[id] can join approval_requests
-- by client_id/project_id for operator review and response.
-- Future realtime:
-- Subscribe to approval_requests and approval_history by client_id/project_id.
