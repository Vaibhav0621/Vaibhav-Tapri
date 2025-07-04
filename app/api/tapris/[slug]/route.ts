import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

// Mock data for development
const mockTapri = {
  id: "cb114509-61ca-42d4-b506-de8145149cb7",
  title: "EcoTech Startup",
  description: "Revolutionary sustainable technology platform connecting eco-conscious consumers with green products",
  problem_statement:
    "Climate change is accelerating, but consumers struggle to find and verify truly sustainable products. Current marketplaces lack transparency and make it difficult to make eco-friendly choices.",
  solution_approach:
    "We're building an AI-powered platform that verifies sustainability claims, provides carbon footprint tracking, and connects consumers directly with verified eco-friendly brands.",
  target_audience:
    "Environmentally conscious millennials and Gen Z consumers aged 18-35 who prioritize sustainability in their purchasing decisions",
  required_skills: "React, Node.js, Python, Machine Learning, UI/UX Design, Digital Marketing",
  project_type: "Tech Startup",
  timeline: "6 months",
  team_size: "4-6 people",
  location: "Remote/San Francisco",
  website: "https://ecotech-startup.com",
  contact_email: "founder@ecotech-startup.com",
  created_at: "2024-01-15T10:30:00Z",
  creator: {
    full_name: "Sarah Chen",
    avatar_url: "/placeholder-user.jpg",
    bio: "Environmental engineer turned entrepreneur. Passionate about using technology to solve climate challenges.",
  },
  applications_count: 23,
  status: "active",
}

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const supabase = createClient()

    // Try to fetch from database first
    const { data: tapri, error } = await supabase
      .from("tapris")
      .select(`
        *,
        creator:profiles(full_name, avatar_url, bio)
      `)
      .eq("id", params.slug)
      .single()

    if (error || !tapri) {
      console.log("Database error or no data found, using mock data:", error)
      return NextResponse.json(mockTapri)
    }

    // Count applications for this tapri
    const { count: applicationsCount } = await supabase
      .from("applications")
      .select("*", { count: "exact", head: true })
      .eq("tapri_id", params.slug)

    return NextResponse.json({
      ...tapri,
      applications_count: applicationsCount || 0,
    })
  } catch (error) {
    console.error("Error fetching tapri:", error)
    return NextResponse.json(mockTapri)
  }
}
