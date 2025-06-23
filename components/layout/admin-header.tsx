"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { NotificationBell } from "@/components/admin/notification-bell"
import { Settings, BarChart3 } from "lucide-react"

export function AdminHeader() {
  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <NotificationBell />
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin/analytics">
                <BarChart3 className="h-4 w-4 mr-2" />
                Analytics
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin/settings">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
