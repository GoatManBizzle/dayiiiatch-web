import { NextResponse } from "next/server";

export async function POST() {
  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({
      ok: true,
      mode: "placeholder",
      message:
        "Stripe webhook placeholder ready. Configure STRIPE_WEBHOOK_SECRET before verifying events and updating invoice/payment records.",
    });
  }

  return NextResponse.json({
    ok: true,
    mode: "stripe-prepared",
    message:
      "Webhook secret detected. Event verification and payment status persistence will be enabled when Stripe SDK wiring is completed.",
  });
}
