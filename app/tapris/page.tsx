"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Filter, Users, Calendar, MapPin, ExternalLink, Clock, TrendingUp, Sparkles } from "lucide-react"
import Link from "next/link"

interface Tapri {
  id: string
  title: string
  description: string
  project_type: string
  timeline: string
  team_size: string
  location: string
  required_skills: string
  applications_count: number
  created_at: string
  creator: {
    full_name: string
    avatar_url?: string
  }
  status: string
}

// Mock data for development
const mockTapris: Tapri[] = [
  {
    id: "cb114509-61ca-42d4-b506-de8145149cb7",
    title: "EcoTech Startup",
    description:
      "Revolutionary sustainable technology platform connecting eco-conscious consumers with green products and carbon tracking.",
    project_type: "Tech Startup",
    timeline: "6 months",
    team_size: "4-6 people",
    location: "Remote/San Francisco",
    required_skills: "React, Node.js, Python, Machine Learning, UI/UX Design",
    applications_count: 23,
    created_at: "2024-01-15T10:30:00Z",
    creator: {
      full_name: "Sarah Chen",
      avatar_url: "/placeholder-user.jpg",
    },
    status: "active",
  },
  {
    id: "2",
    title: "FinTech Revolution",
    description: "Building the next generation of financial tools for Gen Z entrepreneurs and small business owners.",
    project_type: "FinTech",
    timeline: "8 months",
    team_size: "5-8 people",
    location: "New York/Remote",
    required_skills: "React Native, Blockchain, Security, Finance",
    applications_count: 31,
    created_at: "2024-01-10T14:20:00Z",
    creator: {
      full_name: "Alex Rodriguez",
      avatar_url: "/placeholder-user.jpg",
    },
    status: "active",
  },
  {
    id: "3",
    title: "AI Content Creator",
    description:
      "Democratizing content creation with AI-powered tools for social media influencers and small businesses.",
    project_type: "AI/ML",
    timeline: "4 months",
    team_size: "3-5 people",
    location: "Remote",
    required_skills: "Python, TensorFlow, React, Video Processing",
    applications_count: 18,
    created_at: "2024-01-08T09:15:00Z",
    creator: {
      full_name: "Maya Patel",
      avatar_url: "/placeholder-user.jpg",
    },
    status: "active",
  },
  {
    id: "4",
    title: "Social Impact Platform",
    description:
      "Connecting volunteers with local nonprofits to create meaningful community impact through technology.",
    project_type: "Social Impact",
    timeline: "5 months",
    team_size: "6-8 people",
    location: "Remote/Global",
    required_skills: "React, Node.js, MongoDB, Mobile Development",
    applications_count: 15,
    created_at: "2024-01-05T16:45:00Z",
    creator: {
      full_name: "Jordan Kim",
      avatar_url: "/placeholder-user.jpg",
    },
    status: "active",
  },
  {
    id: "5",
    title: "EdTech Innovation",
    description: "Personalized learning platform using AI to adapt to individual student needs and learning styles.",
    project_type: "EdTech",
    timeline: "7 months",
    team_size: "4-7 people",
    location: "Boston/Remote",
    required_skills: "Python, Machine Learning, React, Education Technology",
    applications_count: 27,
    created_at: "2024-01-03T11:30:00Z",
    creator: {
      full_name: "Emily Watson",
      avatar_url: "/placeholder-user.jpg",
    },
    status: "active",
  },
  {
    id: "6",
    title: "HealthTech Wearables",
    description: "Next-generation health monitoring devices with real-time analytics for preventive healthcare.",
    project_type: "HealthTech",
    timeline: "10 months",
    team_size: "8-12 people",
    location: "Seattle/Remote",
    required_skills: "IoT, Hardware Design, Mobile Apps, Data Analytics",
    applications_count: 42,
    created_at: "2024-01-01T08:00:00Z",
    creator: {
      full_name: "Dr. Michael Chang",
      avatar_url: "/placeholder-user.jpg",
    },
    status: "active",
  },
]

const neonColors = [
  "border-yellow-400 shadow-yellow-400/20",
  "border-cyan-400 shadow-cyan-400/20",
  "border-pink-400 shadow-pink-400/20",
  "border-green-400 shadow-green-400/20",
  "border-purple-400 shadow-purple-400/20",
  "border-orange-400 shadow-orange-400/20",
]

