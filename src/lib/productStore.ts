import { PRODUCTS as SEED_PRODUCTS, CATEGORIES as SEED_CATEGORIES, type Product, type CategorySlug } from "@/data/products";

/**
 * Product store: tries Supabase API first, falls back to localStorage.
 * Admin writes go to API → Supabase; customer reads try API then localStorage.
 */

const PRODUCTS_KEY = "pb_products";
const CATEGORIES_KEY = "pb_categories";

// ── Local fallback ─────────────────────────────────────────────

function getLocalProducts(): Product[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(PRODUCTS_KEY);
  if (!raw) return [];
  try { return JSON.parse(raw) as Product[]; } catch { return []; }
}

function saveLocalProducts(list: Product[]) {
  if (typeof window !== "undefined") localStorage.setItem(PRODUCTS_KEY, JSON.stringify(list));
}

// ── Public read (tries API, falls back to local) ───────────────

export function getProducts(): Product[] {
  return getLocalProducts();
}

/** Async version that fetches from Supabase API if available */
export async function fetchProducts(): Promise<Product[]> {
  try {
    const res = await fetch("/api/products");
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        // Map Supabase schema to Product type
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const mapped: Product[] = data.map((p: any) => ({
          id: String(p.sku ?? p.id),
          slug: String(p.slug ?? ""),
          name: String(p.name ?? ""),
          category: (p.category?.slug ?? "water-bottles") as CategorySlug,
          capacity: (Array.isArray(p.capacities) ? p.capacities[0] : "500ml") as Product["capacity"],
          capacities: (Array.isArray(p.capacities) ? p.capacities : []) as Product["capacity"][],
          colors: Array.isArray(p.colors) ? p.colors : [],
          price: Number(p.sale_price ?? p.price ?? 0),
          oldPrice: p.sale_price ? Number(p.price) : undefined,
          rating: Number(p.rating ?? 0),
          reviews: 0,
          stock: 50,
          badge: p.badge || undefined,
          description: String(p.description ?? ""),
          shortDescription: String(p.short_description ?? ""),
          visual: {
            body: (Array.isArray(p.colors) && p.colors[0]?.hex) ? p.colors[0].hex : "#16181d",
            accent: (Array.isArray(p.colors) && p.colors[1]?.hex) ? p.colors[1].hex : "#3a3f4a",
            shape: categoryToShape((p.category?.slug ?? "water-bottles") as CategorySlug),
          },
        }));
        saveLocalProducts(mapped);
        return mapped;
      }
    }
  } catch { /* API unavailable — use local */ }
  return getLocalProducts();
}

function categoryToShape(cat: CategorySlug): Product["visual"]["shape"] {
  const map: Record<string, Product["visual"]["shape"]> = {
    "thermal-flasks": "flask", "water-bottles": "bottle", "sports-bottles": "sport",
    "kids-bottles": "kids", "coffee-tumblers": "tumbler",
  };
  return map[cat] ?? "bottle";
}

// ── Admin writes (API + local) ─────────────────────────────────

export async function addProduct(p: Product): Promise<boolean> {
  // Always save locally
  const all = getLocalProducts();
  saveLocalProducts([p, ...all]);

  // Also try Supabase API
  try {
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: p.name,
        slug: p.slug,
        sku: p.id,
        category_slug: p.category,
        description: p.description,
        short_description: p.shortDescription,
        price: p.oldPrice ?? p.price,
        sale_price: p.oldPrice ? p.price : null,
        capacities: p.capacities,
        colors: p.colors,
        stock: p.stock,
        badge: p.badge,
      }),
    });
    return res.ok;
  } catch { return false; }
}

export async function deleteProduct(id: string): Promise<void> {
  saveLocalProducts(getLocalProducts().filter((p) => p.id !== id));
  try { await fetch("/api/products", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) }); } catch { /* ok */ }
}

export function updateProduct(id: string, updates: Partial<Product>) {
  const all = getLocalProducts();
  saveLocalProducts(all.map((p) => (p.id === id ? { ...p, ...updates } : p)));
}

// ── Queries ────────────────────────────────────────────────────

export function getProductBySlug(slug: string): Product | undefined {
  return getProducts().find((p) => p.slug === slug);
}

export function getProductsByCategory(cat: CategorySlug): Product[] {
  return getProducts().filter((p) => p.category === cat);
}

export function getBestSellers(): Product[] {
  return [...getProducts()].sort((a, b) => b.reviews - a.reviews).slice(0, 8);
}

export function getFlashSaleProducts(): Product[] {
  return getProducts().filter((p) => p.oldPrice).slice(0, 4);
}

// ── Categories ─────────────────────────────────────────────────

export type Category = { slug: CategorySlug; name: string; count: string; tint: string };

export function getCategories(): Category[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(CATEGORIES_KEY);
  if (!raw) return [];
  try { return JSON.parse(raw) as Category[]; } catch { return []; }
}

export function saveCategories(list: Category[]) {
  if (typeof window !== "undefined") localStorage.setItem(CATEGORIES_KEY, JSON.stringify(list));
}

// ── Helpers ────────────────────────────────────────────────────

export function nextProductId(): string {
  const all = getProducts();
  const maxNum = all.reduce((mx, p) => {
    const n = parseInt(p.id.replace("PB-", ""), 10);
    return isNaN(n) ? mx : Math.max(mx, n);
  }, 1000);
  return `PB-${maxNum + 1}`;
}

export function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
