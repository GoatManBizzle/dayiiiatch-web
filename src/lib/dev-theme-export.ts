export type DevThemeExport = {
  id?: string;
  name?: string;
  activeTheme?: string;
  themeName: string;
  createdAt: string;
  updatedAt?: string;
  activePageScope?: string;
  global?: { variables: Record<string, string> };
  variables: Record<string, string>;
  scopes?: Record<string, { variables: Record<string, string> }>;
};

export function buildDevThemeExport(
  themeName: string,
  variables: Record<string, string>,
): DevThemeExport {
  const now = new Date().toISOString();

  return {
    name: themeName,
    themeName,
    createdAt: now,
    updatedAt: now,
    variables,
  };
}

export function parseDevThemeJson(input: string): DevThemeExport {
  const parsed = JSON.parse(input) as Partial<DevThemeExport>;

  if (!parsed || typeof parsed !== "object") {
    throw new Error("Theme JSON must be an object.");
  }

  const parsedScopes =
    parsed.scopes && typeof parsed.scopes === "object"
      ? (parsed.scopes as Record<string, { variables?: Record<string, unknown> }>)
      : undefined;
  const parsedGlobalVariables =
    parsed.global &&
    typeof parsed.global === "object" &&
    "variables" in parsed.global &&
    parsed.global.variables &&
    typeof parsed.global.variables === "object"
      ? (parsed.global.variables as Record<string, unknown>)
      : undefined;

  if (
    (!parsed.variables || typeof parsed.variables !== "object") &&
    !parsedGlobalVariables &&
    !parsedScopes
  ) {
    throw new Error("Theme JSON must include a variables object, global variables, or scoped variables.");
  }

  const variables = Object.fromEntries(
    Object.entries({
      ...parsedGlobalVariables,
      ...(parsed.variables ?? {}),
    }).filter((entry): entry is [string, string] => {
      const [variable, value] = entry;
      return typeof variable === "string" && typeof value === "string";
    }),
  );

  const scopes = parsedScopes
    ? Object.fromEntries(
        Object.entries(parsedScopes).map(([scope, value]) => [
          scope,
          {
            variables: Object.fromEntries(
              Object.entries(value.variables ?? {}).filter(
                (entry): entry is [string, string] =>
                  typeof entry[0] === "string" && typeof entry[1] === "string",
              ),
            ),
          },
        ]),
      )
    : undefined;

  const hasScopeVariables = scopes
    ? Object.values(scopes).some((scope) => Object.keys(scope.variables).length)
    : false;

  if (!Object.keys(variables).length && !hasScopeVariables) {
    throw new Error("Theme JSON must include at least one string CSS variable.");
  }

  const themeName =
    typeof parsed.name === "string"
      ? parsed.name
      : typeof parsed.activeTheme === "string"
        ? parsed.activeTheme
      : typeof parsed.themeName === "string"
        ? parsed.themeName
        : "Imported Theme";

  return {
    id: typeof parsed.id === "string" ? parsed.id : undefined,
    name: themeName,
    activeTheme: typeof parsed.activeTheme === "string" ? parsed.activeTheme : undefined,
    themeName,
    createdAt: typeof parsed.createdAt === "string" ? parsed.createdAt : new Date().toISOString(),
    updatedAt: typeof parsed.updatedAt === "string" ? parsed.updatedAt : undefined,
    activePageScope:
      typeof parsed.activePageScope === "string" ? parsed.activePageScope : undefined,
    variables,
    scopes,
  };
}
