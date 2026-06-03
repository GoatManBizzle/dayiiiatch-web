import type { Metadata } from "next";
import { cookies } from "next/headers";

import AdminLoginForm from "@/components/admin/admin-login-form";
import AdminLogoutButton from "@/components/admin/admin-logout-button";
import AdminCrmWorkspace from "@/components/admin/admin-crm-workspace";
import { ADMIN_AUTH_COOKIE, isValidAdminToken } from "@/lib/admin-auth";
import { getAdminCrmWorkspaceData } from "@/lib/workspace-data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "DAYIIIatch Admin | CRM Core",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default async function AdminCrmPage() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get(ADMIN_AUTH_COOKIE)?.value;

  if (!isValidAdminToken(authToken)) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#05070d] px-6 py-10 text-white">
        <AdminLoginForm />
      </main>
    );
  }

  const workspaceData = await getAdminCrmWorkspaceData();
  const overviewCards =
    workspaceData.source === "supabase"
      ? [
          {
            label: "Total Leads",
            value: workspaceData.clients.length.toString(),
            status: "Active",
          },
          {
            label: "Active Clients",
            value: workspaceData.clients.length.toString(),
            status: "Healthy",
          },
          {
            label: "Open Projects",
            value: workspaceData.projects.length.toString(),
            status: "In Progress",
          },
          {
            label: "Pending Approvals",
            value: workspaceData.approvals
              .filter((approval) => approval.status !== "approved")
              .length.toString(),
            status: "Pending Review",
          },
          {
            label: "Outstanding Invoices",
            value: workspaceData.invoices
              .filter((invoice) => invoice.status !== "paid")
              .length.toString(),
            status: "Outstanding",
          },
          {
            label: "Upcoming Bookings",
            value: workspaceData.bookings.length.toString(),
            status: "Confirmed",
          },
        ]
      : undefined;

  return (
    <main data-style-section="admin-page-shell" className="min-h-screen bg-[#05070d] px-6 py-10 text-white">
      <section className="mx-auto max-w-[92rem] space-y-6">
        <div data-style-section="crm-nav" className="flex flex-wrap items-center justify-between gap-3 rounded-[1.5rem] border border-white/10 bg-white/[0.04] px-4 py-3 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-wrap gap-2">
            <a
              href="/admin/bookings"
              className="rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-zinc-300 transition hover:border-cyan-300/28 hover:bg-cyan-400/10 hover:text-cyan-100"
            >
              Bookings
            </a>
            <a
              href="/admin/crm"
              className="rounded-2xl border border-cyan-300/28 bg-cyan-400/12 px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-cyan-100"
            >
              CRM
            </a>
          </div>
          <AdminLogoutButton />
        </div>

        <AdminCrmWorkspace
          overviewCards={overviewCards}
          isPreviewData={workspaceData.source !== "supabase"}
        />
      </section>
    </main>
  );
}
