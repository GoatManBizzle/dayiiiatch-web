import type { Booking } from "@/components/admin/booking-types";

type AdminAnalyticsProps = {
  bookings: Booking[];
};

type ChartItem = {
  label: string;
  value: number;
  tone: "cyan" | "violet" | "emerald" | "yellow" | "red" | "zinc";
};

const toneClasses: Record<ChartItem["tone"], string> = {
  cyan: "from-cyan-300 to-cyan-500 shadow-[0_0_18px_rgba(34,211,238,0.18)]",
  violet:
    "from-violet-300 to-violet-500 shadow-[0_0_18px_rgba(139,92,246,0.18)]",
  emerald:
    "from-emerald-300 to-emerald-500 shadow-[0_0_18px_rgba(16,185,129,0.18)]",
  yellow:
    "from-yellow-200 to-yellow-500 shadow-[0_0_18px_rgba(250,204,21,0.14)]",
  red: "from-red-300 to-red-500 shadow-[0_0_18px_rgba(248,113,113,0.14)]",
  zinc: "from-zinc-300 to-zinc-500",
};

function countBy<T extends string>(items: Booking[], getKey: (item: Booking) => T) {
  return items.reduce<Record<T, number>>(
    (counts, item) => ({
      ...counts,
      [getKey(item)]: (counts[getKey(item)] ?? 0) + 1,
    }),
    {} as Record<T, number>,
  );
}

function getPercent(value: number, total: number) {
  if (total === 0) return 0;

  return Math.round((value / total) * 100);
}

function getTodayDate() {
  const now = new Date();
  const localDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000);

  return localDate.toISOString().split("T")[0];
}

function buildUpcomingByDate(bookings: Booking[]) {
  const today = getTodayDate();
  const upcoming = bookings
    .filter((booking) => booking.date >= today)
    .sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`));

  return Object.entries(countBy(upcoming, (booking) => booking.date))
    .map(([label, value]) => ({ label, value, tone: "cyan" as const }))
    .slice(0, 6);
}

export default function AdminAnalytics({ bookings }: AdminAnalyticsProps) {
  const total = bookings.length;
  const serviceCounts = countBy(bookings, (booking) => booking.service_label);
  const statusCounts = countBy(bookings, (booking) => booking.status);
  const freeCount = bookings.filter((booking) => booking.service === "free-call")
    .length;
  const premiumCount = bookings.filter(
    (booking) => booking.service === "premium-session",
  ).length;

  const serviceItems = Object.entries(serviceCounts).map(
    ([label, value], index) => ({
      label,
      value,
      tone: index % 2 === 0 ? ("cyan" as const) : ("violet" as const),
    }),
  );

  const statusTone: Record<string, ChartItem["tone"]> = {
    pending: "yellow",
    confirmed: "emerald",
    completed: "cyan",
    cancelled: "red",
  };

  const statusItems = Object.entries(statusCounts).map(([label, value]) => ({
    label,
    value,
    tone: statusTone[label] ?? "zinc",
  }));

  const upcomingItems = buildUpcomingByDate(bookings);
  const premiumPercent = getPercent(premiumCount, freeCount + premiumCount);
  const freePercent = getPercent(freeCount, freeCount + premiumCount);

  return (
    <section className="grid gap-4 lg:grid-cols-2">
      <AnalyticsCard title="Bookings by Service" eyebrow="Service Mix">
        <BarList items={serviceItems} total={total} emptyText="No services yet." />
      </AnalyticsCard>

      <AnalyticsCard title="Bookings by Status" eyebrow="Pipeline Health">
        <BarList items={statusItems} total={total} emptyText="No statuses yet." />
      </AnalyticsCard>

      <AnalyticsCard title="Upcoming Bookings by Date" eyebrow="Next Schedule">
        <BarList
          items={upcomingItems}
          total={Math.max(...upcomingItems.map((item) => item.value), 0)}
          emptyText="No upcoming bookings."
          compareToMax
        />
      </AnalyticsCard>

      <AnalyticsCard title="Premium vs Free Ratio" eyebrow="Offer Split">
        <div className="space-y-4">
          <div className="overflow-hidden rounded-full border border-white/10 bg-black/40">
            <div className="flex h-4">
              <div
                className="bg-gradient-to-r from-violet-300 to-violet-500"
                style={{ width: `${premiumPercent}%` }}
              />
              <div
                className="bg-gradient-to-r from-cyan-300 to-cyan-500"
                style={{ width: `${freePercent}%` }}
              />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <RatioStat
              label="Premium"
              value={premiumCount}
              percent={premiumPercent}
              accentClassName="text-violet-200"
            />
            <RatioStat
              label="Free"
              value={freeCount}
              percent={freePercent}
              accentClassName="text-cyan-200"
            />
          </div>
        </div>
      </AnalyticsCard>
    </section>
  );
}

function AnalyticsCard({
  title,
  eyebrow,
  children,
}: {
  title: string;
  eyebrow: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl backdrop-blur-xl">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/8 via-transparent to-violet-500/10" />
      <div className="relative">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-200">
          {eyebrow}
        </p>
        <h2 className="mt-2 text-2xl font-black text-white">{title}</h2>
        <div className="mt-5">{children}</div>
      </div>
    </div>
  );
}

function BarList({
  items,
  total,
  emptyText,
  compareToMax,
}: {
  items: ChartItem[];
  total: number;
  emptyText: string;
  compareToMax?: boolean;
}) {
  if (items.length === 0) {
    return <p className="text-sm text-zinc-400">{emptyText}</p>;
  }

  return (
    <div className="space-y-4">
      {items.map((item) => {
        const percent = compareToMax
          ? getPercent(item.value, total)
          : getPercent(item.value, total);

        return (
          <div key={item.label}>
            <div className="mb-2 flex items-center justify-between gap-3 text-sm">
              <span className="font-bold capitalize text-zinc-100">
                {item.label}
              </span>
              <span className="text-xs font-bold text-zinc-400">
                {item.value}
                {!compareToMax && total > 0 ? ` / ${getPercent(item.value, total)}%` : ""}
              </span>
            </div>
            <div className="h-3 overflow-hidden rounded-full border border-white/10 bg-black/40">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${toneClasses[item.tone]}`}
                style={{ width: `${Math.max(percent, item.value > 0 ? 6 : 0)}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function RatioStat({
  label,
  value,
  percent,
  accentClassName,
}: {
  label: string;
  value: number;
  percent: number;
  accentClassName: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
        {label}
      </p>
      <p className={`mt-2 text-3xl font-black ${accentClassName}`}>{value}</p>
      <p className="mt-1 text-sm font-bold text-zinc-400">{percent}% of mix</p>
    </div>
  );
}
