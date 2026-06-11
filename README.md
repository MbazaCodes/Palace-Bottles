# Palace Bottles 🏰💧

**Keep It Hot. Keep It Cold. Keep It Palace.**

Premium Tanzanian e-commerce platform for thermal flasks, water bottles, sports bottles, kids bottles and coffee tumblers. Serving Tanzania Mainland & Zanzibar.

## Tech Stack
- **Next.js 15** (App Router) + TypeScript
- **Tailwind CSS v4** — navy glassmorphism design system
- **Framer Motion** — animations
- **Zustand** — cart state
- **React Hook Form + Zod** — checkout validation
- **Supabase** — database, RLS, admin auth (Phase 4)
- **Recharts** — admin analytics
- **Lucide React** — icons

## Project Phases
- ✅ **Phase 1 — Setup**: Next.js 15, design tokens (#102A6B navy, #DCEEFF ice, glassmorphism), fonts (Sora + Manrope)
- ✅ **Phase 2 — Customer Frontend**: Home (animated 3D hero), Shop + filters, Product details, Slide-out cart, Guest checkout (M-Pesa / Airtel Money / Mixx by Yas / HaloPesa / COD), Order confirmation, Order tracking timeline, Offers, Best Sellers, Contact
- 🔄 **Phase 3 — Admin Dashboard**: `/admin` — KPIs, orders, products, inventory, customers
- 🔄 **Phase 4 — Database**: Run `supabase/schema.sql` in Supabase SQL Editor; set env vars
- 🔄 **Phase 5 — Test & Deploy**: Vercel

## Getting Started
```bash
npm install
npm run dev
```
Open http://localhost:3000

## Supabase Setup (Phase 4)
1. Create a project at supabase.com
2. Run `supabase/schema.sql` in the SQL Editor
3. Create `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Product Images
Product visuals are currently rendered with the CSS `Bottle3D` component so the site looks premium before photography. Replace with real photos via `product_images` (Supabase) or `/public/products/` without changing layout.

## Contact
- 📞 +255 657 397 719 (WhatsApp enabled)
- 📧 kyalaalikoabel@gmail.com
- 📍 Makumbusho, Near Mesuma Hotel, Dar es Salaam
