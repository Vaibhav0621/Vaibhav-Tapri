"use client"

import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"

export default function CollaborativeTextEditor({ projectSlug }: { projectSlug: string }) {
  const [text, setText] = useState("")

  return (
    <div className="w-full h-[70vh] bg-white dark:bg-gray-900 rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
        Project Notes for: <span className="text-yellow-600">{decodeURIComponent(projectSlug)}</span>
      </h2>
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your collaborative notes here..."
        className="w-full h-[60vh] resize-none text-sm"
      />
    </div>
  )
}