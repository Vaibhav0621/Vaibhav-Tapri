"use client"

import { useState } from "react"
import TextareaAutosize from "react-textarea-autosize"
import { cn } from "@/lib/utils"

export default function AINotionEditor({ projectSlug }: { projectSlug: string }) {
  const [content, setContent] = useState("")

  return (
    <div className="h-[70vh] bg-white dark:bg-gray-900 p-4 rounded-lg shadow overflow-y-auto">
      <TextareaAutosize
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Start writing your Notion-style doc..."
        className={cn(
          "w-full text-lg bg-transparent outline-none resize-none min-h-[400px]",
          "text-gray-800 dark:text-white"
        )}
      />
    </div>
  )
}
