import type { Product, CategorySlug } from "@/data/products";

/**
 * Product store — all reads/writes go through Supabase API routes.
 * No localStorage. Supabase is the single source of truth.
 */

export type Category = { slug: CategorySlug; name: string; count: string; tint: string };

// ── Products ───────────────────────────────────────────────────

export async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch("/api/products", { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    if (!Array.isArray(data)) return [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return data.map((p: any) => mapProduct(p));
  } catch { return []; }
}

export async function addProduct(p: Product): Promise<boolean> {
  try {
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: p.name, slug: p.slug, sku: p.id, category_slug: p.category,
        description: p.description, short_description: p.shortDescription,
        price: p.oldPrice ?? p.price, sale_price: p.oldPrice ? p.price : null,
        capacities: p.capacities, colors: p.colors, stock: p.stock, badge: p.badge,
      }),
    });
    return res.ok;
  } catch { return false; }
}

export async function deleteProduct(id: string): Promise<void> {
  try { await fetch("/api/products", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ sku: id }) }); } catch { /* ok */ }
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const all = await getProducts();
  return all.find((p) => p.slug === slug);
}

export async function getProductsByCategory(cat: CategorySlug): Promise<Product[]> {
  const all = await getProducts();
  return all.filter((p) => p.category === cat);
}

export async function getBestSellers(): Promise<Product[]> {
  const all = await getProducts();
  return [...all].sort((a, b) => b.reviews - a.reviews).slice(0, 8);
}

export async function getFlashSaleProducts(): Promise<Product[]> {
  const all = await getProducts();
  return all.filter((p) => p.oldPrice).slice(0, 4);
}

// ── Categories ─────────────────────────────────────────────────

export async function getCategories(): Promise<Category[]> {
  try {
    const res = await fetch("/api/categories", { cache: "no-store" });
    if (!res.ok) return defaultCategories();
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) return defaultCategories();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return data.map((c: any) => ({
      slug: c.slug as CategorySlug,
      name: c.name ?? c.slug,
      count: "—",
      tint: TINTS[c.slug as string] ?? "from-slate-200 to-slate-400",
    }));
  } catch { return defaultCategories(); }
}

const TINTS: Record<string, string> = {
  "thermal-flasks": "from-slate-200 to-slate-400",
  "water-bottles": "from-ice to-blue-300",
  "sports-bottles": "from-emerald-100 to-slate-300",
  "kids-bottles": "from-purple-100 to-purple-300",
  "coffee-tumblers": "from-stone-200 to-stone-400",
};

function defaultCategories(): Category[] {
  return [
    { slug: "thermal-flasks" as CategorySlug, name: "Thermal Flasks", count: "—", tint: "from-slate-200 to-slate-400" },
    { slug: "water-bottles" as CategorySlug, name: "Water Bottles", count: "—", tint: "from-ice to-blue-300" },
    { slug: "sports-bottles" as CategorySlug, name: "Sports Bottles", count: "—", tint: "from-emerald-100 to-slate-300" },
    { slug: "kids-bottles" as CategorySlug, name: "Kids Bottles", count: "—", tint: "from-purple-100 to-purple-300" },
    { slug: "coffee-tumblers" as CategorySlug, name: "Coffee Tumblers", count: "—", tint: "from-stone-200 to-stone-400" },
  ];
}

// ── Helpers ────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapProduct(p: any): Product {
  const cat = (p.category?.slug ?? p.category_slug ?? "water-bottles") as CategorySlug;
  const colors = Array.isArray(p.colors) ? p.colors : [];
  const capacities = Array.isArray(p.capacities) ? p.capacities : [];
  const shapeMap: Record<string, Product["visual"]["shape"]> = {
    "thermal-flasks": "flask", "water-bottles": "bottle", "sports-bottles": "sport",
    "kids-bottles": "kids", "coffee-tumblers": "tumbler",
  };
  return {
    id: String(p.sku ?? p.id ?? ""),
    slug: String(p.slug ?? ""),
    name: String(p.name ?? ""),
    category: cat,
    capacity: capacities[0] ?? "500ml",
    capacities,
    colors,
    price: Number(p.sale_price ?? p.price ?? 0),
    oldPrice: p.sale_price ? Number(p.price) : undefined,
    rating: Number(p.rating ?? 0),
    reviews: 0,
    stock: Number(p.stock ?? p.inventory?.[0]?.stock ?? 50),
    badge: p.badge || undefined,
    description: String(p.description ?? ""),
    shortDescription: String(p.short_description ?? ""),
    visual: {
      body: colors[0]?.hex ?? "#16181d",
      accent: colors[1]?.hex ?? colors[0]?.hex ?? "#3a3f4a",
      shape: shapeMap[cat] ?? "bottle",
    },
  };
}

export function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function nextProductId(): string {
  return `PB-${Date.now().toString().slice(-4)}`;
}

// Re-export for admin pages that use saveProducts/saveCategories (now no-ops)
export function saveProducts() {}
export function saveCategories() {}
