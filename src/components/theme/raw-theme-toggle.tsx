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

export default function RawThemeToggle() {
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

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      style={{
        position: "fixed",
        top: "72px",
        left: "16px",
        zIndex: 2147483647,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: "110px",
        height: "44px",
        padding: "0 14px",
        border: "2px solid #22d3ee",
        borderRadius: "8px",
        background: "#05070d",
        color: "#ffffff",
        boxShadow:
          "0 0 0 1px rgba(34, 211, 238, 0.35), 0 14px 32px rgba(0, 0, 0, 0.55), 0 0 24px rgba(34, 211, 238, 0.45)",
        fontSize: "14px",
        fontWeight: 800,
        lineHeight: 1,
        cursor: "pointer",
        opacity: 1,
        visibility: "visible",
        pointerEvents: "auto",
      }}
      data-raw-theme-toggle="true"
    >
      Theme: {theme === "dark" ? "Dark" : "Light"}
    </button>
  );
}
