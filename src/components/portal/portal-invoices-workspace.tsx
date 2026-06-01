"use client";

import { useMemo, useState } from "react";

import {
  createInvoiceActivityEvent,
  type InvoiceItemRow,
  type InvoiceRow,
  type PaymentRow,
} from "@/lib/invoice-data";
import {
  portalInvoices,
  portalInvoiceSummary,
  portalPaymentHistory,
  statusTone,
} from "@/lib/portal-data";

type InvoiceMode = "preview" | "auth";
type PreviewInvoice = (typeof portalInvoices)[number];

type InvoiceView = {
  id: string;
  clientId?: string | null;
  projectId?: string | null;
  invoiceNumber: string;
  title: string;
  amount: string;
  tax: string;
  total: string;
  subtotalValue: number;
  taxValue: number;
  totalValue: number;
  dueDate: string;
  paidDate: string;
  status: string;
  project: string;
  services: string[];
  items: InvoiceItemRow[];
  payments: PaymentRow[];
  raw?: InvoiceRow;
};

function formatCurrency(value?: number | null) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value ?? 0);
}

function formatDate(value?: string | null) {
  if (!value) return "Not scheduled";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function displayStatus(status: string) {
  const normalized = status.toLowerCase().replace(/_/g, " ");

  if (normalized === "paid") return "Paid";
  if (normalized === "due soon") return "Due Soon";
  if (normalized === "overdue") return "Overdue";
  if (normalized === "draft") return "Draft";
  if (normalized === "outstanding" || normalized === "pending") {
    return "Outstanding";
  }

  return status
    .split(/[\s_-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function StatusPill({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] ${
        statusTone[status] ?? "border-white/10 bg-white/[0.045] text-zinc-200"
      }`}
    >
      {status}
    </span>
  );
}

function mapPreviewInvoice(invoice: PreviewInvoice): InvoiceView {
  const total = Number(invoice.total.replace(/[$,]/g, "")) || 0;
  const tax = Number(invoice.tax.replace(/[$,]/g, "")) || 0;

  return {
    id: invoice.invoiceNumber,
    invoiceNumber: invoice.invoiceNumber,
    title: invoice.title,
    amount: invoice.amount,
    tax: invoice.tax,
    total: invoice.total,
    subtotalValue: total - tax,
    taxValue: tax,
    totalValue: total,
    dueDate: invoice.dueDate,
    paidDate: invoice.paidDate || "Not paid yet",
    status: invoice.status,
    project: invoice.project,
    services: invoice.services,
    items: invoice.services.map((service, index) => ({
      id: `${invoice.invoiceNumber}-${index}`,
      invoice_id: invoice.invoiceNumber,
      description: service,
      quantity: 1,
      unit_price: index === 0 ? total : 0,
      line_total: index === 0 ? total : 0,
      created_at: "",
    })),
    payments: [],
  };
}

function mapInvoiceRow({
  invoice,
  items,
  payments,
}: {
  invoice: InvoiceRow;
  items: InvoiceItemRow[];
  payments: PaymentRow[];
}): InvoiceView {
  const invoiceItems = items.filter((item) => item.invoice_id === invoice.id);
  const invoicePayments = payments.filter(
    (payment) => payment.invoice_id === invoice.id,
  );
  const subtotal = invoice.subtotal || invoice.amount || invoice.total || 0;
  const total = invoice.total || invoice.amount || subtotal + invoice.tax;

  return {
    id: invoice.id,
    clientId: invoice.client_id,
    projectId: invoice.project_id,
    invoiceNumber: invoice.invoice_number,
    title: invoice.title ?? invoice.invoice_number,
    amount: formatCurrency(subtotal),
    tax: formatCurrency(invoice.tax),
    total: formatCurrency(total),
    subtotalValue: subtotal,
    taxValue: invoice.tax,
    totalValue: total,
    dueDate: formatDate(invoice.due_date),
    paidDate: formatDate(invoice.paid_at ?? invoice.paid_date ?? null),
    status: displayStatus(invoice.status),
    project: invoice.project_id ? "Linked project" : "Workspace billing",
    services:
      invoiceItems.length > 0
        ? invoiceItems.map((item) => item.description)
        : ["Invoice line items will appear here once billing is fully wired."],
    items: invoiceItems,
    payments: invoicePayments,
    raw: invoice,
  };
}

function InvoiceDetailDrawer({
  invoice,
  onClose,
}: {
  invoice: InvoiceView;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[9998] flex justify-end bg-black/70 backdrop-blur-sm">
      <button
        type="button"
        aria-label="Close invoice detail"
        className="absolute inset-0 cursor-default"
        onClick={onClose}
      />
      <aside className="relative h-full w-full max-w-2xl overflow-y-auto border-l border-white/10 bg-zinc-950/96 p-5 shadow-[0_0_70px_rgba(34,211,238,0.14)] sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">
              Invoice Detail
            </p>
            <h2 className="mt-2 break-words text-2xl font-black text-white">
              {invoice.title}
            </h2>
          </div>
          <StatusPill status={invoice.status} />
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {[
            ["Invoice Number", invoice.invoiceNumber],
            ["Project", invoice.project],
            ["Subtotal", invoice.amount],
            ["Tax", invoice.tax],
            ["Total", invoice.total],
            ["Due Date", invoice.dueDate],
            ["Payment Status", invoice.status],
            ["Paid Date", invoice.paidDate],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-2xl border border-white/10 bg-black/24 px-4 py-3"
            >
              <p className="text-[10px] font-black uppercase tracking-[0.14em] text-zinc-500">
                {label}
              </p>
              <p className="mt-1 break-words font-bold text-zinc-100">
                {value}
              </p>
            </div>
          ))}
        </div>

        <section className="mt-5 rounded-[1.25rem] border border-violet-300/14 bg-violet-500/[0.06] p-4">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-100">
            Invoice Items
          </p>
          <div className="mt-3 grid gap-2">
            {invoice.items.map((item) => (
              <div
                key={item.id}
                className="grid gap-2 rounded-2xl border border-white/10 bg-black/20 p-3 text-sm text-zinc-300 sm:grid-cols-[minmax(0,1fr)_auto_auto]"
              >
                <span className="min-w-0 break-words font-bold text-zinc-100">
                  {item.description}
                </span>
                <span>Qty {item.quantity}</span>
                <span className="font-black text-white">
                  {formatCurrency(item.line_total)}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-5 rounded-[1.25rem] border border-cyan-300/14 bg-cyan-400/[0.06] p-4">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-100">
            Payment History
          </p>
          <div className="mt-3 grid gap-2">
            {invoice.payments.length > 0 ? (
              invoice.payments.map((payment) => (
                <div
                  key={payment.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/20 p-3"
                >
                  <div>
                    <p className="font-black text-white">
                      {formatCurrency(payment.amount)}
                    </p>
                    <p className="text-xs font-bold text-zinc-500">
                      {formatDate(payment.paid_at ?? payment.created_at)}
                    </p>
                  </div>
                  <StatusPill status={displayStatus(payment.status)} />
                </div>
              ))
            ) : (
              <p className="text-sm leading-6 text-zinc-300">
                Payment records will appear here after Stripe Checkout and
                webhook updates are connected.
              </p>
            )}
          </div>
        </section>

        <div className="mt-5 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-white/10 bg-white/[0.045] px-4 py-2 text-xs font-black text-zinc-200 transition hover:border-cyan-300/28 hover:bg-cyan-400/10 hover:text-cyan-100"
          >
            Close Detail
          </button>
        </div>
      </aside>
    </div>
  );
}

function PaymentPreviewModal({
  invoice,
  message,
  onClose,
}: {
  invoice: InvoiceView;
  message: string;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/76 px-4 py-6 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="payment-preview-title"
        className="w-full max-w-2xl rounded-[1.5rem] border border-cyan-300/20 bg-zinc-950/94 p-4 shadow-[0_0_70px_rgba(34,211,238,0.16)] backdrop-blur-2xl sm:p-6"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">
              Payment Preview
            </p>
            <h2
              id="payment-preview-title"
              className="mt-2 break-words text-2xl font-black text-white"
            >
              {invoice.title}
            </h2>
          </div>
          <StatusPill status={invoice.status} />
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {[
            ["Invoice", invoice.invoiceNumber],
            ["Total", invoice.total],
            ["Due Date", invoice.dueDate],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-2xl border border-white/10 bg-black/24 px-3 py-3"
            >
              <p className="text-[10px] font-black uppercase tracking-[0.14em] text-zinc-500">
                {label}
              </p>
              <p className="mt-1 font-black text-zinc-100">{value}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-[1.25rem] border border-violet-300/18 bg-violet-500/[0.06] p-4">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-100">
            Stripe Checkout Placeholder
          </p>
          <p className="mt-2 text-sm leading-6 text-zinc-300">{message}</p>
        </div>

        <p className="mt-4 rounded-2xl border border-cyan-300/14 bg-cyan-400/[0.06] px-4 py-3 text-xs leading-5 text-cyan-100">
          Production billing will require STRIPE_SECRET_KEY,
          NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY, STRIPE_WEBHOOK_SECRET, Checkout
          session creation, and webhook-driven payment status updates.
        </p>

        <div className="mt-5 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl border border-cyan-300/28 bg-cyan-400/12 px-5 py-3 text-sm font-black text-cyan-100 transition hover:-translate-y-0.5 hover:bg-cyan-400/18"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PortalInvoicesWorkspace({
  mode = "preview",
  invoices,
  items = [],
  payments = [],
}: {
  mode?: InvoiceMode;
  invoices?: InvoiceRow[];
  items?: InvoiceItemRow[];
  payments?: PaymentRow[];
}) {
  const invoiceViews = useMemo(
    () =>
      mode === "auth" && invoices
        ? invoices.map((invoice) => mapInvoiceRow({ invoice, items, payments }))
        : portalInvoices.map(mapPreviewInvoice),
    [invoices, items, mode, payments],
  );
  const [detailInvoice, setDetailInvoice] = useState<InvoiceView | null>(null);
  const [paymentInvoice, setPaymentInvoice] = useState<InvoiceView | null>(
    null,
  );
  const [paymentMessage, setPaymentMessage] = useState(
    "Preview Mode opens this payment modal only. No real payment is attempted.",
  );
  const [pdfNotice, setPdfNotice] = useState<string | null>(null);

  const summary =
    mode === "auth"
      ? [
          {
            label: "Total Invoiced",
            value: formatCurrency(
              invoiceViews.reduce((sum, invoice) => sum + invoice.totalValue, 0),
            ),
            status: "Outstanding",
          },
          {
            label: "Paid",
            value: formatCurrency(
              invoiceViews
                .filter((invoice) => invoice.status === "Paid")
                .reduce((sum, invoice) => sum + invoice.totalValue, 0),
            ),
            status: "Paid",
          },
          {
            label: "Outstanding",
            value: formatCurrency(
              invoiceViews
                .filter((invoice) => invoice.status !== "Paid")
                .reduce((sum, invoice) => sum + invoice.totalValue, 0),
            ),
            status: "Outstanding",
          },
          {
            label: "Due Soon",
            value: String(
              invoiceViews.filter((invoice) => invoice.status === "Due Soon")
                .length,
            ),
            status: "Due Soon",
          },
        ]
      : portalInvoiceSummary;

  async function handleViewInvoice(invoice: InvoiceView) {
    setDetailInvoice(invoice);

    if (mode === "auth") {
      await createInvoiceActivityEvent({
        clientId: invoice.clientId,
        projectId: invoice.projectId,
        eventType: "invoice_viewed",
        title: invoice.title,
        description: "Client viewed an invoice detail record.",
      });
    }
  }

  async function handlePayNow(invoice: InvoiceView) {
    if (mode === "preview") {
      setPaymentMessage(
        "Preview Mode opens this payment modal only. No Stripe session or payment record is created.",
      );
      setPaymentInvoice(invoice);
      return;
    }

    setPaymentMessage("Preparing secure Checkout placeholder...");
    setPaymentInvoice(invoice);
    await createInvoiceActivityEvent({
      clientId: invoice.clientId,
      projectId: invoice.projectId,
      eventType: "payment_started",
      title: invoice.title,
      description: "Client started the invoice payment flow.",
    });

    const response = await fetch("/api/portal/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ invoiceId: invoice.id }),
    });
    const result = (await response.json()) as {
      message?: string;
      checkoutUrl?: string | null;
    };

    setPaymentMessage(
      result.message ??
        "Stripe Checkout placeholder returned. Configure Stripe keys to create live sessions.",
    );
  }

  function handleDownloadPdf(invoice: InvoiceView) {
    setPdfNotice(
      `Invoice PDF generation coming soon for ${invoice.invoiceNumber}.`,
    );
  }

  return (
    <div className="grid gap-4">
      <section className="relative overflow-hidden rounded-[1.6rem] border border-cyan-300/18 bg-cyan-400/[0.055] p-4 shadow-[0_0_46px_rgba(34,211,238,0.08)] backdrop-blur-xl sm:p-6">
        <div className="absolute right-8 top-6 h-24 w-24 rounded-full border border-cyan-300/20 bg-cyan-400/10 blur-xl motion-safe:animate-pulse" />
        <div className="relative grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(22rem,0.95fr)] xl:items-end">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-200">
                Billing Workspace
              </p>
              {mode === "preview" ? <StatusPill status="Preview Data" /> : null}
            </div>
            <h2 className="mt-2 break-words text-3xl font-black text-white sm:text-5xl">
              Invoice Center
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-300">
              Manage billing, invoices, and payment activity.
            </p>
          </div>

          <div className="grid min-w-0 gap-3 sm:grid-cols-2">
            {summary.map((item) => (
              <article
                key={item.label}
                className="rounded-2xl border border-white/10 bg-black/24 p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <p className="text-[10px] font-black uppercase tracking-[0.14em] text-zinc-500">
                    {item.label}
                  </p>
                  <StatusPill status={item.status} />
                </div>
                <p className="mt-2 break-words text-3xl font-black text-white">
                  {item.value}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {pdfNotice ? (
        <div className="rounded-2xl border border-cyan-300/16 bg-cyan-400/[0.07] px-4 py-3 text-sm font-bold text-cyan-100">
          {pdfNotice}
        </div>
      ) : null}

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.75fr)]">
        <div className="min-w-0 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_0_34px_rgba(124,58,237,0.06)] backdrop-blur-xl sm:p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-200">
                Invoice List
              </p>
              <h2 className="mt-2 text-2xl font-black text-white">
                Client Billing
              </h2>
            </div>
            <span className="rounded-full border border-cyan-300/18 bg-cyan-400/[0.07] px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-cyan-100">
              {invoiceViews.length} invoices
            </span>
          </div>

          <div className="mt-4 grid items-stretch gap-3 lg:grid-cols-2">
            {invoiceViews.map((invoice) => (
              <article
                key={invoice.id}
                className="flex min-w-0 flex-col rounded-2xl border border-white/10 bg-black/24 p-4 transition hover:border-cyan-300/22 hover:bg-cyan-400/[0.045]"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-[10px] font-black uppercase tracking-[0.14em] text-zinc-500">
                      Invoice # {invoice.invoiceNumber}
                    </p>
                    <h3 className="mt-2 break-words text-lg font-black text-white">
                      {invoice.title}
                    </h3>
                  </div>
                  <StatusPill status={invoice.status} />
                </div>

                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.035] px-3 py-3">
                    <p className="text-[10px] font-black uppercase tracking-[0.14em] text-zinc-500">
                      Amount
                    </p>
                    <p className="mt-1 text-lg font-black text-zinc-100">
                      {invoice.total}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.035] px-3 py-3">
                    <p className="text-[10px] font-black uppercase tracking-[0.14em] text-zinc-500">
                      Due
                    </p>
                    <p className="mt-1 font-bold text-zinc-100">
                      {invoice.dueDate}
                    </p>
                  </div>
                </div>

                <p className="mt-3 text-sm leading-6 text-zinc-400">
                  Project: {invoice.project}
                </p>

                <div className="mt-auto flex flex-wrap gap-2 pt-4">
                  <button
                    type="button"
                    onClick={() => void handleViewInvoice(invoice)}
                    className="rounded-xl border border-white/10 bg-white/[0.045] px-3 py-2 text-xs font-black text-zinc-200 transition hover:border-cyan-300/28 hover:bg-cyan-400/10 hover:text-cyan-100"
                  >
                    View
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDownloadPdf(invoice)}
                    className="rounded-xl border border-white/10 bg-white/[0.045] px-3 py-2 text-xs font-black text-zinc-200 transition hover:border-cyan-300/28 hover:bg-cyan-400/10 hover:text-cyan-100"
                  >
                    Download PDF
                  </button>
                  {invoice.status !== "Paid" && invoice.status !== "Draft" ? (
                    <button
                      type="button"
                      onClick={() => void handlePayNow(invoice)}
                      className="rounded-xl border border-cyan-300/24 bg-cyan-400/10 px-3 py-2 text-xs font-black text-cyan-100 transition hover:bg-cyan-400/18"
                    >
                      Pay Now
                    </button>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>

        <aside className="grid min-w-0 content-start gap-4">
          <section className="rounded-[1.5rem] border border-cyan-300/14 bg-cyan-400/[0.06] p-4 shadow-[0_0_34px_rgba(34,211,238,0.05)] backdrop-blur-xl sm:p-5">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-100">
              Quick Actions
            </p>
            <div className="mt-4 grid gap-2">
              {["Download All PDFs", "View Outstanding", "Payment History"].map(
                (action) => (
                  <button
                    key={action}
                    type="button"
                    className="rounded-2xl border border-white/10 bg-black/24 px-4 py-3 text-left text-sm font-black text-zinc-200 transition hover:border-cyan-300/28 hover:bg-cyan-400/10 hover:text-cyan-100"
                  >
                    {action}
                  </button>
                ),
              )}
            </div>
          </section>

          <section className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_0_34px_rgba(34,211,238,0.04)] backdrop-blur-xl sm:p-5">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-200">
              Recent Payments
            </p>
            <div className="mt-4 grid gap-3">
              {mode === "auth" ? (
                payments.length > 0 ? (
                  payments.slice(0, 4).map((payment) => (
                    <article
                      key={payment.id}
                      className="rounded-2xl border border-white/10 bg-black/24 p-3"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <p className="font-black text-white">
                            {formatCurrency(payment.amount)}
                          </p>
                          <p className="mt-1 text-xs font-bold text-zinc-500">
                            {formatDate(payment.paid_at ?? payment.created_at)}
                          </p>
                        </div>
                        <StatusPill status={displayStatus(payment.status)} />
                      </div>
                    </article>
                  ))
                ) : (
                  <p className="rounded-2xl border border-white/10 bg-black/24 p-3 text-sm leading-6 text-zinc-300">
                    Payment history will appear here after Stripe Checkout and
                    webhook updates are connected.
                  </p>
                )
              ) : (
                portalPaymentHistory.map((payment) => (
                    <article
                      key={`${payment.invoice}-${payment.date}`}
                      className="rounded-2xl border border-white/10 bg-black/24 p-3"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <p className="font-black text-white">
                            {payment.invoice}
                          </p>
                          <p className="mt-1 text-xs font-bold text-zinc-500">
                            {payment.date}
                          </p>
                        </div>
                        <StatusPill status={payment.status} />
                      </div>
                      <p className="mt-2 text-lg font-black text-zinc-100">
                        {payment.amount}
                      </p>
                    </article>
                  ))
              )}
            </div>
          </section>

          <section className="rounded-[1.25rem] border border-violet-300/14 bg-violet-500/[0.06] px-4 py-4 text-sm leading-6 text-zinc-300">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-100">
              Future Billing Hooks
            </p>
            <p className="mt-2">
              Prepared for invoices, invoice_items, payments, Stripe Checkout,
              invoice PDFs, and webhook-driven payment status updates.
            </p>
          </section>
        </aside>
      </section>

      {detailInvoice ? (
        <InvoiceDetailDrawer
          invoice={detailInvoice}
          onClose={() => setDetailInvoice(null)}
        />
      ) : null}

      {paymentInvoice ? (
        <PaymentPreviewModal
          invoice={paymentInvoice}
          message={paymentMessage}
          onClose={() => setPaymentInvoice(null)}
        />
      ) : null}
    </div>
  );
}
