"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import type { User, Session } from "@supabase/supabase-js"
import type { Database } from "@/lib/database.types"

type Profile = Database["public"]["Tables"]["profiles"]["Row"]

interface AuthContextType {
  user: User | null
  profile: Profile | null
  session: Session | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error?: any }>
  signUp: (email: string, password: string, name: string) => Promise<{ error?: any }>
  signOut: () => Promise<void>
  updateProfile: (updates: any) => Promise<void>
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Function to check if Supabase is configured (replace with your actual check)
const isSupabaseConfigured = () => {
  // Replace this with your actual check for Supabase configuration
  // For example, check if the Supabase URL and key are set
  return !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchProfile = async (userId: string) => {
    // Check if Supabase is properly configured first
    if (!isSupabaseConfigured()) {
      // Return mock profile for demo
      return {
        id: userId,
        email: user?.email || "demo@tapri.com",
        full_name: "Demo User",
        avatar_url: "/placeholder.svg?height=100&width=100&text=DU",
        bio: "Demo user for Tapri platform",
        role: "user",
        is_admin: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
    }

    try {
      const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()

      if (error) {
        // If the table doesn't exist or other database errors, return mock profile
        console.warn("Database not fully configured, using demo profile:", error.message)
        return {
          id: userId,
          email: user?.email || "demo@tapri.com",
          full_name: user?.user_metadata?.full_name || "Demo User",
          avatar_url: "/placeholder.svg?height=100&width=100&text=DU",
          bio: "Demo user for Tapri platform",
          role: "user",
          is_admin: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }
      }

      return data
    } catch (error) {
      console.warn("Error fetching profile, using demo profile:", error)
      return {
        id: userId,
        email: user?.email || "demo@tapri.com",
        full_name: user?.user_metadata?.full_name || "Demo User",
        avatar_url: "/placeholder.svg?height=100&width=100&text=DU",
        bio: "Demo user for Tapri platform",
        role: "user",
        is_admin: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
    }
  }

  const refreshProfile = async () => {
    if (user) {
      const profileData = await fetchProfile(user.id)
      setProfile(profileData)
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        return { error }
      }

      return { error: null }
    } catch (error) {
      return { error }
    }
  }

  const signUp = async (email: string, password: string, name: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      })

      if (error) {
        return { error }
      }

      // Don't try to create profile if database isn't set up
      if (!isSupabaseConfigured()) {
        console.log("Demo mode: User signup successful")
      }

      return { error: null }
    } catch (error) {
      return { error }
    }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setProfile(null)
    setSession(null)
  }

  const updateProfile = async (updates: any) => {
    if (!user) return

    // If database isn't configured, just update local state
    if (!isSupabaseConfigured()) {
      console.log("Demo mode: Profile update", updates)
      setProfile((prev) => (prev ? { ...prev, ...updates } : null))
      return
    }

    try {
      const { data, error } = await supabase.from("profiles").update(updates).eq("id", user.id).select().single()

      if (error) {
        // If table doesn't exist, just update local state
        console.warn("Database not configured, updating local profile only")
        setProfile((prev) => (prev ? { ...prev, ...updates } : null))
        return
      }

      setProfile(data)
    } catch (error) {
      console.warn("Error updating profile:", error)
      // Fallback to local state update
      setProfile((prev) => (prev ? { ...prev, ...updates } : null))
    }
  }

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession()

        if (error) {
          console.error("Error getting session:", error)
        } else {
          setSession(session)
          setUser(session?.user ?? null)

          if (session?.user) {
            const profileData = await fetchProfile(session.user.id)
            setProfile(profileData)
          }
        }
      } catch (error) {
        console.error("Error in getInitialSession:", error)
      } finally {
        setLoading(false)
      }
    }

    getInitialSession()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session)
      setUser(session?.user ?? null)

      if (session?.user) {
        const profileData = await fetchProfile(session.user.id)
        setProfile(profileData)
      } else {
        setProfile(null)
      }

      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        session,
        loading,
        signIn,
        signUp,
        signOut,
        updateProfile,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
