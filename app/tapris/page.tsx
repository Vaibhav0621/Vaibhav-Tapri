"use client"
import { useState, useEffect, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, Users, Eye, TrendingUp, Award, Clock, Filter, AlertCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { SetupBanner } from "@/components/setup-banner"
import { isSupabaseConfigured } from "@/lib/supabase"
import { TapriService } from "@/lib/services/tapri-service"
import { Alert, AlertDescription } from "@/components/ui/alert"
import  staticProjects  from "./[id]/page"

type Tapri = {
  id: string
  title: string
  tagline: string | null
  description: string
  category: string
  stage: string
  location: string
  team_size: number
  open_positions: number
  banner_url: string | null
  status: string
  views: number
  applications: number
  created_at: string
  website: string | null
  profiles?: {
    full_name: string | null
    avatar_url: string | null
  }
}

// Helper to map static TapriData to Tapri type used here
function mapStaticToTapri(staticTapri: any, id: any) {
  return {
    id: id,
    title: staticTapri.title,
    tagline: staticTapri.tagline,
    description: staticTapri.description,
    category: staticTapri.category,
    stage: staticTapri.stage,
    location: staticTapri.location,
    team_size: staticTapri.teamSize,
    open_positions: staticTapri.openPositions,
    banner_url: staticTapri.bannerImage,
    status: staticTapri.status === "recruiting" ? "approved" : staticTapri.status,
    views: staticTapri.views,
    applications: staticTapri.applications,
    created_at: staticTapri.createdAt,
    website: staticTapri.website,
    profiles: staticTapri.teamLeader
      ? {
          full_name: staticTapri.teamLeader.name,
          avatar_url: staticTapri.teamLeader.image,
        }
      : undefined,
  }
}

export default function TaprisPage() {
  const isConfigured = isSupabaseConfigured()
  const [tapris, setTapris] = useState<Tapri[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStage, setSelectedStage] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")

  useEffect(() => {
    async function fetchTapris() {
      if (!isConfigured) {
        setError("Database not configured. Please set up your Supabase connection.")
        setLoading(false)
        return
      }

      setLoading(true)
      setError(null)

      try {
        const { data } = await TapriService.getApprovedTapris(1, 12, selectedCategory, selectedStage)
        // Map static tapris to Tapri type
        const staticTapris = Object.entries(staticProjects).map(([id, tapri]) => mapStaticToTapri(tapri, id))
        // Remove any db tapri with same id as static
        const filteredDbTapris = (data || []).filter(
          (t) => !staticTapris.some((s) => s.id && t.id && s.id.toLowerCase() === t.id.toLowerCase())
        )
        setTapris([...staticTapris, ...filteredDbTapris])
      } catch (error: any) {
        console.error("Error fetching tapris:", error)
        setError(error.message || "Failed to load tapris")
        setTapris([])
      } finally {
        setLoading(false)
      }
    }

    fetchTapris()
  }, [selectedCategory, selectedStage, isConfigured])

  // Filter tapris based on search term and location
  const filteredTapris = useMemo(() => {
    let filtered = tapris

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (tapri) =>
          tapri.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tapri.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (tapri.tagline && tapri.tagline.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    // Location filter
    if (selectedLocation !== "all") {
      filtered = filtered.filter((tapri) => tapri.location.toLowerCase().includes(selectedLocation.toLowerCase()))
    }

    return filtered
  }, [tapris, searchTerm, selectedLocation])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
      case "rejected":
        return "bg-red-100 text-red-800 hover:bg-red-200"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
    }
  }

  const getStageIcon = (stage: string) => {
    if (stage.includes("MVP") || stage.includes("Prototype")) return <Clock className="h-4 w-4" />
    if (stage.includes("Growth") || stage.includes("Series")) return <TrendingUp className="h-4 w-4" />
    if (stage.includes("Launch") || stage.includes("Commercial")) return <Award className="h-4 w-4" />
    return <Clock className="h-4 w-4" />
  }

  // Generate join URL - either external website or internal form
  const getJoinUrl = (tapri: Tapri) => {
    if (tapri.website) {
      return tapri.website
    }
    // Use Web3Forms with Tapri details
    return `https://web3forms.com/forms/f3993f73-3c04-4f7b-ad60-630c82bb01cc?tapri_id=${tapri.id}&tapri_title=${encodeURIComponent(tapri.title)}&tapri_category=${encodeURIComponent(tapri.category)}`
  }

  if (!isConfigured) {
    return (
      <div className="container mx-auto px-4 py-8">
        <SetupBanner />
        <Alert className="mt-8">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Database not configured. Please set up your Supabase connection to view and manage tapris.
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <SetupBanner />

        {/* Hero Section Skeleton */}
        <div className="mb-12 text-center">
          <div className="h-12 bg-gray-200 rounded-lg mb-4 max-w-md mx-auto animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded-lg mb-8 max-w-2xl mx-auto animate-pulse"></div>
        </div>

        {/* Quick Grid Skeleton */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="border rounded-lg overflow-hidden animate-pulse">
              <div className="aspect-video bg-gray-200"></div>
              <div className="p-6">
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="h-20 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <SetupBanner />
        <Alert className="mt-8" variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <div className="text-center mt-8">
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <SetupBanner />

      {/* Hero Section */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-600 via-red-500 to-orange-500 bg-clip-text text-transparent">
          Discover Amazing Tapris
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Explore innovative projects and find your next collaboration opportunity. Join passionate creators building
          the future.
        </p>

        {/* Search and Filters */}
        <div className="flex flex-col gap-4 mb-8 max-w-6xl mx-auto">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search projects by title, description, or tagline..."
              className="pl-10 h-12 text-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Filters:</span>
            </div>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48 h-10">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="web-development">Web Development</SelectItem>
                <SelectItem value="mobile-app">Mobile App</SelectItem>
                <SelectItem value="ai-ml">AI/ML</SelectItem>
                <SelectItem value="blockchain">Blockchain</SelectItem>
                <SelectItem value="iot">IoT</SelectItem>
                <SelectItem value="fintech">FinTech</SelectItem>
                <SelectItem value="healthtech">HealthTech</SelectItem>
                <SelectItem value="edtech">EdTech</SelectItem>
                <SelectItem value="ecommerce">E-commerce</SelectItem>
                <SelectItem value="gaming">Gaming</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedStage} onValueChange={setSelectedStage}>
              <SelectTrigger className="w-full md:w-48 h-10">
                <SelectValue placeholder="All Stages" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stages</SelectItem>
                <SelectItem value="idea">Idea Stage</SelectItem>
                <SelectItem value="planning">Planning</SelectItem>
                <SelectItem value="prototype">Prototype</SelectItem>
                <SelectItem value="MVP Development">MVP Development</SelectItem>
                <SelectItem value="Beta Testing">Beta Testing</SelectItem>
                <SelectItem value="Launch Ready">Launch Ready</SelectItem>
                <SelectItem value="scaling">Scaling</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="w-full md:w-48 h-10">
                <SelectValue placeholder="All Locations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="remote">Remote</SelectItem>
                <SelectItem value="san francisco">San Francisco</SelectItem>
                <SelectItem value="new york">New York</SelectItem>
                <SelectItem value="london">London</SelectItem>
                <SelectItem value="berlin">Berlin</SelectItem>
                <SelectItem value="bangalore">Bangalore</SelectItem>
                <SelectItem value="toronto">Toronto</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("all")
                setSelectedStage("all")
                setSelectedLocation("all")
              }}
              className="w-full md:w-auto"
            >
              Clear Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg border border-yellow-200">
          <div className="text-3xl font-bold text-yellow-600">{filteredTapris.length}</div>
          <div className="text-sm text-gray-600">Active Tapris</div>
        </div>
        <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
          <div className="text-3xl font-bold text-blue-600">
            {filteredTapris.reduce((sum, tapri) => sum + tapri.open_positions, 0)}
          </div>
          <div className="text-sm text-gray-600">Open Positions</div>
        </div>
        <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
          <div className="text-3xl font-bold text-green-600">
            {filteredTapris.reduce((sum, tapri) => sum + tapri.team_size, 0)}
          </div>
          <div className="text-sm text-gray-600">Total Members</div>
        </div>
        <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200">
          <div className="text-3xl font-bold text-purple-600">
            {filteredTapris.reduce((sum, tapri) => sum + tapri.applications, 0)}
          </div>
          <div className="text-sm text-gray-600">Applications</div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-600">
          Showing {filteredTapris.length} of {tapris.length} Tapris
          {searchTerm && ` for "${searchTerm}"`}
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTapris.map((tapri) => (
          <Card
            key={tapri.id}
            className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-yellow-300 bg-card shadow-md"
          >
            <Link href={`/tapris/${tapri.id}`} className="block">
              <div className="aspect-video relative overflow-hidden">
                <Image
                  src={tapri.banner_url || "/placeholder.svg?height=200&width=400"}
                  alt={tapri.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Status Badge */}
                <div className="absolute top-3 right-3">
                  <Badge className={getStatusColor(tapri.status)}>
                    {tapri.status === "approved" ? "Active" : tapri.status}
                  </Badge>
                </div>

                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <Badge variant="outline" className="bg-white/90 text-gray-800 border-white">
                    {tapri.category}
                  </Badge>
                </div>

                {/* Stage Badge */}
                <div className="absolute bottom-3 left-3 flex items-center gap-1">
                  <Badge className="bg-black/70 text-white border-none flex items-center gap-1">
                    {getStageIcon(tapri.stage)}
                    {tapri.stage}
                  </Badge>
                </div>
              </div>
            </Link>

            <CardHeader className="pb-3">
              <Link href={`/tapris/${tapri.id}`} className="block">
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-xl group-hover:text-yellow-600 transition-colors line-clamp-1 text-card-foreground">
                    {tapri.title}
                  </CardTitle>
                </div>
                <CardDescription className="text-base font-medium text-muted-foreground line-clamp-1">
                  {tapri.tagline || "No tagline provided"}
                </CardDescription>
              </Link>
            </CardHeader>

            <CardContent className="pt-0">
              <Link href={`/tapris/${tapri.id}`} className="block mb-4">
                <p className="text-sm text-muted-foreground line-clamp-3">{tapri.description}</p>
              </Link>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div className="flex items-center gap-2 text-gray-500">
                  <MapPin className="h-4 w-4" />
                  <span className="truncate">{tapri.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <Users className="h-4 w-4" />
                  <span>{tapri.team_size} members</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <Eye className="h-4 w-4" />
                  <span>{tapri.views.toLocaleString()} views</span>
                </div>
                <div className="flex items-center gap-2 text-green-600 font-medium">
                  <Award className="h-4 w-4" />
                  <span>{tapri.open_positions} positions</span>
                </div>
              </div>

              {/* Creator Info */}
              {tapri.profiles && (
                <div className="mb-4 p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-2">
                    <Image
                      src={tapri.profiles.avatar_url || "/placeholder.svg?height=32&width=32"}
                      alt="Creator"
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <div className="text-sm">
                      <div className="font-medium text-foreground">{tapri.profiles.full_name || "Anonymous"}</div>
                      <div className="text-muted-foreground">Project Creator</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button asChild className="flex-1" variant="outline">
                  <Link href={`/tapris/${tapri.id}`}>
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </Link>
                </Button>
                <Button asChild className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white">
                  <Link href={getJoinUrl(tapri)} target={tapri.website ? "_blank" : "_self"}>
                    <Users className="mr-2 h-4 w-4" />
                    Join Project
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTapris.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No Tapris found matching your criteria.</p>
          <Button asChild className="mt-4 bg-yellow-600 hover:bg-yellow-700 text-white">
            <Link href="/create-project">Create the First One!</Link>
          </Button>
        </div>
      )}

      {/* Call to Action */}
      <div className="mt-16 text-center p-12 bg-gradient-to-r from-yellow-600 via-red-500 to-orange-500 rounded-3xl text-white">
        <h2 className="text-3xl font-bold mb-4">Don't See Your Perfect Project?</h2>
        <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
          Create your own Tapri and bring together passionate individuals to build something amazing
        </p>
        <Button asChild size="lg" className="bg-white text-yellow-600 hover:bg-gray-100 font-medium">
          <Link href="/create-project">Create Your Own Tapri</Link>
        </Button>
      </div>
    </div>
  )
}
