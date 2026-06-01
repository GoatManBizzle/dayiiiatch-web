import { getPortalRequestSession } from "@/lib/portal-request-session";
import { getPortalWorkspaceData, type WorkspaceDataSet } from "@/lib/workspace-data";
import type { ClientRow, PortalUserRow } from "@/types/workspace";

export type CurrentPortalClient = {
  mode: "preview" | "auth";
  client_id: string | null;
  client: ClientRow | null;
  company: string | null;
  role: string | null;
  portalUser: PortalUserRow | null;
  workspaceData: WorkspaceDataSet;
};

export async function getCurrentPortalClient(): Promise<CurrentPortalClient> {
  const requestSession = await getPortalRequestSession();
  const isAuth = requestSession.mode === "client" && Boolean(requestSession.clientId);
  const workspaceData = await getPortalWorkspaceData({
    clientId: isAuth ? requestSession.clientId : null,
  });
  const client = workspaceData.clients[0] ?? null;
  const portalUser = workspaceData.portalUsers[0] ?? null;

  return {
    mode: isAuth ? "auth" : "preview",
    client_id: isAuth ? requestSession.clientId : null,
    client,
    company: client?.company ?? null,
    role: portalUser?.role ?? null,
    portalUser,
    workspaceData,
  };
}

export function isAuthWorkspaceEmpty(
  context: CurrentPortalClient,
  key: keyof WorkspaceDataSet,
) {
  const value = context.workspaceData[key];

  return context.mode === "auth" && Array.isArray(value) && value.length === 0;
}
