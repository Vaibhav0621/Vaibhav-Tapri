// lib/services/tapri-service.ts

// CORRECT IMPORT for a server-side service
import { createClient } from '@/lib/supabase/server'

export const TapriService = {
  async getApprovedTapris(page: number, limit: number, category?: string, stage?: string) {
    const supabase = createClient() // Correctly calling the server client
    // ... rest of the function logic is fine
  },

  async getTapriBySlug(slug: string) {
    const supabase = createClient() // Correctly calling the server client
    // ... rest of the function logic is fine
  },

  // ADDING back the admin functions that your other components might be using
  async getPendingTapris() {
      const supabase = createClient()
      const { data } = await supabase.from('tapris').select('*, profiles(full_name, email)').eq('status', 'pending');
      return data || [];
  },

  async approveTapri(tapriId: string) {
      const supabase = createClient()
      await supabase.from('tapris').update({ status: 'approved' }).eq('id', tapriId);
  },

  async rejectTapri(tapriId: string) {
      const supabase = createClient()
      await supabase.from('tapris').update({ status: 'rejected' }).eq('id', tapriId);
  }
}
