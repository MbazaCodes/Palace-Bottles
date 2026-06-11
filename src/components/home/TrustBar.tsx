"use client";
import { motion } from "framer-motion";
import { Truck, ShieldCheck, CreditCard, Headphones } from "lucide-react";

const ITEMS = [
  { icon: Truck, title: "Nationwide Delivery", sub: "Across Tanzania Mainland & Zanzibar" },
  { icon: ShieldCheck, title: "Premium Quality", sub: "100% Original & Durable Products" },
  { icon: CreditCard, title: "Secure Payments", sub: "Mobile Money & Cash on Delivery" },
  { icon: Headphones, title: "Customer Support", sub: "We're here to help you anytime" },
];

export default function TrustBar({ dark = true }: { dark?: boolean }) {
  return (
    <section className={dark ? "bg-navy-night pb-12" : "bg-frost py-8"} aria-label="Why shop with us">
      <div className="mx-auto max-w-7xl px-4">
        <div className={`grid grid-cols-1 gap-4 rounded-2xl p-5 sm:grid-cols-2 lg:grid-cols-4 ${dark ? "glass" : "glass-light shadow-card"}`}>
          {ITEMS.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="flex items-center gap-3"
            >
              <span className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${dark ? "bg-white/10 text-ice" : "bg-ice text-navy"}`}>
                <it.icon className="size-5" />
              </span>
              <div>
                <p className={`text-sm font-bold ${dark ? "text-white" : "text-navy"}`}>{it.title}</p>
                <p className={`text-xs ${dark ? "text-white/60" : "text-navy/60"}`}>{it.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
