import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  MapPin,
  Users,
  Calendar,
  DollarSign,
  MessageCircle,
  Video,
  Star,
  Briefcase,
  GraduationCap,
  Target,
  TrendingUp,
  Award,
  ExternalLink,
  Mail,
  CheckCircle,
  Circle,
  Globe,
  Building,
  Zap,
} from "lucide-react"
import { getTapriById } from "@/data/tapris"
import { TapriService } from "@/lib/services/tapri-service"
import { isSupabaseConfigured } from "@/lib/supabase"
import { notFound } from "next/navigation"

interface TapriDetailPageProps {
  params: {
    id: string
  }
}

// Convert database tapri to display format
function convertDatabaseTapri(dbTapri: any) {
  return {
    id: dbTapri.id,
    title: dbTapri.title,
    tagline: dbTapri.tagline || "Building something amazing",
    description: dbTapri.description,
    fullDescription:
      dbTapri.description +
      " This project is currently in development and looking for passionate team members to join our mission.",
    category: dbTapri.category || "Technology",
    stage: dbTapri.stage || "Development",
    location: dbTapri.location || "Remote",
    teamSize: dbTapri.team_size || 1,
    openPositions: dbTapri.open_positions || 1,
    website: dbTapri.website_url,
    bannerImage: dbTapri.banner_url || "/placeholder.svg?height=500&width=1200",
    logoImage: dbTapri.logo_url || "/placeholder.svg?height=120&width=120",
    status: "recruiting" as const,
    views: dbTapri.views || 0,
    applications: dbTapri.applications || 0,
    createdAt: dbTapri.created_at || new Date().toISOString(),
    requiredSkills: dbTapri.required_skills || ["General Skills"],

    // Default values for detailed information
    mission: "To create innovative solutions that make a positive impact on the world.",
    vision: "Building the future through technology and collaboration.",
    problemStatement: "We're solving important challenges in our industry.",
    solution: "Our innovative approach combines cutting-edge technology with user-centered design.",
    targetAudience: "Forward-thinking individuals and organizations looking for innovative solutions.",
    businessModel: "Sustainable growth through value creation and strategic partnerships.",

    currentTasks: [
      "Developing core product features",
      "Building user interface and experience",
      "Testing and quality assurance",
      "Market research and validation",
      "Team building and recruitment",
    ],

    futurePlans: [
      "Launch beta version to early users",
      "Expand team with key hires",
      "Develop strategic partnerships",
      "Scale product and user base",
      "Explore funding opportunities",
    ],

    milestones: [
      { title: "Project Initiation", description: "Started the project and defined goals", completed: true },
      {
        title: "MVP Development",
        description: "Building minimum viable product",
        completed: false,
        dueDate: "2024-06-30",
      },
      { title: "Beta Launch", description: "Launch to early users", completed: false, dueDate: "2024-09-30" },
      { title: "Public Launch", description: "Full public release", completed: false, dueDate: "2024-12-31" },
    ],

    teamLeader: {
      name: dbTapri.profiles?.full_name || "Project Creator",
      role: "Founder & CEO",
      bio: "Passionate entrepreneur and innovator dedicated to building impactful solutions.",
      image: dbTapri.profiles?.avatar_url || "/placeholder.svg?height=120&width=120",
      linkedin: "#",
      twitter: "#",
      achievements: [
        "Founded this innovative project",
        "Experienced in technology and business",
        "Committed to making a positive impact",
      ],
    },

    teamMembers: [
      {
        name: "Team Member",
        role: "Co-founder",
        bio: "Dedicated team member working on this exciting project.",
        image: "/placeholder.svg?height=60&width=60",
        linkedin: "#",
        isCore: true,
      },
    ],

    openRoles: [
      {
        id: "general-role",
        title: "Team Member",
        type: "General" as const,
        experienceLevel: "All Levels" as const,
        description:
          "Join our team and help build something amazing. We're looking for passionate individuals who want to make a difference.",
        responsibilities: [
          "Contribute to project development",
          "Collaborate with team members",
          "Help achieve project milestones",
          "Bring your unique skills and perspective",
        ],
        requirements: [
          "Passion for innovation and technology",
          "Strong communication skills",
          "Ability to work in a team environment",
          "Commitment to project success",
        ],
        skills: dbTapri.required_skills || ["General Skills"],
        timeCommitment: "Flexible",
        compensation: "Equity + Experience",
      },
    ],

    eligibilityCriteria: [
      "Passionate about the project mission",
      "Strong work ethic and dedication",
      "Good communication skills",
      "Ability to work collaboratively",
    ],

    benefits: [
      "Gain valuable startup experience",
      "Work with cutting-edge technology",
      "Flexible work arrangements",
      "Opportunity for growth and learning",
      "Be part of an innovative team",
    ],

    learningOutcomes: [
      "Develop technical and business skills",
      "Learn about startup operations",
      "Gain experience in product development",
      "Build professional network",
    ],

    metrics: {
      funding: "Bootstrapped",
      users: "Growing",
      growth: "Steady",
      partnerships: 0,
    },

    gallery: [
      dbTapri.banner_url || "/placeholder.svg?height=300&width=400",
      dbTapri.logo_url || "/placeholder.svg?height=300&width=400",
    ],

    documents: [],

    applicationProcess: [
      "Submit application through our form",
      "Initial conversation with team",
      "Skills and fit assessment",
      "Welcome to the team!",
    ],

    contactEmail: "contact@tapri.com",
    applicationFormUrl: `https://web3forms.com/forms/f3993f73-3c04-4f7b-ad60-630c82bb01cc?tapri_id=${dbTapri.id}&tapri_title=${encodeURIComponent(dbTapri.title)}`,
  }
}

