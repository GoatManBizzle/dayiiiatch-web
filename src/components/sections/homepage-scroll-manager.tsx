"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function HomepageScrollManager() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") return;

    const previousRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    if (!window.location.hash) {
      window.requestAnimationFrame(() => window.scrollTo(0, 0));
    }

    return () => {
      window.history.scrollRestoration = previousRestoration;
    };
  }, [pathname]);

  return null;
}
