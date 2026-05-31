"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import Magnetic from "@/components/ui/magnetic";
import Reveal from "@/components/ui/reveal";

type DemoKey = "scheduler" | "damarko" | "echoforge";

type DemoSystem = {
  key: DemoKey;
  title: string;
  status: string;
  statusTone: "green" | "cyan" | "violet";
  summary: string;
  tags: string[];
};

const demoSystems: DemoSystem[] = [
  {
    key: "scheduler",
    title: "Scheduler Platform",
    status: "LIVE SIMULATION",
    statusTone: "green",
    summary:
      "A presentation version of booking flow, admin visibility, notifications, and availability controls.",
    tags: ["Booking feed", "Analytics", "Calendar", "Status ops"],
  },
  {
    key: "damarko",
    title: "Project Damarko",
    status: "AI WORKFLOW DEMO",
    statusTone: "cyan",
    summary:
      "A simulated brand and workflow command center with AI-style prompts, launch actions, and app cards.",
    tags: ["AI terminal", "Launcher", "App grid", "Command log"],
  },
  {
    key: "echoforge",
    title: "EchoForge Audio Suite",
    status: "AUDIO LAB DEMO",
    statusTone: "violet",
    summary:
      "A cinematic creator dashboard with station tabs, audio cards, waveform motion, and rendering queue states.",
    tags: ["Waveforms", "Stations", "Render queue", "Audio cards"],
  },
];

const statusStyles: Record<DemoSystem["statusTone"], string> = {
  green:
    "border-emerald-300/25 bg-emerald-400/10 text-emerald-100 shadow-[0_0_18px_rgba(16,185,129,0.10)]",
  cyan:
    "border-cyan-300/25 bg-cyan-400/10 text-cyan-100 shadow-[0_0_18px_rgba(34,211,238,0.10)]",
  violet:
    "border-violet-300/25 bg-violet-500/10 text-violet-100 shadow-[0_0_18px_rgba(168,85,247,0.10)]",
};

