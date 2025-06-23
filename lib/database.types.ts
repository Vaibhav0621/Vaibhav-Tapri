export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          bio: string | null
          role: string
          is_admin: boolean
          skills: string[] | null
          experience_level: string
          linkedin_url: string | null
          github_url: string | null
          portfolio_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          role?: string
          is_admin?: boolean
          skills?: string[] | null
          experience_level?: string
          linkedin_url?: string | null
          github_url?: string | null
          portfolio_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          role?: string
          is_admin?: boolean
          skills?: string[] | null
          experience_level?: string
          linkedin_url?: string | null
          github_url?: string | null
          portfolio_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      tapris: {
        Row: {
          id: string
          title: string
          tagline: string | null
          description: string
          category: string
          stage: string
          location: string
          team_size: number
          open_positions: number
          website: string | null
          banner_url: string | null
          logo_url: string | null
          mission: string | null
          vision: string | null
          status: string
          creator_id: string | null
          created_at: string
          updated_at: string
          published_at: string | null
          views: number
          applications: number
          required_skills: string[] | null
          benefits: string[] | null
          equity_range: string | null
          salary_range: string | null
          commitment_level: string
        }
        Insert: {
          id?: string
          title: string
          tagline?: string | null
          description: string
          category: string
          stage: string
          location?: string
          team_size?: number
          open_positions?: number
          website?: string | null
          banner_url?: string | null
          logo_url?: string | null
          mission?: string | null
          vision?: string | null
          status?: string
          creator_id?: string | null
          created_at?: string
          updated_at?: string
          published_at?: string | null
          views?: number
          applications?: number
          required_skills?: string[] | null
          benefits?: string[] | null
          equity_range?: string | null
          salary_range?: string | null
          commitment_level?: string
        }
        Update: {
          id?: string
          title?: string
          tagline?: string | null
          description?: string
          category?: string
          stage?: string
          location?: string
          team_size?: number
          open_positions?: number
          website?: string | null
          banner_url?: string | null
          logo_url?: string | null
          mission?: string | null
          vision?: string | null
          status?: string
          creator_id?: string | null
          created_at?: string
          updated_at?: string
          published_at?: string | null
          views?: number
          applications?: number
          required_skills?: string[] | null
          benefits?: string[] | null
          equity_range?: string | null
          salary_range?: string | null
          commitment_level?: string
        }
      }
      applications: {
        Row: {
          id: string
          tapri_id: string
          applicant_id: string
          status: string
          cover_letter: string | null
          resume_url: string | null
          portfolio_url: string | null
          availability: string | null
          motivation: string | null
          relevant_experience: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          tapri_id: string
          applicant_id: string
          status?: string
          cover_letter?: string | null
          resume_url?: string | null
          portfolio_url?: string | null
          availability?: string | null
          motivation?: string | null
          relevant_experience?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          tapri_id?: string
          applicant_id?: string
          status?: string
          cover_letter?: string | null
          resume_url?: string | null
          portfolio_url?: string | null
          availability?: string | null
          motivation?: string | null
          relevant_experience?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      conversations: {
        Row: {
          id: string
          title: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      conversation_participants: {
        Row: {
          id: string
          conversation_id: string
          user_id: string
          joined_at: string
        }
        Insert: {
          id?: string
          conversation_id: string
          user_id: string
          joined_at?: string
        }
        Update: {
          id?: string
          conversation_id?: string
          user_id?: string
          joined_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          conversation_id: string
          sender_id: string
          content: string
          message_type: string
          created_at: string
          read_at: string | null
          edited_at: string | null
        }
        Insert: {
          id?: string
          conversation_id: string
          sender_id: string
          content: string
          message_type?: string
          created_at?: string
          read_at?: string | null
          edited_at?: string | null
        }
        Update: {
          id?: string
          conversation_id?: string
          sender_id?: string
          content?: string
          message_type?: string
          created_at?: string
          read_at?: string | null
          edited_at?: string | null
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          title: string
          message: string
          type: string
          read: boolean
          action_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          message: string
          type: string
          read?: boolean
          action_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          message?: string
          type?: string
          read?: boolean
          action_url?: string | null
          created_at?: string
        }
      }
      newsletter_subscribers: {
        Row: {
          id: string
          email: string
          name: string | null
          subscribed_at: string
          is_active: boolean
        }
        Insert: {
          id?: string
          email: string
          name?: string | null
          subscribed_at?: string
          is_active?: boolean
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          subscribed_at?: string
          is_active?: boolean
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      increment_tapri_applications: {
        Args: { tapri_id: string }
        Returns: undefined
      }
      increment_tapri_views: {
        Args: { tapri_id: string }
        Returns: undefined
      }
      get_or_create_conversation: {
        Args: { user1_id: string; user2_id: string }
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}
