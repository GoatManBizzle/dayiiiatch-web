import { brand } from "@/config/brand";
import { footerLinks } from "@/config/links";

export default function FooterSection() {
  return (
    <footer className="mt-16 border-t border-white/10 py-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <div className="relative h-12 w-12 overflow-hidden rounded-2xl border border-cyan-400/20 bg-zinc-900/70 shadow-[0_0_20px_rgba(34,211,238,0.12)]">
            <img
              src="/dayiiiatch-logo.png"
              alt={`${brand.name} logo`}
              className="h-full w-full object-cover"
            />
          </div>

          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-zinc-400">
              {brand.name}
            </p>
            <p className="mt-2 text-sm text-zinc-500">{brand.footerText}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 text-sm text-zinc-300">
          {footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noreferrer" : undefined}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 transition hover:bg-white/10"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}