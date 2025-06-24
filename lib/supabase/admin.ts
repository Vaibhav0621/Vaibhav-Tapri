// lib/supabase/admin.ts
// This is the privileged client for server-side admin tasks ONLY.

import { createClient } from '@supabase/supabase-js'
import type { Database } from '../database.types';

// IMPORTANT: This file should never be imported into a client-side component.
// It exposes your service role key and bypasses RLS.

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  // Instead of throwing an error, we can create a "null" client
  // so the app doesn't crash if the key is missing, but functions will fail.
  console.warn("Supabase admin client is not configured. Admin functionality will be disabled.");
}

// Export the admin client directly. It must only be used in server-side code.
export const supabaseAdmin = supabaseUrl && supabaseServiceRoleKey
  ? createClient<Database>(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  : {
    // This is a mock object to prevent crashes if the admin key isn't set.
    from: (table: string) => ({
      select: async () => ({ error: { message: "Admin client not configured" }, data: null }),
      insert: async () => ({ error: { message: "Admin client not configured" }, data: null }),
      update: async () => ({ error: { message: "Admin client not configured" }, data: null }),
      delete: async () => ({ error: { message: "Admin client not configured" }, data: null }),
    }),
  };

export const isAdminAvailable = () => !!supabaseServiceRoleKey;
