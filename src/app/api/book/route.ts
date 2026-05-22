import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const resendKey = process.env.RESEND_API_KEY;

// Env checklist:
// - NEXT_PUBLIC_SUPABASE_URL is safe to expose and is used by server routes.
// - NEXT_PUBLIC_SUPABASE_ANON_KEY is not currently read by app code.
// - SUPABASE_SERVICE_ROLE_KEY must stay server-only in route handlers/admin pages.
// - RESEND_API_KEY, BOOKING_FROM_EMAIL, and BOOKING_ADMIN_EMAIL drive email delivery.
if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables.");
}

const supabase = createClient(supabaseUrl, supabaseKey);
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

type ServiceKey = "free-call" | "premium-session";

const SERVICE_LABELS: Record<ServiceKey, string> = {
  "free-call": "Free Strategy Call",
  "premium-session": "Premium Strategy Session",
};

function isValidService(service: string): service is ServiceKey {
  return service === "free-call" || service === "premium-session";
}

function isValidDate(date: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(date);
}

function isValidTime(time: string) {
  return /^\d{2}:\d{2}$/.test(time);
}

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

function isValidEmailAddress(value: string) {
  return /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(value);
}

function isValidFromEmail(value: string) {
  return isValidEmailAddress(extractEmailAddress(value.trim()));
}

