import { createClient } from "@supabase/supabase-js";

// Server-only: never import this in client components.
// Uses service_role key which bypasses RLS — kept exclusively in route handlers.
export function createServerClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  }

  return createClient(url, key, {
    auth: { persistSession: false },
  });
}
