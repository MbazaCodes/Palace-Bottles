import Link from "next/link";
import { bestSellers } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";

export default function BestSellers() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl font-extrabold text-navy sm:text-3xl">Best Sellers</h2>
        <Link href="/best-sellers" className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-navy shadow-card hover:shadow-glass">
          View All
        </Link>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {bestSellers().map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
    </section>
  );
}
