"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  BookOpen,
  Users,
  Target,
  Lightbulb,
  Code,
  Briefcase,
  Heart,
  Zap,
  Award,
  Coffee,
  MessageCircle,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Star,
  Send,
  ExternalLink,
} from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

const services = [
  {
    id: 1,
    title: "Build Cool Products",
    description: "Need a killer product but lack the tech expertise? We design and develop innovative products from idea to launch.",
    icon: Code,
    color: "bg-blue-500",
    benefits: ["Custom Product Design", "Rapid Prototyping", "User-Centric Development", "Launch Support"],
    type: "Technical [t]",
  },
  {
    id: 2,
    title: "Code Like a Pro",
    description: "Struggling with software development? Our expert engineers build robust, scalable code for your startup.",
    icon: Code,
    color: "bg-indigo-500",
    benefits: ["Full-Stack Solutions", "API Integration", "Database Optimization", "DevOps Setup"],
    type: "Technical [t]",
  },
  {
    id: 3,
    title: "Uncover Data Insights",
    description: "No data team? We analyze your data to uncover trends and insights to drive smarter decisions.",
    icon: Target,
    color: "bg-green-500",
    benefits: ["Data Analysis", "Custom Dashboards", "Predictive Insights", "Actionable Reports"],
    type: "Technical [t]",
  },
  {
    id: 4,
    title: "Design Awesome Interfaces",
    description: "Want a standout user experience? We craft intuitive, beautiful UI/UX designs that keep users coming back.",
    icon: Lightbulb,
    color: "bg-purple-500",
    benefits: ["UI/UX Design", "User Research", "Interactive Prototypes", "Branding Integration"],
    type: "Technical [t]",
  },
  {
    id: 5,
    title: "Architect Scalable Systems",
    description: "Scaling issues? We design robust tech architectures to ensure your startup grows seamlessly.",
    icon: Briefcase,
    color: "bg-teal-500",
    benefits: ["Cloud Architecture", "Microservices", "Performance Optimization", "Scalability Planning"],
    type: "Technical [t]",
  },
  {
    id: 6,
    title: "Prototype Tech Ideas",
    description: "Need to test an idea fast? We build working prototypes to validate your vision and impress stakeholders.",
    icon: Zap,
    color: "bg-yellow-500",
    benefits: ["Rapid MVP Development", "Proof of Concept", "Iterative Testing", "Stakeholder Demos"],
    type: "Technical [t]",
  },
  {
    id: 7,
    title: "Craft Compelling Visions",
    description: "Can’t articulate your vision? We create inspiring stories to rally your team and captivate investors.",
    icon: MessageCircle,
    color: "bg-red-500",
    benefits: ["Storytelling Strategy", "Brand Narrative", "Investor Pitches", "Team Alignment"],
    type: "Non-Technical [n]",
  },
  {
    id: 8,
    title: "Understand Your Customers",
    description: "Not sure what your customers want? We conduct deep research to align your product with market needs.",
    icon: Users,
    color: "bg-pink-500",
    benefits: ["Customer Interviews", "Market Analysis", "User Personas", "Feedback Integration"],
    type: "Non-Technical [n]",
  },
  {
    id: 9,
    title: "Close Deals & Partnerships",
    description: "Need to grow your network? We help you land sales and build strategic partnerships to fuel growth.",
    icon: Briefcase,
    color: "bg-orange-500",
    benefits: ["Sales Strategy", "Partnership Outreach", "Negotiation Support", "CRM Setup"],
    type: "Non-Technical [n]",
  },
  {
    id: 10,
    title: "Grow Your Audience",
    description: "Struggling to get traction? Our growth marketing strategies attract and retain your ideal customers.",
    icon: TrendingUp,
    color: "bg-cyan-500",
    benefits: ["Social Media Campaigns", "SEO Optimization", "Content Marketing", "Growth Analytics"],
    type: "Non-Technical [n]",
  },
  {
    id: 11,
    title: "Run Smooth Operations",
    description: "Operations a mess? We streamline processes and execution to keep your startup running like clockwork.",
    icon: Award,
    color: "bg-emerald-500",
    benefits: ["Process Optimization", "Project Management", "Team Coordination", "Efficiency Boost"],
    type: "Non-Technical [n]",
  },
  {
    id: 12,
    title: "Pitch & Raise Funds",
    description: "Need funding to grow? We craft winning pitches and strategies to secure investment for your startup.",
    icon: Star,
    color: "bg-violet-500",
    benefits: ["Pitch Deck Creation", "Investor Outreach", "Funding Strategy", "Valuation Guidance"],
    type: "Non-Technical [n]",
  },
]

