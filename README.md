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
- ✅ **Phase 2 — Customer Frontend**: Home (animated 3D hero), Shop + filters, Product details, Slide-out cart, Guest checkout (M-Pesa / Airtel Money / Mixx by Yas / HaloPesa / COD), payment instructions, Order confirmation, Order tracking timeline, Offers, Best Sellers, Contact
- ✅ **Phase 3 — Admin Dashboard**: `/admin` — all 20 modules: Dashboard, Orders (+ details & status flow), Products (+ Add Product), Categories, Inventory, Customers, Reviews, Coupons, Flash Sales, Loyalty, Referrals, Payments, Shipping, Marketing, Notifications, Reports, Content, Staff & Roles, Activity Logs, Settings
- ✅ **Admin Auth**: clean login gate at `/admin/login` (demo credentials: `admin@palacebottles.com` / `palace2026`) — Phase 4 swaps for Supabase Auth + roles. "Admin Login" link lives in the storefront footer.
- ✅ **End-to-end order loop (demo)**: checkout → PBxxxxxx order → payment instructions → appears in Admin Orders (LIVE tag) → admin status updates → reflected on customer Track Order page. Stored in localStorage until Phase 4.
- 🔄 **Phase 4 — Database**: Run `supabase/schema.sql` in Supabase SQL Editor; set env vars; swap demo data layer
- ✅ **Phase 5 — Test**: production build + 32-route smoke test pass. **Deploy**: Vercel (import repo, add env vars)

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
