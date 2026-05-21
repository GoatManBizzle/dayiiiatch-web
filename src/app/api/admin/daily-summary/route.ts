import { mkdir, writeFile } from "fs/promises";
import path from "path";

import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

import type { Booking } from "@/components/admin/booking-types";
import {
  buildDailySummary,
  canWriteLocalAutomationLog,
} from "@/lib/admin-automation";
import { requireAdminApiAuth } from "@/lib/admin-auth";

export const runtime = "nodejs";

const LOCAL_DAILY_LOG_DIR =
  "G:\\DAYIIIatchSolutions\\06-DAYIIIatch-AppMosphere\\DAYIIIatch-Web\\07-Exports\\Daily Logs";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function GET() {
  const unauthorized = await requireAdminApiAuth();
  if (unauthorized) return unauthorized;

  const { data, error } = await supabase
    .from("bookings")
    .select(
      "id, service, service_label, date, time, name, email, company, details, status",
    )
    .order("date", { ascending: true })
    .order("time", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const summary = buildDailySummary((data ?? []) as Booking[]);
  let localLog:
    | { written: true; filename: string; path: string }
    | { written: false; message: string } = {
    written: false,
    message: "Daily summary logging is only available in local admin mode.",
  };

  if (canWriteLocalAutomationLog()) {
    const filename = `DAYIIIatch-Daily-Summary-${summary.today}.json`;
    const filePath = path.join(LOCAL_DAILY_LOG_DIR, filename);

    await mkdir(LOCAL_DAILY_LOG_DIR, { recursive: true });
    await writeFile(filePath, JSON.stringify(summary, null, 2), "utf8");

    localLog = {
      written: true,
      filename,
      path: filePath,
    };
  }

  return NextResponse.json({
    success: true,
    ...summary,
    localLog,
  });
}
