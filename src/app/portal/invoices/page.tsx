import PortalInvoicesWorkspace from "@/components/portal/portal-invoices-workspace";
import { PortalPageIntro } from "@/components/portal/portal-cards";

export default function PortalInvoicesPage() {
  return (
    <div className="grid gap-4">
      <PortalPageIntro
        title="Invoice Center"
        description="Manage billing, invoices, and payment activity."
      />
      <PortalInvoicesWorkspace />
    </div>
  );
}
