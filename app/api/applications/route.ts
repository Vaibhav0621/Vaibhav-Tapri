import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const applicationData = await request.json()

    const { data, error } = await supabase.from("applications").insert(applicationData).select()

    if (error) throw error

    // Increment application count
    await supabase.rpc("increment_tapri_applications", {
      tapri_id: applicationData.tapri_id,
    })

    return NextResponse.json(data[0])
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const tapriId = searchParams.get("tapri_id")
    const userId = searchParams.get("user_id")

    let query = supabase.from("applications").select(`
        *,
        profiles!applications_applicant_id_fkey (
          full_name,
          avatar_url,
          email
        ),
        tapris!applications_tapri_id_fkey (
          title
        )
      `)

    if (tapriId) {
      query = query.eq("tapri_id", tapriId)
    }

    if (userId) {
      query = query.eq("applicant_id", userId)
    }

    const { data, error } = await query.order("created_at", { ascending: false })

    if (error) throw error

    return NextResponse.json(data)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
