"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import Reveal from "@/components/ui/reveal";

type ProofImage = {
  label: string;
  src: string;
};

type ProofImageSlot = {
  label: string;
  images: ProofImage[];
};

type Project = {
  title: string;
  status: string;
  statusTone: "green" | "cyan" | "violet";
  description: string;
  summary: string;
  problem: string;
  stack: string[];
  highlights: string[];
  badges: string[];
  imageSlots: ProofImageSlot[];
  demoVideoSrc: string;
};

function buildImageSlots(slug: string): ProofImageSlot[] {
  return [
    {
      label: "Screenshot slot",
      images: [
        {
          label: "Screenshot slot 1",
          src: `/images/proof/${slug}/screenshot-01.png`,
        },
        {
          label: "Screenshot slot 2",
          src: `/images/proof/${slug}/screenshot-01b.png`,
        },
        {
          label: "Screenshot slot 3",
          src: `/images/proof/${slug}/screenshot-01c.png`,
        },
      ],
    },
    {
      label: "Workflow visual",
      images: [
        {
          label: "Workflow visual 1",
          src: `/images/proof/${slug}/screenshot-02.png`,
        },
        {
          label: "Workflow visual 2",
          src: `/images/proof/${slug}/screenshot-02b.png`,
        },
        {
          label: "Workflow visual 3",
          src: `/images/proof/${slug}/screenshot-02c.png`,
        },
      ],
    },
    {
      label: "Dashboard preview",
      images: [
        {
          label: "Dashboard preview 1",
          src: `/images/proof/${slug}/screenshot-03.png`,
        },
        {
          label: "Dashboard preview 2",
          src: `/images/proof/${slug}/screenshot-03b.png`,
        },
        {
          label: "Dashboard preview 3",
          src: `/images/proof/${slug}/screenshot-03c.png`,
        },
      ],
    },
  ];
}

function getProjectImages(project: Project) {
  return project.imageSlots.flatMap((slot) => slot.images);
}

const projects: Project[] = [
  {
    title: "Scheduler Platform",
    status: "LIVE",
    statusTone: "green",
    description:
      "A live booking system with service paths, protected admin tools, slot checks, email handling, and operational controls.",
    summary:
      "A production booking infrastructure layer for free calls, premium sessions, admin review, reminders, exports, and live schedule visibility.",
    problem:
      "Manual booking back-and-forth creates missed details, unclear availability, and too much admin time before a client even starts.",
    stack: ["Next.js", "Supabase", "Resend", "Admin auth", "Vercel"],
    highlights: [
      "Service-specific booking paths",
      "Booked-slot protection",
      "Admin dashboard controls",
      "Email diagnostics and reminders",
    ],
    badges: ["Booking flow", "Admin dashboard", "Email alerts", "CSV exports"],
    imageSlots: buildImageSlots("scheduler"),
    demoVideoSrc: "/videos/proof/scheduler-demo.mp4",
  },
  {
    title: "Project Damarko",
    status: "ACTIVE DEVELOPMENT",
    statusTone: "cyan",
    description:
      "A premium web presence framework shaped for brand clarity, polished presentation, and conversion-ready service paths.",
    summary:
      "A brand-forward digital build focused on tighter service positioning, cleaner conversion flow, and a stronger first impression.",
    problem:
      "Scattered presentation makes it harder for visitors to understand the offer, trust the brand, and choose the right next step.",
    stack: ["Brand system", "Responsive UI", "CTA mapping", "Content flow"],
    highlights: [
      "Premium homepage structure",
      "Offer clarity and service paths",
      "Responsive section system",
      "Contact and booking funnel alignment",
    ],
    badges: ["Brand system", "Landing flow", "CTA map", "Mobile polish"],
    imageSlots: buildImageSlots("damarko"),
    demoVideoSrc: "/videos/proof/damarko-demo.mp4",
  },
  {
    title: "EchoForge Audio Suite",
    status: "INTERNAL BUILD",
    statusTone: "violet",
    description:
      "A creative tooling concept for audio workflows, production organization, AI-assisted support, and creator-ready dashboards.",
    summary:
      "An internal tool direction for organizing audio production workflows, creative assets, system prompts, and creator operations.",
    problem:
      "Creative production gets messy when ideas, assets, prompts, and workflow decisions live across too many disconnected places.",
    stack: ["Creator UX", "Audio workflow", "AI systems", "Dashboard design"],
    highlights: [
      "Workflow command center",
      "Audio project organization",
      "AI-assisted creative support",
      "Dashboard-ready interaction model",
    ],
    badges: ["Audio workflow", "Creator tools", "AI support", "Dashboard UX"],
    imageSlots: buildImageSlots("echoforge"),
    demoVideoSrc: "/videos/proof/echoforge-demo.mp4",
  },
];

