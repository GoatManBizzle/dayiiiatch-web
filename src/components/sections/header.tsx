"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

import { navLinks } from "@/config/links";

const sectionIds = navLinks
  .map((link) => link.href.split("#")[1] ?? "")
  .filter(Boolean);

export default function HeaderSection() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? "");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 48);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        const visibleId = visibleEntries[0]?.target.id;

        if (visibleId) {
          setActiveSection(visibleId);
        }
      },
      {
        rootMargin: "-28% 0px -54% 0px",
        threshold: [0.08, 0.18, 0.32, 0.5],
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  function handleAnchorClick(
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) {
    const hash = href.split("#")[1];
    if (!hash || pathname !== "/") return;

    const target = document.getElementById(hash);
    if (!target) return;

    event.preventDefault();
    setActiveSection(target.id);
    target.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
    window.history.pushState(null, "", `#${hash}`);
  }

  return (
    <nav
      data-style-section="nav"
      className={`home-hero-nav relative z-[var(--z-nav)] mx-auto mb-0 mt-4 flex w-full max-w-5xl flex-wrap items-center justify-center gap-1.5 rounded-[1.35rem] border px-2 py-2 backdrop-blur-xl transition-all duration-300 ease-out sm:w-auto sm:rounded-full sm:gap-2 ${
        scrolled
          ? "border-cyan-300/22 bg-zinc-950/88 shadow-[0_10px_36px_rgba(0,0,0,0.28),0_0_28px_rgba(34,211,238,0.15)] sm:px-2.5 sm:py-1.5"
          : "border-white/10 bg-zinc-950/70 shadow-[0_0_36px_rgba(34,211,238,0.12)] sm:px-3 sm:py-2"
      }`}
      aria-label="Primary homepage navigation"
    >
      {navLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          onClick={(event) => handleAnchorClick(event, link.href)}
          className={`inline-flex min-h-10 flex-1 items-center justify-center rounded-full border px-2.5 py-2 text-center text-[10px] font-bold uppercase tracking-[0.08em] transition duration-300 hover:border-cyan-400/35 hover:bg-cyan-400/10 hover:text-cyan-100 sm:flex-none sm:px-4 sm:text-xs sm:tracking-[0.16em] ${
            link.href.includes("#") && activeSection === link.href.split("#")[1]
              ? "border-cyan-300/45 bg-cyan-400/14 text-cyan-100 shadow-[0_0_22px_rgba(34,211,238,0.14)]"
              : "border-white/10 bg-white/[0.04] text-zinc-200"
          } ${scrolled ? "sm:min-h-9 sm:px-3" : ""}`}
          aria-current={
            link.href.includes("#") && activeSection === link.href.split("#")[1]
              ? "true"
              : undefined
          }
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
}
