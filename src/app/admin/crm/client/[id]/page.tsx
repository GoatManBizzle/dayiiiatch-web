import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";

import AdminLoginForm from "@/components/admin/admin-login-form";
import {
  AdminPill,
  ClientProjectsWidget,
  PortalStatusWidget,
  ProjectApprovalsWidget,
  ProjectInvoicesWidget,
  RecentActivityWidget,
} from "@/components/admin/relationship-widgets";
import { ADMIN_AUTH_COOKIE, isValidAdminToken } from "@/lib/admin-auth";
import {
  getRelationshipClient,
  relationshipActivities,
  relationshipApprovals,
  relationshipInvoices,
  relationshipMeetings,
} from "@/lib/relationship-engine";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "DAYIIIatch Admin | Client Profile",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminClientProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const cookieStore = await cookies();
  const authToken = cookieStore.get(ADMIN_AUTH_COOKIE)?.value;

  if (!isValidAdminToken(authToken)) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#05070d] px-6 py-10 text-white">
        <AdminLoginForm />
      </main>
    );
  }

  const { id } = await params;
  const client = getRelationshipClient(id);

  if (!client) {
    notFound();
  }

  const approvals = relationshipApprovals.filter((approval) =>
    client.approvalIds.includes(approval.id),
  );
  const invoices = relationshipInvoices.filter((invoice) =>
    client.invoiceIds.includes(invoice.id),
  );
  const activities = relationshipActivities.filter((activity) =>
    client.activityIds.includes(activity.id),
  );
  const meetings = relationshipMeetings.filter((meeting) =>
    client.meetingIds.includes(meeting.id),
  );

  return (
    <main className="min-h-screen bg-[#05070d] px-6 py-10 text-white">
      <section className="mx-auto max-w-[92rem] space-y-6">
        <div className="flex flex-wrap gap-2">
          <Link
            href="/admin/crm"
            className="rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-zinc-300 transition hover:border-cyan-300/28 hover:bg-cyan-400/10 hover:text-cyan-100"
          >
            CRM
          </Link>
          <Link
            href="/admin/bookings"
            className="rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-zinc-300 transition hover:border-cyan-300/28 hover:bg-cyan-400/10 hover:text-cyan-100"
          >
            Bookings
          </Link>
        </div>

        <section className="rounded-[2rem] border border-cyan-300/18 bg-cyan-400/[0.055] p-5 shadow-[0_0_46px_rgba(34,211,238,0.08)] backdrop-blur-xl sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-cyan-200">
                Client Profile
              </p>
              <h1 className="mt-2 break-words text-4xl font-black">
                {client.name}
              </h1>
              <p className="mt-2 text-sm text-zinc-400">
                {client.company} / {client.email}
              </p>
            </div>
            <AdminPill status={client.portalAccount.status} />
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {[
              ["Source", client.source],
              ["Service Interest", client.serviceInterest],
              ["Active Projects", client.activeProjectIds.length.toString()],
              ["Meetings", client.meetingIds.length.toString()],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-2xl border border-white/10 bg-black/24 p-4"
              >
                <p className="text-[10px] font-black uppercase tracking-[0.14em] text-zinc-500">
                  {label}
                </p>
                <p className="mt-2 break-words text-xl font-black text-white">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-4 xl:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
          <div className="grid min-w-0 gap-4">
            <ClientProjectsWidget client={client} />
            <ProjectApprovalsWidget approvals={approvals} />
          </div>
          <div className="grid min-w-0 content-start gap-4">
            <PortalStatusWidget portalAccount={client.portalAccount} />
            <ProjectInvoicesWidget invoices={invoices} />
          </div>
        </section>

        <section className="grid gap-4 xl:grid-cols-2">
          <RecentActivityWidget activities={activities} />
          <section className="min-w-0 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_0_34px_rgba(124,58,237,0.045)] backdrop-blur-xl sm:p-5">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-200">
              Meetings
            </p>
            <h2 className="mt-2 text-2xl font-black text-white">
              Client Meetings
            </h2>
            <div className="mt-4 grid gap-3">
              {meetings.map((meeting) => (
                <article
                  key={meeting.id}
                  className="rounded-2xl border border-white/10 bg-black/24 p-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <h3 className="font-black text-white">{meeting.title}</h3>
                    <AdminPill status={meeting.status} />
                  </div>
                  <p className="mt-2 text-sm text-zinc-400">{meeting.date}</p>
                </article>
              ))}
            </div>
          </section>
        </section>

        <section className="rounded-[1.5rem] border border-violet-300/14 bg-violet-500/[0.06] px-4 py-4 text-sm leading-6 text-zinc-300">
          Future Supabase hooks: clients, projects, client_projects,
          portal_users, activity_events, approvals, and invoices can hydrate
          this relationship view by client_id.
        </section>
      </section>
    </main>
  );
}
