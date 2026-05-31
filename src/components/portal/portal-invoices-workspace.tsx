"use client";

import { useState } from "react";

import {
  portalInvoices,
  portalInvoiceSummary,
  portalPaymentHistory,
  statusTone,
} from "@/lib/portal-data";

type PortalInvoice = (typeof portalInvoices)[number];

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

function InvoiceDetailDrawer({
  invoice,
  onClose,
}: {
  invoice: PortalInvoice;
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
      <aside className="relative h-full w-full max-w-xl overflow-y-auto border-l border-white/10 bg-zinc-950/96 p-5 shadow-[0_0_70px_rgba(34,211,238,0.14)] sm:p-6">
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
            ["Amount", invoice.amount],
            ["Tax", invoice.tax],
            ["Total", invoice.total],
            ["Due Date", invoice.dueDate],
            ["Payment Status", invoice.status],
            ["Paid Date", invoice.paidDate || "Not paid yet"],
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
            Services
          </p>
          <div className="mt-3 grid gap-2">
            {invoice.services.map((service) => (
              <div
                key={service}
                className="grid grid-cols-[auto_minmax(0,1fr)] gap-2 text-sm leading-6 text-zinc-300"
              >
                <span className="mt-2 h-2 w-2 rounded-full bg-cyan-300/80" />
                <span>{service}</span>
              </div>
            ))}
          </div>
        </section>

        <p className="mt-5 rounded-2xl border border-cyan-300/14 bg-cyan-400/[0.06] px-4 py-3 text-xs leading-5 text-cyan-100">
          Future-ready invoice detail structure can hydrate from invoices,
          invoice_items, payments, and payment_history records.
        </p>

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
  onClose,
}: {
  invoice: PortalInvoice;
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
            Payment Method Placeholder
          </p>
          <p className="mt-2 text-sm leading-6 text-zinc-300">
            Saved card, ACH, Stripe Checkout, and invoice payment link options
            will live here once billing is connected.
          </p>
        </div>

        <p className="mt-4 rounded-2xl border border-cyan-300/14 bg-cyan-400/[0.06] px-4 py-3 text-xs leading-5 text-cyan-100">
          Future Stripe integration: create Checkout sessions, record payment
          intents, sync invoice status, and attach generated invoice PDFs.
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

export default function PortalInvoicesWorkspace() {
  const [detailInvoice, setDetailInvoice] = useState<PortalInvoice | null>(
    null,
  );
  const [paymentInvoice, setPaymentInvoice] = useState<PortalInvoice | null>(
    null,
  );

  return (
    <div className="grid gap-4">
      <section className="relative overflow-hidden rounded-[1.6rem] border border-cyan-300/18 bg-cyan-400/[0.055] p-4 shadow-[0_0_46px_rgba(34,211,238,0.08)] backdrop-blur-xl sm:p-6">
        <div className="absolute right-8 top-6 h-24 w-24 rounded-full border border-cyan-300/20 bg-cyan-400/10 blur-xl motion-safe:animate-pulse" />
        <div className="relative grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(22rem,0.95fr)] xl:items-end">
          <div className="min-w-0">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-200">
              Billing Workspace
            </p>
            <h2 className="mt-2 break-words text-3xl font-black text-white sm:text-5xl">
              Invoice Center
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-300">
              Manage billing, invoices, and payment activity.
            </p>
          </div>

          <div className="grid min-w-0 gap-3 sm:grid-cols-2">
            {portalInvoiceSummary.map((item) => (
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
              {portalInvoices.length} invoices
            </span>
          </div>

          <div className="mt-4 grid items-stretch gap-3 lg:grid-cols-2">
            {portalInvoices.map((invoice) => (
              <article
                key={invoice.invoiceNumber}
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
                      {invoice.amount}
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
                    onClick={() => setDetailInvoice(invoice)}
                    className="rounded-xl border border-white/10 bg-white/[0.045] px-3 py-2 text-xs font-black text-zinc-200 transition hover:border-cyan-300/28 hover:bg-cyan-400/10 hover:text-cyan-100"
                  >
                    View
                  </button>
                  <button
                    type="button"
                    className="rounded-xl border border-white/10 bg-white/[0.045] px-3 py-2 text-xs font-black text-zinc-200 transition hover:border-cyan-300/28 hover:bg-cyan-400/10 hover:text-cyan-100"
                  >
                    Download PDF
                  </button>
                  {invoice.status !== "Paid" && invoice.status !== "Draft" ? (
                    <button
                      type="button"
                      onClick={() => setPaymentInvoice(invoice)}
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
              {portalPaymentHistory.map((payment) => (
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
              ))}
            </div>
          </section>

          <section className="rounded-[1.25rem] border border-violet-300/14 bg-violet-500/[0.06] px-4 py-4 text-sm leading-6 text-zinc-300">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-100">
              Future Billing Hooks
            </p>
            <p className="mt-2">
              Prepared for invoices, invoice_items, payments, and
              payment_history with invoice_id, project_id, client_id, status,
              amount, due_date, and paid_date fields.
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
          onClose={() => setPaymentInvoice(null)}
        />
      ) : null}
    </div>
  );
}
