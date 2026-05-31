-- DAYIIIatch Workspace OS - RLS Foundation v1
-- Starter policies for local/dev Supabase wiring.
-- Public users receive no private read policies.
-- Supabase service_role can manage all rows through explicit policies and its
-- normal elevated server-side usage.
-- Portal read policies assume portal_users.id will later map to auth.users.id.

alter table public.clients enable row level security;
alter table public.projects enable row level security;
alter table public.bookings enable row level security;
alter table public.approvals enable row level security;
alter table public.activity_events enable row level security;
alter table public.invoices enable row level security;
alter table public.portal_users enable row level security;
alter table public.files enable row level security;

drop policy if exists "service_role_manage_all_clients" on public.clients;
create policy "service_role_manage_all_clients"
on public.clients
for all
to service_role
using (true)
with check (true);

drop policy if exists "portal_users_read_own_client" on public.clients;
create policy "portal_users_read_own_client"
on public.clients
for select
to authenticated
using (
  exists (
    select 1
    from public.portal_users portal_user
    where portal_user.id = auth.uid()
      and portal_user.client_id = clients.id
  )
);

drop policy if exists "service_role_manage_all_projects" on public.projects;
create policy "service_role_manage_all_projects"
on public.projects
for all
to service_role
using (true)
with check (true);

drop policy if exists "portal_users_read_client_projects" on public.projects;
create policy "portal_users_read_client_projects"
on public.projects
for select
to authenticated
using (
  exists (
    select 1
    from public.portal_users portal_user
    where portal_user.id = auth.uid()
      and portal_user.client_id = projects.client_id
  )
);

drop policy if exists "service_role_manage_all_bookings" on public.bookings;
create policy "service_role_manage_all_bookings"
on public.bookings
for all
to service_role
using (true)
with check (true);

drop policy if exists "portal_users_read_client_bookings" on public.bookings;
create policy "portal_users_read_client_bookings"
on public.bookings
for select
to authenticated
using (
  exists (
    select 1
    from public.portal_users portal_user
    where portal_user.id = auth.uid()
      and portal_user.client_id = bookings.client_id
  )
);

drop policy if exists "service_role_manage_all_approvals" on public.approvals;
create policy "service_role_manage_all_approvals"
on public.approvals
for all
to service_role
using (true)
with check (true);

drop policy if exists "portal_users_read_client_approvals" on public.approvals;
create policy "portal_users_read_client_approvals"
on public.approvals
for select
to authenticated
using (
  exists (
    select 1
    from public.projects project
    join public.portal_users portal_user
      on portal_user.client_id = project.client_id
    where portal_user.id = auth.uid()
      and project.id = approvals.project_id
  )
);

drop policy if exists "service_role_manage_all_activity_events" on public.activity_events;
create policy "service_role_manage_all_activity_events"
on public.activity_events
for all
to service_role
using (true)
with check (true);

drop policy if exists "portal_users_read_client_activity_events" on public.activity_events;
create policy "portal_users_read_client_activity_events"
on public.activity_events
for select
to authenticated
using (
  exists (
    select 1
    from public.portal_users portal_user
    where portal_user.id = auth.uid()
      and portal_user.client_id = activity_events.client_id
  )
);

drop policy if exists "service_role_manage_all_invoices" on public.invoices;
create policy "service_role_manage_all_invoices"
on public.invoices
for all
to service_role
using (true)
with check (true);

drop policy if exists "portal_users_read_client_invoices" on public.invoices;
create policy "portal_users_read_client_invoices"
on public.invoices
for select
to authenticated
using (
  exists (
    select 1
    from public.portal_users portal_user
    where portal_user.id = auth.uid()
      and portal_user.client_id = invoices.client_id
  )
);

drop policy if exists "service_role_manage_all_portal_users" on public.portal_users;
create policy "service_role_manage_all_portal_users"
on public.portal_users
for all
to service_role
using (true)
with check (true);

drop policy if exists "portal_users_read_own_portal_user" on public.portal_users;
create policy "portal_users_read_own_portal_user"
on public.portal_users
for select
to authenticated
using (id = auth.uid());

drop policy if exists "service_role_manage_all_files" on public.files;
create policy "service_role_manage_all_files"
on public.files
for all
to service_role
using (true)
with check (true);

drop policy if exists "portal_users_read_client_files" on public.files;
create policy "portal_users_read_client_files"
on public.files
for select
to authenticated
using (
  exists (
    select 1
    from public.portal_users portal_user
    where portal_user.id = auth.uid()
      and portal_user.client_id = files.client_id
  )
);

comment on policy "portal_users_read_own_client" on public.clients is
  'Future Supabase Auth: portal_users.id should map to auth.users.id or be replaced with portal_users.auth_user_id.';
comment on policy "portal_users_read_client_projects" on public.projects is
  'Portal users can read projects connected to their client_id.';
comment on policy "portal_users_read_client_approvals" on public.approvals is
  'Approvals are readable through the project -> client relationship.';
comment on policy "portal_users_read_client_files" on public.files is
  'Private storage metadata should stay client-scoped; signed URLs come later.';
