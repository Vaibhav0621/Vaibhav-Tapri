"use client"

import type React from "react"

// Simple wrapper component for consistency
export default function AuthSessionProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
