import productionThemeConfig from "@/config/production-theme.json";

export type ThemeVariables = Record<string, string>;

export type ProductionThemeConfig = {
  activeTheme: string;
  global: {
    variables: ThemeVariables;
  };
  scopes: {
    "public.homepage": {
      variables: ThemeVariables;
    };
  };
};

export const localPreviewThemeStorageKey = "dayiiiatch_style_editor_overrides";
export const publicHomepageScope = "public.homepage";

export const productionTheme =
  productionThemeConfig as ProductionThemeConfig;

function cleanThemeVariables(variables: ThemeVariables | undefined) {
  return Object.fromEntries(
    Object.entries(variables ?? {}).filter(([variable, value]) => {
      return variable.startsWith("--") && typeof value === "string" && Boolean(value);
    }),
  );
}

export function buildProductionThemeExport(
  activeTheme: string,
  variables: ThemeVariables,
): ProductionThemeConfig {
  return {
    activeTheme,
    global: {
      variables: {},
    },
    scopes: {
      [publicHomepageScope]: {
        variables: cleanThemeVariables(variables),
      },
    },
  };
}

export function getProductionThemeVariables(
  theme: ProductionThemeConfig = productionTheme,
) {
  return {
    ...cleanThemeVariables(theme.global?.variables),
    ...cleanThemeVariables(theme.scopes?.[publicHomepageScope]?.variables),
  };
}

export function isLocalThemePreviewHost() {
  if (typeof window === "undefined") return false;

  return (
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1" ||
    window.location.hostname === "::1"
  );
}

export function loadLocalPreviewThemeVariables() {
  if (!isLocalThemePreviewHost()) return {};

  try {
    const saved = window.localStorage.getItem(localPreviewThemeStorageKey);
    return saved ? cleanThemeVariables(JSON.parse(saved) as ThemeVariables) : {};
  } catch {
    return {};
  }
}

export function getHomepageThemeSurface() {
  if (typeof document === "undefined") return null;

  return document.querySelector<HTMLElement>(
    `[data-style-scope="${publicHomepageScope}"]`,
  );
}

export function applyThemeVariables(
  variables: ThemeVariables,
  target = getHomepageThemeSurface(),
) {
  if (!target) return;

  for (const [variable, value] of Object.entries(cleanThemeVariables(variables))) {
    target.style.setProperty(variable, cssValue(variable, value));
  }
}

export function applyCommittedProductionTheme() {
  const productionVariables = getProductionThemeVariables();
  const localPreviewVariables = loadLocalPreviewThemeVariables();

  applyThemeVariables({
    ...productionVariables,
    ...localPreviewVariables,
  });
}

export function cssValue(variable: string, value: string) {
  if (variable === "--ds-bg-image" && value && !value.startsWith("url(")) {
    return `url("${value}")`;
  }

  return value;
}
