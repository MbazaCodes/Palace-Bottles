/**
 * Admin auth + staff store.
 * Staff created in /admin/staff are persisted in localStorage and can log in
 * at /admin/login with the email + password the admin sets. Each role only
 * sees and can open the modules it is allowed to.
 */

export const SUPER_ADMIN = {
  email: "admin@palacebottle.com",
  password: "palace2026",
  uid: "579a2172-0dd4-44d3-ac3a-476b8375d5e4",
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
// No version clearing — session persists

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
    { id: "ST-001", name: "Palace Admin", email: SUPER_ADMIN.email, phone: "+255 657 397 719", role: "Super Admin", password: SUPER_ADMIN.password, active: true, createdAt: "Jan 10, 2026" },
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
  if (raw === "1") return { name: "Palace Admin", email: SUPER_ADMIN.email, role: "Super Admin" };
  try { return JSON.parse(raw) as AdminSession; } catch { return null; }
}

export function isAdminLoggedIn(): boolean {
  return currentAdmin() !== null;
}

export function loginAdmin(email: string, password: string): boolean {
  const e = email.trim().toLowerCase();
  // Check superadmin first
  if (e === SUPER_ADMIN.email && password === SUPER_ADMIN.password) {
    localStorage.setItem(SESSION_KEY, JSON.stringify({ name: "Palace Admin", email: SUPER_ADMIN.email, role: "Super Admin" } satisfies AdminSession));
    return true;
  }
  // Check staff accounts
  const staff = getStaff();
  const member = staff.find((s) => s.email.toLowerCase() === e && s.password === password && s.active);
  if (member) {
    localStorage.setItem(SESSION_KEY, JSON.stringify({ name: member.name, email: member.email, role: member.role } satisfies AdminSession));
    return true;
  }
  return false;
}

export function logoutAdmin() {
  localStorage.removeItem(SESSION_KEY);
}
