import { createSupabaseServerClient, supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase"
import type { Database } from "@/lib/database.types"

type Profile = Database["public"]["Tables"]["profiles"]["Row"]
type ProfileInsert = Database["public"]["Tables"]["profiles"]["Insert"]
type ProfileUpdate = Database["public"]["Tables"]["profiles"]["Update"]

export class UserService {
  // Get user profile
  static async getProfile(userId: string) {
    if (!isSupabaseConfigured()) {
      throw new Error("Database not configured")
    }

    const supabase = createSupabaseServerClient()

    const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()

    if (error) {
      console.error("Error fetching profile:", error)
      return null
    }

    return data
  }

  // Create user profile (called after signup)
  static async createProfile(profileData: ProfileInsert) {
    if (!isSupabaseConfigured()) {
      throw new Error("Database not configured")
    }

    const supabase = createSupabaseServerClient()

    const { data, error } = await supabase.from("profiles").insert(profileData).select().single()

    if (error) {
      console.error("Error creating profile:", error)
      throw error
    }

    return data
  }

  // Update user profile
  static async updateProfile(userId: string, updates: ProfileUpdate) {
    if (!isSupabaseConfigured()) {
      throw new Error("Database not configured")
    }

    const supabase = createSupabaseServerClient()

    const { data, error } = await supabase.from("profiles").update(updates).eq("id", userId).select().single()

    if (error) {
      console.error("Error updating profile:", error)
      throw error
    }

    return data
  }

  // Get user's applications
  static async getUserApplications(userId: string) {
    if (!isSupabaseConfigured()) {
      throw new Error("Database not configured")
    }

    const supabase = createSupabaseServerClient()

    const { data, error } = await supabase
      .from("applications")
      .select(`
        *,
        tapris (
          id,
          title,
          banner_url
        )
      `)
      .eq("applicant_id", userId)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching user applications:", error)
      return []
    }

    return data || []
  }

  // Apply to a position
  static async applyToPosition(applicationData: {
    tapri_id: string
    position_id?: string
    applicant_id: string
    applicant_name: string
    applicant_email: string
    cover_letter?: string
  }) {
    if (!isSupabaseConfigured()) {
      throw new Error("Database not configured")
    }

    const supabase = createSupabaseServerClient()

    const { data, error } = await supabase.from("applications").insert(applicationData).select().single()

    if (error) {
      console.error("Error creating application:", error)
      throw error
    }

    // Increment application count
    await supabase
      .from("tapris")
      .update({
        applications: supabase.sql`applications + 1`,
      })
      .eq("id", applicationData.tapri_id)

    return data
  }

  // Admin functions
  static async getAllUsers(page = 1, limit = 20) {
    if (!isSupabaseConfigured()) {
      throw new Error("Database not configured")
    }

    const { data, error } = await supabaseAdmin
      .from("profiles")
      .select("*")
      .range((page - 1) * limit, page * limit - 1)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching users:", error)
      return { data: [], count: 0 }
    }

    return { data: data || [], count: data?.length || 0 }
  }

  static async updateUserRole(userId: string, role: string, isAdmin: boolean) {
    if (!isSupabaseConfigured()) {
      throw new Error("Database not configured")
    }

    const { data, error } = await supabaseAdmin
      .from("profiles")
      .update({ role, is_admin: isAdmin })
      .eq("id", userId)
      .select()
      .single()

    if (error) {
      console.error("Error updating user role:", error)
      throw error
    }

    return data
  }

  static async deleteUser(userId: string) {
    if (!isSupabaseConfigured()) {
      throw new Error("Database not configured")
    }

    const { error } = await supabaseAdmin.auth.admin.deleteUser(userId)

    if (error) {
      console.error("Error deleting user:", error)
      throw error
    }

    return true
  }
}
