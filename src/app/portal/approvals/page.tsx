import PortalApprovalsWorkspace from "@/components/portal/portal-approvals-workspace";
import { PortalPageIntro } from "@/components/portal/portal-cards";
import PortalEmptyState from "@/components/portal/portal-empty-state";
import { getPortalApprovalData } from "@/lib/approval-data";
import { getCurrentPortalClient } from "@/lib/portal-client";

export const dynamic = "force-dynamic";

export default async function PortalApprovalsPage() {
  const portalClient = await getCurrentPortalClient();
  const approvalData =
    portalClient.mode === "auth"
      ? await getPortalApprovalData(portalClient.client_id)
      : { approvals: [], comments: [], history: [], source: "preview" as const };

  return (
    <div data-style-section="portal-approvals" className="grid gap-4">
      <PortalPageIntro
        title="Approval Center"
        description="Review project items and provide approval decisions."
      />
      {portalClient.mode === "auth" && approvalData.approvals.length === 0 ? (
        <PortalEmptyState
          title="No approvals pending. Your review items will appear here."
          description="Approval requests, revision notes, and decision history will show here when DAYIIIatch submits review items."
        />
      ) : (
        <PortalApprovalsWorkspace
          mode={portalClient.mode === "auth" ? "auth" : "preview"}
          approvals={approvalData.approvals}
          approvalHistory={approvalData.history}
          actorName={portalClient.client?.name}
        />
      )}
    </div>
  );
}
