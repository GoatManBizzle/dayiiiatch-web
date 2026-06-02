import Magnetic from "@/components/ui/magnetic";
import Reveal from "@/components/ui/reveal";
import { offers, packages, services } from "@/data/site-content";

const serviceSummary = services.slice(0, 6);

export default function CommercialPathsSection() {
  return (
    <section
      id="services"
      data-style-section="commercial"
      className="relative mt-10 overflow-hidden rounded-[1.5rem] border border-violet-300/14 bg-zinc-950/58 p-4 shadow-[0_0_58px_rgba(168,85,247,0.08)] backdrop-blur-xl sm:rounded-[2.1rem] sm:p-6 md:mt-16 md:p-8"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_12%,rgba(168,85,247,0.14),transparent_34%),radial-gradient(circle_at_86%_20%,rgba(34,211,238,0.13),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.04),transparent_46%)]" />
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-violet-300/55 to-transparent" />

      <div className="relative z-10">
        <div className="mb-6 grid gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="style-editor-section-label text-xs uppercase tracking-[0.18em] text-violet-200 sm:text-sm sm:tracking-[0.25em]">
              Services / Offers / Packages
            </p>
            <h3 className="mt-2 text-2xl font-black leading-tight text-white sm:text-3xl md:text-4xl">
              Choose the right level of help
            </h3>
          </div>

          <p className="max-w-3xl text-sm leading-6 text-zinc-300 lg:justify-self-end">
            One commercial path: understand what DAYIIIatch builds, pick the
            best entry point, then choose the build level that fits the mission.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <div className="mb-3 flex items-center justify-between gap-3">
              <h4 className="text-lg font-black text-white">What we do</h4>
              <span className="rounded-full border border-cyan-300/18 bg-cyan-400/8 px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-cyan-100">
                Services
              </span>
            </div>

            <div className="style-editor-service-grid grid gap-3 md:grid-cols-2">
              {serviceSummary.map((service, index) => (
                <Reveal key={service.title} delayMs={index * 45}>
                  <article className="style-editor-service-card card-sheen h-full rounded-[1.25rem] border border-white/10 bg-white/[0.045] p-4 transition duration-500 hover:-translate-y-1 hover:border-cyan-300/28 hover:bg-white/[0.065]">
                    <h5 className="text-base font-black text-white">
                      {service.title}
                    </h5>
                    <p className="mt-2 text-sm leading-6 text-zinc-300">
                      {service.text}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>

          <div id="offers" className="grid gap-4">
            <div>
              <div className="mb-3 flex items-center justify-between gap-3">
                <h4 className="text-lg font-black text-white">How to start</h4>
                <span className="rounded-full border border-violet-300/18 bg-violet-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-violet-100">
                  Offers
                </span>
              </div>

              <div className="style-editor-service-grid grid gap-3">
                {offers.map((offer, index) => (
                  <Reveal key={offer.title} delayMs={index * 65}>
                    <div className="style-editor-service-card rounded-[1.25rem] border border-white/10 bg-black/24 p-4">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                        <h5 className="text-base font-black text-white">
                          {offer.title}
                        </h5>
                        <span className="w-fit rounded-full border border-cyan-300/18 bg-cyan-400/8 px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-cyan-100">
                          {offer.badge}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-zinc-300">
                        {offer.description}
                      </p>
                      <Magnetic className="mt-4 inline-flex w-full" strength={0.08}>
                        <a
                          href={offer.href}
                          className="style-editor-service-button inline-flex min-h-11 w-full items-center justify-center rounded-2xl border border-cyan-300/28 bg-cyan-400/12 px-4 py-2.5 text-center text-xs font-black text-cyan-50 transition hover:-translate-y-0.5 hover:border-cyan-200/48"
                        >
                          {offer.cta}
                        </a>
                      </Magnetic>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div id="pricing" className="mt-6">
          <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-200">
                Packages
              </p>
              <h4 className="mt-1 text-xl font-black text-white">
                Pick the build depth
              </h4>
            </div>
            <p className="max-w-xl text-sm leading-6 text-zinc-400">
              Starting points stay simple. Final scope is confirmed after the
              right call or inquiry.
            </p>
          </div>

          <div className="style-editor-service-grid grid gap-4 md:grid-cols-3">
            {packages.map((pkg, index) => (
              <Reveal key={pkg.title} delayMs={index * 70}>
                <article
                  className={`style-editor-service-card h-full rounded-[1.35rem] border p-4 ${
                    pkg.featured
                      ? "border-violet-300/30 bg-violet-500/12 shadow-[0_0_34px_rgba(168,85,247,0.12)]"
                      : "border-white/10 bg-white/[0.045]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <h5 className="text-lg font-black text-white">
                      {pkg.title}
                    </h5>
                    <span className="rounded-full border border-cyan-300/16 bg-cyan-400/8 px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-cyan-100">
                      {pkg.badge}
                    </span>
                  </div>
                  <p className="mt-3 text-2xl font-black text-cyan-100">
                    {pkg.price}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-zinc-300">
                    {pkg.text}
                  </p>
                  <a
                    href={pkg.href}
                    className="style-editor-service-button mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-2xl border border-white/15 bg-white px-4 py-2.5 text-center text-xs font-black text-zinc-950 transition hover:shadow-[0_0_26px_rgba(255,255,255,0.14)]"
                  >
                    {pkg.cta}
                  </a>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
