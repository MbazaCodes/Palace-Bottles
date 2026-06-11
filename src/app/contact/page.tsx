import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { BRAND } from "@/lib/constants";
import Bottle3D from "@/components/ui/Bottle3D";
import ContactForm from "@/components/ui/ContactForm";

export const metadata = { title: "Contact Us — Palace Bottles" };

const CARDS = [
  { icon: Phone, title: "Call Us", value: BRAND.phone, sub: "Mon - Sat: 8:00 AM - 8:00 PM", href: `tel:${BRAND.phoneRaw}` },
  { icon: MessageCircle, title: "WhatsApp", value: BRAND.phone, sub: "We reply within minutes", href: `https://wa.me/${BRAND.phoneRaw}` },
  { icon: Mail, title: "Email Us", value: BRAND.email, sub: "We reply within 24 hours", href: `mailto:${BRAND.email}` },
  { icon: MapPin, title: "Visit Us", value: "Makumbusho, Near Mesuma Hotel", sub: "Dar es Salaam, Tanzania", href: "#map" },
];

export default function ContactPage() {
  return (
    <>
      {/* Dark hero */}
      <section className="relative overflow-hidden bg-navy-night text-white">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_40%,rgba(37,99,235,0.35),transparent_55%)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-4 py-14 lg:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-royal-bright">Contact Us</p>
            <h1 className="mt-3 font-display text-4xl font-extrabold leading-tight sm:text-5xl">We&apos;re Here<br />To Help You</h1>
            <p className="mt-4 max-w-sm text-white/70">Have a question about our products or your order? Our team is ready to assist you.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={`https://wa.me/${BRAND.phoneRaw}`} target="_blank" rel="noopener noreferrer" className="rounded-xl bg-royal px-5 py-3 text-sm font-bold hover:bg-royal-bright">Chat on WhatsApp</a>
              <a href={`tel:${BRAND.phoneRaw}`} className="glass rounded-xl px-5 py-3 text-sm font-bold hover:bg-white/15">Call Us Now</a>
            </div>
          </div>
          <div className="relative mx-auto hidden h-72 w-full max-w-sm lg:block" aria-hidden>
            <div className="absolute left-1/2 top-1/2 size-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-ice/25 animate-pulse-ring" style={{ boxShadow: "0 0 60px rgba(96,165,250,0.4)" }} />
            <div className="absolute bottom-6 left-[14%] w-[26%] animate-float-rev" style={{ "--tilt": "-6deg" } as React.CSSProperties}><Bottle3D body="#16181d" accent="#3a3f4a" shape="flask" label={false} /></div>
            <div className="absolute bottom-4 left-1/2 w-[32%] -translate-x-1/2 animate-float"><Bottle3D body="#2563eb" accent="#60a5fa" shape="bottle" label={false} /></div>
            <div className="absolute bottom-6 right-[14%] w-[26%] animate-float-slow" style={{ "--tilt": "6deg" } as React.CSSProperties}><Bottle3D body="#eef0f4" accent="#cdd3dd" shape="tumbler" label={false} /></div>
          </div>
        </div>

        <div className="relative mx-auto grid max-w-7xl gap-4 px-4 pb-14 sm:grid-cols-2 lg:grid-cols-4">
          {CARDS.map((c) => (
            <a key={c.title} href={c.href} className="glass rounded-2xl p-5 transition-colors hover:bg-white/15">
              <span className="flex size-10 items-center justify-center rounded-full bg-royal/30 text-ice"><c.icon className="size-5" /></span>
              <p className="mt-3 font-display font-bold">{c.title}</p>
              <p className="mt-1 break-all text-sm text-white/85">{c.value}</p>
              <p className="text-xs text-white/55">{c.sub}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Map + form */}
      <section id="map" className="mx-auto grid max-w-7xl gap-6 px-4 py-12 lg:grid-cols-2">
        <div className="overflow-hidden rounded-2xl border border-silver bg-white shadow-card">
          <iframe
            title="Palace Bottles location — Makumbusho, Dar es Salaam"
            src="https://www.google.com/maps?q=Makumbusho%2C%20Dar%20es%20Salaam%2C%20Tanzania&output=embed"
            className="h-72 w-full lg:h-[26rem]"
            loading="lazy"
          />
          <div className="flex items-center gap-3 bg-navy-night p-4 text-white">
            <Clock className="size-5 text-ice" />
            <div className="text-sm"><strong>We&apos;re Open</strong><p className="text-xs text-white/65">{BRAND.hours}</p></div>
          </div>
        </div>
        <ContactForm />
      </section>
    </>
  );
}
