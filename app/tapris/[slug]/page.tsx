"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TapriHeader } from "@/components/tapri-header"
import { Users, MapPin, Calendar, Globe, Loader2, AlertCircle, Target, Lightbulb, TrendingUp } from "lucide-react"
import Link from "next/link"
import type { Database } from "@/lib/database.types"

type Tapri = Database["public"]["Tables"]["tapris"]["Row"]

export default function TapriDetailPage() {
  const params = useParams()
  const slug = params.slug as string

  const [tapri, setTapri] = useState<Tapri | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTapri = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/tapris/${slug}`)
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch tapri")
        }

        setTapri(data.tapri)
        setError(null)
      } catch (err) {
        console.error("Error fetching tapri:", err)
        setError(err instanceof Error ? err.message : "Failed to load tapri")
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchTapri()
    }
  }, [slug])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading tapri details...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !tapri) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-red-800 mb-2">Tapri Not Found</h2>
            <p className="text-red-600 mb-4">{error || "The tapri you're looking for doesn't exist."}</p>
            <Button asChild variant="outline">
              <Link href="/tapris">Back to Tapris</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <TapriHeader tapri={tapri} />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="team">Team</TabsTrigger>
                <TabsTrigger value="positions">Positions</TabsTrigger>
                <TabsTrigger value="apply">Apply</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lightbulb className="h-5 w-5" />
                      About This Project
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{tapri.description}</p>
                  </CardContent>
                </Card>

                {tapri.mission && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5" />
                        Mission
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">{tapri.mission}</p>
                    </CardContent>
                  </Card>
                )}

                {tapri.vision && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5" />
                        Vision
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">{tapri.vision}</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="team" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Team Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-muted-foreground" />
                        <span className="font-medium">Team Size:</span>
                        <span>{tapri.team_size} members</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-muted-foreground" />
                        <span className="font-medium">Location:</span>
                        <span>{tapri.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-muted-foreground" />
                        <span className="font-medium">Founded:</span>
                        <span>{new Date(tapri.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="positions" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Open Positions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {tapri.open_positions > 0 ? (
                      <div className="space-y-4">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <p className="text-green-800 font-medium">
                            {tapri.open_positions} position{tapri.open_positions !== 1 ? "s" : ""} available
                          </p>
                          <p className="text-green-600 text-sm mt-1">
                            We're actively looking for talented individuals to join our team.
                          </p>
                        </div>
                        <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black">Apply Now</Button>
                      </div>
                    ) : (
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                        <p className="text-muted-foreground">No open positions at the moment. Check back later!</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="apply" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Join This Tapri</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        Interested in joining {tapri.title}? Click the button below to apply.
                      </p>
                      <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black" size="lg">
                        Apply to Join
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Views</span>
                  <span className="font-medium">{tapri.views || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Applications</span>
                  <span className="font-medium">{tapri.applications || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Stage</span>
                  <Badge variant="outline">{tapri.stage}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category</span>
                  <Badge variant="secondary">{tapri.category}</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Contact */}
            {tapri.website && (
              <Card>
                <CardHeader>
                  <CardTitle>Links</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full bg-transparent" asChild>
                    <a href={tapri.website} target="_blank" rel="noopener noreferrer">
                      <Globe className="h-4 w-4 mr-2" />
                      Visit Website
                    </a>
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Similar Projects */}
            <Card>
              <CardHeader>
                <CardTitle>Similar Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Discover other projects in the {tapri.category} category.
                </p>
                <Button variant="outline" className="w-full mt-4 bg-transparent" asChild>
                  <Link href={`/tapris?category=${tapri.category}`}>Explore Similar</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
