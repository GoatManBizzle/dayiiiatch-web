import { brand } from "@/config/brand";
import { footerLinks } from "@/config/links";

export default function FooterSection() {
  return (
    <footer
      data-style-section="footer"
      className="style-editor-footer relative mt-10 border-t border-white/10 py-7 md:mt-16 md:py-8"
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:text-left">
          <div className="relative h-12 w-12 overflow-hidden rounded-2xl border border-cyan-400/20 bg-zinc-900/70 shadow-[0_0_20px_rgba(34,211,238,0.12)]">
            <img
              src="/dayiiiatch-logo.png"
              alt={`${brand.name} logo`}
              className="h-full w-full object-cover"
            />
          </div>

          <div>
            <p className="style-editor-footer-text text-sm uppercase tracking-[0.25em] text-zinc-400">
              {brand.name}
            </p>
            <p className="style-editor-footer-text mt-2 text-sm text-zinc-500">{brand.footerText}</p>
          </div>
        </div>

        <div className="style-editor-footer-links flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-sm text-zinc-300 md:justify-end">
          {footerLinks.map((link, index) => (
            <span key={link.label} className="inline-flex items-center gap-2">
              {index > 0 ? <span className="text-zinc-600">|</span> : null}
              <a
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noreferrer" : undefined}
                className="style-editor-footer-link transition hover:text-cyan-100"
              >
                {link.label}
              </a>
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
