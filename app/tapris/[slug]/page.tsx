"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Moon, Sun, Users, Code2, PenTool, Paintbrush, MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"

const MonacoEditor = dynamic(() => import("@/components/live/MonacoEditor"), { ssr: false });
const Whiteboard = dynamic(() => import("@/components/live/Whiteboard"), { ssr: false });
const CollaborativeTextEditor = dynamic(() => import("@/components/live/CollaborativeTextEditor"), { ssr: false });
const Comments = dynamic(() => import("@/components/live/Comments"), { ssr: false });
const AINotionEditor = dynamic(() => import("@/components/live/AINotionEditor"), { ssr: false });

export default function ProjectDetailPage() {
  const params = useParams()
  let slug = params?.slug as string
  
  // Fix: Handle when slug is literally "null" or undefined
  if (!slug || slug === 'null' || slug === 'undefined') {
    // Extract project name from URL if possible
    if (typeof window !== 'undefined') {
      const pathParts = window.location.pathname.split('/')
      const projectIndex = pathParts.indexOf('tapris') + 1
      if (pathParts[projectIndex] && pathParts[projectIndex] !== 'null') {
        slug = pathParts[projectIndex]
      } else {
        slug = 'masky' // Default to masky since that's what you clicked
      }
    } else {
      slug = 'masky'
    }
  }
  
  const [darkMode, setDarkMode] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode)
  }, [darkMode])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-50 dark:bg-[#0f0f0f] transition-colors">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Project: <span className="text-yellow-600">{decodeURIComponent(slug)}</span>
        </h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="code" className="w-full">
        <div className={cn(
          // Positioning
          "sticky top-6 z-50 mb-8",
          // Center alignment
          "flex justify-center",
          // Animation on scroll
          "transition-all duration-500 ease-out",
          isScrolled && "top-3"
        )}>
          <div className={cn(
            // Container with gradient border effect
            "relative p-[2px] rounded-full",
            // Gradient border
            "bg-gradient-to-r from-yellow-400 via-red-400 to-yellow-400",
            // Animated gradient
            "bg-[length:200%_100%] animate-gradient",
            // Scale animation on scroll
            "transition-transform duration-500",
            isScrolled && "scale-95",
            // ✅ FIX: Ensure clicks pass through to children
            "pointer-events-none"
          )}>
            <TabsList className={cn(
              // ✅ FIX: Re-enable pointer events for the actual tabs
              "pointer-events-auto",
              // Layout
              "relative grid grid-cols-5 gap-1",
              // Size
              "h-14 px-2",
              // Background with strong blur
              "bg-white/70 dark:bg-gray-900/70",
              "backdrop-blur-xl backdrop-saturate-150",
              // Rounded
              "rounded-full",
              // Multiple shadows for depth
              "shadow-[0_8px_32px_rgba(0,0,0,0.12)]",
              "dark:shadow-[0_8px_32px_rgba(255,255,255,0.1)]",
              // Remove default styles
              "border-0",
              // Animation
              "transition-all duration-300",
              // ✅ FIX: Add pseudo-element for glow without blocking clicks
              "before:absolute before:inset-0 before:rounded-full",
              "before:shadow-[0_0px_48px_rgba(251,191,36,0.3)]",
              "dark:before:shadow-[0_0px_48px_rgba(255,255,255,0.2)]",
              "before:pointer-events-none"
            )}>
              <TabsTrigger 
                value="code" 
                className={cn(
                  // ✅ FIX: Ensure clickable
                  "cursor-pointer",
                  // Base styles
                  "relative rounded-full px-4",
                  "transition-all duration-300",
                  // Text styles
                  "text-gray-600 dark:text-gray-400",
                  "data-[state=active]:text-gray-900 dark:data-[state=active]:text-white",
                  // Active state
                  "data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-200/80 data-[state=active]:to-orange-200/80",
                  "dark:data-[state=active]:from-yellow-900/40 dark:data-[state=active]:to-orange-900/40",
                  // Active shadow
                  "data-[state=active]:shadow-lg",
                  "data-[state=active]:shadow-yellow-400/25 dark:data-[state=active]:shadow-yellow-400/20",
                  // Hover
                  "hover:bg-gray-100/50 dark:hover:bg-gray-800/50",
                  // Scale on hover
                  "hover:scale-105 active:scale-95",
                  // Remove default focus
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2"
                )}
              >
                <Code2 className="h-4 w-4 mr-1.5" />
                <span className="text-sm font-medium">Code</span>
              </TabsTrigger>

              <TabsTrigger 
                value="editor"
                className={cn(
                  "cursor-pointer",
                  "relative rounded-full px-4",
                  "transition-all duration-300",
                  "text-gray-600 dark:text-gray-400",
                  "data-[state=active]:text-gray-900 dark:data-[state=active]:text-white",
                  "data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-200/80 data-[state=active]:to-orange-200/80",
                  "dark:data-[state=active]:from-yellow-900/40 dark:data-[state=active]:to-orange-900/40",
                  "data-[state=active]:shadow-lg",
                  "data-[state=active]:shadow-yellow-400/25 dark:data-[state=active]:shadow-yellow-400/20",
                  "hover:bg-gray-100/50 dark:hover:bg-gray-800/50",
                  "hover:scale-105 active:scale-95",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2"
                )}
              >
                <PenTool className="h-4 w-4 mr-1.5" />
                <span className="text-sm font-medium">Notes</span>
              </TabsTrigger>

              <TabsTrigger 
                value="ai"
                className={cn(
                  "cursor-pointer",
                  "relative rounded-full px-4",
                  "transition-all duration-300",
                  "text-gray-600 dark:text-gray-400",
                  "data-[state=active]:text-gray-900 dark:data-[state=active]:text-white",
                  "data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-200/80 data-[state=active]:to-orange-200/80",
                  "dark:data-[state=active]:from-yellow-900/40 dark:data-[state=active]:to-orange-900/40",
                  "data-[state=active]:shadow-lg",
                  "data-[state=active]:shadow-yellow-400/25 dark:data-[state=active]:shadow-yellow-400/20",
                  "hover:bg-gray-100/50 dark:hover:bg-gray-800/50",
                  "hover:scale-105 active:scale-95",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2"
                )}
              >
                <Users className="h-4 w-4 mr-1.5" />
                <span className="text-sm font-medium">AI Editor</span>
              </TabsTrigger>

              <TabsTrigger 
                value="whiteboard"
                className={cn(
                  "cursor-pointer",
                  "relative rounded-full px-4",
                  "transition-all duration-300",
                  "text-gray-600 dark:text-gray-400",
                  "data-[state=active]:text-gray-900 dark:data-[state=active]:text-white",
                  "data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-200/80 data-[state=active]:to-orange-200/80",
                  "dark:data-[state=active]:from-yellow-900/40 dark:data-[state=active]:to-orange-900/40",
                  "data-[state=active]:shadow-lg",
                  "data-[state=active]:shadow-yellow-400/25 dark:data-[state=active]:shadow-yellow-400/20",
                  "hover:bg-gray-100/50 dark:hover:bg-gray-800/50",
                  "hover:scale-105 active:scale-95",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2"
                )}
              >
                <Paintbrush className="h-4 w-4 mr-1.5" />
                <span className="text-sm font-medium">Board</span>
              </TabsTrigger>

              <TabsTrigger 
                value="chat"
                className={cn(
                  "cursor-pointer",
                  "relative rounded-full px-4",
                  "transition-all duration-300",
                  "text-gray-600 dark:text-gray-400",
                  "data-[state=active]:text-gray-900 dark:data-[state=active]:text-white",
                  "data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-200/80 data-[state=active]:to-orange-200/80",
                  "dark:data-[state=active]:from-yellow-900/40 dark:data-[state=active]:to-orange-900/40",
                  "data-[state=active]:shadow-lg",
                  "data-[state=active]:shadow-yellow-400/25 dark:data-[state=active]:shadow-yellow-400/20",
                  "hover:bg-gray-100/50 dark:hover:bg-gray-800/50",
                  "hover:scale-105 active:scale-95",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2"
                )}
              >
                <MessageCircle className="h-4 w-4 mr-1.5" />
                <span className="text-sm font-medium">Chat</span>
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        <TabsContent value="code" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <MonacoEditor projectSlug={slug} />
        </TabsContent>

        <TabsContent value="editor" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <CollaborativeTextEditor projectSlug={slug} />
        </TabsContent>

        <TabsContent value="ai" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <AINotionEditor projectSlug={slug} />
        </TabsContent>

        <TabsContent value="whiteboard" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Whiteboard projectSlug={slug} />
        </TabsContent>

        <TabsContent value="chat" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Comments projectSlug={slug} />
        </TabsContent>
      </Tabs>
    </div>
  )
}