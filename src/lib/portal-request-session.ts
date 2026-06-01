import { cookies } from "next/headers";

import {
  PORTAL_CLIENT_ID_COOKIE,
  PORTAL_MODE_COOKIE,
  type PortalSessionMode,
} from "@/lib/portal-session";

export type PortalRequestSession = {
  mode: PortalSessionMode | null;
  clientId: string | null;
};

export async function getPortalRequestSession(): Promise<PortalRequestSession> {
  const cookieStore = await cookies();
  const modeValue = cookieStore.get(PORTAL_MODE_COOKIE)?.value;
  const mode =
    modeValue === "preview" || modeValue === "client" ? modeValue : null;

  return {
    mode,
    clientId: cookieStore.get(PORTAL_CLIENT_ID_COOKIE)?.value ?? null,
  };
}
