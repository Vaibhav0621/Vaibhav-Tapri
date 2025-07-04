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
    title: "Web Development Mastery",
    description: "Learn modern web development with React, Next.js, and full-stack technologies",
    icon: Code,
    color: "bg-blue-500",
    features: ["React & Next.js", "Full-stack Development", "Database Integration", "Deployment"],
    duration: "12 weeks",
    level: "Beginner to Advanced",
  },
  {
    id: 2,
    title: "Soft Skills Excellence",
    description: "Develop essential communication, leadership, and interpersonal skills",
    icon: Heart,
    color: "bg-pink-500",
    features: ["Communication Skills", "Leadership Training", "Team Collaboration", "Presentation Skills"],
    duration: "8 weeks",
    level: "All Levels",
  },
  {
    id: 3,
    title: "College Counseling",
    description: "Expert guidance for college applications, essays, and career planning",
    icon: BookOpen,
    color: "bg-green-500",
    features: ["Application Strategy", "Essay Writing", "Interview Prep", "Career Guidance"],
    duration: "6 months",
    level: "High School Students",
  },
  {
    id: 4,
    title: "Entrepreneurship Bootcamp",
    description: "Build and launch your startup with comprehensive business training",
    icon: Briefcase,
    color: "bg-purple-500",
    features: ["Business Planning", "Market Research", "Funding Strategies", "Launch Support"],
    duration: "16 weeks",
    level: "Intermediate",
  },
  {
    id: 5,
    title: "Digital Marketing Pro",
    description: "Master social media, SEO, content marketing, and digital advertising",
    icon: TrendingUp,
    color: "bg-orange-500",
    features: ["Social Media Strategy", "SEO Optimization", "Content Creation", "Analytics"],
    duration: "10 weeks",
    level: "Beginner to Intermediate",
  },
  {
    id: 6,
    title: "Data Science & Analytics",
    description: "Learn data analysis, machine learning, and business intelligence",
    icon: Target,
    color: "bg-indigo-500",
    features: ["Python/R Programming", "Machine Learning", "Data Visualization", "Statistical Analysis"],
    duration: "14 weeks",
    level: "Intermediate to Advanced",
  },
  {
    id: 7,
    title: "Creative Design Studio",
    description: "Master graphic design, UI/UX, and creative problem-solving",
    icon: Lightbulb,
    color: "bg-yellow-500",
    features: ["Graphic Design", "UI/UX Design", "Creative Thinking", "Design Tools"],
    duration: "12 weeks",
    level: "Beginner to Intermediate",
  },
  {
    id: 8,
    title: "Project Management",
    description: "Learn agile methodologies, team leadership, and project execution",
    icon: Users,
    color: "bg-teal-500",
    features: ["Agile Methodologies", "Team Leadership", "Risk Management", "Quality Assurance"],
    duration: "8 weeks",
    level: "Intermediate",
  },
  {
    id: 9,
    title: "Financial Literacy",
    description: "Master personal finance, investing, and financial planning",
    icon: Award,
    color: "bg-emerald-500",
    features: ["Personal Finance", "Investment Strategies", "Financial Planning", "Risk Assessment"],
    duration: "6 weeks",
    level: "All Levels",
  },
  {
    id: 10,
    title: "Public Speaking Mastery",
    description: "Overcome fear and become a confident, compelling speaker",
    icon: MessageCircle,
    color: "bg-red-500",
    features: ["Confidence Building", "Speech Writing", "Presentation Skills", "Audience Engagement"],
    duration: "8 weeks",
    level: "All Levels",
  },
  {
    id: 11,
    title: "Innovation & Creativity",
    description: "Unlock your creative potential and develop innovative thinking",
    icon: Zap,
    color: "bg-violet-500",
    features: ["Creative Thinking", "Innovation Methods", "Problem Solving", "Idea Generation"],
    duration: "6 weeks",
    level: "All Levels",
  },
  {
    id: 12,
    title: "Career Acceleration",
    description: "Fast-track your career with strategic planning and skill development",
    icon: Star,
    color: "bg-cyan-500",
    features: ["Career Strategy", "Skill Assessment", "Network Building", "Interview Mastery"],
    duration: "10 weeks",
    level: "All Levels",
  },
]

export default function CoursesPage() {
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
      formDataToSend.append("subject", "New Course Interest Form")
      formDataToSend.append("from_name", "Tapri Course Interest")

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
        toast.success("Thank you for your interest! We'll contact you within 24 hours.")

        // Reset form
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
            Creator's Secret Sauce
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-600 via-red-500 to-purple-600 bg-clip-text text-transparent">
            Unlock Your Potential
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Transform your skills with our comprehensive learning programs. Each service is carefully crafted to
            accelerate your growth and unlock new opportunities.
          </p>
        </div>

        {/* How It Works Section */}
        <div className="mb-20 bg-card rounded-3xl p-8 shadow-lg border">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 bg-gradient-to-r from-yellow-600 to-red-500 bg-clip-text text-transparent">
            How Our Secret Sauces Work
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">1. Choose Your Path</h3>
              <p className="text-muted-foreground">
                Select from our curated services based on your goals and interests. Each program is designed for
                specific skill development.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">2. Expert Guidance</h3>
              <p className="text-muted-foreground">
                Work with industry experts and mentors who provide personalized guidance, feedback, and support
                throughout your journey.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">3. Achieve Results</h3>
              <p className="text-muted-foreground">
                Complete projects, build your portfolio, and gain certifications that demonstrate your new skills to
                employers and clients.
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
                  <div className="flex justify-center gap-2 mb-3">
                    <Badge variant="secondary" className="text-xs">
                      {service.duration}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {service.level}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-center mb-4 text-sm">{service.description}</CardDescription>
                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button
                    onClick={scrollToForm}
                    className="w-full bg-gradient-to-r from-yellow-600 to-red-500 hover:from-yellow-700 hover:to-red-600 text-white"
                  >
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
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
              Ready to Transform Your Future?
            </h2>
            <p className="text-muted-foreground text-lg">
              Select the services you're interested in and we'll create a personalized learning path for you.
            </p>
          </div>

          {/* Option 1: Built-in Form */}
          <div className="max-w-4xl mx-auto mb-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Service Selection */}
              <div>
                <Label className="text-lg font-semibold mb-4 block">Select Services You're Interested In:</Label>
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
                      <Label htmlFor={`service-${service.id}`} className="text-sm font-medium cursor-pointer">
                        {service.title}
                      </Label>
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
                    Experience Level
                  </Label>
                  <select
                    id="experience"
                    value={formData.experience}
                    onChange={(e) => setFormData((prev) => ({ ...prev, experience: e.target.value }))}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="">Select your level</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                    <option value="expert">Expert</option>
                  </select>
                </div>
              </div>

              <div>
                <Label htmlFor="message" className="text-sm font-medium mb-2 block">
                  Additional Message
                </Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                  className="w-full"
                  rows={4}
                  placeholder="Tell us about your goals, timeline, or any specific requirements..."
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
                      Get Started Today <Send className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
                <p className="text-sm text-muted-foreground mt-4">
                  We'll contact you within 24 hours to discuss your personalized learning path.
                </p>
              </div>
            </form>
          </div>

          {/* Option 2: External Form Integration Space */}
          <div className="border-t pt-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">Prefer a Different Form?</h3>
              <p className="text-muted-foreground mb-6">
                You can also use our external form for a more detailed application process.
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
              <div className="text-muted-foreground text-sm">Students Trained</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-red-500 mb-2">95%</div>
              <div className="text-muted-foreground text-sm">Success Rate</div>
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
