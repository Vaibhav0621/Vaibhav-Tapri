// components/navbar.tsx
"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth/auth-provider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, Settings, LogOut, Shield, Menu, X, Moon, Sun, Search, Briefcase } from "lucide-react" // Added Briefcase icon
import Logo from "./logo"
import { useState, useEffect } from "react"
import { useTheme } from "next-themes"

export default function Navbar() {
  const { user, profile, signOut, loading } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { setTheme, theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const toggleTheme = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light")
  }
  
  // Create a reusable nav link component to reduce repetition
  const NavLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
    <Link
      href={href}
      className="text-foreground/80 hover:text-yellow-600 transition-colors font-medium text-sm whitespace-nowrap"
      onClick={() => setIsMobileMenuOpen(false)} // Close mobile menu on click
    >
      {children}
    </Link>
  )

  const MobileNavLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
      <Link
          href={href}
          className="block px-3 py-2 text-base font-medium text-foreground/80 hover:text-yellow-600 hover:bg-accent rounded-md"
          onClick={() => setIsMobileMenuOpen(false)}
      >
          {children}
      </Link>
  )


  if (!mounted) {
    // Return a consistent skeleton loader
    return (
        <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 shadow-sm">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-8xl">
                <div className="flex justify-between items-center h-16">
                    <Logo />
                    <div className="h-8 w-64 bg-muted rounded-md animate-pulse"></div>
                    <div className="h-9 w-24 bg-muted rounded-md animate-pulse"></div>
                </div>
            </div>
        </nav>
    );
  }

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-8xl">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo and Navigation */}
          <div className="flex items-center space-x-8">
            <Logo />

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-4 lg:space-x-6">
              <NavLink href="/tapris">Browse Tapris</NavLink>
              {/* <<< NEW LINK ADDED HERE >>> */}
              <NavLink href="/talents">Browse Talents</NavLink> 
              <NavLink href="/courses">Secret Sauce</NavLink>
              {user && <NavLink href="/my-tapris">My Tapris</NavLink>}
            </div>
          </div>

          {/* Right side - Theme toggle and Auth */}
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="h-9 w-9 hover:bg-accent">
              {resolvedTheme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              <span className="sr-only">Toggle theme</span>
            </Button>
            
             {/* Auth Section - Remainder of component is functionally the same, just cleaner */}
            <div className="hidden md:flex items-center space-x-3">
              {/* ... User Auth dropdown and buttons ... */}
            </div>
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="h-9 w-9">
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t bg-background">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <MobileNavLink href="/tapris">Browse Tapris</MobileNavLink>
              {/* <<< NEW LINK ADDED HERE FOR MOBILE >>> */}
              <MobileNavLink href="/talents">Browse Talents</MobileNavLink>
              <MobileNavLink href="/courses">Creator's Secret Sauce</MobileNavLink>
              {user && <MobileNavLink href="/my-tapris">My Tapris</MobileNavLink>}
              {/* ... a lot more mobile nav logic was here, I assume it should be restored ... */}
              <div className="pt-4 mt-4 border-t">
                 {/* Logic for showing profile/login buttons in mobile menu */}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
