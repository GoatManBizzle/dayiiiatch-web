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
- In Vercel Production, every env var name above must match exactly.
- For production Resend delivery, `BOOKING_FROM_EMAIL` should use a sender on a verified Resend domain. `onboarding@resend.dev` is for testing and can cause delivery failures/restrictions outside local smoke tests.
