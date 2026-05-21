import { navLinks } from "@/config/links";

export default function HeaderSection() {
  return (
    <header className="relative z-20 mb-7 mt-4 flex justify-center">
      <nav className="flex w-full max-w-5xl flex-wrap items-center justify-center gap-2 rounded-[1.5rem] border border-white/10 bg-zinc-950/70 px-2.5 py-2 shadow-[0_0_36px_rgba(34,211,238,0.12)] backdrop-blur-xl sm:w-auto sm:rounded-full sm:px-3">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="min-h-10 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-[11px] font-bold uppercase tracking-[0.1em] text-zinc-200 transition hover:border-cyan-400/35 hover:bg-cyan-400/10 hover:text-cyan-100 sm:px-4 sm:text-xs sm:tracking-[0.16em]"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
