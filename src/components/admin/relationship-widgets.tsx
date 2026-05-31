import Link from "next/link";
import type { ReactNode } from "react";

import {
  relationshipActivities,
  relationshipApprovals,
  relationshipInvoices,
  relationshipProjects,
  type PortalAccount,
  type RelationshipActivity,
  type RelationshipApproval,
  type RelationshipClient,
  type RelationshipInvoice,
  type RelationshipProject,
} from "@/lib/relationship-engine";

const tone: Record<string, string> = {
  Active: "border-cyan-300/25 bg-cyan-400/10 text-cyan-100",
  Approved: "border-emerald-300/25 bg-emerald-400/10 text-emerald-100",
  Paid: "border-emerald-300/25 bg-emerald-400/10 text-emerald-100",
  Connected: "border-emerald-300/25 bg-emerald-400/10 text-emerald-100",
  Confirmed: "border-emerald-300/25 bg-emerald-400/10 text-emerald-100",
  "Due Soon": "border-amber-300/25 bg-amber-400/10 text-amber-100",
  "Pending Review": "border-amber-300/25 bg-amber-400/10 text-amber-100",
  "Needs Review": "border-amber-300/25 bg-amber-400/10 text-amber-100",
};

export function AdminPill({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] ${
        tone[status] ?? "border-white/10 bg-white/[0.045] text-zinc-200"
      }`}
    >
      {status}
    </span>
  );
}

export function RelationshipPanel({
  title,
  eyebrow,
  children,
}: {
  title: string;
  eyebrow: string;
  children: ReactNode;
}) {
  return (
    <section className="min-w-0 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_0_34px_rgba(34,211,238,0.045)] backdrop-blur-xl sm:p-5">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-2xl font-black text-white">{title}</h2>
      <div className="mt-4 grid gap-3">{children}</div>
    </section>
  );
}

export function ClientProjectsWidget({ client }: { client: RelationshipClient }) {
  const projects = relationshipProjects.filter((project) =>
    client.activeProjectIds.includes(project.id),
  );

  return (
    <RelationshipPanel title="Client Projects" eyebrow="Projects">
      {projects.map((project) => (
        <Link
          key={project.id}
          href={`/admin/projects/${project.id}`}
          className="rounded-2xl border border-white/10 bg-black/24 p-4 transition hover:border-cyan-300/28 hover:bg-cyan-400/10"
        >
          <div className="flex flex-wrap items-start justify-between gap-2">
            <h3 className="break-words font-black text-white">
              {project.title}
            </h3>
            <AdminPill status={project.timelineStatus} />
          </div>
          <p className="mt-2 text-sm leading-6 text-zinc-300">
            {project.summary}
          </p>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-300/80 to-violet-300/80"
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </Link>
      ))}
    </RelationshipPanel>
  );
}

export function ProjectApprovalsWidget({
  approvals,
}: {
  approvals: RelationshipApproval[];
}) {
  return (
    <RelationshipPanel title="Project Approvals" eyebrow="Approvals">
      {approvals.map((approval) => (
        <article
          key={approval.id}
          className="rounded-2xl border border-white/10 bg-black/24 p-4"
        >
          <div className="flex flex-wrap items-start justify-between gap-2">
            <h3 className="break-words font-black text-white">
              {approval.title}
            </h3>
            <AdminPill status={approval.status} />
          </div>
          <p className="mt-2 text-xs font-black uppercase tracking-[0.14em] text-zinc-500">
            {approval.category} / {approval.submitted}
          </p>
        </article>
      ))}
    </RelationshipPanel>
  );
}

export function ProjectInvoicesWidget({
  invoices,
}: {
  invoices: RelationshipInvoice[];
}) {
  return (
    <RelationshipPanel title="Project Invoices" eyebrow="Invoices">
      {invoices.map((invoice) => (
        <article
          key={invoice.id}
          className="rounded-2xl border border-white/10 bg-black/24 p-4"
        >
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <h3 className="font-black text-white">{invoice.invoiceNumber}</h3>
              <p className="mt-1 text-sm text-zinc-400">{invoice.title}</p>
            </div>
            <AdminPill status={invoice.status} />
          </div>
          <p className="mt-3 text-2xl font-black text-white">
            {invoice.amount}
          </p>
          <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-zinc-500">
            Due {invoice.dueDate}
          </p>
        </article>
      ))}
    </RelationshipPanel>
  );
}

export function RecentActivityWidget({
  activities,
}: {
  activities: RelationshipActivity[];
}) {
  return (
    <RelationshipPanel title="Recent Activity" eyebrow="Activity">
      {activities.map((activity) => (
        <article
          key={activity.id}
          className="rounded-2xl border border-white/10 bg-black/24 p-4"
        >
          <div className="flex flex-wrap items-start justify-between gap-2">
            <h3 className="font-black text-white">{activity.title}</h3>
            <AdminPill status={activity.eventType} />
          </div>
          <p className="mt-2 text-sm leading-6 text-zinc-300">
            {activity.description}
          </p>
          <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-zinc-500">
            {activity.timestamp}
          </p>
        </article>
      ))}
    </RelationshipPanel>
  );
}

export function PortalStatusWidget({
  portalAccount,
}: {
  portalAccount: PortalAccount;
}) {
  return (
    <RelationshipPanel title="Portal Status" eyebrow="Portal Access">
      <article className="rounded-2xl border border-white/10 bg-black/24 p-4">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <h3 className="font-black text-white">{portalAccount.email}</h3>
            <p className="mt-1 text-sm text-zinc-400">{portalAccount.role}</p>
          </div>
          <AdminPill status={portalAccount.status} />
        </div>
        <p className="mt-3 text-xs font-bold uppercase tracking-[0.14em] text-zinc-500">
          Last login {portalAccount.lastLogin}
        </p>
      </article>
    </RelationshipPanel>
  );
}

export function getProjectRelationships(project: RelationshipProject) {
  return {
    approvals: relationshipApprovals.filter((approval) =>
      project.approvalIds.includes(approval.id),
    ),
    invoices: relationshipInvoices.filter((invoice) =>
      project.invoiceIds.includes(invoice.id),
    ),
    activities: relationshipActivities.filter((activity) =>
      project.activityIds.includes(activity.id),
    ),
  };
}
