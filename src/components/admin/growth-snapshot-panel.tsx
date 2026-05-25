import type { Booking } from "@/components/admin/booking-types";
import {
  derivePipelineStage,
  extractGrowthSource,
  leadSources,
  pipelineStages,
} from "@/lib/growth-ops";

type Props = {
  bookings: Booking[];
};

function MetricCard({
  label,
  value,
  detail,
}: {
  label: string;
  value: string | number;
  detail: string;
}) {
  return (
    <div className="rounded-3xl border border-cyan-300/12 bg-white/[0.04] p-5 shadow-[0_0_24px_rgba(34,211,238,0.04)]">
      <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">
        {label}
      </p>
      <h3 className="mt-2 text-3xl font-black tabular-nums text-white">
        {value}
      </h3>
      <p className="mt-2 text-xs leading-5 text-zinc-400">{detail}</p>
    </div>
  );
}

export default function GrowthSnapshotPanel({ bookings }: Props) {
  const activeLeadFunnels = new Set(
    bookings.map((booking) => extractGrowthSource(booking.details)),
  ).size;
  const currentBuildQueue = bookings.filter(
    (booking) => booking.status === "confirmed" || booking.status === "pending",
  ).length;
  const bookingFlowStatus =
    bookings.some((booking) => booking.status !== "cancelled") ? "Online" : "Ready";
  const contentSystemsActive = leadSources.length;

  const pipelineCounts = pipelineStages.map((stage) => ({
    stage,
    count: bookings.filter(
      (booking) =>
        derivePipelineStage({
          service: booking.service,
          status: booking.status,
          details: booking.details,
        }) === stage,
    ).length,
  }));

  return (
    <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 shadow-2xl backdrop-blur-xl">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-200">
            Growth Ops Snapshot
          </p>
          <h2 className="mt-2 text-2xl font-black">Lightweight growth system</h2>
        </div>
        <p className="max-w-2xl text-sm leading-6 text-zinc-400">
          Source tracking, booking flow health, and pipeline visibility without
          turning the admin into a cluttered CRM.
        </p>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-5">
        <MetricCard
          label="Active Lead Funnels"
          value={activeLeadFunnels}
          detail="Tracked source lanes"
        />
        <MetricCard
          label="Current Build Queue"
          value={currentBuildQueue}
          detail="Pending or confirmed"
        />
        <MetricCard
          label="Response Window"
          value="24-48h"
          detail="Client-facing expectation"
        />
        <MetricCard
          label="Booking Flow Status"
          value={bookingFlowStatus}
          detail="Scheduler path health"
        />
        <MetricCard
          label="Content Systems Active"
          value={contentSystemsActive}
          detail="Source/content hooks"
        />
      </div>

      <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-6">
        {pipelineCounts.map((item) => (
          <div
            key={item.stage}
            className="rounded-2xl border border-white/10 bg-black/25 px-3 py-3"
          >
            <p className="text-[10px] font-black uppercase tracking-[0.14em] text-zinc-500">
              {item.stage}
            </p>
            <p className="mt-2 text-2xl font-black tabular-nums text-cyan-100">
              {item.count}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
