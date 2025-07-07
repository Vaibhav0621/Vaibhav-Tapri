"use client"

import { useState, useEffect, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye, Users, Clock, TrendingUp, Award } from "lucide-react"
import Link from "next/link"
import { SetupBanner } from "@/components/setup-banner"
import { isSupabaseConfigured } from "@/lib/supabase"
import { TapriService } from "@/lib/services/tapri-service"

type Tapri = {
  id: string
  slug?: string
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

export default function TaprisPage() {
  const isConfigured = isSupabaseConfigured()
  const [tapris, setTapris] = useState<Tapri[]>([])
  const [loading, setLoading] = useState(true)

  const mockTapris: Tapri[] = [
    {
      id: "1",
      slug: "ai-learning-platform",
      title: "AI-Powered Learning Platform",
      tagline: "Revolutionizing education with AI",
      description: "Building an intelligent learning platform that adapts to each student's learning style and pace.",
      category: "ai-ml",
      stage: "MVP Development",
      location: "Remote",
      team_size: 5,
      open_positions: 3,
      banner_url: "/placeholder.svg?height=200&width=400",
      status: "approved",
      views: 1250,
      applications: 23,
      created_at: "2024-01-15",
      website: null,
      profiles: {
        full_name: "Sarah Chen",
        avatar_url: "/placeholder.svg?height=40&width=40",
      },
    },
    {
      id: "2",
      slug: "sustainable-ecommerce",
      title: "Sustainable E-commerce Platform",
      tagline: "Green shopping for a better tomorrow",
      description: "Creating a marketplace that connects eco-conscious consumers with sustainable brands.",
      category: "ecommerce",
      stage: "Beta Testing",
      location: "San Francisco",
      team_size: 8,
      open_positions: 2,
      banner_url: "/placeholder.svg?height=200&width=400",
      status: "approved",
      views: 890,
      applications: 15,
      created_at: "2024-02-01",
      website: null,
      profiles: {
        full_name: "Alex Rodriguez",
        avatar_url: "/placeholder.svg?height=40&width=40",
      },
    },
  ]

  useEffect(() => {
    async function fetchTapris() {
      setLoading(true)
      if (!isConfigured) {
        setTapris(mockTapris)
        setLoading(false)
        return
      }
      try {
        const { data } = await TapriService.getApprovedTapris(1, 12, "all", "all")
        setTapris(data || [])
      } catch (error) {
        console.error("Error fetching tapris:", error)
        setTapris(mockTapris)
      } finally {
        setLoading(false)
      }
    }
    fetchTapris()
  }, [isConfigured])

  const getStageIcon = (stage: string) => {
    if (stage.includes("MVP") || stage.includes("Prototype")) return <Clock className="h-4 w-4" />
    if (stage.includes("Growth") || stage.includes("Series")) return <TrendingUp className="h-4 w-4" />
    if (stage.includes("Launch") || stage.includes("Commercial")) return <Award className="h-4 w-4" />
    return <Clock className="h-4 w-4" />
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <SetupBanner />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tapris.map((tapri) => (
          <Card key={tapri.id} className="group hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle>{tapri.title}</CardTitle>
              <CardDescription>{tapri.tagline}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-2">{tapri.description}</p>
              <div className="flex gap-2">
                <Button asChild className="flex-1" variant="outline">
                  <Link href={`/tapris/${tapri.slug ?? tapri.id}`}>
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </Link>
                </Button>
              <Button asChild className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white">
  <Link href={`/tapris/${tapri.slug}`}>
    <Users className="mr-2 h-4 w-4" />
    Join Project
  </Link>
</Button>



              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
