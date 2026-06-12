"use client";
import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import type { Product } from "@/data/products";
import { getProductBySlug, getProductsByCategory } from "@/lib/productStore";
import ProductDetailClient from "./ProductDetailClient";

export default function DynamicProductLoader({ slug }: { slug: string }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    (async () => {
      const p = await getProductBySlug(slug);
      if (p) {
        setProduct(p);
        const rel = await getProductsByCategory(p.category);
        setRelated(rel.filter((r) => r.id !== p.id).slice(0, 4));
      }
      setChecked(true);
    })();
  }, [slug]);

  if (!checked) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="size-8 animate-spin rounded-full border-4 border-silver border-t-royal" />
      </div>
    );
  }

  if (!product) return notFound();
  return <ProductDetailClient product={product} related={related} />;
}