function getEmailConfigIssue() {
  if (!resend) {
    return "RESEND_API_KEY is missing.";
  }

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

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const service = searchParams.get("service") ?? "";
  const date = searchParams.get("date") ?? "";

  if (!isValidService(service) || !isValidDate(date)) {
    return NextResponse.json(
      { error: "Missing or invalid service/date." },
      { status: 400 },
    );
  }

  const { data, error } = await supabase
    .from("bookings")
    .select("time")
    .eq("service", service)
    .eq("date", date)
    .in("status", ["confirmed", "pending"]);

  if (error) {
    return NextResponse.json(
      { error: "Failed to load booked slots.", details: error.message },
      { status: 500 },
    );
  }

  return NextResponse.json({
    bookedTimes: (data ?? []).map((row) => row.time),
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const service = String(body.service ?? "");
    const date = String(body.date ?? body.preferredDate ?? "");
    const time = String(body.time ?? body.preferredTime ?? "");
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const company = String(body.company ?? "").trim();
    const details = String(
      body.details ?? body.notes ?? body.message ?? "",
    ).trim();

    if (
      !isValidService(service) ||
      !isValidDate(date) ||
      !isValidTime(time) ||
      !name ||
      !isValidEmailAddress(email)
    ) {
      return NextResponse.json(
        { error: "Missing or invalid booking fields." },
        { status: 400 },
      );
    }

    const { data: existingBooking, error: existingError } = await supabase
      .from("bookings")
      .select("id")
      .eq("service", service)
      .eq("date", date)
      .eq("time", time)
      .in("status", ["confirmed", "pending"])
      .maybeSingle();

    if (existingError) {
      return NextResponse.json(
        {
          error: "Failed to verify booking availability.",
          details: existingError.message,
        },
        { status: 500 },
      );
    }

    if (existingBooking) {
      return NextResponse.json(
        { error: "That slot was just taken. Please choose another time." },
        { status: 409 },
      );
    }

    const serviceLabel = SERVICE_LABELS[service];
    const combinedDetails = phone
      ? `Phone: ${phone}\n\n${details || "No notes provided."}`
      : details || "No notes provided.";

    const { data: insertedBooking, error: insertError } = await supabase
      .from("bookings")
      .insert({
        service,
        service_label: serviceLabel,
        date,
        time,
        name,
        email,
        company,
        details: combinedDetails,
        status: "confirmed",
      })
      .select("id, service_label, date, time, name, email, company, details")
      .single();

    if (insertError) {
      return NextResponse.json(
        {
          error: "Failed to save booking.",
          details: insertError.message,
          code: insertError.code,
        },
        { status: 500 },
      );
    }

    const emailConfigIssue = getEmailConfigIssue();

    if (emailConfigIssue) {
      console.error("DAYIIIatch booking email config issue:", {
        bookingId: insertedBooking.id,
        issue: emailConfigIssue,
        hasResendKey: Boolean(resendKey),
        fromEmailConfigured: Boolean(process.env.BOOKING_FROM_EMAIL),
        adminEmailCount: ADMIN_EMAILS.length,
      });

      return NextResponse.json({
        success: true,
        bookingId: insertedBooking.id,
        email: {
          sent: false,
          warning: `Booking saved, but email was not sent: ${emailConfigIssue}`,
        },
      });
    }

    const emailClient = resend;
    if (!emailClient) {
      return NextResponse.json({
        success: true,
        bookingId: insertedBooking.id,
        email: {
          sent: false,
          warning: "Booking saved, but email was not sent.",
        },
      });
    }

    const duration = service === "free-call" ? "15 minutes" : "30+ minutes";

    try {
      const clientEmail = await emailClient.emails.send({
        from: FROM_EMAIL,
        to: [email],
        subject: `Booking Request Received - ${serviceLabel}`,
        html: `
          <div style="font-family:Arial,sans-serif;color:#111;line-height:1.6;">
            <h2>DAYIIIatch Solutions received your booking request.</h2>
            <p>We got your request and will confirm everything soon.</p>
            <p><strong>Service:</strong> ${safeText(serviceLabel)}</p>
            <p><strong>Date:</strong> ${safeText(date)}</p>
            <p><strong>Time:</strong> ${safeText(time)}</p>
            <p><strong>Duration:</strong> ${safeText(duration)}</p>
          </div>
        `,
      });

      const adminEmail = await emailClient.emails.send({
        from: FROM_EMAIL,
        to: ADMIN_EMAILS,
        subject: `New Booking Request - ${serviceLabel}`,
        html: `
          <div style="font-family:Arial,sans-serif;color:#111;line-height:1.6;">
            <h2>New DAYIIIatch booking request.</h2>
            <p><strong>Name:</strong> ${safeText(name)}</p>
            <p><strong>Email:</strong> ${safeText(email)}</p>
            <p><strong>Phone:</strong> ${safeText(phone || "N/A")}</p>
            <hr />
            <p><strong>Service:</strong> ${safeText(serviceLabel)}</p>
            <p><strong>Date:</strong> ${safeText(date)}</p>
            <p><strong>Time:</strong> ${safeText(time)}</p>
            <p><strong>Duration:</strong> ${safeText(duration)}</p>
            <hr />
            <p><strong>Notes:</strong></p>
            <p>${safeText(details || "N/A")}</p>
          </div>
        `,
      });

      if (clientEmail.error || adminEmail.error) {
        const clientError = describeResendError(clientEmail.error);
        const adminError = describeResendError(adminEmail.error);

        console.error("DAYIIIatch booking email send failed:", {
          bookingId: insertedBooking.id,
          clientError,
          adminError,
          hasResendKey: Boolean(resendKey),
          fromEmailConfigured: Boolean(process.env.BOOKING_FROM_EMAIL),
          adminEmailCount: ADMIN_EMAILS.length,
        });

        return NextResponse.json({
          success: true,
          bookingId: insertedBooking.id,
          email: {
            sent: false,
            warning: "Booking saved, but one or more booking emails failed.",
            clientError,
            adminError,
          },
        });
      }

      return NextResponse.json({
        success: true,
        bookingId: insertedBooking.id,
        email: {
          sent: true,
          client: clientEmail.data?.id,
          admin: adminEmail.data?.id,
        },
      });
    } catch (emailError) {
      const deliveryError = describeResendError(emailError);

      console.error("DAYIIIatch booking email delivery threw:", {
        bookingId: insertedBooking.id,
        deliveryError,
        hasResendKey: Boolean(resendKey),
        fromEmailConfigured: Boolean(process.env.BOOKING_FROM_EMAIL),
        adminEmailCount: ADMIN_EMAILS.length,
      });

      return NextResponse.json({
        success: true,
        bookingId: insertedBooking.id,
        email: {
          sent: false,
          warning: "Booking saved, but email delivery failed.",
          error: deliveryError,
        },
      });
    }
  } catch (error) {
    console.error("DAYIIIatch unexpected booking error:", {
      message: error instanceof Error ? error.message : "Unknown error",
    });

    return NextResponse.json(
      { error: "Unexpected booking error." },
      { status: 500 },
    );
  }
}
