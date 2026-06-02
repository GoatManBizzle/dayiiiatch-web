export type DevThemeExport = {
  themeName: string;
  createdAt: string;
  variables: Record<string, string>;
};

export function buildDevThemeExport(
  themeName: string,
  variables: Record<string, string>,
): DevThemeExport {
  return {
    themeName,
    createdAt: new Date().toISOString(),
    variables,
  };
}

export function parseDevThemeJson(input: string): DevThemeExport {
  const parsed = JSON.parse(input) as Partial<DevThemeExport>;

  if (!parsed || typeof parsed !== "object") {
    throw new Error("Theme JSON must be an object.");
  }

  if (!parsed.variables || typeof parsed.variables !== "object") {
    throw new Error("Theme JSON must include a variables object.");
  }

  return {
    themeName: typeof parsed.themeName === "string" ? parsed.themeName : "Imported Theme",
    createdAt: typeof parsed.createdAt === "string" ? parsed.createdAt : new Date().toISOString(),
    variables: parsed.variables as Record<string, string>,
  };
}

