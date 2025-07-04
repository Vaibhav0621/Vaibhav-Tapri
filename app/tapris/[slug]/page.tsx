import { notFound } from "next/navigation"
import { Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { MapPin, Users, Clock, Share2, Bookmark, ExternalLink, Mail, Globe, Target, CheckCircle } from "lucide-react"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import ApplyForm from "./apply-form"

// Helper function to safely handle skills array
function getSkillsArray(skills: any): string[] {
  if (!skills) return []
  if (Array.isArray(skills)) return skills
  if (typeof skills === "string") {
    try {
      const parsed = JSON.parse(skills)
      return Array.isArray(parsed) ? parsed : skills.split(",").map((s) => s.trim())
    } catch {
      return skills.split(",").map((s) => s.trim())
    }
  }
  return []
}

// Mock data fallback
const mockTapri = {
  id: "cb114509-61ca-42d4-b506-de8145149cb7",
  title: "EcoTech Solutions",
  description:
    "Revolutionary sustainable technology platform connecting eco-conscious consumers with green products and services.",
  long_description:
    "EcoTech Solutions is building the future of sustainable commerce by creating a comprehensive platform that connects environmentally conscious consumers with verified green products and services. Our mission is to make sustainable living accessible, affordable, and convenient for everyone.",
  category: "Sustainability",
  stage: "MVP",
  funding_goal: 500000,
  current_funding: 125000,
  location: "Bangalore, India",
  remote_friendly: true,
  website_url: "https://ecotech-solutions.com",
  logo_url: "/placeholder.svg?height=100&width=100",
  banner_url: "/placeholder.svg?height=400&width=800",
  required_skills: ["React", "Node.js", "Product Management", "UI/UX Design", "Marketing"],
  team_size: 8,
  positions_available: 5,
  equity_offered: "0.5-2%",
  created_at: "2024-01-15T10:00:00Z",
  creator: {
    id: "creator-1",
    full_name: "Arjun Patel",
    avatar_url: "/placeholder.svg?height=50&width=50",
    bio: "Serial entrepreneur with 10+ years in sustainable tech",
    linkedin_url: "https://linkedin.com/in/arjunpatel",
  },
  team_members: [
    {
      id: "member-1",
      full_name: "Priya Sharma",
      role: "CTO",
      avatar_url: "/placeholder.svg?height=50&width=50",
      bio: "Full-stack developer with expertise in scalable systems",
    },
    {
      id: "member-2",
      full_name: "Rahul Gupta",
      role: "Head of Design",
      avatar_url: "/placeholder.svg?height=50&width=50",
      bio: "UI/UX designer passionate about sustainable design",
    },
  ],
  applications: [
    {
      id: "app-1",
      user_id: "user-1",
      applied_at: "2024-01-20T14:30:00Z",
      status: "pending",
      cover_letter: "I'm excited to contribute to sustainable technology...",
      user: {
        full_name: "Sarah Johnson",
        avatar_url: "/placeholder.svg?height=40&width=40",
      },
    },
  ],
}

async function getTapri(slug: string) {
  try {
    const supabase = createServerComponentClient({ cookies })

    const { data: tapri, error } = await supabase
      .from("tapris")
      .select(`
        *,
        creator:profiles!creator_id(
          id,
          full_name,
          avatar_url,
          bio,
          linkedin_url
        ),
        applications(
          id,
          user_id,
          applied_at,
          status,
          cover_letter,
          user:profiles!user_id(
            full_name,
            avatar_url
          )
        )
      `)
      .eq("id", slug)
      .single()

    if (error) {
      console.error("Error fetching tapri:", error)
      return mockTapri
    }

    return tapri
  } catch (error) {
    console.error("Database connection error:", error)
    return mockTapri
  }
}

export default async function TapriDetailPage({ params }: { params: { slug: string } }) {
  const tapri = await getTapri(params.slug)

  if (!tapri) {
    notFound()
  }

  const skills = getSkillsArray(tapri.required_skills)
  const fundingProgress =
    tapri.current_funding && tapri.funding_goal ? (tapri.current_funding / tapri.funding_goal) * 100 : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50">
      {/* Hero Section */}
      <section className="relative">
        {tapri.banner_url && (
          <div className="h-64 md:h-80 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 relative overflow-hidden">
            <img
              src={tapri.banner_url || "/placeholder.svg"}
              alt={tapri.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative -mt-16 md:-mt-20">
            <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
              <CardContent className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Logo */}
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-2xl shadow-lg p-4 border-2 border-yellow-200">
                      <img
                        src={tapri.logo_url || "/placeholder.svg?height=100&width=100"}
                        alt={tapri.title}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>

                  {/* Main Info */}
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{tapri.title}</h1>
                          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">{tapri.stage}</Badge>
                        </div>

                        <p className="text-gray-600 mb-4 text-lg">{tapri.description}</p>

                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {tapri.location}
                            {tapri.remote_friendly && (
                              <Badge variant="outline" className="ml-2 text-xs">
                                Remote OK
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {tapri.team_size} team members
                          </div>
                          <div className="flex items-center">
                            <Target className="w-4 h-4 mr-1" />
                            {tapri.positions_available} positions open
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-medium">
                          <Mail className="w-4 h-4 mr-2" />
                          Apply Now
                        </Button>
                        <div className="flex gap-2">
                          <Button variant="outline" size="icon">
                            <Share2 className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="icon">
                            <Bookmark className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-5 mb-8">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="team">Team</TabsTrigger>
                  <TabsTrigger value="positions">Positions</TabsTrigger>
                  <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
                  <TabsTrigger value="apply">Apply</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>About This Tapri</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 leading-relaxed mb-6">
                        {tapri.long_description || tapri.description}
                      </p>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Required Skills</h4>
                          <div className="flex flex-wrap gap-2">
                            {skills.map((skill, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="bg-yellow-50 text-yellow-700 border-yellow-200"
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">What We Offer</h4>
                          <ul className="space-y-2 text-sm text-gray-600">
                            <li className="flex items-center">
                              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                              Equity: {tapri.equity_offered || "0.5-2%"}
                            </li>
                            <li className="flex items-center">
                              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                              Flexible working hours
                            </li>
                            <li className="flex items-center">
                              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                              Learning & growth opportunities
                            </li>
                            <li className="flex items-center">
                              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                              Direct impact on product
                            </li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="team" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Meet the Team</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {/* Founder */}
                      <div className="mb-8">
                        <h4 className="font-semibold text-gray-900 mb-4">Founder</h4>
                        <div className="flex items-start space-x-4 p-4 bg-yellow-50 rounded-xl">
                          <Avatar className="w-16 h-16">
                            <AvatarImage
                              src={tapri.creator?.avatar_url || "/placeholder.svg"}
                              alt={tapri.creator?.full_name}
                            />
                            <AvatarFallback>{tapri.creator?.full_name?.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h5 className="font-semibold text-gray-900">{tapri.creator?.full_name}</h5>
                            <p className="text-sm text-gray-600 mb-2">Founder & CEO</p>
                            <p className="text-sm text-gray-700">{tapri.creator?.bio}</p>
                            {tapri.creator?.linkedin_url && (
                              <Button variant="outline" size="sm" className="mt-3 bg-transparent">
                                <ExternalLink className="w-3 h-3 mr-1" />
                                LinkedIn
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Team Members */}
                      {tapri.team_members && tapri.team_members.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-4">Core Team</h4>
                          <div className="grid md:grid-cols-2 gap-4">
                            {tapri.team_members.map((member: any) => (
                              <div
                                key={member.id}
                                className="flex items-start space-x-3 p-4 border border-gray-200 rounded-xl"
                              >
                                <Avatar className="w-12 h-12">
                                  <AvatarImage src={member.avatar_url || "/placeholder.svg"} alt={member.full_name} />
                                  <AvatarFallback>{member.full_name?.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <h5 className="font-medium text-gray-900">{member.full_name}</h5>
                                  <p className="text-sm text-gray-600 mb-1">{member.role}</p>
                                  <p className="text-xs text-gray-500">{member.bio}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="positions" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Open Positions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {skills.map((skill, index) => (
                          <div
                            key={index}
                            className="p-4 border border-gray-200 rounded-xl hover:border-yellow-300 transition-colors"
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-semibold text-gray-900">{skill} Developer</h4>
                                <p className="text-sm text-gray-600">
                                  Full-time • Remote OK • Equity: {tapri.equity_offered || "0.5-2%"}
                                </p>
                              </div>
                              <Button size="sm" variant="outline">
                                Apply
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="roadmap" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Product Roadmap</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">MVP Development</h4>
                            <p className="text-sm text-gray-600">Core platform features and user authentication</p>
                            <Badge variant="secondary" className="mt-2 bg-green-100 text-green-700">
                              Completed
                            </Badge>
                          </div>
                        </div>

                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0 w-8 h-8 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center">
                            <Clock className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">Beta Launch</h4>
                            <p className="text-sm text-gray-600">Limited user testing and feedback collection</p>
                            <Badge variant="secondary" className="mt-2 bg-yellow-100 text-yellow-700">
                              In Progress
                            </Badge>
                          </div>
                        </div>

                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0 w-8 h-8 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center">
                            <Target className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">Public Launch</h4>
                            <p className="text-sm text-gray-600">Full platform launch with marketing campaign</p>
                            <Badge variant="secondary" className="mt-2">
                              Planned
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="apply">
                  <Suspense fallback={<div>Loading application form...</div>}>
                    <ApplyForm tapriId={tapri.id} />
                  </Suspense>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Stage</span>
                    <Badge className="bg-yellow-100 text-yellow-800">{tapri.stage}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Team Size</span>
                    <span className="font-medium">{tapri.team_size}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Open Positions</span>
                    <span className="font-medium">{tapri.positions_available}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Applications</span>
                    <span className="font-medium">{tapri.applications?.length || 0}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Funding Progress */}
              {tapri.funding_goal && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Funding Progress</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Raised</span>
                        <span className="font-medium">₹{(tapri.current_funding || 0).toLocaleString()}</span>
                      </div>
                      <Progress value={fundingProgress} className="h-2" />
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Goal</span>
                        <span className="font-medium">₹{tapri.funding_goal.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="text-center">
                      <span className="text-2xl font-bold text-yellow-600">{Math.round(fundingProgress)}%</span>
                      <p className="text-sm text-gray-600">funded</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Contact */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Get in Touch</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {tapri.website_url && (
                    <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                      <a href={tapri.website_url} target="_blank" rel="noopener noreferrer">
                        <Globe className="w-4 h-4 mr-2" />
                        Visit Website
                      </a>
                    </Button>
                  )}
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Mail className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Applications */}
              {tapri.applications && tapri.applications.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Recent Applications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {tapri.applications.slice(0, 3).map((application: any) => (
                        <div key={application.id} className="flex items-center space-x-3">
                          <Avatar className="w-8 h-8">
                            <AvatarImage
                              src={application.user?.avatar_url || "/placeholder.svg"}
                              alt={application.user?.full_name}
                            />
                            <AvatarFallback>{application.user?.full_name?.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{application.user?.full_name}</p>
                            <p className="text-xs text-gray-500">
                              {new Date(application.applied_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
