import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables.");
}

const supabase = createClient(supabaseUrl, supabaseKey);
const resend = new Resend(process.env.RESEND_API_KEY);

const ADMIN_EMAIL =
  process.env.BOOKING_ADMIN_EMAIL || "DAYIIIatchSolutions@outlook.com";

type ServiceKey = "free-call" | "premium-session";

const SERVICE_LABELS: Record<ServiceKey, string> = {
  "free-call": "Free Strategy Call",
  "premium-session": "Premium Session",
};

function isValidService(service: string): service is ServiceKey {
  return service === "free-call" || service === "premium-session";
}

function isValidTime(time: string) {
  return /^\d{2}:\d{2}$/.test(time);
}

function isValidDate(date: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(date);
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const service = searchParams.get("service");
    const date = searchParams.get("date");

    if (!service || !date || !isValidService(service) || !isValidDate(date)) {
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
      console.error("GET /api/book Supabase error:", error);

      return NextResponse.json(
        {
          error: "Failed to load booked slots.",
          details: error.message,
          code: error.code,
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      bookedTimes: data.map((row) => row.time),
    });
  } catch (error) {
    console.error("GET /api/book unexpected error:", error);

    return NextResponse.json(
      { error: "Unexpected GET error." },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      service,
      date,
      time,
      name,
      email,
      company = "",
      details = "",
    } = body;

    if (
      !service ||
      !date ||
      !time ||
      !name ||
      !email ||
      !isValidService(service) ||
      !isValidDate(date) ||
      !isValidTime(time)
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
      console.error("POST availability check Supabase error:", existingError);

      return NextResponse.json(
        {
          error: "Failed to verify booking availability.",
          details: existingError.message,
          code: existingError.code,
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

    const { data: insertedBooking, error: insertError } = await supabase
      .from("bookings")
      .insert({
        service,
        service_label: SERVICE_LABELS[service],
        date,
        time,
        name,
        email,
        company,
        details,
        status: "confirmed",
      })
      .select("id, service_label, date, time, name, email, company, details")
      .single();

    if (insertError) {
      console.error("POST insert Supabase error:", insertError);

      const duplicateLike =
        insertError.message?.toLowerCase().includes("duplicate") ||
        insertError.message?.toLowerCase().includes("unique");

      return NextResponse.json(
        {
          error: duplicateLike
            ? "That slot is already booked. Please pick another one."
            : "Failed to save booking.",
          details: insertError.message,
          code: insertError.code,
        },
        { status: duplicateLike ? 409 : 500 },
      );
    }

    const serviceLabel = insertedBooking.service_label;

    const clientEmailPayload = {
      from:
        process.env.BOOKING_FROM_EMAIL ||
        "DAYIIIatch Scheduler <onboarding@resend.dev>",

      to: [email],

      subject: `Booking Confirmed — ${serviceLabel}`,

      html: `
        <div style="font-family:Arial,sans-serif;color:#111;">
          <h2>You're booked in.</h2>

          <p>Your session has been confirmed with DAYIIIatch Solutions.</p>

          <p><strong>Service:</strong> ${serviceLabel}</p>
          <p><strong>Date:</strong> ${date}</p>
          <p><strong>Time:</strong> ${time}</p>

          <p>We’ll tap in with you soon.</p>
        </div>
      `,
    };

    const adminEmailPayload = {
      from:
        process.env.BOOKING_FROM_EMAIL ||
        "DAYIIIatch Scheduler <onboarding@resend.dev>",

      to: [ADMIN_EMAIL],

      subject: `🚨 New Booking — ${serviceLabel}`,

      html: `
        <div style="font-family:Arial,sans-serif;color:#111;">
          <h2>New client booking received.</h2>

          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Company:</strong> ${company || "N/A"}</p>

          <hr />

          <p><strong>Service:</strong> ${serviceLabel}</p>
          <p><strong>Date:</strong> ${date}</p>
          <p><strong>Time:</strong> ${time}</p>

          <hr />

          <p><strong>Project Details:</strong></p>

          <p>${details}</p>
        </div>
      `,
    };

    console.log("CLIENT EMAIL TARGET:", email);
    console.log("ADMIN EMAIL TARGET:", ADMIN_EMAIL);

    const [clientEmailResult, adminEmailResult] = await Promise.allSettled([
      resend.emails.send(clientEmailPayload),
      resend.emails.send(adminEmailPayload),
    ]);

    console.log("CLIENT EMAIL RESULT:", clientEmailResult);
    console.log("ADMIN EMAIL RESULT:", adminEmailResult);

    return NextResponse.json({
      success: true,
      bookingId: insertedBooking.id,
    });
  } catch (error) {
    console.error("POST /api/book unexpected error:", error);

    return NextResponse.json(
      { error: "Unexpected booking error." },
      { status: 500 },
    );
  }
}
