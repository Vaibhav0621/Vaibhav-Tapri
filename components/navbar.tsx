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
import { User, Settings, LogOut, Shield, Menu, X, Moon, Sun } from "lucide-react"
import Logo from "./logo"
import { useState, useEffect } from "react"
import { useTheme } from "next-themes"

export default function Navbar() {
  const { user, profile, signOut, loading } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { setTheme, theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light")
  }

  if (!mounted) {
    return (
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Logo />
            <div className="w-32 h-8 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </nav>
    )
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
              <Link
                href="/tapris"
                className="text-foreground/80 hover:text-yellow-600 transition-colors font-medium text-sm whitespace-nowrap"
              >
                Browse Tapris
              </Link>
              <Link
                href="/talents"
                className="text-foreground/80 hover:text-yellow-600 transition-colors font-medium text-sm whitespace-nowrap"
              >
                Browse Talents
              </Link>
              <Link
                href="/courses"
                className="text-foreground/80 hover:text-yellow-600 transition-colors font-medium text-sm whitespace-nowrap"
              >
                Secret Sauce
              </Link>
              {user && (
                <Link
                  href="/my-tapris"
                  className="text-foreground/80 hover:text-yellow-600 transition-colors font-medium text-sm whitespace-nowrap"
                >
                  My Tapris
                </Link>
              )}
              <Link
                href="/about"
                className="text-foreground/80 hover:text-yellow-600 transition-colors font-medium text-sm whitespace-nowrap"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-foreground/80 hover:text-yellow-600 transition-colors font-medium text-sm whitespace-nowrap"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Right side - Theme toggle and Auth */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="h-9 w-9 hover:bg-accent">
              {resolvedTheme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* Desktop Auth Section */}
            <div className="hidden md:flex items-center space-x-3">
              {loading ? (
                <div className="w-8 h-8 bg-muted rounded-full animate-pulse" />
              ) : user ? (
                <>
                  <Link href="/create-project">
                    <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700 text-white font-medium">
                      Create Tapri
                    </Button>
                  </Link>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={profile?.avatar_url || ""} alt={profile?.full_name || ""} />
                          <AvatarFallback className="bg-yellow-100 text-yellow-700 font-medium text-sm">
                            {profile?.full_name?.charAt(0) || user.email?.charAt(0) || "U"}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                      <div className="flex items-center justify-start gap-2 p-2">
                        <div className="flex flex-col space-y-1 leading-none">
                          <p className="font-medium text-sm">{profile?.full_name || "User"}</p>
                          <p className="w-[200px] truncate text-xs text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/profile" className="flex items-center">
                          <User className="mr-2 h-4 w-4" />
                          Profile
                        </Link>
                      </DropdownMenuItem>
                      {profile?.is_admin && (
                        <DropdownMenuItem asChild>
                          <Link href="/admin" className="flex items-center">
                            <Shield className="mr-2 h-4 w-4" />
                            Admin Panel
                          </Link>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem asChild>
                        <Link href="/settings" className="flex items-center">
                          <Settings className="mr-2 h-4 w-4" />
                          Settings
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={signOut} className="flex items-center">
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link href="/login">
                    <Button variant="ghost" size="sm" className="font-medium">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700 text-white font-medium">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="h-9 w-9"
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t bg-background">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/tapris"
                className="block px-3 py-2 text-base font-medium text-foreground/80 hover:text-yellow-600 hover:bg-accent rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Browse Tapris
              </Link>
              <Link
                href="/talents"
                className="block px-3 py-2 text-base font-medium text-foreground/80 hover:text-yellow-600 hover:bg-accent rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Browse Talents
              </Link>
              <Link
                href="/courses"
                className="block px-3 py-2 text-base font-medium text-foreground/80 hover:text-yellow-600 hover:bg-accent rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Creator's Secret Sauce
              </Link>
              {user && (
                <Link
                  href="/my-tapris"
                  className="block px-3 py-2 text-base font-medium text-foreground/80 hover:text-yellow-600 hover:bg-accent rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  My Tapris
                </Link>
              )}
              <Link
                href="/about"
                className="block px-3 py-2 text-base font-medium text-foreground/80 hover:text-yellow-600 hover:bg-accent rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="block px-3 py-2 text-base font-medium text-foreground/80 hover:text-yellow-600 hover:bg-accent rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact Us
              </Link>

              {user ? (
                <div className="pt-4 border-t space-y-2">
                  <Link href="/create-project" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-medium">
                      Create Tapri
                    </Button>
                  </Link>
                  <div className="px-3 py-2">
                    <p className="text-sm font-medium">{profile?.full_name || "User"}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                  <Link
                    href="/profile"
                    className="block px-3 py-2 text-base font-medium text-foreground/80 hover:text-yellow-600 hover:bg-accent rounded-md"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  {profile?.is_admin && (
                    <Link
                      href="/admin"
                      className="block px-3 py-2 text-base font-medium text-foreground/80 hover:text-yellow-600 hover:bg-accent rounded-md"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      signOut()
                      setIsMobileMenuOpen(false)
                    }}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:bg-red-50 rounded-md"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="pt-4 border-t space-y-2">
                  <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full font-medium bg-transparent">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-medium">Sign Up</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
