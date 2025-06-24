// lib/supabase/admin.ts
// THIS IS FOR PRIVILEGED, SERVER-ONLY ACTIONS

import { createClient } from '@supabase/supabase-js'
import type { Database } from '../database.types';

// This safely creates the admin client, which bypasses RLS.
// It should NEVER be imported into a "use client" component.
const supabaseAdmin = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// We now export the client itself and a helper to check availability.
export { supabaseAdmin };
export const isAdminAvailable = () => !!process.env.SUPABASE_SERVICE_ROLE_KEY;
