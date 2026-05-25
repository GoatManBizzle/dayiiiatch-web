import Link from "next/link";

import {
  clientProjects,
  fileCategories,
  portalMeetings,
  portalMessages,
  portalUpdates,
  portalUploads,
  projectStages,
  statusTone,
} from "@/lib/portal-data";

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
  project: (typeof clientProjects)[number];
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

export function DashboardOverview() {
  return (
    <div className="grid gap-4">
      <div className="grid items-stretch gap-4 md:grid-cols-2 lg:grid-cols-3">
        {clientProjects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>

      <div className="grid items-stretch gap-4 lg:grid-cols-2">
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
      </div>

      <div className="rounded-[1.25rem] border border-cyan-300/14 bg-cyan-400/[0.06] px-4 py-3 text-center text-xs font-bold uppercase tracking-[0.16em] text-cyan-100 shadow-[0_0_24px_rgba(34,211,238,0.04)]">
        Secure workspace preview: permissions, client auth, and project-specific
        data hooks are ready for the next platform layer.
      </div>
    </div>
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
  return (
    <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
      <div className="rounded-[1.5rem] border border-dashed border-cyan-300/24 bg-cyan-400/8 p-6 text-center shadow-[0_0_32px_rgba(34,211,238,0.06)]">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-100">
          Upload Center
        </p>
        <h2 className="mt-3 text-2xl font-black text-white">
          Drop project assets here
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-zinc-300">
          Presentation UI for images, PDFs, logos, references, and contracts.
          Storage hooks can connect to Supabase later.
        </p>
        <button className="mt-5 rounded-2xl border border-cyan-300/28 bg-cyan-400/12 px-5 py-3 text-sm font-black text-cyan-100">
          Select Files
        </button>
      </div>
      <Panel title="Recent Uploads" eyebrow="Files">
        {portalUploads.map((upload) => (
          <div
            key={upload.name}
            className="rounded-2xl border border-white/10 bg-black/24 px-3 py-3"
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="font-bold text-white">{upload.name}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.14em] text-zinc-500">
                  {upload.type}
                </p>
              </div>
              <span className="text-sm font-bold text-cyan-100">
                {upload.status}
              </span>
            </div>
          </div>
        ))}
      </Panel>
    </div>
  );
}

export function MessagesLayer() {
  return (
    <Panel title="Project Communication" eyebrow="Messages">
      {portalMessages.map((message) => (
        <div
          key={`${message.author}-${message.time}`}
          className="rounded-2xl border border-white/10 bg-black/24 p-4"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-black text-white">{message.author}</p>
            <span className="rounded-full border border-violet-300/18 bg-violet-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-violet-100">
              {message.type}
            </span>
          </div>
          <p className="mt-3 text-sm leading-6 text-zinc-300">
            {message.message}
          </p>
          <p className="mt-3 text-xs font-bold uppercase tracking-[0.14em] text-zinc-500">
            {message.time}
          </p>
        </div>
      ))}
      <textarea
        rows={5}
        placeholder="Add an update note, revision request, or project comment..."
        className="w-full rounded-2xl border border-white/10 bg-black/35 px-4 py-4 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-cyan-300/45"
      />
      <button className="w-fit rounded-2xl border border-cyan-300/28 bg-cyan-400/12 px-5 py-3 text-sm font-black text-cyan-100">
        Save Draft Note
      </button>
    </Panel>
  );
}

export function PortalBookings() {
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
      <Panel title="Meetings" eyebrow="Booking Integration">
        {portalMeetings.map((meeting) => (
          <div
            key={`${meeting.title}-${meeting.date}`}
            className="rounded-2xl border border-white/10 bg-black/24 p-4"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="font-black text-white">{meeting.title}</h3>
                <p className="mt-1 text-sm text-zinc-400">
                  {meeting.date} at {meeting.time}
                </p>
              </div>
              <StatusPill status={meeting.status} />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                href="/book?service=free-call"
                className="rounded-xl border border-cyan-300/24 bg-cyan-400/10 px-3 py-2 text-xs font-black text-cyan-100"
              >
                Reschedule
              </Link>
              <button className="rounded-xl border border-emerald-300/24 bg-emerald-400/10 px-3 py-2 text-xs font-black text-emerald-100">
                Confirm
              </button>
            </div>
          </div>
        ))}
      </Panel>
      <Panel title="Scheduler Status" eyebrow="Operations">
        <div className="grid gap-3 sm:grid-cols-2">
          {["Booking flow online", "Reschedule path ready", "Reminder layer queued", "Admin sync active"].map(
            (item) => (
              <div
                key={item}
                className="rounded-2xl border border-cyan-300/12 bg-cyan-400/8 px-3 py-3 text-sm font-bold text-cyan-100"
              >
                {item}
              </div>
            ),
          )}
        </div>
      </Panel>
    </div>
  );
}

export function FileCategories() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {fileCategories.map((category) => (
        <div
          key={category}
          className="rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-4 text-center text-sm font-black text-zinc-100"
        >
          {category}
        </div>
      ))}
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
