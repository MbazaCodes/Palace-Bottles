import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

/** GET /api/orders/track?id=PB123456 — public: track order by order_number */
export async function GET(req: NextRequest) {
  if (!supabase) return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });

  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Order ID required" }, { status: 400 });

  const { data: order, error } = await supabase
    .from("orders")
    .select("*, customer:customers(full_name, phone, email), items:order_items(*), timeline:shipping_status(status, note, created_at)")
    .eq("order_number", id.toUpperCase())
    .single();

  if (error || !order) return NextResponse.json({ error: "Order not found" }, { status: 404 });
  return NextResponse.json(order);
}
