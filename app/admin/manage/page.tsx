"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, Edit, Trash2, Eye, CheckCircle, XCircle, BarChart3, Users, TrendingUp } from "lucide-react"
import { getAnalytics } from "@/components/analytics/user-tracker"

// Mock data for admin dashboard
const pendingTapris = [
  {
    id: "p1",
    title: "Sustainable Energy Platform",
    creator: "John Smith",
    email: "john@example.com",
    category: "CleanTech",
    stage: "Pre-Seed",
    teamSize: 4,
    description: "Revolutionary solar energy management system for residential use",
    status: "pending",
    createdAt: "2023-12-15T10:30:00Z",
    openPositions: 3,
  },
  {
    id: "p2",
    title: "Mental Wellness App",
    creator: "Sarah Johnson",
    email: "sarah@example.com",
    category: "HealthTech",
    stage: "Seed Stage",
    teamSize: 6,
    description: "AI-powered mental health support platform with peer counseling",
    status: "pending",
    createdAt: "2023-12-14T14:20:00Z",
    openPositions: 2,
  },
]

const liveTapris = [
  {
    id: "l1",
    title: "AI-Powered EdTech Platform",
    creator: "Sarah Chen",
    email: "sarah@example.com",
    category: "EdTech",
    stage: "Seed Stage",
    teamSize: 5,
    description: "Revolutionary learning platform using AI to personalize education",
    status: "live",
    publishedAt: "2023-12-10T15:30:00Z",
    views: 1247,
    applications: 23,
    openPositions: 3,
  },
  {
    id: "l2",
    title: "Blockchain Supply Chain",
    creator: "Michael Rodriguez",
    email: "michael@example.com",
    category: "Blockchain",
    stage: "Series A",
    teamSize: 8,
    description: "Transparent supply chain management using blockchain technology",
    status: "live",
    publishedAt: "2023-12-08T10:15:00Z",
    views: 892,
    applications: 15,
    openPositions: 5,
  },
]

