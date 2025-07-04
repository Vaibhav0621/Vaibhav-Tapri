import { createServerClient } from "@/lib/supabase"
import type { Database } from "@/lib/database.types"

type Tapri = Database["public"]["Tables"]["tapris"]["Row"]

export class TapriService {
  private supabase = createServerClient()

  async getAllTapris(filters?: {
    search?: string
    category?: string
    stage?: string
    location?: string
  }): Promise<{ tapris: Tapri[]; error?: string }> {
    try {
      let query = this.supabase
        .from("tapris")
        .select("*")
        .eq("status", "approved")
        .order("created_at", { ascending: false })

      // Apply filters
      if (filters?.search) {
        query = query.or(
          `title.ilike.%${filters.search}%,description.ilike.%${filters.search}%,tagline.ilike.%${filters.search}%`,
        )
      }

      if (filters?.category && filters.category !== "all") {
        query = query.eq("category", filters.category)
      }

      if (filters?.stage && filters.stage !== "all") {
        query = query.eq("stage", filters.stage)
      }

      if (filters?.location && filters.location !== "all") {
        query = query.eq("location", filters.location)
      }

      const { data: tapris, error } = await query

      if (error) {
        console.error("Error fetching tapris:", error)
        return { tapris: [], error: "Failed to fetch tapris" }
      }

      return { tapris: tapris || [] }
    } catch (error) {
      console.error("Service error:", error)
      return { tapris: [], error: "Service error occurred" }
    }
  }

  async getTapriById(id: string): Promise<{ tapri: Tapri | null; error?: string }> {
    try {
      const { data: tapri, error } = await this.supabase.from("tapris").select("*").eq("id", id).single()

      if (error) {
        console.error("Error fetching tapri:", error)
        return { tapri: null, error: "Tapri not found" }
      }

      return { tapri }
    } catch (error) {
      console.error("Service error:", error)
      return { tapri: null, error: "Service error occurred" }
    }
  }

  async getTapriBySlug(slug: string): Promise<{ tapri: Tapri | null; error?: string }> {
    try {
      const { data: tapri, error } = await this.supabase.from("tapris").select("*").eq("slug", slug).single()

      if (error) {
        console.error("Error fetching tapri by slug:", error)
        return { tapri: null, error: "Tapri not found" }
      }

      return { tapri }
    } catch (error) {
      console.error("Service error:", error)
      return { tapri: null, error: "Service error occurred" }
    }
  }

  async createTapri(tapriData: Partial<Tapri>): Promise<{ tapri: Tapri | null; error?: string }> {
    try {
      const { data: tapri, error } = await this.supabase.from("tapris").insert([tapriData]).select().single()

      if (error) {
        console.error("Error creating tapri:", error)
        return { tapri: null, error: "Failed to create tapri" }
      }

      return { tapri }
    } catch (error) {
      console.error("Service error:", error)
      return { tapri: null, error: "Service error occurred" }
    }
  }

  async updateTapri(id: string, updates: Partial<Tapri>): Promise<{ tapri: Tapri | null; error?: string }> {
    try {
      const { data: tapri, error } = await this.supabase.from("tapris").update(updates).eq("id", id).select().single()

      if (error) {
        console.error("Error updating tapri:", error)
        return { tapri: null, error: "Failed to update tapri" }
      }

      return { tapri }
    } catch (error) {
      console.error("Service error:", error)
      return { tapri: null, error: "Service error occurred" }
    }
  }

  async deleteTapri(id: string): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await this.supabase.from("tapris").delete().eq("id", id)

      if (error) {
        console.error("Error deleting tapri:", error)
        return { success: false, error: "Failed to delete tapri" }
      }

      return { success: true }
    } catch (error) {
      console.error("Service error:", error)
      return { success: false, error: "Service error occurred" }
    }
  }
}

export const tapriService = new TapriService()
