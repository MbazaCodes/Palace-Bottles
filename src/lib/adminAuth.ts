/**
 * Admin auth (clean demo gate).
 * Phase 4 swaps this for Supabase Auth + the admin_users table (roles & RLS).
 * The session flag lives in localStorage so the gate works without a backend.
 */
export const DEMO_ADMIN = {
  email: "admin@palacebottles.com",
  password: "palace2026",
};

const KEY = "pb_admin_session";

export function isAdminLoggedIn(): boolean {
  return typeof window !== "undefined" && localStorage.getItem(KEY) === "1";
}

export function loginAdmin(email: string, password: string): boolean {
  if (email.trim().toLowerCase() === DEMO_ADMIN.email && password === DEMO_ADMIN.password) {
    localStorage.setItem(KEY, "1");
    return true;
  }
  return false;
}

export function logoutAdmin() {
  localStorage.removeItem(KEY);
}
