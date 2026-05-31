import {
  portalKickoffPrep,
  portalOnboardingChecklist,
  portalOnboardingStages,
  portalRequiredAssets,
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

function PrepList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/24 p-4">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">
        {title}
      </p>
      <div className="mt-3 grid gap-2">
        {items.map((item) => (
          <div
            key={item}
            className="grid grid-cols-[auto_minmax(0,1fr)] gap-2 text-sm leading-6 text-zinc-300"
          >
            <span className="mt-2 h-2 w-2 rounded-full bg-cyan-300/80 shadow-[0_0_12px_rgba(34,211,238,0.5)]" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PortalOnboardingWorkspace() {
  const completedTasks = portalOnboardingChecklist.filter(
    (task) => task.status === "Done",
  ).length;
  const totalProgress = Math.round(
    portalOnboardingChecklist.reduce((total, task) => total + task.progress, 0) /
      portalOnboardingChecklist.length,
  );
  const receivedAssets = portalRequiredAssets.filter(
    (asset) => asset.status === "Received" || asset.status === "Approved",
  ).length;

  return (
    <div className="grid gap-4">
      <section className="grid gap-4 xl:grid-cols-12">
        <div className="min-w-0 rounded-[1.5rem] border border-cyan-300/16 bg-cyan-400/[0.055] p-4 shadow-[0_0_34px_rgba(34,211,238,0.05)] backdrop-blur-xl sm:p-5 xl:col-span-7">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-100">
                Onboarding Welcome
              </p>
              <h2 className="mt-2 break-words text-2xl font-black text-white sm:text-3xl">
                Welcome to the DAYIIIatch build path.
              </h2>
            </div>
            <StatusPill status="Active" />
          </div>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-300">
            This center keeps kickoff prep, client assets, intake tasks, and the
            next delivery stages visible before the project moves into full
            production.
          </p>
          <div className="mt-5 rounded-[1.25rem] border border-white/10 bg-black/24 p-4">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-zinc-500">
              Project Kickoff Summary
            </p>
            <p className="mt-2 text-sm leading-6 text-zinc-300">
              Current focus: collect final assets, confirm requirements, review
              the roadmap, and keep the kickoff meeting centered on decisions
              that unlock build momentum.
            </p>
          </div>
        </div>

        <div className="grid min-w-0 gap-3 sm:grid-cols-3 xl:col-span-5">
          {[
            ["Overall Progress", `${totalProgress}%`],
            ["Tasks Complete", `${completedTasks}/${portalOnboardingChecklist.length}`],
            ["Assets Ready", `${receivedAssets}/${portalRequiredAssets.length}`],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-4 shadow-[0_0_24px_rgba(124,58,237,0.04)]"
            >
              <p className="text-[10px] font-black uppercase tracking-[0.14em] text-zinc-500">
                {label}
              </p>
              <p className="mt-1 text-2xl font-black text-white">{value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-12">
        <div className="min-w-0 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_0_34px_rgba(34,211,238,0.05)] backdrop-blur-xl sm:p-5 xl:col-span-7">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">
                Client Checklist
              </p>
              <h2 className="mt-2 text-2xl font-black text-white">
                Onboarding Tasks
              </h2>
            </div>
            <span className="rounded-full border border-cyan-300/18 bg-cyan-400/[0.07] px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-cyan-100">
              {totalProgress}% complete
            </span>
          </div>

          <div className="mt-4">
            <ProgressBar value={totalProgress} />
          </div>

          <div className="mt-4 grid gap-3 lg:grid-cols-2">
            {portalOnboardingChecklist.map((task) => (
              <article
                key={task.task}
                className="flex min-w-0 flex-col rounded-2xl border border-white/10 bg-black/24 p-4 transition hover:border-cyan-300/22 hover:bg-cyan-400/[0.045]"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <h3 className="break-words font-black text-white">
                    {task.task}
                  </h3>
                  <StatusPill status={task.status} />
                </div>
                <p className="mt-2 text-sm leading-6 text-zinc-300">
                  {task.description}
                </p>
                <div className="mt-auto pt-4">
                  <div className="mb-2 flex items-center justify-between text-[10px] font-black uppercase tracking-[0.14em] text-zinc-500">
                    <span>Completion</span>
                    <span>{task.progress}%</span>
                  </div>
                  <ProgressBar value={task.progress} />
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="min-w-0 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_0_34px_rgba(124,58,237,0.06)] backdrop-blur-xl sm:p-5 xl:col-span-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-200">
                Required Assets
              </p>
              <h2 className="mt-2 text-2xl font-black text-white">
                Asset Readiness
              </h2>
            </div>
            <span className="rounded-full border border-violet-300/18 bg-violet-500/[0.08] px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-violet-100">
              {portalRequiredAssets.length} categories
            </span>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
            {portalRequiredAssets.map((asset) => (
              <article
                key={asset.category}
                className="min-w-0 rounded-2xl border border-white/10 bg-black/24 p-4 transition hover:border-violet-300/22 hover:bg-violet-500/[0.045]"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <h3 className="break-words font-black text-white">
                    {asset.category}
                  </h3>
                  <StatusPill status={asset.status} />
                </div>
                <p className="mt-2 text-sm leading-6 text-zinc-300">
                  {asset.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-12">
        <div className="min-w-0 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_0_34px_rgba(34,211,238,0.05)] backdrop-blur-xl sm:p-5 xl:col-span-5">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">
            Next Steps Timeline
          </p>
          <h2 className="mt-2 text-2xl font-black text-white">
            Operational Route
          </h2>
          <div className="mt-4 grid gap-3">
            {portalOnboardingStages.map((stage, index) => (
              <article
                key={stage.title}
                className="grid min-w-0 grid-cols-[auto_minmax(0,1fr)] gap-3 rounded-2xl border border-white/10 bg-black/24 p-3"
              >
                <div className="flex flex-col items-center">
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-2xl border text-xs font-black ${
                      stage.status === "Active"
                        ? "border-cyan-300/35 bg-cyan-400/14 text-cyan-100 shadow-[0_0_18px_rgba(34,211,238,0.12)]"
                        : stage.status === "Done"
                          ? "border-emerald-300/25 bg-emerald-400/10 text-emerald-100"
                          : "border-white/10 bg-white/[0.04] text-zinc-400"
                    }`}
                  >
                    {index + 1}
                  </span>
                  {index < portalOnboardingStages.length - 1 ? (
                    <span className="mt-2 h-full min-h-8 w-px bg-gradient-to-b from-cyan-300/35 to-violet-300/10" />
                  ) : null}
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <h3 className="font-black text-white">{stage.title}</h3>
                    <StatusPill status={stage.status} />
                  </div>
                  <p className="mt-2 text-sm leading-6 text-zinc-300">
                    {stage.description}
                  </p>
                  <div className="mt-3">
                    <div className="mb-2 flex items-center justify-between text-[10px] font-black uppercase tracking-[0.14em] text-zinc-500">
                      <span>Progress</span>
                      <span>{stage.progress}%</span>
                    </div>
                    <ProgressBar value={stage.progress} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="min-w-0 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_0_34px_rgba(124,58,237,0.06)] backdrop-blur-xl sm:p-5 xl:col-span-7">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-200">
                Kickoff Meeting Prep
              </p>
              <h2 className="mt-2 text-2xl font-black text-white">
                Make the first call count
              </h2>
            </div>
            <span className="rounded-full border border-cyan-300/18 bg-cyan-400/[0.07] px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-cyan-100">
              Prep Ready
            </span>
          </div>

          <div className="mt-4 grid gap-3 lg:grid-cols-3">
            <PrepList title="Meeting Goals" items={portalKickoffPrep.goals} />
            <PrepList
              title="Expectations"
              items={portalKickoffPrep.expectations}
            />
            <PrepList
              title="Preparation"
              items={portalKickoffPrep.preparation}
            />
          </div>

          <p className="mt-4 rounded-2xl border border-cyan-300/14 bg-cyan-400/[0.06] px-4 py-3 text-xs leading-5 text-cyan-100">
            Future onboarding hooks: onboarding_tasks table, client_assets
            table, onboarding_progress records, kickoff_meeting records, and
            client-specific requirement approvals.
          </p>
        </div>
      </section>
    </div>
  );
}
