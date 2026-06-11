import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Supabase client.
 * Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local
 * after running supabase/schema.sql. Until then the storefront uses the
 * local data layer, so the app works out of the box.
 */
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase: SupabaseClient | null = url && anonKey ? createClient(url, anonKey) : null;

export const isSupabaseConfigured = Boolean(supabase);

/** Insert a guest-checkout order into Supabase (used once env vars are set). */
export async function submitOrderToSupabase(payload: {
  fullName: string; phone: string; email?: string;
  region: string; district: string; address: string;
  payment: string; subtotal: number;
  items: { name: string; variant: string; price: number; qty: number }[];
}) {
  if (!supabase) return null;

  const paymentMap: Record<string, string> = {
    "M-Pesa": "mpesa", "Airtel Money": "airtel_money", "Mixx by Yas": "mixx_by_yas",
    "HaloPesa": "halopesa", "Cash on Delivery": "cash_on_delivery",
  };

  const { data: customer } = await supabase
    .from("customers")
    .upsert({ full_name: payload.fullName, phone: payload.phone, email: payload.email ?? null, region: payload.region, district: payload.district }, { onConflict: "phone" })
    .select("id")
    .single();

  const { data: order, error } = await supabase
    .from("orders")
    .insert({
      customer_id: customer?.id ?? null,
      payment_method: paymentMap[payload.payment] ?? "cash_on_delivery",
      subtotal: payload.subtotal,
      region: payload.region, district: payload.district, address: payload.address,
    })
    .select("id, order_number")
    .single();
  if (error || !order) throw error ?? new Error("Order insert failed");

  await supabase.from("order_items").insert(
    payload.items.map((i) => ({ order_id: order.id, product_name: i.name, variant: i.variant, unit_price: i.price, qty: i.qty }))
  );

  return order.order_number as string;
}
