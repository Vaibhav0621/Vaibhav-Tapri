import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient()
    const { searchParams } = new URL(request.url)

    const search = searchParams.get("search") || ""
    const category = searchParams.get("category") || ""
    const stage = searchParams.get("stage") || ""
    const location = searchParams.get("location") || ""

    let query = supabase.from("tapris").select("*").eq("status", "approved").order("created_at", { ascending: false })

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
      query = query.eq("location", location)
    }

    const { data: tapris, error } = await query

    if (error) {
      console.error("Error fetching tapris:", error)
      return NextResponse.json({ error: "Failed to fetch tapris" }, { status: 500 })
    }

    return NextResponse.json({ tapris: tapris || [] })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
