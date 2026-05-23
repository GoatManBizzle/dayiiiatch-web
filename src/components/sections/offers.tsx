import SectionShell from "@/components/ui/section-shell";
import Reveal from "@/components/ui/reveal";
import Magnetic from "@/components/ui/magnetic";
import { getCtaSupportCopy, getCtaToneClass } from "@/components/ui/cta-tone";
import { offers } from "@/data/site-content";

export default function OffersSection() {
  return (
    <SectionShell
      id="offers"
      eyebrow="Offers"
      title="Choose your entry point"
      description="Each path is designed to move visitors into the right next step depending on how much clarity, planning, or direct support they need."
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {offers.map((offer, index) => {
          const external = offer.href.startsWith("http");
          const ctaToneClass = getCtaToneClass(offer.cta, offer.href);
          const supportCopy = getCtaSupportCopy(offer.cta, offer.href);

          return (
            <Reveal key={offer.title} delayMs={index * 90}>
              <Magnetic as="div" className="h-full" strength={0.04} scale={1.002}>
                <div className="card-sheen h-full rounded-[1.6rem] border border-white/10 bg-white/5 p-5 transition duration-500 hover:-translate-y-1 hover:scale-[1.006] hover:border-cyan-400/28 hover:shadow-[0_0_36px_rgba(34,211,238,0.11)] sm:rounded-[1.8rem] sm:p-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <h3 className="text-xl font-bold sm:text-2xl">
                    {offer.title}
                  </h3>
                  <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-200">
                    {offer.badge}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-7 text-zinc-300">
                  {offer.description}
                </p>

                <div className="mt-6">
                  <Magnetic className="inline-flex w-full sm:w-auto" strength={0.1}>
                    <a
                      href={offer.href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noreferrer" : undefined}
                      className={`inline-flex min-h-12 w-full items-center justify-center rounded-2xl border px-5 py-3 text-center text-sm font-semibold transition duration-500 ease-out hover:scale-[1.012] focus:outline-none focus:ring-2 focus:ring-cyan-300/30 sm:w-auto ${ctaToneClass}`}
                    >
                      {offer.cta}
                    </a>
                  </Magnetic>
                  <p className="mt-2 text-xs leading-5 text-zinc-500">
                    {supportCopy}
                  </p>
                </div>
                </div>
              </Magnetic>
            </Reveal>
          );
        })}
      </div>
    </SectionShell>
  );
}
