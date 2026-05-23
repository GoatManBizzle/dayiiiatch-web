import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const resendKey = process.env.RESEND_API_KEY;

const resend = resendKey ? new Resend(resendKey) : null;

const ADMIN_EMAILS = (
  process.env.BOOKING_ADMIN_EMAIL || "DAYIIIatchSolutions@outlook.com"
)
  .split(",")
  .map((email) => email.trim())
  .filter(Boolean);

const FROM_EMAIL =
  process.env.BOOKING_FROM_EMAIL ||
  "DAYIIIatch Scheduler <onboarding@resend.dev>";

function isValidEmailAddress(value: string) {
  return /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(value);
}

function extractEmailAddress(value: string) {
  const match = value.match(/<([^<>@\s]+@[^<>@\s]+\.[^<>@\s]+)>$/);
  return match?.[1] ?? value;
}

function isValidFromEmail(value: string) {
  return isValidEmailAddress(extractEmailAddress(value.trim()));
}

function safeText(value: unknown) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function isMissingLeadsTable(error: { code?: string; message?: string }) {
  const message = String(error.message ?? "").toLowerCase();

  return (
    error.code === "42P01" ||
    message.includes("could not find the table") ||
    (message.includes("relation") && message.includes("does not exist"))
  );
}

function describeResendError(error: unknown) {
  if (!error || typeof error !== "object") return "Unknown Resend error.";

  const maybeError = error as {
    message?: unknown;
    name?: unknown;
    statusCode?: unknown;
  };

  const parts = [
    typeof maybeError.name === "string" ? maybeError.name : "",
    typeof maybeError.statusCode === "number"
      ? `status ${maybeError.statusCode}`
      : "",
    typeof maybeError.message === "string" ? maybeError.message : "",
  ].filter(Boolean);

  return parts.join(": ") || "Unknown Resend error.";
}

function getEmailConfigIssue() {
  if (!resend) return "RESEND_API_KEY is missing.";

  if (!isValidFromEmail(FROM_EMAIL)) {
    return "BOOKING_FROM_EMAIL must be a valid email or Name <email@domain.com> value.";
  }

  if (ADMIN_EMAILS.length === 0) {
    return "BOOKING_ADMIN_EMAIL must include at least one email address.";
  }

  const invalidAdminEmail = ADMIN_EMAILS.find(
    (email) => !isValidEmailAddress(email),
  );

  if (invalidAdminEmail) {
    return "BOOKING_ADMIN_EMAIL contains an invalid email address.";
  }

  return "";
}

async function saveLead({
  email,
  name,
  source,
  interest,
  createdAt,
}: {
  email: string;
  name: string;
  source: string;
  interest: string;
  createdAt: string;
}) {
  if (!supabaseUrl || !supabaseKey) {
    console.error("DAYIIIatch lead capture Supabase env missing.", {
      hasSupabaseUrl: Boolean(supabaseUrl),
      hasServiceRoleKey: Boolean(supabaseKey),
    });

    return {
      stored: false,
      warning: "Lead capture placeholder mode: Supabase env is missing.",
    };
  }

  const supabase = createClient(supabaseUrl, supabaseKey);
  const { error } = await supabase.from("leads").insert({
    email,
    name: name || null,
    source,
    interest,
    created_at: createdAt,
  });

  if (!error) {
    return { stored: true, warning: "" };
  }

  console.error("DAYIIIatch lead capture insert issue.", {
    code: error.code,
    message: error.message,
  });

  if (isMissingLeadsTable(error)) {
    return {
      stored: false,
      warning:
        "Lead capture placeholder mode: Supabase leads table is not available yet.",
    };
  }

  return {
    stored: false,
    warning: "Lead capture received, but storage is temporarily unavailable.",
  };
}

