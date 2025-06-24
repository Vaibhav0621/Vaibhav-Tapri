import { createClient } from '@/lib/supabase/server'

export const TapriService = {
  async getApprovedTapris(page: number, limit: number, category?: string, stage?: string) {
    const supabase = createClient()
    let query = supabase
      .from('tapris')
      .select(`
        id, title, tagline, description, category, stage, location, team_size, open_positions, 
        website, banner_url, logo_url, mission, vision, status, created_at, updated_at, 
        published_at, views, applications, required_skills, commitment_level, benefits, 
        equity_range, salary_range, creator_id,
        profiles!creator_id(id, full_name, avatar_url)
      `)
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
    if (error) {
      console.error('Supabase error in getApprovedTapris:', error)
      throw new Error(`Failed to fetch approved tapris: ${error.message}`)
    }
    return { data }
  },

  async getTapriBySlug(slug: string) {
    const supabase = createClient()
    let query = supabase
      .from('tapris')
      .select(`
        id, title, tagline, description, category, stage, location, team_size, open_positions, 
        website, banner_url, logo_url, mission, vision, status, created_at, updated_at, 
        published_at, views, applications, required_skills, commitment_level, benefits, 
        equity_range, salary_range, creator_id,
        profiles!creator_id(id, full_name, avatar_url)
      `)
      .single()

    if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(slug)) {
      query = query.eq('id', slug)
    } else {
      // Exact title match (case-insensitive)
      const title = slug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
      query = query.eq('title', title)
    }

    const { data, error } = await query
    if (error) {
      console.error('Supabase error in getTapriBySlug:', { slug, error })
      throw new Error(`Failed to fetch tapri by slug ${slug}: ${error.message}`)
    }
    if (!data) {
      console.error('No tapri found for slug:', slug)
      throw new Error('Tapri not found')
    }
    return { data }
  },
}
