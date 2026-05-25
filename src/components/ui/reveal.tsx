"use client";

import { useEffect, useRef, useState } from "react";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
};

export default function Reveal({
  children,
  className = "",
  delayMs = 0,
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const delayRef = useRef<number | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (delayRef.current) {
            window.clearTimeout(delayRef.current);
            delayRef.current = null;
          }

          if (entry.isIntersecting) {
            delayRef.current = window.setTimeout(() => {
              setVisible(true);
            }, delayMs);
          } else {
            setVisible(false);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      if (delayRef.current) {
        window.clearTimeout(delayRef.current);
      }
    };
  }, [delayMs]);

  return (
    <div
      ref={ref}
      data-reveal
      className={`transition-all duration-700 ease-out will-change-transform motion-reduce:translate-y-0 motion-reduce:scale-100 motion-reduce:opacity-100 motion-reduce:blur-0 motion-reduce:transition-none ${
        visible
          ? "translate-y-0 scale-100 opacity-100 blur-0"
          : "translate-y-2 scale-[0.985] opacity-0 blur-[1px] sm:translate-y-3 sm:scale-[0.98]"
      } ${className}`}
    >
      {children}
    </div>
  );
}
