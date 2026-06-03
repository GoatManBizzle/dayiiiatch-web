"use client";

import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";

import {
  buildDevThemeExport,
  parseDevThemeJson,
  type DevThemeExport,
} from "@/lib/dev-theme-export";
import { defaultThemePreset, devThemePresets } from "@/lib/dev-theme-presets";

type ControlType = "range" | "color" | "text" | "select";

type StyleControl = {
  label: string;
  variable: string;
  type: ControlType;
  defaultValue: string;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  options?: string[];
};

type StyleSection = {
  id: string;
  label: string;
  controls: StyleControl[];
};

type StyleOverrides = Record<string, string>;
type CustomTheme = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  variables: StyleOverrides;
  scopes?: Record<string, { variables?: StyleOverrides }>;
};

const DEBUG_OUTLINES = false;
const storageKey = "dayiiiatch_style_editor_overrides";
const customThemesKey = "dayiiiatch_custom_themes";
const activeThemeKey = "dayiiiatch_active_theme";
const knownBackgroundImages = [
  "/bg-main.png",
  "/images/bg-main.png",
  "/images/hero-bg.png",
  "/images/section-bg.png",
];
const retiredVariables = [
  "--ds-banner-width",
  "--ds-banner-height",
  "--ds-banner-padding-top",
  "--ds-banner-padding-bottom",
  "--ds-banner-margin-top",
  "--ds-banner-margin-bottom",
  "--ds-banner-radius",
  "--ds-banner-border-color",
  "--ds-banner-overlay-opacity",
  "--ds-banner-object-fit",
  "--ds-banner-object-position-y",
  "--ds-banner-min-height",
  "--ds-header-wrapper-width",
  "--ds-header-wrapper-max-width",
  "--ds-header-wrapper-height",
  "--ds-header-wrapper-min-height",
  "--ds-header-wrapper-margin-top",
  "--ds-header-wrapper-margin-bottom",
  "--ds-header-wrapper-padding-top",
  "--ds-header-wrapper-padding-bottom",
  "--ds-header-wrapper-padding-left",
  "--ds-header-wrapper-padding-right",
  "--ds-header-wrapper-border-width",
  "--ds-header-wrapper-border-color",
  "--ds-header-wrapper-radius",
  "--ds-header-wrapper-bg",
  "--ds-header-wrapper-overflow",
  "--ds-header-wrapper-display",
  "--ds-header-media-width",
  "--ds-header-media-height",
  "--ds-header-media-margin-top",
  "--ds-header-media-margin-bottom",
  "--ds-header-media-object-fit",
  "--ds-header-media-object-position-x",
  "--ds-header-media-object-position-y",
  "--ds-header-media-scale",
  "--ds-header-media-opacity",
  "--ds-header-media-radius",
  "--ds-header-media-repeat",
  "--ds-header-media-size-mode",
  "--ds-about-max-width",
  "--ds-about-padding",
  "--ds-about-heading",
  "--ds-about-body",
  "--ds-about-card-bg",
  "--ds-about-radius",
  "--ds-proof-card-gap",
  "--ds-card-radius",
  "--ds-proof-card-bg",
  "--ds-proof-card-border",
  "--ds-proof-glow-strength",
  "--ds-service-card-gap",
  "--ds-service-card-radius",
  "--ds-service-card-bg",
  "--ds-service-card-border",
  "--ds-service-button-radius",
  "--ds-footer-padding",
  "--ds-footer-text",
  "--ds-footer-link",
  "--ds-footer-link-gap",
];

