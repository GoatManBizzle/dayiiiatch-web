import Magnetic from "@/components/ui/magnetic";

type FeatureCardProps = {
  title: string;
  text: string;
  bestFor: string;
  features: string[];
  cta: string;
  href: string;
};

export default function FeatureCard({
  title,
  text,
  bestFor,
  features,
  cta,
  href,
}: FeatureCardProps) {
  return (
    <Magnetic as="div" className="h-full" strength={0.045} scale={1.002}>
      <div className="card-sheen flex h-full flex-col rounded-[1.5rem] border border-white/10 bg-white/[0.055] p-4 shadow-[0_0_28px_rgba(34,211,238,0.04)] transition duration-500 hover:-translate-y-1 hover:scale-[1.006] hover:border-cyan-400/30 hover:bg-white/10 hover:shadow-[0_0_38px_rgba(34,211,238,0.13)] sm:rounded-[1.7rem] sm:p-5">
      <div className="mb-4 h-1 w-14 rounded-full bg-gradient-to-r from-cyan-300 to-violet-400 shadow-[0_0_18px_rgba(34,211,238,0.26)]" />

      <h4 className="text-lg font-bold text-white sm:text-xl">{title}</h4>
      <p className="mt-3 text-sm leading-6 text-zinc-300">{text}</p>

      <p className="mt-4 rounded-2xl border border-cyan-400/15 bg-cyan-400/8 px-4 py-3 text-xs leading-5 text-cyan-100">
        <span className="font-bold text-cyan-200">Best for:</span> {bestFor}
      </p>

      <div className="mt-4 space-y-2">
        {features.map((feature) => (
          <div
            key={feature}
            className="flex gap-3 rounded-xl border border-white/10 bg-zinc-950/45 px-3 py-2 text-xs leading-5 text-zinc-300"
          >
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.55)]" />
            <span>{feature}</span>
          </div>
        ))}
      </div>

      <div className="mt-auto pt-5">
        <Magnetic className="inline-flex w-full" strength={0.1}>
          <a
            href={href}
            className="inline-flex w-full items-center justify-center rounded-2xl border border-cyan-400/30 bg-gradient-to-r from-cyan-400/16 to-violet-500/16 px-4 py-3 text-center text-sm font-semibold text-cyan-100 transition duration-300 hover:scale-[1.01] hover:border-cyan-300/55 hover:shadow-[0_0_32px_rgba(34,211,238,0.22)]"
          >
            {cta}
          </a>
        </Magnetic>
      </div>
      </div>
    </Magnetic>
  );
}
