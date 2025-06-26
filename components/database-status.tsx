"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, XCircle, AlertCircle, Database, Loader2, RefreshCw } from "lucide-react"
import { isSupabaseConfigured, checkDatabaseConnection, supabase } from "@/lib/supabase"

interface DatabaseStatus {
  configured: boolean
  connected: boolean
  tabrisCount: number
  profilesCount: number
  applicationsCount: number
  error?: string
}

export function DatabaseStatus() {
  const [status, setStatus] = useState<DatabaseStatus | null>(null)
  const [loading, setLoading] = useState(true)

  const checkStatus = async () => {
    setLoading(true)
    try {
      const configured = isSupabaseConfigured()

      if (!configured) {
        setStatus({
          configured: false,
          connected: false,
          tabrisCount: 0,
          profilesCount: 0,
          applicationsCount: 0,
          error: "Supabase environment variables not configured",
        })
        return
      }

      const connected = await checkDatabaseConnection()

      if (!connected) {
        setStatus({
          configured: true,
          connected: false,
          tabrisCount: 0,
          profilesCount: 0,
          applicationsCount: 0,
          error: "Cannot connect to database",
        })
        return
      }

      // Get table counts
      const [taprisResult, profilesResult, applicationsResult] = await Promise.all([
        supabase.from("tapris").select("id", { count: "exact", head: true }),
        supabase.from("profiles").select("id", { count: "exact", head: true }),
        supabase.from("applications").select("id", { count: "exact", head: true }),
      ])

      setStatus({
        configured: true,
        connected: true,
        tabrisCount: taprisResult.count || 0,
        profilesCount: profilesResult.count || 0,
        applicationsCount: applicationsResult.count || 0,
      })
    } catch (error: any) {
      setStatus({
        configured: isSupabaseConfigured(),
        connected: false,
        tabrisCount: 0,
        profilesCount: 0,
        applicationsCount: 0,
        error: error.message,
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkStatus()
  }, [])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Database Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Checking database connection...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!status) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>Failed to check database status</AlertDescription>
      </Alert>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Database Status
        </CardTitle>
        <CardDescription>Current database connectivity and data overview</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Configuration Status */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Configuration</span>
          <Badge className={status.configured ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
            {status.configured ? <CheckCircle className="h-3 w-3 mr-1" /> : <XCircle className="h-3 w-3 mr-1" />}
            {status.configured ? "Configured" : "Not Configured"}
          </Badge>
        </div>

        {/* Connection Status */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Connection</span>
          <Badge className={status.connected ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
            {status.connected ? <CheckCircle className="h-3 w-3 mr-1" /> : <XCircle className="h-3 w-3 mr-1" />}
            {status.connected ? "Connected" : "Disconnected"}
          </Badge>
        </div>

        {/* Data Counts */}
        {status.connected && (
          <div className="grid grid-cols-3 gap-4 pt-4 border-t">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{status.tabrisCount}</div>
              <div className="text-xs text-gray-600">Tapris</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{status.profilesCount}</div>
              <div className="text-xs text-gray-600">Profiles</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{status.applicationsCount}</div>
              <div className="text-xs text-gray-600">Applications</div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {status.error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{status.error}</AlertDescription>
          </Alert>
        )}

        {/* Refresh Button */}
        <Button variant="outline" size="sm" onClick={checkStatus} disabled={loading} className="w-full">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh Status
        </Button>

        {/* Setup Instructions */}
        {!status.configured && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              To enable full functionality, please configure your Supabase environment variables:
              <br />• NEXT_PUBLIC_SUPABASE_URL
              <br />• NEXT_PUBLIC_SUPABASE_ANON_KEY
              <br />• SUPABASE_SERVICE_ROLE_KEY (for admin features)
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}