async function sendLeadEmails({
  email,
  name,
  source,
  interest,
  createdAt,
}: {
  email: string;
  name: string;
  source: string;
  interest: string;
  createdAt: string;
}) {
  const emailConfigIssue = getEmailConfigIssue();

  if (emailConfigIssue) {
    console.error("DAYIIIatch audit checklist email config issue.", {
      issue: emailConfigIssue,
      resendKeyPresent: Boolean(resendKey),
      fromEmailPresent: Boolean(process.env.BOOKING_FROM_EMAIL),
      adminEmailPresent: ADMIN_EMAILS.length > 0,
      clientEmailValid: isValidEmailAddress(email),
    });

    return {
      sent: false,
      error: emailConfigIssue,
      clientError: "",
      adminError: "",
    };
  }

  const emailClient = resend;
  if (!emailClient) {
    return {
      sent: false,
      error: "RESEND_API_KEY is missing.",
      clientError: "",
      adminError: "",
    };
  }

  try {
    const clientEmail = await emailClient.emails.send({
      from: FROM_EMAIL,
      to: [email],
      subject: "Your DAYIIIatch audit checklist request",
      html: `
        <div style="font-family:Arial,sans-serif;color:#111;line-height:1.6;background:#f6f8fb;padding:24px;">
          <div style="max-width:680px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:18px;overflow:hidden;">
            <div style="background:#050816;color:#ffffff;padding:24px;">
              <p style="margin:0 0 8px 0;color:#67e8f9;font-size:12px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;">DAYIIIatch Solutions</p>
              <h2 style="margin:0;font-size:26px;line-height:1.2;">Website / Workflow Audit Checklist</h2>
              <p style="margin:12px 0 0 0;color:#d4d4d8;">Thanks for requesting the checklist. We received your request. Use this to spot what is clear, what is missing, and what should become a stronger system.</p>
            </div>

            <div style="padding:24px;">
              <p style="margin:0 0 18px 0;">Next step: review the checklist below, then book a free call if you want help identifying what to fix first.</p>

              <div style="border:1px solid #dbeafe;border-radius:16px;padding:18px;margin-bottom:14px;background:#f8fbff;">
                <h3 style="margin:0 0 10px 0;color:#075985;">Website Presence</h3>
                <ul style="margin:0;padding-left:20px;">
                  <li>Is the homepage message clear within 5 seconds?</li>
                  <li>Are services easy to understand?</li>
                  <li>Are CTAs easy to find?</li>
                  <li>Does the site look trustworthy on mobile?</li>
                </ul>
              </div>

              <div style="border:1px solid #ede9fe;border-radius:16px;padding:18px;margin-bottom:14px;background:#fbfaff;">
                <h3 style="margin:0 0 10px 0;color:#6d28d9;">Booking / Lead Flow</h3>
                <ul style="margin:0;padding-left:20px;">
                  <li>Can visitors book or contact without confusion?</li>
                  <li>Are emails/notifications working?</li>
                  <li>Is there a clear next step after submission?</li>
                </ul>
              </div>

              <div style="border:1px solid #cffafe;border-radius:16px;padding:18px;margin-bottom:14px;background:#f0fdff;">
                <h3 style="margin:0 0 10px 0;color:#0e7490;">Workflow / Automation</h3>
                <ul style="margin:0;padding-left:20px;">
                  <li>What task is still being done manually?</li>
                  <li>What could be automated?</li>
                  <li>Where are leads, notes, and client details stored?</li>
                </ul>
              </div>

              <div style="border:1px solid #e5e7eb;border-radius:16px;padding:18px;margin-bottom:20px;background:#fafafa;">
                <h3 style="margin:0 0 10px 0;color:#18181b;">Brand / Trust</h3>
                <ul style="margin:0;padding-left:20px;">
                  <li>Does the site look consistent?</li>
                  <li>Are proof/results visible?</li>
                  <li>Are pricing or next steps clear?</li>
                </ul>
              </div>

              <div style="display:block;margin-top:18px;">
                <a href="/book?service=free-call" style="display:inline-block;margin:0 10px 10px 0;padding:12px 16px;border-radius:12px;background:#020617;color:#ffffff;text-decoration:none;font-weight:700;">Book Free Call</a>
                <a href="/#contact-form" style="display:inline-block;margin:0 0 10px 0;padding:12px 16px;border-radius:12px;background:#0891b2;color:#ffffff;text-decoration:none;font-weight:700;">Send Project Inquiry</a>
              </div>
            </div>
          </div>
        </div>
      `,
    });

    const adminEmail = await emailClient.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAILS,
      subject: "New Audit Checklist Lead",
      html: `
        <div style="font-family:Arial,sans-serif;color:#111;line-height:1.6;">
          <h2>New Audit Checklist Lead</h2>
          <p><strong>Name:</strong> ${safeText(name || "N/A")}</p>
          <p><strong>Email:</strong> ${safeText(email)}</p>
          <p><strong>Source:</strong> ${safeText(source)}</p>
          <p><strong>Interest:</strong> ${safeText(interest)}</p>
          <p><strong>Created:</strong> ${safeText(createdAt)}</p>
          <p><strong>Status:</strong> Checklist email sent to lead.</p>
        </div>
      `,
    });

    if (clientEmail.error || adminEmail.error) {
      const clientError = describeResendError(clientEmail.error);
      const adminError = describeResendError(adminEmail.error);

      console.error("DAYIIIatch audit checklist email send failed.", {
        clientError,
        adminError,
        resendKeyPresent: Boolean(resendKey),
        fromEmailPresent: Boolean(process.env.BOOKING_FROM_EMAIL),
        adminEmailPresent: ADMIN_EMAILS.length > 0,
      });

      return {
        sent: false,
        error: "Resend returned an email send error.",
        clientError,
        adminError,
      };
    }

    return {
      sent: true,
      error: "",
      clientError: "",
      adminError: "",
    };
  } catch (error) {
    const deliveryError = describeResendError(error);

    console.error("DAYIIIatch audit checklist email delivery threw.", {
      deliveryError,
      resendKeyPresent: Boolean(resendKey),
      fromEmailPresent: Boolean(process.env.BOOKING_FROM_EMAIL),
      adminEmailPresent: ADMIN_EMAILS.length > 0,
    });

    return {
      sent: false,
      error: deliveryError,
      clientError: "",
      adminError: "",
    };
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = String(body.email ?? "").trim().toLowerCase();
    const name = String(body.name ?? "").trim();
    const source = "homepage";
    const interest = "audit-checklist";
    const createdAt = new Date().toISOString();

    if (!isValidEmailAddress(email)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    const storage = await saveLead({
      email,
      name,
      source,
      interest,
      createdAt,
    });

    const emailResult = await sendLeadEmails({
      email,
      name,
      source,
      interest,
      createdAt,
    });

    return NextResponse.json({
      success: true,
      stored: storage.stored,
      storageWarning: storage.warning,
      message: emailResult.sent
        ? "Checklist request received. Check your email."
        : "Checklist request saved, but email delivery failed.",
      email: {
        sent: emailResult.sent,
        error: emailResult.error,
        clientError: emailResult.clientError,
        adminError: emailResult.adminError,
      },
    });
  } catch (error) {
    console.error("DAYIIIatch unexpected lead capture error.", {
      message: error instanceof Error ? error.message : "Unknown error",
    });

    return NextResponse.json(
      { success: false, error: "Unable to send checklist request." },
      { status: 500 },
    );
  }
}
