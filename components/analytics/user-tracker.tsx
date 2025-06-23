"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

// Simple analytics store (in production, you'd use a real analytics service)
const analytics = {
  pageViews: new Map<string, number>(),
  userSessions: new Set<string>(),
  tapriViews: new Map<string, number>(),
}

export function trackPageView(path: string) {
  const currentViews = analytics.pageViews.get(path) || 0
  analytics.pageViews.set(path, currentViews + 1)

  // Store in localStorage for persistence
  if (typeof window !== "undefined") {
    const stored = JSON.parse(localStorage.getItem("tapri_analytics") || "{}")
    stored.pageViews = stored.pageViews || {}
    stored.pageViews[path] = (stored.pageViews[path] || 0) + 1
    localStorage.setItem("tapri_analytics", JSON.stringify(stored))
  }
}

export function trackTapriView(tapriId: string) {
  const currentViews = analytics.tapriViews.get(tapriId) || 0
  analytics.tapriViews.set(tapriId, currentViews + 1)

  if (typeof window !== "undefined") {
    const stored = JSON.parse(localStorage.getItem("tapri_analytics") || "{}")
    stored.tapriViews = stored.tapriViews || {}
    stored.tapriViews[tapriId] = (stored.tapriViews[tapriId] || 0) + 1
    localStorage.setItem("tapri_analytics", JSON.stringify(stored))
  }
}

export function getAnalytics() {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem("tapri_analytics") || "{}")
  }
  return {}
}

export default function UserTracker() {
  const pathname = usePathname()

  useEffect(() => {
    // Track page view
    trackPageView(pathname)

    // Generate or get user session ID
    if (typeof window !== "undefined") {
      let sessionId = sessionStorage.getItem("tapri_session_id")
      if (!sessionId) {
        sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        sessionStorage.setItem("tapri_session_id", sessionId)
      }
      analytics.userSessions.add(sessionId)
    }
  }, [pathname])

  return null
}
