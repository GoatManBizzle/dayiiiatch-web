import { createClient } from "@supabase/supabase-js";

import type { PortalSession } from "@/lib/portal-session";
import type { ClientRow, PortalUserRow } from "@/types/workspace";

export type PortalAuthResolution = {
  session: PortalSession | null;
  portalUser: PortalUserRow | null;
  client: ClientRow | null;
  source: "supabase" | "none";
  error?: string;
  code?: "not_configured" | "invalid_login" | "profile_not_found" | "network";
};

function getBrowserSupabaseConfig() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  return { supabaseUrl, supabaseAnonKey };
}

export function isSupabaseAuthConfigured() {
  return Boolean(getBrowserSupabaseConfig());
}

export function createBrowserSupabaseClient() {
  const config = getBrowserSupabaseConfig();

  if (!config) {
    return null;
  }

  return createClient(config.supabaseUrl, config.supabaseAnonKey);
}

async function resolvePortalUserByEmail(
  email: string,
): Promise<Omit<PortalAuthResolution, "session" | "source">> {
  const supabase = createBrowserSupabaseClient();

  if (!supabase) {
    return {
      portalUser: null,
      client: null,
      error: "Supabase Auth is not configured.",
      code: "not_configured",
    };
  }

  try {
    const { data: portalUser, error: portalUserError } = await supabase
      .from("portal_users")
      .select("*")
      .eq("email", email)
      .maybeSingle();

    if (portalUserError) {
      return {
        portalUser: null,
        client: null,
        error: portalUserError.message,
        code: "network",
      };
    }

    if (!portalUser) {
      return {
        portalUser: null,
        client: null,
        error: "Portal profile not found for this email.",
        code: "profile_not_found",
      };
    }

    const typedPortalUser = portalUser as PortalUserRow;
    const { data: client, error: clientError } = await supabase
      .from("clients")
      .select("*")
      .eq("id", typedPortalUser.client_id)
      .maybeSingle();

    if (clientError) {
      return {
        portalUser: typedPortalUser,
        client: null,
        error: clientError.message,
        code: "network",
      };
    }

    return {
      portalUser: typedPortalUser,
      client: (client as ClientRow | null) ?? null,
    };
  } catch (error) {
    return {
      portalUser: null,
      client: null,
      error:
        error instanceof Error ? error.message : "Portal profile lookup failed.",
      code: "network",
    };
  }
}

function buildClientSession({
  userId,
  email,
  portalUser,
  client,
}: {
  userId: string;
  email: string;
  portalUser: PortalUserRow;
  client: ClientRow | null;
}): PortalSession {
  return {
    mode: "client",
    clientId: portalUser.client_id ?? undefined,
    clientName: client?.name ?? email,
    company: client?.company ?? undefined,
    email,
    role: portalUser.role,
    supabaseUserId: userId,
  };
}

export async function signInPortalWithPassword(
  email: string,
  password: string,
): Promise<PortalAuthResolution> {
  const supabase = createBrowserSupabaseClient();

  if (!supabase) {
    return {
      session: null,
      portalUser: null,
      client: null,
      source: "none",
      error: "Supabase Auth is not configured.",
      code: "not_configured",
    };
  }

  const normalizedEmail = email.trim().toLowerCase();

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: normalizedEmail,
      password,
    });

    if (error || !data.user?.email) {
      return {
        session: null,
        portalUser: null,
        client: null,
        source: "none",
        error: error?.message ?? "Invalid login.",
        code: "invalid_login",
      };
    }

    const resolved = await resolvePortalUserByEmail(data.user.email);

    if (!resolved.portalUser) {
      await supabase.auth.signOut();

      return {
        session: null,
        portalUser: null,
        client: null,
        source: "none",
        error: resolved.error,
        code: resolved.code ?? "profile_not_found",
      };
    }

    return {
      session: buildClientSession({
        userId: data.user.id,
        email: data.user.email,
        portalUser: resolved.portalUser,
        client: resolved.client,
      }),
      portalUser: resolved.portalUser,
      client: resolved.client,
      source: "supabase",
    };
  } catch (error) {
    return {
      session: null,
      portalUser: null,
      client: null,
      source: "none",
      error: error instanceof Error ? error.message : "Supabase Auth failed.",
      code: "network",
    };
  }
}

export async function resolveCurrentPortalAuth(): Promise<PortalAuthResolution> {
  const supabase = createBrowserSupabaseClient();

  if (!supabase) {
    return {
      session: null,
      portalUser: null,
      client: null,
      source: "none",
      code: "not_configured",
    };
  }

  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user?.email) {
    return {
      session: null,
      portalUser: null,
      client: null,
      source: "none",
      error: error?.message,
    };
  }

  const resolved = await resolvePortalUserByEmail(data.user.email);

  if (!resolved.portalUser) {
    return {
      session: null,
      portalUser: null,
      client: null,
      source: "none",
      error: resolved.error,
      code: resolved.code,
    };
  }

  return {
    session: buildClientSession({
      userId: data.user.id,
      email: data.user.email,
      portalUser: resolved.portalUser,
      client: resolved.client,
    }),
    portalUser: resolved.portalUser,
    client: resolved.client,
    source: "supabase",
  };
}

export async function signOutPortalAuth() {
  const supabase = createBrowserSupabaseClient();

  if (supabase) {
    await supabase.auth.signOut();
  }
}
