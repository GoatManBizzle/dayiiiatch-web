"use client";

import { useState } from "react";

import { clientProjects, projectStages, statusTone } from "@/lib/portal-data";

type PortalProject = (typeof clientProjects)[number];

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

function ProjectProgress({ project }: { project: PortalProject }) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs font-bold text-zinc-400">
        <span>{project.stage}</span>
        <span>{project.progress}%</span>
      </div>
      <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-cyan-300/80 via-sky-300/70 to-violet-300/80 shadow-[0_0_18px_rgba(34,211,238,0.18)]"
          style={{ width: `${project.progress}%` }}
        />
      </div>
    </div>
  );
}

export default function PortalProjectsWorkspace() {
  const [selectedProject, setSelectedProject] = useState<PortalProject | null>(
    null,
  );

  return (
    <>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {clientProjects.map((project) => (
          <article
            key={project.title}
            className="group flex min-h-[21rem] flex-col rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-4 shadow-[0_0_30px_rgba(34,211,238,0.05)] backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-cyan-300/28 hover:shadow-[0_0_34px_rgba(34,211,238,0.1)]"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-zinc-500">
                  Client Project
                </p>
                <h2 className="mt-2 text-xl font-black leading-tight text-white">
                  {project.title}
                </h2>
              </div>
              <StatusPill status={project.status} />
            </div>

            <div className="mt-5 grid gap-3">
              <ProjectProgress project={project} />
              <div className="grid gap-2 text-sm">
                <div className="rounded-2xl border border-white/10 bg-black/24 px-3 py-3">
                  <p className="text-[10px] font-black uppercase tracking-[0.14em] text-zinc-500">
                    Current Phase
                  </p>
                  <p className="mt-1 font-bold text-zinc-100">
                    {project.stage}
                  </p>
                </div>
                <div className="rounded-2xl border border-cyan-300/14 bg-cyan-400/[0.06] px-3 py-3">
                  <p className="text-[10px] font-black uppercase tracking-[0.14em] text-cyan-200">
                    Next Step
                  </p>
                  <p className="mt-1 leading-5 text-zinc-200">
                    {project.nextStep}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-auto pt-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-zinc-500">
                  Updated {project.updated}
                </p>
                <button
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  className="rounded-2xl border border-cyan-300/28 bg-cyan-400/10 px-4 py-2.5 text-xs font-black uppercase tracking-[0.12em] text-cyan-100 transition hover:-translate-y-0.5 hover:bg-cyan-400/18 hover:shadow-[0_0_18px_rgba(34,211,238,0.14)]"
                >
                  View Project
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>

      {selectedProject ? (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/76 px-4 py-6 backdrop-blur-md"
          onClick={() => setSelectedProject(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="portal-project-title"
            className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-[1.75rem] border border-cyan-300/20 bg-zinc-950/92 p-4 shadow-[0_0_70px_rgba(34,211,238,0.16)] backdrop-blur-2xl sm:p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-200">
                  Project Detail
                </p>
                <h2
                  id="portal-project-title"
                  className="mt-2 text-2xl font-black leading-tight text-white sm:text-4xl"
                >
                  {selectedProject.title}
                </h2>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <StatusPill status={selectedProject.status} />
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="rounded-full border border-white/10 bg-white/[0.055] px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-zinc-200 transition hover:border-cyan-300/28 hover:text-cyan-100"
                >
                  Close
                </button>
              </div>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
              <section className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">
                      Milestone Timeline
                    </p>
                    <p className="mt-1 text-sm text-zinc-400">
                      Current phase: {selectedProject.stage}
                    </p>
                  </div>
                  <span className="text-sm font-black text-cyan-100">
                    {selectedProject.progress}%
                  </span>
                </div>

                <div className="mt-5 grid gap-3">
                  {projectStages.map((stage, index) => {
                    const activeIndex = projectStages.indexOf(
                      selectedProject.stage,
                    );
                    const complete = index < activeIndex;
                    const active = index === activeIndex;

                    return (
                      <div
                        key={stage}
                        className={`grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-2xl border px-3 py-3 ${
                          active
                            ? "border-cyan-300/28 bg-cyan-400/10"
                            : complete
                              ? "border-emerald-300/18 bg-emerald-400/[0.06]"
                              : "border-white/10 bg-black/24"
                        }`}
                      >
                        <span
                          className={`flex h-9 w-9 items-center justify-center rounded-xl border text-xs font-black ${
                            active
                              ? "border-cyan-300/35 bg-cyan-400/14 text-cyan-100"
                              : complete
                                ? "border-emerald-300/25 bg-emerald-400/10 text-emerald-100"
                                : "border-white/10 bg-white/[0.04] text-zinc-400"
                          }`}
                        >
                          {index + 1}
                        </span>
                        <span className="font-bold text-zinc-100">{stage}</span>
                        <span className="text-[10px] font-black uppercase tracking-[0.12em] text-zinc-500">
                          {active ? "Active" : complete ? "Done" : "Queued"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </section>

              <div className="grid gap-4">
                <section className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-200">
                    Recent Activity
                  </p>
                  <div className="mt-4 grid gap-3">
                    {selectedProject.activity.map((note) => (
                      <div
                        key={note}
                        className="rounded-2xl border border-white/10 bg-black/24 px-3 py-3 text-sm leading-6 text-zinc-300"
                      >
                        {note}
                      </div>
                    ))}
                  </div>
                </section>

                <section className="rounded-[1.5rem] border border-cyan-300/18 bg-cyan-400/[0.07] p-4 shadow-[0_0_28px_rgba(34,211,238,0.06)]">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-100">
                    Next Action Needed
                  </p>
                  <p className="mt-3 text-sm leading-6 text-zinc-100">
                    {selectedProject.nextAction}
                  </p>
                </section>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
