-- Real Activity Events v1 for DAYIIIatch Workspace OS.
-- Extends the central operational timeline without destroying existing seed/demo events.

alter table public.activity_events
  add column if not exists actor_id uuid,
  add column if not exists actor_role text not null default 'system',
  add column if not exists actor_name text not null default 'Workspace System',
  add column if not exists metadata jsonb not null default '{}'::jsonb;

create index if not exists activity_events_client_created_idx
  on public.activity_events(client_id, created_at desc);

create index if not exists activity_events_project_created_idx
  on public.activity_events(project_id, created_at desc);

create index if not exists activity_events_event_type_idx
  on public.activity_events(event_type);

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

-- Activity metadata must stay operational only: ids, labels, route hints, and safe UI context.
-- Do not store secrets, private credentials, payment method data, tokens, or raw file signed URLs.
--
-- Event type conventions prepared for app wiring:
-- file_uploaded
-- approval_approved
-- revision_requested
-- approval_rejected
-- invoice_created
-- invoice_viewed
-- payment_started
-- payment_completed
-- message_sent
-- booking_rescheduled
-- status_updated
-- project_updated
--
-- Future admin surfaces:
-- /admin/crm/client/[id] can read activity_events by client_id.
-- /admin/projects/[id] can read activity_events by project_id.

comment on table public.activity_events is 'Central operational event stream for portal, admin, CRM, projects, approvals, files, messages, bookings, and invoices.';
comment on column public.activity_events.actor_id is 'Future Supabase auth/admin actor id.';
comment on column public.activity_events.actor_role is 'Actor role such as client, admin, system, damarko, or service.';
comment on column public.activity_events.actor_name is 'Display-safe actor name.';
comment on column public.activity_events.metadata is 'Safe JSON context only. Never store secrets, tokens, card data, or signed URLs.';
