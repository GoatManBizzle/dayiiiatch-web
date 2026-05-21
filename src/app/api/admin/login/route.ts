import { NextResponse } from "next/server";

import {
  ADMIN_AUTH_COOKIE,
  getAdminAuthToken,
  getAdminPassword,
  isValidAdminPassword,
} from "@/lib/admin-auth";

export async function POST(req: Request) {
  try {
    if (!getAdminPassword()) {
      return NextResponse.json(
        { error: "ADMIN_DASHBOARD_PASSWORD is not configured." },
        { status: 500 },
      );
    }

    const body = await req.json();
    const password = String(body.password ?? "");

    if (!isValidAdminPassword(password)) {
      return NextResponse.json(
        { error: "Invalid admin password." },
        { status: 401 },
      );
    }

    const response = NextResponse.json({ success: true });

    response.cookies.set({
      name: ADMIN_AUTH_COOKIE,
      value: getAdminAuthToken(),
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Login failed." }, { status: 500 });
  }
}
