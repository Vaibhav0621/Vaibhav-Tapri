// lib/services/tapri-service.ts
// This service uses the SERVER client.

// CORRECT IMPORT
import { createClient } from '@/lib/supabase/server'

export const TapriService = {
  // getApprovedTapris and getTapriBySlug both run on the server
  // and therefore use the server client.
  async getApprovedTapris(page: number, limit: number, category?: string, stage?: string) {
    const supabase = createClient() // CORRECTLY calling the server client
    let query = supabase
      .from('tapris').select(`*, profiles ( full_name, avatar_url )`)
      .eq('status', 'approved').order('created_at', { ascending: false });
    // ... rest of filtering logic ...
    return await query;
  },

  async getTapriBySlug(slug: string) {
    const supabase = createClient() // CORRECTLY calling the server client
    const { data, error } = await supabase.from('tapris')
      .select(`*, profiles ( full_name, avatar_url )`)
      .eq('slug', slug).eq('status', 'approved').single();
    if (error) { console.warn(`Tapri slug "${slug}" not found.`); }
    return { data, error };
  },

  // Admin functions, correctly using the server client for actions
  async getPendingTapris() {
      const supabase = createClient();
      const { data } = await supabase.from('tapris').select('*, profiles(full_name, email)').eq('status', 'pending');
      return data || [];
  },
  async approveTapri(tapriId: string) {
      const supabase = createClient();
      await supabase.from('tapris').update({ status: 'approved' }).eq('id', tapriId);
  },
  async rejectTapri(tapriId: string) {
      const supabase = createClient();
      await supabase.from('tapris').update({ status: 'rejected' }).eq('id', tapriId);
  }
}
