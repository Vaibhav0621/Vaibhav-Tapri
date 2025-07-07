"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Moon, Sun, Users, Code2, PenTool, Paintbrush, MessageCircle } from "lucide-react"


const MonacoEditor = dynamic(() => import("@/components/live/MonacoEditor"), { ssr: false });
const Whiteboard = dynamic(() => import("@/components/live/Whiteboard"), { ssr: false });
const CollaborativeTextEditor = dynamic(() => import("@/components/live/CollaborativeTextEditor"), { ssr: false });
const Comments = dynamic(() => import("@/components/live/Comments"), { ssr: false });
const AINotionEditor = dynamic(() => import("@/components/live/AINotionEditor"), { ssr: false });

export default function ProjectDetailPage() {
  const { slug } = useParams()
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode)
  }, [darkMode])

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-50 dark:bg-[#0f0f0f] transition-colors">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Project: <span className="text-yellow-600">{decodeURIComponent(slug as string)}</span>
        </h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="code" className="w-full">
        <TabsList className="grid grid-cols-5 w-full mb-4 bg-white dark:bg-gray-900">
          <TabsTrigger value="code"><Code2 className="h-4 w-4 mr-1" /> Code Editor</TabsTrigger>
          <TabsTrigger value="editor"><PenTool className="h-4 w-4 mr-1" /> Notes</TabsTrigger>
          <TabsTrigger value="ai"><Users className="h-4 w-4 mr-1" /> AI Editor</TabsTrigger>
          <TabsTrigger value="whiteboard"><Paintbrush className="h-4 w-4 mr-1" /> Whiteboard</TabsTrigger>
          <TabsTrigger value="chat"><MessageCircle className="h-4 w-4 mr-1" /> Comments</TabsTrigger>
        </TabsList>

        <TabsContent value="code">
          <MonacoEditor projectSlug={slug as string} />
        </TabsContent>

        <TabsContent value="editor">
          <CollaborativeTextEditor projectSlug={slug as string} />
        </TabsContent>

        <TabsContent value="ai">
          <AINotionEditor projectSlug={slug as string} />
        </TabsContent>

        <TabsContent value="whiteboard">
          <Whiteboard projectSlug={slug as string} />
        </TabsContent>

        <TabsContent value="chat">
          <Comments projectSlug={slug as string} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
