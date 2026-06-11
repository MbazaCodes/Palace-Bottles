"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { CATEGORIES, PRODUCTS } from "@/data/products";
import Bottle3D from "@/components/ui/Bottle3D";

export default function Categories() {
  return (
    <section id="categories" className="mx-auto max-w-7xl px-4 py-16">
      <h2 className="text-center font-display text-3xl font-extrabold text-navy">
        Shop By <span className="text-royal">Category</span>
      </h2>
      <p className="mt-2 text-center text-sm text-navy/60">Find the perfect bottle for every occasion</p>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {CATEGORIES.map((c, i) => {
          const sample = PRODUCTS.find((p) => p.category === c.slug)!;
          return (
            <motion.div key={c.slug}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.45 }}>
              <Link href={`/shop?category=${c.slug}`}
                className={`group relative block overflow-hidden rounded-2xl bg-gradient-to-b ${c.tint} p-4 pb-14 shadow-card transition-shadow hover:shadow-glass`}>
                <Bottle3D {...sample.visual} className="mx-auto w-3/5 transition-transform duration-300 group-hover:-translate-y-1.5 group-hover:scale-105" label={false} />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-navy-night/85 to-transparent p-3 pt-8 text-white">
                  <div>
                    <p className="font-display text-sm font-bold">{c.name}</p>
                    <p className="text-[10px] text-white/70">{c.count}</p>
                  </div>
                  <span className="flex size-7 items-center justify-center rounded-full bg-white/15 transition-colors group-hover:bg-royal">
                    <ArrowRight className="size-3.5" />
                  </span>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
