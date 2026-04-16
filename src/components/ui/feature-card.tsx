type FeatureCardProps = {
  title: string;
  text: string;
};

export default function FeatureCard({ title, text }: FeatureCardProps) {
  return (
    <div className="rounded-[1.6rem] border border-white/10 bg-white/5 p-5 transition hover:-translate-y-1 hover:border-cyan-400/20 hover:bg-white/10 hover:shadow-[0_0_28px_rgba(34,211,238,0.07)]">
      <h4 className="text-xl font-semibold">{title}</h4>
      <p className="mt-3 text-sm leading-6 text-zinc-400">{text}</p>
    </div>
  );
}