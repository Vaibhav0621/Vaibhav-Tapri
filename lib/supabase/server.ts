// lib/supabase.ts
// THIS IS FOR CLIENT COMPONENTS ("use client") ONLY

import { createBrowserClient } from '@supabase/ssr'
import type { Database } from './database.types'

// Create a single, shared instance for the client-side
export const supabase = createBrowserClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export const isSupabaseConfigured = (): boolean => {
  return (
    !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
};
