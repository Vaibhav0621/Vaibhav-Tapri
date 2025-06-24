// lib/supabase.ts
// This is the client for all BROWSER-side operations.

import { createBrowserClient } from '@supabase/ssr'
import type { Database } from './database.types'

// Create a single, shared instance of the Supabase client for the browser.
// This is safe to use in any "use client" component.
export const supabase = createBrowserClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

/**
 * Checks if Supabase is configured on the client.
 * Useful for showing setup banners.
 * @returns {boolean}
 */
export const isSupabaseConfigured = (): boolean => {
  return (
    !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    process.env.NEXT_PUBLIC_SUPABASE_URL.includes("supabase.co")
  );
};
