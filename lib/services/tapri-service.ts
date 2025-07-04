import { createSupabaseServerClient, supabaseAdmin, isSupabaseConfigured, mockTapris } from "@/lib/supabase"
import type { Database } from "@/lib/database.types"

type Tapri = Database["public"]["Tables"]["tapris"]["Row"]
type TapriInsert = Database["public"]["Tables"]["tapris"]["Insert"]
type TapriUpdate = Database["public"]["Tables"]["tapris"]["Update"]

export class TapriService {
  // Get all approved tapris with pagination
  static async getApprovedTapris(page = 1, limit = 12, category?: string, stage?: string) {
    if (!isSupabaseConfigured()) {
      // Return mock data when Supabase isn't configured
      let filteredTapris = mockTapris

      if (category && category !== "all") {
        filteredTapris = filteredTapris.filter((t) => t.category.toLowerCase().includes(category.toLowerCase()))
      }

      if (stage && stage !== "all") {
        filteredTapris = filteredTapris.filter((t) => t.stage.toLowerCase() === stage.toLowerCase())
      }

      const startIndex = (page - 1) * limit
      const endIndex = startIndex + limit
      const paginatedTapris = filteredTapris.slice(startIndex, endIndex)

      return { data: paginatedTapris, count: filteredTapris.length }
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
      return { data: [], count: 0 }
    }

    return { data: data || [], count: count || 0 }
  }

  // Get single tapri by ID with all related data
  static async getTapriById(id: string) {
    if (!isSupabaseConfigured()) {
      // Return mock data when Supabase isn't configured
      const tapri = mockTapris.find((t) => t.id === id)
      if (!tapri) return null

      return {
        ...tapri,
        profiles: {
          full_name: "Demo Creator",
          avatar_url: "/placeholder.svg?height=100&width=100&text=DC",
          email: "creator@tapri.com",
          bio: "Passionate entrepreneur building the future",
        },
        team_members: [
          {
            name: "Alex Johnson",
            role: "CEO & Co-founder",
            bio: "Serial entrepreneur with 10+ years in tech",
            avatar_url: "/placeholder.svg?height=80&width=80&text=AJ",
            linkedin_url: "https://linkedin.com/in/alexjohnson",
            is_leader: true,
          },
          {
            name: "Sarah Chen",
            role: "CTO & Co-founder",
            bio: "Former Google engineer, AI/ML expert",
            avatar_url: "/placeholder.svg?height=80&width=80&text=SC",
            linkedin_url: "https://linkedin.com/in/sarahchen",
            is_leader: true,
          },
          {
            name: "Mike Rodriguez",
            role: "Lead Designer",
            bio: "Award-winning UX designer",
            avatar_url: "/placeholder.svg?height=80&width=80&text=MR",
            linkedin_url: "https://linkedin.com/in/mikerodriguez",
            is_leader: false,
          },
        ],
        open_positions: [
          {
            id: "pos-1",
            title: "Full-Stack Developer",
            type: "Technical",
            experience_level: "Mid-level",
            description: "Join our team to build scalable web applications",
            skills: ["React", "Node.js", "TypeScript", "PostgreSQL"],
            requirements: ["3+ years experience", "Strong problem-solving skills"],
            is_active: true,
          },
          {
            id: "pos-2",
            title: "Product Manager",
            type: "Business",
            experience_level: "Senior",
            description: "Lead product strategy and roadmap development",
            skills: ["Product Strategy", "User Research", "Analytics"],
            requirements: ["5+ years PM experience", "Technical background preferred"],
            is_active: true,
          },
        ],
        tasks: [
          {
            title: "Complete MVP development",
            description: "Finish core features for initial launch",
            type: "current",
            priority: 1,
            is_completed: false,
          },
          {
            title: "User testing and feedback",
            description: "Conduct user interviews and iterate on design",
            type: "current",
            priority: 2,
            is_completed: false,
          },
          {
            title: "Fundraising preparation",
            description: "Prepare pitch deck and financial projections",
            type: "future",
            priority: 1,
            is_completed: false,
          },
        ],
      }
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
      return null
    }

    // Increment view count
    await supabase
      .from("tapris")
      .update({ views: (data.views || 0) + 1 })
      .eq("id", id)

    return data
  }

  // Create new tapri
  static async createTapri(tapriData: TapriInsert, userId: string) {
    if (!isSupabaseConfigured()) {
      // Mock creation for demo
      console.log("Mock tapri creation:", tapriData)
      return {
        id: `mock-${Date.now()}`,
        ...tapriData,
        creator_id: userId,
        status: "pending",
        created_at: new Date().toISOString(),
      }
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
      console.log("Mock tapri update:", { id, updates, userId })
      return { id, ...updates }
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
      return mockTapris.slice(0, 2) // Return some mock data
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
      return []
    }

    return data || []
  }

  // Admin functions
  static async getPendingTapris() {
    if (!isSupabaseConfigured()) {
      return mockTapris.filter((t) => t.status === "pending").slice(0, 2)
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
      return []
    }

    return data || []
  }

  static async approveTapri(id: string) {
    if (!isSupabaseConfigured()) {
      console.log("Mock approve tapri:", id)
      return { id, status: "approved" }
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
      console.log("Mock reject tapri:", id)
      return { id, status: "rejected" }
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
      let results = mockTapris.filter(
        (tapri) =>
          tapri.title.toLowerCase().includes(query.toLowerCase()) ||
          tapri.description.toLowerCase().includes(query.toLowerCase()),
      )

      if (filters?.category && filters.category !== "all") {
        results = results.filter((t) => t.category.toLowerCase().includes(filters.category!.toLowerCase()))
      }

      if (filters?.stage && filters.stage !== "all") {
        results = results.filter((t) => t.stage.toLowerCase() === filters.stage!.toLowerCase())
      }

      if (filters?.location && filters.location !== "all") {
        results = results.filter((t) => t.location.toLowerCase().includes(filters.location!.toLowerCase()))
      }

      return results
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
      return []
    }

    return data || []
  }
}
