"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Sparkles,
  Rocket,
  Users,
  Target,
  TrendingUp,
  Star,
  ArrowRight,
  Zap,
  Globe,
  Heart,
  Award,
  Bot,
  Mail,
  Phone,
  BarChart3,
  MessageSquare,
  Linkedin,
  PenTool,
  Shield,
} from "lucide-react"

const features = [
  {
    icon: <Rocket className="w-6 h-6" />,
    title: "Launch Faster",
    description: "Turn your ideas into reality with the right team in weeks, not months.",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Find Co-founders",
    description: "Connect with passionate entrepreneurs who share your vision and drive.",
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: "Skill Matching",
    description: "Our AI matches you with people who have the exact skills you need.",
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Scale Together",
    description: "Build sustainable businesses with proven frameworks and mentorship.",
  },
]

const automationServices = [
  {
    icon: <Linkedin className="w-8 h-8" />,
    title: "LinkedIn Lead Generator",
    description: "Automatically find and connect with potential customers, partners, and team members",
    features: ["Auto-connect requests", "Profile scraping", "Lead scoring", "Message templates"],
    price: "$29.99/month",
    category: "Lead Generation",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: <PenTool className="w-8 h-8" />,
    title: "AI Content Writer",
    description: "Generate high-quality blog posts, social media content, and marketing copy",
    features: ["Blog post generation", "Social media posts", "SEO optimization", "Brand voice training"],
    price: "$19.99/month",
    category: "Content Creation",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: <Mail className="w-8 h-8" />,
    title: "Email Campaign Automation",
    description: "Create, send, and track email campaigns with advanced automation",
    features: ["Drag-drop builder", "A/B testing", "Automated sequences", "Analytics"],
    price: "$39.99/month",
    category: "Email Marketing",
    color: "from-green-500 to-green-600",
  },
  {
    icon: <Phone className="w-8 h-8" />,
    title: "Smart Calling Assistant",
    description: "AI-powered calling system for lead qualification and customer support",
    features: ["AI voice calls", "Call scheduling", "Lead qualification", "Call recording"],
    price: "$99.99/month",
    category: "Sales Automation",
    color: "from-red-500 to-red-600",
  },
  {
    icon: <MessageSquare className="w-8 h-8" />,
    title: "Customer Support Bot",
    description: "Intelligent chatbot for 24/7 customer support and lead capture",
    features: ["24/7 chat support", "Lead qualification", "Knowledge base", "Human handoff"],
    price: "$49.99/month",
    category: "Customer Support",
    color: "from-cyan-500 to-cyan-600",
  },
  {
    icon: <BarChart3 className="w-8 h-8" />,
    title: "Analytics Dashboard",
    description: "Comprehensive analytics and reporting for all your business metrics",
    features: ["Real-time dashboards", "Custom reports", "Goal tracking", "Data export"],
    price: "$34.99/month",
    category: "Analytics",
    color: "from-orange-500 to-orange-600",
  },
]

const stats = [
  { number: "500+", label: "Active Projects" },
  { number: "2,000+", label: "Entrepreneurs" },
  { number: "150+", label: "Successful Launches" },
  { number: "95%", label: "Success Rate" },
]

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Founder, EcoTech",
    avatar: "/placeholder-user.jpg",
    content: "Found my perfect co-founder in just 2 weeks. We've raised $500K since launching!",
  },
  {
    name: "Alex Rodriguez",
    role: "CEO, FinanceFlow",
    avatar: "/placeholder-user.jpg",
    content: "The skill matching is incredible. Built our MVP in record time with the right team.",
  },
  {
    name: "Maya Patel",
    role: "CTO, AICreate",
    avatar: "/placeholder-user.jpg",
    content: "Tapri helped me find technical co-founders who truly understood my vision.",
  },
]

