import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

/** GET /api/categories — public: list active categories */
export async function GET() {
  if (!supabase) return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("is_active", true)
    .order("sort_order");

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
