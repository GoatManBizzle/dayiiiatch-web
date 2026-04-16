import { brand } from "@/config/brand";
import { navLinks } from "@/config/links";

export default function HeaderSection() {
  return (
    <header className="mb-10 flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl shadow-[0_0_40px_rgba(139,92,246,0.06)] md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-4">
        <div className="relative h-14 w-14 overflow-hidden rounded-2xl border border-cyan-400/30 bg-zinc-900/80 shadow-[0_0_20px_rgba(34,211,238,0.18)]">
          <img
            src="/dayiiiatch-logo.png"
            alt={`${brand.name} logo`}
            className="h-full w-full object-cover"
          />
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-violet-300">
            {brand.name}
          </p>
          <h2 className="mt-2 text-xl font-semibold md:text-2xl">
            {brand.tagline}
          </h2>
        </div>
      </div>

      <nav className="flex flex-wrap gap-2 text-sm text-zinc-300">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 transition hover:bg-white/10"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}