import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone } from "lucide-react"
import Logo from "./logo"

export default function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Logo />
            <p className="text-sm text-muted-foreground">
              Connect, create, and collaborate on innovative projects. Join the Tapri community and transform your ideas
              into reality.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Linkedin className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <Link
                href="/tapris"
                className="block text-sm text-muted-foreground hover:text-yellow-600 transition-colors"
              >
                Browse Tapris
              </Link>
              <Link
                href="/talents"
                className="block text-sm text-muted-foreground hover:text-yellow-600 transition-colors"
              >
                Browse Talents
              </Link>
              <Link
                href="/courses"
                className="block text-sm text-muted-foreground hover:text-yellow-600 transition-colors"
              >
                Secret Sauce
              </Link>
              <Link
                href="/about"
                className="block text-sm text-muted-foreground hover:text-yellow-600 transition-colors"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="block text-sm text-muted-foreground hover:text-yellow-600 transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Support</h3>
            <div className="space-y-2">
              <Link
                href="/help"
                className="block text-sm text-muted-foreground hover:text-yellow-600 transition-colors"
              >
                Help Center
              </Link>
              <Link
                href="/privacy"
                className="block text-sm text-muted-foreground hover:text-yellow-600 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="block text-sm text-muted-foreground hover:text-yellow-600 transition-colors"
              >
                Terms of Service
              </Link>
              <Link href="/faq" className="block text-sm text-muted-foreground hover:text-yellow-600 transition-colors">
                FAQ
              </Link>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Stay Updated</h3>
            <p className="text-sm text-muted-foreground">
              Subscribe to our newsletter for the latest updates and opportunities.
            </p>
            <div className="space-y-2">
              <Input placeholder="Enter your email" type="email" />
              <Button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white">Subscribe</Button>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Mail className="h-4 w-4" />
              <span>hello@tapri.com</span>
            </div>
            <div className="flex items-center space-x-1">
              <Phone className="h-4 w-4" />
              <span>+1 (555) 123-4567</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">© 2024 Tapri. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
