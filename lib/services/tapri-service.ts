// lib/services/tapri-service.ts

import { createClient } from '@/lib/supabase/server'

export const TapriService = {
  // This is the function for the BROWSE page (Part 2)
  async getApprovedTapris(page: number, limit: number, category?: string, stage?: string) {
    const supabase = createClient();
    
    let query = supabase
      .from('tapris')
      .select(`
        id, slug, title, tagline, description, category, stage, location, 
        team_size, open_positions, banner_url, status, views, applications, 
        created_at, website,
        profiles ( full_name, avatar_url )
      `)
      .eq('status', 'approved')
      .order('created_at', { ascending: false });

    if (category && category !== 'all') {
      query = query.eq('category', category);
    }
    if (stage && stage !== 'all') {
      query = query.eq('stage', stage);
    }

    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);

    const { data, error } = await query;
    
    if (error) {
        console.error("Supabase error in getApprovedTapris:", error);
        return { data: [], error };
    }

    return { data, error: null };
  },

  // NEW & CRITICAL: This is the function for the DETAIL page (Part 3)
  // It fetches a single, approved project using its URL slug.
  async getTapriBySlug(slug: string) {
    const supabase = createClient();
    
    const { data, error } = await supabase
        .from('tapris')
        .select(`
          id, slug, title, tagline, description, category, stage, location, 
          team_size, open_positions, banner_url, logo_url, mission, vision,
          status, views, applications, created_at, website, required_skills, 
          commitment_level,
          profiles ( full_name, avatar_url )
        `)
        .eq('slug', slug)
        .eq('status', 'approved') // Ensures no one can access a pending/rejected project via URL guessing
        .single(); // Fetches one specific record or returns an error

     if (error) {
        // This is not necessarily an application error, it could just mean "not found"
        console.warn(`Tapri with slug "${slug}" not found or not approved.`, error.message);
        return { data: null, error };
     }

     return { data, error: null };
  }
};
