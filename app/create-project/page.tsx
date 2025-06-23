"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Rocket, ExternalLink } from "lucide-react"
import { useRouter } from "next/navigation"

export default function CreateProjectPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    tagline: "",
    description: "",
    category: "",
    stage: "",
    team_size: "1",
    open_positions: "3",
    location: "Remote",
    mission: "",
    vision: "",
    required_skills: "",
    website: "",
    commitment_level: "part-time",
  })
  const { toast } = useToast()
  const router = useRouter()

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)

    try {
      // Prepare Web3Forms data
      const formDataToSend = new FormData()
      formDataToSend.append("access_key", "f3993f73-3c04-4f7b-ad60-630c82bb01cc")
      formDataToSend.append("subject", `New Tapri Project: ${formData.title}`)
      formDataToSend.append("from_name", "Tapri Platform")
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formDataToSend.append(key, String(value))
        }
      })

      // Submit to Web3Forms
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataToSend,
      })

      if (!response.ok) {
        throw new Error(`Web3Forms error: ${response.status}`)
      }

      const data = await response.json()
      if (!data.success) {
        throw new Error(data.message || "Failed to submit to Web3Forms")
      }

      // Success
      toast({
        title: "Project Submitted Successfully! 🎉",
        description: "Your Tapri project has been submitted for review. You'll hear back from us soon!",
      })

      // Reset form
      setFormData({
        name: "",
        email: "",
        title: "",
        tagline: "",
        description: "",
        category: "",
        stage: "",
        team_size: "1",
        open_positions: "3",
        location: "Remote",
        mission: "",
        vision: "",
        required_skills: "",
        website: "",
        commitment_level: "part-time",
      })

      setTimeout(() => router.push("/my-tapris"), 2000)
    } catch (error: any) {
      console.error("Error submitting project:", error)
      toast({
        title: "Submission Failed",
        description: `There was an error submitting your project: ${error.message}. Please try again.`,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-yellow-600 to-red-500 bg-clip-text text-transparent mb-4">
              Create Your Tapri
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Share your project idea with the world and find passionate collaborators to bring it to life
            </p>
          </div>

          {/* Form */}
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Rocket className="h-6 w-6 text-yellow-600" />
                Project Details
              </CardTitle>
              <CardDescription>
                Tell us about your amazing project idea and what you're looking to build
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>

                {/* Project Information */}
                <div className="space-y-2">
                  <Label htmlFor="title">Project Title *</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="Give your project an exciting name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tagline">Project Tagline</Label>
                  <Input
                    id="tagline"
                    name="tagline"
                    value={formData.tagline}
                    onChange={(e) => handleInputChange("tagline", e.target.value)}
                    placeholder="A brief, catchy description of your project"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Project Description *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Describe your project in detail. What problem does it solve? What makes it unique?"
                    rows={4}
                    required
                  />
                </div>

                {/* Project Details */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      name="category"
                      value={formData.category}
                      onValueChange={(value) => handleInputChange("level", value)}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select project category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="web-development">Web Development</SelectItem>
                        <SelectItem value="mobile-app">Mobile App</SelectItem>
                        <SelectItem value="ai-ml">AI/Machine Learning</SelectItem>
                        <SelectItem value="blockchain">Blockchain</SelectItem>
                        <SelectItem value="iot">IoT</SelectItem>
                        <SelectItem value="fintech">FinTech</SelectItem>
                        <SelectItem value="healthtech">HealthTech</SelectItem>
                        <SelectItem value="edtech">EdTech</SelectItem>
                        <SelectItem value="ecommerce">E-commerce</SelectItem>
                        <SelectItem value="social-media">Social Media</SelectItem>
                        <SelectItem value="gaming">Gaming</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="stage">Project Stage *</Label>
                    <Select
                      name="stage"
                      value={formData.stage}
                      onValueChange={(value) => handleInputChange("stage", value)}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select current stage" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="idea">Idea Stage</SelectItem>
                        <SelectItem value="planning">Planning</SelectItem>
                        <SelectItem value="prototype">Prototype</SelectItem>
                        <SelectItem value="mvp-development">MVP Development</SelectItem>
                        <SelectItem value="beta-testing">Beta Testing</SelectItem>
                        <SelectItem value="launch-ready">Launch Ready</SelectItem>
                        <SelectItem value="scaling">Scaling</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="team_size">Current Team Size</Label>
                    <Input
                      id="team_size"
                      name="team_size"
                      type="number"
                      min="1"
                      max="50"
                      value={formData.team_size}
                      onChange={(e) => handleInputChange("team_size", e.target.value)}
                      placeholder="1"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="open_positions">Open Positions</Label>
                    <Input
                      id="open_positions"
                      name="open_positions"
                      type="number"
                      min="0"
                      max="20"
                      value={formData.open_positions}
                      onChange={(e) => handleInputChange("open_positions", e.target.value)}
                      placeholder="3"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      placeholder="Remote, City, etc."
                    />
                  </div>
                </div>

                {/* Website/Application Link */}
                <div className="space-y-2">
                  <Label htmlFor="website">Project Website or Application Link</Label>
                  <Input
                    id="website"
                    name="website"
                    type="url"
                    value={formData.website}
                    onChange={(e) => handleInputChange("website", e.target.value)}
                    placeholder="https://your-project.com or https://forms.gle/your-form"
                  />
                  <p className="text-sm text-gray-500">
                    <ExternalLink className="inline h-3 w-3 mr-1" />
                    This link will be used for the "Join Project" button. You can link to your website, application
                    form, or any other relevant page.
                  </p>
                </div>

                {/* Additional Information */}
                <div className="space-y-2">
                  <Label htmlFor="mission">Mission Statement</Label>
                  <Textarea
                    id="mission"
                    name="mission"
                    value={formData.mission}
                    onChange={(e) => handleInputChange("mission", e.target.value)}
                    placeholder="What is the core mission of your project?"
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vision">Vision</Label>
                  <Textarea
                    id="vision"
                    name="vision"
                    value={formData.vision}
                    onChange={(e) => handleInputChange("vision", e.target.value)}
                    placeholder="Where do you see this project in the future?"
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="required_skills">Required Skills</Label>
                  <Input
                    id="required_skills"
                    name="required_skills"
                    value={formData.required_skills}
                    onChange={(e) => handleInputChange("required_skills", e.target.value)}
                    placeholder="React, Node.js, Design, Marketing (comma-separated)"
                  />
                </div>

                {/* Commitment Level */}
                <div className="space-y-2">
                  <Label htmlFor="commitment_level">Commitment Level</Label>
                  <Select
                    name="commitment_level"
                    value={formData.commitment_level}
                    onValueChange={(value) => handleInputChange("commitment_level", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select commitment level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="part-time">Part-time (10-20 hrs/week)</SelectItem>
                      <SelectItem value="full-time">Full-time (40+ hrs/week)</SelectItem>
                      <SelectItem value="flexible">Flexible</SelectItem>
                      <SelectItem value="weekend">Weekends only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black"></div>
                      Submitting...
                    </div>
                  ) : (
                    "Submit Project"
                  )}
                </Button>

                <p className="text-sm text-gray-500 text-center">
                  By submitting, you agree to our terms and conditions. Your project will be reviewed before going live.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
