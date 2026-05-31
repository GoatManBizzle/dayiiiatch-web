import PortalApprovalsWorkspace from "@/components/portal/portal-approvals-workspace";
import { PortalPageIntro } from "@/components/portal/portal-cards";

export default function PortalApprovalsPage() {
  return (
    <div className="grid gap-4">
      <PortalPageIntro
        title="Approvals"
        description="Approve deliverables, request revisions, and keep launch-critical decisions moving through a clear client-facing workflow."
      />
      <PortalApprovalsWorkspace />
    </div>
  );
}
