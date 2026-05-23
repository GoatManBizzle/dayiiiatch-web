"use client";

import { ReactNode, useRef } from "react";

type MagneticProps = {
  children: ReactNode;
  className?: string;
  strength?: number;
  scale?: number;
  as?: "span" | "div";
};

function canUseMagnet() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches
  );
}

export default function Magnetic({
  children,
  className = "",
  strength = 0.12,
  scale = 1.006,
  as = "span",
}: MagneticProps) {
  const ref = useRef<HTMLElement | null>(null);

  function handlePointerMove(event: React.PointerEvent<HTMLElement>) {
    if (!canUseMagnet() || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) * strength;
    const y = (event.clientY - rect.top - rect.height / 2) * strength;

    ref.current.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
  }

  function handlePointerLeave() {
    if (!ref.current) return;
    ref.current.style.transform = "translate3d(0, 0, 0) scale(1)";
  }

  const sharedClassName = `will-change-transform transition-transform duration-300 ease-out ${className}`;

  if (as === "div") {
    return (
      <div
        ref={(node) => {
          ref.current = node;
        }}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className={sharedClassName}
      >
        {children}
      </div>
    );
  }

  return (
    <span
      ref={(node) => {
        ref.current = node;
      }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={sharedClassName}
    >
      {children}
    </span>
  );
}
