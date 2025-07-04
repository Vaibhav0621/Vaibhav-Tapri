"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { motion } from "framer-motion"

interface HeaderProps {
  tapri: {
    id: string
    siteName: string
    title: string
    logoImage: string
    category: string
  }
  primaryColor: string
}

export function Header({ tapri, primaryColor }: HeaderProps) {
  const [activeSection, setActiveSection] = useState("overview")

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["overview", "about", "services", "team", "roles", "roadmap", "gallery", "testimonials", "contact"]
      const current = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (current) setActiveSection(current)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { id: "overview", label: "Overview", emoji: "🌟" },
    { id: "about", label: "About", emoji: "🫶" },
    { id: "services", label: "Services", emoji: "🔥" },
    { id: "team", label: "Team", emoji: "😎" },
    { id: "roles", label: "Roles", emoji: "💼" },
    { id: "roadmap", label: "Roadmap", emoji: "🚀" },
    { id: "gallery", label: "Gallery", emoji: "📸" },
    { id: "testimonials", label: "Hype", emoji: "🗣️" },
    { id: "contact", label: "Contact", emoji: "📩" },
  ]

  return (
    <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-md border-b border-gray-800 shadow-lg">
      <div className="container px-4 md:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <motion.div
            className="relative h-12 w-12 rounded-full border-4 border-gray-700"
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            <Image src={tapri.logoImage} alt={`${tapri.title} logo`} fill className="object-cover rounded-full" />
          </motion.div>
          <h1 className={`text-2xl md:text-3xl font-bold text-${primaryColor}-400`}>{tapri.title}</h1>
        </div>
        <nav className="flex items-center gap-4 overflow-x-auto whitespace-nowrap scrollbar-hidden">
          {navLinks.map((link) => (
            <motion.div key={link.id} whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
              <Link
                href={`#${link.id}`}
                className={`text-sm font-semibold transition-colors flex items-center gap-1 ${
                  activeSection === link.id
                    ? `text-${primaryColor}-400 border-b-4 border-${primaryColor}-400`
                    : `text-gray-300 hover:text-${primaryColor}-400`
                }`}
              >
                {link.label} {link.emoji}
              </Link>
            </motion.div>
          ))}
          <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
            <Link href="#contact">
              <Button
                className={`bg-${primaryColor}-600 hover:bg-${primaryColor}-700 text-white px-6 py-2 rounded-full shadow-md transform transition-transform`}
              >
                Join Now 🎉
              </Button>
            </Link>
          </motion.div>
        </nav>
      </div>
    </header>
  )
}
