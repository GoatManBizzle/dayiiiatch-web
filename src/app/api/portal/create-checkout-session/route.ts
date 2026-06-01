import { NextResponse } from "next/server";

export async function POST(request: Request) {
  let invoiceId: string | null = null;

  try {
    const body = (await request.json()) as { invoiceId?: string };
    invoiceId = body.invoiceId ?? null;
  } catch {
    invoiceId = null;
  }

  if (!invoiceId) {
    return NextResponse.json(
      {
        ok: false,
        message: "Invoice id is required to prepare Checkout.",
      },
      { status: 400 },
    );
  }

  const stripeConfigured = Boolean(
    process.env.STRIPE_SECRET_KEY &&
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  );

  if (!stripeConfigured) {
    return NextResponse.json({
      ok: true,
      mode: "placeholder",
      checkoutUrl: null,
      invoiceId,
      message:
        "Stripe Checkout placeholder ready. Add STRIPE_SECRET_KEY, NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY, and STRIPE_WEBHOOK_SECRET to create live Checkout sessions.",
    });
  }

  return NextResponse.json({
    ok: true,
    mode: "stripe-prepared",
    checkoutUrl: null,
    invoiceId,
    message:
      "Stripe keys are present, but live Checkout creation is intentionally disabled until the Stripe SDK and webhook workflow are finalized.",
  });
}
