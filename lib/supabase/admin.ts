// lib/supabase/admin.ts
// FINAL VERSION - PROVIDES ALL REQUESTED EXPORTS

import { createClient } from '@supabase/supabase-js'
import type { Database } from '../database.types'

const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const adminClient = serviceRoleKey 
  ? createClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      serviceRoleKey,
      {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
      }
    )
  : null;

// The primary admin client instance.
export const supabaseAdmin = adminClient;

// ===================================================================
// EXPORTING ALL REQUESTED HELPER FUNCTIONS TO SATISFY THE BUILD PROCESS
// All these functions do the same thing: check if the admin key exists.
// This redundancy will be removed once we can confirm the build passes.
// ===================================================================

/**
 * Checks if the SUPABASE_SERVICE_ROLE_KEY is set.
 * This function satisfies components importing `isAdminConfigured`.
 * @returns {boolean}
 */
export const isAdminConfigured = (): boolean => {
  return !!serviceRoleKey;
}

/**
 * An alias for isAdminConfigured.
 * This function satisfies components importing `isAdminAvailable`.
 * @returns {boolean}
 */
export const isAdminAvailable = (): boolean => {
    return !!serviceRoleKey;
}

/**
 * A second alias for isAdminConfigured.
 * THIS IS THE EXPORT THAT IS CURRENTLY CAUSING YOUR DEPLOYMENT TO FAIL.
 * @returns {boolean}
 */
export const isSupabaseConfigured = (): boolean => {
    return !!serviceRoleKey;
}
