import { links } from "@/config/links";

type PricingCardProps = {
  title: string;
  price: string;
  text: string;
  items: string[];
  badge: string;
  featured?: boolean;
};

export default function PricingCard({
  title,
  price,
  text,
  items,
  badge,
  featured = false,
}: PricingCardProps) {
  return (
    <div
      className={`card-sheen rounded-[1.9rem] border p-6 transition duration-300 hover:-translate-y-1 hover:scale-[1.01] ${
        featured
          ? "border-cyan-400/30 bg-gradient-to-b from-cyan-400/10 via-zinc-950/90 to-violet-500/10 shadow-[0_0_38px_rgba(34,211,238,0.14)]"
          : "border-white/10 bg-white/5 hover:border-violet-400/20 hover:bg-white/10 hover:shadow-[0_0_28px_rgba(139,92,246,0.08)]"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">
            {title}
          </p>
          <h4 className="mt-3 text-4xl font-black leading-none">{price}</h4>
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

      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={links.freeCall}
          target="_blank"
          rel="noreferrer"
          className={`rounded-2xl px-4 py-3 text-sm font-semibold transition duration-300 hover:scale-[1.03] ${
            featured
              ? "border border-cyan-400/30 bg-cyan-400/12 text-cyan-100 hover:bg-cyan-400/20"
              : "border border-white/15 bg-white/5 text-white hover:bg-white/10"
          }`}
        >
          Start with Free Call
        </a>

        <a
          href={links.contactForm}
          className="rounded-2xl border border-white/10 bg-zinc-900/60 px-4 py-3 text-sm font-semibold text-zinc-200 transition duration-300 hover:scale-[1.03] hover:bg-zinc-800/80"
        >
          Ask for Quote
        </a>
      </div>
    </div>
  );
}