import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

import type { Booking } from "@/components/admin/booking-types";
import { requireAdminApiAuth } from "@/lib/admin-auth";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const resendKey = process.env.RESEND_API_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables.");
}

const supabase = createClient(supabaseUrl, supabaseKey);
const resend = resendKey ? new Resend(resendKey) : null;

const FROM_EMAIL =
  process.env.BOOKING_FROM_EMAIL ||
  "DAYIIIatch Scheduler <onboarding@resend.dev>";

function safeText(value: unknown) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function buildReminderEmail(booking: Booking) {
  return `
    <div style="font-family:Arial,sans-serif;color:#111;line-height:1.6;">
      <h2>Your DAYIIIatch Solutions booking is coming up.</h2>
      <p>Hi ${safeText(booking.name)},</p>
      <p>This is a quick reminder for your upcoming DAYIIIatch Solutions booking.</p>
      <p><strong>Service:</strong> ${safeText(booking.service_label)}</p>
      <p><strong>Date:</strong> ${safeText(booking.date)}</p>
      <p><strong>Time:</strong> ${safeText(booking.time)}</p>
      <p>If you need to make changes, reply to this email and we will help adjust the booking.</p>
      <p>See you soon,<br />DAYIIIatch Solutions</p>
    </div>
  `;
}

export async function POST(request: NextRequest) {
  const unauthorized = await requireAdminApiAuth();
  if (unauthorized) return unauthorized;

  try {
    const { bookingId } = await request.json();

    if (!bookingId || typeof bookingId !== "string") {
      return NextResponse.json(
        { error: "Missing bookingId." },
        { status: 400 },
      );
    }

    if (!resend) {
      return NextResponse.json(
        { error: "RESEND_API_KEY is missing. Reminder email was not sent." },
        { status: 503 },
      );
    }

    const { data: booking, error } = await supabase
      .from("bookings")
      .select(
        "id, service, service_label, date, time, name, email, company, details, status",
      )
      .eq("id", bookingId)
      .single();

    if (error || !booking) {
      return NextResponse.json(
        { error: error?.message || "Booking not found." },
        { status: 404 },
      );
    }

    const bookingData = booking as Booking;

    // Future automation hooks: 24-hour reminders, 1-hour reminders,
    // and post-session follow-up can reuse this template path safely.
    const reminderEmail = await resend.emails.send({
      from: FROM_EMAIL,
      to: [bookingData.email],
      subject: "Reminder: Your DAYIIIatch Solutions booking",
      html: buildReminderEmail(bookingData),
    });

    if (reminderEmail.error) {
      return NextResponse.json(
        {
          error: "Reminder email failed.",
          resend: reminderEmail.error,
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      bookingId: bookingData.id,
      emailId: reminderEmail.data?.id,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unexpected reminder email error.",
      },
      { status: 500 },
    );
  }
}
