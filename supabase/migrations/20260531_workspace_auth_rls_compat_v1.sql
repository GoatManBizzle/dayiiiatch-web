-- DAYIIIatch Workspace OS - Supabase Auth Compatibility v1
-- Allows authenticated users to resolve their portal profile by auth.email().
-- This keeps portal_users.email as the initial Auth bridge until an
-- auth_user_id column is added.

drop policy if exists "portal_users_read_own_portal_user_by_email" on public.portal_users;
create policy "portal_users_read_own_portal_user_by_email"
on public.portal_users
for select
to authenticated
using (email = auth.email());

drop policy if exists "portal_users_read_own_client_by_email" on public.clients;
create policy "portal_users_read_own_client_by_email"
on public.clients
for select
to authenticated
using (
  exists (
    select 1
    from public.portal_users portal_user
    where portal_user.email = auth.email()
      and portal_user.client_id = clients.id
  )
);

comment on policy "portal_users_read_own_portal_user_by_email" on public.portal_users is
  'Temporary Auth bridge: authenticated users can read their portal profile by email. Prefer auth_user_id later.';
