import { PortalPageIntro } from "@/components/portal/portal-cards";
import PortalMessagesWorkspace from "@/components/portal/portal-messages-workspace";
import { getCurrentPortalClient } from "@/lib/portal-client";
import { getPortalMessagingData } from "@/lib/messaging-data";

export const dynamic = "force-dynamic";

export default async function PortalMessagesPage() {
  const portalClient = await getCurrentPortalClient();
  const messagingData =
    portalClient.mode === "auth"
      ? await getPortalMessagingData(portalClient.client_id)
      : { threads: [], messages: [], source: "preview" as const };

  return (
    <div data-style-section="portal-messages" className="grid gap-4">
      <PortalPageIntro
        title="Communication Workspace"
        description="Track project updates, asset reviews, revision requests, and launch prep conversations in one clean client message center."
      />
      <PortalMessagesWorkspace
        mode={portalClient.mode === "auth" ? "auth" : "preview"}
        clientName={portalClient.client?.name}
        clientEmail={portalClient.portalUser?.email}
        threads={messagingData.threads}
        messages={messagingData.messages}
      />
    </div>
  );
}
