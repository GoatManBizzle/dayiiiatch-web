import PortalActivityWidget from "@/components/portal/portal-activity-widget";
import {
  portalDamarkoInsights,
  portalProjectManagerActions,
  portalProjectManagerBlockers,
  portalProjectManagerSnapshot,
  statusTone,
} from "@/lib/portal-data";

function StatusPill({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] ${
        statusTone[status] ?? "border-white/10 bg-white/[0.045] text-zinc-200"
      }`}
    >
      {status}
    </span>
  );
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-2 overflow-hidden rounded-full bg-white/10">
      <div
        className="h-full rounded-full bg-gradient-to-r from-cyan-300/80 via-sky-300/70 to-violet-300/80 shadow-[0_0_18px_rgba(34,211,238,0.16)]"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

export default function PortalProjectManagerWorkspace() {
  const highSeverityCount = portalProjectManagerBlockers.filter(
    (blocker) => blocker.severity === "High",
  ).length;
  const recommendationCount = portalProjectManagerActions.length;

  return (
    <div className="grid gap-4">
      <section className="relative overflow-hidden rounded-[1.6rem] border border-cyan-300/18 bg-cyan-400/[0.055] p-4 shadow-[0_0_46px_rgba(34,211,238,0.08)] backdrop-blur-xl sm:p-6">
        <div className="absolute right-8 top-6 h-24 w-24 rounded-full border border-cyan-300/20 bg-cyan-400/10 blur-xl motion-safe:animate-pulse" />
        <div className="relative grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(21rem,0.8fr)] xl:items-end">
          <div className="min-w-0">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-200">
              Damarko Intelligence
            </p>
            <h1 className="mt-2 break-words text-3xl font-black text-white sm:text-5xl">
              AI Project Manager
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-300">
              A rule-based project intelligence layer for status summaries,
              blockers, recommended next actions, and future AI-assisted
              project management.
            </p>
          </div>

          <div className="grid min-w-0 gap-3 sm:grid-cols-2">
            {[
              ["High Severity", highSeverityCount.toString(), "High"],
              ["Recommendations", recommendationCount.toString(), "Active"],
            ].map(([label, value, status]) => (
              <article
                key={label}
                className="rounded-2xl border border-white/10 bg-black/24 p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <p className="text-[10px] font-black uppercase tracking-[0.14em] text-zinc-500">
                    {label}
                  </p>
                  <StatusPill status={status} />
                </div>
                <p className="mt-2 text-3xl font-black text-white">{value}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {portalProjectManagerSnapshot.map((item) => (
          <article
            key={item.label}
            className="rounded-2xl border border-white/10 bg-white/[0.045] p-4 shadow-[0_0_24px_rgba(124,58,237,0.04)]"
          >
            <div className="flex flex-wrap items-start justify-between gap-2">
              <p className="text-[10px] font-black uppercase tracking-[0.14em] text-zinc-500">
                {item.label}
              </p>
              <StatusPill status={item.status} />
            </div>
            <p className="mt-3 break-words text-2xl font-black text-white">
              {item.value}
            </p>
            {item.label === "Progress" || item.label === "Launch Readiness" ? (
              <div className="mt-3">
                <ProgressBar value={Number.parseInt(item.value, 10)} />
              </div>
            ) : null}
          </article>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-12">
        <div className="min-w-0 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_0_34px_rgba(34,211,238,0.05)] backdrop-blur-xl sm:p-5 xl:col-span-7">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">
                Blockers Panel
              </p>
              <h2 className="mt-2 text-2xl font-black text-white">
                Project Risks
              </h2>
            </div>
            <StatusPill status="Needs Attention" />
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {portalProjectManagerBlockers.map((blocker) => (
              <article
                key={blocker.title}
                className="min-w-0 rounded-2xl border border-white/10 bg-black/24 p-4 transition hover:border-cyan-300/22 hover:bg-cyan-400/[0.045]"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <h3 className="break-words font-black text-white">
                    {blocker.title}
                  </h3>
                  <StatusPill status={blocker.severity} />
                </div>
                <p className="mt-2 text-xs font-black uppercase tracking-[0.14em] text-zinc-500">
                  {blocker.status}
                </p>
                <p className="mt-3 text-sm leading-6 text-zinc-300">
                  {blocker.description}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="min-w-0 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_0_34px_rgba(124,58,237,0.06)] backdrop-blur-xl sm:p-5 xl:col-span-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-200">
                Recommended Actions
              </p>
              <h2 className="mt-2 text-2xl font-black text-white">
                Next Best Moves
              </h2>
            </div>
            <span className="rounded-full border border-violet-300/18 bg-violet-500/[0.08] px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-violet-100">
              Rule Based
            </span>
          </div>

          <div className="mt-4 grid gap-3">
            {portalProjectManagerActions.map((action) => (
              <article
                key={action.title}
                className="rounded-2xl border border-white/10 bg-black/24 p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <h3 className="font-black text-white">{action.title}</h3>
                  <StatusPill status={action.priority} />
                </div>
                <p className="mt-2 text-sm leading-6 text-zinc-300">
                  {action.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-12">
        <div className="min-w-0 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_0_34px_rgba(34,211,238,0.05)] backdrop-blur-xl sm:p-5 xl:col-span-8">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">
                Damarko Insights
              </p>
              <h2 className="mt-2 text-2xl font-black text-white">
                Operational Readout
              </h2>
            </div>
            <StatusPill status="Healthy" />
          </div>

          <div className="mt-4 grid gap-3 lg:grid-cols-3">
            {portalDamarkoInsights.map((insight) => (
              <article
                key={insight.title}
                className="flex min-w-0 flex-col rounded-2xl border border-white/10 bg-black/24 p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <h3 className="break-words font-black text-white">
                    {insight.title}
                  </h3>
                  <StatusPill status={insight.status} />
                </div>
                <p className="mt-3 text-sm leading-6 text-zinc-300">
                  {insight.description}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="grid min-w-0 content-start gap-4 xl:col-span-4">
          <PortalActivityWidget title="Recent Activity" eyebrow="PM Feed" />

          <section className="rounded-[1.5rem] border border-cyan-300/14 bg-cyan-400/[0.06] p-4 shadow-[0_0_34px_rgba(34,211,238,0.05)] backdrop-blur-xl sm:p-5">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-100">
              Future AI Hooks
            </p>
            <div className="mt-4 grid gap-3">
              {[
                "Real project summaries",
                "Recommendation engine",
                "Risk scoring",
                "Launch forecasting",
                "Damarko AI integration",
              ].map((hook) => (
                <div
                  key={hook}
                  className="rounded-2xl border border-white/10 bg-black/24 px-3 py-3 text-sm font-bold text-zinc-200"
                >
                  {hook}
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs leading-5 text-cyan-100">
              Future implementation can replace these rule-based modules with
              project-aware summaries, scored risks, and client-safe AI
              recommendations.
            </p>
          </section>
        </div>
      </section>

      {/* Future: hydrate this page from Supabase project records and Damarko-generated project intelligence. */}
    </div>
  );
}
