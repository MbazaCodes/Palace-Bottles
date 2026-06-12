"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Search, ShoppingCart, Menu, X, ChevronDown } from "lucide-react";
import { useCart, cartCount } from "@/store/cart";
import { CATEGORIES } from "@/data/products";
import Logo from "./Logo";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "#categories", label: "Categories", dropdown: true },
  { href: "/shop?sort=new", label: "New Arrivals" },
  { href: "/best-sellers", label: "Best Sellers" },
  { href: "/offers", label: "Offers" },
  { href: "/track-order", label: "Track Order" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { items, setOpen } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const count = cartCount(items);

  if (pathname?.startsWith("/admin")) return null;

  return (
    <header className="sticky top-0 z-40 bg-navy-night/95 text-white backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" aria-label="Palace Bottles home"><Logo /></Link>

        <nav className="hidden items-center gap-6 text-sm font-medium lg:flex" aria-label="Main">
          {LINKS.map((l) =>
            l.dropdown ? (
              <div key={l.label} className="group relative">
                <button className="flex items-center gap-1 py-2 text-white/85 hover:text-white">
                  {l.label} <ChevronDown className="size-3.5" />
                </button>
                <div className="invisible absolute left-0 top-full w-52 rounded-xl bg-white p-2 text-navy opacity-0 shadow-glass transition-all group-hover:visible group-hover:opacity-100">
                  {CATEGORIES.map((c) => (
                    <Link key={c.slug} href={`/shop?category=${c.slug}`} className="block rounded-lg px-3 py-2 text-sm hover:bg-frost">
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={l.label}
                href={l.href}
                className={`border-b-2 py-2 transition-colors ${pathname === l.href ? "border-royal text-white" : "border-transparent text-white/85 hover:text-white"}`}
              >
                {l.label}
              </Link>
            )
          )}
        </nav>

        <div className="flex items-center gap-1.5">
          <Link href="/shop" aria-label="Search products" className="rounded-full p-2 hover:bg-white/10"><Search className="size-5" /></Link>
          <button onClick={() => setOpen(true)} aria-label={`Open cart, ${count} items`} className="relative rounded-full p-2 hover:bg-white/10">
            <ShoppingCart className="size-5" />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex size-5 items-center justify-center rounded-full bg-royal text-[10px] font-bold">
                {count}
              </span>
            )}
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu" className="rounded-full p-2 hover:bg-white/10 lg:hidden">
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="border-t border-white/10 bg-navy-night px-4 pb-4 lg:hidden" aria-label="Mobile">
          {LINKS.filter((l) => !l.dropdown).map((l) => (
            <Link key={l.label} href={l.href} onClick={() => setMobileOpen(false)} className="block py-3 text-sm font-medium text-white/90 hover:text-white">
              {l.label}
            </Link>
          ))}
          <p className="mt-2 text-xs uppercase tracking-wide text-white/50">Categories</p>
          {CATEGORIES.map((c) => (
            <Link key={c.slug} href={`/shop?category=${c.slug}`} onClick={() => setMobileOpen(false)} className="block py-2.5 pl-3 text-sm text-white/80 hover:text-white">
              {c.name}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
