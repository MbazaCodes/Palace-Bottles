export type Capacity = "400ml" | "500ml" | "750ml" | "900ml" | "1L" | "1.5L" | "2L";

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: CategorySlug;
  capacity: Capacity;
  capacities: Capacity[];
  colors: { name: string; hex: string }[];
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  stock: number;
  badge?: "Best Seller" | "New" | `Sale -${number}%` | `-${number}%`;
  description: string;
  shortDescription: string;
  /** Visual style for the CSS bottle renderer */
  visual: { body: string; accent: string; shape: "flask" | "sport" | "kids" | "tumbler" | "bottle" };
}

export type CategorySlug = "thermal-flasks" | "water-bottles" | "sports-bottles" | "kids-bottles" | "coffee-tumblers";

export const CATEGORIES: { slug: CategorySlug; name: string; count: string; tint: string }[] = [
  { slug: "thermal-flasks", name: "Thermal Flasks", count: "85+ Products", tint: "from-slate-200 to-slate-400" },
  { slug: "water-bottles", name: "Water Bottles", count: "120+ Products", tint: "from-ice to-blue-300" },
  { slug: "sports-bottles", name: "Sports Bottles", count: "90+ Products", tint: "from-emerald-100 to-slate-300" },
  { slug: "kids-bottles", name: "Kids Bottles", count: "60+ Products", tint: "from-purple-100 to-purple-300" },
  { slug: "coffee-tumblers", name: "Coffee Tumblers", count: "70+ Products", tint: "from-stone-200 to-stone-400" },
];

