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
      className={`promo-floating fixed right-3 z-[85] inline-flex min-h-10 items-center justify-center gap-1.5 rounded-full border border-cyan-300/22 bg-zinc-950/78 px-3 py-2 text-[11px] font-black uppercase tracking-[0.1em] text-cyan-100 shadow-[0_0_28px_rgba(34,211,238,0.12)] backdrop-blur-2xl transition duration-300 hover:-translate-y-0.5 hover:border-cyan-300/40 hover:shadow-[0_0_34px_rgba(34,211,238,0.18)] focus:outline-none focus:ring-2 focus:ring-cyan-300/40 sm:right-5 sm:min-h-11 sm:gap-2 sm:px-4 sm:text-sm ${
        isDev ? "bottom-44 sm:bottom-24" : "bottom-20 sm:bottom-5"
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
      <span className="hidden min-[390px]:inline">Top</span>
    </button>
  );
}
