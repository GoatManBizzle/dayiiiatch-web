"use client";

import { useEffect, useMemo, useState } from "react";

import Magnetic from "@/components/ui/magnetic";
import Reveal from "@/components/ui/reveal";

const statusItems = [
  "Scheduler Online",
  "Build Queue Active",
  "Automation Layer Ready",
  "Mobile Systems Synced",
  "Deployment Ready",
];

const metricTargets = [
  {
    label: "Active Build Pipelines",
    value: 4,
    suffix: "",
  },
  {
    label: "Workflow Systems Running",
    value: 12,
    suffix: "",
  },
  {
    label: "Avg Response Window",
    value: 24,
    suffix: "-48h",
  },
  {
    label: "Mobile Optimization Status",
    value: 98,
    suffix: "%",
  },
  {
    label: "Automation Readiness",
    value: 92,
    suffix: "%",
  },
];

const queueItems = [
  "Client Workflow Mapping",
  "Booking Funnel Optimization",
  "UI Systems Pass",
  "Automation Expansion",
  "Mobile Polish Validation",
];

export default function AgencyIllusionSection() {
  const [activeQueueIndex, setActiveQueueIndex] = useState(0);
  const [metricProgress, setMetricProgress] = useState(() => {
    if (typeof window === "undefined") return 0;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? 1
      : 0;
  });

  const metrics = useMemo(
    () =>
      metricTargets.map((metric) => ({
        ...metric,
        displayValue: Math.round(metric.value * metricProgress),
      })),
    [metricProgress],
  );

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return;

    let frame = 0;
    const totalFrames = 48;
    const timer = window.setInterval(() => {
      frame += 1;
      const eased = 1 - Math.pow(1 - frame / totalFrames, 3);
      setMetricProgress(Math.min(eased, 1));

      if (frame >= totalFrames) {
        window.clearInterval(timer);
      }
    }, 28);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return;

    const timer = window.setInterval(() => {
      setActiveQueueIndex((current) => (current + 1) % queueItems.length);
    }, 2400);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section
      id="agency-operations"
      className="relative mt-10 overflow-hidden rounded-[1.5rem] border border-cyan-300/12 bg-zinc-950/58 p-4 shadow-[0_0_58px_rgba(34,211,238,0.07)] backdrop-blur-xl sm:rounded-[2.1rem] sm:p-6 md:mt-16 md:p-8"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_12%,rgba(34,211,238,0.13),transparent_31%),radial-gradient(circle_at_90%_10%,rgba(168,85,247,0.13),transparent_34%),linear-gradient(145deg,rgba(255,255,255,0.035),transparent_48%)]" />
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-violet-300/55 to-transparent opacity-70 agency-data-flow" />
      <div className="pointer-events-none absolute -left-28 top-12 h-64 w-64 rounded-full bg-cyan-400/8 blur-3xl" />
      <div className="pointer-events-none absolute -right-28 bottom-6 h-64 w-64 rounded-full bg-violet-500/8 blur-3xl" />

      <div className="relative z-10">
        <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-cyan-200 sm:text-sm sm:tracking-[0.25em]">
              Live Operations Layer
            </p>

            <h3 className="mt-2 text-2xl font-black leading-tight text-white sm:text-3xl md:text-4xl">
              Agency Systems Running Quietly in the Background
            </h3>
          </div>

          <p className="max-w-3xl text-sm leading-6 text-zinc-300 lg:justify-self-end">
            A lightweight operational view of the systems, queues, and readiness
            signals behind a polished DAYIIIatch build.
          </p>
        </div>

        <Reveal delayMs={40}>
          <div className="mt-6 grid gap-2 rounded-[1.25rem] border border-white/10 bg-black/24 p-3 backdrop-blur-xl sm:mt-8 sm:grid-cols-2 lg:grid-cols-5">
            {statusItems.map((item, index) => (
              <div
                key={item}
                className="flex min-h-11 items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.045] px-3 py-2 text-xs font-bold text-zinc-200"
              >
                <span
                  className="agency-status-dot h-2.5 w-2.5 rounded-full bg-emerald-300 shadow-[0_0_14px_rgba(16,185,129,0.35)]"
                  style={{ animationDelay: `${index * 220}ms` }}
                />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="mt-4 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal delayMs={70}>
            <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.045] p-4 backdrop-blur-xl sm:rounded-[1.6rem] sm:p-5">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-cyan-100/80">
                    Operational Metrics
                  </p>
                  <h4 className="mt-2 text-xl font-black text-white">
                    System readiness snapshot
                  </h4>
                </div>

                <span className="w-fit rounded-full border border-cyan-300/18 bg-cyan-400/8 px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-cyan-100">
                  Soft Live View
                </span>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
                {metrics.map((metric, index) => (
                  <Magnetic
                    key={metric.label}
                    as="div"
                    className="h-full"
                    strength={0.025}
                    scale={1.001}
                  >
                    <div className="group relative h-full overflow-hidden rounded-2xl border border-cyan-300/12 bg-black/24 p-3 transition duration-500 hover:-translate-y-0.5 hover:border-cyan-300/28 hover:bg-cyan-400/8">
                      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/45 to-transparent opacity-70" />
                      <p className="text-2xl font-black text-white tabular-nums">
                        {metric.displayValue}
                        <span className="text-sm text-cyan-100">
                          {metric.suffix}
                        </span>
                      </p>
                      <p className="mt-2 text-[11px] font-bold uppercase leading-4 tracking-[0.11em] text-zinc-400">
                        {metric.label}
                      </p>
                      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-cyan-300/70 to-violet-300/70 transition-all duration-700"
                          style={{
                            width: `${Math.min(
                              100,
                              (metric.displayValue /
                                Math.max(metric.value, 1)) *
                                100,
                            )}%`,
                            transitionDelay: `${index * 80}ms`,
                          }}
                        />
                      </div>
                    </div>
                  </Magnetic>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delayMs={90}>
            <div className="rounded-[1.35rem] border border-white/10 bg-black/24 p-4 backdrop-blur-xl sm:rounded-[1.6rem] sm:p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-violet-100/80">
                    Build Queue Visual
                  </p>
                  <h4 className="mt-2 text-xl font-black text-white">
                    Active system passes
                  </h4>
                </div>
                <span className="agency-sync-pulse h-3 w-3 rounded-full border border-violet-200/40 bg-violet-300/50 shadow-[0_0_18px_rgba(168,85,247,0.35)]" />
              </div>

              <div className="mt-5 grid gap-2">
                {queueItems.map((item, index) => {
                  const active = index === activeQueueIndex;
                  return (
                    <div
                      key={item}
                      className={`grid min-h-12 grid-cols-[auto_1fr_auto] items-center gap-3 rounded-2xl border px-3 py-2 transition duration-700 ${
                        active
                          ? "translate-x-0 border-cyan-300/30 bg-cyan-400/10 shadow-[0_0_24px_rgba(34,211,238,0.10)]"
                          : "border-white/10 bg-white/[0.035] text-zinc-400"
                      }`}
                    >
                      <span
                        className={`h-2 w-2 rounded-full ${
                          active
                            ? "bg-cyan-200 shadow-[0_0_14px_rgba(34,211,238,0.45)]"
                            : "bg-white/22"
                        }`}
                      />
                      <span className="text-sm font-bold text-zinc-200">
                        {item}
                      </span>
                      <span className="rounded-full border border-white/10 bg-black/24 px-2 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-zinc-400">
                        {active ? "Active" : "Ready"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delayMs={110}>
          <div className="mt-4 grid gap-3 rounded-[1.25rem] border border-white/10 bg-black/24 p-3 backdrop-blur-xl sm:grid-cols-3 sm:p-4">
            {["Status flashes", "Sync pulses", "Minimal data flow"].map(
              (item, index) => (
                <div
                  key={item}
                  className="flex min-h-14 items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.045] px-3 py-3"
                >
                  <span className="text-xs font-bold uppercase tracking-[0.12em] text-zinc-300">
                    {item}
                  </span>
                  <span
                    className="agency-status-dot h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(34,211,238,0.35)]"
                    style={{ animationDelay: `${index * 360}ms` }}
                  />
                </div>
              ),
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
