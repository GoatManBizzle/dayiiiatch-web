import { PortalPageIntro } from "@/components/portal/portal-cards";
import PortalDeliverablesVault from "@/components/portal/portal-deliverables-vault";

export default function PortalDeliverablesPage() {
  return (
    <div className="grid gap-4">
      <PortalPageIntro
        title="Deliverables Vault"
        description="View launch-ready files, strategy docs, brand assets, automation notes, walkthroughs, final exports, and revision-ready materials."
      />
      <PortalDeliverablesVault />
    </div>
  );
}
