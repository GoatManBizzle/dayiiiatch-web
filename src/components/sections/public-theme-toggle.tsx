"use client";

import { useEffect, useState } from "react";

type PublicTheme = "dark" | "light";

const storageKey = "dayiiiatch_public_theme";

function applyTheme(theme: PublicTheme) {
  document.documentElement.classList.remove(
    "public-theme-dark",
    "public-theme-light",
  );
  document.documentElement.classList.add(`public-theme-${theme}`);
  document.documentElement.style.colorScheme = theme;
}

export default function PublicThemeToggle() {
  const [theme, setTheme] = useState<PublicTheme>("dark");

  useEffect(() => {
    const saved =
      window.localStorage.getItem(storageKey) === "light" ? "light" : "dark";
    setTheme(saved);
    applyTheme(saved);
  }, []);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    window.localStorage.setItem(storageKey, next);
    applyTheme(next);
  }

  const isLight = theme === "light";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isLight ? "dark" : "light"} mode`}
      style={{
        position: "fixed",
        top: "16px",
        left: "16px",
        zIndex: 2147483647,
        display: "flex",
        visibility: "visible",
        opacity: 1,
        pointerEvents: "auto",
        minWidth: "92px",
        height: "42px",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        background: isLight
          ? "rgba(255, 255, 255, 0.94)"
          : "rgba(8, 12, 24, 0.94)",
        color: isLight ? "#075985" : "#cffafe",
        border: "1px solid rgba(34, 211, 238, 0.42)",
        boxShadow: "0 14px 38px rgba(0, 0, 0, 0.24)",
      }}
      data-theme-toggle-mounted="true"
      className="public-theme-toggle rounded-full px-3 py-2 text-[11px] font-black uppercase tracking-[0.12em] backdrop-blur-2xl transition duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-cyan-300/40"
    >
      <span
        className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-cyan-300/25 bg-cyan-400/10 text-[9px]"
        aria-hidden="true"
      >
        {isLight ? "Sun" : "Moon"}
      </span>
      <span>Theme {isLight ? "Light" : "Dark"}</span>
    </button>
  );
}
