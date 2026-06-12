import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Supabase clients.
 * - `supabase` (anon key): public reads + guest checkout inserts via RLS
 * - `supabaseAdmin` (service_role): admin writes, bypasses RLS — server-side only
 */

const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

export const supabase: SupabaseClient | null =
  url && anonKey ? createClient(url, anonKey) : null;

export const supabaseAdmin: SupabaseClient | null =
  url && serviceKey ? createClient(url, serviceKey, { auth: { persistSession: false } }) : null;

export const isSupabaseConfigured = Boolean(supabase);
