-- DAYIIIatch Workspace OS - File Storage Ready v1
-- Adds metadata needed for real portal uploads and RLS-safe client file inserts.

alter table if exists public.files
  add column if not exists category text not null default 'Project References',
  add column if not exists status text not null default 'received';

drop policy if exists "portal_users_insert_client_files" on public.files;
create policy "portal_users_insert_client_files"
on public.files
for insert
to authenticated
with check (
  exists (
    select 1
    from public.portal_users portal_user
    where portal_user.email = auth.email()
      and portal_user.client_id = files.client_id
  )
);

drop policy if exists "portal_users_update_client_files" on public.files;
create policy "portal_users_update_client_files"
on public.files
for update
to authenticated
using (
  exists (
    select 1
    from public.portal_users portal_user
    where portal_user.email = auth.email()
      and portal_user.client_id = files.client_id
  )
)
with check (
  exists (
    select 1
    from public.portal_users portal_user
    where portal_user.email = auth.email()
      and portal_user.client_id = files.client_id
  )
);

comment on column public.files.category is 'Portal file category such as Brand Assets, Project References, Contracts, Deliverables, or Media Uploads.';
comment on column public.files.status is 'Upload review state such as received, needs_review, approved, or replaced.';

-- Manual Storage bucket plan:
-- client-files: general client uploads at client_id/project_id/category/file_name
-- deliverables: final launch files and client-ready exports
-- brand-assets: logos, visual references, and source brand files
-- project-references: intake references, contracts, docs, PDFs, and videos
--
-- Future storage policies should allow authenticated portal users to manage
-- objects scoped to their client_id folder and deny anonymous private reads.
