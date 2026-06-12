import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET() {
  if (!supabaseAdmin) return NextResponse.json([]);
  const { data } = await supabaseAdmin.from("customers").select("*, orders:orders(id, order_number, subtotal, status, created_at)").order("created_at", { ascending: false }).limit(100);
  return NextResponse.json(data ?? []);
}
