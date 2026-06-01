-- Real Invoices + Stripe Prep v1 for DAYIIIatch Workspace OS.
-- Non-destructive extension of the original invoices table plus future billing tables.

alter table public.invoices
  add column if not exists title text,
  add column if not exists subtotal numeric(12, 2) not null default 0,
  add column if not exists tax numeric(12, 2) not null default 0,
  add column if not exists total numeric(12, 2) not null default 0,
  add column if not exists paid_at timestamptz,
  add column if not exists stripe_checkout_session_id text,
  add column if not exists stripe_payment_intent_id text,
  add column if not exists updated_at timestamptz not null default now();

update public.invoices
set
  title = coalesce(title, invoice_number),
  subtotal = case when subtotal = 0 then amount else subtotal end,
  total = case when total = 0 then amount else total end,
  paid_at = coalesce(paid_at, paid_date::timestamptz)
where title is null
   or subtotal = 0
   or total = 0
   or (paid_at is null and paid_date is not null);

create table if not exists public.invoice_items (
  id uuid primary key default gen_random_uuid(),
  invoice_id uuid references public.invoices(id) on delete cascade,
  description text not null,
  quantity numeric(10, 2) not null default 1,
  unit_price numeric(12, 2) not null default 0,
  line_total numeric(12, 2) not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  invoice_id uuid references public.invoices(id) on delete cascade,
  client_id uuid references public.clients(id) on delete cascade,
  amount numeric(12, 2) not null default 0,
  status text not null default 'pending',
  provider text not null default 'stripe',
  provider_payment_id text,
  paid_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists invoices_client_status_idx on public.invoices(client_id, status);
create index if not exists invoice_items_invoice_id_idx on public.invoice_items(invoice_id);
create index if not exists payments_invoice_id_idx on public.payments(invoice_id);
create index if not exists payments_client_id_idx on public.payments(client_id);

alter table public.invoice_items enable row level security;
alter table public.payments enable row level security;

drop policy if exists "service_role_manage_all_invoice_items" on public.invoice_items;
create policy "service_role_manage_all_invoice_items"
on public.invoice_items
for all
to service_role
using (true)
with check (true);

drop policy if exists "service_role_manage_all_payments" on public.payments;
create policy "service_role_manage_all_payments"
on public.payments
for all
to service_role
using (true)
with check (true);

drop policy if exists "portal_users_read_client_invoice_items" on public.invoice_items;
create policy "portal_users_read_client_invoice_items"
on public.invoice_items
for select
to authenticated
using (
  exists (
    select 1
    from public.invoices invoice
    join public.portal_users portal_user
      on portal_user.client_id = invoice.client_id
    where invoice.id = invoice_items.invoice_id
      and portal_user.email = auth.email()
  )
);

drop policy if exists "portal_users_read_client_payments" on public.payments;
create policy "portal_users_read_client_payments"
on public.payments
for select
to authenticated
using (
  exists (
    select 1
    from public.portal_users portal_user
    where portal_user.email = auth.email()
      and portal_user.client_id = payments.client_id
  )
);

-- Checkout sessions and payment status updates should be performed by server-only code.
-- Required server env vars for production Stripe wiring:
-- STRIPE_SECRET_KEY
-- STRIPE_WEBHOOK_SECRET
-- NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
--
-- Future webhook flow:
-- 1. /api/portal/create-checkout-session creates a Stripe Checkout Session.
-- 2. Store stripe_checkout_session_id on public.invoices.
-- 3. Stripe webhook verifies STRIPE_WEBHOOK_SECRET server-side.
-- 4. Insert public.payments row and update public.invoices.status/paid_at.

comment on table public.invoice_items is 'Line items for client invoices. Readable by matching portal users through invoice/client relationship.';
comment on table public.payments is 'Payment records prepared for Stripe Checkout/webhook synchronization.';
comment on column public.invoices.stripe_checkout_session_id is 'Future Stripe Checkout Session id. Server-only writes.';
comment on column public.invoices.stripe_payment_intent_id is 'Future Stripe PaymentIntent id. Server-only writes.';
