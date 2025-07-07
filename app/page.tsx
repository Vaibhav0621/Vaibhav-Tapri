import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Users, Target, Lightbulb, Coffee, Zap, Award, Heart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import Logo from "@/components/logo"
import SuccessCounter from "@/components/success-counter"
import { SetupBanner } from "@/components/setup-banner"
import { isSupabaseConfigured } from "@/lib/supabase"

export default function HomePage() {
  const isConfigured = isSupabaseConfigured()
  const user = null // Assuming user is null for this example

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <SetupBanner />

        {/* Hero Section */}
        <div className="relative py-20 text-center bg-gradient-to-br from-yellow-50 via-white to-red-50 rounded-3xl mb-16">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-100/20 to-red-100/20 rounded-3xl"></div>
          <div className="relative z-10">
            <Logo size="lg" className="justify-center mb-8" />
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-600 via-red-500 to-black bg-clip-text text-transparent">
              Where Ideas Meet
              <br />
              Passionate Minds
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Join the ultimate collaboration hub where brilliant minds brew the next big thing. Create projects,
              connect with innovators, and turn your wildest ideas into reality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-yellow-600 to-red-500 hover:from-yellow-700 hover:to-red-600 text-white font-medium text-lg px-8 py-4 shadow-lg"
              >
                <Link href="/create-project">
                  Start Your Tapri <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-yellow-600 text-yellow-700 hover:bg-yellow-50 dark:hover:bg-yellow-950/20 font-medium text-lg px-8 py-4 shadow-lg"
              >
                <Link href="/tapris">Explore Projects</Link>
              </Button>
              {!user && (
                <Button
                  asChild
                  variant="secondary"
                  size="lg"
                  className="bg-white/80 text-gray-800 hover:bg-white font-medium text-lg px-8 py-4 shadow-lg"
                >
                  <Link href="/login">Sign In</Link>
                </Button>
              )}
            </div>

            {/* Success Counter */}
            <SuccessCounter />
          </div>
        </div>
        


        {/* Why Choose Tapri */}
        <div className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-600 to-red-500 bg-clip-text text-transparent">
              Why Choose Tapri?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the future of collaborative innovation with our unique platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="group border-2 border-yellow-200 hover:border-yellow-400 hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-yellow-50 to-white">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-yellow-100 rounded-full w-fit group-hover:scale-110 transition-transform">
                  <Users className="h-8 w-8 text-yellow-600" />
                </div>
                <CardTitle className="text-xl">Connect & Collaborate</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  Find passionate creators who share your vision. Build diverse teams with complementary skills.
                </p>
              </CardContent>
            </Card>

            <Card className="group border-2 border-red-200 hover:border-red-400 hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-red-50 to-white">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-red-100 rounded-full w-fit group-hover:scale-110 transition-transform">
                  <Target className="h-8 w-8 text-red-500" />
                </div>
                <CardTitle className="text-xl">Validate Ideas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  Test concepts with innovators. Get feedback, iterate quickly, and build what people want.
                </p>
              </CardContent>
            </Card>

            <Card className="group border-2 border-green-200 hover:border-green-400 hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-green-50 to-white">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-green-100 rounded-full w-fit group-hover:scale-110 transition-transform">
                  <Lightbulb className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-xl">Learn & Grow</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  Gain real-world experience on exciting projects. Develop skills and build your portfolio.
                </p>
              </CardContent>
            </Card>

            <Card className="group border-2 border-purple-200 hover:border-purple-400 hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-purple-50 to-white">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-purple-100 rounded-full w-fit group-hover:scale-110 transition-transform">
                  <Award className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl">Achieve Success</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  Turn ideas into successful ventures. Get recognized for your contributions and achievements.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Featured Projects with Images */}
        <div className="py-20 bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl">
          <div className="px-8">
            <div className="flex justify-between items-center mb-12">
              <div>
                <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-600 to-red-500 bg-clip-text text-transparent">
                  Featured Tapris
                </h2>
                <p className="text-xl text-gray-600">Discover amazing projects from our community</p>
              </div>
              <Button
                asChild
                variant="outline"
                className="border-2 border-yellow-600 text-yellow-700 hover:bg-yellow-50"
              >
                <Link href="/tapris">
                  View All <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Web Development Project */}
              <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-yellow-300">
                <div className="aspect-video relative overflow-hidden">
                  <Image
                    src="/images/web-development.jpeg"
                    alt="Web Development Project"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <Badge className="absolute top-3 right-3 bg-green-500 text-white">Active</Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">Web Development Bootcamp</CardTitle>
                  <CardDescription>Learn modern web development with React, Node.js, and more</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                    <span>12 members</span>
                    <span>3 open positions</span>
                  </div>
                  <Button asChild className="w-full bg-yellow-600 hover:bg-yellow-700 text-white">
                    <Link href="/tapris/1">Learn More</Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Soft Skills Project */}
              <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-yellow-300">
                <div className="aspect-video relative overflow-hidden">
                  <Image
                    src="/images/soft-skills.jpeg"
                    alt="Soft Skills Development"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <Badge className="absolute top-3 right-3 bg-blue-500 text-white">Starting Soon</Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">Soft Skills Mastery</CardTitle>
                  <CardDescription>Develop essential communication and leadership skills</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                    <span>8 members</span>
                    <span>5 open positions</span>
                  </div>
                  <Button asChild className="w-full bg-yellow-600 hover:bg-yellow-700 text-white">
                    <Link href="/tapris/2">Learn More</Link>
                  </Button>
                </CardContent>
              </Card>

              {/* College Counseling Project */}
              <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-yellow-300">
                <div className="aspect-video relative overflow-hidden">
                  <Image
                    src="/images/college-counseling.jpeg"
                    alt="College Counseling"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <Badge className="absolute top-3 right-3 bg-purple-500 text-white">New</Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">College Counseling Hub</CardTitle>
                  <CardDescription>Get expert guidance for your college journey</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                    <span>15 members</span>
                    <span>2 open positions</span>
                  </div>
                  <Button asChild className="w-full bg-yellow-600 hover:bg-yellow-700 text-white">
                    <Link href="/tapris/3">Learn More</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-20 text-center bg-gradient-to-r from-yellow-600 via-red-500 to-yellow-600 rounded-3xl text-white mt-16">
          <div className="px-8">
            <Coffee className="h-16 w-16 mx-auto mb-6 opacity-90" />
            <h2 className="text-4xl font-bold mb-4">Ready to Brew Something Amazing?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Join thousands of innovators who are already building the future. Your next big idea is just one Tapri
              away.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-yellow-600 hover:bg-gray-100 font-medium text-lg px-8 py-4"
              >
                <Link href="/create-project">
                  Create Your Tapri <Zap className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-white text-white hover:bg-white/10 font-medium text-lg px-8 py-4"
              >
                <Link href="/tapris">
                  Explore Projects <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {!isConfigured && (
          <div className="text-center mt-16 p-8 bg-yellow-50 rounded-2xl border-2 border-yellow-200">
            <Heart className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Demo Mode Active</h3>
            <p className="text-gray-600">
              You're viewing demo data. Connect your Supabase database to unlock the full Tapri experience with real
              projects and users.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
