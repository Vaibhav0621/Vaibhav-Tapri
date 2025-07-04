"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Bot,
  Zap,
  Clock,
  TrendingUp,
  Users,
  DollarSign,
  CheckCircle,
  ArrowRight,
  Search,
  Filter,
  Star,
  Linkedin,
  Mail,
  MessageSquare,
  BarChart3,
  Globe,
  Smartphone,
} from "lucide-react"

const automationServices = [
  {
    id: 1,
    title: "LinkedIn Lead Generation",
    description:
      "Automated LinkedIn outreach and lead generation system that finds and connects with your ideal prospects.",
    icon: Linkedin,
    category: "Lead Generation",
    price: "₹15,000/month",
    features: [
      "Automated connection requests",
      "Personalized messaging sequences",
      "Lead scoring and qualification",
      "CRM integration",
      "Performance analytics",
    ],
    stats: {
      leads: "500+",
      conversion: "15%",
      time_saved: "20hrs/week",
    },
    popular: true,
  },
  {
    id: 2,
    title: "AI Content Writing Assistant",
    description: "Generate high-quality blog posts, social media content, and marketing copy using advanced AI.",
    icon: MessageSquare,
    category: "Content Creation",
    price: "₹8,000/month",
    features: [
      "Blog post generation",
      "Social media content",
      "Email marketing copy",
      "SEO optimization",
      "Brand voice consistency",
    ],
    stats: {
      content: "100+",
      quality: "95%",
      time_saved: "15hrs/week",
    },
    popular: false,
  },
  {
    id: 3,
    title: "Email Marketing Automation",
    description: "Complete email marketing automation with drip campaigns, segmentation, and performance tracking.",
    icon: Mail,
    category: "Email Marketing",
    price: "₹12,000/month",
    features: [
      "Drip campaign setup",
      "List segmentation",
      "A/B testing",
      "Performance analytics",
      "Integration with CRM",
    ],
    stats: {
      emails: "10K+",
      open_rate: "35%",
      conversion: "8%",
    },
    popular: false,
  },
  {
    id: 4,
    title: "Social Media Management",
    description: "Automated social media posting, engagement, and analytics across all major platforms.",
    icon: Smartphone,
    category: "Social Media",
    price: "₹10,000/month",
    features: [
      "Multi-platform posting",
      "Content scheduling",
      "Engagement automation",
      "Hashtag optimization",
      "Analytics dashboard",
    ],
    stats: {
      posts: "200+",
      engagement: "25%",
      followers: "1K+",
    },
    popular: false,
  },
  {
    id: 5,
    title: "Data Analytics & Reporting",
    description: "Automated data collection, analysis, and reporting for business intelligence and decision making.",
    icon: BarChart3,
    category: "Analytics",
    price: "₹18,000/month",
    features: [
      "Data collection automation",
      "Custom dashboards",
      "Automated reporting",
      "Predictive analytics",
      "Real-time monitoring",
    ],
    stats: {
      reports: "50+",
      accuracy: "98%",
      insights: "Daily",
    },
    popular: false,
  },
  {
    id: 6,
    title: "Website & SEO Automation",
    description: "Automated website optimization, SEO monitoring, and performance improvements.",
    icon: Globe,
    category: "SEO & Web",
    price: "₹14,000/month",
    features: [
      "SEO monitoring",
      "Content optimization",
      "Technical SEO fixes",
      "Competitor analysis",
      "Performance tracking",
    ],
    stats: {
      keywords: "500+",
      traffic: "+150%",
      ranking: "Top 10",
    },
    popular: false,
  },
]

const categories = [
  "All",
  "Lead Generation",
  "Content Creation",
  "Email Marketing",
  "Social Media",
  "Analytics",
  "SEO & Web",
]

const stats = [
  { label: "Businesses Automated", value: "500+", icon: Users },
  { label: "Hours Saved Monthly", value: "10K+", icon: Clock },
  { label: "Revenue Generated", value: "₹2Cr+", icon: DollarSign },
  { label: "Success Rate", value: "95%", icon: TrendingUp },
]

const howItWorks = [
  {
    step: 1,
    title: "Consultation",
    description: "We analyze your business needs and identify automation opportunities.",
  },
  {
    step: 2,
    title: "Custom Setup",
    description: "Our experts build and configure automation systems tailored to your requirements.",
  },
  {
    step: 3,
    title: "Testing & Launch",
    description: "We thoroughly test the automation and launch it with full monitoring.",
  },
  {
    step: 4,
    title: "Optimization",
    description: "Continuous monitoring and optimization to maximize results and ROI.",
  },
]

export default function AutomationsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredServices = automationServices.filter((service) => {
    const matchesSearch =
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || service.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-orange-400/10" />
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium mb-6">
            <Bot className="w-4 h-4 mr-2" />
            Automation Services
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Automate Your{" "}
            <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
              Business Growth
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Scale your startup with intelligent automation solutions. From lead generation to content creation, we
            handle the repetitive tasks so you can focus on what matters most.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search automation services..."
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

      {/* Category Filter */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Our Services</h2>
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

      {/* Services Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => (
              <Card
                key={service.id}
                className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm overflow-hidden relative"
              >
                {service.popular && (
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className="bg-yellow-500 text-black font-medium">
                      <Star className="w-3 h-3 mr-1" />
                      Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-3 bg-yellow-100 text-yellow-600 rounded-xl">
                      <service.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <Badge variant="secondary" className="text-xs">
                        {service.category}
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="text-xl group-hover:text-yellow-600 transition-colors">
                    {service.title}
                  </CardTitle>
                  <p className="text-gray-600 text-sm">{service.description}</p>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="mb-6">
                    <div className="text-2xl font-bold text-gray-900 mb-4">{service.price}</div>

                    <div className="grid grid-cols-3 gap-4 mb-6">
                      {Object.entries(service.stats).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <div className="text-lg font-bold text-yellow-600">{value}</div>
                          <div className="text-xs text-gray-500 capitalize">{key.replace("_", " ")}</div>
                        </div>
                      ))}
                    </div>

                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-medium group">
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredServices.length === 0 && (
            <div className="text-center py-12">
              <Bot className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">No services found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our proven 4-step process ensures seamless automation implementation and maximum ROI.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <div key={step.step} className="text-center relative">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold text-xl rounded-full mb-6">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>

                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full">
                    <ArrowRight className="w-6 h-6 text-yellow-400 mx-auto" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-yellow-400 to-orange-400">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Ready to Automate Your Success?</h2>
          <p className="text-lg text-black/80 mb-8">
            Join 500+ businesses that have transformed their operations with our automation solutions. Get a free
            consultation and custom automation strategy.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-black text-white hover:bg-gray-800 px-8">
              <Zap className="w-5 h-5 mr-2" />
              Get Free Consultation
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-black text-black hover:bg-black/10 px-8 bg-transparent"
            >
              View Case Studies
            </Button>
          </div>

          <p className="text-sm text-black/70 mt-6">No setup fees • 30-day money-back guarantee • 24/7 support</p>
        </div>
      </section>
    </div>
  )
}
