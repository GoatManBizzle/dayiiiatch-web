import CountUpStat from "@/components/ui/count-up-stat";

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
        <CountUpStat key={stat.label} value={stat.value} label={stat.label} />
      ))}
    </div>
  );
}