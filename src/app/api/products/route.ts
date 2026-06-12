import { NextRequest, NextResponse } from "next/server";
import { supabase, supabaseAdmin } from "@/lib/supabase";

/** GET /api/products — public: list all active products */
export async function GET() {
  if (!supabase) return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });

  const { data, error } = await supabase
    .from("products")
    .select("*, category:categories(slug, name), images:product_images(url, alt, is_primary, sort_order)")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

/** POST /api/products — admin: add a new product */
export async function POST(req: NextRequest) {
  if (!supabaseAdmin) return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });

  const body = await req.json();
  const { name, slug, sku, category_slug, description, short_description, price, sale_price, capacities, colors, stock, badge } = body;

  // Find category ID
  const { data: cat } = await supabaseAdmin.from("categories").select("id").eq("slug", category_slug).single();

  const { data: product, error } = await supabaseAdmin.from("products").insert({
    sku,
    slug,
    name,
    description,
    short_description,
    category_id: cat?.id ?? null,
    price,
    sale_price: sale_price || null,
    capacities: capacities ?? [],
    colors: colors ?? [],
    badge: badge || null,
    is_active: true,
  }).select("id, sku").single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Add initial stock
  if (product && stock) {
    await supabaseAdmin.from("inventory").insert({
      product_id: product.id,
      variant: "default",
      stock: Number(stock),
    });
  }

  return NextResponse.json(product, { status: 201 });
}

/** DELETE /api/products — admin: soft-delete a product */
export async function DELETE(req: NextRequest) {
  if (!supabaseAdmin) return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });

  const body = await req.json();
  const id = body.sku ?? body.id;
  // Try by SKU first, then by UUID
  let error;
  if (id?.startsWith("PB-")) {
    ({ error } = await supabaseAdmin.from("products").update({ is_active: false }).eq("sku", id));
  } else {
    ({ error } = await supabaseAdmin.from("products").update({ is_active: false }).eq("id", id));
  }
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ deleted: true });
}
