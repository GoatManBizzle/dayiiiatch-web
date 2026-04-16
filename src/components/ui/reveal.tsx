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
  className={`transition-all duration-700 ease-out will-change-transform ${
    visible
      ? "translate-y-0 opacity-100 blur-0"
      : "translate-y-3 opacity-0 blur-[1px]"
  } ${className}`}
>
  {children}
</div>
  );
}