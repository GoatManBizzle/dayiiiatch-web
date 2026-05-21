import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

import { isRescheduleTimeSlot } from "@/components/admin/booking-utils";
import { requireAdminApiAuth } from "@/lib/admin-auth";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

function isValidDate(date: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(date);
}

function getTodayDate() {
  const now = new Date();
  const localDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000);

  return localDate.toISOString().split("T")[0];
}

function buildDetailsWithNotes(details: string | null, notes: string) {
  const cleanNotes = notes.trim();

  if (!cleanNotes) return details;

  const stamp = new Date().toISOString();
  const internalNote = `[${stamp}] Reschedule note: ${cleanNotes}`;

  return [details?.trim(), internalNote].filter(Boolean).join("\n\n");
}

export async function POST(req: NextRequest) {
  const unauthorized = await requireAdminApiAuth();
  if (unauthorized) return unauthorized;

  try {
    const body = await req.json();
    const bookingId = String(body.bookingId ?? "").trim();
    const date = String(body.date ?? "").trim();
    const time = String(body.time ?? "").trim();
    const notes = String(body.notes ?? "").trim();

    if (!bookingId || !isValidDate(date) || !time) {
      return NextResponse.json(
        { error: "Missing or invalid reschedule fields." },
        { status: 400 },
      );
    }

    if (date < getTodayDate()) {
      return NextResponse.json(
        { error: "Reschedule date cannot be in the past." },
        { status: 400 },
      );
    }

    if (!isRescheduleTimeSlot(time)) {
      return NextResponse.json(
        { error: "Invalid reschedule time." },
        { status: 400 },
      );
    }

    const { data: booking, error: bookingError } = await supabase
      .from("bookings")
      .select("id, service, details")
      .eq("id", bookingId)
      .single();

    if (bookingError || !booking) {
      return NextResponse.json(
        { error: bookingError?.message || "Booking not found." },
        { status: 404 },
      );
    }

    const { data: existingBooking, error: existingError } = await supabase
      .from("bookings")
      .select("id")
      .eq("service", booking.service)
      .eq("date", date)
      .eq("time", time)
      .in("status", ["confirmed", "pending"])
      .neq("id", bookingId)
      .maybeSingle();

    if (existingError) {
      return NextResponse.json(
        { error: existingError.message },
        { status: 500 },
      );
    }

    if (existingBooking) {
      return NextResponse.json(
        { error: "That slot is already booked for this service." },
        { status: 409 },
      );
    }

    const { error } = await supabase
      .from("bookings")
      .update({
        date,
        time,
        status: "confirmed",
        details: buildDetailsWithNotes(booking.details, notes),
      })
      .eq("id", bookingId);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      bookingId,
      date,
      time,
      status: "confirmed",
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Reschedule failed.",
      },
      { status: 500 },
    );
  }
}
