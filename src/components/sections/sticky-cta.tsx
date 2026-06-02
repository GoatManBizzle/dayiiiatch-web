"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";

import { links } from "@/config/links";
import { normalizeLeadSource, type LeadSource } from "@/lib/growth-ops";

const ctas = [
  {
    label: "Book Free Call",
    shortLabel: "Free Call",
    href: links.freeCall,
    tone: "bg-white text-zinc-950 border-white/25 shadow-[0_0_20px_rgba(255,255,255,0.10)] hover:bg-cyan-50 hover:shadow-[0_0_28px_rgba(255,255,255,0.18)]",
  },
  {
    label: "Premium Session",
    shortLabel: "Premium",
    href: links.premiumSession,
    tone: "bg-cyan-400/12 text-cyan-100 border-cyan-300/35 hover:bg-cyan-400/18 hover:shadow-[0_0_24px_rgba(34,211,238,0.16)]",
  },
  {
    label: "Contact",
    shortLabel: "Contact",
    href: links.contactForm,
    tone: "bg-white/[0.045] text-zinc-100 border-white/12 hover:border-violet-300/28 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(168,85,247,0.10)]",
  },
];

export default function StickyCTA() {
  const pathname = usePathname();
  const [contactVisible, setContactVisible] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [leadSource] = useState<LeadSource>(() => {
    if (typeof window === "undefined") return "Direct";
    return normalizeLeadSource(
      new URLSearchParams(window.location.search).get("source"),
    );
  });
  const scrollTimeoutRef = useRef<number | null>(null);
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

  useEffect(() => {
    if (pathname !== "/") return;

    function handleScroll() {
      setIsScrolling(true);

      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = window.setTimeout(() => {
        setIsScrolling(false);
      }, 650);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [pathname]);

  if (pathname !== "/") return null;

  function withSource(href: string) {
    if (href.startsWith("#")) return href;
    const separator = href.includes("?") ? "&" : "?";
    return `${href}${separator}source=${encodeURIComponent(leadSource)}`;
  }

  return (
    <div
      data-style-section="sticky-cta"
      className={`promo-floating fixed left-2.5 right-2.5 z-[80] mx-auto max-w-2xl transition-all duration-500 sm:left-1/2 sm:right-auto sm:w-auto sm:-translate-x-1/2 ${
        isDev ? "bottom-28 sm:bottom-5" : "bottom-3 sm:bottom-5"
      } ${
        contactVisible
          ? "pointer-events-none translate-y-3 opacity-15"
          : isScrolling
            ? "pointer-events-none translate-y-4 opacity-0"
          : "translate-y-0 opacity-100"
      }`}
      aria-label="Quick booking actions"
    >
      <div className="animate-[statusFadeInUp_650ms_ease-out] rounded-[1.15rem] border border-cyan-300/18 bg-zinc-950/82 p-1.5 shadow-[0_0_38px_rgba(34,211,238,0.13)] backdrop-blur-2xl sm:rounded-[1.6rem] sm:p-2">
        <p className="hidden px-3 pb-1 text-center text-[10px] font-semibold uppercase tracking-[0.14em] text-cyan-200/75 sm:block">
          Limited onboarding capacity
        </p>
        <div className="grid grid-cols-3 gap-1.5 sm:flex sm:items-center sm:gap-2">
          {ctas.map((cta) => (
            <a
              key={cta.label}
              href={withSource(cta.href)}
              data-growth-source={leadSource}
              data-growth-event="sticky-cta-click"
              data-cta-type={cta.label.toLowerCase().replaceAll(" ", "-")}
              className={`inline-flex min-h-11 items-center justify-center rounded-[1rem] border px-2 py-2.5 text-center text-[10px] font-black transition duration-500 ease-out hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-cyan-300/30 active:scale-[0.97] sm:min-h-12 sm:min-w-[126px] sm:rounded-full sm:px-5 sm:py-3 sm:text-sm ${cta.tone}`}
            >
              <span className="sm:hidden">{cta.shortLabel}</span>
              <span className="hidden sm:inline">{cta.label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
