type TestimonialCardProps = {
  quote: string;
  name: string;
  role: string;
};

export default function TestimonialCard({
  quote,
  name,
  role,
}: TestimonialCardProps) {
  return (
    <div className="rounded-[1.8rem] border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-violet-400/20 hover:shadow-[0_0_32px_rgba(168,85,247,0.08)]">
      <p className="text-sm leading-7 text-zinc-300">“{quote}”</p>
      <div className="mt-5 border-t border-white/10 pt-4">
        <p className="font-semibold text-white">{name}</p>
        <p className="text-sm text-zinc-500">{role}</p>
      </div>
    </div>
  );
}