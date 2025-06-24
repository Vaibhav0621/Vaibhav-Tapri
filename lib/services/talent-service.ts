// lib/services/talent-service.ts

import { createClient } from '@/lib/supabase/server';
import { supabase } from "@/lib/supabase" // Client for mutations from client components


// Type definition for a talent profile as it will be used on the page.
export type TalentProfile = {
  id: string
  full_name: string | null
  avatar_url: string | null
  headline: string | null
  location: string | null
  skills: string[] | null
  availability: string | null
  points_earned: number
  linkedin_url: string | null
  portfolio_url: string | null
}

export const TalentService = {
  /**
   * Fetches discoverable talent profiles.
   * This is a server-side function, safe to call from page components.
   */
  async getDiscoverableTalent(
    page: number = 1, 
    limit: number = 24, 
    filters: { skill?: string; availability?: string; location?: string }
  ) {
    const supabase = createClient();
    
    let query = supabase
      .from("profiles")
      .select("id, full_name, avatar_url, headline, location, skills, availability, points_earned, linkedin_url, portfolio_url")
      .eq("is_discoverable", true) // The key filter: only users who opted in.
      .order("points_earned", { ascending: false }) // Gamification: reward active users.
      .range((page - 1) * limit, page * limit - 1);

    if (filters.skill && filters.skill !== 'all') {
      // The @> operator checks if the skills array contains the specified skill.
      query = query.contains('skills', [filters.skill]);
    }
    if (filters.availability && filters.availability !== 'all') {
      query = query.eq('availability', filters.availability);
    }
     if (filters.location && filters.location !== 'all') {
      // Use case-insensitive 'ilike' for flexible location search
      query = query.ilike('location', `%${filters.location}%`);
    }

    return await query;
  },

  /**
   * Fetches the projects (Tapris) managed by a specific user.
   * This is used in the invitation modal so a user can choose which of their projects to invite someone to.
   * This function uses the client-side `supabase` instance because it will be called from a client component modal.
   */
  async getUserManagedTapris(userId: string): Promise<{ data: { id: string, title: string }[] | null, error: any }> {
     // NOTE: This assumes a 'creator_id' column on your tapris table.
    return await supabase
        .from("tapris")
        .select("id, title")
        .eq("creator_id", userId)
        .eq("status", "approved"); // Only allow inviting to approved projects.
  },

  /**
   * Sends an invitation to a talent for a specific project.
   * Uses the client-side `supabase` instance for mutation.
   */
  async sendInvitation({ tapriId, invitedUserId, invitingUserId }: { tapriId: string, invitedUserId: string, invitingUserId: string }): Promise<{ data: any, error: any }> {
    const { data, error } = await supabase.from("invitations").insert({
        tapri_id: tapriId,
        invited_user_id: invitedUserId,
        inviting_user_id: invitingUserId,
        status: "pending",
      });

    if (!error) {
        // Here you could trigger a Supabase Edge Function to send a real-time notification or an email.
        console.log(`(Hook) Push notification sent for invitation to user ${invitedUserId}`);
    }

    return { data, error };
  }
};
