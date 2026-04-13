export default function DayiiiatchSolutionsAgencyLanding() {
  const platforms = [
    {
      title: "Fiverr",
      badge: "Fast-turn gigs",
      description:
        "Ideal for quick projects, starter packages, and easy entry for new clients who want a simple buying path.",
      href: "#",
      cta: "Hire on Fiverr",
    },
    {
      title: "Upwork",
      badge: "Longer contracts",
      description:
        "Best for custom scopes, ongoing support, larger system builds, and higher-trust freelance relationships.",
      href: "#",
      cta: "Hire on Upwork",
    },
    {
      title: "LinkedIn",
      badge: "Professional presence",
      description:
        "Use this for networking, credibility, business outreach, and showcasing the DAYIIIatch Solutions brand story.",
      href: "#",
      cta: "View LinkedIn",
    },
  ];

  const services = [
    {
      title: "Custom Websites & Landing Pages",
      text: "Modern pages built to help brands look official, convert traffic, and present services clearly.",
    },
    {
      title: "AI Workflow Setup",
      text: "Prompt systems, content pipelines, automation flows, and productivity upgrades for creators and businesses.",
    },
    {
      title: "Branding & Creative Direction",
      text: "Visual identity support, concept development, and strategic presentation for digital products and services.",
    },
    {
      title: "Automation & System Builds",
      text: "Smart tools, dashboards, process cleanup, and custom builds that save time and reduce friction.",
    },
    {
      title: "Tech Support & Guided Setup",
      text: "Hands-on help for tools, software, account setup, remote systems, and workflow troubleshooting.",
    },
    {
      title: "Creative Asset Production",
      text: "Support for digital visuals, mockups, concept materials, and polished assets for online presence.",
    },
  ];

  const trustPoints = [
    "Branded under DAYIIIatch Solutions",
    "Multi-platform client entry points",
    "Built for creators, startups, and growing brands",
    "Flexible support from quick gigs to custom builds",
  ];

  const process = [
    {
      step: "01",
      title: "Choose your lane",
      text: "Clients enter through Fiverr, Upwork, LinkedIn, or direct contact depending on the type of help they need.",
    },
    {
      step: "02",
      title: "Lock the scope",
      text: "We define the goal, deliverables, timeline, and best-fit service path so the project starts clean.",
    },
    {
      step: "03",
      title: "Build with purpose",
      text: "From websites to systems and creative assets, the work is designed to look sharp and solve real problems.",
    },
    {
      step: "04",
      title: "Grow from there",
      text: "Clients can return for upgrades, ongoing support, future packages, and larger builds over time.",
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(139,92,246,0.24),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(34,211,238,0.18),_transparent_30%),linear-gradient(to_bottom,_rgba(255,255,255,0.02),_rgba(255,255,255,0))]" />

      <main className="relative mx-auto max-w-7xl px-6 py-8 md:px-10 lg:px-16">
        <header className="mb-10 flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-violet-300">DAYIIIatch Solutions</p>
            <h1 className="mt-2 text-xl font-semibold md:text-2xl">Freelance Services, Creative Systems, and Digital Solutions</h1>
          </div>

          <nav className="flex flex-wrap gap-2 text-sm text-zinc-300">
            <a href="#services" className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 hover:bg-white/10">Services</a>
            <a href="#platforms" className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 hover:bg-white/10">Platforms</a>
            <a href="#process" className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 hover:bg-white/10">Process</a>
            <a href="#contact" className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 hover:bg-white/10">Contact</a>
          </nav>
        </header>

        <section className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="space-y-6">
            <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1 text-xs font-medium uppercase tracking-[0.25em] text-cyan-200">
              Official DAYIIIatchSolutions.com Home
            </div>

            <div className="space-y-4">
              <h2 className="max-w-4xl text-4xl font-black leading-tight md:text-6xl">
                Build trust first. Then send clients exactly where they need to go.
              </h2>
              <p className="max-w-2xl text-base leading-7 text-zinc-300 md:text-lg">
                DAYIIIatch Solutions helps creators, businesses, and growing brands level up with websites, automation,
                AI-assisted workflows, branding support, and digital problem-solving. This page acts as your central
                web presence while routing clients into Fiverr, Upwork, LinkedIn, or direct contact.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a href="#platforms" className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:scale-[1.02]">
                Work With Us
              </a>
              <a href="#services" className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                Explore Services
              </a>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {trustPoints.map((point) => (
                <div key={point} className="rounded-2xl border border-white/10 bg-zinc-900/70 px-4 py-3 text-sm text-zinc-200">
                  {point}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-zinc-400">Agency Snapshot</p>
                <h3 className="text-2xl font-bold">What DAYIIIatch Solutions does</h3>
              </div>
              <div className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                Open for Clients
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl border border-violet-400/20 bg-violet-500/10 p-4">
                <p className="text-sm leading-6 text-violet-100">
                  Clean online presence. Professional routing. Flexible services. Built to help you look official while
                  making it easy for clients to buy, inquire, or connect.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {services.slice(0, 4).map((service) => (
                  <div key={service.title} className="rounded-2xl border border-white/10 bg-zinc-900/70 p-4">
                    <p className="text-sm font-semibold text-white">{service.title}</p>
                    <p className="mt-2 text-xs leading-5 text-zinc-400">{service.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="mt-16">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-zinc-400">Services</p>
              <h3 className="text-3xl font-bold">Core offers</h3>
            </div>
            <p className="max-w-2xl text-sm leading-6 text-zinc-400">
              These blocks can later be expanded into package cards, pricing sections, portfolio proof, or platform-specific gigs.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => (
              <div key={service.title} className="rounded-[1.6rem] border border-white/10 bg-white/5 p-5 transition hover:-translate-y-1 hover:bg-white/10">
                <h4 className="text-xl font-semibold">{service.title}</h4>
                <p className="mt-3 text-sm leading-6 text-zinc-400">{service.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="platforms" className="mt-16">
          <div className="mb-6">
            <p className="text-sm uppercase tracking-[0.25em] text-zinc-400">Platforms</p>
            <h3 className="text-3xl font-bold">Choose your entry point</h3>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {platforms.map((platform) => (
              <a
                key={platform.title}
                href={platform.href}
                className="group rounded-[1.8rem] border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-white/10"
              >
                <div className="mb-5 flex items-center justify-between gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-zinc-900 text-lg font-bold text-cyan-300">
                    {platform.title.charAt(0)}
                  </div>
                  <span className="rounded-full border border-white/10 bg-zinc-900/70 px-3 py-1 text-xs text-zinc-300">
                    {platform.badge}
                  </span>
                </div>
                <h4 className="text-2xl font-semibold">{platform.title}</h4>
                <p className="mt-3 min-h-[96px] text-sm leading-6 text-zinc-400">{platform.description}</p>
                <span className="mt-4 inline-block text-sm font-semibold text-violet-300 transition group-hover:translate-x-1">
                  {platform.cta} →
                </span>
              </a>
            ))}
          </div>
        </section>

        <section id="process" className="mt-16 grid gap-4 lg:grid-cols-4">
          {process.map((item) => (
            <div key={item.step} className="rounded-[1.6rem] border border-white/10 bg-white/5 p-5">
              <p className="text-sm font-semibold text-violet-300">{item.step}</p>
              <h4 className="mt-2 text-xl font-bold">{item.title}</h4>
              <p className="mt-3 text-sm leading-6 text-zinc-400">{item.text}</p>
            </div>
          ))}
        </section>

        <section className="mt-16 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <p className="text-sm uppercase tracking-[0.25em] text-zinc-400">About</p>
            <h3 className="mt-2 text-3xl font-bold">Built for modern digital work</h3>
            <p className="mt-4 text-sm leading-7 text-zinc-300">
              DAYIIIatch Solutions is positioned as a creative-tech service brand that blends freelance flexibility with
              a more official agency-style presence. The goal is simple: make it easier for people to trust the brand,
              understand the value, and choose the best way to work with you.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-gradient-to-r from-violet-500/15 via-white/5 to-cyan-400/10 p-6">
            <p className="text-sm uppercase tracking-[0.25em] text-zinc-300">Future upgrades</p>
            <h3 className="mt-2 text-3xl font-bold">Easy next-step expansion</h3>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                "Add testimonials",
                "Add portfolio case studies",
                "Add service pricing",
                "Add booking form or Calendly",
                "Add branded FAQ section",
                "Add lead capture form",
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-zinc-950/40 px-4 py-3 text-sm text-zinc-200">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="mt-16 rounded-[2rem] border border-white/10 bg-white/5 p-8 text-center">
          <p className="text-sm uppercase tracking-[0.25em] text-zinc-400">Contact</p>
          <h3 className="mt-2 text-4xl font-black">Ready to build with DAYIIIatch Solutions?</h3>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-zinc-300">
            Plug in your real Fiverr, Upwork, LinkedIn, email, booking page, and portfolio links to make this your live client-facing homepage.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a href="mailto:DAYIIIatchSolutions@outlook.com" className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:scale-[1.02]">
              Email DAYIIIatch Solutions
            </a>
            <a href="#platforms" className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
              View Platforms
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
