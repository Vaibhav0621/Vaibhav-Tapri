import { createSupabaseServerClient, supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase"

export class AnalyticsService {
  // Track event
  static async trackEvent(eventData: {
    event_type: string
    tapri_id?: string
    user_id?: string
    session_id?: string
    metadata?: any
  }) {
    if (!isSupabaseConfigured()) {
      console.log("Mock analytics event:", eventData)
      return
    }

    const supabase = createSupabaseServerClient()

    const { error } = await supabase.from("analytics").insert(eventData)

    if (error) {
      console.error("Error tracking event:", error)
    }
  }

  // Get dashboard analytics
  static async getDashboardAnalytics() {
    if (!isSupabaseConfigured()) {
      // Return mock analytics data
      return {
        totalTapris: 6,
        pendingTapris: 2,
        approvedTapris: 4,
        totalUsers: 150,
        totalApplications: 89,
        totalViews: 5420,
        userGrowthRate: "15%",
        recentActivity: {
          newUsersThisMonth: 25,
          newApplicationsThisMonth: 18,
        },
      }
    }

    const { data: tapriStats, error: tapriError } = await supabaseAdmin.from("tapris").select("status")

    const { data: userStats, error: userError } = await supabaseAdmin.from("profiles").select("created_at")

    const { data: applicationStats, error: appError } = await supabaseAdmin
      .from("applications")
      .select("status, applied_at")

    const { data: viewStats, error: viewError } = await supabaseAdmin
      .from("analytics")
      .select("event_type, created_at")
      .eq("event_type", "view")

    if (tapriError || userError || appError || viewError) {
      console.error("Error fetching analytics")
      return null
    }

    // Process the data
    const totalTapris = tapriStats?.length || 0
    const pendingTapris = tapriStats?.filter((t) => t.status === "pending").length || 0
    const approvedTapris = tapriStats?.filter((t) => t.status === "approved").length || 0

    const totalUsers = userStats?.length || 0
    const totalApplications = applicationStats?.length || 0
    const totalViews = viewStats?.length || 0

    // Calculate growth rates (last 30 days vs previous 30 days)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const sixtyDaysAgo = new Date()
    sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60)

    const recentUsers = userStats?.filter((u) => new Date(u.created_at) > thirtyDaysAgo).length || 0

    const previousUsers =
      userStats?.filter((u) => new Date(u.created_at) > sixtyDaysAgo && new Date(u.created_at) <= thirtyDaysAgo)
        .length || 0

    const userGrowthRate = previousUsers > 0 ? (((recentUsers - previousUsers) / previousUsers) * 100).toFixed(1) : "0"

    return {
      totalTapris,
      pendingTapris,
      approvedTapris,
      totalUsers,
      totalApplications,
      totalViews,
      userGrowthRate: `${userGrowthRate}%`,
      recentActivity: {
        newUsersThisMonth: recentUsers,
        newApplicationsThisMonth: applicationStats?.filter((a) => new Date(a.applied_at) > thirtyDaysAgo).length || 0,
      },
    }
  }

  // Get tapri analytics
  static async getTapriAnalytics(tapriId: string) {
    if (!isSupabaseConfigured()) {
      return []
    }

    const { data, error } = await supabaseAdmin
      .from("analytics")
      .select("*")
      .eq("tapri_id", tapriId)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching tapri analytics:", error)
      return []
    }

    return data || []
  }
}
