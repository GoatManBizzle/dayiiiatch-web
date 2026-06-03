import { PortalPageIntro } from "@/components/portal/portal-cards";
import PortalEmptyState from "@/components/portal/portal-empty-state";
import PortalDeliverablesVault from "@/components/portal/portal-deliverables-vault";
import { getPortalApprovalData } from "@/lib/approval-data";
import { getCurrentPortalClient } from "@/lib/portal-client";

export const dynamic = "force-dynamic";

export default async function PortalDeliverablesPage() {
  const portalClient = await getCurrentPortalClient();
  const approvalData =
    portalClient.mode === "auth"
      ? await getPortalApprovalData(portalClient.client_id)
      : { approvals: [], comments: [], history: [], source: "preview" as const };

  return (
    <div data-style-section="portal-deliverables" className="grid gap-4">
      <PortalPageIntro
        title="Deliverables Vault"
        description="View launch-ready files, strategy docs, brand assets, automation notes, walkthroughs, final exports, and revision-ready materials."
      />
      {portalClient.mode === "auth" &&
      portalClient.workspaceData.files.length === 0 ? (
        <PortalEmptyState />
      ) : (
        <PortalDeliverablesVault
          files={
            portalClient.mode === "auth"
              ? portalClient.workspaceData.files
              : undefined
          }
          approvals={approvalData.approvals}
        />
      )}
    </div>
  );
}
