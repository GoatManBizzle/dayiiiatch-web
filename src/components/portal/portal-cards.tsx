import Link from "next/link";

import PortalActivityWidget from "@/components/portal/portal-activity-widget";
import type { PortalActivityEvent } from "@/lib/activity-events";
import {
  bookingTimelineStages,
  clientProjects,
  deliverableCategories,
  fileCategories,
  portalClientBookings,
  portalActivityFeed,
  portalDeliverables,
  portalMeetings,
  portalConversations,
  portalPermissionAreas,
  portalProjectMilestones,
  portalRoles,
  portalUpdates,
  portalUploads,
  projectStages,
  statusTone,
} from "@/lib/portal-data";

export type PortalProjectCardData = {
  title: string;
  status: string;
  progress: number;
  nextStep: string;
  nextAction: string;
  updated: string;
  stage: string;
  activity: string[];
};

export function StatusPill({ status }: { status: string }) {
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

export function PortalPageIntro({
  eyebrow = "Client Workspace",
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description: string;
}) {
  return (
    <section className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_0_30px_rgba(34,211,238,0.04)] backdrop-blur-xl sm:p-5">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-200">
        {eyebrow}
      </p>
      <h1 className="mt-2 text-2xl font-black leading-tight text-white sm:text-4xl">
        {title}
      </h1>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-300">
        {description}
      </p>
    </section>
  );
}

export function ProjectCard({
  project,
}: {
  project: PortalProjectCardData;
}) {
  return (
    <article className="flex h-full flex-col rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-4 shadow-[0_0_28px_rgba(34,211,238,0.04)] backdrop-blur-xl">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-black text-white">{project.title}</h3>
        <StatusPill status={project.status} />
      </div>
      <p className="mt-3 text-sm leading-6 text-zinc-300">
        Next: {project.nextStep}
      </p>
      <div className="mt-auto pt-4">
        <div className="flex items-center justify-between text-xs font-bold text-zinc-400">
          <span>{project.stage}</span>
          <span>{project.progress}%</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-300/75 to-violet-300/75"
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>
      <p className="mt-3 text-xs font-bold uppercase tracking-[0.14em] text-zinc-500">
        Updated {project.updated}
      </p>
    </article>
  );
}

export function DashboardOverview({
  projects = clientProjects,
  isPreviewData = true,
  activityEvents,
}: {
  projects?: PortalProjectCardData[];
  isPreviewData?: boolean;
  activityEvents?: PortalActivityEvent[];
}) {
  return (
    <div className="grid gap-4">
      <div className="flex justify-end">
        <span
          className={`rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] ${
            isPreviewData
              ? "border-violet-300/20 bg-violet-500/10 text-violet-100"
              : "border-emerald-300/20 bg-emerald-400/10 text-emerald-100"
          }`}
        >
          {isPreviewData ? "Preview Data" : "Supabase Data"}
        </span>
      </div>

      <div className="grid items-stretch gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>

      <div className="grid items-stretch gap-4 lg:grid-cols-3">
        <Panel title="Latest Updates" eyebrow="Operations">
          {portalUpdates.map((update) => (
            <div
              key={update}
              className="rounded-2xl border border-white/10 bg-black/24 px-3 py-3 text-sm text-zinc-300"
            >
              {update}
            </div>
          ))}
        </Panel>
        <Panel title="Upcoming Meetings" eyebrow="Scheduler">
          {portalMeetings.map((meeting) => (
            <div
              key={`${meeting.title}-${meeting.date}`}
              className="rounded-2xl border border-white/10 bg-black/24 px-3 py-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-bold text-white">{meeting.title}</p>
                  <p className="mt-1 text-sm text-zinc-400">
                    {meeting.date} / {meeting.time}
                  </p>
                </div>
                <StatusPill status={meeting.status} />
              </div>
            </div>
          ))}
        </Panel>
        <PortalActivityWidget
          title="Recent Activity"
          eyebrow="Activity"
          events={activityEvents}
          isPreviewData={!activityEvents?.length}
        />
      </div>

      <div className="rounded-[1.25rem] border border-cyan-300/14 bg-cyan-400/[0.06] px-4 py-3 text-center text-xs font-bold uppercase tracking-[0.16em] text-cyan-100 shadow-[0_0_24px_rgba(34,211,238,0.04)]">
        Secure workspace preview: permissions, client auth, and project-specific
        data hooks are ready for the next platform layer.
      </div>

      <PortalOperationsLayer activityEvents={activityEvents} />
    </div>
  );
}

