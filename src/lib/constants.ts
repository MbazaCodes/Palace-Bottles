export const BRAND = {
  name: "Palace Bottles",
  tagline: "Keep It Hot. Keep It Cold. Keep It Palace.",
  phone: "+255 657 397 719",
  phoneRaw: "255657397719",
  email: "kyalaalikoabel@gmail.com",
  address: "Makumbusho, Near Mesuma Hotel, Dar es Salaam, Tanzania",
  hours: "Mon - Sat: 8:00 AM - 8:00 PM · Sun: 9:00 AM - 5:00 PM",
};

export const PAYMENT_METHODS = ["M-Pesa", "Airtel Money", "Mixx by Yas", "HaloPesa", "Cash on Delivery"] as const;

export const TZ_REGIONS = [
  "Dar es Salaam", "Arusha", "Mwanza", "Dodoma", "Mbeya", "Morogoro", "Tanga",
  "Kilimanjaro", "Tabora", "Kigoma", "Shinyanga", "Kagera", "Mtwara", "Lindi",
  "Ruvuma", "Iringa", "Singida", "Rukwa", "Mara", "Manyara", "Njombe", "Katavi",
  "Simiyu", "Geita", "Songwe", "Pwani", "Zanzibar Urban/West", "Zanzibar North",
  "Zanzibar Central/South", "Pemba North", "Pemba South",
] as const;

export const formatTZS = (n: number) => `TZS ${n.toLocaleString("en-US")}`;

export const ORDER_STATUSES = ["Pending", "Confirmed", "Processing", "Packed", "Shipped", "Delivered"] as const;
export type OrderStatus = (typeof ORDER_STATUSES)[number];
