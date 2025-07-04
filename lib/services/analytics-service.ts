// lib/services/analytics-service.ts

// CORRECT IMPORTS
import { createClient } from "@/lib/supabase/server"; // For standard server operations
import { supabaseAdmin, isAdminConfigured } from "@/lib/supabase/admin"; // For privileged admin operations

export class AnalyticsService {
  static async getDashboardAnalytics() {
    if (!isAdminConfigured()) { // Using the correct config check from the admin file
      console.warn("Admin key not set. Returning mock analytics data.");
      return { totalTapris: 0, totalUsers: 0 /* etc. */ };
    }
    
    // Now you can safely use both clients as needed
    const supabase = createClient(); // Standard server client
    const { count: totalTapris } = await supabase.from('tapris').select('*', { count: 'exact', head: true });
    
    // Use admin client for things that bypass RLS
    const { count: totalUsers } = await supabaseAdmin.from('profiles').select('*', { count: 'exact', head: true });

    return { totalTapris: totalTapris || 0, totalUsers: totalUsers || 0 };
  }
  // ... other analytics methods
}
