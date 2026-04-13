import Image from "next/image";

export default function DayiiiatchSolutionsAgencyLanding() {
  const platforms = [
    {
      title: "Free Strategy Call",
      badge: "Best first step",
      description:
        "Book a free 15-minute phone call to talk through your goals, your current setup, and the best next move.",
      href: "https://calendly.com/dayiiiatchsolutions/free-15min-strategy-call",
      cta: "Book Free Call",
    },
    {
      title: "Premium Session",
      badge: "Serious clients",
      description:
        "Book a paid deep strategy session for focused planning, problem-solving, and a clearer path forward.",
      href: "https://calendly.com/dayiiiatchsolutions/deep-strategy-session-paid",
      cta: "Book Premium Session",
    },
    {
      title: "Direct Inquiry",
      badge: "Project requests",
      description:
        "Send a direct inquiry through the DAYIIIatch Solutions contact form for builds, collaborations, and custom scopes.",
      href: "#contact-form",
      cta: "Send Inquiry",
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
    "Live booking flow for free and premium sessions",
    "Branded under DAYIIIatch Solutions",
    "Built for creators, startups, and growing brands",
    "Flexible support from quick calls to custom builds",
  ];

  const process = [
    {
      step: "01",
      title: "Start with the free call",
      text: "New clients can book a free 15-minute strategy call to explain what they need and find the right service path.",
    },
    {
      step: "02",
      title: "Qualify the project",
      text: "We figure out the scope, goals, priorities, and whether a direct service or premium planning session makes sense.",
    },
    {
      step: "03",
      title: "Deep strategy or build phase",
      text: "Serious clients can move into a paid planning session or jump into the actual build depending on the project.",
    },
    {
      step: "04",
      title: "Execute and expand",
      text: "From websites to systems and creative support, the work is delivered with room for future upgrades and ongoing help.",
    },
  ];

  const whyChooseUs = [
    "Clear entry points for free consults, paid planning, and direct inquiries",
    "Creative + technical support in one place",
    "Fast path from conversation to action plan",
    "Professional web presence backed by real booking links",
  ];

  const featuredOffers = [
    {
      title: "Free 15-Min Strategy Call",
      text: "A quick phone call to understand your goals, answer high-level questions, and point you toward the best next move.",
      cta: "Book Free Call",
      href: "https://calendly.com/dayiiiatchsolutions/free-15min-strategy-call",
    },
    {
      title: "Deep Strategy Session (Paid)",
      text: "A focused premium session for serious clients who want a deeper game plan, clearer direction, and actionable guidance.",
      cta: "Book Premium Session",
      href: "https://calendly.com/dayiiiatchsolutions/deep-strategy-session-paid",
    },
    {
      title: "Custom Project Inquiry",
      text: "Send a direct project request for websites, automation systems, branding help, or digital support through the contact form.",
      cta: "Send Inquiry",
      href: "#contact-form",
    },
  ];

  const testimonials = [
    {
      quote:
        "DAYIIIatch Solutions blends creative thinking with real technical direction. The process feels direct, clear, and professional.",
      name: "Future Client Slot",
      role: "Testimonial placeholder",
    },
    {
      quote:
        "The strategy-first approach makes it easier to understand what needs to happen next instead of guessing through the project.",
      name: "Future Client Slot",
      role: "Testimonial placeholder",
    },
    {
      quote:
        "From the free call to the deeper planning session, the funnel feels polished and serious. It builds trust fast.",
      name: "Future Client Slot",
      role: "Testimonial placeholder",
    },
  ];

  const packages = [
    {
      title: "Starter Guidance",
      price: "From $50+",
      text: "Best for quick guidance, setup direction, and focused digital problem-solving.",
      items: ["Free call available", "Short-form support", "Best for smaller needs"],
    },
    {
      title: "Strategy & Planning",
      price: "From $100+",
      text: "Best for clients who need a clearer roadmap, service recommendations, or system planning.",
      items: ["Deep strategy session", "Action-focused direction", "Best for serious next steps"],
    },
    {
      title: "Custom Build Projects",
      price: "Custom Quote",
      text: "Best for websites, automation systems, branding support, and larger custom scopes.",
      items: ["Project inquiry required", "Scope-based pricing", "Best for full implementations"],
    },
  ];

  const faqs = [
    {
      question: "What should I book first?",
      answer:
        "Start with the free 15-minute strategy call if you need help figuring out the right next step. Book the premium session if you already know you want deeper planning.",
    },
    {
      question: "Do you only work through calls?",
      answer:
        "No. Calls are the entry point. DAYIIIatch Solutions also handles direct inquiries for websites, automation systems, branding help, and custom project work.",
    },
    {
      question: "Can I send a project request without booking a call?",
      answer:
        "Yes. Use the inquiry form if you already know what you want built and want to start the conversation directly.",
    },
  ];

  const socialLinks = [
    { label: "Free Call", href: "https://calendly.com/dayiiiatchsolutions/free-15min-strategy-call" },
    { label: "Premium Session", href: "https://calendly.com/dayiiiatchsolutions/deep-strategy-session-paid" },
    { label: "Inquiry Form", href: "#contact-form" },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(139,92,246,0.24),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(34,211,238,0.18),_transparent_30%),linear-gradient(to_bottom,_rgba(255,255,255,0.02),_rgba(255,255,255,0))]" />

      <main className="relative mx-auto max-w-7xl px-6 py-8 md:px-10 lg:px-16">
        <header className="mb-10 flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="relative h-14 w-14 overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/70 shadow-lg shadow-cyan-500/10">
              <Image
                src="/dayiiiatch-logo.png"
                alt="DAYIIIatch Solutions logo"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-violet-300">DAYIIIatch Solutions</p>
              <h1 className="mt-2 text-xl font-semibold md:text-2xl">Freelance Services, Creative Systems, and Digital Solutions</h1>
            </div>
          </div>

          <nav className="flex flex-wrap gap-2 text-sm text-zinc-300">
            <a href="#services" className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 hover:bg-white/10">Services</a>
            <a href="#offers" className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 hover:bg-white/10">Offers</a>
            <a href="#pricing" className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 hover:bg-white/10">Pricing</a>
            <a href="#booking" className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 hover:bg-white/10">Booking</a>
            <a href="#contact-form" className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 hover:bg-white/10">Contact</a>
          </nav>
        </header>

        <section className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="space-y-6">
            <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1 text-xs font-medium uppercase tracking-[0.25em] text-cyan-200">
              Official DAYIIIatchSolutions.com Home
            </div>

            <div className="space-y-4">
              <h2 className="max-w-4xl text-4xl font-black leading-tight md:text-6xl">
                Build trust first. Then move visitors into a real client pipeline.
              </h2>
              <p className="max-w-2xl text-base leading-7 text-zinc-300 md:text-lg">
                DAYIIIatch Solutions helps creators, businesses, and growing brands level up with websites, automation,
                AI-assisted workflows, branding support, and digital problem-solving. This site now routes people into a
                free strategy call, a premium session, or a direct project inquiry depending on what they need.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="https://calendly.com/dayiiiatchsolutions/free-15min-strategy-call"
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:scale-[1.02]"
              >
                Work With Us
              </a>
              <a
                href="https://calendly.com/dayiiiatchsolutions/deep-strategy-session-paid"
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-cyan-400/40 bg-cyan-400/10 px-5 py-3 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-400/20"
              >
                Book Premium Session
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
                  making it easy for clients to book, inquire, and move from interest to action.
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

        <section id="offers" className="mt-16">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-zinc-400">Featured Offers</p>
              <h3 className="text-3xl font-bold">Choose the right entry point</h3>
            </div>
            <p className="max-w-2xl text-sm leading-6 text-zinc-400">
              Start with a free call, move into a premium planning session, or send a direct inquiry for custom projects.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {featuredOffers.map((offer) => (
              <div key={offer.title} className="rounded-[1.6rem] border border-white/10 bg-white/5 p-5 transition hover:-translate-y-1 hover:bg-white/10">
                <h4 className="text-xl font-semibold">{offer.title}</h4>
                <p className="mt-3 text-sm leading-6 text-zinc-400">{offer.text}</p>
                <a
                  href={offer.href}
                  target={offer.href.startsWith("http") ? "_blank" : undefined}
                  rel={offer.href.startsWith("http") ? "noreferrer" : undefined}
                  className="mt-5 inline-flex rounded-2xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  {offer.cta}
                </a>
              </div>
            ))}
          </div>
        </section>

        <section id="services" className="mt-16">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-zinc-400">Services</p>
              <h3 className="text-3xl font-bold">Core offers</h3>
            </div>
            <p className="max-w-2xl text-sm leading-6 text-zinc-400">
              These blocks can keep expanding into pricing cards, portfolio proof, and platform-specific offers as the brand grows.
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

        <section id="pricing" className="mt-16">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-zinc-400">Starting Points</p>
              <h3 className="text-3xl font-bold">Simple packages and project paths</h3>
            </div>
            <p className="max-w-2xl text-sm leading-6 text-zinc-400">
              Use these as starter references while the business grows into more detailed service pricing.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {packages.map((pkg) => (
              <div key={pkg.title} className="rounded-[1.8rem] border border-white/10 bg-white/5 p-6">
                <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">{pkg.title}</p>
                <h4 className="mt-3 text-3xl font-black">{pkg.price}</h4>
                <p className="mt-3 text-sm leading-6 text-zinc-400">{pkg.text}</p>
                <div className="mt-5 space-y-3">
                  {pkg.items.map((item) => (
                    <div key={item} className="rounded-xl border border-white/10 bg-zinc-900/60 px-4 py-3 text-sm text-zinc-200">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <div className="mb-6">
            <p className="text-sm uppercase tracking-[0.25em] text-zinc-400">Trust & Proof</p>
            <h3 className="text-3xl font-bold">Space for testimonials and results</h3>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {testimonials.map((item, index) => (
              <div key={index} className="rounded-[1.8rem] border border-white/10 bg-white/5 p-6">
                <p className="text-sm leading-7 text-zinc-300">“{item.quote}”</p>
                <div className="mt-5 border-t border-white/10 pt-4">
                  <p className="font-semibold text-white">{item.name}</p>
                  <p className="text-sm text-zinc-500">{item.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="booking" className="mt-16">
          <div className="mb-6">
            <p className="text-sm uppercase tracking-[0.25em] text-zinc-400">Booking & Contact</p>
            <h3 className="text-3xl font-bold">Move visitors into action</h3>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {platforms.map((platform) => (
              <a
                key={platform.title}
                href={platform.href}
                target={platform.href.startsWith("http") ? "_blank" : undefined}
                rel={platform.href.startsWith("http") ? "noreferrer" : undefined}
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
            <p className="text-sm uppercase tracking-[0.25em] text-zinc-400">Why Choose DAYIIIatch Solutions</p>
            <h3 className="mt-2 text-3xl font-bold">Built for modern digital work</h3>
            <div className="mt-5 space-y-3">
              {whyChooseUs.map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-zinc-900/60 px-4 py-3 text-sm text-zinc-200">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-gradient-to-r from-violet-500/15 via-white/5 to-cyan-400/10 p-6">
            <p className="text-sm uppercase tracking-[0.25em] text-zinc-300">Frequently Asked Questions</p>
            <h3 className="mt-2 text-3xl font-bold">Quick answers for new visitors</h3>
            <div className="mt-5 space-y-3">
              {faqs.map((item) => (
                <div key={item.question} className="rounded-2xl border border-white/10 bg-zinc-950/40 p-4">
                  <p className="font-semibold text-white">{item.question}</p>
                  <p className="mt-2 text-sm leading-6 text-zinc-300">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact-form" className="mt-16 rounded-[2rem] border border-white/10 bg-white/5 p-8">
          <div className="mb-8 text-center">
            <p className="text-sm uppercase tracking-[0.25em] text-zinc-400">Contact</p>
            <h3 className="mt-2 text-4xl font-black">Send a direct project inquiry</h3>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-zinc-300">
              Use the form below for custom builds, collaborations, website requests, automation ideas, and digital support.
            </p>
          </div>

          <form
            action="https://formspree.io/f/mdayoagd"
            method="POST"
            className="mx-auto grid max-w-4xl gap-4 md:grid-cols-2"
          >
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-zinc-200">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full rounded-2xl border border-white/10 bg-zinc-900/70 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/50"
                placeholder="Your name"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-zinc-200">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full rounded-2xl border border-white/10 bg-zinc-900/70 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/50"
                placeholder="you@example.com"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label htmlFor="projectType" className="text-sm font-medium text-zinc-200">Project Type</label>
              <input
                id="projectType"
                name="project_type"
                type="text"
                className="w-full rounded-2xl border border-white/10 bg-zinc-900/70 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/50"
                placeholder="Website, automation, branding, AI workflow, tech support, etc."
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label htmlFor="message" className="text-sm font-medium text-zinc-200">Project Details</label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                className="w-full rounded-2xl border border-white/10 bg-zinc-900/70 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/50"
                placeholder="Tell DAYIIIatch Solutions what you need, what you're trying to build, and where you need help."
              />
            </div>

            <div className="md:col-span-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs leading-6 text-zinc-400">
                Prefer a call first? Book the free strategy call or jump straight into the premium planning session.
              </p>
              <button
                type="submit"
                className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:scale-[1.02]"
              >
                Send Project Inquiry
              </button>
            </div>
          </form>
        </section>

        <footer className="mt-16 border-t border-white/10 py-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="relative h-12 w-12 overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/70">
                <Image
                  src="/dayiiiatch-logo.png"
                  alt="DAYIIIatch Solutions logo"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-zinc-400">DAYIIIatch Solutions</p>
                <p className="mt-2 text-sm text-zinc-500">Creative systems, digital problem-solving, and client-ready service flow.</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 text-sm text-zinc-300">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 hover:bg-white/10"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
