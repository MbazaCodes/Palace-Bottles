import { Truck, Clock, MapPin, Package, Phone } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import { BRAND } from "@/lib/constants";

export const metadata = { title: "Shipping & Delivery — Palace Bottles" };

const ZONES = [
  { region: "Dar es Salaam", time: "Same day – 1 day", cost: "TZS 3,000 – 5,000" },
  { region: "Arusha, Mwanza, Dodoma, Mbeya, Morogoro", time: "2 – 3 days", cost: "TZS 5,000 – 10,000" },
  { region: "Other Tanzania Mainland regions", time: "3 – 5 days", cost: "TZS 8,000 – 15,000" },
  { region: "Zanzibar (Unguja & Pemba)", time: "3 – 5 days", cost: "TZS 10,000 – 15,000" },
];

export default function ShippingDeliveryPage() {
  return (
    <>
      <PageHero
        title="Shipping & Delivery"
        subtitle="We deliver across Tanzania Mainland and Zanzibar. Here's everything you need to know."
        crumbs={[["Home", "/"], ["Shipping & Delivery", "/shipping-delivery"]]}
      />
      <div className="mx-auto max-w-4xl space-y-8 px-4 py-12">
        <section className="rounded-2xl border border-silver bg-white p-6 shadow-card">
          <h2 className="flex items-center gap-2 font-display text-xl font-bold text-navy"><Truck className="size-5 text-royal" /> How Delivery Works</h2>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-navy/75">
            <p>Once you place your order, our team will contact you via WhatsApp or phone to confirm your delivery address and the exact delivery fee based on your location. Delivery fees are <strong>not</strong> charged at checkout — they are confirmed separately so you always know the exact cost before paying.</p>
            <p>We use trusted local couriers and bus cargo services to reach every region in Tanzania. For Dar es Salaam, we offer same-day and next-day delivery.</p>
          </div>
        </section>

        <section className="rounded-2xl border border-silver bg-white p-6 shadow-card">
          <h2 className="flex items-center gap-2 font-display text-xl font-bold text-navy"><Clock className="size-5 text-royal" /> Delivery Timelines &amp; Costs</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-silver text-left text-xs text-navy/50">
                  <th className="py-3 font-medium">Region</th>
                  <th className="font-medium">Estimated Time</th>
                  <th className="font-medium">Estimated Cost</th>
                </tr>
              </thead>
              <tbody>
                {ZONES.map((z) => (
                  <tr key={z.region} className="border-b border-silver/60 last:border-0">
                    <td className="py-3 font-semibold text-navy">{z.region}</td>
                    <td className="text-navy/70">{z.time}</td>
                    <td className="font-semibold text-navy">{z.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-navy/50">Delivery times are estimates and may vary during holidays or peak periods. Final cost is confirmed by our team before dispatch.</p>
        </section>

        <section className="rounded-2xl border border-silver bg-white p-6 shadow-card">
          <h2 className="flex items-center gap-2 font-display text-xl font-bold text-navy"><MapPin className="size-5 text-royal" /> Tracking Your Order</h2>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-navy/75">
            <p>Every order gets a unique Order ID (e.g. PB123456). You can use this ID to track your order status at any time on our <a href="/track-order" className="font-semibold text-royal hover:underline">Track Order</a> page.</p>
            <p>Order statuses: <strong>Pending → Confirmed → Processing → Packed → Shipped → Delivered</strong></p>
            <p>You will receive updates via WhatsApp as your order progresses.</p>
          </div>
        </section>

        <section className="rounded-2xl border border-silver bg-white p-6 shadow-card">
          <h2 className="flex items-center gap-2 font-display text-xl font-bold text-navy"><Package className="size-5 text-royal" /> What to Expect on Delivery</h2>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-navy/75">
            <p>All products are carefully packaged to prevent damage during transit. Your order will arrive in a branded Palace Bottles box with protective wrapping.</p>
            <p>For Cash on Delivery orders, please have the exact amount ready. Our delivery partner will provide a receipt.</p>
          </div>
        </section>

        <div className="glass-navy rounded-2xl p-6 text-center text-white">
          <Phone className="mx-auto size-6 text-ice" />
          <p className="mt-2 font-display text-lg font-bold">Questions about delivery?</p>
          <p className="mt-1 text-sm text-white/70">Our team is happy to help with delivery timing, costs, or special requests.</p>
          <div className="mt-4 flex justify-center gap-3">
            <a href={`https://wa.me/${BRAND.phoneRaw}`} target="_blank" rel="noopener noreferrer" className="rounded-xl bg-[#25D366] px-5 py-2.5 text-sm font-bold hover:brightness-105">WhatsApp Us</a>
            <a href={`tel:${BRAND.phoneRaw}`} className="glass rounded-xl px-5 py-2.5 text-sm font-bold hover:bg-white/15">Call {BRAND.phone}</a>
          </div>
        </div>
      </div>
    </>
  );
}
