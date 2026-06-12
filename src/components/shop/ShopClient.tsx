"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";
import type { Product, CategorySlug } from "@/data/products";
import { getProducts, getCategories, type Category } from "@/lib/productStore";
import ProductCard from "@/components/product/ProductCard";

const CAPACITIES = ["500ml", "750ml", "1L", "2L"] as const;

export default function ShopClient() {
  const params = useSearchParams();
  const initialCat = (params.get("category") as CategorySlug | null) ?? "all";
  const [cat, setCat] = useState<string>(initialCat);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [caps, setCaps] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(120000);
  const [sort, setSort] = useState(params.get("sort") === "new" ? "new" : "recommended");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const load = useCallback(() => {
    const p = getProducts();
    const c = getCategories();
    setProducts(p);
    setCategories(c);
    setLoaded(true);
  }, []);

  useEffect(() => {
    load();
    window.addEventListener("focus", load);
    window.addEventListener("storage", load);
    const interval = setInterval(load, 3000); // poll every 3s for new products
    return () => { window.removeEventListener("focus", load); window.removeEventListener("storage", load); clearInterval(interval); };
  }, [load]);

  const filtered = useMemo(() => {
    let list = products.filter(
      (p) =>
        (cat === "all" || p.category === cat) &&
        p.price <= maxPrice &&
        (caps.length === 0 || (p.capacities ?? []).some((c) => caps.includes(c)))
    );
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    if (sort === "new") list = [...list].sort((a, b) => (b.badge === "New" ? 1 : 0) - (a.badge === "New" ? 1 : 0));
    return list;
  }, [products, cat, caps, maxPrice, sort]);

  const toggleCap = (c: string) => setCaps((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));

  return (
    <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 lg:grid-cols-[16rem_1fr]">
      {/* Filters */}
      <aside className={`${filtersOpen ? "block" : "hidden"} h-fit rounded-2xl border border-silver bg-white p-5 shadow-card lg:block`}>
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 font-display font-bold text-navy"><SlidersHorizontal className="size-4" /> Filters</h2>
          <button onClick={() => { setCat("all"); setCaps([]); setMaxPrice(120000); }} className="text-xs font-semibold text-royal">Clear All</button>
        </div>

        <fieldset className="mt-5">
          <legend className="text-sm font-bold text-navy">Categories</legend>
          <div className="mt-3 space-y-2.5 text-sm">
            <label className="flex cursor-pointer items-center gap-2">
              <input type="radio" name="cat" checked={cat === "all"} onChange={() => setCat("all")} className="accent-royal" />
              All Categories <span className="ml-auto text-xs text-navy/45">({products.length})</span>
            </label>
            {categories.map((c) => (
              <label key={c.slug} className="flex cursor-pointer items-center gap-2">
                <input type="radio" name="cat" checked={cat === c.slug} onChange={() => setCat(c.slug)} className="accent-royal" />
                {c.name} <span className="ml-auto text-xs text-navy/45">({products.filter((p) => p.category === c.slug).length})</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="mt-6">
          <legend className="text-sm font-bold text-navy">Capacity</legend>
          <div className="mt-3 space-y-2.5 text-sm">
            {CAPACITIES.map((c) => (
              <label key={c} className="flex cursor-pointer items-center gap-2">
                <input type="checkbox" checked={caps.includes(c)} onChange={() => toggleCap(c)} className="accent-royal" /> {c}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="mt-6">
          <legend className="text-sm font-bold text-navy">Price Range</legend>
          <input type="range" min={10000} max={120000} step={1000} value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))} aria-label="Maximum price"
            className="mt-3 w-full accent-royal" />
          <div className="flex justify-between text-xs text-navy/55">
            <span>TZS 10,000</span><span>Up to TZS {maxPrice.toLocaleString()}</span>
          </div>
        </fieldset>
      </aside>

      {/* Grid */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-navy/65">
            {loaded ? `Showing ${filtered.length} of ${products.length} products` : "Loading products..."}
          </p>
          <div className="flex items-center gap-2">
            <button onClick={() => setFiltersOpen(!filtersOpen)} className="rounded-xl border border-silver bg-white px-3 py-2 text-sm font-semibold text-navy lg:hidden">
              Filters
            </button>
            <label className="flex items-center gap-2 text-sm text-navy/65">
              Sort by:
              <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-xl border border-silver bg-white px-3 py-2 text-sm font-semibold text-navy outline-none">
                <option value="recommended">Recommended</option>
                <option value="new">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </label>
          </div>
        </div>
        {loaded && filtered.length === 0 ? (
          <p className="mt-16 text-center text-sm text-navy/55">No products match these filters.</p>
        ) : (
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
            {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        )}
      </div>
    </div>
  );
}
