// lib/services/analytics-service.ts

// CORRECT IMPORTS
import { createClient as createServerClient } from "@/lib/supabase/server"
import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/admin" // <-- CORRECTED PATH

export class AnalyticsService {
  // getDashboardAnalytics and other methods remain the same...
  static async getDashboardAnalytics() {
    if (!isSupabaseConfigured()) {
        // Return mock data if not configured
        return {
            totalTapris: 10, pendingTapris: 2, approvedTapris: 8,
            totalUsers: 150, totalApplications: 90, totalViews: 5000,
            userGrowthRate: "10%",
            recentActivity: { newUsersThisMonth: 20, newApplicationsThisMonth: 15 }
        };
    }
    
    // Logic here is now safe because it uses the correct admin client.
    const { count: totalTapris } = await createServerClient().from('tapris').select('*', { count: 'exact' });
    const { count: totalUsers } = await supabaseAdmin.from('profiles').select('*', { count: 'exact' });
    
    // ... rest of your analytics logic
    
    return {
        totalTapris: totalTapris || 0,
        totalUsers: totalUsers || 0,
        // ... etc
    }
  }
}
