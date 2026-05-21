import type { Booking } from "@/components/admin/booking-types";
import { formatBookingTime } from "@/components/admin/booking-utils";
import { buildDailySummary } from "@/lib/admin-automation";

type Props = {
  bookings: Booking[];
};

export default function AdminSummaryPanel({ bookings }: Props) {
  const summary = buildDailySummary(bookings);
  const nextTodayBooking = summary.todayBookings[0];

  return (
    <section className="rounded-[2rem] border border-cyan-400/20 bg-cyan-400/[0.04] p-5 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-cyan-200">
            Automation Dashboard
          </p>
          <h2 className="mt-2 text-2xl font-black">Daily Summary</h2>
        </div>

        <span className="rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-violet-100">
          Reminder-ready foundation
        </span>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <SummaryCard
          label="Today"
          value={summary.todayBookings.length}
          detail={
            nextTodayBooking
              ? `${formatBookingTime(nextTodayBooking.time)} - ${nextTodayBooking.name}`
              : "No bookings today"
          }
        />
        <SummaryCard
          label="Tomorrow"
          value={summary.tomorrowBookings.length}
          detail={`${summary.tomorrow} schedule`}
        />
        <SummaryCard
          label="Pending"
          value={summary.pendingBookings.length}
          detail="Needs admin review"
        />
      </div>

      <div className="mt-3 grid gap-3 md:grid-cols-3">
        <AutomationMetric
          label="24-hour reminders"
          value={summary.reminder24HourReady.length}
        />
        <AutomationMetric
          label="1-hour reminders"
          value={summary.reminder1HourReady.length}
        />
        <AutomationMetric
          label="Follow-up ready"
          value={summary.followUpReady.length}
        />
      </div>
    </section>
  );
}

function SummaryCard({
  label,
  value,
  detail,
}: {
  label: string;
  value: number;
  detail: string;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-black/25 p-4">
      <p className="text-xs uppercase tracking-[0.22em] text-zinc-400">
        {label}
      </p>
      <div className="mt-2 flex items-end justify-between gap-3">
        <span className="text-4xl font-black text-white">{value}</span>
        <span className="text-right text-xs font-bold text-cyan-100">
          {detail}
        </span>
      </div>
    </div>
  );
}

function AutomationMetric({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
      <span className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-400">
        {label}
      </span>
      <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-sm font-black text-cyan-100">
        {value}
      </span>
    </div>
  );
}