export function PortalOperationsLayer({
  activityEvents,
}: {
  activityEvents?: PortalActivityEvent[];
}) {
  return (
    <section className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
      <ActivityFeed events={activityEvents} />
      <ProjectMilestoneTimeline />
    </section>
  );
}

export function ActivityFeed({
  events,
}: {
  events?: PortalActivityEvent[];
}) {
  const feed = events?.length
    ? events.map((event) => ({
        title: event.title,
        description: event.description,
        timestamp: event.timestamp,
        status: event.status,
        icon: event.icon,
      }))
    : portalActivityFeed;

  return (
    <section className="min-w-0 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_0_34px_rgba(34,211,238,0.05)] backdrop-blur-xl sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">
            Live Activity
          </p>
          <h2 className="mt-2 text-2xl font-black text-white">
            Activity Feed
          </h2>
        </div>
        <span className="rounded-full border border-cyan-300/18 bg-cyan-400/[0.07] px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-cyan-100">
          Realtime Ready
        </span>
      </div>

      <div className="mt-4 grid gap-3">
        {feed.map((activity, index) => (
          <article
            key={`${activity.title}-${activity.timestamp}`}
            className="group grid min-w-0 grid-cols-[auto_minmax(0,1fr)] gap-3 rounded-2xl border border-white/10 bg-black/24 p-3 transition hover:border-cyan-300/24 hover:bg-cyan-400/[0.045]"
          >
            <div className="relative">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-400/10 text-[10px] font-black text-cyan-100 shadow-[0_0_18px_rgba(34,211,238,0.08)] transition group-hover:scale-105">
                {activity.icon}
              </span>
              {index === 0 ? (
                <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full bg-cyan-300/80 shadow-[0_0_14px_rgba(34,211,238,0.55)] motion-safe:animate-pulse" />
              ) : null}
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <h3 className="break-words font-black text-white">
                  {activity.title}
                </h3>
                <StatusPill status={activity.status} />
              </div>
              <p className="mt-2 text-sm leading-6 text-zinc-300">
                {activity.description}
              </p>
              <p className="mt-2 text-[10px] font-black uppercase tracking-[0.14em] text-zinc-500">
                {activity.timestamp}
              </p>
            </div>
          </article>
        ))}
      </div>

      {/* Future: hydrate from Supabase activity table and subscribe to realtime project events. */}
    </section>
  );
}

