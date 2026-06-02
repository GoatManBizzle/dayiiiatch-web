import type { DevStylePageConfig } from "@/lib/dev-style-config";

export type DevStyleOverrides = Record<string, Record<string, string>>;

export const devStyleStorageKey = "dayiiiatch_dev_style_overrides_v1";
export const devStyleFlagKey = "dayiiiatch_dev_style_editor_enabled";

export function loadDevStyleOverrides(): DevStyleOverrides {
  if (typeof window === "undefined") return {};

  try {
    const saved = window.localStorage.getItem(devStyleStorageKey);
    return saved ? (JSON.parse(saved) as DevStyleOverrides) : {};
  } catch {
    return {};
  }
}

export function saveDevStyleOverrides(overrides: DevStyleOverrides) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(devStyleStorageKey, JSON.stringify(overrides));
}

export function clearDevStyleOverrides() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(devStyleStorageKey);
}

function formatCssValue(cssVar: string, value: string) {
  if (cssVar.includes("image") && value && !value.startsWith("url(")) {
    return `url("${value}")`;
  }

  return value;
}

export function applyDevStyleOverrides(
  pageConfig: DevStylePageConfig,
  overrides: DevStyleOverrides,
) {
  if (typeof document === "undefined") return;

  for (const section of pageConfig.sections) {
    const target =
      section.selector === ":root"
        ? document.documentElement
        : document.querySelector<HTMLElement>(section.selector);

    if (!target) continue;

    for (const control of section.controls) {
      target.style.removeProperty(control.cssVar);
    }

    const sectionOverrides = overrides[section.id] ?? {};

    for (const [cssVar, value] of Object.entries(sectionOverrides)) {
      if (!value) {
        target.style.removeProperty(cssVar);
        continue;
      }

      target.style.setProperty(cssVar, formatCssValue(cssVar, value));
    }
  }
}

export function buildDevStyleCssOutput(
  pageConfig: DevStylePageConfig,
  overrides: DevStyleOverrides,
) {
  const blocks: string[] = [];

  for (const section of pageConfig.sections) {
    const sectionOverrides = overrides[section.id] ?? {};
    const entries = Object.entries(sectionOverrides).filter(([, value]) =>
      Boolean(value),
    );

    if (!entries.length) continue;

    const selector =
      section.selector === ":root"
        ? ":root"
        : `[data-style-section="${section.id}"]`;

    blocks.push(
      [
        `${selector} {`,
        ...entries.map(
          ([cssVar, value]) => `  ${cssVar}: ${formatCssValue(cssVar, value)};`,
        ),
        "}",
      ].join("\n"),
    );
  }

  return blocks.join("\n\n");
}
