-- Real Booking <-> Client Link v1 for DAYIIIatch Workspace OS.
-- Bookings already have client_id from the core schema. This migration adds
-- lookup support and documents the operational link from scheduler to CRM.

create index if not exists clients_email_lookup_idx
  on public.clients(lower(email));

create index if not exists bookings_email_lookup_idx
  on public.bookings(lower(email));

comment on column public.bookings.client_id is 'Optional link from public booking request to Workspace OS client/lead record.';
comment on table public.bookings is 'Scheduler bookings connected to clients when possible. Legacy rows may keep client_id null.';

-- Public booking route now creates activity_events with:
-- event_type = booking_created
-- title = New booking request
-- metadata = booking_id, service, date, time, source, client_created
--
-- Future CRM pipeline hook:
-- create crm_leads / crm_pipeline_stages tables, then write a lead record here
-- whenever a new client is created from a booking.
