import Magnetic from "@/components/ui/magnetic";
import { getCtaSupportCopy, getCtaToneClass } from "@/components/ui/cta-tone";

type PricingCardProps = {
  title: string;
  price: string;
  priceLabel: string;
  text: string;
  bestFor: string;
  items: string[];
  scopeNote: string;
  badge: string;
  cta: string;
  href: string;
  featured?: boolean;
};

export default function PricingCard({
  title,
  price,
  priceLabel,
  text,
  bestFor,
  items,
  scopeNote,
  badge,
  cta,
  href,
  featured = false,
}: PricingCardProps) {
  const ctaToneClass = getCtaToneClass(cta, href);
  const ctaSupportCopy = getCtaSupportCopy(cta, href);

  return (
    <Magnetic as="div" className="h-full" strength={0.04} scale={1.002}>
      <div
        className={`card-sheen h-full rounded-[1.6rem] border p-5 transition duration-500 hover:-translate-y-1 hover:scale-[1.006] sm:rounded-[1.9rem] sm:p-6 ${
          featured
            ? "border-cyan-400/30 bg-gradient-to-b from-cyan-400/10 via-zinc-950/90 to-violet-500/10 shadow-[0_0_38px_rgba(34,211,238,0.14)] hover:border-cyan-300/45 hover:shadow-[0_0_44px_rgba(34,211,238,0.18)]"
            : "border-white/10 bg-white/5 hover:border-violet-400/25 hover:bg-white/10 hover:shadow-[0_0_32px_rgba(139,92,246,0.10)]"
        }`}
      >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">
            {title}
          </p>
          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
            {priceLabel}
          </p>
          <h4 className="mt-1 text-3xl font-black leading-none sm:text-4xl">
            {price}
          </h4>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            featured
              ? "border border-cyan-400/30 bg-cyan-400/10 text-cyan-200"
              : "border border-white/10 bg-white/5 text-zinc-300"
          }`}
        >
          {badge}
        </span>
      </div>

      <p className="mt-4 text-sm leading-7 text-zinc-300">{text}</p>

      <p className="mt-4 rounded-2xl border border-cyan-400/15 bg-cyan-400/8 px-4 py-3 text-xs leading-5 text-cyan-100">
        <span className="font-bold text-cyan-200">Best for:</span> {bestFor}
      </p>

      <div className="mt-5 space-y-3">
        {items.map((item) => (
          <div
            key={item}
            className="rounded-xl border border-white/10 bg-zinc-900/60 px-4 py-3 text-sm text-zinc-200 transition duration-300 hover:border-cyan-400/15 hover:bg-zinc-900/85"
          >
            {item}
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-2xl border border-violet-400/20 bg-violet-500/8 px-4 py-3">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-violet-200">
          Estimated Scope
        </p>
        <p className="mt-2 text-sm leading-6 text-zinc-300">{scopeNote}</p>
      </div>

      <div className="mt-6">
        <Magnetic className="inline-flex w-full" strength={0.1}>
          <a
            href={href}
            className={`inline-flex w-full items-center justify-center rounded-2xl border px-4 py-3 text-center text-sm font-semibold transition duration-500 ease-out hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-cyan-300/30 ${ctaToneClass}`}
          >
            {cta}
          </a>
        </Magnetic>
        <p className="mt-2 text-center text-[11px] leading-5 text-zinc-500">
          {featured ? "Most guided path for serious builds." : ctaSupportCopy}
        </p>
      </div>
      </div>
    </Magnetic>
  );
}
