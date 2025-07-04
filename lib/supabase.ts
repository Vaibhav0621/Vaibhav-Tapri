import { createClient } from "@supabase/supabase-js"
import type { Database } from "./database.types"

// Environment variables with validation
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co"
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key"
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// For client-side operations
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
})

// For server components - simplified version
export const createSupabaseServerClient = () => {
  return createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

// For admin operations (server-side only)
export const supabaseAdmin = supabaseServiceRoleKey
  ? createClient<Database>(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  : createClient<Database>(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })

// Helper to check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  const hasValidUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_URL !== "https://placeholder.supabase.co" &&
    process.env.NEXT_PUBLIC_SUPABASE_URL.includes("supabase.co")

  const hasValidKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== "placeholder-anon-key"

  return hasValidUrl && hasValidKey
}

// Helper to check database connectivity
export const checkDatabaseConnection = async () => {
  if (!isSupabaseConfigured()) return false

  try {
    const { error } = await supabase.from("profiles").select("id").limit(1)
    return !error
  } catch {
    return false
  }
}

// Helper function to check if admin client is available
export const isAdminAvailable = () => !!supabaseServiceRoleKey

// Mock data for when Supabase isn't fully configured
export const mockTapris = [
  {
    id: "1",
    title: "EcoTech Solutions",
    tagline: "Sustainable technology for a better tomorrow",
    description:
      "We're building innovative solutions to combat climate change through technology. Join us in creating a sustainable future with renewable energy systems and smart environmental monitoring.",
    category: "Environmental Tech",
    stage: "MVP",
    location: "Remote",
    team_size: 8,
    open_positions: 3,
    banner_url: "/placeholder.svg?height=200&width=400&text=EcoTech",
    logo_url: "/placeholder.svg?height=80&width=80&text=ET",
    status: "approved",
    views: 1250,
    applications: 45,
    created_at: new Date().toISOString(),
    website: "https://ecotech.example.com",
    mission: "To create sustainable technology solutions that help combat climate change",
    vision: "A world powered by clean, renewable energy",
  },
  {
    id: "2",
    title: "HealthAI Platform",
    tagline: "AI-powered healthcare diagnostics",
    description:
      "Revolutionizing healthcare with AI-driven diagnostic tools that help doctors make faster, more accurate decisions. Our platform uses machine learning to analyze medical data and provide insights.",
    category: "HealthTech",
    stage: "Prototype",
    location: "San Francisco",
    team_size: 12,
    open_positions: 5,
    banner_url: "/placeholder.svg?height=200&width=400&text=HealthAI",
    logo_url: "/placeholder.svg?height=80&width=80&text=HA",
    status: "approved",
    views: 890,
    applications: 32,
    created_at: new Date().toISOString(),
    website: "https://healthai.example.com",
    mission: "To democratize access to advanced medical diagnostics through AI",
    vision: "A world where every patient receives accurate, timely medical care",
  },
  {
    id: "3",
    title: "EduConnect",
    tagline: "Connecting students with mentors worldwide",
    description:
      "A platform that bridges the gap between students and industry professionals for mentorship and career guidance. We're building the future of personalized education and career development.",
    category: "EdTech",
    stage: "Idea",
    location: "Remote",
    team_size: 4,
    open_positions: 2,
    banner_url: "/placeholder.svg?height=200&width=400&text=EduConnect",
    logo_url: "/placeholder.svg?height=80&width=80&text=EC",
    status: "approved",
    views: 567,
    applications: 18,
    created_at: new Date().toISOString(),
    website: "https://educonnect.example.com",
    mission: "To connect every student with the right mentor for their career journey",
    vision: "A world where quality mentorship is accessible to all",
  },
  {
    id: "4",
    title: "FinTech Revolution",
    tagline: "Democratizing financial services",
    description:
      "Building next-generation financial tools that make banking, investing, and financial planning accessible to everyone. Our platform uses blockchain and AI to create transparent, efficient financial services.",
    category: "FinTech",
    stage: "Growth",
    location: "New York",
    team_size: 15,
    open_positions: 7,
    banner_url: "/placeholder.svg?height=200&width=400&text=FinTech",
    logo_url: "/placeholder.svg?height=80&width=80&text=FR",
    status: "approved",
    views: 2100,
    applications: 89,
    created_at: new Date().toISOString(),
    website: "https://fintech.example.com",
    mission: "To make financial services accessible and transparent for everyone",
    vision: "A world where financial freedom is within everyone's reach",
  },
  {
    id: "5",
    title: "Smart City Solutions",
    tagline: "Building the cities of tomorrow",
    description:
      "Developing IoT and smart infrastructure solutions to make cities more efficient, sustainable, and livable. Our technology helps optimize traffic, reduce energy consumption, and improve quality of life.",
    category: "Smart Cities",
    stage: "Prototype",
    location: "Austin",
    team_size: 10,
    open_positions: 4,
    banner_url: "/placeholder.svg?height=200&width=400&text=Smart+City",
    logo_url: "/placeholder.svg?height=80&width=80&text=SC",
    status: "approved",
    views: 743,
    applications: 28,
    created_at: new Date().toISOString(),
    website: "https://smartcity.example.com",
    mission: "To create smarter, more sustainable urban environments",
    vision: "Cities that work seamlessly for all their inhabitants",
  },
  {
    id: "6",
    title: "AgriTech Innovation",
    tagline: "Precision farming for the future",
    description:
      "Using drones, sensors, and AI to revolutionize agriculture. Our platform helps farmers optimize crop yields, reduce waste, and practice sustainable farming through data-driven insights.",
    category: "AgriTech",
    stage: "MVP",
    location: "Remote",
    team_size: 6,
    open_positions: 3,
    banner_url: "/placeholder.svg?height=200&width=400&text=AgriTech",
    logo_url: "/placeholder.svg?height=80&width=80&text=AT",
    status: "approved",
    views: 456,
    applications: 15,
    created_at: new Date().toISOString(),
    website: "https://agritech.example.com",
    mission: "To feed the world sustainably through smart farming technology",
    vision: "A future where agriculture is both productive and environmentally friendly",
  },
]

// Mock user profiles
export const mockProfiles = [
  {
    id: "user-1",
    email: "demo@tapri.com",
    full_name: "Demo User",
    avatar_url: "/placeholder.svg?height=100&width=100&text=DU",
    bio: "Passionate entrepreneur and tech enthusiast",
    role: "user",
    is_admin: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]
