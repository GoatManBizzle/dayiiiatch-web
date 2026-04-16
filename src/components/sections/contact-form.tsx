import { links } from "@/config/links";

export default function ContactFormSection() {
  return (
    <section
      id="contact-form"
      className="mt-16 rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-[0_0_40px_rgba(34,211,238,0.05)]"
    >
      <div className="mb-8 text-center">
        <p className="text-sm uppercase tracking-[0.25em] text-zinc-400">
          Contact
        </p>
        <h3 className="mt-2 text-4xl font-black">
          Send a direct project inquiry
        </h3>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-zinc-300">
          Use the form below for custom builds, collaborations, website
          requests, automation ideas, and digital support.
        </p>
      </div>

      <form
        action="https://formspree.io/f/mdayoagd"
        method="POST"
        className="mx-auto grid max-w-4xl gap-4 md:grid-cols-2"
      >
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-zinc-200">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full rounded-2xl border border-white/10 bg-zinc-900/70 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/50 focus:shadow-[0_0_18px_rgba(34,211,238,0.08)]"
            placeholder="Your name"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-zinc-200">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-2xl border border-white/10 bg-zinc-900/70 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/50 focus:shadow-[0_0_18px_rgba(34,211,238,0.08)]"
            placeholder="you@example.com"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label
            htmlFor="projectType"
            className="text-sm font-medium text-zinc-200"
          >
            Project Type
          </label>
          <input
            id="projectType"
            name="project_type"
            type="text"
            className="w-full rounded-2xl border border-white/10 bg-zinc-900/70 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/50 focus:shadow-[0_0_18px_rgba(34,211,238,0.08)]"
            placeholder="Website, automation, branding, AI workflow, tech support, etc."
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label
            htmlFor="message"
            className="text-sm font-medium text-zinc-200"
          >
            Project Details
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            className="w-full rounded-2xl border border-white/10 bg-zinc-900/70 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/50 focus:shadow-[0_0_18px_rgba(34,211,238,0.08)]"
            placeholder="Tell DAYIIIatch Solutions what you need, what you're trying to build, and where you need help."
          />
        </div>

        <div className="md:col-span-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-6 text-zinc-400">
            Prefer a call first? Book the free strategy call or jump straight
            into the premium planning session.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href={links.freeCall}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Free Call
            </a>

            <button
              type="submit"
              className="rounded-2xl border border-white/20 bg-white px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:scale-[1.02] hover:shadow-[0_0_28px_rgba(255,255,255,0.18)]"
            >
              Send Project Inquiry
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}