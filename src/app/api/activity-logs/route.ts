import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET() {
  if (!supabaseAdmin) return NextResponse.json([]);
  const { data } = await supabaseAdmin.from("activity_logs").select("*, admin:admin_users(full_name)").order("created_at", { ascending: false }).limit(50);
  return NextResponse.json(data ?? []);
}
