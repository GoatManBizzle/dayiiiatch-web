import { createClient } from "@supabase/supabase-js";
import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";

import AdminLoginForm from "@/components/admin/admin-login-form";
import AdminLogoutButton from "@/components/admin/admin-logout-button";
import AdminAnalytics from "@/components/admin/admin-analytics";
import AdminSummaryPanel from "@/components/admin/admin-summary-panel";
import GrowthSnapshotPanel from "@/components/admin/growth-snapshot-panel";
import OperationalInsightsPanel from "@/components/admin/operational-insights-panel";
import type { Booking } from "@/components/admin/booking-types";
import BookingsTable from "@/components/admin/bookings-table";
import { ADMIN_AUTH_COOKIE, isValidAdminToken } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "DAYIIIatch Admin | Booking Dashboard",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

type AdminBookingRow = Omit<Booking, "client"> & {
  client?: Booking["client"] | Booking["client"][];
};

export default async function AdminBookingsPage() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get(ADMIN_AUTH_COOKIE)?.value;

  if (!isValidAdminToken(authToken)) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#05070d] px-6 py-10 text-white">
        <AdminLoginForm />
      </main>
    );
  }

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Missing Supabase environment variables.");
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data, error } = await supabase
    .from("bookings")
    .select(
      "id, client_id, service, service_label, date, time, name, email, company, details, status, client:clients(id, name, company, email, status, portal_enabled)",
    )
    .order("date", { ascending: true })
    .order("time", { ascending: true });

  const bookings = ((data ?? []) as AdminBookingRow[]).map((booking) => ({
    ...booking,
    client: Array.isArray(booking.client)
      ? (booking.client[0] ?? null)
      : (booking.client ?? null),
  })) satisfies Booking[];

  return (
    <main className="min-h-screen bg-[#05070d] px-6 py-10 text-white">
      <section className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur-xl">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-200">
              DAYIIIatch Admin
            </p>

            <h1 className="mt-2 text-4xl font-black">Booking Dashboard</h1>

            <p className="mt-2 text-sm text-zinc-400">
              View scheduler requests, client details, times, and booking
              status.
            </p>

            <div className="mt-4 inline-flex rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-emerald-100">
              Admin Mode Active
            </div>
          </div>

          <div className="flex gap-3">
            <Link
              href="/admin/crm"
              className="rounded-2xl border border-violet-400/30 bg-violet-500/10 px-5 py-3 text-sm font-bold text-violet-100 hover:bg-violet-500/20"
            >
              CRM
            </Link>

            <Link
              href="/"
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold hover:border-cyan-400/40 hover:bg-cyan-400/10"
            >
              Return to Site
            </Link>

            <Link
              href="/book?service=free-call"
              className="rounded-2xl border border-cyan-400/30 bg-cyan-400/10 px-5 py-3 text-sm font-bold text-cyan-100 hover:bg-cyan-400/20"
            >
              Test Booking
            </Link>

            <AdminLogoutButton />
          </div>
        </div>

        {error && (
          <div className="rounded-2xl border border-red-400/20 bg-red-500/10 p-4 text-red-100">
            Failed to load bookings: {error.message}
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
            <p className="text-sm uppercase tracking-[0.25em] text-zinc-400">
              Total Bookings
            </p>
            <h2 className="mt-2 text-4xl font-black">{bookings.length}</h2>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
            <p className="text-sm uppercase tracking-[0.25em] text-zinc-400">
              Free Calls
            </p>
            <h2 className="mt-2 text-4xl font-black">
              {bookings.filter((b) => b.service === "free-call").length}
            </h2>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
            <p className="text-sm uppercase tracking-[0.25em] text-zinc-400">
              Premium Sessions
            </p>
            <h2 className="mt-2 text-4xl font-black">
              {bookings.filter((b) => b.service === "premium-session").length}
            </h2>
          </div>
        </div>

        <AdminSummaryPanel bookings={bookings} />

        <GrowthSnapshotPanel bookings={bookings} />

        <OperationalInsightsPanel bookings={bookings} />

        <AdminAnalytics bookings={bookings} />

        <BookingsTable bookings={bookings} />
      </section>
    </main>
  );
}
