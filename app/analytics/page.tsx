"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { TrendingUp, Users, Eye, FileText } from "lucide-react"
import { supabase } from "@/lib/supabase"

interface AnalyticsData {
  totalTapris: number
  totalApplications: number
  totalViews: number
  averageApplicationsPerTapri: number
  categoryDistribution: { name: string; value: number; color: string }[]
  stageDistribution: { name: string; value: number }[]
  monthlyTrends: { month: string; tapris: number; applications: number }[]
  topTapris: { title: string; views: number; applications: number }[]
}

const COLORS = ["#FFBB28", "#FF8042", "#0088FE", "#00C49F", "#8884D8", "#82CA9D"]

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState("30d")

  useEffect(() => {
    loadAnalytics()
  }, [timeRange])

  const loadAnalytics = async () => {
    try {
      // Get all tapris data
      const { data: tapris, error } = await supabase.from("tapris").select("*").eq("status", "approved")

      if (error) throw error

      // Get applications data
      const { data: applications } = await supabase.from("applications").select("*")

      // Process data
      const totalTapris = tapris?.length || 0
      const totalApplications = applications?.length || 0
      const totalViews = tapris?.reduce((sum, t) => sum + (t.views || 0), 0) || 0

      // Category distribution
      const categoryCount: { [key: string]: number } = {}
      tapris?.forEach((t) => {
        categoryCount[t.category] = (categoryCount[t.category] || 0) + 1
      })

      const categoryDistribution = Object.entries(categoryCount).map(([name, value], index) => ({
        name,
        value,
        color: COLORS[index % COLORS.length],
      }))

      // Stage distribution
      const stageCount: { [key: string]: number } = {}
      tapris?.forEach((t) => {
        stageCount[t.stage] = (stageCount[t.stage] || 0) + 1
      })

      const stageDistribution = Object.entries(stageCount).map(([name, value]) => ({
        name,
        value,
      }))

      // Top tapris
      const topTapris =
        tapris
          ?.sort((a, b) => (b.views || 0) - (a.views || 0))
          .slice(0, 5)
          .map((t) => ({
            title: t.title,
            views: t.views || 0,
            applications: t.applications || 0,
          })) || []

      // Mock monthly trends (you'd calculate this from actual dates)
      const monthlyTrends = [
        { month: "Jan", tapris: 12, applications: 45 },
        { month: "Feb", tapris: 19, applications: 67 },
        { month: "Mar", tapris: 15, applications: 89 },
        { month: "Apr", tapris: 22, applications: 123 },
        { month: "May", tapris: 28, applications: 156 },
        { month: "Jun", tapris: 35, applications: 198 },
      ]

      setAnalytics({
        totalTapris,
        totalApplications,
        totalViews,
        averageApplicationsPerTapri: totalTapris > 0 ? totalApplications / totalTapris : 0,
        categoryDistribution,
        stageDistribution,
        monthlyTrends,
        topTapris,
      })
    } catch (error) {
      console.error("Error loading analytics:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">Loading analytics...</div>
      </div>
    )
  }

  if (!analytics) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">No analytics data available</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        <Badge variant="outline">Last 30 days</Badge>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tapris</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalTapris}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalApplications}</div>
            <p className="text-xs text-muted-foreground">+23% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Applications</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.averageApplicationsPerTapri.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground">Per Tapri</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Trends</CardTitle>
            <CardDescription>Tapris created and applications received</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analytics.monthlyTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="tapris" stroke="#8884d8" strokeWidth={2} />
                <Line type="monotone" dataKey="applications" stroke="#82ca9d" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Category Distribution</CardTitle>
            <CardDescription>Tapris by category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analytics.categoryDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {analytics.categoryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Stage Distribution</CardTitle>
            <CardDescription>Tapris by development stage</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analytics.stageDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Performing Tapris</CardTitle>
            <CardDescription>Most viewed projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.topTapris.map((tapri, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{tapri.title}</p>
                    <p className="text-sm text-gray-500">{tapri.applications} applications</p>
                  </div>
                  <Badge variant="secondary">{tapri.views} views</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
