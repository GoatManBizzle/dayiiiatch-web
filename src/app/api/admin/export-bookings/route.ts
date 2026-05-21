import { exec } from "child_process";
import { mkdir, writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

import { requireAdminApiAuth } from "@/lib/admin-auth";

export const runtime = "nodejs";

const ROOT_EXPORT_DIR =
  "G:\\DAYIIIatchSolutions\\06-DAYIIIatch-AppMosphere\\DAYIIIatch-Web\\07-Exports";

const CSV_DIR = path.join(ROOT_EXPORT_DIR, "CSV Reports");
const PDF_DIR = path.join(ROOT_EXPORT_DIR, "PDF Reports");
const LOG_DIR = path.join(ROOT_EXPORT_DIR, "Daily Logs");
const INVOICE_DIR = path.join(ROOT_EXPORT_DIR, "Client Invoices");

type BookingExport = {
  id: string;
  date: string;
  time: string;
  service: string;
  service_label: string;
  name: string;
  email: string;
  company?: string | null;
  status: string;
  details?: string | null;
};

function csvSafe(value: string | null | undefined) {
  return `"${String(value ?? "").replace(/"/g, '""')}"`;
}

function getWeekOfMonth(date: Date) {
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  return Math.ceil((date.getDate() + firstDay.getDay()) / 7);
}

function buildFileName(mode: string) {
  const now = new Date();

  const month = now.toLocaleString("en-US", {
    month: "long",
  });

  const week = getWeekOfMonth(now);

  const cleanMode =
    mode.charAt(0).toUpperCase() + mode.slice(1).replace(/-/g, "");

  return `DAYIIIatch-Bookings-${month}-Week-${week}-${cleanMode}.csv`;
}

function canUseLocalFileExport() {
  return process.env.NODE_ENV !== "production" && process.env.VERCEL !== "1";
}

export async function POST(req: NextRequest) {
  const unauthorized = await requireAdminApiAuth();
  if (unauthorized) return unauthorized;

  try {
    const { bookings, mode, openFolder } = await req.json();

    if (!Array.isArray(bookings) || bookings.length === 0) {
      return NextResponse.json(
        { error: "No bookings to export." },
        { status: 400 },
      );
    }

    const headers = [
      "Date",
      "Time",
      "Service",
      "Client",
      "Email",
      "Company",
      "Status",
      "Notes",
    ];

    const rows = bookings.map((b: BookingExport) => [
      b.date,
      b.time,
      b.service_label,
      b.name,
      b.email,
      b.company ?? "",
      b.status,
      b.details ?? "",
    ]);

    const csv = [
      headers.map(csvSafe).join(","),
      ...rows.map((row) => row.map(csvSafe).join(",")),
    ].join("\n");

    // =========================================
    // FILE NAME
    // =========================================

    const filename = buildFileName(mode || "Filtered");

    if (!canUseLocalFileExport()) {
      return NextResponse.json({
        success: true,
        filename,
        count: bookings.length,
        localExport: false,
        message: "Local file export is only available in local admin mode.",
        csv,
      });
    }

    // =========================================
    // AUTO FOLDER CREATION
    // =========================================

    await mkdir(ROOT_EXPORT_DIR, { recursive: true });
    await mkdir(CSV_DIR, { recursive: true });
    await mkdir(PDF_DIR, { recursive: true });
    await mkdir(LOG_DIR, { recursive: true });
    await mkdir(INVOICE_DIR, { recursive: true });

    const filePath = path.join(CSV_DIR, filename);

    // =========================================
    // SAVE
    // =========================================

    await writeFile(filePath, csv, "utf8");

    // =========================================
    // AUTO OPEN
    // =========================================

    if (openFolder) {
      exec(`explorer.exe "${CSV_DIR}"`);
    }

    return NextResponse.json({
      success: true,
      filename,
      filePath,
      count: bookings.length,
      localExport: true,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Export failed.",
      },
      { status: 500 },
    );
  }
}
