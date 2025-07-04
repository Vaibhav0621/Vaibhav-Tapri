import { createClient } from "@supabase/supabase-js"
import type { Database } from "./database.types"

// Your Supabase configuration
const supabaseUrl = "https://rvflrwmfxgmxjnecsoba.supabase.co"
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ2Zmxyd21meGdteGpuZWNzb2JhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgxOTEzMDQsImV4cCI6MjA2Mzc2NzMwNH0.EqTo6E-qtiG3iR5191JwIwubGrEyQhaClx6Rb7LPoS0"

// Create the main Supabase client
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
})

// Helper function to check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return !!(supabaseUrl && supabaseAnonKey && supabaseUrl.includes("supabase.co"))
}

// Server-side client for API routes
export const createServerClient = () => {
  return createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}

// Admin client (if service role key is available)
export const createAdminClient = () => {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!serviceRoleKey) {
    throw new Error("Service role key not configured")
  }

  return createClient<Database>(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}

// Helper to check database connectivity
export const checkDatabaseConnection = async () => {
  try {
    const { error } = await supabase.from("profiles").select("id").limit(1)
    return !error
  } catch {
    return false
  }
}