const statusStyles: Record<Project["statusTone"], string> = {
  green:
    "border-emerald-300/25 bg-emerald-400/10 text-emerald-100 shadow-[0_0_18px_rgba(16,185,129,0.10)]",
  cyan:
    "border-cyan-300/25 bg-cyan-400/10 text-cyan-100 shadow-[0_0_18px_rgba(34,211,238,0.10)]",
  violet:
    "border-violet-300/25 bg-violet-500/10 text-violet-100 shadow-[0_0_18px_rgba(168,85,247,0.10)]",
};

function StatusPill({ project }: { project: Project }) {
  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] ${statusStyles[project.statusTone]}`}
    >
      {project.status}
    </span>
  );
}

export default function ProofSystemsSection() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activeScreenshot, setActiveScreenshot] = useState<{
    title: string;
    screenshots: ProofImage[];
    index: number;
  } | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!activeProject && !activeScreenshot) return;

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        if (activeScreenshot) {
          setActiveScreenshot(null);
          return;
        }

        setActiveProject(null);
      }
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [activeProject, activeScreenshot]);

  return (
    <section
      id="proof-systems"
      className="relative mt-12 overflow-visible rounded-[1.7rem] border border-cyan-300/10 bg-white/[0.035] p-5 shadow-[0_0_52px_rgba(34,211,238,0.07)] backdrop-blur-xl sm:rounded-[2rem] sm:p-6 md:mt-16 md:p-8"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_10%,rgba(34,211,238,0.14),transparent_32%),radial-gradient(circle_at_88%_18%,rgba(168,85,247,0.14),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.04),transparent_42%)]" />
      <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent" />

      <div className="relative z-10">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.18em] text-cyan-200 sm:text-sm sm:tracking-[0.25em]">
              Systems Proof
            </p>

            <h3 className="mt-2 text-2xl font-black leading-tight text-white sm:text-3xl md:text-4xl">
              Proof We Build Real Systems
            </h3>
          </div>

          <p className="max-w-2xl text-sm leading-6 text-zinc-300">
            Not just pretty screens. These builds are shaped around booking
            logic, admin workflows, creative tooling, and business-ready
            infrastructure.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <Reveal key={project.title} delayMs={index * 110}>
              <article className="card-sheen group relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-white/10 bg-zinc-950/65 p-4 shadow-[0_0_30px_rgba(34,211,238,0.04)] backdrop-blur-xl transition duration-500 ease-out hover:-translate-y-1 hover:border-cyan-300/35 hover:bg-white/[0.07] hover:shadow-[0_0_42px_rgba(34,211,238,0.13)] sm:rounded-[1.8rem] sm:p-5">
                <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-700 group-hover:translate-x-1 group-hover:translate-y-[-2px] group-hover:opacity-100">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(34,211,238,0.10),transparent_32%),radial-gradient(circle_at_82%_10%,rgba(168,85,247,0.10),transparent_30%)]" />
                </div>

                <div className="relative mb-5 flex items-start justify-between gap-4">
                  <div className="mt-2 h-1 w-16 rounded-full bg-gradient-to-r from-cyan-300 via-sky-300 to-violet-400 shadow-[0_0_18px_rgba(34,211,238,0.36)] transition duration-500 group-hover:shadow-[0_0_24px_rgba(34,211,238,0.48)]" />
                  <div className="flex flex-col items-end gap-2">
                    <StatusPill project={project} />
                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-400">
                      0{index + 1}
                    </span>
                  </div>
                </div>

                <h4 className="relative text-xl font-black text-white sm:text-2xl">
                  {project.title}
                </h4>

                <p className="relative mt-3 text-sm leading-6 text-zinc-300">
                  {project.description}
                </p>

                <div className="relative mt-5 flex flex-wrap gap-2">
                  {project.badges.map((badge) => (
                    <span
                      key={badge}
                      className="rounded-full border border-cyan-300/15 bg-cyan-400/8 px-3 py-1.5 text-[11px] font-semibold text-cyan-100 shadow-[0_0_16px_rgba(34,211,238,0.04)]"
                    >
                      {badge}
                    </span>
                  ))}
                </div>

                <div className="relative mt-auto pt-6">
                  <button
                    type="button"
                    onClick={() => setActiveProject(project)}
                    className="inline-flex min-h-12 w-full items-center justify-center rounded-2xl border border-cyan-400/30 bg-gradient-to-r from-cyan-400/16 to-violet-500/16 px-5 py-3 text-center text-sm font-bold text-cyan-100 transition duration-300 hover:scale-[1.01] hover:border-cyan-300/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.18)]"
                  >
                    View Details
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      {mounted && activeProject
        ? createPortal(
        <ProjectDetailsModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
          onOpenScreenshot={(index) =>
            setActiveScreenshot({
              title: activeProject.title,
              screenshots: getProjectImages(activeProject),
              index,
            })
          }
        />,
          document.body,
        )
        : null}

      {mounted && activeScreenshot
        ? createPortal(
            <ScreenshotLightbox
              screenshot={activeScreenshot}
              onClose={() => setActiveScreenshot(null)}
            />,
            document.body,
          )
        : null}
    </section>
  );
}

function ProjectDetailsModal({
  project,
  onClose,
  onOpenScreenshot,
}: {
  project: Project;
  onClose: () => void;
  onOpenScreenshot: (index: number) => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/78 p-3 backdrop-blur-md sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} details`}
    >
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="Close details"
        onClick={onClose}
      />

      <div className="relative flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#070a12]/95 text-white shadow-[0_0_70px_rgba(34,211,238,0.16)] backdrop-blur-2xl sm:rounded-[2rem]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(34,211,238,0.13),transparent_34%),radial-gradient(circle_at_90%_10%,rgba(168,85,247,0.12),transparent_32%)]" />

        <div className="relative overflow-y-auto p-5 sm:p-6">
          <div className="flex flex-col gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <StatusPill project={project} />
              <h3 className="mt-3 text-2xl font-black leading-tight sm:text-4xl">
                {project.title}
              </h3>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-300">
                {project.summary}
              </p>
              <p className="mt-4 max-w-3xl rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm leading-6 text-zinc-300">
                <span className="font-bold text-cyan-100">
                  Problem solved:
                </span>{" "}
                {project.problem}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.055] px-4 py-2 text-sm font-bold text-zinc-100 transition hover:border-cyan-300/25 hover:bg-white/10"
            >
              Close
            </button>
          </div>

          <div className="mt-5 space-y-4">
            <div className="grid gap-3 sm:grid-cols-3">
              {project.imageSlots.map((slot, slotIndex) => (
                <ScreenshotSlot
                  key={slot.label}
                  slot={slot}
                  startIndex={slotIndex * 3}
                  projectTitle={project.title}
                  onOpenScreenshot={onOpenScreenshot}
                />
              ))}
            </div>

            <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
              <div className="space-y-4">
                <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.045] p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-200">
                    Stack Used
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-xs font-semibold text-zinc-200"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.045] p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-200">
                    Workflow / Feature Highlights
                  </p>
                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    {project.highlights.map((highlight) => (
                      <div
                        key={highlight}
                        className="rounded-2xl border border-white/10 bg-black/25 px-3 py-3 text-sm leading-5 text-zinc-200"
                      >
                        {highlight}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <VideoPreview
                projectTitle={project.title}
                src={project.demoVideoSrc}
              />
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row sm:flex-wrap">
            <a
              href="/book?service=free-call"
              className="inline-flex min-h-12 flex-1 items-center justify-center rounded-2xl border border-white/20 bg-white px-5 py-3 text-center text-sm font-bold text-zinc-950 transition hover:shadow-[0_0_28px_rgba(255,255,255,0.16)] sm:flex-none"
            >
              Book Free Call
            </a>
            <a
              href="/book?service=premium-session"
              className="inline-flex min-h-12 flex-1 items-center justify-center rounded-2xl border border-cyan-400/35 bg-cyan-400/12 px-5 py-3 text-center text-sm font-bold text-cyan-100 transition hover:shadow-[0_0_28px_rgba(34,211,238,0.18)] sm:flex-none"
            >
              Premium Session
            </a>
            <a
              href="#contact-form"
              onClick={onClose}
              className="inline-flex min-h-12 flex-1 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.055] px-5 py-3 text-center text-sm font-bold text-white transition hover:border-violet-300/25 hover:bg-white/10 sm:flex-none"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function ScreenshotSlot({
  slot,
  startIndex,
  projectTitle,
  onOpenScreenshot,
}: {
  slot: ProofImageSlot;
  startIndex: number;
  projectTitle: string;
  onOpenScreenshot: (index: number) => void;
}) {
  return (
    <div className="rounded-[1.25rem] border border-cyan-300/12 bg-black/25 p-3 shadow-[inset_0_0_28px_rgba(255,255,255,0.025)]">
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-cyan-100">
        {slot.label}
      </p>
      <div className="grid gap-2">
        {slot.images.map((image, index) => (
          <ScreenshotPanel
            key={image.src}
            screenshot={image}
            index={startIndex + index}
            projectTitle={projectTitle}
            onOpen={() => onOpenScreenshot(startIndex + index)}
          />
        ))}
      </div>
    </div>
  );
}

function ScreenshotPanel({
  screenshot,
  index,
  projectTitle,
  onOpen,
}: {
  screenshot: ProofImage;
  index: number;
  projectTitle: string;
  onOpen: () => void;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <ScreenshotPlaceholder label={screenshot.label} index={index} />;
  }

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group/screenshot min-h-20 overflow-hidden rounded-2xl border border-cyan-300/12 bg-black/30 text-left shadow-[inset_0_0_20px_rgba(255,255,255,0.025)] transition duration-300 hover:-translate-y-0.5 hover:border-cyan-300/30 hover:shadow-[0_0_24px_rgba(34,211,238,0.12)]"
      aria-label={`Open ${projectTitle} ${screenshot.label}`}
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-[linear-gradient(135deg,rgba(34,211,238,0.08),rgba(168,85,247,0.08),rgba(0,0,0,0.22))]">
        <img
          src={screenshot.src}
          alt={`${projectTitle} ${screenshot.label}`}
          onError={() => setFailed(true)}
          className="h-full w-full object-cover transition duration-500 group-hover/screenshot:scale-[1.025]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-80" />
        <p className="absolute bottom-2 left-2 right-2 text-[10px] font-bold uppercase tracking-[0.12em] text-white">
          {index + 1}
        </p>
      </div>
    </button>
  );
}

function ScreenshotPlaceholder({
  label,
  index,
}: {
  label: string;
  index: number;
}) {
  return (
    <div className="min-h-20 rounded-2xl border border-cyan-300/12 bg-[linear-gradient(135deg,rgba(34,211,238,0.08),rgba(168,85,247,0.08),rgba(0,0,0,0.22))] p-3 shadow-[inset_0_0_22px_rgba(255,255,255,0.025)]">
      <div className="mb-3 h-1 w-8 rounded-full bg-cyan-300/70 shadow-[0_0_16px_rgba(34,211,238,0.32)]" />
      <p className="text-xs font-bold text-white">{label}</p>
      <p className="mt-1 text-[11px] leading-4 text-zinc-400">
        Placeholder panel {index + 1}
      </p>
    </div>
  );
}

function VideoPreview({
  projectTitle,
  src,
}: {
  projectTitle: string;
  src: string;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="rounded-[1.4rem] border border-cyan-300/12 bg-black/25 p-3 shadow-[inset_0_0_28px_rgba(255,255,255,0.025)]">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-200">
          App Demo
        </p>
        <span className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400">
          15-30 sec MP4
        </span>
      </div>

      {failed ? (
        <div className="flex aspect-video items-center justify-center rounded-[1.15rem] border border-white/10 bg-[linear-gradient(135deg,rgba(34,211,238,0.08),rgba(168,85,247,0.08),rgba(0,0,0,0.34))] p-5 text-center">
          <div>
            <div className="mx-auto mb-4 h-1 w-14 rounded-full bg-cyan-300/70 shadow-[0_0_18px_rgba(34,211,238,0.34)]" />
            <p className="text-sm font-black text-white">
              App demo video slot
            </p>
            <p className="mt-2 text-xs leading-5 text-zinc-400">
              Add the project MP4 when the walkthrough is ready.
            </p>
          </div>
        </div>
      ) : (
        <video
          src={src}
          aria-label={`${projectTitle} app demo video`}
          className="aspect-video w-full rounded-[1.15rem] border border-white/10 bg-black object-cover"
          muted
          controls
          playsInline
          preload="metadata"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}

function ScreenshotLightbox({
  screenshot,
  onClose,
}: {
  screenshot: {
    title: string;
    screenshots: ProofImage[];
    index: number;
  };
  onClose: () => void;
}) {
  const [activeIndex, setActiveIndex] = useState(screenshot.index);
  const [failed, setFailed] = useState(false);
  const active = screenshot.screenshots[activeIndex] ?? screenshot.screenshots[0];
  const total = screenshot.screenshots.length;

  function showPrevious() {
    setActiveIndex((current) => (current - 1 + total) % total);
  }

  function showNext() {
    setActiveIndex((current) => (current + 1) % total);
  }

  useEffect(() => {
    setFailed(false);
  }, [active?.src]);

  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        showNext();
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        showPrevious();
      }

      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/88 p-3 backdrop-blur-md sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`${screenshot.title} ${active.label} screenshot`}
    >
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="Close screenshot"
        onClick={onClose}
      />

      <div className="relative w-full max-w-6xl">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-200">
              {screenshot.title}
            </p>
            <h3 className="mt-1 text-xl font-black text-white">
              {active.label}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex min-h-10 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-sm font-bold text-cyan-100">
              {activeIndex + 1} / {total}
            </span>

            <button
              type="button"
              onClick={onClose}
              className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-2 text-sm font-bold text-white transition hover:border-cyan-300/25 hover:bg-white/12"
            >
              Close
            </button>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-black shadow-[0_0_80px_rgba(34,211,238,0.18)]">
          {failed ? (
            <div className="flex min-h-[42vh] items-center justify-center p-6 sm:min-h-[62vh]">
              <div className="w-full max-w-xl rounded-[1.5rem] border border-cyan-300/14 bg-[linear-gradient(135deg,rgba(34,211,238,0.10),rgba(168,85,247,0.10),rgba(0,0,0,0.36))] p-8 text-center shadow-[inset_0_0_34px_rgba(255,255,255,0.03)]">
                <div className="mx-auto mb-5 h-1 w-16 rounded-full bg-cyan-300/80 shadow-[0_0_20px_rgba(34,211,238,0.38)]" />
                <p className="text-lg font-black text-white">{active.label}</p>
                <p className="mt-2 text-sm text-zinc-400">
                  Placeholder panel {activeIndex + 1}
                </p>
              </div>
            </div>
          ) : (
            <img
              src={active.src}
              alt={`${screenshot.title} ${active.label}`}
              onError={() => setFailed(true)}
              className="max-h-[72vh] w-full object-contain sm:max-h-[78vh]"
            />
          )}

          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center p-2 sm:p-4">
            <button
              type="button"
              onClick={showPrevious}
              className="pointer-events-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/25 bg-black/55 text-2xl font-black text-cyan-100 shadow-[0_0_24px_rgba(34,211,238,0.14)] backdrop-blur-xl transition hover:border-cyan-300/45 hover:bg-cyan-400/12 sm:h-14 sm:w-14"
              aria-label="Previous screenshot"
            >
              &lt;
            </button>
          </div>

          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center p-2 sm:p-4">
            <button
              type="button"
              onClick={showNext}
              className="pointer-events-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/25 bg-black/55 text-2xl font-black text-cyan-100 shadow-[0_0_24px_rgba(34,211,238,0.14)] backdrop-blur-xl transition hover:border-cyan-300/45 hover:bg-cyan-400/12 sm:h-14 sm:w-14"
              aria-label="Next screenshot"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
