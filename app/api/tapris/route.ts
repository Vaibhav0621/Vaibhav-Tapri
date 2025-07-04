import { type NextRequest, NextResponse } from "next/server"
import { createServerComponentClient } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search")
    const category = searchParams.get("category")
    const stage = searchParams.get("stage")
    const location = searchParams.get("location")

    const supabase = createServerComponentClient()

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
      .order("created_at", { ascending: false })

    // Apply filters
    if (search) {
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%,tagline.ilike.%${search}%`)
    }

    if (category && category !== "all") {
      query = query.eq("category", category)
    }

    if (stage && stage !== "all") {
      query = query.eq("stage", stage)
    }

    if (location && location !== "all") {
      query = query.ilike("location", `%${location}%`)
    }

    const { data: tapris, error } = await query.limit(50)

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to fetch tapris", details: error.message }, { status: 500 })
    }

    return NextResponse.json({ tapris: tapris || [] })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
