import type { Booking } from "@/components/admin/booking-types";
import { buildOperationalIntelligence } from "@/lib/operational-intelligence";

type Props = {
  bookings: Booking[];
};

function InsightCard({
  label,
  value,
  detail,
}: {
  label: string;
  value: string | number;
  detail: string;
}) {
  return (
    <div className="rounded-3xl border border-cyan-300/12 bg-white/[0.04] p-4 shadow-[0_0_24px_rgba(34,211,238,0.04)] transition duration-300 hover:border-cyan-300/24 hover:bg-cyan-400/8">
      <p className="text-[10px] font-black uppercase tracking-[0.16em] text-zinc-500">
        {label}
      </p>
      <h3 className="mt-2 truncate text-2xl font-black text-white" title={String(value)}>
        {value}
      </h3>
      <p className="mt-2 text-xs leading-5 text-zinc-400">{detail}</p>
    </div>
  );
}

export default function OperationalInsightsPanel({ bookings }: Props) {
  const intelligence = buildOperationalIntelligence(bookings);

  return (
    <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 shadow-2xl backdrop-blur-xl">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-violet-200">
            Operational Insights
          </p>
          <h2 className="mt-2 text-2xl font-black">
            Pattern detection and lead intelligence
          </h2>
        </div>
        <p className="max-w-2xl text-sm leading-6 text-zinc-400">
          Rule-based signals from booking paths, lead sources, intake summaries,
          and pipeline status. No AI API needed yet.
        </p>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-5">
        {intelligence.insightCards.map((card) => (
          <InsightCard key={card.label} {...card} />
        ))}
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[1.5rem] border border-white/10 bg-black/24 p-4">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-100">
            Opportunity Signals
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
            {intelligence.opportunitySignals.map((signal) => (
              <div
                key={signal.label}
                className="rounded-2xl border border-white/10 bg-white/[0.045] px-3 py-3"
              >
                <p className="text-[10px] font-black uppercase tracking-[0.14em] text-zinc-500">
                  {signal.label}
                </p>
                <p
                  className="mt-2 truncate text-lg font-black text-cyan-100"
                  title={String(signal.value)}
                >
                  {signal.value}
                </p>
                <p className="mt-1 text-[11px] leading-4 text-zinc-400">
                  {signal.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-violet-300/12 bg-violet-500/8 p-4">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-100">
            Smart Recommendations
          </p>
          <div className="mt-4 grid gap-3">
            {intelligence.recommendationCards.map((recommendation) => (
              <div
                key={recommendation}
                className="rounded-2xl border border-white/10 bg-black/24 px-3 py-3 text-sm leading-6 text-zinc-200"
              >
                {recommendation}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-2 sm:grid-cols-4">
        {(["Cold", "Warm", "Hot", "Priority"] as const).map((heat) => (
          <div
            key={heat}
            className="rounded-2xl border border-white/10 bg-black/25 px-3 py-3"
          >
            <p className="text-[10px] font-black uppercase tracking-[0.14em] text-zinc-500">
              {heat} Leads
            </p>
            <p className="mt-2 text-2xl font-black tabular-nums text-white">
              {Number(intelligence.leadHeatCounts[heat] ?? 0)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
