import { MapPin, Truck, Phone } from "lucide-react";
import { BRAND } from "@/lib/constants";

export default function TopBar() {
  return (
    <div className="bg-navy-night text-xs text-white/90">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2">
        <span className="hidden items-center gap-1.5 sm:flex">
          <MapPin className="size-3.5 text-ice" /> {BRAND.address.replace(", Tanzania", "")}
        </span>
        <span className="flex items-center gap-1.5">
          <Truck className="size-3.5 text-ice" /> Free delivery across Tanzania Mainland &amp; Zanzibar
        </span>
        <a href={`tel:${BRAND.phoneRaw}`} className="hidden items-center gap-1.5 hover:text-ice md:flex">
          <Phone className="size-3.5 text-ice" /> {BRAND.phone}
        </a>
      </div>
    </div>
  );
}
