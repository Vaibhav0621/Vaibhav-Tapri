// lib/services/user-service.ts

// CORRECT IMPORTS
import { createClient as createServerClient } from "@/lib/supabase/server"
import { supabaseAdmin, isSupabaseConfigured as isAdminConfigured } from "@/lib/supabase/admin"
import type { Database } from "@/lib/database.types"

// Your types remain the same...
type Profile = Database["public"]["Tables"]["profiles"]["Row"]

export class UserService {
    // getProfile and other functions that run on behalf of the user...
    static async getProfile(userId: string) {
        const supabase = createServerClient()
        // ... your getProfile logic
    }
    
    // Admin functions...
    static async getAllUsers(page = 1, limit = 20) {
        if (!isAdminConfigured()) return { data: [], count: 0 };
        // Correctly using supabaseAdmin
        const { data, error, count } = await supabaseAdmin
          .from("profiles")
          .select("*", { count: "exact" })
          .range((page - 1) * limit, page * limit - 1)
        
        if (error) { console.error("Error fetching users:", error); return { data: [], count: 0 }; }
        return { data: data || [], count: count || 0 };
    }
    // ... rest of your user service logic ...
}
