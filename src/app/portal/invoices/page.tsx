import PortalInvoicesWorkspace from "@/components/portal/portal-invoices-workspace";
import { PortalPageIntro } from "@/components/portal/portal-cards";
import PortalEmptyState from "@/components/portal/portal-empty-state";
import { getPortalInvoiceData } from "@/lib/invoice-data";
import { getCurrentPortalClient } from "@/lib/portal-client";

export const dynamic = "force-dynamic";

export default async function PortalInvoicesPage() {
  const portalClient = await getCurrentPortalClient();
  const invoiceData =
    portalClient.mode === "auth"
      ? await getPortalInvoiceData(portalClient.client_id)
      : { invoices: [], items: [], payments: [], source: "preview" as const };

  return (
    <div data-style-section="portal-invoices" className="grid gap-4">
      <PortalPageIntro
        title="Invoice Center"
        description="Manage billing, invoices, and payment activity."
      />
      {portalClient.mode === "auth" &&
      invoiceData.source === "supabase" &&
      invoiceData.invoices.length === 0 ? (
        <PortalEmptyState
          title="No invoices yet. Billing records will appear here."
          description="Your workspace billing, invoice PDFs, payment status, and Stripe Checkout links will show here once DAYIIIatch publishes invoice records."
        />
      ) : (
        <PortalInvoicesWorkspace
          mode={portalClient.mode === "auth" ? "auth" : "preview"}
          invoices={invoiceData.invoices}
          items={invoiceData.items}
          payments={invoiceData.payments}
        />
      )}
    </div>
  );
}
