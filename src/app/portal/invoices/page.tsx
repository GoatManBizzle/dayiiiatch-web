import PortalInvoicesWorkspace from "@/components/portal/portal-invoices-workspace";
import { PortalPageIntro } from "@/components/portal/portal-cards";

export default function PortalInvoicesPage() {
  return (
    <div className="grid gap-4">
      <PortalPageIntro
        title="Invoices & Payments"
        description="Preview invoice status, payment readiness, billing history, and future Stripe payment workflows in one client billing workspace."
      />
      <PortalInvoicesWorkspace />
    </div>
  );
}