export default function TaprisPage() {
  const [tapris, setTapris] = useState<Tapri[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")

  useEffect(() => {
    fetchTapris()
  }, [])

  const fetchTapris = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch("/api/tapris")

      if (response.ok) {
        const data = await response.json()

        // Handle different API response structures
        let taprisArray: Tapri[] = []
        if (Array.isArray(data)) {
          taprisArray = data
        } else if (data && Array.isArray(data.tapris)) {
          taprisArray = data.tapris
        } else if (data && Array.isArray(data.data)) {
          taprisArray = data.data
        } else {
          console.warn("Unexpected API response structure:", data)
          taprisArray = mockTapris
        }

        setTapris(taprisArray)
      } else {
        console.warn("API request failed, using mock data")
        setTapris(mockTapris)
      }
    } catch (error) {
      console.error("Error fetching tapris:", error)
      setError("Failed to load projects. Showing sample data.")
      setTapris(mockTapris)
    } finally {
      setLoading(false)
    }
  }

  // Ensure tapris is always an array before filtering
  const safeTapris = Array.isArray(tapris) ? tapris : []

  const filteredTapris = safeTapris.filter((tapri) => {
    const matchesSearch =
      tapri.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tapri.description?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "all" || tapri.project_type === selectedType
    return matchesSearch && matchesType
  })

  const projectTypes = ["all", ...Array.from(new Set(safeTapris.map((t) => t.project_type).filter(Boolean)))]

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-yellow-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-yellow-950/20">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mb-4"></div>
            <p className="text-gray-600 dark:text-gray-300">Loading amazing projects...</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 rounded-2xl">
                <CardHeader>
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-5/6" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-yellow-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-yellow-950/20">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Discover Amazing Projects
          </div>
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
            Browse{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Tapris</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Join innovative projects, connect with ambitious entrepreneurs, and build the future together.
          </p>

          {error && (
            <div className="mt-4 p-3 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 rounded-xl text-sm">
              {error}
            </div>
          )}
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search projects, skills, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 rounded-xl border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
              />
            </div>
            <Button
              variant="outline"
              className="h-12 px-6 rounded-xl border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm hover:bg-yellow-50 dark:hover:bg-yellow-950/20 transition-all"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Project Type Filter */}
          <div className="flex flex-wrap gap-2">
            {projectTypes.map((type) => (
              <Button
                key={type}
                variant={selectedType === type ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType(type)}
                className={`rounded-full px-4 py-2 transition-all ${
                  selectedType === type
                    ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold shadow-lg hover:from-yellow-500 hover:to-yellow-600"
                    : "border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 hover:bg-yellow-50 dark:hover:bg-yellow-950/20 text-gray-700 dark:text-gray-300"
                }`}
              >
                {type === "all" ? "All Projects" : type}
              </Button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-yellow-600 mb-2">{filteredTapris.length}</div>
              <div className="text-gray-600 dark:text-gray-300 font-medium">Active Projects</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-yellow-600 mb-2">
                {filteredTapris.reduce((sum, t) => sum + (t.applications_count || 0), 0)}
              </div>
              <div className="text-gray-600 dark:text-gray-300 font-medium">Total Applications</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-yellow-600 mb-2">
                {new Set(filteredTapris.map((t) => t.project_type).filter(Boolean)).size}
              </div>
              <div className="text-gray-600 dark:text-gray-300 font-medium">Categories</div>
            </CardContent>
          </Card>
        </div>

        {/* Tapris Grid */}
        {filteredTapris.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No projects found</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">Try adjusting your search or filters</p>
            <Link href="/create-project">
              <Button className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-semibold rounded-xl px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <Sparkles className="w-5 h-5 mr-2" />
                Create Your Own Tapri
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTapris.map((tapri, index) => {
              const neonColor = neonColors[index % neonColors.length]
              const createdDate = new Date(tapri.created_at).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })

              return (
                <Card
                  key={tapri.id}
                  className={`group border-2 ${neonColor} shadow-lg hover:shadow-2xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 rounded-2xl overflow-hidden`}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-3">
                      <Badge
                        variant="secondary"
                        className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 px-3 py-1 rounded-full font-medium"
                      >
                        {tapri.project_type}
                      </Badge>
                      <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                        <Calendar className="w-3 h-3" />
                        {createdDate}
                      </div>
                    </div>

                    <CardTitle className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-yellow-600 transition-colors leading-tight">
                      {tapri.title}
                    </CardTitle>

                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-3">
                      {tapri.description}
                    </p>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      {/* Creator */}
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage
                            src={tapri.creator?.avatar_url || "/placeholder.svg"}
                            alt={tapri.creator?.full_name || "Creator"}
                          />
                          <AvatarFallback className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 text-xs font-semibold">
                            {(tapri.creator?.full_name || "U").charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white text-sm">
                            {tapri.creator?.full_name || "Unknown Creator"}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Project Creator</p>
                        </div>
                      </div>

                      {/* Project Details */}
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                          <Clock className="w-3 h-3 text-yellow-600" />
                          <span>{tapri.timeline || "TBD"}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                          <Users className="w-3 h-3 text-yellow-600" />
                          <span>{tapri.team_size || "TBD"}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 col-span-2">
                          <MapPin className="w-3 h-3 text-yellow-600" />
                          <span>{tapri.location || "Remote"}</span>
                        </div>
                      </div>

                      {/* Applications Count */}
                      <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800">
                        <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300">
                          <TrendingUp className="w-4 h-4 text-yellow-600" />
                          <span>{tapri.applications_count || 0} applications</span>
                        </div>

                        <Link href={`/tapris/${tapri.id}`}>
                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-black to-gray-800 hover:from-gray-800 hover:to-black text-white font-semibold rounded-xl px-4 py-2 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                          >
                            View Details
                            <ExternalLink className="w-3 h-3 ml-1" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center mt-16 py-12 bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-950/20 dark:to-yellow-900/20 rounded-3xl">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Ready to Start Your Own Project?</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of entrepreneurs who have launched their startups through Tapri. Create your project and find
            your perfect co-founders today.
          </p>
          <Link href="/create-project">
            <Button
              size="lg"
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold rounded-xl px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Create Your Tapri
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
