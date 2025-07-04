"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Search,
  Plus,
  Eye,
  CheckCircle,
  XCircle,
  BarChart3,
  Users,
  TrendingUp,
  FileText,
  Mail,
  Settings,
} from "lucide-react"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { AnalyticsService } from "@/lib/services/analytics-service"
import { TapriService } from "@/lib/services/tapri-service"

interface DashboardStats {
  totalTapris: number
  pendingTapris: number
  approvedTapris: number
  totalUsers: number
  totalApplications: number
  totalViews: number
  userGrowthRate: string
  recentActivity: {
    newUsersThisMonth: number
    newApplicationsThisMonth: number
  }
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [pendingTapris, setPendingTapris] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      const [analyticsData, pendingData] = await Promise.all([
        AnalyticsService.getDashboardAnalytics(),
        TapriService.getPendingTapris(),
      ])

      setStats(analyticsData)
      setPendingTapris(pendingData)
    } catch (error) {
      console.error("Error loading dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (tapriId: string) => {
    try {
      await TapriService.approveTapri(tapriId)
      await loadDashboardData() // Refresh data
    } catch (error) {
      console.error("Error approving tapri:", error)
    }
  }

  const handleReject = async (tapriId: string) => {
    try {
      await TapriService.rejectTapri(tapriId)
      await loadDashboardData() // Refresh data
    } catch (error) {
      console.error("Error rejecting tapri:", error)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <ProtectedRoute requireAdmin>
      <div className="flex flex-col min-h-screen">
        <section className="w-full py-12 bg-black text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tighter">Admin Dashboard</h1>
                <p className="text-gray-400 mt-2">Manage your Tapri platform</p>
              </div>
              <div className="flex gap-4">
                <Button asChild className="bg-yellow-500 hover:bg-yellow-600 text-black">
                  <Link href="/admin/manage">
                    <Settings className="mr-2 h-4 w-4" />
                    Manage Platform
                  </Link>
                </Button>
                <Button asChild variant="outline" className="border-white hover:bg-white/10">
                  <Link href="/admin/analytics">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Analytics
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12">
          <div className="container px-4 md:px-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Tapris</p>
                      <p className="text-2xl font-bold">{stats?.totalTapris || 0}</p>
                    </div>
                    <div className="h-8 w-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <FileText className="h-4 w-4 text-blue-600" />
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    {stats?.approvedTapris || 0} approved, {stats?.pendingTapris || 0} pending
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                      <p className="text-2xl font-bold">{stats?.totalUsers || 0}</p>
                    </div>
                    <div className="h-8 w-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                      <Users className="h-4 w-4 text-green-600" />
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">{stats?.userGrowthRate} growth this month</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Applications</p>
                      <p className="text-2xl font-bold">{stats?.totalApplications || 0}</p>
                    </div>
                    <div className="h-8 w-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                      <Mail className="h-4 w-4 text-purple-600" />
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    {stats?.recentActivity.newApplicationsThisMonth || 0} this month
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Page Views</p>
                      <p className="text-2xl font-bold">{stats?.totalViews || 0}</p>
                    </div>
                    <div className="h-8 w-8 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
                      <TrendingUp className="h-4 w-4 text-orange-600" />
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">Across all tapris</div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="pending" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="pending">
                  Pending Reviews
                  <Badge className="ml-2 bg-yellow-500 text-black">{pendingTapris.length}</Badge>
                </TabsTrigger>
                <TabsTrigger value="recent">Recent Activity</TabsTrigger>
                <TabsTrigger value="quick-actions">Quick Actions</TabsTrigger>
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
                  pendingTapris.map((tapri: any) => (
                    <Card key={tapri.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{tapri.title}</CardTitle>
                            <CardDescription>
                              By {tapri.profiles?.full_name} • {tapri.profiles?.email}
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
                            <span className="text-muted-foreground">Team Size:</span> {tapri.team_size}
                          </div>
                          <div>
                            <span className="text-muted-foreground">Open Positions:</span> {tapri.open_positions}
                          </div>
                        </div>
                        <div className="mt-2 text-sm">
                          <span className="text-muted-foreground">Submitted on:</span> {formatDate(tapri.created_at)}
                        </div>
                      </CardContent>
                      <div className="flex justify-end space-x-2 p-6 pt-0">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/tapris/${tapri.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            Preview
                          </Link>
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
                      </div>
                    </Card>
                  ))
                )}
              </TabsContent>

              <TabsContent value="recent" className="space-y-4">
                <h2 className="text-2xl font-bold">Recent Activity</h2>
                <div className="grid gap-4">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-2">New Users This Month</h3>
                      <p className="text-2xl font-bold text-green-600">
                        {stats?.recentActivity.newUsersThisMonth || 0}
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-2">New Applications This Month</h3>
                      <p className="text-2xl font-bold text-blue-600">
                        {stats?.recentActivity.newApplicationsThisMonth || 0}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="quick-actions" className="space-y-4">
                <h2 className="text-2xl font-bold">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Card className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-6 text-center">
                      <Plus className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                      <h3 className="font-semibold">Create New Tapri</h3>
                      <p className="text-sm text-muted-foreground">Add a new tapri directly</p>
                    </CardContent>
                  </Card>

                  <Card className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-6 text-center">
                      <Users className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                      <h3 className="font-semibold">Manage Users</h3>
                      <p className="text-sm text-muted-foreground">View and manage user accounts</p>
                    </CardContent>
                  </Card>

                  <Card className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-6 text-center">
                      <BarChart3 className="h-8 w-8 mx-auto mb-2 text-green-500" />
                      <h3 className="font-semibold">View Analytics</h3>
                      <p className="text-sm text-muted-foreground">Detailed platform analytics</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </div>
    </ProtectedRoute>
  )
}
