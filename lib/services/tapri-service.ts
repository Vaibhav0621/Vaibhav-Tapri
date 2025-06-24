import { createClient } from '@/lib/supabase/server'

export const TapriService = {
  async getTapriBySlug(slug: string) {
    const supabase = createClient()
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(slug)
    
    const query = supabase
      .from('tapris')
      .select('id, title, tagline, description, category, stage, location, team_size, open_positions, website, banner_url, logo_url, mission, vision, status, required_skills, commitment_level, views, applications')
      .single()

    let data, error
    if (isUUID) {
      ({ data, error } = await query.eq('id', slug))
    } else {
      // Convert slug to title (e.g., "my-awesome-project" -> "My Awesome Project")
      const title = slug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
      ({ data, error } = await query.ilike('title', title))
    }

    if (error) {
      console.error('Supabase error in getTapriBySlug:', error.message)
      throw error
    }
    if (!data) {
      console.error('No data found for slug:', slug)
      throw new Error('Tapri not found')
    }
    return { data }
  },
}
