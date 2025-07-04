"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, Users, Eye, UserPlus, Loader2 } from "lucide-react"
import Link from "next/link"
import type { Database } from "@/lib/database.types"

type Tapri = Database["public"]["Tables"]["tapris"]["Row"]

export default function TaprisPage() {
  const [tapris, setTapris] = useState<Tapri[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("all")
  const [stage, setStage] = useState("all")
  const [location, setLocation] = useState("all")

  const fetchTapris = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (search) params.append("search", search)
      if (category !== "all") params.append("category", category)
      if (stage !== "all") params.append("stage", stage)
      if (location !== "all") params.append("location", location)

      const response = await fetch(`/api/tapris?${params.toString()}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch tapris")
      }

      setTapris(data.tapris || [])
      setError(null)
    } catch (err) {
      console.error("Error fetching tapris:", err)
      setError(err instanceof Error ? err.message : "Failed to load tapris")
      setTapris([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTapris()
  }, [search, category, stage, location])

  const categories = ["all", "Tech", "Design", "Business", "Education", "Health", "Environment"]
  const stages = ["all", "Idea", "Prototype", "MVP", "Growth", "Scaling"]
  const locations = ["all", "Remote", "New York", "San Francisco", "London", "Berlin", "Mumbai"]

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading tapris...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
            <h2 className="text-lg font-semibold text-red-800 mb-2">Error Loading Tapris</h2>
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={fetchTapris} variant="outline">
              Try Again
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-red-500 to-black bg-clip-text text-transparent">
          Discover Amazing Tapris
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Join innovative projects and connect with like-minded creators from around the world
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tapris..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat === "all" ? "All Categories" : cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={stage} onValueChange={setStage}>
            <SelectTrigger>
              <SelectValue placeholder="Stage" />
            </SelectTrigger>
            <SelectContent>
              {stages.map((stg) => (
                <SelectItem key={stg} value={stg}>
                  {stg === "all" ? "All Stages" : stg}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger>
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              {locations.map((loc) => (
                <SelectItem key={loc} value={loc}>
                  {loc === "all" ? "All Locations" : loc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results */}
      {tapris.length === 0 ? (
        <div className="text-center py-12">
          <div className="bg-gray-50 rounded-lg p-8 max-w-md mx-auto">
            <h3 className="text-lg font-semibold mb-2">No Tapris Found</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your search criteria or create your own tapri!</p>
            <Button asChild>
              <Link href="/create-project">Create Your Tapri</Link>
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <p className="text-muted-foreground">
              Found {tapris.length} tapri{tapris.length !== 1 ? "s" : ""}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tapris.map((tapri) => (
              <Card key={tapri.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={tapri.logo_url || undefined} alt={tapri.title} />
                      <AvatarFallback className="bg-yellow-400 text-black font-bold">
                        {tapri.title.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg line-clamp-1">{tapri.title}</CardTitle>
                      <p className="text-sm text-muted-foreground line-clamp-1">{tapri.tagline}</p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-2">{tapri.description}</p>

                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">{tapri.category}</Badge>
                    <Badge variant="outline">{tapri.stage}</Badge>
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{tapri.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{tapri.team_size}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <span>{tapri.views || 0} views</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <UserPlus className="h-4 w-4" />
                      <span>{tapri.applications || 0} applied</span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button asChild variant="outline" size="sm" className="flex-1 bg-transparent">
                      <Link href={`/tapris/${tapri.id}`}>View Details</Link>
                    </Button>
                    <Button size="sm" className="bg-yellow-400 hover:bg-yellow-500 text-black">
                      Join
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