const sections: StyleSection[] = [
  {
    id: "global",
    label: "Global Page",
    controls: [
      range("Page max width", "--ds-page-max-width", "1280px", 960, 1680, 10, "px"),
      range("Section gap", "--ds-section-gap", "48px", 8, 140, 1, "px"),
      text("Page background image path", "--ds-bg-image", "/bg-main.png"),
      range("Background overlay opacity", "--ds-bg-overlay-opacity", "0", 0, 0.95, 0.01),
      color("Global accent color", "--ds-accent", "#22d3ee"),
    ],
  },
  {
    id: "banner",
    label: "Banner",
    controls: [
      text("Banner width", "--ds-home-hero-width", "min(90rem, calc(100vw - 0.35rem))"),
      range("Banner height", "--ds-home-hero-height", "360px", 180, 640, 1, "px"),
      select("Media object fit", "--ds-home-hero-object-fit", "cover", [
        "cover",
        "contain",
        "fill",
        "none",
        "scale-down",
      ]),
      select("Media object position X", "--ds-home-hero-object-position-x", "center", [
        "left",
        "center",
        "right",
      ]),
      select("Media object position Y", "--ds-home-hero-object-position-y", "center", [
        "top",
        "center",
        "bottom",
      ]),
    ],
  },
  {
    id: "nav",
    label: "Navigation",
    controls: [
      range("Nav gap", "--ds-nav-gap", "8px", 0, 36, 1, "px"),
    ],
  },
  {
    id: "about",
    label: "About Section",
    controls: [
      range("About section max width", "--ds-v11-about-max-width", "1280px", 720, 1500, 10, "px"),
      range("About section padding", "--ds-v11-about-padding", "32px", 8, 96, 1, "px"),
      color("About heading color", "--ds-v11-about-heading", "#ffffff"),
      color("About body text color", "--ds-v11-about-body", "#cbd5e1"),
      color("About card/background color", "--ds-v11-about-card-bg", "#071220"),
      range("About border radius", "--ds-v11-about-radius", "32px", 0, 80, 1, "px"),
    ],
  },
  {
    id: "proof",
    label: "Proof Systems",
    controls: [
      range("Proof card gap", "--ds-v11-proof-card-gap", "16px", 0, 56, 1, "px"),
      range("Proof card radius", "--ds-v11-proof-card-radius", "28px", 0, 64, 1, "px"),
      color("Proof card background color", "--ds-v11-proof-card-bg", "#071220"),
      color("Proof card border color", "--ds-v11-proof-card-border", "#22d3ee"),
      range("Proof glow strength", "--ds-v11-proof-glow-strength", "44px", 0, 100, 1, "px"),
    ],
  },
  {
    id: "commercial",
    label: "Services / Offers",
    controls: [
      range("Service card gap", "--ds-v11-service-card-gap", "16px", 0, 56, 1, "px"),
      range("Service card radius", "--ds-v11-service-card-radius", "24px", 0, 64, 1, "px"),
      color("Service card background color", "--ds-v11-service-card-bg", "#071220"),
      color("Service card border color", "--ds-v11-service-card-border", "#22d3ee"),
      range("Service button radius", "--ds-v11-service-button-radius", "16px", 0, 64, 1, "px"),
    ],
  },
  {
    id: "sticky-cta",
    label: "Sticky CTA",
    controls: [
      range("Dock bottom offset", "--ds-sticky-cta-bottom", "20px", 0, 160, 1, "px"),
    ],
  },
  {
    id: "footer",
    label: "Footer",
    controls: [
      range("Footer padding", "--ds-v11-footer-padding", "32px", 8, 96, 1, "px"),
      color("Footer text color", "--ds-v11-footer-text", "#94a3b8"),
      color("Footer link color", "--ds-v11-footer-link", "#cbd5e1"),
      range("Footer link gap", "--ds-v11-footer-link-gap", "8px", 0, 32, 1, "px"),
    ],
  },
];

function range(
  label: string,
  variable: string,
  defaultValue: string,
  min: number,
  max: number,
  step: number,
  unit?: string,
): StyleControl {
  return { label, variable, type: "range", defaultValue, min, max, step, unit };
}

function color(label: string, variable: string, defaultValue: string): StyleControl {
  return { label, variable, type: "color", defaultValue };
}

function text(label: string, variable: string, defaultValue: string): StyleControl {
  return { label, variable, type: "text", defaultValue };
}

function select(
  label: string,
  variable: string,
  defaultValue: string,
  options: string[],
): StyleControl {
  return { label, variable, type: "select", defaultValue, options };
}

function isLocalhost() {
  if (typeof window === "undefined") return false;

  return (
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1" ||
    window.location.hostname === "::1"
  );
}

function getAllControls() {
  return sections.flatMap((section) => section.controls);
}

function getEditableVariableSet() {
  return new Set(getAllControls().map((control) => control.variable));
}

function filterKnownOverrides(overrides: StyleOverrides) {
  const editableVariables = getEditableVariableSet();

  return Object.fromEntries(
    Object.entries(overrides).filter(([variable, value]) => {
      return editableVariables.has(variable) && typeof value === "string" && Boolean(value);
    }),
  );
}

function loadOverrides(): StyleOverrides {
  try {
    const saved = window.localStorage.getItem(storageKey);
    return saved ? filterKnownOverrides(JSON.parse(saved) as StyleOverrides) : {};
  } catch {
    return {};
  }
}

function cssValue(variable: string, value: string) {
  if (variable === "--ds-bg-image" && value && !value.startsWith("url(")) {
    return `url("${value}")`;
  }

  return value;
}

function applyOverrides(overrides: StyleOverrides) {
  const root = document.documentElement;
  const knownOverrides = filterKnownOverrides(overrides);

  for (const control of getAllControls()) {
    root.style.removeProperty(control.variable);
  }

  for (const variable of retiredVariables) {
    root.style.removeProperty(variable);
  }

  for (const [variable, value] of Object.entries(knownOverrides)) {
    if (value) {
      root.style.setProperty(variable, cssValue(variable, value));
    }
  }
}