export default async function TapriDetailPage({ params }: TapriDetailPageProps) {
  const isConfigured = isSupabaseConfigured()
  let tapri = null

  // Try to get from database first
  if (isConfigured) {
    try {
      const { data } = await TapriService.getTapriById(params.id)
      if (data) {
        tapri = convertDatabaseTapri(data)
      }
    } catch (error) {
      console.error("Error fetching tapri from database:", error)
    }
  }

  // Fallback to mock data
  if (!tapri) {
    tapri = getTapriById(params.id)
  }

  // If still no tapri found, show not found
  if (!tapri) {
    notFound()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      case "recruiting":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200"
      case "launching":
        return "bg-purple-100 text-purple-800 hover:bg-purple-200"
      case "completed":
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
      default:
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
    }
  }

  const completedMilestones = tapri.milestones.filter((m) => m.completed).length
  const totalMilestones = tapri.milestones.length
  const progressPercentage = (completedMilestones / totalMilestones) * 100

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Banner */}
      <section className="relative w-full h-[500px] overflow-hidden">
        <Image src={tapri.bannerImage || "/placeholder.svg"} alt={tapri.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="container px-4 md:px-6 pb-12">
            <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
              <div className="relative">
                <Image
                  src={tapri.logoImage || "/placeholder.svg"}
                  alt={`${tapri.title} logo`}
                  width={120}
                  height={120}
                  className="rounded-xl border-4 border-white shadow-lg"
                />
              </div>
              <div className="text-white flex-1">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className={getStatusColor(tapri.status)}>
                    {tapri.status === "recruiting"
                      ? "Recruiting Now"
                      : tapri.status === "active"
                        ? "Active Project"
                        : tapri.status === "launching"
                          ? "Launching Soon"
                          : "Completed"}
                  </Badge>
                  <Badge variant="outline" className="text-white border-white bg-white/10">
                    {tapri.category}
                  </Badge>
                  <Badge variant="outline" className="text-white border-white bg-white/10">
                    {tapri.stage}
                  </Badge>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{tapri.title}</h1>
                <p className="text-xl md:text-2xl text-gray-200 mb-4">{tapri.tagline}</p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>{tapri.teamSize} team members</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4" />
                    <span>{tapri.openPositions} open positions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{tapri.location}</span>
                  </div>
                  {tapri.metrics.funding && (
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      <span>{tapri.metrics.funding} raised</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="w-full py-8 bg-gradient-to-r from-yellow-50 to-red-50">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600">{tapri.views.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Profile Views</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{tapri.applications}</div>
              <div className="text-sm text-gray-600">Applications</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{tapri.teamSize}</div>
              <div className="text-sm text-gray-600">Team Members</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">{tapri.openPositions}</div>
              <div className="text-sm text-gray-600">Open Positions</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="w-full py-12">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="team">Team</TabsTrigger>
                  <TabsTrigger value="positions">Positions</TabsTrigger>
                  <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
                  <TabsTrigger value="apply">Apply</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5" />
                        About This Tapri
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h4 className="font-semibold mb-2">Project Description</h4>
                        <p className="text-gray-600">{tapri.fullDescription}</p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-2 flex items-center gap-2">
                            <Target className="h-4 w-4" />
                            Our Mission
                          </h4>
                          <p className="text-sm text-gray-600">{tapri.mission}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2 flex items-center gap-2">
                            <Zap className="h-4 w-4" />
                            Our Vision
                          </h4>
                          <p className="text-sm text-gray-600">{tapri.vision}</p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-2">Problem Statement</h4>
                          <p className="text-sm text-gray-600">{tapri.problemStatement}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Our Solution</h4>
                          <p className="text-sm text-gray-600">{tapri.solution}</p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Target Audience</h4>
                        <p className="text-sm text-gray-600">{tapri.targetAudience}</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Briefcase className="h-5 w-5" />
                        What We're Working On
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {tapri.currentTasks.map((task, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0" />
                            <span className="text-sm">{task}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Metrics */}
                  {Object.keys(tapri.metrics).length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <TrendingUp className="h-5 w-5" />
                          Key Metrics
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {tapri.metrics.funding && (
                            <div className="text-center p-4 bg-green-50 rounded-lg">
                              <div className="text-2xl font-bold text-green-600">{tapri.metrics.funding}</div>
                              <div className="text-xs text-gray-600">Funding</div>
                            </div>
                          )}
                          {tapri.metrics.users && (
                            <div className="text-center p-4 bg-blue-50 rounded-lg">
                              <div className="text-2xl font-bold text-blue-600">{tapri.metrics.users}</div>
                              <div className="text-xs text-gray-600">Users</div>
                            </div>
                          )}
                          {tapri.metrics.revenue && (
                            <div className="text-center p-4 bg-purple-50 rounded-lg">
                              <div className="text-2xl font-bold text-purple-600">{tapri.metrics.revenue}</div>
                              <div className="text-xs text-gray-600">Revenue</div>
                            </div>
                          )}
                          {tapri.metrics.growth && (
                            <div className="text-center p-4 bg-orange-50 rounded-lg">
                              <div className="text-2xl font-bold text-orange-600">{tapri.metrics.growth}</div>
                              <div className="text-xs text-gray-600">Growth</div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="team" className="space-y-6">
                  {/* Team Leader Spotlight */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Team Leader</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col md:flex-row items-start gap-6">
                        <div className="relative">
                          <Image
                            src={tapri.teamLeader.image || "/placeholder.svg"}
                            alt={tapri.teamLeader.name}
                            width={120}
                            height={120}
                            className="rounded-lg object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold">{tapri.teamLeader.name}</h3>
                          <p className="text-yellow-600 mb-3 font-medium">{tapri.teamLeader.role}</p>
                          <p className="text-gray-600 mb-4">{tapri.teamLeader.bio}</p>

                          <div className="mb-4">
                            <h4 className="font-semibold mb-2">Key Achievements</h4>
                            <ul className="space-y-1">
                              {tapri.teamLeader.achievements.map((achievement, index) => (
                                <li key={index} className="flex items-start gap-2">
                                  <Star className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                                  <span className="text-sm">{achievement}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="flex gap-2">
                            {tapri.teamLeader.linkedin && (
                              <Button variant="outline" size="sm" asChild>
                                <Link href={tapri.teamLeader.linkedin} target="_blank">
                                  <ExternalLink className="mr-2 h-4 w-4" />
                                  LinkedIn
                                </Link>
                              </Button>
                            )}
                            {tapri.teamLeader.twitter && (
                              <Button variant="outline" size="sm" asChild>
                                <Link href={tapri.teamLeader.twitter} target="_blank">
                                  <ExternalLink className="mr-2 h-4 w-4" />
                                  Twitter
                                </Link>
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Team Members */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Core Team Members</CardTitle>
                      <CardDescription>Meet the passionate individuals building this tapri</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-6">
                        {tapri.teamMembers
                          .filter((member) => member.isCore)
                          .map((member, index) => (
                            <div
                              key={index}
                              className="flex items-start gap-4 p-4 rounded-lg border bg-gradient-to-br from-gray-50 to-white"
                            >
                              <Image
                                src={member.image || "/placeholder.svg"}
                                alt={member.name}
                                width={60}
                                height={60}
                                className="rounded-lg object-cover"
                              />
                              <div className="flex-1">
                                <h4 className="font-semibold">{member.name}</h4>
                                <p className="text-sm text-yellow-600 mb-2">{member.role}</p>
                                <p className="text-xs text-gray-600 mb-2">{member.bio}</p>
                                {member.linkedin && (
                                  <Button variant="ghost" size="sm" asChild className="p-0 h-auto">
                                    <Link href={member.linkedin} target="_blank" className="text-xs">
                                      <ExternalLink className="mr-1 h-3 w-3" />
                                      LinkedIn
                                    </Link>
                                  </Button>
                                )}
                              </div>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="positions" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Open Positions ({tapri.openPositions})
                      </CardTitle>
                      <CardDescription>Join our team and help build the future</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {tapri.openRoles.map((role, index) => (
                          <div
                            key={index}
                            className="p-6 rounded-lg border bg-gradient-to-br from-yellow-50 via-white to-red-50"
                          >
                            <div className="flex flex-col md:flex-row justify-between items-start mb-4 gap-4">
                              <div className="flex-1">
                                <h3 className="text-lg font-semibold">{role.title}</h3>
                                <div className="flex flex-wrap gap-2 mt-2">
                                  <Badge variant="outline">{role.type}</Badge>
                                  <Badge variant="outline">{role.experienceLevel}</Badge>
                                  <Badge variant="outline">{role.timeCommitment}</Badge>
                                  {role.compensation && (
                                    <Badge className="bg-green-100 text-green-800">{role.compensation}</Badge>
                                  )}
                                </div>
                              </div>
                              <Button className="bg-yellow-600 hover:bg-yellow-700 text-white" asChild>
                                <Link href={`#apply`}>Apply Now</Link>
                              </Button>
                            </div>

                            <p className="text-gray-600 mb-4">{role.description}</p>

                            <div className="grid md:grid-cols-2 gap-4 mb-4">
                              <div>
                                <h4 className="font-medium mb-2">Responsibilities</h4>
                                <ul className="text-sm space-y-1">
                                  {role.responsibilities.map((resp, idx) => (
                                    <li key={idx} className="flex items-start gap-2">
                                      <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 flex-shrink-0" />
                                      <span>{resp}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h4 className="font-medium mb-2">Requirements</h4>
                                <ul className="text-sm space-y-1">
                                  {role.requirements.map((req, idx) => (
                                    <li key={idx} className="flex items-start gap-2">
                                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                                      <span>{req}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                            <div>
                              <h4 className="font-medium mb-2">Required Skills</h4>
                              <div className="flex flex-wrap gap-2">
                                {role.skills.map((skill, idx) => (
                                  <Badge key={idx} variant="secondary" className="text-xs">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-8 p-6 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200">
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <GraduationCap className="h-5 w-5" />
                          General Eligibility & Benefits
                        </h4>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h5 className="font-medium mb-2">Eligibility Criteria</h5>
                            <ul className="space-y-2">
                              {tapri.eligibilityCriteria.map((criteria, index) => (
                                <li key={index} className="flex items-start gap-2">
                                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <span className="text-sm">{criteria}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h5 className="font-medium mb-2">What You'll Get</h5>
                            <ul className="space-y-2">
                              {tapri.benefits.map((benefit, index) => (
                                <li key={index} className="flex items-start gap-2">
                                  <Star className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                                  <span className="text-sm">{benefit}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="roadmap" className="space-y-6">
                  {/* Progress Overview */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5" />
                        Project Progress
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">Overall Progress</span>
                          <span className="text-sm text-gray-600">
                            {completedMilestones}/{totalMilestones} milestones
                          </span>
                        </div>
                        <Progress value={progressPercentage} className="h-2" />
                      </div>

                      <div className="space-y-3">
                        {tapri.milestones.map((milestone, index) => (
                          <div key={index} className="flex items-start gap-3 p-3 rounded-lg border">
                            {milestone.completed ? (
                              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                            ) : (
                              <Circle className="h-5 w-5 text-gray-400 mt-0.5" />
                            )}
                            <div className="flex-1">
                              <h4 className={`font-medium ${milestone.completed ? "text-green-700" : "text-gray-700"}`}>
                                {milestone.title}
                              </h4>
                              <p className="text-sm text-gray-600">{milestone.description}</p>
                              {milestone.dueDate && !milestone.completed && (
                                <p className="text-xs text-orange-600 mt-1">
                                  Due: {new Date(milestone.dueDate).toLocaleDateString()}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Future Plans */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Zap className="h-5 w-5" />
                        Future Plans
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {tapri.futurePlans.map((plan, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-4 p-4 rounded-lg border bg-gradient-to-br from-purple-50 to-blue-50"
                          >
                            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-sm font-semibold text-purple-600">{index + 1}</span>
                            </div>
                            <div>
                              <p className="font-medium">{plan}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="apply" className="space-y-6" id="apply">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Mail className="h-5 w-5" />
                        Ready to Join Our Team?
                      </CardTitle>
                      <CardDescription>
                        Follow our application process to become part of this exciting project
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h4 className="font-semibold mb-3">Application Process</h4>
                        <div className="space-y-3">
                          {tapri.applicationProcess.map((step, index) => (
                            <div key={index} className="flex items-start gap-3">
                              <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-xs font-semibold text-yellow-600">{index + 1}</span>
                              </div>
                              <span className="text-sm">{step}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3">What You'll Learn</h4>
                        <ul className="space-y-2">
                          {tapri.learningOutcomes.map((outcome, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <GraduationCap className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{outcome}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button asChild className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white">
                          <Link href={tapri.applicationFormUrl} target="_blank">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Apply Now
                          </Link>
                        </Button>
                        <Button variant="outline" className="flex-1" asChild>
                          <Link href={`mailto:${tapri.contactEmail}`}>
                            <Mail className="mr-2 h-4 w-4" />
                            Contact Team
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white" asChild>
                    <Link href={tapri.applicationFormUrl} target="_blank">
                      <Users className="mr-2 h-4 w-4" />
                      Join This Tapri
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href={`mailto:${tapri.contactEmail}`}>
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Contact Team
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href={`/schedule/${tapri.teamLeader.name.toLowerCase().replace(/\s+/g, "-")}`}>
                      <Video className="mr-2 h-4 w-4" />
                      Schedule Meeting
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Project Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Project Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{tapri.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{tapri.teamSize} team members</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">Started {new Date(tapri.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{tapri.stage}</span>
                  </div>
                  {tapri.website && (
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-gray-500" />
                      <Link href={tapri.website} target="_blank" className="text-sm text-blue-600 hover:underline">
                        Visit Website
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Get In Touch</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm font-medium">Project Lead</div>
                      <div className="text-sm text-gray-600">{tapri.teamLeader.name}</div>
                      <div className="text-sm text-gray-600">{tapri.teamLeader.role}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Contact Email</div>
                      <Link href={`mailto:${tapri.contactEmail}`} className="text-sm text-blue-600 hover:underline">
                        {tapri.contactEmail}
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
