import { createSupabaseServerClient, supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase"
import type { Database } from "@/lib/database.types"

type Tapri = Database["public"]["Tables"]["tapris"]["Row"]
type TapriInsert = Database["public"]["Tables"]["tapris"]["Insert"]
type TapriUpdate = Database["public"]["Tables"]["tapris"]["Update"]

export class TapriService {
  // Get all approved tapris with pagination
  static async getApprovedTapris(page = 1, limit = 12, category?: string, stage?: string) {
    if (!isSupabaseConfigured()) {
      throw new Error("Database not configured")
    }

    const supabase = createSupabaseServerClient()

    let query = supabase
      .from("tapris")
      .select(`
        *,
        profiles:creator_id (
          full_name,
          avatar_url
        )
      `)
      .eq("status", "approved")

    if (category && category !== "all") {
      query = query.eq("category", category)
    }

    if (stage && stage !== "all") {
      query = query.eq("stage", stage)
    }

    const { data, error, count } = await query
      .range((page - 1) * limit, page * limit - 1)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching tapris:", error)
      throw error
    }

    return { data: data || [], count: count || 0 }
  }

  // Get single tapri by ID with all related data
  static async getTapriById(id: string) {
    if (!isSupabaseConfigured()) {
      throw new Error("Database not configured")
    }

    const supabase = createSupabaseServerClient()

    const { data, error } = await supabase
      .from("tapris")
      .select(`
        *,
        profiles:creator_id (
          full_name,
          avatar_url,
          email,
          bio
        )
      `)
      .eq("id", id)
      .single()

    if (error) {
      console.error("Error fetching tapri:", error)
      throw error
    }

    // Increment view count
    await supabase
      .from("tapris")
      .update({ views: (data.views || 0) + 1 })
      .eq("id", id)

    return { data }
  }

  // Create new tapri
  static async createTapri(tapriData: TapriInsert, userId: string) {
    if (!isSupabaseConfigured()) {
      throw new Error("Database not configured")
    }

    const supabase = createSupabaseServerClient()

    const { data, error } = await supabase
      .from("tapris")
      .insert({
        ...tapriData,
        creator_id: userId,
        status: "pending",
      })
      .select()
      .single()

    if (error) {
      console.error("Error creating tapri:", error)
      throw error
    }

    return data
  }

  // Update tapri
  static async updateTapri(id: string, updates: TapriUpdate, userId: string) {
    if (!isSupabaseConfigured()) {
      throw new Error("Database not configured")
    }

    const supabase = createSupabaseServerClient()

    const { data, error } = await supabase
      .from("tapris")
      .update(updates)
      .eq("id", id)
      .eq("creator_id", userId)
      .select()
      .single()

    if (error) {
      console.error("Error updating tapri:", error)
      throw error
    }

    return data
  }

  // Get user's tapris
  static async getUserTapris(userId: string) {
    if (!isSupabaseConfigured()) {
      throw new Error("Database not configured")
    }

    const supabase = createSupabaseServerClient()

    const { data, error } = await supabase
      .from("tapris")
      .select(`
        *,
        applications (
          id,
          status
        )
      `)
      .eq("creator_id", userId)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching user tapris:", error)
      throw error
    }

    return data || []
  }

  // Admin functions
  static async getPendingTapris() {
    if (!isSupabaseConfigured()) {
      throw new Error("Database not configured")
    }

    const { data, error } = await supabaseAdmin
      .from("tapris")
      .select(`
        *,
        profiles:creator_id (
          full_name,
          email
        )
      `)
      .eq("status", "pending")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching pending tapris:", error)
      throw error
    }

    return data || []
  }

  static async approveTapri(id: string) {
    if (!isSupabaseConfigured()) {
      throw new Error("Database not configured")
    }

    const { data, error } = await supabaseAdmin
      .from("tapris")
      .update({
        status: "approved",
        published_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error("Error approving tapri:", error)
      throw error
    }

    return data
  }

  static async rejectTapri(id: string) {
    if (!isSupabaseConfigured()) {
      throw new Error("Database not configured")
    }

    const { data, error } = await supabaseAdmin
      .from("tapris")
      .update({ status: "rejected" })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error("Error rejecting tapri:", error)
      throw error
    }

    return data
  }

  // Search tapris
  static async searchTapris(
    query: string,
    filters?: {
      category?: string
      stage?: string
      location?: string
    },
  ) {
    if (!isSupabaseConfigured()) {
      throw new Error("Database not configured")
    }

    const supabase = createSupabaseServerClient()

    let dbQuery = supabase
      .from("tapris")
      .select(`
        *,
        profiles:creator_id (
          full_name,
          avatar_url
        )
      `)
      .eq("status", "approved")
      .or(`title.ilike.%${query}%,description.ilike.%${query}%`)

    if (filters?.category && filters.category !== "all") {
      dbQuery = dbQuery.eq("category", filters.category)
    }

    if (filters?.stage && filters.stage !== "all") {
      dbQuery = dbQuery.eq("stage", filters.stage)
    }

    if (filters?.location && filters.location !== "all") {
      dbQuery = dbQuery.eq("location", filters.location)
    }

    const { data, error } = await dbQuery.order("created_at", { ascending: false }).limit(20)

    if (error) {
      console.error("Error searching tapris:", error)
      throw error
    }

    return data || []
  }
}