function numericValue(value: string) {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatRangeValue(value: string, control: StyleControl) {
  return control.unit ? `${value}${control.unit}` : value;
}

function buildCssOutput(overrides: StyleOverrides) {
  const entries = Object.entries(filterKnownOverrides(overrides));

  if (!entries.length) return ":root {\n  /* No style overrides yet. */\n}";

  return [
    ":root {",
    ...entries.map(
      ([variable, value]) => `  ${variable}: ${cssValue(variable, value)};`,
    ),
    "}",
  ].join("\n");
}

function buildThemeJson(themeName: string, overrides: StyleOverrides) {
  return buildDevThemeExport(themeName, filterKnownOverrides(overrides));
}

function createThemeId() {
  return `theme-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function formatDate(value: string) {
  try {
    return new Intl.DateTimeFormat(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(value));
  } catch {
    return value;
  }
}

function sanitizeFilename(value: string) {
  return value.trim().replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "") || "theme";
}

function themeVariables(theme: CustomTheme) {
  return filterKnownOverrides(
    theme.variables ??
      theme.scopes?.["public.homepage"]?.variables ??
      {},
  );
}

function buildEffectiveVariables(overrides: StyleOverrides) {
  const knownOverrides = filterKnownOverrides(overrides);

  return Object.fromEntries(
    getAllControls().map((control) => [
      control.variable,
      knownOverrides[control.variable] ?? control.defaultValue,
    ]),
  );
}

function loadCustomThemes(): CustomTheme[] {
  try {
    const saved = window.localStorage.getItem(customThemesKey);
    const parsed = saved ? (JSON.parse(saved) as CustomTheme[]) : [];
    return Array.isArray(parsed)
      ? parsed
          .filter((theme) => theme.id && theme.name)
          .map((theme) => ({
            ...theme,
            variables: themeVariables(theme),
          }))
      : [];
  } catch {
    return [];
  }
}

function saveCustomThemes(themes: CustomTheme[]) {
  window.localStorage.setItem(customThemesKey, JSON.stringify(themes));
}

function buildSavedThemeJson(theme: CustomTheme): DevThemeExport {
  return {
    id: theme.id,
    name: theme.name,
    themeName: theme.name,
    createdAt: theme.createdAt,
    updatedAt: theme.updatedAt,
    variables: themeVariables(theme),
  };
}

export default function StyleEditor() {
  const pathname = usePathname();
  const isHomepage = pathname === "/";
  const [canRender, setCanRender] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState(sections[0].id);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [overrides, setOverrides] = useState<StyleOverrides>({});
  const [browseTarget, setBrowseTarget] = useState<string | null>(null);
  const [activePreset, setActivePreset] = useState(defaultThemePreset.name);
  const [themeCopied, setThemeCopied] = useState(false);
  const [themeMessage, setThemeMessage] = useState("");
  const [importOpen, setImportOpen] = useState(false);
  const [importText, setImportText] = useState("");
  const [themeToolsOpen, setThemeToolsOpen] = useState(false);
  const [customThemes, setCustomThemes] = useState<CustomTheme[]>([]);
  const [deleteTarget, setDeleteTarget] = useState<CustomTheme | null>(null);

  const activeSection = useMemo(
    () => sections.find((section) => section.id === activeSectionId) ?? sections[0],
    [activeSectionId],
  );

  useEffect(() => {
    const allowed = isLocalhost();
    setCanRender(allowed);

    if (allowed && isHomepage) {
      const savedOverrides = loadOverrides();
      const savedActiveTheme = window.localStorage.getItem(activeThemeKey);
      setCustomThemes(loadCustomThemes());
      setOverrides(savedOverrides);
      if (savedActiveTheme) {
        setActivePreset(savedActiveTheme);
      }
      applyOverrides(savedOverrides);
    }
  }, [isHomepage]);

  useEffect(() => {
    if (!canRender || !isHomepage) return;

    applyOverrides(overrides);
    window.localStorage.setItem(storageKey, JSON.stringify(overrides));
  }, [canRender, isHomepage, overrides]);

  if (!canRender) return null;
  if (!isHomepage) return null;

  function updateOverride(variable: string, value: string) {
    setOverrides((current) => ({
      ...current,
      [variable]: value,
    }));
    setSaved(false);
    setActivePreset("Custom");
    window.localStorage.setItem(activeThemeKey, "Custom");
  }

  function applyThemeVariables(
    variables: StyleOverrides,
    options?: { presetName?: string; message?: string },
  ) {
    const next = filterKnownOverrides(variables);
    setOverrides(next);
    applyOverrides(next);
    window.localStorage.setItem(storageKey, JSON.stringify(next));
    setActivePreset(options?.presetName ?? "Custom");
    window.localStorage.setItem(activeThemeKey, options?.presetName ?? "Custom");
    setSaved(false);
    setThemeMessage(options?.message ?? "");
  }

  function persistCustomThemes(nextThemes: CustomTheme[]) {
    setCustomThemes(nextThemes);
    saveCustomThemes(nextThemes);
  }

  function saveCurrentTheme() {
    const name = window.prompt(
      "Theme Name",
      activePreset === "Custom" ? "Goat Neon" : `${activePreset} Custom`,
    );
    if (!name?.trim()) return;

    const now = new Date().toISOString();
    const theme: CustomTheme = {
      id: createThemeId(),
      name: name.trim(),
      createdAt: now,
      updatedAt: now,
      variables: buildEffectiveVariables(overrides),
    };
    persistCustomThemes([theme, ...customThemes]);
    setActivePreset(theme.name);
    window.localStorage.setItem(activeThemeKey, theme.name);
    setThemeMessage(`Saved ${theme.name}.`);
  }

  function applyCustomTheme(theme: CustomTheme) {
    applyThemeVariables(themeVariables(theme), {
      presetName: theme.name,
      message: `Applied ${theme.name}.`,
    });
  }

  function renameCustomTheme(theme: CustomTheme) {
    const name = window.prompt("New Theme Name", theme.name);
    if (!name?.trim()) return;

    const nextThemes = customThemes.map((item) =>
      item.id === theme.id
        ? { ...item, name: name.trim(), updatedAt: new Date().toISOString() }
        : item,
    );
    persistCustomThemes(nextThemes);
    if (activePreset === theme.name) {
      setActivePreset(name.trim());
      window.localStorage.setItem(activeThemeKey, name.trim());
    }
    setThemeMessage(`Renamed ${theme.name}.`);
  }

  function duplicateCustomTheme(theme: CustomTheme) {
    const now = new Date().toISOString();
    const copy: CustomTheme = {
      ...theme,
      id: createThemeId(),
      name: `${theme.name} Copy`,
      createdAt: now,
      updatedAt: now,
      variables: themeVariables(theme),
    };
    persistCustomThemes([copy, ...customThemes]);
    setThemeMessage(`Duplicated ${theme.name}.`);
  }

  function deleteCustomTheme(theme: CustomTheme) {
    persistCustomThemes(customThemes.filter((item) => item.id !== theme.id));
    if (activePreset === theme.name) {
      applyThemeVariables(defaultThemePreset.variables, {
        presetName: defaultThemePreset.name,
        message: `Deleted ${theme.name}. Reset to ${defaultThemePreset.name}.`,
      });
    } else {
      setThemeMessage(`Deleted ${theme.name}.`);
    }
  }

  function confirmDeleteCustomTheme() {
    if (!deleteTarget) return;

    deleteCustomTheme(deleteTarget);
    setDeleteTarget(null);
  }

  function exportThemeJson(themeName: string, theme: DevThemeExport) {
    const blob = new Blob([JSON.stringify(theme, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${sanitizeFilename(themeName)}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  function exportSavedThemeFile(theme: CustomTheme) {
    exportThemeJson(theme.name, buildSavedThemeJson(theme));
  }

  function savePreview() {
    window.localStorage.setItem(storageKey, JSON.stringify(overrides));
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1400);
  }

  function resetCurrentSection() {
    setOverrides((current) => {
      const next = { ...current };
      for (const control of activeSection.controls) {
        delete next[control.variable];
      }
      return next;
    });
  }

  function resetAll() {
    applyThemeVariables(defaultThemePreset.variables, {
      presetName: defaultThemePreset.name,
      message: `Reset to ${defaultThemePreset.name}.`,
    });
  }

  async function copyCssVariables() {
    await window.navigator.clipboard.writeText(buildCssOutput(overrides));
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  function currentThemeExport() {
    return buildThemeJson(activePreset || "Custom Theme", buildEffectiveVariables(overrides));
  }

  function exportTheme() {
    exportThemeJson(activePreset || "dayiiiatch-theme-export", currentThemeExport());
    setThemeMessage("Theme export downloaded.");
  }

  async function copyThemeJson() {
    await window.navigator.clipboard.writeText(JSON.stringify(currentThemeExport(), null, 2));
    setThemeCopied(true);
    setThemeMessage("Theme JSON copied.");
    window.setTimeout(() => setThemeCopied(false), 1400);
  }

  function importTheme(theme: DevThemeExport) {
    const now = new Date().toISOString();
    const importedVariables = filterKnownOverrides(
      Object.keys(theme.variables).length
        ? theme.variables
        : (theme.scopes?.["public.homepage"]?.variables ?? {}),
    );
    const customTheme: CustomTheme = {
      id: createThemeId(),
      name: theme.name || theme.themeName || "Imported Theme",
      createdAt: theme.createdAt || now,
      updatedAt: theme.updatedAt || now,
      variables: importedVariables,
    };
    persistCustomThemes([customTheme, ...customThemes]);
    applyThemeVariables(importedVariables, {
      presetName: customTheme.name,
      message: `Imported ${customTheme.name}.`,
    });
    setImportText("");
    setImportOpen(false);
  }

  function importThemeFromText() {
    try {
      importTheme(parseDevThemeJson(importText));
    } catch (error) {
      setThemeMessage(error instanceof Error ? error.message : "Theme import failed.");
    }
  }

  async function importThemeFromFile(file: File | null) {
    if (!file) return;

    try {
      importTheme(parseDevThemeJson(await file.text()));
    } catch (error) {
      setThemeMessage(error instanceof Error ? error.message : "Theme import failed.");
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        style={{
          position: "fixed",
          top: "150px",
          left: "16px",
          zIndex: 2147483647,
          minWidth: "110px",
          height: "44px",
          padding: "0 14px",
          border: "2px solid yellow",
          borderRadius: "8px",
          background: "red",
          color: "#ffffff",
          fontSize: "12px",
          fontWeight: 900,
          lineHeight: 1,
          letterSpacing: "0.08em",
          cursor: "pointer",
          boxShadow: "0 12px 30px rgba(0, 0, 0, 0.35)",
        }}
        aria-expanded={isOpen}
        aria-controls="dev-style-editor-drawer"
      >
        STYLE EDITOR
      </button>

      {isOpen ? (
        <aside
          id="dev-style-editor-drawer"
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            width: "420px",
            maxWidth: "calc(100vw - 40px)",
            maxHeight: "calc(100vh - 40px)",
            overflowY: "auto",
            zIndex: 2147483647,
            background: "rgba(5, 8, 20, 0.94)",
            border: "1px solid rgba(34, 211, 238, 0.7)",
            borderRadius: "16px",
            boxShadow:
              "0 22px 70px rgba(0, 0, 0, 0.5), 0 0 36px rgba(34, 211, 238, 0.18)",
            backdropFilter: "blur(18px)",
            color: "#ffffff",
            padding: "16px",
          }}
          aria-label="Dev Style Editor"
        >
          <div
            style={{
              position: "sticky",
              top: 0,
              zIndex: 2,
              margin: "-16px -16px 0",
              padding: "16px",
              background: "rgba(5, 8, 20, 0.96)",
              borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: "12px",
              }}
            >
              <div>
                <p
                  style={{
                    margin: "0 0 4px",
                    color: "#67e8f9",
                    fontSize: "10px",
                    fontWeight: 900,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                  }}
                >
                  Localhost Preview
                </p>
                <h2 style={{ margin: 0, fontSize: "20px", fontWeight: 900 }}>
                  Dev Style Editor
                </h2>
              </div>
              <button type="button" onClick={() => setIsOpen(false)} style={smallButton()}>
                Close
              </button>
            </div>

            <div style={{ display: "grid", gap: "8px", marginTop: "12px" }}>
              <label style={{ display: "grid", gap: "6px" }}>
                <span style={{ color: "#cbd5e1", fontSize: "11px", fontWeight: 900 }}>
                  Theme Presets
                </span>
                <select
                  value={activePreset}
                  onChange={(event) => {
                    const preset = devThemePresets.find(
                      (item) => item.name === event.target.value,
                    );
                    if (preset) {
                      applyThemeVariables(preset.variables, {
                        presetName: preset.name,
                        message: `Applied ${preset.name}.`,
                      });
                    }
                  }}
                  style={inputStyle()}
                >
                  {activePreset === "Custom" ? <option value="Custom">Custom</option> : null}
                  {devThemePresets.map((preset) => (
                    <option key={preset.name} value={preset.name}>
                      {preset.name}
                    </option>
                  ))}
                </select>
              </label>

              <section
                style={{
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "12px",
                  background: "rgba(0, 0, 0, 0.18)",
                  padding: "10px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px" }}>
                  <div>
                    <p style={{ margin: 0, color: "#67e8f9", fontSize: "11px", fontWeight: 900 }}>
                      Theme Library
                    </p>
                    <p style={{ margin: "4px 0 0", color: "#94a3b8", fontSize: "10px" }}>
                      Active Theme:
                      <span style={{ color: "#ffffff" }}> {activePreset}</span>
                    </p>
                  </div>
                  <button type="button" onClick={saveCurrentTheme} style={compactButton(true)}>
                    Save Current Theme
                  </button>
                </div>

                <div
                  style={{
                    display: "grid",
                    gap: "8px",
                    marginTop: "10px",
                    maxHeight: "160px",
                    overflowY: "auto",
                    paddingRight: "2px",
                  }}
                >
                  <p style={{ margin: 0, color: "#cbd5e1", fontSize: "10px", fontWeight: 900 }}>
                    Custom Themes
                  </p>
                  {customThemes.length ? (
                    customThemes.map((theme) => (
                      <article
                        key={theme.id}
                        style={{
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                          borderRadius: "10px",
                          background: "rgba(255, 255, 255, 0.055)",
                          padding: "8px",
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", gap: "8px" }}>
                          <div>
                            <p style={{ margin: 0, color: "#ffffff", fontSize: "12px", fontWeight: 900 }}>
                              {theme.name}
                            </p>
                            <p style={{ margin: "3px 0 0", color: "#94a3b8", fontSize: "10px" }}>
                              Created {formatDate(theme.createdAt)}
                            </p>
                          </div>
                          {activePreset === theme.name ? (
                            <span style={{ color: "#67e8f9", fontSize: "10px", fontWeight: 900 }}>
                              Active
                            </span>
                          ) : null}
                        </div>
                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(3, 1fr)",
                            gap: "5px",
                            marginTop: "8px",
                          }}
                        >
                          <button type="button" onClick={() => applyCustomTheme(theme)} style={compactButton(true)}>
                            Apply
                          </button>
                          <button type="button" onClick={() => renameCustomTheme(theme)} style={compactButton()}>
                            Rename
                          </button>
                          <button type="button" onClick={() => duplicateCustomTheme(theme)} style={compactButton()}>
                            Duplicate
                          </button>
                          <button type="button" onClick={() => setDeleteTarget(theme)} style={compactButton()}>
                            Delete
                          </button>
                          <button
                            type="button"
                            onClick={() => exportSavedThemeFile(theme)}
                            style={compactButton(true)}
                          >
                            Export
                          </button>
                        </div>
                      </article>
                    ))
                  ) : (
                    <p style={{ margin: 0, color: "#94a3b8", fontSize: "11px" }}>
                      No custom themes saved yet.
                    </p>
                  )}
                </div>
              </section>

              <select
                value={activeSectionId}
                onChange={(event) => setActiveSectionId(event.target.value)}
                style={inputStyle()}
              >
                {sections.map((section) => (
                  <option key={section.id} value={section.id}>
                    {section.label}
                  </option>
                ))}
              </select>

              <p style={{ margin: 0, color: "#94a3b8", fontSize: "11px", lineHeight: 1.5 }}>
                Active preset: <span style={{ color: "#67e8f9" }}>{activePreset}</span>
                {themeMessage ? ` - ${themeMessage}` : ""}
              </p>
            </div>
          </div>

          <div style={{ paddingTop: "16px" }}>
            <details
              open={themeToolsOpen}
              onToggle={(event) => setThemeToolsOpen(event.currentTarget.open)}
              style={{
                marginBottom: "14px",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "12px",
                background: "rgba(0, 0, 0, 0.18)",
                padding: "10px",
              }}
            >
              <summary
                style={{
                  cursor: "pointer",
                  color: "#67e8f9",
                  fontSize: "12px",
                  fontWeight: 900,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                Theme Tools
              </summary>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "6px",
                  marginTop: "10px",
                }}
              >
                <button type="button" onClick={savePreview} style={compactButton()}>
                  {saved ? "Saved" : "Save Preview"}
                </button>
                <button type="button" onClick={resetCurrentSection} style={compactButton()}>
                  Reset Section
                </button>
                <button type="button" onClick={resetAll} style={compactButton()}>
                  Reset All
                </button>
                <button type="button" onClick={copyCssVariables} style={compactButton(true)}>
                  {copied ? "Copied" : "Copy CSS"}
                </button>
                <button type="button" onClick={exportTheme} style={compactButton(true)}>
                  Export Theme
                </button>
                <button type="button" onClick={() => setImportOpen(true)} style={compactButton()}>
                  Import Theme
                </button>
                <button type="button" onClick={copyThemeJson} style={compactButton(true)}>
                  {themeCopied ? "Copied" : "Copy JSON"}
                </button>
              </div>
            </details>

            <section key={activeSection.id} style={{ marginBottom: "18px" }}>
              <h3
                style={{
                  margin: "0 0 10px",
                  fontSize: "13px",
                  fontWeight: 900,
                  color: "#67e8f9",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                }}
              >
                {activeSection.label}
              </h3>

              {DEBUG_OUTLINES ? (
                <p style={{ color: "#f8fafc", fontSize: "11px", margin: "0 0 10px" }}>
                  Debug outlines are enabled.
                </p>
              ) : null}

              <div style={{ display: "grid", gap: "10px" }}>
                {activeSection.controls.map((control) => (
                    <ControlField
                      key={control.variable}
                      control={control}
                      value={overrides[control.variable] ?? control.defaultValue}
                      onChange={(value) => updateOverride(control.variable, value)}
                      onBrowse={
                        control.variable === "--ds-bg-image"
                          ? () => setBrowseTarget(control.variable)
                          : undefined
                      }
                    />
                  ))}
              </div>
            </section>
          </div>

          {browseTarget ? (
            <div
              style={{
                position: "sticky",
                bottom: 0,
                zIndex: 3,
                margin: "16px -16px -16px",
                padding: "14px 16px 16px",
                background: "rgba(5, 8, 20, 0.98)",
                borderTop: "1px solid rgba(34, 211, 238, 0.28)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px" }}>
                <p style={{ margin: 0, color: "#67e8f9", fontSize: "12px", fontWeight: 900 }}>
                  Choose Background
                </p>
                <button type="button" onClick={() => setBrowseTarget(null)} style={smallButton()}>
                  Close
                </button>
              </div>
              <div style={{ display: "grid", gap: "8px", marginTop: "10px" }}>
                {knownBackgroundImages.map((path) => (
                  <button
                    key={path}
                    type="button"
                    onClick={() => {
                      updateOverride(browseTarget, path);
                      setBrowseTarget(null);
                    }}
                    style={{ ...smallButton(true), textAlign: "left" }}
                  >
                    {path}
                  </button>
                ))}
              </div>
              {/* Future: replace this list with a real file picker/upload flow for public assets. */}
            </div>
          ) : null}

          {deleteTarget ? (
            <div
              style={{
                position: "fixed",
                inset: "0",
                zIndex: 2147483647,
                display: "grid",
                placeItems: "center",
                background: "rgba(0, 0, 0, 0.62)",
                padding: "20px",
              }}
            >
              <div
                style={{
                  width: "min(360px, calc(100vw - 40px))",
                  border: "1px solid rgba(248, 113, 113, 0.5)",
                  borderRadius: "12px",
                  background: "rgba(5, 8, 20, 0.98)",
                  color: "#ffffff",
                  padding: "16px",
                  boxShadow: "0 24px 80px rgba(0, 0, 0, 0.55)",
                }}
              >
                <p style={{ margin: 0, color: "#fecaca", fontSize: "12px", fontWeight: 900 }}>
                  Delete Theme?
                </p>
                <p style={{ margin: "8px 0 0", color: "#cbd5e1", fontSize: "12px", lineHeight: 1.5 }}>
                  {deleteTarget.name}
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginTop: "14px" }}>
                  <button type="button" onClick={() => setDeleteTarget(null)} style={smallButton()}>
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={confirmDeleteCustomTheme}
                    style={{
                      ...smallButton(),
                      border: "1px solid rgba(248, 113, 113, 0.6)",
                      background: "rgba(127, 29, 29, 0.55)",
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ) : null}

          {importOpen ? (
            <div
              style={{
                position: "fixed",
                inset: "0",
                zIndex: 2147483647,
                display: "grid",
                placeItems: "center",
                background: "rgba(0, 0, 0, 0.62)",
                padding: "20px",
              }}
            >
              <div
                style={{
                  width: "min(560px, calc(100vw - 40px))",
                  maxHeight: "calc(100vh - 80px)",
                  overflowY: "auto",
                  border: "1px solid rgba(34, 211, 238, 0.5)",
                  borderRadius: "16px",
                  background: "rgba(5, 8, 20, 0.98)",
                  color: "#ffffff",
                  padding: "16px",
                  boxShadow: "0 24px 80px rgba(0, 0, 0, 0.55)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", gap: "12px" }}>
                  <div>
                    <p style={{ margin: "0 0 4px", color: "#67e8f9", fontSize: "11px", fontWeight: 900 }}>
                      Theme Import
                    </p>
                    <h3 style={{ margin: 0, fontSize: "18px", fontWeight: 900 }}>
                      Import Theme JSON
                    </h3>
                  </div>
                  <button type="button" onClick={() => setImportOpen(false)} style={smallButton()}>
                    Close
                  </button>
                </div>

                <textarea
                  value={importText}
                  onChange={(event) => setImportText(event.target.value)}
                  placeholder='Paste theme JSON with "themeName", "createdAt", and "variables".'
                  style={{
                    ...inputStyle(),
                    minHeight: "180px",
                    marginTop: "14px",
                    padding: "12px",
                    resize: "vertical",
                    fontFamily: "monospace",
                    lineHeight: 1.5,
                  }}
                />

                <input
                  type="file"
                  accept="application/json,.json"
                  onChange={(event) => importThemeFromFile(event.target.files?.[0] ?? null)}
                  style={{ marginTop: "12px", width: "100%", color: "#cbd5e1" }}
                />

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginTop: "12px" }}>
                  <button type="button" onClick={importThemeFromText} style={smallButton(true)}>
                    Apply Pasted JSON
                  </button>
                  <button type="button" onClick={() => setImportText("")} style={smallButton()}>
                    Clear
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </aside>
      ) : null}
    </>
  );
}

function smallButton(accent = false): CSSProperties {
  return {
    minHeight: "36px",
    border: accent
      ? "1px solid rgba(34, 211, 238, 0.5)"
      : "1px solid rgba(255, 255, 255, 0.18)",
    borderRadius: "10px",
    background: accent ? "rgba(34, 211, 238, 0.14)" : "rgba(255, 255, 255, 0.08)",
    color: "#ffffff",
    padding: "8px 10px",
    cursor: "pointer",
    fontSize: "11px",
    fontWeight: 800,
  };
}

function compactButton(accent = false): CSSProperties {
  return {
    minHeight: "30px",
    border: accent
      ? "1px solid rgba(34, 211, 238, 0.46)"
      : "1px solid rgba(255, 255, 255, 0.16)",
    borderRadius: "8px",
    background: accent ? "rgba(34, 211, 238, 0.12)" : "rgba(255, 255, 255, 0.07)",
    color: "#ffffff",
    padding: "6px 8px",
    cursor: "pointer",
    fontSize: "10px",
    fontWeight: 800,
  };
}

function inputStyle(): CSSProperties {
  return {
    width: "100%",
    minHeight: "40px",
    boxSizing: "border-box",
    border: "1px solid rgba(255, 255, 255, 0.18)",
    borderRadius: "10px",
    background: "rgba(0, 0, 0, 0.28)",
    color: "#ffffff",
    padding: "0 12px",
  };
}

function ControlField({
  control,
  value,
  onChange,
  onBrowse,
}: {
  control: StyleControl;
  value: string;
  onChange: (value: string) => void;
  onBrowse?: () => void;
}) {
  if (control.type === "range") {
    return (
      <label style={fieldStyle()}>
        <span style={labelStyle()}>
          {control.label}
          <span style={{ color: "#67e8f9" }}>{value}</span>
        </span>
        <input
          type="range"
          min={control.min}
          max={control.max}
          step={control.step}
          value={numericValue(value)}
          onChange={(event) => onChange(formatRangeValue(event.target.value, control))}
          style={{ width: "100%", accentColor: "#22d3ee" }}
        />
      </label>
    );
  }

  if (control.type === "color") {
    return (
      <label style={fieldStyle()}>
        <span style={labelStyle()}>{control.label}</span>
        <div style={{ display: "grid", gridTemplateColumns: "48px 1fr", gap: "8px" }}>
          <input
            type="color"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            style={{
              width: "100%",
              height: "40px",
              border: "1px solid rgba(255, 255, 255, 0.18)",
              borderRadius: "10px",
              background: "transparent",
            }}
          />
          <input
            type="text"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            style={inputStyle()}
          />
        </div>
      </label>
    );
  }

  if (control.type === "select") {
    return (
      <label style={fieldStyle()}>
        <span style={labelStyle()}>{control.label}</span>
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          style={inputStyle()}
        >
          {control.options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
    );
  }

  return (
    <label style={fieldStyle()}>
      <span style={labelStyle()}>{control.label}</span>
      <div style={{ display: "grid", gridTemplateColumns: onBrowse ? "1fr auto" : "1fr", gap: "8px" }}>
        <input
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          style={inputStyle()}
        />
        {onBrowse ? (
          <button type="button" onClick={onBrowse} style={smallButton(true)}>
            Browse
          </button>
        ) : null}
      </div>
    </label>
  );
}

function fieldStyle(): CSSProperties {
  return {
    display: "block",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "12px",
    background: "rgba(0, 0, 0, 0.22)",
    padding: "10px",
  };
}

function labelStyle(): CSSProperties {
  return {
    display: "flex",
    justifyContent: "space-between",
    gap: "12px",
    marginBottom: "8px",
    color: "#cbd5e1",
    fontSize: "12px",
    fontWeight: 800,
  };
}
