import Link from "next/link";

import {
  portalHealthSignals,
  portalLaunchReadiness,
  portalSuccessActions,
  portalSuccessActivity,
  portalSuccessHeroStats,
  portalSuccessMetrics,
  portalSuccessQuickAccess,
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
        className="h-full rounded-full bg-gradient-to-r from-cyan-300/80 via-sky-300/70 to-violet-300/80 shadow-[0_0_18px_rgba(34,211,238,0.16)] transition-[width] duration-700"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

function HealthDot({ status }: { status: string }) {
  const tone =
    status === "Healthy"
      ? "bg-emerald-300 shadow-[0_0_14px_rgba(52,211,153,0.55)]"
      : status === "Blocked"
        ? "bg-rose-300 shadow-[0_0_14px_rgba(251,113,133,0.55)]"
        : "bg-amber-300 shadow-[0_0_14px_rgba(252,211,77,0.5)]";

  return <span className={`mt-1 h-2.5 w-2.5 rounded-full ${tone}`} />;
}

export default function PortalSuccessCenterWorkspace() {
  const launchReadinessScore = Math.round(
    portalLaunchReadiness.reduce((total, item) => total + item.score, 0) /
      portalLaunchReadiness.length,
  );

  return (
    <div className="grid gap-4">
      <section className="relative overflow-hidden rounded-[1.6rem] border border-cyan-300/18 bg-cyan-400/[0.055] p-4 shadow-[0_0_46px_rgba(34,211,238,0.08)] backdrop-blur-xl sm:p-6">
        <div className="absolute right-8 top-6 h-24 w-24 rounded-full border border-cyan-300/20 bg-cyan-400/10 blur-xl motion-safe:animate-pulse" />
        <div className="relative grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(22rem,0.95fr)] xl:items-end">
          <div className="min-w-0">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-200">
              Executive Dashboard
            </p>
            <h1 className="mt-2 break-words text-3xl font-black text-white sm:text-5xl">
              Client Success Command Center
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-300">
              Track everything related to your project from one place:
              onboarding, approvals, assets, meetings, invoices, health, and
              launch readiness.
            </p>
          </div>

          <div className="grid min-w-0 gap-3 sm:grid-cols-2">
            {portalSuccessHeroStats.map((stat) => (
              <article
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-black/24 p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <p className="text-[10px] font-black uppercase tracking-[0.14em] text-zinc-500">
                    {stat.label}
                  </p>
                  <StatusPill status={stat.status} />
                </div>
                <p className="mt-2 break-words text-2xl font-black text-white">
                  {stat.value}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
        {portalSuccessMetrics.map((metric) => (
          <article
            key={metric.label}
            className="flex min-w-0 flex-col rounded-2xl border border-white/10 bg-white/[0.045] p-4 shadow-[0_0_24px_rgba(124,58,237,0.04)]"
          >
            <div className="flex flex-wrap items-start justify-between gap-2">
              <p className="text-[10px] font-black uppercase tracking-[0.14em] text-zinc-500">
                {metric.label}
              </p>
              <StatusPill status={metric.status} />
            </div>
            <p className="mt-3 text-3xl font-black text-white">
              {metric.value}%
            </p>
            <div className="mt-3">
              <ProgressBar value={metric.value} />
            </div>
            <p className="mt-3 text-xs leading-5 text-zinc-400">
              {metric.detail}
            </p>
          </article>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-12">
        <div className="min-w-0 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_0_34px_rgba(34,211,238,0.05)] backdrop-blur-xl sm:p-5 xl:col-span-7">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">
                Project Health
              </p>
              <h2 className="mt-2 text-2xl font-black text-white">
                Health Panel
              </h2>
            </div>
            <StatusPill status="Healthy" />
          </div>

          <div className="mt-4 grid gap-3 lg:grid-cols-3">
            {portalHealthSignals.levels.map((level) => (
              <article
                key={level.label}
                className="grid grid-cols-[auto_minmax(0,1fr)] gap-3 rounded-2xl border border-white/10 bg-black/24 p-4"
              >
                <HealthDot status={level.status} />
                <div className="min-w-0">
                  <p className="font-black text-white">{level.label}</p>
                  <p className="mt-1 text-sm leading-5 text-zinc-400">
                    {level.description}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {[
              ["Missing Assets", portalHealthSignals.missingAssets],
              ["Overdue Approvals", portalHealthSignals.overdueApprovals],
              ["Upcoming Milestones", portalHealthSignals.upcomingMilestones],
              ["Risk Indicators", portalHealthSignals.riskIndicators],
            ].map(([label, items]) => (
              <div
                key={label as string}
                className="rounded-2xl border border-white/10 bg-black/24 p-4"
              >
                <p className="text-xs font-black uppercase tracking-[0.18em] text-zinc-500">
                  {label as string}
                </p>
                <div className="mt-3 grid gap-2">
                  {(items as string[]).map((item) => (
                    <div
                      key={item}
                      className="grid grid-cols-[auto_minmax(0,1fr)] gap-2 text-sm leading-6 text-zinc-300"
                    >
                      <span className="mt-2 h-2 w-2 rounded-full bg-cyan-300/80" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid min-w-0 content-start gap-4 xl:col-span-5">
          <section className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_0_34px_rgba(124,58,237,0.06)] backdrop-blur-xl sm:p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-200">
                  Upcoming Actions
                </p>
                <h2 className="mt-2 text-2xl font-black text-white">
                  Next Actions
                </h2>
              </div>
              <span className="rounded-full border border-violet-300/18 bg-violet-500/[0.08] px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-violet-100">
                {portalSuccessActions.length} open
              </span>
            </div>

            <div className="mt-4 grid gap-3">
              {portalSuccessActions.map((action) => (
                <article
                  key={action.title}
                  className="rounded-2xl border border-white/10 bg-black/24 p-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <p className="font-black text-white">{action.title}</p>
                    <StatusPill status={action.priority} />
                  </div>
                  <p className="mt-2 text-xs font-black uppercase tracking-[0.14em] text-zinc-500">
                    {action.status}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[1.5rem] border border-cyan-300/14 bg-cyan-400/[0.06] p-4 shadow-[0_0_34px_rgba(34,211,238,0.05)] backdrop-blur-xl sm:p-5">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-100">
              Future Intelligence
            </p>
            <p className="mt-2 text-sm leading-6 text-zinc-300">
              Future hooks: Damarko recommendations, health scoring engine,
              launch readiness calculations, project risk detection, and
              automated executive summaries.
            </p>
          </section>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-12">
        <div className="min-w-0 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_0_34px_rgba(124,58,237,0.06)] backdrop-blur-xl sm:p-5 xl:col-span-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-200">
                Launch Readiness
              </p>
              <h2 className="mt-2 text-2xl font-black text-white">
                Readiness Center
              </h2>
            </div>
            <span className="rounded-full border border-cyan-300/18 bg-cyan-400/[0.07] px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-cyan-100">
              {launchReadinessScore}% ready
            </span>
          </div>

          <div className="mt-4 grid gap-3">
            {portalLaunchReadiness.map((item) => (
              <article
                key={item.category}
                className="rounded-2xl border border-white/10 bg-black/24 p-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-black text-white">{item.category}</p>
                  <StatusPill status={item.status} />
                </div>
                <div className="mt-3">
                  <div className="mb-2 flex items-center justify-between text-[10px] font-black uppercase tracking-[0.14em] text-zinc-500">
                    <span>Readiness</span>
                    <span>{item.score}%</span>
                  </div>
                  <ProgressBar value={item.score} />
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="min-w-0 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_0_34px_rgba(34,211,238,0.05)] backdrop-blur-xl sm:p-5 xl:col-span-7">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">
                Recent Activity
              </p>
              <h2 className="mt-2 text-2xl font-black text-white">
                Executive Timeline
              </h2>
            </div>
            <span className="rounded-full border border-cyan-300/18 bg-cyan-400/[0.07] px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-cyan-100">
              Live-ready feed
            </span>
          </div>

          <div className="mt-4 grid gap-3 lg:grid-cols-2">
            {portalSuccessActivity.map((activity) => (
              <article
                key={`${activity.title}-${activity.timestamp}`}
                className="min-w-0 rounded-2xl border border-white/10 bg-black/24 p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <h3 className="break-words font-black text-white">
                    {activity.title}
                  </h3>
                  <StatusPill status={activity.status} />
                </div>
                <p className="mt-2 text-sm leading-6 text-zinc-300">
                  {activity.description}
                </p>
                <p className="mt-3 text-[10px] font-black uppercase tracking-[0.14em] text-zinc-500">
                  {activity.timestamp}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_0_34px_rgba(124,58,237,0.05)] backdrop-blur-xl sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-200">
              Quick Access
            </p>
            <h2 className="mt-2 text-2xl font-black text-white">
              Jump to a workspace
            </h2>
          </div>
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-7">
          {portalSuccessQuickAccess.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-2xl border border-white/10 bg-black/24 px-4 py-3 text-center text-sm font-black text-zinc-200 transition hover:-translate-y-0.5 hover:border-cyan-300/28 hover:bg-cyan-400/10 hover:text-cyan-100"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </section>

      {/* Future: replace preview arrays with a health scoring engine, computed readiness signals, and Damarko-generated executive summaries. */}
    </div>
  );
}
