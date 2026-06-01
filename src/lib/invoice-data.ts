import { createClient } from "@supabase/supabase-js";

import { createActivityEvent } from "@/lib/activity-events";

export type InvoiceRow = {
  id: string;
  client_id: string | null;
  project_id: string | null;
  invoice_number: string;
  title: string | null;
  amount?: number | null;
  status: string;
  subtotal: number;
  tax: number;
  total: number;
  due_date: string | null;
  paid_date?: string | null;
  paid_at: string | null;
  stripe_checkout_session_id: string | null;
  stripe_payment_intent_id: string | null;
  created_at: string;
  updated_at: string;
};

export type InvoiceItemRow = {
  id: string;
  invoice_id: string | null;
  description: string;
  quantity: number;
  unit_price: number;
  line_total: number;
  created_at: string;
};

export type PaymentRow = {
  id: string;
  invoice_id: string | null;
  client_id: string | null;
  amount: number;
  status: string;
  provider: string;
  provider_payment_id: string | null;
  paid_at: string | null;
  created_at: string;
};

export type InvoiceDataSet = {
  invoices: InvoiceRow[];
  items: InvoiceItemRow[];
  payments: PaymentRow[];
  source: "supabase" | "preview";
  error?: string;
};

function getServerSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return null;
  }

  return createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
    },
  });
}

export async function getPortalInvoiceData(
  clientId?: string | null,
): Promise<InvoiceDataSet> {
  if (!clientId) {
    return { invoices: [], items: [], payments: [], source: "preview" };
  }

  const supabase = getServerSupabaseClient();

  if (!supabase) {
    return {
      invoices: [],
      items: [],
      payments: [],
      source: "preview",
      error: "Supabase environment is not configured.",
    };
  }

  try {
    const { data: invoices, error: invoiceError } = await supabase
      .from("invoices")
      .select("*")
      .eq("client_id", clientId)
      .order("due_date", { ascending: true, nullsFirst: false });

    if (invoiceError) {
      return {
        invoices: [],
        items: [],
        payments: [],
        source: "preview",
        error: invoiceError.message,
      };
    }

    const invoiceIds = (invoices ?? []).map((invoice) => invoice.id);

    if (invoiceIds.length === 0) {
      return { invoices: [], items: [], payments: [], source: "supabase" };
    }

    const [items, payments] = await Promise.all([
      supabase
        .from("invoice_items")
        .select("*")
        .in("invoice_id", invoiceIds)
        .order("created_at", { ascending: true }),
      supabase
        .from("payments")
        .select("*")
        .in("invoice_id", invoiceIds)
        .order("created_at", { ascending: false }),
    ]);

    return {
      invoices: (invoices ?? []) as InvoiceRow[],
      items: (items.data ?? []) as InvoiceItemRow[],
      payments: (payments.data ?? []) as PaymentRow[],
      source: "supabase",
      error: items.error?.message ?? payments.error?.message,
    };
  } catch (error) {
    return {
      invoices: [],
      items: [],
      payments: [],
      source: "preview",
      error: error instanceof Error ? error.message : "Invoice read failed.",
    };
  }
}

export async function createInvoiceActivityEvent({
  clientId,
  projectId,
  eventType,
  title,
  description,
}: {
  clientId?: string | null;
  projectId?: string | null;
  eventType:
    | "invoice_created"
    | "invoice_viewed"
    | "payment_started"
    | "payment_completed";
  title: string;
  description: string;
}) {
  const result = await createActivityEvent({
    clientId,
    projectId,
    actorRole: "client",
    actorName: "Client",
    eventType,
    title,
    description,
  });

  return { error: result.error };
}

// Future Stripe flow:
// - POST /api/portal/create-checkout-session with invoice_id.
// - Server verifies client access, creates Stripe Checkout Session with STRIPE_SECRET_KEY.
// - Webhook verifies STRIPE_WEBHOOK_SECRET and writes payments + invoice status updates.
