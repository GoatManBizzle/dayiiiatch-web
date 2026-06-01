import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";

import AdminLoginForm from "@/components/admin/admin-login-form";
import {
  AdminPill,
  ProjectApprovalsWidget,
  ProjectInvoicesWidget,
  RecentActivityWidget,
  getProjectRelationships,
} from "@/components/admin/relationship-widgets";
import { ADMIN_AUTH_COOKIE, isValidAdminToken } from "@/lib/admin-auth";
import {
  getRelationshipClient,
  getRelationshipProject,
} from "@/lib/relationship-engine";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "DAYIIIatch Admin | Project Profile",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminProjectProfilePage({
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
  const project = getRelationshipProject(id);

  if (!project) {
    notFound();
  }

  const client = getRelationshipClient(project.clientId);
  const { approvals, invoices, activities } = getProjectRelationships(project);

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
          {client ? (
            <Link
              href={`/admin/crm/client/${client.id}`}
              className="rounded-2xl border border-cyan-300/28 bg-cyan-400/12 px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-cyan-100"
            >
              Client Profile
            </Link>
          ) : null}
        </div>

        <section className="rounded-[2rem] border border-cyan-300/18 bg-cyan-400/[0.055] p-5 shadow-[0_0_46px_rgba(34,211,238,0.08)] backdrop-blur-xl sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-cyan-200">
                Project Profile
              </p>
              <h1 className="mt-2 break-words text-4xl font-black">
                {project.title}
              </h1>
              <p className="mt-3 text-sm leading-6 text-zinc-300">
                {project.summary}
              </p>
            </div>
            <AdminPill status={project.timelineStatus} />
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {[
              ["Client", client?.name ?? "Unassigned"],
              ["Current Phase", project.phase],
              ["Progress", `${project.progress}%`],
              ["Deliverables", project.deliverables.length.toString()],
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

          <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-300/80 to-violet-300/80"
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </section>

        <section className="grid gap-4 xl:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
          <div className="grid min-w-0 gap-4">
            <section className="min-w-0 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_0_34px_rgba(34,211,238,0.045)] backdrop-blur-xl sm:p-5">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">
                Timeline
              </p>
              <h2 className="mt-2 text-2xl font-black text-white">
                Project Timeline
              </h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {["Discovery", project.phase, "Launch"].map((stage, index) => (
                  <article
                    key={`${stage}-${index}`}
                    className="rounded-2xl border border-white/10 bg-black/24 p-4"
                  >
                    <p className="font-black text-white">{stage}</p>
                    <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-zinc-500">
                      {index === 0
                        ? "Completed"
                        : index === 1
                          ? "Active"
                          : "Upcoming"}
                    </p>
                  </article>
                ))}
              </div>
            </section>

            <ProjectApprovalsWidget approvals={approvals} />
            <RecentActivityWidget activities={activities} />
          </div>

          <div className="grid min-w-0 content-start gap-4">
            <ProjectInvoicesWidget invoices={invoices} />
            <section className="min-w-0 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_0_34px_rgba(124,58,237,0.045)] backdrop-blur-xl sm:p-5">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-200">
                Deliverables
              </p>
              <h2 className="mt-2 text-2xl font-black text-white">
                Project Deliverables
              </h2>
              <div className="mt-4 grid gap-3">
                {project.deliverables.map((deliverable) => (
                  <article
                    key={deliverable}
                    className="rounded-2xl border border-white/10 bg-black/24 p-4"
                  >
                    <p className="font-black text-white">{deliverable}</p>
                    <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-zinc-500">
                      Linked deliverable record
                    </p>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </section>

        <section className="rounded-[1.5rem] border border-violet-300/14 bg-violet-500/[0.06] px-4 py-4 text-sm leading-6 text-zinc-300">
          Future Supabase hooks: projects, client_projects, approval_requests,
          approval_comments, approval_history, invoices, activity_events,
          deliverables, and timeline milestones can hydrate this project profile
          by project_id.
        </section>
      </section>
    </main>
  );
}
