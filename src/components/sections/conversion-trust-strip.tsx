import Reveal from "@/components/ui/reveal";

type ConversionTrustStripProps = {
  items: string[];
  note?: string;
};

export default function ConversionTrustStrip({
  items,
  note,
}: ConversionTrustStripProps) {
  return (
    <Reveal delayMs={70}>
      <section
        className="mt-10 rounded-[1.4rem] border border-cyan-300/12 bg-white/[0.035] px-4 py-4 shadow-[0_0_30px_rgba(34,211,238,0.05)] backdrop-blur-xl md:mt-12"
        aria-label="Trust indicators"
      >
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="grid gap-2 sm:grid-cols-2 lg:flex lg:flex-wrap">
            {items.map((item, index) => (
              <Reveal key={item} delayMs={index * 45}>
                <div className="rounded-full border border-white/10 bg-black/20 px-3 py-2 text-center text-[11px] font-bold uppercase tracking-[0.1em] text-zinc-300 transition duration-300 hover:border-cyan-300/22 hover:text-cyan-100 sm:px-4">
                  {item}
                </div>
              </Reveal>
            ))}
          </div>

          {note ? (
            <p className="max-w-sm text-center text-xs leading-5 text-zinc-500 lg:text-right">
              {note}
            </p>
          ) : null}
        </div>
      </section>
    </Reveal>
  );
}
