import StatStrip from "@/components/ui/stat-strip";
import { topBannerStats } from "@/data/site-content";
import { brand } from "@/config/brand";

export default function TopBanner() {
  return (
    <section className="relative mb-6 overflow-hidden rounded-[2.25rem] border border-cyan-400/20 shadow-[0_0_80px_rgba(56,189,248,0.08)]">
      <div className="absolute inset-0 bg-[url('/bg-banner.png')] bg-cover bg-center bg-no-repeat opacity-45" />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(2,6,23,0.92),rgba(9,9,11,0.76),rgba(9,9,11,0.90))]" />

      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 via-violet-500/10 to-fuchsia-500/10" />

      <div className="relative px-5 py-4 backdrop-blur-[1px] md:px-7 md:py-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-cyan-300">
              {brand.name}
            </p>
            <h1 className="mt-2 text-2xl font-black leading-tight md:text-4xl">
              {brand.bannerTitle}
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-300 md:text-base">
              {brand.bannerText}
            </p>
          </div>

          <StatStrip items={topBannerStats} />
        </div>
      </div>
    </section>
  );
}