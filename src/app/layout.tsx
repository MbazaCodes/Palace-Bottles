import type { Metadata } from "next";
import "./globals.css";
import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";

export const metadata: Metadata = {
  title: "Palace Bottles — Keep It Hot. Keep It Cold. Keep It Palace.",
  description:
    "Premium thermal flasks, water bottles, sports bottles, kids bottles and coffee tumblers. Trusted across Tanzania Mainland & Zanzibar. Nationwide delivery, Mobile Money & Cash on Delivery.",
  keywords: ["thermal flask Tanzania", "water bottles Dar es Salaam", "Palace Bottles", "tumblers Tanzania"],
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Manrope:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <TopBar />
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <CartDrawer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
