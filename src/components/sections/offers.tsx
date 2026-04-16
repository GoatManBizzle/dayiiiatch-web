import SectionShell from "@/components/ui/section-shell";
import Reveal from "@/components/ui/reveal";
import { offers } from "@/data/site-content";

export default function OffersSection() {
  return (
    <SectionShell
      id="offers"
      eyebrow="Offers"
      title="Choose your entry point"
      description="Each path is designed to move visitors into the right next step depending on how much clarity, planning, or direct support they need."
    >
      <div className="grid gap-4 lg:grid-cols-3">
        {offers.map((offer, index) => {
          const external = offer.href.startsWith("http");

          return (
            <Reveal key={offer.title} delayMs={index * 90}>
              <div className="card-sheen rounded-[1.8rem] border border-white/10 bg-white/5 p-6 transition duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:border-cyan-400/20 hover:shadow-[0_0_32px_rgba(34,211,238,0.08)]">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-2xl font-bold">{offer.title}</h3>
                  <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-200">
                    {offer.badge}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-7 text-zinc-300">
                  {offer.description}
                </p>

                <div className="mt-6">
                  <a
                    href={offer.href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noreferrer" : undefined}
                    className="inline-flex rounded-2xl border border-cyan-400/30 bg-gradient-to-r from-cyan-400/15 to-violet-500/15 px-5 py-3 text-sm font-semibold text-cyan-100 transition duration-300 hover:scale-[1.04] hover:shadow-[0_0_28px_rgba(34,211,238,0.20)]"
                  >
                    {offer.cta}
                  </a>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </SectionShell>
  );
}