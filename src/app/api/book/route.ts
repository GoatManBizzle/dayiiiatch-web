import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const resendKey = process.env.RESEND_API_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables.");
}

const supabase = createClient(supabaseUrl, supabaseKey);
const resend = resendKey ? new Resend(resendKey) : null;

const ADMIN_EMAIL =
  process.env.BOOKING_ADMIN_EMAIL || "DAYIIIatchSolutions@outlook.com";

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
      !email
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

    if (!resend) {
      return NextResponse.json({
        success: true,
        bookingId: insertedBooking.id,
        warning: "Booking saved, but RESEND_API_KEY is missing.",
      });
    }

    const duration = service === "free-call" ? "15 minutes" : "30+ minutes";

    const clientEmail = await resend.emails.send({
      from: FROM_EMAIL,
      to: [email],
      subject: `Booking Request Received — ${serviceLabel}`,
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

    const adminEmail = await resend.emails.send({
      from: FROM_EMAIL,
      to: [ADMIN_EMAIL],
      subject: `🚨 New Booking Request — ${serviceLabel}`,
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
      return NextResponse.json(
        {
          error: "Booking saved, but email failed.",
          resend: {
            clientError: clientEmail.error,
            adminError: adminEmail.error,
          },
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      bookingId: insertedBooking.id,
      email: {
        client: clientEmail.data?.id,
        admin: adminEmail.data?.id,
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Unexpected booking error." },
      { status: 500 },
    );
  }
}
