"use client";

import { useMemo, useState } from "react";

import { formatBookingTime } from "@/components/admin/booking-utils";

type Props = {
  email: string;
  name: string;
  serviceLabel: string;
  date: string;
  time: string;
  status: string;
  onClose: () => void;
};

type TemplateKey =
  | "confirmation"
  | "reminder"
  | "follow-up"
  | "reschedule"
  | "cancellation"
  | "invoice";

type TemplateContext = {
  name: string;
  serviceLabel: string;
  date: string;
  time: string;
};

type EmailTemplate = {
  key: TemplateKey;
  label: string;
  subject: (context: TemplateContext) => string;
  body: (context: TemplateContext) => string;
};

const emailTemplates: EmailTemplate[] = [
  {
    key: "confirmation",
    label: "Confirmation",
    subject: ({ serviceLabel }) =>
      `DAYIIIatch Booking Confirmed - ${serviceLabel}`,
    body: ({ name, serviceLabel, date, time }) => `Hey ${name},

Your DAYIIIatch Solutions booking is confirmed.

Service: ${serviceLabel}
Date: ${date}
Time: ${time}

Looking forward to speaking with you.

DAYIIIatch Solutions`,
  },
  {
    key: "reminder",
    label: "Reminder",
    subject: ({ serviceLabel }) => `Reminder - ${serviceLabel}`,
    body: ({ name, serviceLabel, date, time }) => `Hey ${name},

Quick reminder about your upcoming DAYIIIatch Solutions booking.

Service: ${serviceLabel}
Date: ${date}
Time: ${time}

Please have any notes, links, or questions ready before the session.

DAYIIIatch Solutions`,
  },
  {
    key: "follow-up",
    label: "Follow-Up",
    subject: ({ serviceLabel }) => `Follow-Up - ${serviceLabel}`,
    body: ({ name, serviceLabel }) => `Hey ${name},

Following up on your DAYIIIatch Solutions ${serviceLabel}.

Here are the next steps:
- Review the notes from our conversation.
- Send over any missing links or details.
- Reply with questions or approval to move forward.

DAYIIIatch Solutions`,
  },
  {
    key: "reschedule",
    label: "Reschedule Notice",
    subject: ({ serviceLabel }) => `Reschedule Notice - ${serviceLabel}`,
    body: ({ name, serviceLabel, date, time }) => `Hey ${name},

Your DAYIIIatch Solutions booking has been rescheduled.

Service: ${serviceLabel}
New Date: ${date}
New Time: ${time}

Reply here if this time no longer works for you.

DAYIIIatch Solutions`,
  },
  {
    key: "cancellation",
    label: "Cancellation Notice",
    subject: ({ serviceLabel }) => `Cancellation Notice - ${serviceLabel}`,
    body: ({ name, serviceLabel, date, time }) => `Hey ${name},

Your DAYIIIatch Solutions booking has been cancelled.

Service: ${serviceLabel}
Date: ${date}
Time: ${time}

You can book a new time when you are ready.

DAYIIIatch Solutions`,
  },
  {
    key: "invoice",
    label: "Invoice / Payment Link",
    subject: ({ serviceLabel }) => `Invoice / Payment Link - ${serviceLabel}`,
    body: ({ name, serviceLabel }) => `Hey ${name},

Here is the payment link for your DAYIIIatch Solutions service.

Service: ${serviceLabel}
Payment Link: [ADD PAYMENT LINK HERE]

Once payment is complete, reply here so we can confirm the next step.

DAYIIIatch Solutions`,
  },
];

export default function EmailTemplateModal({
  email,
  name,
  serviceLabel,
  date,
  time,
  status,
  onClose,
}: Props) {
  const [selectedTemplateKey, setSelectedTemplateKey] =
    useState<TemplateKey>("confirmation");

  const context = useMemo(
    () => ({
      name,
      serviceLabel,
      date,
      time: formatBookingTime(time),
    }),
    [date, name, serviceLabel, time],
  );

  const selectedTemplate =
    emailTemplates.find((template) => template.key === selectedTemplateKey) ??
    emailTemplates[0];

  const subject = selectedTemplate.subject(context);
  const body = selectedTemplate.body(context);
  const mailtoHref = `mailto:${email}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-5 backdrop-blur-sm">
      <div className="relative max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#080b12] p-5 text-white shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-transparent to-violet-500/10" />

        <div className="relative flex max-h-[calc(90vh-2.5rem)] flex-col">
          <div className="flex shrink-0 items-start justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-200">
                Email Client
              </p>
              <h3 className="mt-2 text-2xl font-black">{name}</h3>
              <p className="mt-1 text-sm text-zinc-400">{email}</p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold hover:bg-white/10"
            >
              Close
            </button>
          </div>

          <div className="grid gap-4 overflow-y-auto pt-4 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="space-y-2">
              {emailTemplates.map((template) => (
                <button
                  key={template.key}
                  type="button"
                  onClick={() => setSelectedTemplateKey(template.key)}
                  className={`w-full rounded-2xl border px-4 py-3 text-left text-sm font-bold transition ${
                    selectedTemplateKey === template.key
                      ? "border-cyan-300 bg-cyan-400/15 text-cyan-100 shadow-[0_0_22px_rgba(34,211,238,0.18)]"
                      : "border-white/10 bg-black/30 text-zinc-300 hover:border-cyan-400/30 hover:bg-cyan-400/10"
                  }`}
                >
                  {template.label}
                </button>
              ))}
            </div>

            <div className="rounded-3xl border border-white/10 bg-black/25 p-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <Meta label="Service" value={serviceLabel} />
                <Meta label="Status" value={status} />
                <Meta label="Date" value={date} />
                <Meta label="Time" value={formatBookingTime(time)} />
              </div>

              <div className="mt-4 space-y-3">
                <PreviewBlock label="Subject" value={subject} />
                <PreviewBlock label="Body" value={body} multiline />
              </div>

              <a
                href={mailtoHref}
                className="mt-4 inline-flex w-full items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-400/10 px-5 py-3 text-sm font-black uppercase tracking-[0.18em] text-cyan-100 transition hover:bg-cyan-400/20"
              >
                Open Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
      <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
        {label}
      </p>
      <p className="mt-1 text-sm font-bold text-white">{value}</p>
    </div>
  );
}

function PreviewBlock({
  label,
  value,
  multiline,
}: {
  label: string;
  value: string;
  multiline?: boolean;
}) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">
        {label}
      </p>
      <div
        className={`mt-2 rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm leading-6 text-zinc-200 ${
          multiline ? "max-h-72 overflow-y-auto whitespace-pre-wrap" : ""
        }`}
      >
        {value}
      </div>
    </div>
  );
}