export const PRODUCTS: Product[] = [
  {
    id: "PB-1001", slug: "palace-classic-flask-1l", name: "Palace Classic Flask",
    category: "thermal-flasks", capacity: "1L", capacities: ["500ml", "750ml", "1L", "2L"],
    colors: [{ name: "Black", hex: "#16181d" }, { name: "Navy", hex: "#102a6b" }, { name: "Silver", hex: "#cdd3dd" }],
    price: 45000, oldPrice: 60000, rating: 4.8, reviews: 128, stock: 120, badge: "Best Seller",
    shortDescription: "Our signature double-wall flask. 24h cold, 12h hot.",
    description: "The flask that built the Palace name. Double-wall vacuum insulation in food-grade stainless steel keeps drinks cold for 24 hours and hot for 12. Leak-proof lid, powder-coated grip finish, built for daily Tanzanian life — from Dar traffic to safari mornings.",
    visual: { body: "#16181d", accent: "#3a3f4a", shape: "flask" },
  },
  {
    id: "PB-1002", slug: "hydro-active-bottle-750ml", name: "Hydro Active Bottle",
    category: "water-bottles", capacity: "750ml", capacities: ["500ml", "750ml", "1L"],
    colors: [{ name: "Blue", hex: "#2563eb" }, { name: "Black", hex: "#16181d" }, { name: "Red", hex: "#dc2626" }],
    price: 32000, oldPrice: 40000, rating: 4.6, reviews: 96, stock: 85, badge: "New",
    shortDescription: "Lightweight everyday hydration with one-hand flip cap.",
    description: "Stay hydrated in style with the Hydro Active 750ml. Durable stainless steel with double-wall vacuum insulation keeps drinks cold up to 24 hours and hot up to 12. Perfect for gym, office, travel and everyday use.",
    visual: { body: "#2563eb", accent: "#60a5fa", shape: "bottle" },
  },
  {
    id: "PB-1003", slug: "kids-fun-bottle-500ml", name: "Kids Fun Bottle",
    category: "kids-bottles", capacity: "500ml", capacities: ["400ml", "500ml"],
    colors: [{ name: "Purple", hex: "#a78bfa" }, { name: "Pink", hex: "#f9a8d4" }, { name: "Blue", hex: "#60a5fa" }],
    price: 25000, oldPrice: 32000, rating: 4.7, reviews: 76, stock: 10,
    shortDescription: "Playful prints, straw lid, drop-proof — made for school days.",
    description: "Bright, fun and tough. The Kids Fun Bottle has a one-click straw lid, carry strap and drop-resistant body. BPA-free and easy for small hands, with prints kids actually love.",
    visual: { body: "#a78bfa", accent: "#c4b5fd", shape: "kids" },
  },
  {
    id: "PB-1005", slug: "sport-pro-bottle-1l", name: "Sport Pro Bottle",
    category: "sports-bottles", capacity: "1L", capacities: ["750ml", "1L"],
    colors: [{ name: "Black", hex: "#16181d" }, { name: "Green", hex: "#16513a" }],
    price: 35000, oldPrice: 45000, rating: 4.5, reviews: 84, stock: 43,
    shortDescription: "Gym-ready 1L with carry loop and fast-flow spout.",
    description: "Built for training. The Sport Pro's wide mouth fills fast, the fast-flow spout keeps up with your session, and the silicone-loop handle clips to any bag. Sweat-proof powder coat finish.",
    visual: { body: "#16181d", accent: "#475569", shape: "sport" },
  },
  {
    id: "PB-1004", slug: "coffee-tumbler-500ml", name: "Coffee Tumbler",
    category: "coffee-tumblers", capacity: "500ml", capacities: ["500ml", "750ml"],
    colors: [{ name: "White", hex: "#eef0f4" }, { name: "Black", hex: "#16181d" }, { name: "Navy", hex: "#102a6b" }],
    price: 30000, oldPrice: 46000, rating: 4.4, reviews: 112, stock: 40,
    shortDescription: "Handle tumbler with splash-proof slide lid.",
    description: "Your morning, upgraded. The Coffee Tumbler holds 500ml with a comfortable handle, splash-proof sliding lid, and double-wall insulation that keeps coffee hot through the whole commute.",
    visual: { body: "#eef0f4", accent: "#cbd5e1", shape: "tumbler" },
  },
  {
    id: "PB-1009", slug: "adventure-flask-2l", name: "Adventure Flask",
    category: "thermal-flasks", capacity: "2L", capacities: ["1L", "1.5L", "2L"],
    colors: [{ name: "Green", hex: "#27452f" }, { name: "Black", hex: "#16181d" }],
    price: 55000, oldPrice: 65000, rating: 4.6, reviews: 67, stock: 30, badge: "-15%",
    shortDescription: "2L expedition flask for safaris, road trips and camps.",
    description: "Made for the long way round. 2 litres of insulated capacity, a heavy-duty carry handle, and a rugged matte shell that shrugs off knocks. Keeps chai hot from Moshi to Mwanza.",
    visual: { body: "#27452f", accent: "#3f6249", shape: "sport" },
  },
  {
    id: "PB-1010", slug: "kids-happy-bottle-500ml", name: "Kids Happy Bottle",
    category: "kids-bottles", capacity: "500ml", capacities: ["400ml", "500ml"],
    colors: [{ name: "Pink", hex: "#f9a8d4" }, { name: "Purple", hex: "#a78bfa" }],
    price: 25000, oldPrice: 32000, rating: 4.5, reviews: 59, stock: 25,
    shortDescription: "Soft pastel prints with shoulder strap for little explorers.",
    description: "Light, leak-proof and lovable. The Kids Happy Bottle comes with an adjustable shoulder strap, flip straw and cheerful prints. Easy-clean wide mouth for parents.",
    visual: { body: "#f9a8d4", accent: "#fbcfe8", shape: "kids" },
  },
  {
    id: "PB-1011", slug: "mega-tumbler-900ml", name: "Mega Tumbler",
    category: "coffee-tumblers", capacity: "900ml", capacities: ["750ml", "900ml"],
    colors: [{ name: "Blue", hex: "#7c9bd6" }, { name: "White", hex: "#eef0f4" }],
    price: 40000, oldPrice: 55000, rating: 4.6, reviews: 73, stock: 38,
    shortDescription: "The all-day 900ml tumbler with straw and handle.",
    description: "One fill, all day. 900ml of insulated capacity with a reusable straw, ergonomic handle and cup-holder-friendly base. The desk-to-gym-to-home companion.",
    visual: { body: "#7c9bd6", accent: "#a8c0e8", shape: "tumbler" },
  },
  {
    id: "PB-1006", slug: "hydro-daily-bottle-1l", name: "Hydro Daily Bottle",
    category: "water-bottles", capacity: "1L", capacities: ["750ml", "1L"],
    colors: [{ name: "Green", hex: "#16513a" }, { name: "Blue", hex: "#2563eb" }],
    price: 30000, oldPrice: 35000, rating: 4.4, reviews: 51, stock: 15,
    shortDescription: "Simple, honest 1L hydration for every day.",
    description: "No gimmicks — just a beautifully made 1L bottle with vacuum insulation, a secure screw lid, and a finish that still looks new after a year in your bag.",
    visual: { body: "#16513a", accent: "#2c7a58", shape: "bottle" },
  },
  {
    id: "PB-1007", slug: "kids-unicorn-bottle-400ml", name: "Kids Unicorn Bottle",
    category: "kids-bottles", capacity: "400ml", capacities: ["400ml"],
    colors: [{ name: "Pink", hex: "#f472b6" }],
    price: 22000, rating: 4.8, reviews: 44, stock: 55,
    shortDescription: "400ml unicorn magic with spill-proof straw.",
    description: "The bottle they'll show their friends. Unicorn artwork, spill-proof straw lid, and a size made for nursery and lower primary.",
    visual: { body: "#f472b6", accent: "#f9a8d4", shape: "kids" },
  },
  {
    id: "PB-1008", slug: "palace-elite-flask-1-5l", name: "Palace Elite Flask",
    category: "thermal-flasks", capacity: "1.5L", capacities: ["1L", "1.5L"],
    colors: [{ name: "Silver", hex: "#cdd3dd" }, { name: "Black", hex: "#16181d" }],
    price: 60000, oldPrice: 75000, rating: 4.9, reviews: 38, stock: 5,
    shortDescription: "Our finest finish. Brushed steel, 36h cold retention.",
    description: "The top of the Palace range. Brushed stainless finish, copper-lined vacuum chamber for up to 36 hours cold and 18 hours hot, and a precision-machined lid. A flask you gift.",
    visual: { body: "#cdd3dd", accent: "#e8eaf0", shape: "flask" },
  },
  {
    id: "PB-1012", slug: "aqua-flow-bottle-500ml", name: "Aqua Flow Bottle",
    category: "water-bottles", capacity: "500ml", capacities: ["500ml", "750ml"],
    colors: [{ name: "White", hex: "#eef0f4" }, { name: "Ice", hex: "#dceeff" }],
    price: 28000, oldPrice: 34000, rating: 4.3, reviews: 29, stock: 70,
    shortDescription: "Slim 500ml that fits any bag pocket.",
    description: "Slim profile, full insulation. The Aqua Flow slips into bag side-pockets and car holders, with a soft-touch lid and frost-white finish.",
    visual: { body: "#eef0f4", accent: "#dceeff", shape: "bottle" },
  },
];

export const bySlug = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
export const byCategory = (c: CategorySlug) => PRODUCTS.filter((p) => p.category === c);
export const bestSellers = () => [...PRODUCTS].sort((a, b) => b.reviews - a.reviews).slice(0, 8);
export const flashSaleProducts = () => PRODUCTS.filter((p) => p.oldPrice).slice(0, 4);
