"use client"

import { useState, useEffect } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { X, AlertTriangle } from "lucide-react"

export function SetupBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [isConfigured, setIsConfigured] = useState(true)

  useEffect(() => {
    // Check if Supabase is configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey || supabaseUrl.includes("your-project") || supabaseKey.includes("your-anon-key")) {
      setIsConfigured(false)
      setIsVisible(true)
    }
  }, [])

  if (!isVisible || isConfigured) {
    return null
  }

  return (
    <Alert className="rounded-none border-x-0 border-t-0 bg-yellow-50 border-yellow-200">
      <AlertTriangle className="h-4 w-4 text-yellow-600" />
      <AlertDescription className="flex items-center justify-between w-full">
        <span className="text-yellow-800">
          <strong>Setup Required:</strong> Please configure your Supabase credentials in the environment variables to
          enable full functionality.
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsVisible(false)}
          className="text-yellow-600 hover:text-yellow-700 hover:bg-yellow-100"
        >
          <X className="h-4 w-4" />
        </Button>
      </AlertDescription>
    </Alert>
  )
}
