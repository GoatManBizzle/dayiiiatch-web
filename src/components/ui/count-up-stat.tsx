"use client";

import { useEffect, useMemo, useState } from "react";

type CountUpStatProps = {
  value: string;
  label: string;
};

function isNumericValue(value: string) {
  return /^\d+$/.test(value);
}

export default function CountUpStat({ value, label }: CountUpStatProps) {
  const numeric = useMemo(() => (isNumericValue(value) ? Number(value) : null), [value]);
  const [display, setDisplay] = useState(numeric ? 0 : value);

  useEffect(() => {
    if (numeric === null) {
      setDisplay(value);
      return;
    }

    let current = 0;
    const duration = 900;
    const stepTime = 30;
    const increment = Math.max(1, Math.ceil(numeric / (duration / stepTime)));

    const timer = window.setInterval(() => {
      current += increment;

      if (current >= numeric) {
        setDisplay(String(numeric));
        window.clearInterval(timer);
      } else {
        setDisplay(String(current));
      }
    }, stepTime);

    return () => window.clearInterval(timer);
  }, [numeric, value]);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-center shadow-lg shadow-violet-500/5 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/20">
      <p className="text-lg font-black text-white md:text-2xl">{display}</p>
      <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-zinc-400 md:text-xs">
        {label}
      </p>
    </div>
  );
}