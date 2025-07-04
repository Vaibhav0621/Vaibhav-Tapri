"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ExternalLink, Database, Settings } from "lucide-react"
import { isSupabaseConfigured } from "@/lib/supabase"

export function SetupBanner() {
  const [isExpanded, setIsExpanded] = useState(false)
  const isConfigured = isSupabaseConfigured()

  if (isConfigured) return null

  return (
    <Alert className="mb-6 border-yellow-200 bg-yellow-50">
      <Settings className="h-4 w-4" />
      <AlertDescription>
        <div className="flex items-center justify-between">
          <span>Database not configured. Using demo mode with sample data.</span>
          <Button variant="outline" size="sm" onClick={() => setIsExpanded(!isExpanded)}>
            Setup Guide
          </Button>
        </div>

        {isExpanded && (
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Complete Database Setup
              </CardTitle>
              <CardDescription>
                Follow these steps to set up your Supabase database with required tables
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-sm font-medium text-blue-600">
                    1
                  </div>
                  <div>
                    <p className="font-medium">Create Supabase Project</p>
                    <p className="text-sm text-muted-foreground">
                      Go to{" "}
                      <a
                        href="https://supabase.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline inline-flex items-center gap-1"
                      >
                        supabase.com <ExternalLink className="h-3 w-3" />
                      </a>{" "}
                      and create a new project
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-sm font-medium text-blue-600">
                    2
                  </div>
                  <div>
                    <p className="font-medium">Set up Authentication</p>
                    <p className="text-sm text-muted-foreground">
                      Enable email authentication in your Supabase project settings
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-sm font-medium text-blue-600">
                    3
                  </div>
                  <div>
                    <p className="font-medium">Create Database Tables</p>
                    <p className="text-sm text-muted-foreground">
                      Run the SQL commands in your Supabase SQL editor to create required tables
                    </p>
                    <div className="mt-2 rounded bg-gray-100 p-3 text-xs font-mono overflow-x-auto">
                      <div>-- Create profiles table</div>
                      <div>CREATE TABLE profiles (</div>
                      <div>&nbsp;&nbsp;id UUID REFERENCES auth.users PRIMARY KEY,</div>
                      <div>&nbsp;&nbsp;email TEXT UNIQUE NOT NULL,</div>
                      <div>&nbsp;&nbsp;full_name TEXT,</div>
                      <div>&nbsp;&nbsp;avatar_url TEXT,</div>
                      <div>&nbsp;&nbsp;bio TEXT,</div>
                      <div>&nbsp;&nbsp;role TEXT DEFAULT 'user',</div>
                      <div>&nbsp;&nbsp;is_admin BOOLEAN DEFAULT FALSE,</div>
                      <div>&nbsp;&nbsp;created_at TIMESTAMP DEFAULT NOW(),</div>
                      <div>&nbsp;&nbsp;updated_at TIMESTAMP DEFAULT NOW()</div>
                      <div>);</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-sm font-medium text-blue-600">
                    4
                  </div>
                  <div>
                    <p className="font-medium">Add Environment Variables</p>
                    <div className="mt-2 rounded bg-gray-100 p-3 text-sm font-mono">
                      <div>NEXT_PUBLIC_SUPABASE_URL=your_project_url</div>
                      <div>NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-sm font-medium text-blue-600">
                    5
                  </div>
                  <div>
                    <p className="font-medium">Restart Development Server</p>
                    <p className="text-sm text-muted-foreground">
                      Run <code className="rounded bg-gray-100 px-1">npm run dev</code> to apply changes
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </AlertDescription>
    </Alert>
  )
}
