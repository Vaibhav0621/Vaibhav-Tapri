// lib/supabase/server.ts
// FOR SERVER COMPONENTS & SERVER ACTIONS

import { createServerClient as _createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import type { Database } from '../database.types';

function createClientInstance() {
  const cookieStore = cookies();
  return _createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name: string) => cookieStore.get(name)?.value,
        set: (name: string, value: string, options: CookieOptions) => {
          try { cookieStore.set({ name, value, ...options }) } catch (error) {}
        },
        remove: (name: string, options: CookieOptions) => {
          try { cookieStore.set({ name, value: '', ...options }) } catch (error) {}
        },
      },
    }
  );
}

// EXPORT 1: `createClient` for modern, clean components.
export const createClient = createClientInstance;

// EXPORT 2: `createServerClient` as an alias to satisfy older components during the build.
export const createServerClient = createClientInstance;