function StatusPill({ system }: { system: DemoSystem }) {
  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] ${statusStyles[system.statusTone]}`}
    >
      {system.status}
    </span>
  );
}

export default function InteractiveShowcaseSection() {
  const [activeDemo, setActiveDemo] = useState<DemoSystem | null>(null);
  const [mounted] = useState(() => typeof window !== "undefined");

  useEffect(() => {
    if (!activeDemo) return;

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setActiveDemo(null);
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [activeDemo]);

  return (
    <section
      id="interactive-showcase"
      className="relative mt-10 overflow-visible rounded-[1.5rem] border border-cyan-300/12 bg-zinc-950/58 p-4 shadow-[0_0_58px_rgba(34,211,238,0.07)] backdrop-blur-xl sm:rounded-[2.1rem] sm:p-6 md:mt-16 md:p-8"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_10%,rgba(34,211,238,0.13),transparent_32%),radial-gradient(circle_at_88%_14%,rgba(168,85,247,0.13),transparent_34%),linear-gradient(145deg,rgba(255,255,255,0.035),transparent_48%)]" />
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent" />
      <div className="pointer-events-none absolute -left-28 top-16 h-64 w-64 rounded-full bg-cyan-400/8 blur-3xl" />
      <div className="pointer-events-none absolute -right-28 bottom-4 h-64 w-64 rounded-full bg-violet-500/8 blur-3xl" />

      <div className="relative z-10">
        <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-cyan-200 sm:text-sm sm:tracking-[0.25em]">
              Demo Systems
            </p>

            <h3 className="mt-2 text-2xl font-black leading-tight text-white sm:text-3xl md:text-4xl">
              Interactive System Showcase
            </h3>
          </div>

          <p className="max-w-3xl text-sm leading-6 text-zinc-300 lg:justify-self-end">
            Explore simulated workflow environments inspired by real DAYIIIatch
            systems.
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:mt-8 md:grid-cols-2 xl:grid-cols-3">
          {demoSystems.map((system, index) => (
            <Reveal key={system.key} delayMs={index * 85}>
              <Magnetic as="div" className="h-full" strength={0.035} scale={1.002}>
                <article className="group card-sheen relative flex h-full flex-col overflow-hidden rounded-[1.35rem] border border-white/10 bg-white/[0.045] p-4 shadow-[0_0_30px_rgba(34,211,238,0.04)] backdrop-blur-xl transition duration-500 ease-out hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-white/[0.065] hover:shadow-[0_0_42px_rgba(34,211,238,0.12)] active:scale-[0.995] sm:rounded-[1.6rem] sm:p-5">
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(34,211,238,0.10),transparent_34%),radial-gradient(circle_at_88%_8%,rgba(168,85,247,0.10),transparent_36%)] opacity-0 transition duration-500 group-hover:opacity-100" />

                  <div className="relative flex h-full flex-col">
                    <div className="mb-4 flex items-start justify-between gap-3">
                      <StatusPill system={system} />
                      <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-zinc-400">
                        0{index + 1}
                      </span>
                    </div>

                    <div className="mb-5 min-h-36 overflow-hidden rounded-[1.1rem] border border-cyan-300/14 bg-black/35 p-3 shadow-inner shadow-cyan-950/30">
                      <MiniDashboardPreview tone={system.statusTone} />
                    </div>

                    <h4 className="text-xl font-black text-white">
                      {system.title}
                    </h4>

                    <p className="mt-3 flex-1 text-sm leading-6 text-zinc-300">
                      {system.summary}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {system.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-cyan-300/15 bg-cyan-400/7 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.11em] text-cyan-100"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Magnetic className="mt-6 inline-flex w-full" strength={0.1}>
                      <button
                        type="button"
                        onClick={() => setActiveDemo(system)}
                        data-growth-event="demo-modal-open"
                        data-growth-target={system.key}
                        className="inline-flex min-h-12 w-full items-center justify-center rounded-2xl border border-cyan-300/34 bg-cyan-400/14 px-5 py-3 text-center text-sm font-black text-cyan-50 transition duration-300 hover:-translate-y-0.5 hover:border-cyan-200/55 hover:shadow-[0_0_30px_rgba(34,211,238,0.18)] active:scale-[0.98]"
                      >
                        Launch Demo
                      </button>
                    </Magnetic>
                  </div>
                </article>
              </Magnetic>
            </Reveal>
          ))}
        </div>
      </div>

      {mounted && activeDemo
        ? createPortal(
            <DemoModal system={activeDemo} onClose={() => setActiveDemo(null)} />,
            document.body,
          )
        : null}
    </section>
  );
}

function MiniDashboardPreview({ tone }: { tone: DemoSystem["statusTone"] }) {
  const glowClass =
    tone === "green"
      ? "bg-emerald-300/55 shadow-[0_0_18px_rgba(16,185,129,0.28)]"
      : tone === "cyan"
        ? "bg-cyan-300/55 shadow-[0_0_18px_rgba(34,211,238,0.28)]"
        : "bg-violet-300/55 shadow-[0_0_18px_rgba(168,85,247,0.28)]";

  return (
    <div className="flex h-full min-h-28 flex-col justify-between rounded-[0.85rem] border border-white/8 bg-[linear-gradient(135deg,rgba(34,211,238,0.10),rgba(168,85,247,0.08)_48%,rgba(10,10,10,0.28))] p-3">
      <div className="flex items-center justify-between gap-3">
        <span className={`h-2 w-16 rounded-full ${glowClass}`} />
        <span className="h-2 w-2 rounded-full bg-white/45" />
      </div>

      <div className="grid grid-cols-3 gap-2">
        <span className="h-12 rounded-xl border border-white/8 bg-white/[0.06]" />
        <span className="h-12 rounded-xl border border-white/8 bg-cyan-400/8" />
        <span className="h-12 rounded-xl border border-white/8 bg-violet-500/8" />
      </div>

      <div className="space-y-2">
        <span className="block h-2 w-3/4 rounded-full bg-white/15" />
        <span className="block h-2 w-1/2 rounded-full bg-cyan-200/18" />
      </div>
    </div>
  );
}

function DemoModal({
  system,
  onClose,
}: {
  system: DemoSystem;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/78 p-2 backdrop-blur-md sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`${system.title} presentation demo`}
    >
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="Close demo"
        onClick={onClose}
      />

      <div className="relative flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-[1.25rem] border border-white/10 bg-[#070a12]/95 text-white shadow-[0_0_76px_rgba(34,211,238,0.17)] backdrop-blur-2xl sm:max-h-[90vh] sm:rounded-[2rem]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(34,211,238,0.14),transparent_34%),radial-gradient(circle_at_92%_8%,rgba(168,85,247,0.13),transparent_32%)]" />

        <div className="relative overflow-y-auto p-4 sm:p-6">
          <div className="flex flex-col gap-4 border-b border-white/10 pb-4 sm:flex-row sm:items-start sm:justify-between sm:pb-5">
            <div>
              <StatusPill system={system} />
              <h3 className="mt-3 text-2xl font-black leading-tight sm:text-4xl">
                {system.title}
              </h3>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-300">
                Presentation demo only. This simulated environment shows how a
                real operational system can feel without connecting to backend
                data.
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

          <div className="mt-5">
            {system.key === "scheduler" ? <SchedulerDemo /> : null}
            {system.key === "damarko" ? <DamarkoDemo /> : null}
            {system.key === "echoforge" ? <EchoForgeDemo /> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

function SchedulerDemo() {
  const [calendarView, setCalendarView] = useState(false);
  const feed = [
    ["10:00 AM", "Free call requested", "New"],
    ["12:30 PM", "Premium session confirmed", "Booked"],
    ["02:00 PM", "Reminder email queued", "Auto"],
  ];

  return (
    <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.045] p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-cyan-100">
              Booking Command
            </p>
            <h4 className="mt-2 text-xl font-black">Live booking feed</h4>
          </div>
          <button
            type="button"
            onClick={() => setCalendarView((current) => !current)}
            className="inline-flex min-h-10 items-center justify-center rounded-2xl border border-cyan-300/24 bg-cyan-400/10 px-4 py-2 text-xs font-black text-cyan-100 transition hover:border-cyan-300/42"
          >
            {calendarView ? "Feed View" : "Calendar Toggle"}
          </button>
        </div>

        {calendarView ? (
          <div className="mt-5 grid grid-cols-7 gap-2">
            {Array.from({ length: 21 }, (_, index) => (
              <div
                key={index}
                className={`flex aspect-square items-center justify-center rounded-xl border text-xs font-bold ${
                  index % 5 === 0
                    ? "border-emerald-300/25 bg-emerald-400/10 text-emerald-100"
                    : "border-white/10 bg-black/24 text-zinc-400"
                }`}
              >
                {index + 1}
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-5 grid gap-3">
            {feed.map(([time, event, status]) => (
              <div
                key={`${time}-${event}`}
                className="grid gap-3 rounded-2xl border border-white/10 bg-black/24 p-3 sm:grid-cols-[6rem_1fr_auto] sm:items-center"
              >
                <span className="text-xs font-black text-cyan-100">{time}</span>
                <span className="text-sm text-zinc-200">{event}</span>
                <span className="w-fit rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-emerald-100">
                  {status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid gap-4">
        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
          {["72% show rate", "14 open slots", "6 reminders"].map((metric) => (
            <div
              key={metric}
              className="rounded-[1.15rem] border border-cyan-300/12 bg-cyan-400/8 p-4 text-sm font-black text-cyan-50"
            >
              {metric}
            </div>
          ))}
        </div>
        <div className="rounded-[1.35rem] border border-white/10 bg-black/24 p-4">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-violet-100">
            Notifications
          </p>
          <div className="mt-4 space-y-3">
            {["Admin alert sent", "Client confirmation ready", "Daily summary queued"].map(
              (item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/8 bg-white/[0.045] px-3 py-2 text-sm text-zinc-300"
                >
                  {item}
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function DamarkoDemo() {
  const commands = [
    "map brand friction",
    "generate CTA sequence",
    "launch workflow audit",
  ];

  return (
    <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
      <div className="rounded-[1.35rem] border border-cyan-300/12 bg-black/30 p-4">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-cyan-100">
          AI Terminal
        </p>
        <div className="mt-4 space-y-3 font-mono text-xs text-zinc-300">
          {commands.map((command, index) => (
            <div
              key={command}
              className="rounded-2xl border border-white/10 bg-white/[0.045] px-3 py-3"
            >
              <span className="text-cyan-200">dayiiiatch:{">"}</span> {command}
              <p className="mt-2 text-zinc-500">
                {index === 0
                  ? "brand clarity report prepared"
                  : index === 1
                    ? "homepage path aligned"
                    : "audit checklist ready"}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-4">
        <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.045] p-4">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-violet-100">
            Workflow Launcher
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {["Brand Map", "Offer Flow", "Proof Stack"].map((item) => (
              <button
                key={item}
                type="button"
                className="min-h-24 rounded-2xl border border-cyan-300/14 bg-cyan-400/8 p-3 text-left text-sm font-black text-cyan-50 transition hover:border-cyan-300/34 hover:bg-cyan-400/12"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {["Homepage OS", "Inquiry Router", "Launch Board", "Content Pack"].map(
            (item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-black/24 p-4 text-sm font-bold text-zinc-200"
              >
                {item}
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
}

function EchoForgeDemo() {
  const [station, setStation] = useState("Mix");
  const stations = ["Mix", "Render", "Archive"];

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_0.95fr]">
      <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.045] p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-violet-100">
              Audio Stations
            </p>
            <h4 className="mt-2 text-xl font-black">{station} Station</h4>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {stations.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setStation(item)}
                className={`min-h-10 rounded-2xl border px-3 py-2 text-xs font-black transition ${
                  station === item
                    ? "border-violet-300/35 bg-violet-500/14 text-violet-100"
                    : "border-white/10 bg-black/24 text-zinc-400 hover:border-violet-300/24"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5 flex min-h-44 items-end gap-1 rounded-[1.2rem] border border-violet-300/12 bg-black/28 p-4">
          {Array.from({ length: 28 }, (_, index) => (
            <span
              key={index}
              className="w-full rounded-full bg-gradient-to-t from-violet-400/35 to-cyan-300/70 shadow-[0_0_12px_rgba(168,85,247,0.16)] motion-safe:animate-pulse"
              style={{
                height: `${24 + ((index * 17) % 76)}%`,
                animationDelay: `${index * 70}ms`,
                animationDuration: "1.8s",
              }}
            />
          ))}
        </div>
      </div>

      <div className="grid gap-4">
        <div className="grid gap-3 sm:grid-cols-2">
          {["Vocal Chain", "Podcast Bed", "Station ID", "Archive Mix"].map(
            (item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-black/24 p-4 text-sm font-bold text-zinc-200"
              >
                {item}
                <div className="mt-3 h-2 rounded-full bg-white/10">
                  <div className="h-2 w-2/3 rounded-full bg-gradient-to-r from-violet-300/65 to-cyan-300/65" />
                </div>
              </div>
            ),
          )}
        </div>

        <div className="rounded-[1.35rem] border border-white/10 bg-black/24 p-4">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-cyan-100">
            Rendering Queue
          </p>
          <div className="mt-4 space-y-3">
            {["Master pass", "Waveform preview", "Export bundle"].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/8 bg-white/[0.045] px-3 py-2 text-sm text-zinc-300"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
