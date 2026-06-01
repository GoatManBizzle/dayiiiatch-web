export type PortalSessionMode = "preview" | "client";

export type PortalSession = {
  mode: PortalSessionMode;
  clientId?: string;
  clientName?: string;
  company?: string;
  email?: string;
  role?: string;
  supabaseUserId?: string;
};

export const PORTAL_SESSION_KEY = "dayiiiatch-portal-session";
export const PORTAL_MODE_COOKIE = "dayiiiatch_portal_mode";
export const PORTAL_CLIENT_ID_COOKIE = "dayiiiatch_portal_client_id";

export function createPreviewPortalSession(): PortalSession {
  return {
    mode: "preview",
    clientName: "Preview Client",
    company: "DAYIIIatch Demo Workspace",
    email: "preview@dayiiiatch.local",
  };
}

export function parsePortalSession(value: string | null): PortalSession | null {
  if (!value) {
    return null;
  }

  if (value === "preview" || value === "client") {
    return value === "preview"
      ? createPreviewPortalSession()
      : { mode: "client", clientName: "Client Workspace" };
  }

  try {
    const parsed = JSON.parse(value) as Partial<PortalSession>;

    if (parsed.mode === "preview" || parsed.mode === "client") {
      return {
        mode: parsed.mode,
        clientId: parsed.clientId,
        clientName: parsed.clientName,
        company: parsed.company,
        email: parsed.email,
        role: parsed.role,
        supabaseUserId: parsed.supabaseUserId,
      };
    }
  } catch {
    return null;
  }

  return null;
}

export function serializePortalSession(session: PortalSession) {
  return JSON.stringify(session);
}

export function persistPortalSessionBrowser(session: PortalSession) {
  window.localStorage.setItem(PORTAL_SESSION_KEY, serializePortalSession(session));
  document.cookie = `${PORTAL_MODE_COOKIE}=${session.mode}; path=/; max-age=604800; samesite=lax`;

  if (session.clientId) {
    document.cookie = `${PORTAL_CLIENT_ID_COOKIE}=${session.clientId}; path=/; max-age=604800; samesite=lax`;
  } else {
    document.cookie = `${PORTAL_CLIENT_ID_COOKIE}=; path=/; max-age=0; samesite=lax`;
  }
}

export function clearPortalSessionBrowser() {
  window.localStorage.removeItem(PORTAL_SESSION_KEY);
  document.cookie = `${PORTAL_MODE_COOKIE}=; path=/; max-age=0; samesite=lax`;
  document.cookie = `${PORTAL_CLIENT_ID_COOKIE}=; path=/; max-age=0; samesite=lax`;
}
