"use client";

import { useState } from "react";

import {
  portalTimelineActions,
  portalTimelineActivity,
  portalTimelineHealth,
  portalTimelineHeroStats,
  portalTimelineMilestones,
  statusTone,
} from "@/lib/portal-data";

type TimelineMilestone = (typeof portalTimelineMilestones)[number];
type TimelineProjectSnapshot = {
  currentPhase: string;
  progress: number;
  launchReadiness: number;
  name: string;
};

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

function getMilestoneTone(status: string) {
  if (status === "Completed") {
    return "border-emerald-300/28 bg-emerald-400/10 text-emerald-100";
  }

  if (status === "Active") {
    return "border-cyan-300/40 bg-cyan-400/14 text-cyan-100 shadow-[0_0_24px_rgba(34,211,238,0.2)] motion-safe:animate-pulse";
  }

  if (status === "Blocked") {
    return "border-rose-300/30 bg-rose-400/10 text-rose-100";
  }

  return "border-white/10 bg-white/[0.045] text-zinc-400";
}

function MilestoneCard({
  milestone,
  open,
  onToggle,
}: {
  milestone: TimelineMilestone;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <article className="min-w-0 rounded-2xl border border-white/10 bg-black/24 p-4 transition hover:border-cyan-300/22 hover:bg-cyan-400/[0.045]">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full flex-wrap items-start justify-between gap-3 text-left"
        aria-expanded={open}
      >
        <div className="min-w-0">
          <h3 className="break-words text-lg font-black text-white">
            {milestone.name}
          </h3>
          <p className="mt-1 text-sm leading-6 text-zinc-400">
            {milestone.description}
          </p>
        </div>
        <StatusPill status={milestone.status} />
      </button>

      <div className="mt-4">
        <div className="mb-2 flex items-center justify-between text-[10px] font-black uppercase tracking-[0.14em] text-zinc-500">
          <span>Completion</span>
          <span>{milestone.progress}%</span>
        </div>
        <ProgressBar value={milestone.progress} />
      </div>

      {open ? (
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {[
            ["Start Date", milestone.startDate],
            ["Target Date", milestone.targetDate],
            ["Assigned Team", milestone.assignedTeam],
          ].map(([label, value]) => (
            <div
              key={`${milestone.name}-${label}`}
              className="rounded-2xl border border-white/10 bg-white/[0.035] px-3 py-3"
            >
              <p className="text-[10px] font-black uppercase tracking-[0.14em] text-zinc-500">
                {label}
              </p>
              <p className="mt-1 break-words font-bold text-zinc-100">
                {value}
              </p>
            </div>
          ))}
        </div>
      ) : null}
    </article>
  );
}

