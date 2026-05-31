import Link from "next/link";

import {
  crmClientRecords,
  crmOverviewCards,
  crmPipelineStages,
  crmSystemConnections,
} from "@/lib/admin-crm-data";
import {
  crmRelationshipMaps,
  relationshipClients,
  relationshipProjects,
} from "@/lib/relationship-engine";

const statusTone: Record<string, string> = {
  Active: "border-cyan-300/25 bg-cyan-400/10 text-cyan-100",
  Healthy: "border-emerald-300/25 bg-emerald-400/10 text-emerald-100",
  "In Progress": "border-cyan-300/25 bg-cyan-400/10 text-cyan-100",
  "Pending Review": "border-amber-300/25 bg-amber-400/10 text-amber-100",
  Outstanding: "border-cyan-300/25 bg-cyan-400/10 text-cyan-100",
  Confirmed: "border-emerald-300/25 bg-emerald-400/10 text-emerald-100",
  Connected: "border-emerald-300/25 bg-emerald-400/10 text-emerald-100",
  Ready: "border-cyan-300/25 bg-cyan-400/10 text-cyan-100",
  Preview: "border-violet-300/25 bg-violet-500/10 text-violet-100",
  "Due Soon": "border-amber-300/25 bg-amber-400/10 text-amber-100",
  Draft: "border-violet-300/25 bg-violet-500/10 text-violet-100",
  "Invite Pending": "border-amber-300/25 bg-amber-400/10 text-amber-100",
  "Not Created": "border-zinc-300/18 bg-white/[0.045] text-zinc-300",
};

const heatTone: Record<string, string> = {
  Cold: "border-sky-300/20 bg-sky-400/10 text-sky-100",
  Warm: "border-amber-300/25 bg-amber-400/10 text-amber-100",
  Hot: "border-rose-300/25 bg-rose-400/10 text-rose-100",
  Priority: "border-fuchsia-300/25 bg-fuchsia-500/10 text-fuchsia-100",
};

