import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, Sparkles } from "lucide-react"
import Logo from "./logo"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-50 via-white to-yellow-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-yellow-950/20 border-t border-gray-200/50 dark:border-gray-800/50">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <Logo />
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Connect, create, and collaborate on innovative projects. Join the Tapri community and transform your ideas
              into reality with like-minded entrepreneurs.
            </p>
            <div className="flex space-x-3">
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-xl hover:bg-yellow-50 dark:hover:bg-yellow-950/20 transition-all"
              >
                <Facebook className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-xl hover:bg-yellow-50 dark:hover:bg-yellow-950/20 transition-all"
              >
                <Twitter className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-xl hover:bg-yellow-50 dark:hover:bg-yellow-950/20 transition-all"
              >
                <Instagram className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-xl hover:bg-yellow-50 dark:hover:bg-yellow-950/20 transition-all"
              >
                <Linkedin className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Quick Links</h3>
            <div className="space-y-3">
              <Link
                href="/tapris"
                className="block text-gray-600 dark:text-gray-300 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors font-medium"
              >
                Browse Tapris
              </Link>
              <Link
                href="/talents"
                className="block text-gray-600 dark:text-gray-300 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors font-medium"
              >
                Browse Talents
              </Link>
              <Link
                href="/courses"
                className="block text-gray-600 dark:text-gray-300 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors font-medium"
              >
                Secret Sauce
              </Link>
              <Link
                href="/about"
                className="block text-gray-600 dark:text-gray-300 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors font-medium"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="block text-gray-600 dark:text-gray-300 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors font-medium"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Support</h3>
            <div className="space-y-3">
              <Link
                href="/help"
                className="block text-gray-600 dark:text-gray-300 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors font-medium"
              >
                Help Center
              </Link>
              <Link
                href="/privacy"
                className="block text-gray-600 dark:text-gray-300 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors font-medium"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="block text-gray-600 dark:text-gray-300 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors font-medium"
              >
                Terms of Service
              </Link>
              <Link
                href="/faq"
                className="block text-gray-600 dark:text-gray-300 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors font-medium"
              >
                FAQ
              </Link>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Stay Updated</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Subscribe to our newsletter for the latest startup opportunities and entrepreneurship tips.
            </p>
            <div className="space-y-3">
              <Input
                placeholder="Enter your email"
                type="email"
                className="rounded-xl border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
              />
              <Button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-semibold rounded-xl py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <Sparkles className="w-4 h-4 mr-2" />
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-12 bg-gray-200 dark:bg-gray-700" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8 text-gray-600 dark:text-gray-300">
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-yellow-600" />
              <span className="font-medium">hello@tapri.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-yellow-600" />
              <span className="font-medium">+1 (555) 123-4567</span>
            </div>
          </div>
          <p className="text-gray-500 dark:text-gray-400 font-medium">
            © 2024 Tapri. All rights reserved. Built for entrepreneurs, by entrepreneurs.
          </p>
        </div>
      </div>
    </footer>
  )
}
