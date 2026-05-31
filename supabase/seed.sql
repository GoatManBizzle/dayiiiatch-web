-- DAYIIIatch Workspace OS - Demo Seed Data v1
-- Fixed UUIDs keep client_id/project_id relationships easy to verify.
-- Run after core schema + RLS migrations in a local/dev Supabase database.

insert into public.clients (
  id,
  name,
  company,
  email,
  phone,
  status,
  portal_enabled,
  notes
) values
  (
    '00000000-0000-4000-8000-000000000001',
    'DAYIIIatch Preview Client',
    'DAYIIIatch Workspace OS',
    'client@dayiiiatch-preview.com',
    '555-0101',
    'active',
    true,
    'Primary demo client used across portal, CRM, approvals, activity, and invoices.'
  ),
  (
    '00000000-0000-4000-8000-000000000002',
    'Maya Stone',
    'Stone Studio',
    'maya@stonestudio.co',
    '555-0102',
    'active',
    true,
    'Secondary demo client for CRM and project relationship testing.'
  )
on conflict (id) do update set
  name = excluded.name,
  company = excluded.company,
  email = excluded.email,
  phone = excluded.phone,
  status = excluded.status,
  portal_enabled = excluded.portal_enabled,
  notes = excluded.notes,
  updated_at = now();

insert into public.projects (
  id,
  client_id,
  name,
  description,
  status,
  progress,
  current_phase,
  launch_readiness
) values
  (
    '00000000-0000-4000-8000-000000000101',
    '00000000-0000-4000-8000-000000000001',
    'Scheduler Platform Expansion',
    'Booking, admin, portal, and launch visibility systems connected into one operating flow.',
    'active',
    72,
    'Build',
    78
  ),
  (
    '00000000-0000-4000-8000-000000000102',
    '00000000-0000-4000-8000-000000000001',
    'Automation Support Layer',
    'Support routing, repeated workflow references, and future Damarko automation foundations.',
    'active',
    46,
    'Strategy',
    58
  ),
  (
    '00000000-0000-4000-8000-000000000103',
    '00000000-0000-4000-8000-000000000002',
    'Brand Presence Upgrade',
    'Homepage proof system, brand asset preparation, and launch-ready presentation upgrades.',
    'active',
    88,
    'Review',
    82
  )
on conflict (id) do update set
  client_id = excluded.client_id,
  name = excluded.name,
  description = excluded.description,
  status = excluded.status,
  progress = excluded.progress,
  current_phase = excluded.current_phase,
  launch_readiness = excluded.launch_readiness,
  updated_at = now();

insert into public.bookings (
  id,
  client_id,
  service,
  date,
  time,
  status,
  notes
) values
  (
    '00000000-0000-4000-8000-000000000201',
    '00000000-0000-4000-8000-000000000001',
    'premium-session',
    '2026-06-03',
    '14:00',
    'confirmed',
    'QA review session for launch blockers, mobile checks, and approvals.'
  ),
  (
    '00000000-0000-4000-8000-000000000202',
    '00000000-0000-4000-8000-000000000001',
    'free-call',
    '2026-06-10',
    '11:00',
    'pending',
    'Launch prep call and handoff readiness review.'
  ),
  (
    '00000000-0000-4000-8000-000000000203',
    '00000000-0000-4000-8000-000000000002',
    'premium-session',
    '2026-06-06',
    '13:30',
    'confirmed',
    'Brand review and homepage proof approval call.'
  )
on conflict (id) do update set
  client_id = excluded.client_id,
  service = excluded.service,
  date = excluded.date,
  time = excluded.time,
  status = excluded.status,
  notes = excluded.notes;

insert into public.approvals (
  id,
  project_id,
  title,
  status,
  submitted_at,
  approved_at,
  feedback
) values
  (
    '00000000-0000-4000-8000-000000000301',
    '00000000-0000-4000-8000-000000000101',
    'Homepage Designs',
    'approved',
    '2026-05-31 14:30:00-04',
    '2026-05-31 15:58:00-04',
    null
  ),
  (
    '00000000-0000-4000-8000-000000000302',
    '00000000-0000-4000-8000-000000000102',
    'Automation Maps',
    'pending_review',
    '2026-05-29 17:20:00-04',
    null,
    'Client should confirm support routing triggers.'
  ),
  (
    '00000000-0000-4000-8000-000000000303',
    '00000000-0000-4000-8000-000000000103',
    'Brand Guides',
    'approved',
    '2026-05-30 10:15:00-04',
    '2026-05-30 13:40:00-04',
    null
  )
on conflict (id) do update set
  project_id = excluded.project_id,
  title = excluded.title,
  status = excluded.status,
  submitted_at = excluded.submitted_at,
  approved_at = excluded.approved_at,
  feedback = excluded.feedback;

