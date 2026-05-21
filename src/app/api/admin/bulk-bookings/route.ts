import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

import { requireAdminApiAuth } from "@/lib/admin-auth";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function POST(request: NextRequest) {
  const unauthorized = await requireAdminApiAuth();
  if (unauthorized) return unauthorized;

  try {
    const { action, ids } = await request.json();

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { error: "No bookings selected." },
        { status: 400 },
      );
    }

    if (action === "cancel") {
      const { error } = await supabase
        .from("bookings")
        .update({ status: "cancelled" })
        .in("id", ids);

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.json({ success: true });
    }

    if (action === "delete") {
      const { error } = await supabase.from("bookings").delete().in("id", ids);

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: "Invalid bulk action." },
      { status: 400 },
    );
  } catch {
    return NextResponse.json({ error: "Bulk action failed." }, { status: 500 });
  }
}
