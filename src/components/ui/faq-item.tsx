type FAQItemProps = {
  question: string;
  answer: string;
};

export default function FAQItem({ question, answer }: FAQItemProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-950/40 p-4">
      <p className="font-semibold text-white">{question}</p>
      <p className="mt-2 text-sm leading-6 text-zinc-300">{answer}</p>
    </div>
  );
}