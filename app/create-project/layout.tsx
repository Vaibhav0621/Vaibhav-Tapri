import type React from "react"
import AuthCheck from "@/components/auth-check"

export default function CreateProjectLayout({ children }: { children: React.ReactNode }) {
  return <AuthCheck>{children}</AuthCheck>
}
