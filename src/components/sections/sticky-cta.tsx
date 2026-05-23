"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";

import { links } from "@/config/links";

const ctas = [
  {
    label: "Book Free Call",
    href: links.freeCall,
    tone: "bg-white text-zinc-950 border-white/25 shadow-[0_0_20px_rgba(255,255,255,0.10)] hover:bg-cyan-50 hover:shadow-[0_0_28px_rgba(255,255,255,0.18)]",
  },
  {
    label: "Premium Session",
    href: links.premiumSession,
    tone: "bg-cyan-400/12 text-cyan-100 border-cyan-300/35 hover:bg-cyan-400/18 hover:shadow-[0_0_24px_rgba(34,211,238,0.16)]",
  },
  {
    label: "Contact",
    href: links.contactForm,
    tone: "bg-white/[0.045] text-zinc-100 border-white/12 hover:border-violet-300/28 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(168,85,247,0.10)]",
  },
];

export default function StickyCTA() {
  const pathname = usePathname();
  const [contactVisible, setContactVisible] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
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

  return (
    <div
      className={`fixed left-3 right-3 z-[850] mx-auto max-w-2xl transition-all duration-500 sm:left-1/2 sm:right-auto sm:w-auto sm:-translate-x-1/2 ${
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
      <div className="animate-[statusFadeInUp_650ms_ease-out] rounded-[1.35rem] border border-cyan-300/18 bg-zinc-950/78 p-2 shadow-[0_0_38px_rgba(34,211,238,0.13)] backdrop-blur-2xl sm:rounded-[1.6rem]">
        <p className="hidden px-3 pb-1 text-center text-[10px] font-semibold uppercase tracking-[0.14em] text-cyan-200/75 sm:block">
          Limited onboarding capacity
        </p>
        <div className="grid grid-cols-3 gap-2 sm:flex sm:items-center">
          {ctas.map((cta) => (
            <a
              key={cta.label}
              href={cta.href}
              className={`inline-flex min-h-12 items-center justify-center rounded-2xl border px-3 py-3 text-center text-[11px] font-black transition duration-500 ease-out hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-cyan-300/30 active:scale-[0.98] sm:min-w-[126px] sm:rounded-full sm:px-5 sm:text-sm ${cta.tone}`}
            >
              {cta.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