export default function AdminManagePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [newTapri, setNewTapri] = useState({
    title: "",
    description: "",
    category: "",
    stage: "",
    teamSize: "",
    openPositions: "",
    creator: "",
    email: "",
  })

  // Get analytics data
  const analytics = typeof window !== "undefined" ? getAnalytics() : {}

  const handleApprove = (tapriId: string) => {
    console.log("Approving tapri:", tapriId)
    // In a real app, this would update the database
  }

  const handleReject = (tapriId: string) => {
    console.log("Rejecting tapri:", tapriId)
    // In a real app, this would update the database
  }

  const handleCreateTapri = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Creating new tapri:", newTapri)
    // In a real app, this would create a new tapri in the database

    // Reset form
    setNewTapri({
      title: "",
      description: "",
      category: "",
      stage: "",
      teamSize: "",
      openPositions: "",
      creator: "",
      email: "",
    })
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <section className="w-full py-12 bg-black text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tighter">Admin Management Dashboard</h1>
              <p className="text-gray-400 mt-2">Manage tapris, users, and platform analytics</p>
            </div>
            <div className="flex gap-4">
              <Button asChild className="bg-yellow-500 hover:bg-yellow-600 text-black">
                <Link href="/admin">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  View Analytics
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12">
        <div className="container px-4 md:px-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Pending Reviews</p>
                    <p className="text-2xl font-bold">{pendingTapris.length}</p>
                  </div>
                  <div className="h-8 w-8 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center">
                    <Eye className="h-4 w-4 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Live Tapris</p>
                    <p className="text-2xl font-bold">{liveTapris.length}</p>
                  </div>
                  <div className="h-8 w-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Views</p>
                    <p className="text-2xl font-bold">
                      {Object.values(analytics.pageViews || {}).reduce((a: number, b: number) => a + b, 0)}
                    </p>
                  </div>
                  <div className="h-8 w-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <TrendingUp className="h-4 w-4 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active Users</p>
                    <p className="text-2xl font-bold">1,247</p>
                  </div>
                  <div className="h-8 w-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                    <Users className="h-4 w-4 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="pending" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="pending">
                Pending Reviews
                <Badge className="ml-2 bg-yellow-500 text-black">{pendingTapris.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="live">
                Live Tapris
                <Badge className="ml-2 bg-green-500 text-white">{liveTapris.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="create">Create New Tapri</TabsTrigger>
            </TabsList>

            <TabsContent value="pending" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Pending Tapri Reviews</h2>
                <div className="relative w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search pending tapris..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {pendingTapris.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
                    <p className="text-muted-foreground text-center">No pending tapris to review</p>
                  </CardContent>
                </Card>
              ) : (
                pendingTapris.map((tapri) => (
                  <Card key={tapri.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{tapri.title}</CardTitle>
                          <CardDescription>
                            By {tapri.creator} • {tapri.email}
                          </CardDescription>
                        </div>
                        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-300">
                          Pending Review
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{tapri.description}</p>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Category:</span> {tapri.category}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Stage:</span> {tapri.stage}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Team Size:</span> {tapri.teamSize}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Open Positions:</span> {tapri.openPositions}
                        </div>
                      </div>
                      <div className="mt-2 text-sm">
                        <span className="text-muted-foreground">Submitted on:</span> {formatDate(tapri.createdAt)}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        Preview
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600"
                        onClick={() => handleReject(tapri.id)}
                      >
                        <XCircle className="mr-2 h-4 w-4" />
                        Reject
                      </Button>
                      <Button
                        size="sm"
                        className="bg-green-500 hover:bg-green-600 text-white"
                        onClick={() => handleApprove(tapri.id)}
                      >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Approve & Publish
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              )}
            </TabsContent>

            <TabsContent value="live" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Live Tapris</h2>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Switch id="auto-publish" />
                    <Label htmlFor="auto-publish">Auto-publish approved tapris</Label>
                  </div>
                </div>
              </div>

              {liveTapris.map((tapri) => (
                <Card key={tapri.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{tapri.title}</CardTitle>
                        <CardDescription>
                          By {tapri.creator} • Published {formatDate(tapri.publishedAt)}
                        </CardDescription>
                      </div>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-300">
                        Live
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{tapri.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Category:</span> {tapri.category}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Stage:</span> {tapri.stage}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Views:</span> {tapri.views}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Applications:</span> {tapri.applications}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Open Positions:</span> {tapri.openPositions}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end space-x-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/tapris/${tapri.id}`}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Live
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Remove
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="create" className="space-y-6">
              <div className="max-w-2xl">
                <h2 className="text-2xl font-bold mb-4">Create New Tapri</h2>
                <p className="text-muted-foreground mb-6">
                  Create a new tapri directly from the admin panel. This will be published immediately.
                </p>

                <Card>
                  <form onSubmit={handleCreateTapri}>
                    <CardHeader>
                      <CardTitle>Tapri Details</CardTitle>
                      <CardDescription>Fill in the details for the new tapri project</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="title">Tapri Title</Label>
                          <Input
                            id="title"
                            value={newTapri.title}
                            onChange={(e) => setNewTapri({ ...newTapri, title: e.target.value })}
                            placeholder="Enter tapri title"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="category">Category</Label>
                          <Select
                            value={newTapri.category}
                            onValueChange={(value) => setNewTapri({ ...newTapri, category: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="edtech">EdTech</SelectItem>
                              <SelectItem value="healthtech">HealthTech</SelectItem>
                              <SelectItem value="fintech">FinTech</SelectItem>
                              <SelectItem value="cleantech">CleanTech</SelectItem>
                              <SelectItem value="blockchain">Blockchain</SelectItem>
                              <SelectItem value="ecommerce">E-commerce</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          value={newTapri.description}
                          onChange={(e) => setNewTapri({ ...newTapri, description: e.target.value })}
                          placeholder="Describe the tapri project"
                          rows={3}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="stage">Stage</Label>
                          <Select
                            value={newTapri.stage}
                            onValueChange={(value) => setNewTapri({ ...newTapri, stage: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select stage" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="idea">Idea Stage</SelectItem>
                              <SelectItem value="pre-seed">Pre-Seed</SelectItem>
                              <SelectItem value="seed">Seed Stage</SelectItem>
                              <SelectItem value="series-a">Series A</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="teamSize">Team Size</Label>
                          <Input
                            id="teamSize"
                            type="number"
                            value={newTapri.teamSize}
                            onChange={(e) => setNewTapri({ ...newTapri, teamSize: e.target.value })}
                            placeholder="5"
                            min="1"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="openPositions">Open Positions</Label>
                          <Input
                            id="openPositions"
                            type="number"
                            value={newTapri.openPositions}
                            onChange={(e) => setNewTapri({ ...newTapri, openPositions: e.target.value })}
                            placeholder="3"
                            min="0"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="creator">Creator Name</Label>
                          <Input
                            id="creator"
                            value={newTapri.creator}
                            onChange={(e) => setNewTapri({ ...newTapri, creator: e.target.value })}
                            placeholder="John Doe"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Creator Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={newTapri.email}
                            onChange={(e) => setNewTapri({ ...newTapri, email: e.target.value })}
                            placeholder="john@example.com"
                            required
                          />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button type="button" variant="outline">
                        Save as Draft
                      </Button>
                      <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
                        <Plus className="mr-2 h-4 w-4" />
                        Create & Publish
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
}
