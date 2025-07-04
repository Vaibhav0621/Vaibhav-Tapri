"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Users, Calendar, Star, TrendingUp, CheckCircle, FileText, ArrowRight, ExternalLink } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { getFormSubmissions, getMockFormSubmissions, convertFormSubmissionToTapri } from "@/app/actions/tapri-actions"
import { useToast } from "@/hooks/use-toast"

type FormSubmission = {
  id: string
  title: string
  description: string
  category: string
  level: string
  modules: string
  name: string
  email: string
  status: string
  created_at: string
}

export default function MyTaprisPage() {
  const [formSubmissions, setFormSubmissions] = useState<FormSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [converting, setConverting] = useState<string | null>(null)
  const [lastConvertedId, setLastConvertedId] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    async function fetchSubmissions() {
      try {
        let submissions = await getFormSubmissions()

        // If no submissions from database, use mock data
        if (submissions.length === 0) {
          submissions = await getMockFormSubmissions()
        }

        setFormSubmissions(submissions)
      } catch (error) {
        console.error("Error fetching submissions:", error)
        // Fallback to mock data
        const mockSubmissions = await getMockFormSubmissions()
        setFormSubmissions(mockSubmissions)
      } finally {
        setLoading(false)
      }
    }

    fetchSubmissions()
  }, [])

  const handleConvertToTapri = async (submissionId: string) => {
    setConverting(submissionId)
    try {
      console.log("Converting submission:", submissionId)
      const result = await convertFormSubmissionToTapri(submissionId)

      console.log("Conversion result:", result)

      if (result.success) {
        setLastConvertedId(result.tapriId || submissionId)

        toast({
          title: "🎉 Success!",
          description: (
            <div className="space-y-2">
              <p>{result.message}</p>
              <Button asChild size="sm" className="mt-2">
                <Link href="/tapris">
                  <ExternalLink className="mr-2 h-3 w-3" />
                  View in Browse Tapris
                </Link>
              </Button>
            </div>
          ),
          duration: 10000, // Show for 10 seconds
        })

        // Update the submission status locally
        setFormSubmissions((prev) =>
          prev.map((sub) => (sub.id === submissionId ? { ...sub, status: "converted" } : sub)),
        )

        // Refresh submissions from server
        setTimeout(async () => {
          try {
            const submissions = await getFormSubmissions()
            if (submissions.length > 0) {
              setFormSubmissions(submissions)
            }
          } catch (error) {
            console.error("Error refreshing submissions:", error)
          }
        }, 1000)
      } else {
        toast({
          title: "❌ Error",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error in handleConvertToTapri:", error)
      toast({
        title: "❌ Error",
        description: "Failed to convert submission. Please try again.",
        variant: "destructive",
      })
    } finally {
      setConverting(null)
    }
  }

  const myProjects = [
    {
      id: 1,
      title: "Web Development Bootcamp",
      description: "Learning modern web development",
      image: "/placeholder.svg?height=200&width=400",
      status: "active",
      progress: 75,
      members: 12,
      role: "Member",
      nextSession: "Tomorrow, 2:00 PM",
    },
    {
      id: 2,
      title: "Startup Incubator",
      description: "Building the next big thing",
      image: "/placeholder.svg?height=200&width=400",
      status: "completed",
      progress: 100,
      members: 8,
      role: "Leader",
      completedDate: "Last week",
    },
  ]

  const createdProjects = [
    {
      id: 3,
      title: "AI Study Group",
      description: "Exploring artificial intelligence together",
      image: "/placeholder.svg?height=200&width=400",
      status: "recruiting",
      members: 5,
      maxMembers: 15,
      applications: 12,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-600 to-red-500 bg-clip-text text-transparent">
              My Tapris
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Manage your projects and track your learning journey
            </p>
          </div>
          <Link href="/create-project">
            <Button className="bg-gradient-to-r from-yellow-600 to-red-500 hover:from-yellow-700 hover:to-red-600 text-white">
              <Plus className="mr-2 h-4 w-4" />
              Create New Tapri
            </Button>
          </Link>
        </div>

        {/* Success Banner */}
        {lastConvertedId && (
          <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-green-600" />
                <div>
                  <h3 className="font-semibold text-green-800">Tapri Created Successfully!</h3>
                  <p className="text-green-700">Your project is now live and visible to everyone.</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button asChild size="sm" variant="outline">
                  <Link href="/tapris">
                    <ExternalLink className="mr-2 h-3 w-3" />
                    Browse Tapris
                  </Link>
                </Button>
                <Button size="sm" variant="ghost" onClick={() => setLastConvertedId(null)}>
                  ✕
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Active Projects</p>
                  <p className="text-2xl font-bold text-yellow-600">3</p>
                </div>
                <TrendingUp className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
                  <p className="text-2xl font-bold text-green-600">5</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Form Submissions</p>
                  <p className="text-2xl font-bold text-blue-600">{formSubmissions.length}</p>
                </div>
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Rating</p>
                  <p className="text-2xl font-bold text-purple-600">4.8</p>
                </div>
                <Star className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="submissions" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="joined">Joined Projects</TabsTrigger>
            <TabsTrigger value="created">Created Projects</TabsTrigger>
            <TabsTrigger value="submissions">Form Submissions</TabsTrigger>
          </TabsList>

          <TabsContent value="joined">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myProjects.map((project) => (
                <Card
                  key={project.id}
                  className="group hover:shadow-xl transition-all duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
                >
                  <div className="aspect-video relative overflow-hidden rounded-t-lg">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <Badge
                      className={`absolute top-3 right-3 ${
                        project.status === "active" ? "bg-green-500" : "bg-blue-500"
                      } text-white`}
                    >
                      {project.status === "active" ? "Active" : "Completed"}
                    </Badge>
                    <Badge className="absolute top-3 left-3 bg-white/90 text-gray-800">{project.role}</Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {project.members} members
                        </span>
                        <span>{project.progress}% complete</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-yellow-600 to-red-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                      {project.status === "active" && (
                        <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                          <Calendar className="h-4 w-4" />
                          Next: {project.nextSession}
                        </div>
                      )}
                      <Button asChild className="w-full bg-yellow-600 hover:bg-yellow-700 text-white">
                        <Link href={`/tapris/${project.id}`}>
                          {project.status === "active" ? "Continue Learning" : "View Details"}
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="created">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {createdProjects.map((project) => (
                <Card
                  key={project.id}
                  className="group hover:shadow-xl transition-all duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
                >
                  <div className="aspect-video relative overflow-hidden rounded-t-lg">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <Badge className="absolute top-3 right-3 bg-orange-500 text-white">Recruiting</Badge>
                    <Badge className="absolute top-3 left-3 bg-white/90 text-gray-800">Leader</Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {project.members}/{project.maxMembers} members
                        </span>
                        <span>{project.applications} applications</span>
                      </div>
                      <Button asChild className="w-full bg-yellow-600 hover:bg-yellow-700 text-white">
                        <Link href={`/tapris/${project.id}/manage`}>Manage Project</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="submissions">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                <div className="col-span-full text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600 mx-auto"></div>
                  <p className="mt-2 text-gray-600">Loading submissions...</p>
                </div>
              ) : formSubmissions.length === 0 ? (
                <div className="col-span-full text-center py-8">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No form submissions yet</p>
                  <Button asChild className="mt-4 bg-yellow-600 hover:bg-yellow-700 text-white">
                    <Link href="/create-project">Submit Your First Project</Link>
                  </Button>
                </div>
              ) : (
                formSubmissions.map((submission) => (
                  <Card
                    key={submission.id}
                    className="group hover:shadow-xl transition-all duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
                  >
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg line-clamp-1">{submission.title}</CardTitle>
                        <Badge
                          className={
                            submission.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : submission.status === "converted"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                          }
                        >
                          {submission.status}
                        </Badge>
                      </div>
                      <CardDescription className="line-clamp-2">{submission.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-gray-500">Category:</span>
                            <div className="font-medium">{submission.category}</div>
                          </div>
                          <div>
                            <span className="text-gray-500">Level:</span>
                            <div className="font-medium">{submission.level}</div>
                          </div>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-500">Submitted:</span>
                          <div className="font-medium">{new Date(submission.created_at).toLocaleDateString()}</div>
                        </div>
                        {submission.status === "pending" && (
                          <Button
                            onClick={() => handleConvertToTapri(submission.id)}
                            disabled={converting === submission.id}
                            className="w-full bg-yellow-600 hover:bg-yellow-700 text-white"
                          >
                            {converting === submission.id ? (
                              <div className="flex items-center gap-2">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                Converting...
                              </div>
                            ) : (
                              <>
                                <ArrowRight className="mr-2 h-4 w-4" />
                                Convert to Tapri
                              </>
                            )}
                          </Button>
                        )}
                        {submission.status === "converted" && (
                          <div className="space-y-2">
                            <Button asChild className="w-full" variant="outline">
                              <Link href="/tapris">
                                <CheckCircle className="mr-2 h-4 w-4" />
                                View in Browse Tapris
                              </Link>
                            </Button>
                            <p className="text-xs text-green-600 text-center">✅ Successfully converted to Tapri</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
