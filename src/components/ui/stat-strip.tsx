type StatItem = {
  label: string;
  value: string;
};

type StatStripProps = {
  items: StatItem[];
};

export default function StatStrip({ items }: StatStripProps) {
  return (
    <div className="grid grid-cols-3 gap-3 md:min-w-[320px]">
      {items.map((stat) => (
        <div
          key={stat.label}
          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-center shadow-lg shadow-violet-500/5"
        >
          <p className="text-lg font-black text-white md:text-2xl">
            {stat.value}
          </p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-zinc-400 md:text-xs">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}