# DAYIIIatch production env checklist

Public values:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Server-only values:

- `SUPABASE_SERVICE_ROLE_KEY`
- `RESEND_API_KEY`
- `BOOKING_FROM_EMAIL`
- `BOOKING_ADMIN_EMAIL`
- `ADMIN_DASHBOARD_PASSWORD`

Notes:

- Current booking/admin code does not read `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- `SUPABASE_SERVICE_ROLE_KEY` must stay in server route handlers/admin pages only.
- `BOOKING_FROM_EMAIL` should be either `email@domain.com` or `Name <email@domain.com>`.
- `BOOKING_ADMIN_EMAIL` can contain one or more comma-separated email addresses.
