type TestimonialCardProps = {
  quote: string;
  name: string;
  role: string;
  badge: string;
  initials: string;
};

export default function TestimonialCard({
  quote,
  name,
  role,
  badge,
  initials,
}: TestimonialCardProps) {
  return (
    <div className="card-sheen rounded-[1.8rem] border border-white/10 bg-white/5 p-6 transition duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:border-violet-400/20 hover:shadow-[0_0_36px_rgba(168,85,247,0.10)]">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-sm font-bold text-cyan-200 shadow-[0_0_20px_rgba(34,211,238,0.10)]">
            {initials}
          </div>
          <div>
            <p className="font-semibold text-white">{name}</p>
            <p className="text-sm text-zinc-500">{role}</p>
          </div>
        </div>

        <span className="rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-violet-200">
          {badge}
        </span>
      </div>

      <p className="text-sm leading-7 text-zinc-300">“{quote}”</p>
    </div>
  );
}