const whyChooseUs = [
  {
    icon: <Zap className="w-5 h-5" />,
    title: "Lightning Fast",
    description: "Get matched with potential co-founders in under 24 hours",
  },
  {
    icon: <Globe className="w-5 h-5" />,
    title: "Global Network",
    description: "Access entrepreneurs from 50+ countries worldwide",
  },
  {
    icon: <Heart className="w-5 h-5" />,
    title: "Passion First",
    description: "We match based on passion and vision, not just skills",
  },
  {
    icon: <Award className="w-5 h-5" />,
    title: "Proven Success",
    description: "95% of our matched teams launch their MVP within 6 months",
  },
]

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-yellow-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-yellow-950/20">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center">
            <div
              className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <div className="inline-flex items-center gap-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                Welcome to the Future of Entrepreneurship
              </div>

              <h1 className="text-6xl lg:text-8xl font-black mb-6 leading-tight">
                Build Your
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                  Dream Team
                </span>
              </h1>

              <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
                Connect with passionate entrepreneurs, find your perfect co-founders, and turn your startup ideas into
                reality.
                <span className="font-semibold text-yellow-600">
                  {" "}
                  Join 2,000+ builders already creating the future.
                </span>
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <Link href="/create-project">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold rounded-xl px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-lg"
                  >
                    <Rocket className="w-5 h-5 mr-2" />
                    Start Your Tapri
                  </Button>
                </Link>

                <Link href="/tapris">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm hover:bg-yellow-50 dark:hover:bg-yellow-950/20 rounded-xl px-8 py-4 font-semibold text-lg transition-all duration-300"
                  >
                    Browse Projects
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-yellow-400/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-5xl font-black text-yellow-600 mb-2">{stat.number}</div>
                <div className="text-gray-600 dark:text-gray-300 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Automation Services Section */}
      <section className="py-20 bg-gradient-to-r from-black to-gray-900 text-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-yellow-100/10 text-yellow-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Bot className="w-4 h-4" />
              Secret Sauce for Your Startup
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              Powerful{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                Automations
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Focus on building your product while our AI-powered automations handle lead generation, content creation,
              customer support, and more. Scale your startup without scaling your team.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {automationServices.map((service, index) => (
              <Card
                key={index}
                className="border-0 shadow-xl bg-white/10 backdrop-blur-sm rounded-3xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
              >
                <CardHeader className="text-center pb-4">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center text-white mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300`}
                  >
                    {service.icon}
                  </div>
                  <Badge className="bg-yellow-100/20 text-yellow-300 border-yellow-400/30 rounded-full mb-2">
                    {service.category}
                  </Badge>
                  <CardTitle className="text-xl font-bold text-white group-hover:text-yellow-300 transition-colors">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-300 leading-relaxed mb-4">{service.description}</p>

                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2 text-sm text-gray-400">
                        <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                        {feature}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-yellow-400">{service.price}</span>
                    <Badge variant="outline" className="border-green-400/50 text-green-400">
                      Free Trial
                    </Badge>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-300 mb-6 text-lg">Save 20+ hours per week with our automation suite</p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold rounded-xl px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Shield className="w-5 h-5 mr-2" />
              View All Automations
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Why Entrepreneurs Choose{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                Tapri
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We're not just another platform. We're your launchpad to entrepreneurial success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl flex items-center justify-center text-yellow-600 mx-auto mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-950/20 dark:to-yellow-900/20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              From idea to launch in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl flex items-center justify-center text-black mx-auto mb-4 shadow-lg">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center pt-0">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">Success Stories</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Real entrepreneurs, real results, real impact
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl hover:shadow-xl transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed italic">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                      <AvatarFallback className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 font-semibold">
                        {testimonial.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-black to-gray-900 text-white">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            Ready to Build Something{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
              Amazing?
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            Join thousands of entrepreneurs who are already building the future. Your next co-founder is waiting.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/create-project">
              <Button
                size="lg"
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold rounded-xl px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-lg"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Start Your Journey
              </Button>
            </Link>

            <Link href="/tapris">
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black rounded-xl px-8 py-4 font-semibold text-lg transition-all duration-300 bg-transparent"
              >
                Explore Projects
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
