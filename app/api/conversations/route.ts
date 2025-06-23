import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const { user1_id, user2_id } = await request.json()

    const { data, error } = await supabase.rpc("get_or_create_conversation", { user1_id, user2_id })

    if (error) throw error

    return NextResponse.json({ conversation_id: data })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
