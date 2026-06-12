import { NextRequest, NextResponse } from "next/server";
import { supabase, supabaseAdmin } from "@/lib/supabase";

const PAYMENT_MAP: Record<string, string> = {
  "M-Pesa": "mpesa",
  "Airtel Money": "airtel_money",
  "Mixx by Yas": "mixx_by_yas",
  "HaloPesa": "halopesa",
  "Cash on Delivery": "cash_on_delivery",
};

/** POST /api/orders — guest checkout: create a new order */
export async function POST(req: NextRequest) {
  if (!supabase) return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });

  const body = await req.json();
  const { fullName, phone, email, region, district, address, payment, subtotal, items, paid, paymentReference } = body;

  // Upsert customer
  const { data: customer } = await supabase
    .from("customers")
    .upsert({ full_name: fullName, phone, email: email || null, region, district }, { onConflict: "phone" })
    .select("id")
    .single();

  // Create order
  const { data: order, error } = await supabase
    .from("orders")
    .insert({
      customer_id: customer?.id ?? null,
      payment_method: PAYMENT_MAP[payment] ?? "cash_on_delivery",
      subtotal,
      region,
      district,
      address,
      payment_status: paid ? "verified" : "pending",
      payment_reference: paymentReference || null,
    })
    .select("id, order_number")
    .single();

  if (error || !order) return NextResponse.json({ error: error?.message ?? "Order creation failed" }, { status: 500 });

  // Insert order items
  if (items?.length) {
    await supabase.from("order_items").insert(
      items.map((i: { name: string; variant: string; price: number; qty: number }) => ({
        order_id: order.id,
        product_name: i.name,
        variant: i.variant,
        unit_price: i.price,
        qty: i.qty,
      }))
    );
  }

  // Insert initial shipping status
  await supabase.from("shipping_status").insert({
    order_id: order.id,
    status: "pending",
    note: "Order placed",
  });

  return NextResponse.json({ order_number: order.order_number }, { status: 201 });
}

/** GET /api/orders — admin: list all orders */
export async function GET() {
  if (!supabaseAdmin) return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });

  const { data, error } = await supabaseAdmin
    .from("orders")
    .select("*, customer:customers(full_name, phone, email), items:order_items(*)")
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

/** PATCH /api/orders — admin: update order status */
export async function PATCH(req: NextRequest) {
  if (!supabaseAdmin) return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });

  const { order_number, status, payment_status, payment_reference } = await req.json();

  const updates: Record<string, unknown> = {};
  if (status) updates.status = status;
  if (payment_status) updates.payment_status = payment_status;
  if (payment_reference) updates.payment_reference = payment_reference;

  const { error } = await supabaseAdmin
    .from("orders")
    .update(updates)
    .eq("order_number", order_number);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Also log the status change in shipping_status
  const { data: order } = await supabaseAdmin.from("orders").select("id").eq("order_number", order_number).single();
  if (order) {
    await supabaseAdmin.from("shipping_status").insert({
      order_id: order.id,
      status,
      note: `Status changed to ${status}`,
    });
  }

  return NextResponse.json({ updated: true });
}
