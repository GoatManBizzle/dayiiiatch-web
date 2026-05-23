import FAQItem from "@/components/ui/faq-item";
import { faqs, whyChoose } from "@/data/site-content";

export default function FAQSection() {
  return (
    <section
      id="faq"
      className="mt-10 grid gap-4 md:mt-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-5"
    >
      <div className="rounded-[1.6rem] border border-white/10 bg-white/5 p-5 sm:rounded-[2rem] sm:p-6">
        <p className="text-xs uppercase tracking-[0.18em] text-zinc-400 sm:text-sm sm:tracking-[0.25em]">
          Frequently Asked Questions
        </p>
        <h3 className="mt-2 text-2xl font-bold leading-tight sm:text-3xl">
          Quick answers for new visitors
        </h3>

        <div className="mt-5 space-y-3">
          {faqs.map((item) => (
            <FAQItem
              key={item.question}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>
      </div>

      <div className="rounded-[1.6rem] border border-white/10 bg-gradient-to-r from-violet-500/15 via-white/5 to-cyan-400/10 p-5 shadow-[0_0_36px_rgba(139,92,246,0.08)] sm:rounded-[2rem] sm:p-6">
        <p className="text-xs uppercase tracking-[0.18em] text-zinc-300 sm:text-sm sm:tracking-[0.25em]">
          Why Choose DAYIIIatch Solutions
        </p>
        <h3 className="mt-2 text-2xl font-bold leading-tight sm:text-3xl">
          Built for modern digital work
        </h3>

        <div className="mt-5 space-y-3">
          {whyChoose.map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-white/10 bg-zinc-900/60 px-4 py-3 text-sm text-zinc-200"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
