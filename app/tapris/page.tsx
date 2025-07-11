"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye, Users, Clock, TrendingUp, Award, MapPin, Briefcase, Users as TeamIcon } from "lucide-react"
import Link from "next/link"
import { SetupBanner } from "@/components/setup-banner"
import { isSupabaseConfigured } from "@/lib/supabase"
import { TapriService } from "@/lib/services/tapri-service"

// Define the Tapri type
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

// The main component for displaying Tapris
export default function TaprisPage() {
  const isConfigured = isSupabaseConfigured()
  const [tapris, setTapris] = useState<Tapri[]>([])
  const [loading, setLoading] = useState(true)

// Mock data for demonstration purposes
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
      banner_url: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=2940&auto=format&fit=crop",
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
      banner_url: "https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?q=80&w=2940&auto=format&fit=crop",
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
];

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
        setTapris(mockTapris) // Fallback to mock data on error
      } finally {
        setLoading(false)
      }
    }
    fetchTapris()
  }, [isConfigured])

  // Function to get an icon based on the project stage
  const getStageIcon = (stage: string) => {
    if (stage.includes("MVP") || stage.includes("Prototype")) return <Clock className="h-4 w-4 text-gray-500" />;
    if (stage.includes("Growth") || stage.includes("Series")) return <TrendingUp className="h-4 w-4 text-gray-500" />;
    if (stage.includes("Launch") || stage.includes("Commercial")) return <Award className="h-4 w-4 text-gray-500" />;
    return <Clock className="h-4 w-4 text-gray-500" />;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <SetupBanner />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {tapris.map((tapri) => (
          <Card key={tapri.id} className="group flex flex-col overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
            {/* Banner Image */}
            <div className="relative">
              <img src={tapri.banner_url ?? '/placeholder.svg?height=200&width=400'} alt={tapri.title} className="w-full h-48 object-cover"/>
              <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                <Eye className="h-3 w-3" />
                {tapri.views}
              </div>
            </div>

            <CardHeader>
              <CardTitle className="text-xl font-bold">{tapri.title}</CardTitle>
              <CardDescription className="text-sm italic">{tapri.tagline}</CardDescription>
            </CardHeader>

            <CardContent className="flex-grow flex flex-col">
              <p className="text-sm text-gray-600 mb-4 flex-grow">{tapri.description}</p>
              {/* Project Details */}
              <div className="space-y-2 text-sm text-gray-700 mb-4">
                <div className="flex items-center gap-2">
                    {getStageIcon(tapri.stage)}
                    <span>{tapri.stage}</span>
                </div>
                <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span>{tapri.location}</span>
                </div>
                <div className="flex items-center gap-2">
                    <TeamIcon className="h-4 w-4 text-gray-500" />
                    <span>{tapri.team_size} Team Members</span>
                </div>
                <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-gray-500" />
                    <span>{tapri.open_positions} Open Positions</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 mt-auto pt-4 border-t">
                <Button asChild className="flex-1" variant="outline">
                  <Link href={`/tapris/${tapri.slug ?? tapri.id}`}>
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </Link>
                </Button>
                <Button asChild className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white">
                    <Link href={`/tapris/${tapri.slug ?? tapri.id}`}>
                        <Users className="mr-2 h-4 w-4" />
                        Join Projects
                    </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}