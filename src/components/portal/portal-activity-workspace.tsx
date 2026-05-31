"use client";

import { useMemo, useState } from "react";

import {
  portalActivityEventTypes,
  portalMasterActivityEvents,
  statusTone,
} from "@/lib/portal-data";

type ActivityEvent = (typeof portalMasterActivityEvents)[number];

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

function eventTypeTone(type: string) {
  if (type === "Approvals") {
    return "border-cyan-300/24 bg-cyan-400/10 text-cyan-100";
  }

  if (type === "Meetings") {
    return "border-violet-300/24 bg-violet-500/10 text-violet-100";
  }

  if (type === "Deliverables") {
    return "border-emerald-300/24 bg-emerald-400/10 text-emerald-100";
  }

  if (type === "Invoices") {
    return "border-amber-300/24 bg-amber-400/10 text-amber-100";
  }

  if (type === "Files") {
    return "border-sky-300/24 bg-sky-400/10 text-sky-100";
  }

  if (type === "Timeline") {
    return "border-fuchsia-300/24 bg-fuchsia-500/10 text-fuchsia-100";
  }

  return "border-white/10 bg-white/[0.045] text-zinc-200";
}

export default function PortalActivityWorkspace() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedEvent, setSelectedEvent] = useState<ActivityEvent>(
    portalMasterActivityEvents[0],
  );

  const filteredEvents = useMemo(() => {
    if (activeFilter === "All") {
      return portalMasterActivityEvents;
    }

    return portalMasterActivityEvents.filter(
      (event) => event.eventType === activeFilter,
    );
  }, [activeFilter]);

  const metrics = [
    {
      label: "Total Events",
      value: portalMasterActivityEvents.length.toString(),
      status: "Active",
    },
    {
      label: "Today's Events",
      value: portalMasterActivityEvents
        .filter((event) => event.createdAt.includes("May 31, 2026"))
        .length.toString(),
      status: "New",
    },
    {
      label: "Approvals",
      value: portalMasterActivityEvents
        .filter((event) => event.eventType === "Approvals")
        .length.toString(),
      status: "Pending Review",
    },
    {
      label: "Deliverables",
      value: portalMasterActivityEvents
        .filter((event) => event.eventType === "Deliverables")
        .length.toString(),
      status: "Updated",
    },
  ];

  return (
    <div className="grid gap-4">
      <section className="relative overflow-hidden rounded-[1.6rem] border border-cyan-300/18 bg-cyan-400/[0.055] p-4 shadow-[0_0_46px_rgba(34,211,238,0.08)] backdrop-blur-xl sm:p-6">
        <div className="absolute right-8 top-6 h-24 w-24 rounded-full border border-cyan-300/20 bg-cyan-400/10 blur-xl motion-safe:animate-pulse" />
        <div className="relative grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(22rem,0.95fr)] xl:items-end">
          <div className="min-w-0">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-200">
              Activity Engine
            </p>
            <h1 className="mt-2 break-words text-3xl font-black text-white sm:text-5xl">
              Project Activity
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-300">
              Track everything happening across your workspace.
            </p>
          </div>

          <div className="grid min-w-0 gap-3 sm:grid-cols-2">
            {metrics.map((metric) => (
              <article
                key={metric.label}
                className="rounded-2xl border border-white/10 bg-black/24 p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <p className="text-[10px] font-black uppercase tracking-[0.14em] text-zinc-500">
                    {metric.label}
                  </p>
                  <StatusPill status={metric.status} />
                </div>
                <p className="mt-2 text-3xl font-black text-white">
                  {metric.value}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-3 shadow-[0_0_24px_rgba(124,58,237,0.04)] backdrop-blur-xl">
        <div className="flex flex-wrap gap-2">
          {portalActivityEventTypes.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`rounded-xl border px-3 py-2 text-xs font-black uppercase tracking-[0.12em] transition ${
                activeFilter === filter
                  ? "border-cyan-300/35 bg-cyan-400/12 text-cyan-100 shadow-[0_0_18px_rgba(34,211,238,0.1)]"
                  : "border-white/10 bg-black/24 text-zinc-400 hover:border-cyan-300/24 hover:text-cyan-100"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.75fr)]">
        <div className="min-w-0 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_0_34px_rgba(34,211,238,0.05)] backdrop-blur-xl sm:p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">
                Master Activity Feed
              </p>
              <h2 className="mt-2 text-2xl font-black text-white">
                Workspace timeline
              </h2>
            </div>
            <span className="rounded-full border border-cyan-300/18 bg-cyan-400/[0.07] px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-cyan-100">
              {filteredEvents.length} visible
            </span>
          </div>

          <div className="mt-5 grid gap-3">
            {filteredEvents.map((event, index) => (
              <button
                key={event.id}
                type="button"
                onClick={() => setSelectedEvent(event)}
                className={`group grid min-w-0 grid-cols-[auto_minmax(0,1fr)] gap-3 rounded-2xl border p-3 text-left transition hover:border-cyan-300/24 hover:bg-cyan-400/[0.045] ${
                  selectedEvent.id === event.id
                    ? "border-cyan-300/28 bg-cyan-400/[0.055]"
                    : "border-white/10 bg-black/24"
                }`}
              >
                <div className="relative flex flex-col items-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-400/10 text-[10px] font-black text-cyan-100 shadow-[0_0_18px_rgba(34,211,238,0.08)] transition group-hover:scale-105">
                    {event.icon}
                  </span>
                  {index < filteredEvents.length - 1 ? (
                    <span className="mt-2 h-full min-h-5 w-px bg-gradient-to-b from-cyan-300/28 to-transparent" />
                  ) : null}
                </div>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="break-words font-black text-white">
                        {event.title}
                      </h3>
                      <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-zinc-500">
                        {event.timestamp}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span
                        className={`inline-flex rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] ${eventTypeTone(
                          event.eventType,
                        )}`}
                      >
                        {event.eventType}
                      </span>
                      <StatusPill status={event.status} />
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-zinc-300">
                    {event.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <aside className="min-w-0 rounded-[1.5rem] border border-violet-300/14 bg-violet-500/[0.055] p-4 shadow-[0_0_34px_rgba(124,58,237,0.06)] backdrop-blur-xl sm:p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-100">
                Detail Drawer
              </p>
              <h2 className="mt-2 break-words text-2xl font-black text-white">
                {selectedEvent.title}
              </h2>
            </div>
            <span
              className={`inline-flex rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] ${eventTypeTone(
                selectedEvent.eventType,
              )}`}
            >
              {selectedEvent.eventType}
            </span>
          </div>

          <p className="mt-4 text-sm leading-6 text-zinc-300">
            {selectedEvent.description}
          </p>

          <div className="mt-5 grid gap-3">
            {[
              ["Timestamp", selectedEvent.createdAt],
              ["Created By", selectedEvent.createdBy],
              ["Related Project", selectedEvent.relatedProject],
              ["Related Deliverable", selectedEvent.relatedDeliverable],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-2xl border border-white/10 bg-black/24 px-4 py-3"
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

          <div className="mt-5 rounded-2xl border border-cyan-300/14 bg-cyan-400/[0.06] px-4 py-3 text-xs leading-5 text-cyan-100">
            Future activity_events fields: id, workspace_id, event_type, title,
            description, created_at, and created_by.
          </div>
          {/* Future: persist activity_events in Supabase and generate events from approvals, uploads, invoices, bookings, timeline changes, and portal access logs. */}
        </aside>
      </section>
    </div>
  );
}