function Pill({
  label,
  tone = statusTone,
}: {
  label: string;
  tone?: Record<string, string>;
}) {
  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] ${
        tone[label] ?? "border-white/10 bg-white/[0.045] text-zinc-200"
      }`}
    >
      {label}
    </span>
  );
}

export default function AdminCrmWorkspace() {
  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-[2rem] border border-cyan-300/18 bg-cyan-400/[0.055] p-5 shadow-[0_0_46px_rgba(34,211,238,0.08)] backdrop-blur-xl sm:p-6">
        <div className="absolute right-8 top-6 h-24 w-24 rounded-full border border-cyan-300/20 bg-cyan-400/10 blur-xl" />
        <div className="relative flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-cyan-200">
              DAYIIIatch Admin
            </p>
            <h1 className="mt-2 text-4xl font-black sm:text-5xl">
              CRM Command Core
            </h1>
            <p className="mt-3 text-sm leading-6 text-zinc-300">
              Connect leads, bookings, clients, projects, approvals, invoices,
              and portal access into one operational business system.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              href="/admin/bookings"
              className="rounded-2xl border border-white/10 bg-white/[0.045] px-5 py-3 text-sm font-bold text-zinc-200 transition hover:border-cyan-300/30 hover:bg-cyan-400/10 hover:text-cyan-100"
            >
              Bookings
            </Link>
            <Link
              href="/portal/dashboard"
              className="rounded-2xl border border-cyan-300/28 bg-cyan-400/12 px-5 py-3 text-sm font-bold text-cyan-100 transition hover:bg-cyan-400/18"
            >
              Open Portal
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
        {crmOverviewCards.map((card) => (
          <article
            key={card.label}
            className="rounded-3xl border border-white/10 bg-white/[0.045] p-4 shadow-[0_0_24px_rgba(124,58,237,0.04)]"
          >
            <div className="flex flex-wrap items-start justify-between gap-2">
              <p className="text-[10px] font-black uppercase tracking-[0.14em] text-zinc-500">
                {card.label}
              </p>
              <Pill label={card.status} />
            </div>
            <p className="mt-3 break-words text-3xl font-black text-white">
              {card.value}
            </p>
          </article>
        ))}
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_0_34px_rgba(34,211,238,0.05)] backdrop-blur-xl sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">
              Pipeline Board
            </p>
            <h2 className="mt-2 text-2xl font-black text-white">
              Lead-to-client flow
            </h2>
          </div>
          <Pill label="Active" />
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
          {crmPipelineStages.map((stage) => (
            <div
              key={stage.stage}
              className="min-w-0 rounded-3xl border border-white/10 bg-black/24 p-3"
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="break-words text-sm font-black text-white">
                  {stage.stage}
                </h3>
                <span className="rounded-full border border-white/10 bg-white/[0.045] px-2 py-1 text-[10px] font-black text-zinc-300">
                  {stage.cards.length}
                </span>
              </div>

              <div className="mt-3 grid gap-3">
                {stage.cards.map((card) => (
                  <article
                    key={`${stage.stage}-${card.email}`}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 transition hover:border-cyan-300/24 hover:bg-cyan-400/[0.045]"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="break-words font-black text-white">
                          {card.name}
                        </p>
                        <p className="mt-1 break-words text-xs text-zinc-400">
                          {card.email}
                        </p>
                      </div>
                      <Pill label={card.heat} tone={heatTone} />
                    </div>
                    <div className="mt-3 grid gap-2 text-xs leading-5 text-zinc-300">
                      <p>
                        <span className="font-black text-zinc-500">
                          Source:
                        </span>{" "}
                        {card.source}
                      </p>
                      <p>
                        <span className="font-black text-zinc-500">
                          Interest:
                        </span>{" "}
                        {card.serviceInterest}
                      </p>
                      <p>
                        <span className="font-black text-zinc-500">
                          Next:
                        </span>{" "}
                        {card.nextAction}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.75fr)]">
        <div className="min-w-0 rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_0_34px_rgba(124,58,237,0.06)] backdrop-blur-xl sm:p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-200">
                Client Records
              </p>
              <h2 className="mt-2 text-2xl font-black text-white">
                Active account profiles
              </h2>
            </div>
            <Pill label="Ready" />
          </div>

          <div className="mt-4 grid gap-3 lg:grid-cols-3">
            {crmClientRecords.map((client) => (
              <Link
                key={client.email}
                href="/admin/crm/client/client-dayiiiatch-preview"
                className="flex min-w-0 flex-col rounded-3xl border border-white/10 bg-black/24 p-4"
              >
                <h3 className="break-words text-lg font-black text-white">
                  {client.clientName}
                </h3>
                <p className="mt-1 text-sm font-bold text-zinc-400">
                  {client.company}
                </p>
                <p className="mt-1 break-words text-xs text-zinc-500">
                  {client.email}
                </p>

                <div className="mt-4 grid gap-2">
                  {[
                    ["Active Project", client.activeProject],
                    ["Last Activity", client.lastActivity],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="rounded-2xl border border-white/10 bg-white/[0.035] px-3 py-3"
                    >
                      <p className="text-[10px] font-black uppercase tracking-[0.14em] text-zinc-500">
                        {label}
                      </p>
                      <p className="mt-1 text-sm font-bold text-zinc-100">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-auto flex flex-wrap gap-2 pt-4">
                  <Pill label={client.portalStatus} />
                  <Pill label={client.invoiceStatus} />
                </div>
              </Link>
            ))}
          </div>
        </div>

        <aside className="grid min-w-0 content-start gap-4">
          <section className="rounded-[2rem] border border-cyan-300/14 bg-cyan-400/[0.06] p-4 shadow-[0_0_34px_rgba(34,211,238,0.05)] backdrop-blur-xl sm:p-5">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-100">
              Quick Actions
            </p>
            <div className="mt-4 grid gap-2">
              {[
                ["Create Client", "/admin/crm"],
                ["Schedule Call", "/book?service=free-call"],
                ["Send Proposal", "/admin/crm"],
                ["Open Portal", "/portal/dashboard"],
                ["View Invoice", "/portal/invoices"],
              ].map(([label, href]) => (
                <Link
                  key={label}
                  href={href}
                  className="rounded-2xl border border-white/10 bg-black/24 px-4 py-3 text-sm font-black text-zinc-200 transition hover:border-cyan-300/28 hover:bg-cyan-400/10 hover:text-cyan-100"
                >
                  {label}
                </Link>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_0_34px_rgba(124,58,237,0.05)] backdrop-blur-xl sm:p-5">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-200">
              Connected System Summary
            </p>
            <div className="mt-4 grid gap-3">
              {crmSystemConnections.map((item) => (
                <article
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-black/24 p-3"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <h3 className="font-black text-white">{item.title}</h3>
                    <Pill label={item.status} />
                  </div>
                  <p className="mt-2 text-sm leading-6 text-zinc-300">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </section>
        </aside>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_0_34px_rgba(34,211,238,0.05)] backdrop-blur-xl sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">
              Relationship Views
            </p>
            <h2 className="mt-2 text-2xl font-black text-white">
              Lead to client to project to portal
            </h2>
          </div>
          <Pill label="Connected" />
        </div>

        <div className="mt-4 grid gap-3 lg:grid-cols-3">
          {crmRelationshipMaps.map((map) => {
            const client = relationshipClients.find(
              (item) => item.id === map.clientId,
            );
            const projects = relationshipProjects.filter((project) =>
              map.projectIds.includes(project.id),
            );

            return (
              <article
                key={map.leadId}
                className="rounded-3xl border border-white/10 bg-black/24 p-4"
              >
                <p className="text-[10px] font-black uppercase tracking-[0.14em] text-zinc-500">
                  Lead
                </p>
                <p className="mt-1 font-black text-white">{map.leadId}</p>
                <div className="mt-4 grid gap-2">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.035] px-3 py-3">
                    <p className="text-[10px] font-black uppercase tracking-[0.14em] text-zinc-500">
                      Client
                    </p>
                    <p className="mt-1 text-sm font-bold text-zinc-100">
                      {client?.name ?? "Unassigned"}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.035] px-3 py-3">
                    <p className="text-[10px] font-black uppercase tracking-[0.14em] text-zinc-500">
                      Projects
                    </p>
                    <p className="mt-1 text-sm font-bold text-zinc-100">
                      {projects.map((project) => project.title).join(", ")}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.035] px-3 py-3">
                    <p className="text-[10px] font-black uppercase tracking-[0.14em] text-zinc-500">
                      Portal
                    </p>
                    <p className="mt-1 text-sm font-bold text-zinc-100">
                      {map.portalUserId}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="rounded-[1.5rem] border border-violet-300/14 bg-violet-500/[0.06] px-4 py-4 text-sm leading-6 text-zinc-300">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-100">
          Future Database Hooks
        </p>
        <p className="mt-2">
          Recommended model: leads, clients, projects, crm_pipeline_stages,
          client_projects, invoices, and portal_users. Each CRM card can later
          reference booking_id, client_id, project_id, invoice_id, and
          portal_user_id for full operational traceability.
        </p>
      </section>
    </div>
  );
}
