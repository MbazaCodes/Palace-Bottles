/**
 * Admin auth + staff store.
 * Staff created in /admin/staff are persisted in localStorage and can log in
 * at /admin/login with the email + password the admin sets. Each role only
 * sees and can open the modules it is allowed to.
 */

export const DEMO_ADMIN = {
  email: "admin@palacebottles.com",
  password: "palace2026",
};

export type StaffRole =
  | "Super Admin"
  | "Order Manager"
  | "Shipping Manager"
  | "Customer Support"
  | "Inventory Manager"
  | "Marketing Manager";

export interface Staff {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: StaffRole;
  password: string;
  active: boolean;
  createdAt: string;
}

export interface AdminSession {
  name: string;
  email: string;
  role: StaffRole;
}

const STAFF_KEY = "pb_staff";
const SESSION_KEY = "pb_admin_session";

/** Which admin routes each role can open. "all" = everything. */
export const ROLE_ACCESS: Record<StaffRole, string[] | "all"> = {
  "Super Admin": "all",
  "Order Manager": ["/admin", "/admin/orders", "/admin/payments"],
  "Shipping Manager": ["/admin", "/admin/shipping", "/admin/orders"],
  "Customer Support": ["/admin", "/admin/customers", "/admin/reviews", "/admin/notifications"],
  "Inventory Manager": ["/admin", "/admin/products", "/admin/categories", "/admin/inventory"],
  "Marketing Manager": ["/admin", "/admin/marketing", "/admin/coupons", "/admin/flash-sales", "/admin/content", "/admin/notifications"],
};

export const ROLE_INFO: { role: StaffRole; access: string; color: string }[] = [
  { role: "Super Admin", access: "Full access to every module", color: "bg-navy text-white" },
  { role: "Order Manager", access: "Orders & payment verification", color: "bg-blue-100 text-blue-700" },
  { role: "Shipping Manager", access: "Shipping, deliveries & order view", color: "bg-cyan-100 text-cyan-700" },
  { role: "Customer Support", access: "Customers, reviews & notifications", color: "bg-violet-100 text-violet-700" },
  { role: "Inventory Manager", access: "Products, categories & stock", color: "bg-emerald-100 text-emerald-700" },
  { role: "Marketing Manager", access: "Promotions, coupons & content", color: "bg-amber-100 text-amber-700" },
];

export function canAccess(role: StaffRole, path: string): boolean {
  const allowed = ROLE_ACCESS[role];
  if (allowed === "all") return true;
  return allowed.some((p) => (p === "/admin" ? path === "/admin" : path === p || path.startsWith(p + "/")));
}

function seedStaff(): Staff[] {
  return [
    { id: "ST-001", name: "Palace Admin", email: DEMO_ADMIN.email, phone: "+255 657 397 719", role: "Super Admin", password: DEMO_ADMIN.password, active: true, createdAt: "Jan 10, 2026" },
    { id: "ST-002", name: "Neema Joseph", email: "neema@palacebottles.com", phone: "+255 712 000 111", role: "Order Manager", password: "orders2026", active: true, createdAt: "Feb 14, 2026" },
    { id: "ST-003", name: "Baraka Mussa", email: "baraka@palacebottles.com", phone: "+255 713 222 333", role: "Shipping Manager", password: "ship2026", active: true, createdAt: "Mar 2, 2026" },
    { id: "ST-004", name: "Zainab Omar", email: "zainab@palacebottles.com", phone: "+255 714 444 555", role: "Customer Support", password: "support2026", active: true, createdAt: "Mar 20, 2026" },
  ];
}

export function getStaff(): Staff[] {
  if (typeof window === "undefined") return seedStaff();
  const raw = localStorage.getItem(STAFF_KEY);
  if (!raw) {
    const s = seedStaff();
    localStorage.setItem(STAFF_KEY, JSON.stringify(s));
    return s;
  }
  try { return JSON.parse(raw) as Staff[]; } catch { return seedStaff(); }
}

export function saveStaff(list: Staff[]) {
  if (typeof window !== "undefined") localStorage.setItem(STAFF_KEY, JSON.stringify(list));
}

export function currentAdmin(): AdminSession | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  if (raw === "1") return { name: "Palace Admin", email: DEMO_ADMIN.email, role: "Super Admin" }; // legacy session
  try { return JSON.parse(raw) as AdminSession; } catch { return null; }
}

export function isAdminLoggedIn(): boolean {
  return currentAdmin() !== null;
}

export function loginAdmin(email: string, password: string): boolean {
  const e = email.trim().toLowerCase();
  const staff = getStaff().find((s) => s.email.toLowerCase() === e && s.password === password && s.active);
  if (staff) {
    localStorage.setItem(SESSION_KEY, JSON.stringify({ name: staff.name, email: staff.email, role: staff.role } satisfies AdminSession));
    return true;
  }
  if (e === DEMO_ADMIN.email && password === DEMO_ADMIN.password) {
    localStorage.setItem(SESSION_KEY, JSON.stringify({ name: "Palace Admin", email: DEMO_ADMIN.email, role: "Super Admin" } satisfies AdminSession));
    return true;
  }
  return false;
}

export function logoutAdmin() {
  if (typeof window !== "undefined") localStorage.removeItem(SESSION_KEY);
}