export function ProjectMilestoneTimeline() {
  return (
    <section className="min-w-0 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_0_34px_rgba(124,58,237,0.06)] backdrop-blur-xl sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-200">
            Project Timeline
          </p>
          <h2 className="mt-2 text-2xl font-black text-white">
            Milestone Progress
          </h2>
        </div>
        <span className="rounded-full border border-violet-300/18 bg-violet-500/[0.08] px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-violet-100">
          Damarko Summary Ready
        </span>
      </div>

      <div className="mt-4 grid gap-3">
        {portalProjectMilestones.map((milestone, index) => (
          <article
            key={milestone.title}
            className="grid min-w-0 grid-cols-[auto_minmax(0,1fr)] gap-3 rounded-2xl border border-white/10 bg-black/24 p-3"
          >
            <div className="flex flex-col items-center">
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-2xl border text-xs font-black ${
                  milestone.status === "Active"
                    ? "border-cyan-300/35 bg-cyan-400/14 text-cyan-100 shadow-[0_0_18px_rgba(34,211,238,0.12)]"
                    : milestone.status === "Done"
                      ? "border-emerald-300/25 bg-emerald-400/10 text-emerald-100"
                      : "border-white/10 bg-white/[0.04] text-zinc-400"
                }`}
              >
                {index + 1}
              </span>
              {index < portalProjectMilestones.length - 1 ? (
                <span className="mt-2 h-full min-h-8 w-px bg-gradient-to-b from-cyan-300/35 to-violet-300/10" />
              ) : null}
            </div>

            <div className="min-w-0 pb-1">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <h3 className="font-black text-white">{milestone.title}</h3>
                <StatusPill status={milestone.status} />
              </div>
              <p className="mt-2 text-sm leading-6 text-zinc-300">
                {milestone.description}
              </p>
              <div className="mt-3">
                <div className="flex items-center justify-between gap-3 text-[10px] font-black uppercase tracking-[0.14em] text-zinc-500">
                  <span>Progress</span>
                  <span>{milestone.progress}%</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-300/80 via-sky-300/70 to-violet-300/80 shadow-[0_0_18px_rgba(34,211,238,0.16)] transition-[width] duration-700"
                    style={{ width: `${milestone.progress}%` }}
                  />
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Future: connect to project_milestones table and Damarko-generated client summaries. */}
    </section>
  );
}

export function ProjectTracker() {
  return (
    <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
      <Panel title="Milestone Timeline" eyebrow="Project Tracker">
        {projectStages.map((stage, index) => (
          <div
            key={stage}
            className="grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-2xl border border-white/10 bg-black/24 px-3 py-3"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-300/18 bg-cyan-400/8 text-xs font-black text-cyan-100">
              {index + 1}
            </span>
            <span className="font-bold text-zinc-100">{stage}</span>
            <span className="text-xs font-bold uppercase tracking-[0.12em] text-zinc-500">
              {index < 3 ? "Active" : "Queued"}
            </span>
          </div>
        ))}
      </Panel>
      <Panel title="Task Stages" eyebrow="Progress">
        {clientProjects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </Panel>
    </div>
  );
}

export function FileUploadCenter() {
  const acceptedFileTypes = [
    "Logos",
    "Images",
    "PDFs",
    "Contracts",
    "Reference files",
    "Videos",
  ];

  return (
    <div className="grid gap-4 xl:grid-cols-[0.85fr_1.15fr]">
      <section className="min-w-0 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_0_34px_rgba(34,211,238,0.06)] backdrop-blur-xl sm:p-5">
        <div className="rounded-[1.25rem] border border-dashed border-cyan-300/28 bg-cyan-400/[0.07] p-5 text-center shadow-[inset_0_0_28px_rgba(34,211,238,0.06)] sm:p-7">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-300/25 bg-black/28 text-2xl font-black text-cyan-100">
            +
          </div>
          <p className="mt-4 text-xs font-black uppercase tracking-[0.18em] text-cyan-100">
            Upload Center
          </p>
          <h2 className="mt-3 text-2xl font-black text-white">
            Drop client assets here
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-zinc-300">
            Stage logos, images, PDFs, contracts, references, and videos before
            they move into project review.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {acceptedFileTypes.map((type) => (
              <span
                key={type}
                className="rounded-full border border-white/10 bg-black/24 px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-zinc-300"
              >
                {type}
              </span>
            ))}
          </div>
          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
            <button
              type="button"
              className="rounded-2xl border border-cyan-300/28 bg-cyan-400/12 px-5 py-3 text-sm font-black text-cyan-100 transition hover:-translate-y-0.5 hover:bg-cyan-400/18"
            >
              Select Files
            </button>
            <button
              type="button"
              className="rounded-2xl border border-violet-300/24 bg-violet-500/10 px-5 py-3 text-sm font-black text-violet-100 transition hover:-translate-y-0.5 hover:bg-violet-500/16"
            >
              Create Folder
            </button>
          </div>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {[
            ["Storage", "UI only"],
            ["Max Type", "Video ready"],
            ["Review Flow", "Status chips"],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-2xl border border-white/10 bg-black/24 px-3 py-3"
            >
              <p className="text-[10px] font-black uppercase tracking-[0.14em] text-zinc-500">
                {label}
              </p>
              <p className="mt-1 font-black text-zinc-100">{value}</p>
            </div>
          ))}
        </div>

        {/* Supabase Storage can connect here later with bucket, path, and signed URL metadata. */}
      </section>

      <section className="min-w-0 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_0_34px_rgba(124,58,237,0.06)] backdrop-blur-xl sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-200">
              File List
            </p>
            <h2 className="mt-2 text-2xl font-black text-white">
              Recent Client Files
            </h2>
          </div>
          <span className="rounded-full border border-cyan-300/18 bg-cyan-400/[0.07] px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-cyan-100">
            {portalUploads.length} files
          </span>
        </div>

        <div className="mt-4 grid gap-3">
          {portalUploads.map((upload) => (
            <article
              key={upload.name}
              className="min-w-0 rounded-2xl border border-white/10 bg-black/24 p-3 transition hover:border-cyan-300/22 hover:bg-cyan-400/[0.045]"
            >
              <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="min-w-0 break-words font-black text-white">
                      {upload.name}
                    </p>
                    <StatusPill status={upload.status} />
                  </div>
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs font-bold uppercase tracking-[0.12em] text-zinc-500">
                    <span>{upload.category}</span>
                    <span>{upload.type}</span>
                    <span>{upload.uploaded}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:justify-end">
                  {["View", "Download", "Replace"].map((action) => (
                    <button
                      key={`${upload.name}-${action}`}
                      type="button"
                      className="rounded-xl border border-white/10 bg-white/[0.045] px-3 py-2 text-xs font-black text-zinc-200 transition hover:border-cyan-300/28 hover:bg-cyan-400/10 hover:text-cyan-100"
                    >
                      {action}
                    </button>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export function MessagesLayer() {
  const selectedConversation = portalConversations[0];

  return (
    <div className="grid gap-4 xl:grid-cols-[0.85fr_1.15fr]">
      <section className="min-w-0 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_0_34px_rgba(34,211,238,0.05)] backdrop-blur-xl sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">
              Conversations
            </p>
            <h2 className="mt-2 text-2xl font-black text-white">
              Message Center
            </h2>
          </div>
          <span className="rounded-full border border-cyan-300/18 bg-cyan-400/[0.07] px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-cyan-100">
            {portalConversations.length} threads
          </span>
        </div>

        <div className="mt-4 grid gap-3">
          {portalConversations.map((conversation, index) => (
            <button
              key={conversation.title}
              type="button"
              className={`min-w-0 rounded-2xl border p-3 text-left transition ${
                index === 0
                  ? "border-cyan-300/28 bg-cyan-400/[0.08] shadow-[0_0_22px_rgba(34,211,238,0.08)]"
                  : "border-white/10 bg-black/24 hover:border-violet-300/24 hover:bg-violet-500/[0.06]"
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="break-words font-black text-white">
                    {conversation.title}
                  </p>
                  <p className="mt-1 text-sm leading-5 text-zinc-400">
                    {conversation.summary}
                  </p>
                </div>
                <StatusPill status={conversation.status} />
              </div>
              <p className="mt-3 text-[10px] font-black uppercase tracking-[0.14em] text-zinc-500">
                {conversation.lastActivity}
              </p>
            </button>
          ))}
        </div>
      </section>

      <section className="min-w-0 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_0_34px_rgba(124,58,237,0.06)] backdrop-blur-xl sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-200">
              Selected Thread
            </p>
            <h2 className="mt-2 break-words text-2xl font-black text-white">
              {selectedConversation.title}
            </h2>
            <p className="mt-2 text-sm leading-6 text-zinc-400">
              {selectedConversation.summary}
            </p>
          </div>
          <StatusPill status={selectedConversation.status} />
        </div>

        <div className="mt-5 grid gap-3">
          {selectedConversation.messages.map((message) => (
            <article
              key={`${message.sender}-${message.timestamp}`}
              className="min-w-0 rounded-2xl border border-white/10 bg-black/24 p-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="font-black text-white">{message.sender}</p>
                  <p className="mt-1 text-[10px] font-black uppercase tracking-[0.14em] text-zinc-500">
                    {message.timestamp}
                  </p>
                </div>
                <StatusPill status={message.status} />
              </div>
              <p className="mt-3 break-words text-sm leading-6 text-zinc-300">
                {message.text}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-4 rounded-[1.25rem] border border-cyan-300/16 bg-cyan-400/[0.055] p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-100">
              Composer
            </p>
            <label className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.12em] text-zinc-300">
              <span className="h-5 w-9 rounded-full border border-violet-300/24 bg-violet-500/10 p-0.5">
                <span className="block h-3.5 w-3.5 rounded-full bg-violet-200/80" />
              </span>
              Internal note
            </label>
          </div>
          <textarea
            rows={5}
            placeholder="Write a message, update, revision note, or client-facing response..."
            className="mt-3 w-full resize-none rounded-2xl border border-white/10 bg-black/35 px-4 py-4 text-sm leading-6 text-white outline-none placeholder:text-zinc-500 focus:border-cyan-300/45"
          />
          <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:justify-between">
            <button className="rounded-2xl border border-white/10 bg-white/[0.045] px-5 py-3 text-sm font-black text-zinc-200 transition hover:border-violet-300/28 hover:bg-violet-500/10 hover:text-violet-100">
              Attach File
            </button>
            <button className="rounded-2xl border border-cyan-300/28 bg-cyan-400/12 px-5 py-3 text-sm font-black text-cyan-100 transition hover:-translate-y-0.5 hover:bg-cyan-400/18">
              Send Message
            </button>
          </div>
          <p className="mt-3 text-xs leading-5 text-zinc-500">
            UI-only composer. Realtime delivery, attachments, read receipts, and
            internal visibility rules can connect to Supabase later.
          </p>
        </div>
        {/* Supabase realtime/messages table hooks can attach here later. */}
      </section>
    </div>
  );
}

export function PortalBookings() {
  return (
    <div className="grid gap-4">
      <section className="min-w-0 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_0_34px_rgba(34,211,238,0.05)] backdrop-blur-xl sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">
              Upcoming Meetings
            </p>
            <h2 className="mt-2 text-2xl font-black text-white">
              Scheduler Workspace
            </h2>
          </div>
          <span className="rounded-full border border-cyan-300/18 bg-cyan-400/[0.07] px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-cyan-100">
            {portalClientBookings.length} upcoming
          </span>
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-2 2xl:grid-cols-3">
          {portalClientBookings.map((booking) => (
            <article
              key={`${booking.serviceName}-${booking.date}`}
              className="flex min-w-0 flex-col rounded-[1.25rem] border border-white/10 bg-black/24 p-4 transition hover:border-cyan-300/24 hover:bg-cyan-400/[0.045]"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[10px] font-black uppercase tracking-[0.16em] text-zinc-500">
                    {booking.meetingType}
                  </p>
                  <h3 className="mt-2 break-words text-xl font-black text-white">
                    {booking.serviceName}
                  </h3>
                </div>
                <StatusPill status={booking.status} />
              </div>

              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/[0.035] px-3 py-3">
                  <p className="text-[10px] font-black uppercase tracking-[0.14em] text-zinc-500">
                    Date
                  </p>
                  <p className="mt-1 font-bold text-zinc-100">
                    {booking.date}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.035] px-3 py-3">
                  <p className="text-[10px] font-black uppercase tracking-[0.14em] text-zinc-500">
                    Time
                  </p>
                  <p className="mt-1 font-bold text-zinc-100">
                    {booking.time}
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-violet-300/14 bg-violet-500/[0.06] px-3 py-3">
                <p className="text-[10px] font-black uppercase tracking-[0.14em] text-violet-100">
                  Agenda Preview
                </p>
                <p className="mt-2 text-sm leading-6 text-zinc-300">
                  {booking.notes}
                </p>
              </div>

              <div className="mt-auto flex flex-wrap gap-2 pt-4">
                <button className="rounded-xl border border-cyan-300/24 bg-cyan-400/10 px-3 py-2 text-xs font-black text-cyan-100 transition hover:bg-cyan-400/18">
                  Reschedule
                </button>
                <button className="rounded-xl border border-emerald-300/24 bg-emerald-400/10 px-3 py-2 text-xs font-black text-emerald-100 transition hover:bg-emerald-400/16">
                  Confirm
                </button>
                <button className="rounded-xl border border-violet-300/24 bg-violet-500/10 px-3 py-2 text-xs font-black text-violet-100 transition hover:bg-violet-500/16">
                  Add Notes
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        <div className="min-w-0 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_0_34px_rgba(124,58,237,0.06)] backdrop-blur-xl sm:p-5">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-200">
            Book New Session
          </p>
          <h2 className="mt-2 text-2xl font-black text-white">
            Schedule the next move
          </h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-1">
            <Link
              href="/book?service=free-call"
              className="rounded-2xl border border-cyan-300/24 bg-cyan-400/10 px-4 py-4 transition hover:-translate-y-0.5 hover:bg-cyan-400/18"
            >
              <p className="font-black text-cyan-100">Free Call</p>
              <p className="mt-1 text-sm leading-5 text-zinc-300">
                Start a quick check-in or clarify the next project step.
              </p>
            </Link>
            <Link
              href="/book?service=premium-session"
              className="rounded-2xl border border-violet-300/24 bg-violet-500/10 px-4 py-4 transition hover:-translate-y-0.5 hover:bg-violet-500/16"
            >
              <p className="font-black text-violet-100">Premium Session</p>
              <p className="mt-1 text-sm leading-5 text-zinc-300">
                Book deeper strategy, implementation, or launch support time.
              </p>
            </Link>
          </div>
        </div>

        <div className="min-w-0 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_0_34px_rgba(34,211,238,0.04)] backdrop-blur-xl sm:p-5">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">
            Meeting Timeline
          </p>
          <div className="mt-4 grid gap-3">
            {bookingTimelineStages.map((stage, index) => {
              const currentIndex = bookingTimelineStages.indexOf(
                portalClientBookings[0].currentStage,
              );
              const complete = index < currentIndex;
              const active = index === currentIndex;

              return (
                <div
                  key={stage}
                  className={`grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-2xl border px-3 py-3 ${
                    active
                      ? "border-cyan-300/28 bg-cyan-400/10"
                      : complete
                        ? "border-emerald-300/18 bg-emerald-400/[0.06]"
                        : "border-white/10 bg-black/24"
                  }`}
                >
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-xl border text-xs font-black ${
                      active
                        ? "border-cyan-300/35 bg-cyan-400/14 text-cyan-100"
                        : complete
                          ? "border-emerald-300/25 bg-emerald-400/10 text-emerald-100"
                          : "border-white/10 bg-white/[0.04] text-zinc-400"
                    }`}
                  >
                    {index + 1}
                  </span>
                  <span className="min-w-0 font-bold text-zinc-100">
                    {stage}
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-[0.12em] text-zinc-500">
                    {active ? "Active" : complete ? "Done" : "Queued"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="rounded-[1.25rem] border border-cyan-300/14 bg-cyan-400/[0.06] px-4 py-3 text-xs leading-5 text-cyan-100 shadow-[0_0_24px_rgba(34,211,238,0.04)]">
        Future scheduler hooks: look up bookings by Supabase client email/user,
        store reschedule requests, trigger meeting reminders, and sync confirmed
        sessions with an external calendar provider.
      </section>
    </div>
  );
}

export function FileCategories() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {fileCategories.map((category) => (
        <div
          key={category}
          className="rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-4 shadow-[0_0_24px_rgba(34,211,238,0.035)] transition hover:-translate-y-0.5 hover:border-violet-300/24 hover:bg-violet-500/[0.07]"
        >
          <p className="text-center text-sm font-black text-zinc-100">
            {category}
          </p>
          <p className="mt-2 text-center text-[10px] font-black uppercase tracking-[0.14em] text-zinc-500">
            {
              portalUploads.filter((upload) => upload.category === category)
                .length
            }{" "}
            item
          </p>
        </div>
      ))}
    </div>
  );
}

export function DeliverablesVault() {
  const readyCount = portalDeliverables.filter(
    (deliverable) => deliverable.status === "Ready",
  ).length;
  const reviewCount = portalDeliverables.filter(
    (deliverable) => deliverable.status === "In Review",
  ).length;
  const approvalCount = portalDeliverables.filter(
    (deliverable) => deliverable.status === "Needs Approval",
  ).length;

  return (
    <div className="grid gap-4">
      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
        {deliverableCategories.map((category) => (
          <article
            key={category}
            className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-4 shadow-[0_0_24px_rgba(124,58,237,0.04)] transition hover:-translate-y-0.5 hover:border-cyan-300/24 hover:bg-cyan-400/[0.06]"
          >
            <p className="break-words text-sm font-black text-zinc-100">
              {category}
            </p>
            <p className="mt-2 text-[10px] font-black uppercase tracking-[0.14em] text-zinc-500">
              {
                portalDeliverables.filter(
                  (deliverable) => deliverable.category === category,
                ).length
              }{" "}
              item
            </p>
          </article>
        ))}
      </section>

      {/* DAYIIIatch Space Friendly Layout: use the full dashboard width, avoid decorative empty panels, and let repeated cards form grids before squeezing them into narrow lists. */}
      <section className="grid gap-4 xl:grid-cols-12">
        <div className="grid min-w-0 content-start gap-4 xl:col-span-4">
          <div className="rounded-[1.25rem] border border-cyan-300/18 bg-cyan-400/[0.06] p-5">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-100">
              Deliverables Vault
            </p>
            <h2 className="mt-3 text-2xl font-black text-white">
              Launch-ready materials
            </h2>
            <p className="mt-3 text-sm leading-6 text-zinc-300">
              Finished assets, docs, walkthroughs, exports, and approval-ready
              materials live here before they move into long-term client
              storage.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
              {[
                ["Total Files", portalDeliverables.length.toString()],
                ["Ready", readyCount.toString()],
                ["In Review", reviewCount.toString()],
                ["Needs Approval", approvalCount.toString()],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/10 bg-black/24 px-3 py-3"
                >
                  <p className="text-[10px] font-black uppercase tracking-[0.14em] text-zinc-500">
                    {label}
                  </p>
                  <p className="mt-1 text-2xl font-black text-white">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.25rem] border border-violet-300/14 bg-violet-500/[0.06] px-4 py-4">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-100">
              Damarko Summary Placeholder
            </p>
            <p className="mt-2 text-sm leading-6 text-zinc-300">
              Future summaries can explain what changed, why each deliverable
              matters, and what the client should approve next.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
            {["Signed URLs", "Permissions", "Revision Flow"].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-black/24 px-3 py-3 text-sm font-bold text-zinc-200"
              >
                {item}
              </div>
            ))}
          </div>

          {/* Future: connect deliverables to Supabase Storage files, signed URLs, project permissions, and generated summaries. */}
        </div>

        <div className="min-w-0 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_0_34px_rgba(124,58,237,0.06)] backdrop-blur-xl sm:p-5 xl:col-span-8">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-200">
                Vault List
              </p>
              <h2 className="mt-2 text-2xl font-black text-white">
                Client Deliverables
              </h2>
            </div>
            <span className="rounded-full border border-cyan-300/18 bg-cyan-400/[0.07] px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-cyan-100">
              {portalDeliverables.length} files
            </span>
          </div>

          <div className="mt-4 grid items-stretch gap-3 lg:grid-cols-2">
            {portalDeliverables.map((deliverable) => (
              <article
                key={deliverable.title}
                className="flex min-w-0 flex-col rounded-2xl border border-white/10 bg-black/24 p-4 transition hover:border-cyan-300/22 hover:bg-cyan-400/[0.045]"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <h3 className="min-w-0 break-words font-black text-white">
                    {deliverable.title}
                  </h3>
                  <StatusPill status={deliverable.status} />
                </div>

                <p className="mt-3 text-sm leading-6 text-zinc-300">
                  {deliverable.summary}
                </p>

                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs font-bold uppercase tracking-[0.12em] text-zinc-500">
                  <span>{deliverable.category}</span>
                  <span>{deliverable.fileType}</span>
                  <span>{deliverable.added}</span>
                </div>

                <div className="mt-auto flex flex-wrap gap-2 pt-4">
                  {["View", "Download", "Request Revision"].map((action) => (
                    <button
                      key={`${deliverable.title}-${action}`}
                      type="button"
                      className="rounded-xl border border-white/10 bg-white/[0.045] px-3 py-2 text-xs font-black text-zinc-200 transition hover:border-cyan-300/28 hover:bg-cyan-400/10 hover:text-cyan-100"
                    >
                      {action}
                    </button>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export function PortalSettingsWorkspace() {
  const currentRole = portalRoles[0];

  return (
    <div className="grid gap-4">
      <section className="grid gap-4 xl:grid-cols-12">
        <div className="grid min-w-0 content-start gap-4 xl:col-span-4">
          <section className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_0_34px_rgba(34,211,238,0.05)] backdrop-blur-xl sm:p-5">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">
              Workspace Profile
            </p>
            <h2 className="mt-2 text-2xl font-black text-white">
              DAYIIIatch Client Workspace
            </h2>
            <div className="mt-4 grid gap-3">
              {[
                ["Workspace", "DAYIIIatch Growth Build"],
                ["Primary Contact", "client@example.com"],
                ["Access Mode", "Preview-safe demo data"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/10 bg-black/24 px-3 py-3"
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
          </section>

          <section className="rounded-[1.5rem] border border-violet-300/14 bg-violet-500/[0.06] p-4 shadow-[0_0_34px_rgba(124,58,237,0.05)] backdrop-blur-xl sm:p-5">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-100">
              User Role
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <h2 className="text-2xl font-black text-white">
                {currentRole.role}
              </h2>
              <span className="rounded-full border border-cyan-300/18 bg-cyan-400/[0.07] px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-cyan-100">
                {currentRole.badge}
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-zinc-300">
              {currentRole.summary}
            </p>
          </section>

          <section className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_0_34px_rgba(34,211,238,0.04)] backdrop-blur-xl sm:p-5">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">
              Notification Preferences
            </p>
            <div className="mt-4 grid gap-3">
              {[
                "Project activity summaries",
                "Deliverable approval requests",
                "Booking reminders",
                "File upload notifications",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/24 px-3 py-3"
                >
                  <span className="text-sm font-bold text-zinc-200">
                    {item}
                  </span>
                  <span className="h-5 w-9 rounded-full border border-cyan-300/24 bg-cyan-400/10 p-0.5">
                    <span className="block h-3.5 w-3.5 translate-x-4 rounded-full bg-cyan-200/80" />
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className="min-w-0 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_0_34px_rgba(124,58,237,0.06)] backdrop-blur-xl sm:p-5 xl:col-span-8">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-200">
                Access Permissions
              </p>
              <h2 className="mt-2 text-2xl font-black text-white">
                Roles Preview
              </h2>
            </div>
            <span className="rounded-full border border-violet-300/18 bg-violet-500/[0.08] px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-violet-100">
              {portalRoles.length} roles
            </span>
          </div>

          <div className="mt-4 grid gap-3">
            {portalRoles.map((role) => (
              <article
                key={role.role}
                className="min-w-0 rounded-2xl border border-white/10 bg-black/24 p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="font-black text-white">{role.role}</h3>
                    <p className="mt-1 text-sm leading-5 text-zinc-400">
                      {role.summary}
                    </p>
                  </div>
                  <span className="rounded-full border border-cyan-300/18 bg-cyan-400/[0.07] px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-cyan-100">
                    {role.badge}
                  </span>
                </div>

                <div className="mt-4 grid gap-2 sm:grid-cols-2 2xl:grid-cols-4">
                  {portalPermissionAreas.map((area) => (
                    <div
                      key={`${role.role}-${area}`}
                      className="rounded-xl border border-white/10 bg-white/[0.035] px-3 py-3"
                    >
                      <p className="text-[10px] font-black uppercase tracking-[0.14em] text-zinc-500">
                        {area}
                      </p>
                      <p className="mt-1 font-black text-zinc-100">
                        {role.permissions[area as keyof typeof role.permissions]}
                      </p>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      </section>

      <section className="rounded-[1.5rem] border border-cyan-300/14 bg-cyan-400/[0.06] p-4 shadow-[0_0_34px_rgba(34,211,238,0.04)] backdrop-blur-xl sm:p-5">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-100">
          Future Auth Notes
        </p>
        <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          {[
            "Supabase Auth identities",
            "user_roles table",
            "project_members table",
            "file permission policies",
            "approval permission workflow",
          ].map((note) => (
            <div
              key={note}
              className="rounded-2xl border border-white/10 bg-black/24 px-3 py-3 text-sm font-bold text-zinc-200"
            >
              {note}
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs leading-5 text-zinc-500">
          Future implementation should connect Supabase Auth users to workspace
          membership records, then enforce route, project, file, and approval
          access through row-level security policies.
        </p>
      </section>
    </div>
  );
}

export function Panel({
  title,
  eyebrow,
  children,
}: {
  title: string;
  eyebrow: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex h-full flex-col rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_0_30px_rgba(34,211,238,0.04)] backdrop-blur-xl">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-2xl font-black text-white">{title}</h2>
      <div className="mt-4 grid flex-1 content-start gap-3">{children}</div>
    </section>
  );
}
