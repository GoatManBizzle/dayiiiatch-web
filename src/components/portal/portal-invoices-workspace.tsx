"use client";

import { useState } from "react";

import { portalInvoices, portalInvoiceSummary, statusTone } from "@/lib/portal-data";

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
            ["Amount", invoice.amount],
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
            Payment Method
          </p>
          <p className="mt-2 text-sm leading-6 text-zinc-300">
            Placeholder for saved card, ACH, Stripe Checkout, or invoice payment
            link options.
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
  const [selectedInvoice, setSelectedInvoice] = useState<PortalInvoice | null>(
    null,
  );

  return (
    <>
      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {portalInvoiceSummary.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-4 shadow-[0_0_24px_rgba(34,211,238,0.035)]"
          >
            <p className="text-[10px] font-black uppercase tracking-[0.14em] text-zinc-500">
              {item.label}
            </p>
            <p className="mt-1 break-words text-2xl font-black text-white">
              {item.value}
            </p>
          </div>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-12">
        <div className="grid min-w-0 content-start gap-4 xl:col-span-4">
          <div className="rounded-[1.5rem] border border-cyan-300/16 bg-cyan-400/[0.055] p-4 shadow-[0_0_34px_rgba(34,211,238,0.05)] backdrop-blur-xl sm:p-5">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-100">
              Billing Workspace
            </p>
            <h2 className="mt-2 text-2xl font-black text-white">
              Invoice command center
            </h2>
            <p className="mt-3 text-sm leading-6 text-zinc-300">
              Preview invoice status, payment readiness, and future Stripe
              payment paths without connecting live billing yet.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
            {["Stripe Checkout", "Invoice PDFs", "Project Links"].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-black/24 px-3 py-3 text-sm font-bold text-zinc-200"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="min-w-0 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_0_34px_rgba(124,58,237,0.06)] backdrop-blur-xl sm:p-5 xl:col-span-8">
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
                      {invoice.invoiceNumber}
                    </p>
                    <h3 className="mt-2 break-words font-black text-white">
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
                      Due Date
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
                  <button className="rounded-xl border border-white/10 bg-white/[0.045] px-3 py-2 text-xs font-black text-zinc-200 transition hover:border-cyan-300/28 hover:bg-cyan-400/10 hover:text-cyan-100">
                    View
                  </button>
                  <button className="rounded-xl border border-white/10 bg-white/[0.045] px-3 py-2 text-xs font-black text-zinc-200 transition hover:border-cyan-300/28 hover:bg-cyan-400/10 hover:text-cyan-100">
                    Download PDF
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedInvoice(invoice)}
                    className="rounded-xl border border-cyan-300/24 bg-cyan-400/10 px-3 py-2 text-xs font-black text-cyan-100 transition hover:bg-cyan-400/18"
                  >
                    Pay Now
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-[1.25rem] border border-cyan-300/14 bg-cyan-400/[0.06] px-4 py-3 text-xs leading-5 text-cyan-100 shadow-[0_0_24px_rgba(34,211,238,0.04)]">
        Future billing hooks: Stripe Checkout, invoices table, payments table,
        generated invoice PDFs, and client_id/project_id relationships.
      </section>

      {selectedInvoice ? (
        <PaymentPreviewModal
          invoice={selectedInvoice}
          onClose={() => setSelectedInvoice(null)}
        />
      ) : null}
    </>
  );
}
