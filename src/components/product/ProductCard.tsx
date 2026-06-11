"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ShoppingCart } from "lucide-react";
import type { Product } from "@/data/products";
import { formatTZS } from "@/lib/constants";
import { useCart } from "@/store/cart";
import Bottle3D from "@/components/ui/Bottle3D";
import Stars from "@/components/ui/Stars";

export default function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const add = useCart((s) => s.add);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: (index % 4) * 0.07 }}
      className="group relative rounded-2xl border border-silver bg-white p-3 shadow-card transition-shadow hover:shadow-glass"
    >
      {product.badge && (
        <span className={`absolute left-3 top-3 z-10 rounded-md px-2 py-1 text-[10px] font-bold text-white ${product.badge === "New" ? "bg-emerald-500" : product.badge === "Best Seller" ? "bg-amber-500" : "bg-red-500"}`}>
          {product.badge}
        </span>
      )}
      <button aria-label={`Add ${product.name} to wishlist`} className="absolute right-3 top-3 z-10 rounded-full bg-white p-2 text-navy/50 shadow-card hover:text-red-500">
        <Heart className="size-4" />
      </button>

      <Link href={`/product/${product.slug}`} className="block">
        <div className="rounded-xl bg-gradient-to-b from-frost to-silver/50 p-4 transition-transform duration-300 group-hover:scale-[1.03]">
          <Bottle3D {...product.visual} className="mx-auto w-2/3" />
        </div>
        <h3 className="mt-3 truncate font-semibold text-navy">{product.name}</h3>
        <p className="text-xs text-navy/55">{product.capacity} · {product.colors[0].name}</p>
      </Link>

      <div className="mt-2 flex items-center justify-between">
        <div>
          <p className="font-display font-bold text-navy">
            {formatTZS(product.price)}
            {product.oldPrice && <span className="ml-2 text-xs font-normal text-navy/40 line-through">{formatTZS(product.oldPrice)}</span>}
          </p>
          <Stars rating={product.rating} reviews={product.reviews} />
        </div>
        <button
          onClick={() => add({ product, color: product.colors[0].name, capacity: product.capacity })}
          aria-label={`Add ${product.name} to cart`}
          className="rounded-xl border border-silver p-2.5 text-navy transition-colors hover:bg-royal hover:text-white"
        >
          <ShoppingCart className="size-4" />
        </button>
      </div>
    </motion.article>
  );
}
