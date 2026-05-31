import PortalApprovalsWorkspace from "@/components/portal/portal-approvals-workspace";
import { PortalPageIntro } from "@/components/portal/portal-cards";

export default function PortalApprovalsPage() {
  return (
    <div className="grid gap-4">
      <PortalPageIntro
        title="Approval Center"
        description="Review project items and provide approval decisions."
      />
      <PortalApprovalsWorkspace />
    </div>
  );
}