insert into public.activity_events (
  id,
  client_id,
  project_id,
  event_type,
  title,
  description,
  created_at
) values
  (
    '00000000-0000-4000-8000-000000000401',
    '00000000-0000-4000-8000-000000000001',
    '00000000-0000-4000-8000-000000000101',
    'approval',
    'Homepage Design Approved',
    'The homepage design package was approved and moved into final launch preparation.',
    '2026-05-31 15:58:00-04'
  ),
  (
    '00000000-0000-4000-8000-000000000402',
    '00000000-0000-4000-8000-000000000001',
    '00000000-0000-4000-8000-000000000101',
    'meeting',
    'Meeting Scheduled',
    'QA review session scheduled for launch blockers, mobile checks, and approvals.',
    '2026-05-31 14:44:00-04'
  ),
  (
    '00000000-0000-4000-8000-000000000403',
    '00000000-0000-4000-8000-000000000002',
    '00000000-0000-4000-8000-000000000103',
    'file_upload',
    'Brand Assets Uploaded',
    'Logo references and media files were added to the client asset center.',
    '2026-05-30 11:25:00-04'
  ),
  (
    '00000000-0000-4000-8000-000000000404',
    '00000000-0000-4000-8000-000000000001',
    '00000000-0000-4000-8000-000000000102',
    'timeline',
    'Build Phase Marked Active',
    'Timeline moved into active build with homepage approval as the next milestone.',
    '2026-05-27 10:05:00-04'
  )
on conflict (id) do update set
  client_id = excluded.client_id,
  project_id = excluded.project_id,
  event_type = excluded.event_type,
  title = excluded.title,
  description = excluded.description,
  created_at = excluded.created_at;

insert into public.invoices (
  id,
  client_id,
  project_id,
  invoice_number,
  amount,
  status,
  due_date,
  paid_date
) values
  (
    '00000000-0000-4000-8000-000000000501',
    '00000000-0000-4000-8000-000000000001',
    '00000000-0000-4000-8000-000000000101',
    'INV-2026-001',
    750,
    'paid',
    '2026-06-18',
    '2026-05-29'
  ),
  (
    '00000000-0000-4000-8000-000000000502',
    '00000000-0000-4000-8000-000000000001',
    '00000000-0000-4000-8000-000000000102',
    'INV-2026-003',
    2400,
    'due_soon',
    '2026-06-12',
    null
  ),
  (
    '00000000-0000-4000-8000-000000000503',
    '00000000-0000-4000-8000-000000000002',
    '00000000-0000-4000-8000-000000000103',
    'INV-2026-002',
    4800,
    'paid',
    '2026-05-28',
    '2026-05-28'
  )
on conflict (id) do update set
  client_id = excluded.client_id,
  project_id = excluded.project_id,
  invoice_number = excluded.invoice_number,
  amount = excluded.amount,
  status = excluded.status,
  due_date = excluded.due_date,
  paid_date = excluded.paid_date;

insert into public.portal_users (
  id,
  client_id,
  email,
  role,
  last_login
) values
  (
    '00000000-0000-4000-8000-000000000601',
    '00000000-0000-4000-8000-000000000001',
    'client@dayiiiatch-preview.com',
    'client_owner',
    '2026-05-31 15:45:00-04'
  ),
  (
    '00000000-0000-4000-8000-000000000602',
    '00000000-0000-4000-8000-000000000002',
    'maya@stonestudio.co',
    'client_owner',
    null
  )
on conflict (id) do update set
  client_id = excluded.client_id,
  email = excluded.email,
  role = excluded.role,
  last_login = excluded.last_login;

insert into public.files (
  id,
  client_id,
  project_id,
  file_name,
  file_type,
  storage_path,
  uploaded_at
) values
  (
    '00000000-0000-4000-8000-000000000701',
    '00000000-0000-4000-8000-000000000001',
    '00000000-0000-4000-8000-000000000101',
    'Launch Readiness Checklist.pdf',
    'pdf',
    'clients/dayiiiatch-preview/projects/scheduler/launch-readiness-checklist.pdf',
    '2026-05-30 16:15:00-04'
  ),
  (
    '00000000-0000-4000-8000-000000000702',
    '00000000-0000-4000-8000-000000000001',
    '00000000-0000-4000-8000-000000000102',
    'Automation Intake Map.pdf',
    'pdf',
    'clients/dayiiiatch-preview/projects/automation/automation-intake-map.pdf',
    '2026-05-28 15:20:00-04'
  ),
  (
    '00000000-0000-4000-8000-000000000703',
    '00000000-0000-4000-8000-000000000002',
    '00000000-0000-4000-8000-000000000103',
    'Brand Asset Pack.zip',
    'zip',
    'clients/stone-studio/projects/brand-presence/brand-asset-pack.zip',
    '2026-05-30 11:25:00-04'
  )
on conflict (id) do update set
  client_id = excluded.client_id,
  project_id = excluded.project_id,
  file_name = excluded.file_name,
  file_type = excluded.file_type,
  storage_path = excluded.storage_path,
  uploaded_at = excluded.uploaded_at;
