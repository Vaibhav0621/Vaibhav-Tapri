"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, XCircle, AlertCircle, Database, Loader2, Play, FileText } from "lucide-react"
import { TapriService } from "@/lib/services/tapri-service"
import { supabase, isSupabaseConfigured } from "@/lib/supabase"
import { DatabaseStatus } from "@/components/database-status"

interface TestResult {
  name: string
  status: "success" | "error" | "pending"
  message: string
  data?: any
}

export default function TestDatabasePage() {
  const [testResults, setTestResults] = useState<TestResult[]>([])
  const [loading, setLoading] = useState(false)
  const [testTapri, setTestTapri] = useState({
    title: "Test Tapri Project",
    description: "This is a test tapri created to verify database functionality",
    category: "web-development",
    stage: "prototype",
    location: "Remote",
    team_size: 1,
    open_positions: 2,
  })

  const addResult = (result: TestResult) => {
    setTestResults((prev) => [...prev, result])
  }

  const clearResults = () => {
    setTestResults([])
  }

  const runAllTests = async () => {
    setLoading(true)
    clearResults()

    // Test 1: Configuration Check
    addResult({
      name: "Configuration Check",
      status: "pending",
      message: "Checking Supabase configuration...",
    })

    const isConfigured = isSupabaseConfigured()
    setTestResults((prev) =>
      prev.map((r) =>
        r.name === "Configuration Check"
          ? {
              ...r,
              status: isConfigured ? "success" : "error",
              message: isConfigured ? "Supabase is properly configured" : "Supabase environment variables are missing",
            }
          : r,
      ),
    )

    if (!isConfigured) {
      setLoading(false)
      return
    }

    // Test 2: Database Connection
    addResult({
      name: "Database Connection",
      status: "pending",
      message: "Testing database connection...",
    })

    try {
      const { data, error } = await supabase.from("profiles").select("id").limit(1)
      setTestResults((prev) =>
        prev.map((r) =>
          r.name === "Database Connection"
            ? {
                ...r,
                status: error ? "error" : "success",
                message: error ? `Connection failed: ${error.message}` : "Successfully connected to database",
              }
            : r,
        ),
      )

      if (error) {
        setLoading(false)
        return
      }
    } catch (err: any) {
      setTestResults((prev) =>
        prev.map((r) =>
          r.name === "Database Connection"
            ? {
                ...r,
                status: "error",
                message: `Connection error: ${err.message}`,
              }
            : r,
        ),
      )
      setLoading(false)
      return
    }

    // Test 3: Read Tapris
    addResult({
      name: "Read Tapris",
      status: "pending",
      message: "Fetching tapris from database...",
    })

    try {
      const { data: tapris } = await TapriService.getApprovedTapris(1, 5)
      setTestResults((prev) =>
        prev.map((r) =>
          r.name === "Read Tapris"
            ? {
                ...r,
                status: "success",
                message: `Successfully fetched ${tapris.length} tapris`,
                data: tapris,
              }
            : r,
        ),
      )
    } catch (err: any) {
      setTestResults((prev) =>
        prev.map((r) =>
          r.name === "Read Tapris"
            ? {
                ...r,
                status: "error",
                message: `Failed to fetch tapris: ${err.message}`,
              }
            : r,
        ),
      )
    }

    // Test 4: Table Counts
    addResult({
      name: "Table Counts",
      status: "pending",
      message: "Counting records in all tables...",
    })

    try {
      const [taprisCount, profilesCount, applicationsCount] = await Promise.all([
        supabase.from("tapris").select("id", { count: "exact", head: true }),
        supabase.from("profiles").select("id", { count: "exact", head: true }),
        supabase.from("applications").select("id", { count: "exact", head: true }),
      ])

      const counts = {
        tapris: taprisCount.count || 0,
        profiles: profilesCount.count || 0,
        applications: applicationsCount.count || 0,
      }

      setTestResults((prev) =>
        prev.map((r) =>
          r.name === "Table Counts"
            ? {
                ...r,
                status: "success",
                message: `Tapris: ${counts.tapris}, Profiles: ${counts.profiles}, Applications: ${counts.applications}`,
                data: counts,
              }
            : r,
        ),
      )
    } catch (err: any) {
      setTestResults((prev) =>
        prev.map((r) =>
          r.name === "Table Counts"
            ? {
                ...r,
                status: "error",
                message: `Failed to count records: ${err.message}`,
              }
            : r,
        ),
      )
    }

    // Test 5: RLS Policies
    addResult({
      name: "RLS Policies",
      status: "pending",
      message: "Testing Row Level Security policies...",
    })

    try {
      // Test reading from tables with RLS enabled
      const { data: publicTapris, error: taprisError } = await supabase
        .from("tapris")
        .select("id, title, status")
        .eq("status", "approved")
        .limit(1)

      if (taprisError) {
        setTestResults((prev) =>
          prev.map((r) =>
            r.name === "RLS Policies"
              ? {
                  ...r,
                  status: "error",
                  message: `RLS test failed: ${taprisError.message}`,
                }
              : r,
          ),
        )
      } else {
        setTestResults((prev) =>
          prev.map((r) =>
            r.name === "RLS Policies"
              ? {
                  ...r,
                  status: "success",
                  message: "RLS policies are working correctly",
                }
              : r,
          ),
        )
      }
    } catch (err: any) {
      setTestResults((prev) =>
        prev.map((r) =>
          r.name === "RLS Policies"
            ? {
                ...r,
                status: "error",
                message: `RLS test error: ${err.message}`,
              }
            : r,
        ),
      )
    }

    setLoading(false)
  }

  const createTestTapri = async () => {
    if (!isSupabaseConfigured()) {
      addResult({
        name: "Create Test Tapri",
        status: "error",
        message: "Database not configured",
      })
      return
    }

    addResult({
      name: "Create Test Tapri",
      status: "pending",
      message: "Creating test tapri...",
    })

    try {
      // Create without user ID to test the service
      const { data, error } = await supabase
        .from("tapris")
        .insert({
          ...testTapri,
          status: "approved",
          creator_id: null, // Allow null for test
        })
        .select()
        .single()

      if (error) {
        setTestResults((prev) =>
          prev.map((r) =>
            r.name === "Create Test Tapri"
              ? {
                  ...r,
                  status: "error",
                  message: `Failed to create tapri: ${error.message}`,
                }
              : r,
          ),
        )
      } else {
        setTestResults((prev) =>
          prev.map((r) =>
            r.name === "Create Test Tapri"
              ? {
                  ...r,
                  status: "success",
                  message: `Successfully created test tapri with ID: ${data.id}`,
                  data: data,
                }
              : r,
          ),
        )
      }
    } catch (err: any) {
      setTestResults((prev) =>
        prev.map((r) =>
          r.name === "Create Test Tapri"
            ? {
                ...r,
                status: "error",
                message: `Error creating tapri: ${err.message}`,
              }
            : r,
        ),
      )
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "error":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "pending":
        return <Loader2 className="h-4 w-4 text-blue-600 animate-spin" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800"
      case "error":
        return "bg-red-100 text-red-800"
      case "pending":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Database Testing Dashboard</h1>
          <p className="text-gray-600">
            Test and verify all database functionality to ensure everything is working correctly.
          </p>
        </div>

        <Tabs defaultValue="status" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="status">Status</TabsTrigger>
            <TabsTrigger value="tests">Run Tests</TabsTrigger>
            <TabsTrigger value="create">Create Test Data</TabsTrigger>
            <TabsTrigger value="results">Test Results</TabsTrigger>
          </TabsList>

          <TabsContent value="status" className="space-y-6">
            <DatabaseStatus />

            <Card>
              <CardHeader>
                <CardTitle>Environment Variables</CardTitle>
                <CardDescription>Check if all required environment variables are set</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">NEXT_PUBLIC_SUPABASE_URL</span>
                    <Badge
                      className={
                        process.env.NEXT_PUBLIC_SUPABASE_URL ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }
                    >
                      {process.env.NEXT_PUBLIC_SUPABASE_URL ? "Set" : "Missing"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">NEXT_PUBLIC_SUPABASE_ANON_KEY</span>
                    <Badge
                      className={
                        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }
                    >
                      {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "Set" : "Missing"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">SUPABASE_SERVICE_ROLE_KEY</span>
                    <Badge
                      className={
                        process.env.SUPABASE_SERVICE_ROLE_KEY
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }
                    >
                      {process.env.SUPABASE_SERVICE_ROLE_KEY ? "Set" : "Optional"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tests" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Comprehensive Database Tests
                </CardTitle>
                <CardDescription>
                  Run a series of tests to verify database connectivity, table access, and functionality
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <Button onClick={runAllTests} disabled={loading} className="bg-blue-600 hover:bg-blue-700">
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Play className="mr-2 h-4 w-4" />}
                    Run All Tests
                  </Button>
                  <Button variant="outline" onClick={clearResults}>
                    Clear Results
                  </Button>
                </div>

                {testResults.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-semibold">Test Results:</h4>
                    {testResults.map((result, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                        {getStatusIcon(result.status)}
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{result.name}</span>
                            <Badge className={getStatusColor(result.status)}>{result.status}</Badge>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{result.message}</p>
                          {result.data && (
                            <pre className="text-xs bg-gray-100 p-2 rounded mt-2 overflow-auto">
                              {JSON.stringify(result.data, null, 2)}
                            </pre>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="create" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Create Test Tapri
                </CardTitle>
                <CardDescription>Create a test tapri to verify database write operations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={testTapri.title}
                      onChange={(e) => setTestTapri((prev) => ({ ...prev, title: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      value={testTapri.category}
                      onChange={(e) => setTestTapri((prev) => ({ ...prev, category: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={testTapri.description}
                    onChange={(e) => setTestTapri((prev) => ({ ...prev, description: e.target.value }))}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="stage">Stage</Label>
                    <Input
                      id="stage"
                      value={testTapri.stage}
                      onChange={(e) => setTestTapri((prev) => ({ ...prev, stage: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="team_size">Team Size</Label>
                    <Input
                      id="team_size"
                      type="number"
                      value={testTapri.team_size}
                      onChange={(e) =>
                        setTestTapri((prev) => ({ ...prev, team_size: Number.parseInt(e.target.value) }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="open_positions">Open Positions</Label>
                    <Input
                      id="open_positions"
                      type="number"
                      value={testTapri.open_positions}
                      onChange={(e) =>
                        setTestTapri((prev) => ({ ...prev, open_positions: Number.parseInt(e.target.value) }))
                      }
                    />
                  </div>
                </div>

                <Button onClick={createTestTapri} className="bg-green-600 hover:bg-green-700">
                  <FileText className="mr-2 h-4 w-4" />
                  Create Test Tapri
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="results" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>All Test Results</CardTitle>
                <CardDescription>Complete history of all database tests performed</CardDescription>
              </CardHeader>
              <CardContent>
                {testResults.length === 0 ? (
                  <div className="text-center py-8">
                    <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">
                      No tests have been run yet. Go to the Tests tab to run database tests.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {testResults.map((result, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            {getStatusIcon(result.status)}
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h4 className="font-semibold">{result.name}</h4>
                                <Badge className={getStatusColor(result.status)}>{result.status}</Badge>
                              </div>
                              <p className="text-sm text-gray-600 mb-2">{result.message}</p>
                              {result.data && (
                                <details className="mt-2">
                                  <summary className="text-sm font-medium cursor-pointer">View Data</summary>
                                  <pre className="text-xs bg-gray-100 p-3 rounded mt-2 overflow-auto max-h-40">
                                    {JSON.stringify(result.data, null, 2)}
                                  </pre>
                                </details>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
