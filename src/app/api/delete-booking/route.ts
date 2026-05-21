import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

import { requireAdminApiAuth } from "@/lib/admin-auth";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function POST(req: Request) {
  const unauthorized = await requireAdminApiAuth();
  if (unauthorized) return unauthorized;

  try {
    const { id } = await req.json();

    const { error } = await supabase.from("bookings").delete().eq("id", id);

    if (error) {
      return NextResponse.json({ error: "Delete failed" }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
    });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
