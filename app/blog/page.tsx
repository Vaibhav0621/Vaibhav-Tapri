"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Clock, User, TrendingUp, BookOpen, Users, Eye, ArrowRight, Filter, Star } from "lucide-react"

const featuredArticles = [
  {
    id: 1,
    title: "The Future of Student Entrepreneurship: How Gen Z is Changing the Game",
    excerpt:
      "Discover how the new generation of entrepreneurs is leveraging technology and social impact to build the next wave of successful startups.",
    author: {
      name: "Priya Sharma",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Startup Mentor",
    },
    category: "Entrepreneurship",
    readTime: "8 min read",
    publishedAt: "2024-01-15",
    image: "/placeholder.svg?height=300&width=600",
    featured: true,
    views: 2400,
    likes: 156,
  },
  {
    id: 2,
    title: "Building Your First MVP: A Complete Guide for Student Founders",
    excerpt:
      "Step-by-step guide to building your minimum viable product without breaking the bank or your academic schedule.",
    author: {
      name: "Rahul Gupta",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Tech Founder",
    },
    category: "Product Development",
    readTime: "12 min read",
    publishedAt: "2024-01-12",
    image: "/placeholder.svg?height=300&width=600",
    featured: true,
    views: 1800,
    likes: 124,
  },
]

const articles = [
  {
    id: 3,
    title: "Funding Your Startup: Beyond Traditional VCs",
    excerpt:
      "Explore alternative funding options including grants, competitions, and crowdfunding platforms specifically for student entrepreneurs.",
    author: {
      name: "Anita Desai",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Investment Advisor",
    },
    category: "Funding",
    readTime: "6 min read",
    publishedAt: "2024-01-10",
    image: "/placeholder.svg?height=200&width=400",
    views: 1200,
    likes: 89,
  },
  {
    id: 4,
    title: "The Art of Networking: Building Meaningful Connections in College",
    excerpt:
      "Learn how to build a strong professional network while still in college that will benefit your entrepreneurial journey.",
    author: {
      name: "Vikram Singh",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Business Coach",
    },
    category: "Networking",
    readTime: "5 min read",
    publishedAt: "2024-01-08",
    image: "/placeholder.svg?height=200&width=400",
    views: 950,
    likes: 67,
  },
  {
    id: 5,
    title: "Balancing Academics and Entrepreneurship: Time Management Tips",
    excerpt:
      "Practical strategies to manage your startup while maintaining good grades and a healthy work-life balance.",
    author: {
      name: "Sneha Patel",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Student Entrepreneur",
    },
    category: "Productivity",
    readTime: "7 min read",
    publishedAt: "2024-01-05",
    image: "/placeholder.svg?height=200&width=400",
    views: 1500,
    likes: 112,
  },
  {
    id: 6,
    title: "Tech Stack Decisions: Choosing the Right Tools for Your Startup",
    excerpt:
      "A comprehensive guide to selecting the best technology stack for your startup based on your team's skills and project requirements.",
    author: {
      name: "Arjun Mehta",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "CTO & Advisor",
    },
    category: "Technology",
    readTime: "10 min read",
    publishedAt: "2024-01-03",
    image: "/placeholder.svg?height=200&width=400",
    views: 2100,
    likes: 178,
  },
]

const categories = [
  "All",
  "Entrepreneurship",
  "Product Development",
  "Funding",
  "Networking",
  "Productivity",
  "Technology",
]

const stats = [
  { label: "Total Articles", value: "150+", icon: BookOpen },
  { label: "Monthly Readers", value: "25K+", icon: Users },
  { label: "Expert Authors", value: "50+", icon: User },
  { label: "Success Stories", value: "200+", icon: TrendingUp },
]

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || article.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-orange-400/10" />
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium mb-6">
            <BookOpen className="w-4 h-4 mr-2" />
            Tapri Knowledge Hub
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Learn from the{" "}
            <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
              Best Minds
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Discover insights, strategies, and stories from successful entrepreneurs, industry experts, and fellow
            student founders building the future.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search articles, topics, or authors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg border-2 border-yellow-200 focus:border-yellow-400 rounded-2xl bg-white/80 backdrop-blur-sm"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-100 text-yellow-600 rounded-xl mb-3">
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Featured Articles</h2>
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
              <Star className="w-4 h-4 mr-1" />
              Editor's Choice
            </Badge>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {featuredArticles.map((article) => (
              <Card
                key={article.id}
                className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-yellow-500 text-black font-medium">{article.category}</Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-yellow-600 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{article.excerpt}</p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={article.author.avatar || "/placeholder.svg"} alt={article.author.name} />
                        <AvatarFallback>{article.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{article.author.name}</p>
                        <p className="text-xs text-gray-500">{article.author.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {article.views}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {article.readTime}
                      </div>
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-medium group">
                    Read Article
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">All Articles</h2>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-500">Filter by category</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={
                  selectedCategory === category
                    ? "bg-yellow-500 text-black hover:bg-yellow-600"
                    : "border-yellow-200 text-gray-700 hover:bg-yellow-50"
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <Card
                key={article.id}
                className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant="secondary" className="bg-white/90 text-gray-700 text-xs">
                      {article.category}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{article.excerpt}</p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={article.author.avatar || "/placeholder.svg"} alt={article.author.name} />
                        <AvatarFallback className="text-xs">{article.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-xs font-medium text-gray-900">{article.author.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 text-xs text-gray-500">
                      <div className="flex items-center">
                        <Eye className="w-3 h-3 mr-1" />
                        {article.views}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {article.readTime}
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-yellow-200 text-gray-700 hover:bg-yellow-50 hover:border-yellow-300 bg-transparent"
                  >
                    Read More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-yellow-400 to-orange-400">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Stay Updated with Tapri Insights</h2>
          <p className="text-lg text-black/80 mb-8">
            Get the latest articles, startup tips, and exclusive content delivered to your inbox weekly.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-white/90 border-0 text-gray-900 placeholder:text-gray-500"
            />
            <Button className="bg-black text-white hover:bg-gray-800 px-8">Subscribe</Button>
          </div>

          <p className="text-sm text-black/70 mt-4">
            Join 10,000+ entrepreneurs already subscribed. Unsubscribe anytime.
          </p>
        </div>
      </section>
    </div>
  )
}
