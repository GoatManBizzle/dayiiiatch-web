-- DAYIIIatch Workspace OS - Messaging v1
-- Threaded client/project communication prepared for Supabase realtime.

create table if not exists public.message_threads (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references public.clients(id) on delete cascade,
  project_id uuid references public.projects(id) on delete set null,
  subject text not null,
  status text not null default 'open',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  thread_id uuid references public.message_threads(id) on delete cascade,
  sender_role text not null,
  sender_name text not null,
  sender_email text,
  body text not null,
  created_at timestamptz not null default now(),
  read_at timestamptz
);

create table if not exists public.message_attachments (
  id uuid primary key default gen_random_uuid(),
  message_id uuid references public.messages(id) on delete cascade,
  file_name text not null,
  file_type text,
  storage_path text not null,
  uploaded_at timestamptz not null default now()
);

create index if not exists message_threads_client_id_idx on public.message_threads(client_id);
create index if not exists message_threads_project_id_idx on public.message_threads(project_id);
create index if not exists messages_thread_id_idx on public.messages(thread_id);
create index if not exists message_attachments_message_id_idx on public.message_attachments(message_id);

alter table public.message_threads enable row level security;
alter table public.messages enable row level security;
alter table public.message_attachments enable row level security;

drop policy if exists "service_role_manage_all_message_threads" on public.message_threads;
create policy "service_role_manage_all_message_threads"
on public.message_threads
for all
to service_role
using (true)
with check (true);

drop policy if exists "portal_users_read_client_message_threads" on public.message_threads;
create policy "portal_users_read_client_message_threads"
on public.message_threads
for select
to authenticated
using (
  exists (
    select 1
    from public.portal_users portal_user
    where portal_user.email = auth.email()
      and portal_user.client_id = message_threads.client_id
  )
);

drop policy if exists "portal_users_insert_client_message_threads" on public.message_threads;
create policy "portal_users_insert_client_message_threads"
on public.message_threads
for insert
to authenticated
with check (
  exists (
    select 1
    from public.portal_users portal_user
    where portal_user.email = auth.email()
      and portal_user.client_id = message_threads.client_id
  )
);

drop policy if exists "service_role_manage_all_messages" on public.messages;
create policy "service_role_manage_all_messages"
on public.messages
for all
to service_role
using (true)
with check (true);

drop policy if exists "portal_users_read_client_messages" on public.messages;
create policy "portal_users_read_client_messages"
on public.messages
for select
to authenticated
using (
  exists (
    select 1
    from public.message_threads thread
    join public.portal_users portal_user
      on portal_user.client_id = thread.client_id
    where portal_user.email = auth.email()
      and thread.id = messages.thread_id
  )
);

drop policy if exists "portal_users_insert_client_messages" on public.messages;
create policy "portal_users_insert_client_messages"
on public.messages
for insert
to authenticated
with check (
  exists (
    select 1
    from public.message_threads thread
    join public.portal_users portal_user
      on portal_user.client_id = thread.client_id
    where portal_user.email = auth.email()
      and thread.id = messages.thread_id
  )
);

drop policy if exists "service_role_manage_all_message_attachments" on public.message_attachments;
create policy "service_role_manage_all_message_attachments"
on public.message_attachments
for all
to service_role
using (true)
with check (true);

drop policy if exists "portal_users_read_client_message_attachments" on public.message_attachments;
create policy "portal_users_read_client_message_attachments"
on public.message_attachments
for select
to authenticated
using (
  exists (
    select 1
    from public.messages message
    join public.message_threads thread
      on thread.id = message.thread_id
    join public.portal_users portal_user
      on portal_user.client_id = thread.client_id
    where portal_user.email = auth.email()
      and message.id = message_attachments.message_id
  )
);

comment on table public.message_threads is 'Client/project conversation threads for portal and future admin messaging.';
comment on table public.messages is 'Thread messages from client, DAYIIIatch admin, system, or future Damarko roles.';
comment on table public.message_attachments is 'Attachment metadata for message files stored in Supabase Storage.';

-- Future realtime hook:
-- supabase.channel('client-message-threads').on('postgres_changes', ...)
-- Subscribe by thread_id or client_id once auth_user_id policies are finalized.
