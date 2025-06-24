// components/database-status.tsx

"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, XCircle, AlertCircle, Database, Loader2, RefreshCw } from "lucide-react"

// CORRECT: Import the client-side configured check
import { isSupabaseConfigured } from "@/lib/supabase"

// NOTE: We cannot check DB connection or run admin queries directly from a client component anymore.
// This is a GOOD thing for security. We will check this via a Server Action.

async function checkServerStatus() {
    'use server' // This is a Server Action!
    try {
        const { createServerClient } = await import('@/lib/supabase/server')
        const { supabaseAdmin, isAdminAvailable } = await import('@/lib/supabase/admin')
        
        const supabase = createServerClient()
        const { error: connectionError } = await supabase.from("profiles").select("id").limit(1)

        if(connectionError) throw new Error("Database connection failed.");
        
        const { count: taprisCount } = await supabase.from("tapris").select('id', { count: 'exact', head: true });
        
        // Admin functions should check if the admin client is available.
        let profilesCount = 0;
        if(isAdminAvailable()) {
            const { count } = await supabaseAdmin.from("profiles").select('id', { count: 'exact', head: true });
            profilesCount = count ?? 0;
        }

        return {
            connected: true,
            tabrisCount: taprisCount || 0,
            profilesCount,
            adminAvailable: isAdminAvailable()
        }
    } catch (e: any) {
        return {
            connected: false,
            error: e.message
        }
    }
}


interface DatabaseStatus {
  configured: boolean
  connected: boolean
  tabrisCount: number
  profilesCount: number
  adminAvailable: boolean
  error?: string
}

export function DatabaseStatus() {
  const [status, setStatus] = useState<DatabaseStatus | null>(null)
  const [loading, setLoading] = useState(true)

  const checkStatus = async () => {
    setLoading(true)
    const configured = isSupabaseConfigured()
    if (!configured) {
        setStatus({
            configured: false, connected: false, tabrisCount: 0, profilesCount: 0, adminAvailable: false, error: "Supabase environment variables not configured"
        });
        setLoading(false);
        return;
    }
    
    // Call our new Server Action to check server-side status
    const serverStatus = await checkServerStatus();
    setStatus({
        configured: true,
        connected: serverStatus.connected,
        tabrisCount: serverStatus.tabrisCount || 0,
        profilesCount: serverStatus.profilesCount || 0,
        adminAvailable: serverStatus.adminAvailable || false,
        error: serverStatus.error
    });
    setLoading(false);
  }

  useEffect(() => {
    checkStatus()
  }, [])
  
  if (loading) {
    return <Card><CardHeader><CardTitle>Database Status</CardTitle></CardHeader><CardContent><Loader2 className="animate-spin" /> Checking...</CardContent></Card>
  }
  if (!status) return <Alert variant="destructive">Could not load status.</Alert>

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Database /> Database Status</CardTitle>
        <CardDescription>Connectivity and data overview.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Configuration Status */}
        <div className="flex items-center justify-between"><span className="font-medium">Client Config</span><Badge variant={status.configured ? "default" : "destructive"}>{status.configured ? "Configured" : "Missing"}</Badge></div>
        {/* Connection Status */}
        <div className="flex items-center justify-between"><span className="font-medium">DB Connection</span><Badge variant={status.connected ? "default" : "destructive"}>{status.connected ? "Connected" : "Failed"}</Badge></div>
        {/* Admin Key */}
        <div className="flex items-center justify-between"><span className="font-medium">Admin Key</span><Badge variant={status.adminAvailable ? "default" : "secondary"}>{status.adminAvailable ? "Available" : "Not Set"}</Badge></div>

        {status.connected && (
          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div className="text-center"><div className="text-2xl font-bold text-blue-500">{status.tabrisCount}</div><div className="text-xs text-muted-foreground">Tapris</div></div>
            <div className="text-center"><div className="text-2xl font-bold text-green-500">{status.profilesCount}</div><div className="text-xs text-muted-foreground">Profiles (Admin)</div></div>
          </div>
        )}

        {status.error && <Alert variant="destructive"><AlertCircle className="h-4 w-4" /><AlertDescription>{status.error}</AlertDescription></Alert>}

        <Button variant="outline" size="sm" onClick={checkStatus} disabled={loading} className="w-full">
          <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} /> Refresh Status
        </Button>
      </CardContent>
    </Card>
  )
}
