# DAYIIIatch Workspace OS Storage Buckets

Create these private Supabase Storage buckets manually in the Supabase dashboard or CLI:

- `client-files`
- `deliverables`
- `brand-assets`
- `project-references`

Recommended object path:

```text
client_id/project_id/category/file_name
```

Initial policy direction:

- Keep buckets private.
- Authenticated portal users can upload/select objects only inside their own `client_id` prefix.
- DAYIIIatch admin/server jobs can manage all buckets through server-side service role code only.
- Signed URLs should be generated for view/download actions.
- Never expose `SUPABASE_SERVICE_ROLE_KEY` in client components.

Production follow-up:

- Add `auth_user_id` to `portal_users`.
- Replace email-based RLS/storage checks with `auth.uid()`.
- Add file size/type validation by bucket and category.
- Add virus scanning or moderation for client uploads before approval.
