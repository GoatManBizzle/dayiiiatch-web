"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

export default function ReturnToTop() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const isDev = useMemo(() => process.env.NODE_ENV !== "production", []);

  useEffect(() => {
    if (pathname !== "/") return;

    function handleScroll() {
      setVisible(window.scrollY > 560);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  if (pathname !== "/") return null;

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={`fixed right-3 z-[840] inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-cyan-300/22 bg-zinc-950/78 px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-cyan-100 shadow-[0_0_28px_rgba(34,211,238,0.12)] backdrop-blur-2xl transition duration-300 hover:-translate-y-0.5 hover:border-cyan-300/40 hover:shadow-[0_0_34px_rgba(34,211,238,0.18)] focus:outline-none focus:ring-2 focus:ring-cyan-300/40 sm:right-5 sm:text-sm ${
        isDev ? "bottom-48 sm:bottom-24" : "bottom-24 sm:bottom-5"
      } ${
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-2 opacity-0"
      }`}
      aria-label="Return to top"
    >
      <span
        className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-cyan-300/25 bg-cyan-400/10 text-sm leading-none"
        data-arrow-slot="return-to-top"
        aria-hidden="true"
      >
        ↑
      </span>
      <span>Top</span>
    </button>
  );
}
