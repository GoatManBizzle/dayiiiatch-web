import { Resend } from "resend";

const resendKey = process.env.RESEND_API_KEY;
const resend = resendKey ? new Resend(resendKey) : null;

const FROM_EMAIL =
  process.env.BOOKING_FROM_EMAIL ||
  "DAYIIIatch Workspace <onboarding@resend.dev>";

function safeText(value: unknown) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function extractEmailAddress(value: string) {
  const match = value.match(/<([^<>@\s]+@[^<>@\s]+\.[^<>@\s]+)>$/);
  return match?.[1] ?? value;
}

export function isValidInviteEmail(value: string) {
  return /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(value);
}

function isValidFromEmail(value: string) {
  return isValidInviteEmail(extractEmailAddress(value.trim()));
}

export function describePortalInviteError(error: unknown) {
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

export function getPortalInviteConfigIssue() {
  if (!resend) {
    return "RESEND_API_KEY is missing.";
  }

  if (!isValidFromEmail(FROM_EMAIL)) {
    return "BOOKING_FROM_EMAIL must be a valid email or Name <email@domain.com> value.";
  }

  return "";
}

export async function sendPortalInviteEmail({
  email,
  name,
  company,
  portalAccessUrl,
}: {
  email: string;
  name: string;
  company?: string | null;
  portalAccessUrl: string;
}) {
  const configIssue = getPortalInviteConfigIssue();

  if (configIssue || !resend) {
    return {
      sent: false,
      emailId: null,
      error: configIssue || "Resend is not configured.",
    };
  }

  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: [email],
      subject: "Your DAYIIIatch Workspace is ready",
      html: `
        <div style="font-family:Arial,sans-serif;color:#111;line-height:1.6;max-width:640px;margin:0 auto;">
          <h2>Your DAYIIIatch Workspace is ready.</h2>
          <p>Hi ${safeText(name)},</p>
          <p>Welcome to your DAYIIIatch client workspace${company ? ` for ${safeText(company)}` : ""}. This portal gives you one clear place to follow the project, review work, and keep the next steps moving.</p>
          <p>
            <a href="${safeText(portalAccessUrl)}" style="display:inline-block;background:#0891b2;color:#fff;text-decoration:none;padding:12px 18px;border-radius:12px;font-weight:700;">
              Set Up Workspace Password
            </a>
          </p>
          <p><strong>Inside the workspace you can:</strong></p>
          <ul>
            <li>Track project progress and milestones</li>
            <li>Upload brand assets, references, and project files</li>
            <li>Review deliverables and request revisions</li>
            <li>View bookings, invoices, and next actions</li>
          </ul>
          <p>If anything looks unclear, reply to this email and DAYIIIatch will help you get oriented.</p>
          <p>Talk soon,<br />DAYIIIatch Solutions</p>
        </div>
      `,
    });

    if (result.error) {
      return {
        sent: false,
        emailId: null,
        error: describePortalInviteError(result.error),
      };
    }

    return {
      sent: true,
      emailId: result.data?.id ?? null,
      error: "",
    };
  } catch (error) {
    return {
      sent: false,
      emailId: null,
      error: describePortalInviteError(error),
    };
  }
}