export default function PortalTimelineWorkspace({
  project,
  isPreviewData = true,
}: {
  project?: TimelineProjectSnapshot | null;
  isPreviewData?: boolean;
}) {
  const heroStats = project
    ? [
        { label: "Current Phase", value: project.currentPhase, status: "Active" },
        { label: "Progress", value: `${project.progress}%`, status: "In Progress" },
        {
          label: "Estimated Completion",
          value: "Supabase Project",
          status: "Due Soon",
        },
        { label: "Next Milestone", value: project.name, status: "Awaiting Approval" },
      ]
    : portalTimelineHeroStats;
  const activeMilestone =
    portalTimelineMilestones.find((milestone) =>
      project
        ? milestone.name.toLowerCase() === project.currentPhase.toLowerCase()
        : milestone.status === "Active",
    ) ??
    portalTimelineMilestones.find((milestone) => milestone.status === "Active") ??
    portalTimelineMilestones[0];
  const [openMilestone, setOpenMilestone] = useState(activeMilestone.name);

  return (
    <div className="grid gap-4">
      <section className="relative overflow-hidden rounded-[1.6rem] border border-cyan-300/18 bg-cyan-400/[0.055] p-4 shadow-[0_0_46px_rgba(34,211,238,0.08)] backdrop-blur-xl sm:p-6">
        <div className="absolute right-8 top-6 h-24 w-24 rounded-full border border-cyan-300/20 bg-cyan-400/10 blur-xl motion-safe:animate-pulse" />
        <div className="relative grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(24rem,0.95fr)] xl:items-end">
          <div className="min-w-0">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-200">
              Project Progression
            </p>
            <h1 className="mt-2 break-words text-3xl font-black text-white sm:text-5xl">
              Project Timeline
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-300">
              Track every milestone from discovery through launch and support.
            </p>
            <span
              className={`mt-4 inline-flex rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] ${
                isPreviewData
                  ? "border-violet-300/20 bg-violet-500/10 text-violet-100"
                  : "border-emerald-300/20 bg-emerald-400/10 text-emerald-100"
              }`}
            >
              {isPreviewData ? "Preview Data" : "Supabase Data"}
            </span>
          </div>

          <div className="grid min-w-0 gap-3 sm:grid-cols-2">
            {heroStats.map((stat) => (
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

      <section className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_0_34px_rgba(34,211,238,0.05)] backdrop-blur-xl sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">
              Visual Timeline
            </p>
            <h2 className="mt-2 text-2xl font-black text-white">
              Milestone Flow
            </h2>
          </div>
          <StatusPill status={activeMilestone.status} />
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-7">
          {portalTimelineMilestones.map((milestone, index) => (
            <button
              key={milestone.name}
              type="button"
              onClick={() => setOpenMilestone(milestone.name)}
              className={`relative min-w-0 rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 ${getMilestoneTone(
                milestone.status,
              )}`}
            >
              {index < portalTimelineMilestones.length - 1 ? (
                <span className="pointer-events-none absolute left-1/2 top-full hidden h-3 w-px -translate-x-1/2 bg-cyan-300/25 xl:left-full xl:top-1/2 xl:block xl:h-px xl:w-3 xl:-translate-y-1/2" />
              ) : null}
              <div className="flex items-start justify-between gap-2">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-black/24 text-xs font-black">
                  {index + 1}
                </span>
                <span className="text-[10px] font-black uppercase tracking-[0.12em]">
                  {milestone.status}
                </span>
              </div>
              <p className="mt-3 break-words font-black">{milestone.name}</p>
              <div className="mt-3">
                <ProgressBar value={milestone.progress} />
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-12">
        <div className="min-w-0 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_0_34px_rgba(124,58,237,0.06)] backdrop-blur-xl sm:p-5 xl:col-span-8">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-200">
                Milestone Details
              </p>
              <h2 className="mt-2 text-2xl font-black text-white">
                Expand the current path
              </h2>
            </div>
            <span className="rounded-full border border-violet-300/18 bg-violet-500/[0.08] px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-violet-100">
              {portalTimelineMilestones.length} milestones
            </span>
          </div>

          <div className="mt-4 grid gap-3">
            {portalTimelineMilestones.map((milestone) => (
              <MilestoneCard
                key={milestone.name}
                milestone={milestone}
                open={openMilestone === milestone.name}
                onToggle={() =>
                  setOpenMilestone((current) =>
                    current === milestone.name ? "" : milestone.name,
                  )
                }
              />
            ))}
          </div>
        </div>

        <div className="grid min-w-0 content-start gap-4 xl:col-span-4">
          <section className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_0_34px_rgba(34,211,238,0.05)] backdrop-blur-xl sm:p-5">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">
              Project Health
            </p>
            <div className="mt-4 grid gap-3">
              {portalTimelineHealth.map((item) => (
                <article
                  key={item.label}
                  className="rounded-2xl border border-white/10 bg-black/24 p-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <h3 className="font-black text-white">{item.label}</h3>
                    <StatusPill status={item.status} />
                  </div>
                  <p className="mt-2 text-sm leading-6 text-zinc-300">
                    {item.detail}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_0_34px_rgba(124,58,237,0.06)] backdrop-blur-xl sm:p-5">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-200">
              Next Client Actions
            </p>
            <div className="mt-4 grid gap-3">
              {portalTimelineActions.map((action) => (
                <article
                  key={action.title}
                  className="rounded-2xl border border-white/10 bg-black/24 p-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <h3 className="font-black text-white">{action.title}</h3>
                    <StatusPill status={action.priority} />
                  </div>
                  <p className="mt-2 text-xs font-black uppercase tracking-[0.14em] text-zinc-500">
                    {action.status}
                  </p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-12">
        <div className="min-w-0 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_0_34px_rgba(34,211,238,0.05)] backdrop-blur-xl sm:p-5 xl:col-span-8">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">
                Activity Snapshot
              </p>
              <h2 className="mt-2 text-2xl font-black text-white">
                Recent timeline events
              </h2>
            </div>
            <span className="rounded-full border border-cyan-300/18 bg-cyan-400/[0.07] px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-cyan-100">
              Live-ready
            </span>
          </div>

          <div className="mt-4 grid gap-3 lg:grid-cols-2">
            {portalTimelineActivity.map((event) => (
              <article
                key={`${event.title}-${event.timestamp}`}
                className="min-w-0 rounded-2xl border border-white/10 bg-black/24 p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <h3 className="break-words font-black text-white">
                    {event.title}
                  </h3>
                  <StatusPill status={event.status} />
                </div>
                <p className="mt-2 text-sm leading-6 text-zinc-300">
                  {event.description}
                </p>
                <p className="mt-3 text-[10px] font-black uppercase tracking-[0.14em] text-zinc-500">
                  {event.timestamp}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="min-w-0 rounded-[1.5rem] border border-cyan-300/14 bg-cyan-400/[0.06] p-4 shadow-[0_0_34px_rgba(34,211,238,0.05)] backdrop-blur-xl sm:p-5 xl:col-span-4">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-100">
            Future Timeline Hooks
          </p>
          <div className="mt-4 grid gap-3">
            {[
              "Supabase milestones",
              "Client approvals",
              "Deliverables completion",
              "Launch readiness score",
              "Damarko project intelligence",
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
            Future implementation can hydrate milestones from project records,
            sync approval status, calculate launch readiness, and generate
            Damarko timeline summaries.
          </p>
        </div>
      </section>

      {/* Future: connect this engine to Supabase milestones, approvals, deliverables, readiness scoring, and Damarko intelligence. */}
    </div>
  );
}
