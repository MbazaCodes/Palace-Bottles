import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET() {
  if (!supabaseAdmin) return NextResponse.json([]);
  const { data } = await supabaseAdmin.from("inventory").select("*, product:products(name, sku, slug, colors, category:categories(name, slug))").order("stock", { ascending: true }).limit(100);
  return NextResponse.json(data ?? []);
}
