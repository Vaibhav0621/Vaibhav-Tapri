"use client"

import type React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Coffee, Mail, Phone, MapPin, Github, Twitter, Linkedin, Instagram } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export default function Footer() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleNewsletterSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(event.currentTarget)
    formData.append("access_key", "f3993f73-3c04-4f7b-ad60-630c82bb01cc")

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Success!",
          description: "You've been subscribed to our newsletter!",
        })
        ;(event.target as HTMLFormElement).reset()
      } else {
        toast({
          title: "Error",
          description: "Failed to subscribe. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Coffee className="h-8 w-8 text-yellow-500" />
              <span className="text-2xl font-bold">Tapri</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Brewing brilliance through collaborative learning and skill development. Join our community of creators
              and innovators.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">
                <Github className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-yellow-500">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/tapris" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Browse Tapris
                </Link>
              </li>
              <li>
                <Link href="/create-project" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Create Project
                </Link>
              </li>
              <li>
                <Link href="/courses" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Courses
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-yellow-500">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-white transition-colors text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-yellow-500">Stay Updated</h3>
            <p className="text-gray-300 text-sm">
              Subscribe to our newsletter for the latest updates and opportunities.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <input type="hidden" name="access_key" value="f3993f73-3c04-4f7b-ad60-630c82bb01cc" />
              <input type="hidden" name="subject" value="Footer Newsletter Subscription" />
              <input type="hidden" name="from_name" value="Tapri Footer Newsletter" />
              <label htmlFor="botcheck" className="sr-only">
                Do not check this box (anti-bot)
              </label>
              <input
                type="checkbox"
                id="botcheck"
                name="botcheck"
                className="hidden"
                title="Do not check this box (anti-bot)"
                tabIndex={-1}
                aria-hidden="true"
              />

              <Input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black"
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-300">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-yellow-500" />
              <span>startupworld.online@gmail.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-yellow-500" />
              <span>+91 9119956613</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-yellow-500" />
              <span>Kanpur, Uttar Pradesh, India</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Tapri. All rights reserved. Made with ❤️ for creators and learners.
          </p>
        </div>
      </div>
    </footer>
  )
}
