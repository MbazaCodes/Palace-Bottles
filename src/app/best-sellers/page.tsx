"use client";
import PageHero from "@/components/ui/PageHero";
import ProductCard from "@/components/product/ProductCard";
import TrustBar from "@/components/home/TrustBar";
import { useEffect, useState } from "react";
import { bestSellers as seedBest } from "@/data/products";
import { getBestSellers } from "@/lib/productStore";

export default function BestSellersPage() {
  const [products, setProducts] = useState(seedBest());
  useEffect(() => { getBestSellers().then(setProducts); }, []);
  return (
    <>
      <PageHero
        title="Best Sellers"
        subtitle="Our most loved products, trusted by thousands of happy customers across Tanzania."
        crumbs={[["Home", "/"], ["Best Sellers", "/best-sellers"]]}
      />
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
          {products.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </div>
      <TrustBar dark={false} />
    </>
  );
}
