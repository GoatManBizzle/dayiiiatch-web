"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

import { links } from "@/config/links";

const ctas = [
  {
    label: "Book Call",
    href: links.freeCall,
    tone: "bg-white text-zinc-950 border-white/25 hover:shadow-[0_0_26px_rgba(255,255,255,0.16)]",
  },
  {
    label: "Premium Session",
    href: links.premiumSession,
    tone: "bg-cyan-400/12 text-cyan-100 border-cyan-300/35 hover:shadow-[0_0_26px_rgba(34,211,238,0.18)]",
  },
  {
    label: "Contact",
    href: links.contactForm,
    tone: "bg-violet-500/12 text-violet-100 border-violet-300/30 hover:shadow-[0_0_26px_rgba(168,85,247,0.16)]",
  },
];

export default function StickyCTA() {
  const pathname = usePathname();
  const [contactVisible, setContactVisible] = useState(false);
  const isDev = useMemo(() => process.env.NODE_ENV !== "production", []);

  useEffect(() => {
    const contactSection = document.getElementById("contact-form");
    if (!contactSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setContactVisible(entry.isIntersecting);
      },
      {
        threshold: 0.18,
      },
    );

    observer.observe(contactSection);
    return () => observer.disconnect();
  }, []);

  if (pathname !== "/") return null;

  return (
    <div
      className={`fixed left-3 right-3 z-[850] mx-auto max-w-2xl transition-all duration-500 sm:left-1/2 sm:right-auto sm:w-auto sm:-translate-x-1/2 ${
        isDev ? "bottom-28 sm:bottom-5" : "bottom-3 sm:bottom-5"
      } ${
        contactVisible
          ? "pointer-events-none translate-y-3 opacity-15"
          : "translate-y-0 opacity-100"
      }`}
      aria-label="Quick booking actions"
    >
      <div className="animate-[statusFadeInUp_650ms_ease-out] rounded-[1.35rem] border border-cyan-300/18 bg-zinc-950/78 p-2 shadow-[0_0_38px_rgba(34,211,238,0.13)] backdrop-blur-2xl sm:rounded-full">
        <div className="grid grid-cols-3 gap-2 sm:flex sm:items-center">
          {ctas.map((cta) => (
            <a
              key={cta.label}
              href={cta.href}
              className={`inline-flex min-h-12 items-center justify-center rounded-2xl border px-3 py-3 text-center text-xs font-black transition duration-300 hover:-translate-y-0.5 active:scale-[0.98] sm:min-w-[126px] sm:rounded-full sm:px-5 sm:text-sm ${cta.tone}`}
            >
              {cta.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