export default function StartupSupportPage() {
  const [selectedServices, setSelectedServices] = useState<number[]>([])
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    experience: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleServiceToggle = (serviceId: number) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId) ? prev.filter((id) => id !== serviceId) : [...prev, serviceId],
    )
  }

  const scrollToForm = () => {
    document.getElementById("service-form")?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formDataToSend = new FormData()
      formDataToSend.append("access_key", "f3993f73-3c04-4f7b-ad60-630c82bb01cc")
      formDataToSend.append("subject", "New Startup Support Inquiry")
      formDataToSend.append("from_name", "Tapri Startup Support")

      // Add all form fields
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value)
      })

      // Add selected services
      const selectedServiceNames = selectedServices
        .map((id) => services.find((s) => s.id === id)?.title)
        .filter(Boolean)
        .join(", ")

      formDataToSend.append("selected_services", selectedServiceNames)

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataToSend,
      })

      const result = await response.json()

      if (result.success) {
        toast.success("Thank you for your inquiry! We'll contact you within 24 hours to discuss your startup needs.")
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
          experience: "",
        })
        setSelectedServices([])
      } else {
        toast.error("Failed to submit the form. Please try again.")
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.")
      console.error("Form submission error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50/50 via-white to-red-50/50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Coffee className="h-4 w-4" />
            Your Startup's Missing Piece
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-600 via-red-500 to-purple-600 bg-clip-text text-transparent">
            Complete Your Startup Puzzle
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            We’re here to fill the gaps in your startup. Whether you need technical expertise or business strategy, our specialized services help you build, grow, and succeed.
          </p>
        </div>

        {/* How We Help Section */}
        <div className="mb-20 bg-card rounded-3xl p-8 shadow-lg border">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 bg-gradient-to-r from-yellow-600 to-red-500 bg-clip-text text-transparent">
            How We Fill Your Gaps
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">1. Identify Your Needs</h3>
              <p className="text-muted-foreground">
                Tell us your startup’s challenges, and we’ll match you with the perfect technical or non-technical support.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">2. Expert Execution</h3>
              <p className="text-muted-foreground">
                Our industry pros jump in to deliver high-quality solutions, from coding to pitching, tailored to your goals.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">3. Accelerate Success</h3>
              <p className="text-muted-foreground">
                Watch your startup thrive with our support, driving growth, investment, and market-ready solutions.
              </p>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-20">
          {services.map((service) => {
            const IconComponent = service.icon
            return (
              <Card
                key={service.id}
                className="group hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-yellow-300 dark:hover:border-yellow-600 bg-card/80 backdrop-blur-sm"
              >
                <CardHeader className="text-center pb-4">
                  <div
                    className={`w-16 h-16 ${service.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-lg mb-2">{service.title}</CardTitle>
                  <Badge variant="secondary" className="text-xs mb-3">
                    {service.type}
                  </Badge>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-center mb-4 text-sm">{service.description}</CardDescription>
                  <div className="space-y-2 mb-6">
                    <p className="text-sm font-semibold text-center">What You Get:</p>
                    {service.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                        <span className="text-muted-foreground">{benefit}</span>
                      </div>
                    ))}
                  </div>
                  <Button
                    onClick={scrollToForm}
                    className="w-full bg-gradient-to-r from-yellow-600 to-red-500 hover:from-yellow-700 hover:to-red-600 text-white"
                  >
                    Fill This Gap <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Service Selection Form */}
        <div id="service-form" className="bg-card rounded-3xl p-8 shadow-xl border">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-yellow-600 to-red-500 bg-clip-text text-transparent">
              Let’s Complete Your Startup
            </h2>
            <p className="text-muted-foreground text-lg">
              Select the support you need, and we’ll craft a tailored plan to fill your startup’s gaps.
            </p>
          </div>

          {/* Built-in Form */}
          <div className="max-w-4xl mx-auto mb-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Service Selection */}
              <div>
                <Label className="text-lg font-semibold mb-4 block">What Gaps Do You Need Filled?</Label>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-accent transition-colors"
                    >
                      <Checkbox
                        id={`service-${service.id}`}
                        checked={selectedServices.includes(service.id)}
                        onCheckedChange={() => handleServiceToggle(service.id)}
                      />
                      <div>
                        <Label htmlFor={`service-${service.id}`} className="text-sm font-medium cursor-pointer">
                          {service.title}
                        </Label>
                        <Badge variant="secondary" className="text-xs mt-1">
                          {service.type}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium mb-2 block">
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    className="w-full"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-sm font-medium mb-2 block">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    className="w-full"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="phone" className="text-sm font-medium mb-2 block">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                    className="w-full"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <Label htmlFor="experience" className="text-sm font-medium mb-2 block">
                    Startup Stage
                  </Label>
                  <select
                    id="experience"
                    value={formData.experience}
                    onChange={(e) => setFormData((prev) => ({ ...prev, experience: e.target.value }))}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="">Select your stage</option>
                    <option value="idea">Idea Stage</option>
                    <option value="prototype">Prototype</option>
                    <option value="mvp">MVP</option>
                    <option value="scaling">Scaling</option>
                  </select>
                </div>
              </div>

              <div>
                <Label htmlFor="message" className="text-sm font-medium mb-2 block">
                  Tell Us About Your Startup
                </Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                  className="w-full"
                  rows={4}
                  placeholder="Share your startup’s goals, challenges, or specific needs..."
                />
              </div>

              <div className="text-center">
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-yellow-600 to-red-500 hover:from-yellow-700 hover:to-red-600 text-white font-medium text-lg px-12 py-4"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Get Support Now <Send className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
                <p className="text-sm text-muted-foreground mt-4">
                  We’ll contact you within 24 hours to discuss how we can help your startup succeed.
                </p>
              </div>
            </form>
          </div>

          {/* Option 2: External Form Integration Space */}
          <div className="border-t pt-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">Need a Detailed Consultation?</h3>
              <p className="text-muted-foreground mb-6">
                Use our external form for a more in-depth discussion about your startup’s needs.
              </p>

              {/* Space for Tally/Google Form Integration */}
              <div className="bg-muted/30 border-2 border-dashed border-muted-foreground/30 rounded-lg p-8 mb-6">
                <p className="text-muted-foreground text-sm mb-4">
                  🔧 Integration Space for External Form (Tally/Google Forms)
                </p>
                <p className="text-xs text-muted-foreground">
                  Replace this section with your preferred form embed code
                </p>
              </div>

              <Button
                variant="outline"
                size="lg"
                className="border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white"
                asChild
              >
                <a href="https://forms.google.com/your-form-link" target="_blank" rel="noopener noreferrer">
                  Open External Form <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-yellow-600 mb-2">500+</div>
              <div className="text-muted-foreground text-sm">Startups Supported</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-red-500 mb-2">95%</div>
              <div className="text-muted-foreground text-sm">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-green-600 mb-2">50+</div>
              <div className="text-muted-foreground text-sm">Expert Mentors</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-purple-600 mb-2">24/7</div>
              <div className="text-muted-foreground text-sm">Support Available</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
