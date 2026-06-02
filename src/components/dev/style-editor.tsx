"use client";

import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";

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

const storageKey = "dayiiiatch_style_editor_overrides";
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
    id: "header-wrapper",
    label: "Header Wrapper / Frame",
    controls: [
      text("Wrapper width", "--ds-header-wrapper-width", "min(90rem, calc(100vw - 0.35rem))"),
      text("Wrapper max width", "--ds-header-wrapper-max-width", "90rem"),
      text("Wrapper height", "--ds-header-wrapper-height", "auto"),
      range("Wrapper min height", "--ds-header-wrapper-min-height", "0px", 0, 520, 1, "px"),
      range("Wrapper margin top", "--ds-header-wrapper-margin-top", "0px", -80, 120, 1, "px"),
      range("Wrapper margin bottom", "--ds-header-wrapper-margin-bottom", "0px", -80, 120, 1, "px"),
      range("Wrapper padding top", "--ds-header-wrapper-padding-top", "0px", 0, 120, 1, "px"),
      range("Wrapper padding bottom", "--ds-header-wrapper-padding-bottom", "0px", 0, 120, 1, "px"),
      range("Wrapper padding left", "--ds-header-wrapper-padding-left", "0px", 0, 120, 1, "px"),
      range("Wrapper padding right", "--ds-header-wrapper-padding-right", "0px", 0, 120, 1, "px"),
      range("Wrapper border width", "--ds-header-wrapper-border-width", "1px", 0, 12, 1, "px"),
      color("Wrapper border color", "--ds-header-wrapper-border-color", "#22d3ee"),
      range("Wrapper border radius", "--ds-header-wrapper-radius", "40px", 0, 80, 1, "px"),
      text("Wrapper background color", "--ds-header-wrapper-bg", "transparent"),
      select("Wrapper overflow", "--ds-header-wrapper-overflow", "hidden", ["hidden", "visible"]),
      select("Wrapper display", "--ds-header-wrapper-display", "block", ["block", "flex", "grid"]),
    ],
  },
  {
    id: "header-media",
    label: "Header Media / Video",
    controls: [
      range("Media width", "--ds-header-media-width", "100%", 10, 160, 1, "%"),
      text("Media height", "--ds-header-media-height", "340px"),
      range("Media margin top", "--ds-header-media-margin-top", "0px", -160, 160, 1, "px"),
      range("Media margin bottom", "--ds-header-media-margin-bottom", "0px", -160, 160, 1, "px"),
      select("Media object fit", "--ds-header-media-object-fit", "cover", [
        "cover",
        "contain",
        "fill",
        "none",
        "scale-down",
      ]),
      select("Media object position X", "--ds-header-media-object-position-x", "center", [
        "left",
        "center",
        "right",
      ]),
      select("Media object position Y", "--ds-header-media-object-position-y", "top", [
        "top",
        "center",
        "bottom",
      ]),
      range("Media scale / zoom", "--ds-header-media-scale", "1", 0.5, 2, 0.01),
      range("Media opacity", "--ds-header-media-opacity", "1", 0, 1, 0.01),
      range("Media border radius", "--ds-header-media-radius", "0px", 0, 80, 1, "px"),
      select("Media background repeat / tile", "--ds-header-media-repeat", "no-repeat", [
        "no-repeat",
        "repeat",
        "repeat-x",
        "repeat-y",
      ]),
      select("Media background size mode", "--ds-header-media-size-mode", "cover", [
        "cover",
        "contain",
        "fill",
        "fit",
        "stretch",
        "tile",
        "repeat-x",
        "repeat-y",
        "auto",
      ]),
    ],
  },
  {
    id: "nav",
    label: "Navigation",
    controls: [
      range("Nav gap", "--ds-nav-gap", "8px", 0, 36, 1, "px"),
      range("Nav button padding X", "--ds-nav-button-padding-x", "16px", 4, 32, 1, "px"),
      range("Nav button padding Y", "--ds-nav-button-padding-y", "8px", 2, 20, 1, "px"),
      range("Nav radius", "--ds-nav-radius", "999px", 0, 999, 1, "px"),
      color("Nav accent / border color", "--ds-nav-border-color", "#22d3ee"),
    ],
  },
  {
    id: "about",
    label: "About Section",
    controls: [
      range("Section max width", "--ds-about-max-width", "1280px", 720, 1500, 10, "px"),
      range("Section padding", "--ds-about-padding", "32px", 8, 96, 1, "px"),
      color("Card background color", "--ds-about-card-bg", "#071220"),
      color("Heading color", "--ds-about-heading", "#ffffff"),
      color("Body text color", "--ds-about-body", "#cbd5e1"),
      range("Border radius", "--ds-about-radius", "32px", 0, 64, 1, "px"),
    ],
  },
  {
    id: "proof",
    label: "Proof Systems",
    controls: [
      range("Card gap", "--ds-proof-card-gap", "16px", 0, 56, 1, "px"),
      range("Card radius", "--ds-card-radius", "28px", 0, 56, 1, "px"),
      color("Card background color", "--ds-proof-card-bg", "#071220"),
      color("Card border color", "--ds-proof-card-border", "#22d3ee"),
      range("Glow strength", "--ds-proof-glow-strength", "44px", 0, 100, 1, "px"),
    ],
  },
  {
    id: "sticky-cta",
    label: "Sticky CTA",
    controls: [
      select("Dock width", "--ds-sticky-cta-width", "672px", ["520px", "640px", "672px", "760px"]),
      range("Dock bottom offset", "--ds-sticky-cta-bottom", "20px", 0, 160, 1, "px"),
      range("Button radius", "--ds-sticky-cta-button-radius", "999px", 0, 999, 1, "px"),
      color("Dock background color", "--ds-sticky-cta-bg", "#071220"),
      color("Dock border color", "--ds-sticky-cta-border", "#22d3ee"),
    ],
  },
  {
    id: "footer",
    label: "Footer",
    controls: [
      range("Footer padding", "--ds-footer-padding", "32px", 8, 96, 1, "px"),
      color("Footer text color", "--ds-footer-text", "#94a3b8"),
      color("Footer link color", "--ds-footer-link", "#cbd5e1"),
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
      return editableVariables.has(variable) && Boolean(value);
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

export default function StyleEditor() {
  const [canRender, setCanRender] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState(sections[0].id);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [overrides, setOverrides] = useState<StyleOverrides>({});

  const activeSection = useMemo(
    () => sections.find((section) => section.id === activeSectionId) ?? sections[0],
    [activeSectionId],
  );

  useEffect(() => {
    const allowed = isLocalhost();
    setCanRender(allowed);

    if (allowed) {
      const savedOverrides = loadOverrides();
      setOverrides(savedOverrides);
      applyOverrides(savedOverrides);
    }
  }, []);

  useEffect(() => {
    if (!canRender) return;

    applyOverrides(overrides);
    window.localStorage.setItem(storageKey, JSON.stringify(overrides));
  }, [canRender, overrides]);

  if (!canRender) return null;

  function updateOverride(variable: string, value: string) {
    setOverrides((current) => ({
      ...current,
      [variable]: value,
    }));
    setSaved(false);
  }

  function updateOverrides(values: StyleOverrides) {
    setOverrides((current) => ({
      ...current,
      ...values,
    }));
    setSaved(false);
  }

  function collapseWrapperGap() {
    updateOverrides({
      "--ds-header-wrapper-padding-top": "0px",
      "--ds-header-wrapper-margin-top": "0px",
      "--ds-header-wrapper-min-height": "0px",
      "--ds-header-wrapper-height": "auto",
      "--ds-header-media-margin-top": "0px",
    });
  }

  function fitMediaToFrame() {
    updateOverrides({
      "--ds-header-media-width": "100%",
      "--ds-header-media-height": "100%",
      "--ds-header-media-object-fit": "cover",
      "--ds-header-media-object-position-x": "center",
      "--ds-header-media-object-position-y": "center",
      "--ds-header-media-scale": "1",
    });
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
    window.localStorage.removeItem(storageKey);
    setOverrides({});
    applyOverrides({});
  }

  async function copyCssVariables() {
    await window.navigator.clipboard.writeText(buildCssOutput(overrides));
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
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
            top: "96px",
            right: "20px",
            width: "380px",
            maxWidth: "calc(100vw - 40px)",
            maxHeight: "calc(100vh - 120px)",
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

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                <button type="button" onClick={savePreview} style={smallButton()}>
                  {saved ? "Saved" : "Save Preview"}
                </button>
                <button type="button" onClick={resetCurrentSection} style={smallButton()}>
                  Reset Current Section
                </button>
                <button type="button" onClick={resetAll} style={smallButton()}>
                  Reset All
                </button>
                <button type="button" onClick={copyCssVariables} style={smallButton(true)}>
                  {copied ? "Copied" : "Copy CSS Variables"}
                </button>
              </div>
            </div>
          </div>

          <div style={{ paddingTop: "16px" }}>
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

              {activeSection.id === "header-wrapper" ? (
                <button
                  type="button"
                  onClick={collapseWrapperGap}
                  style={{ ...smallButton(true), width: "100%", marginBottom: "10px" }}
                >
                  Collapse Wrapper Gap
                </button>
              ) : null}

              {activeSection.id === "header-media" ? (
                <button
                  type="button"
                  onClick={fitMediaToFrame}
                  style={{ ...smallButton(true), width: "100%", marginBottom: "10px" }}
                >
                  Fit Media To Frame
                </button>
              ) : null}

              <div style={{ display: "grid", gap: "10px" }}>
                {activeSection.controls.map((control) => (
                  <ControlField
                    key={control.variable}
                    control={control}
                    value={overrides[control.variable] ?? control.defaultValue}
                    onChange={(value) => updateOverride(control.variable, value)}
                  />
                ))}
              </div>
            </section>
          </div>
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
}: {
  control: StyleControl;
  value: string;
  onChange: (value: string) => void;
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
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        style={inputStyle()}
      />
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
