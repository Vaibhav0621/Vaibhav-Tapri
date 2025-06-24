// lib/database.types.ts
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

// The crucial line: exporting the 'Database' type definition
export interface Database {
  public: {
    Tables: {
      tapris: { Row: any, Insert: any, Update: any }, // Use 'any' as a placeholder for now
      profiles: { Row: any, Insert: any, Update: any },
      invitations: { Row: any, Insert: any, Update: any },
      applications: { Row: any, Insert: any, Update: any },
      // ... Add other tables here ...
    },
    Views: { [_in in never]: never },
    Functions: { [_in in never]: never },
    Enums: { [_in in never]: never },
    CompositeTypes: { [_in in never]: never },
  }
}

// NOTE: To get the full, accurate types, you should run the Supabase CLI command:
// npx supabase gen types typescript --project-id YOUR_PROJECT_ID > lib/database.types.ts
// But the code above will fix the export error immediately.
