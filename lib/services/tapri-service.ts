import { createClient } from '@/lib/supabase/server'

export const TapriService = {
  async getApprovedTapris(page: number, limit: number, category?: string, stage?: string) {
    const supabase = createClient()
    let query = supabase
      .from('tapris')
      .select('id, title, tagline, description, category, stage, location, team_size, open_positions, banner_url, status, views, applications, created_at, website, profiles(full_name, avatar_url)')
      .eq('status', 'approved')
      .order('created_at', { ascending: false })

    if (category && category !== 'all') {
      query = query.eq('category', category)
    }
    if (stage && stage !== 'all') {
      query = query.eq('stage', stage)
    }

    const from = (page - 1) * limit
    const to = from + limit - 1
    query = query.range(from, to)

    const { data, error } = await query
    if (error) throw new Error(error.message)
    return { data }
  },

  async getTapriBySlug(slug: string) {
    const supabase = createClient()
    let query = supabase
      .from('tapris')
      .select('id, title, tagline, description, category, stage, location, team_size, open_positions, banner_url, status, views, applications, created_at, website, mission, vision, required_skills, commitment_level, profiles(full_name, avatar_url)')

    if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(slug)) {
      query = query.eq('id', slug)
    } else {
      query = query.ilike('title', `%${slug.replace(/-/g, ' ')}%`)
    }

    const { data, error } = await query.single()
    if (error) throw new Error(error.message)
    return { data }
  },
}
