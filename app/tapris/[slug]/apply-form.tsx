"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { User, FileText, Clock, CheckCircle, Loader2, Star, Award } from "lucide-react"

const availableSkills = [
  "React",
  "Node.js",
  "Python",
  "JavaScript",
  "TypeScript",
  "UI/UX Design",
  "Product Management",
  "Marketing",
  "Sales",
  "Data Science",
  "Machine Learning",
  "Mobile Development",
  "DevOps",
  "Blockchain",
  "AI/ML",
  "Digital Marketing",
]

const experienceLevels = ["Fresher (0-1 years)", "Junior (1-3 years)", "Mid-level (3-5 years)", "Senior (5+ years)"]

const availabilityOptions = [
  "Full-time (40+ hours/week)",
  "Part-time (20-30 hours/week)",
  "Flexible (10-20 hours/week)",
  "Weekends only",
]

interface ApplyFormProps {
  tapriId: string
}

export default function ApplyForm({ tapriId }: ApplyFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    linkedinUrl: "",
    portfolioUrl: "",
    githubUrl: "",
    coverLetter: "",
    experience: "",
    preferredRole: "",
    expectedSalary: "",
    availability: "",
    yearsExperience: "",
    whyInterested: "",
    previousWork: "",
  })

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills((prev) => (prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]))
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setIsSubmitted(true)
      toast({
        title: "Application submitted successfully!",
        description: "We'll review your application and get back to you soon.",
      })
    } catch (error) {
      toast({
        title: "Error submitting application",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h3>
          <p className="text-gray-600 mb-6">
            Thank you for your interest! We've received your application and will review it carefully. You can expect to
            hear back from us within 3-5 business days.
          </p>

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
            <h4 className="font-semibold text-yellow-800 mb-2">What happens next?</h4>
            <ul className="text-sm text-yellow-700 space-y-1 text-left">
              <li>• Initial review of your application (1-2 days)</li>
              <li>• Phone/video screening if shortlisted (3-5 days)</li>
              <li>• Technical/culture fit interview</li>
              <li>• Final decision and offer discussion</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="outline" onClick={() => window.history.back()}>
              Back to Tapri
            </Button>
            <Button className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black">
              Browse More Tapris
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl flex items-center">
            <Star className="w-6 h-6 text-yellow-500 mr-2" />
            Apply to Join This Tapri
          </CardTitle>
          <p className="text-gray-600">
            Tell us about yourself and why you'd be a great fit for this team. All fields marked with * are required.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <User className="w-5 h-5 mr-2" />
                Personal Information
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div>
                  <Label htmlFor="linkedinUrl">LinkedIn Profile</Label>
                  <Input
                    id="linkedinUrl"
                    value={formData.linkedinUrl}
                    onChange={(e) => handleInputChange("linkedinUrl", e.target.value)}
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>
                <div>
                  <Label htmlFor="portfolioUrl">Portfolio/Website</Label>
                  <Input
                    id="portfolioUrl"
                    value={formData.portfolioUrl}
                    onChange={(e) => handleInputChange("portfolioUrl", e.target.value)}
                    placeholder="https://yourportfolio.com"
                  />
                </div>
                <div>
                  <Label htmlFor="githubUrl">GitHub Profile</Label>
                  <Input
                    id="githubUrl"
                    value={formData.githubUrl}
                    onChange={(e) => handleInputChange("githubUrl", e.target.value)}
                    placeholder="https://github.com/yourusername"
                  />
                </div>
              </div>
            </div>

            {/* Skills & Experience */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Award className="w-5 h-5 mr-2" />
                Skills & Experience
              </h3>

              <div>
                <Label>Your Skills *</Label>
                <p className="text-sm text-gray-600 mb-3">Select all skills that apply to you</p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {availableSkills.map((skill) => (
                    <div key={skill} className="flex items-center space-x-2">
                      <Checkbox
                        id={skill}
                        checked={selectedSkills.includes(skill)}
                        onCheckedChange={() => handleSkillToggle(skill)}
                      />
                      <Label htmlFor={skill} className="text-sm cursor-pointer">
                        {skill}
                      </Label>
                    </div>
                  ))}
                </div>
                {selectedSkills.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {selectedSkills.map((skill) => (
                      <Badge key={skill} className="bg-yellow-100 text-yellow-800">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="yearsExperience">Experience Level *</Label>
                  <Select
                    value={formData.yearsExperience}
                    onValueChange={(value) => handleInputChange("yearsExperience", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      {experienceLevels.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="preferredRole">Preferred Role *</Label>
                  <Input
                    id="preferredRole"
                    value={formData.preferredRole}
                    onChange={(e) => handleInputChange("preferredRole", e.target.value)}
                    placeholder="e.g., Frontend Developer, Product Manager"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="previousWork">Previous Work/Projects</Label>
                <Textarea
                  id="previousWork"
                  value={formData.previousWork}
                  onChange={(e) => handleInputChange("previousWork", e.target.value)}
                  placeholder="Briefly describe your most relevant work experience or projects..."
                  rows={3}
                />
              </div>
            </div>

            {/* Availability & Compensation */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Availability & Expectations
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="availability">Availability *</Label>
                  <Select
                    value={formData.availability}
                    onValueChange={(value) => handleInputChange("availability", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your availability" />
                    </SelectTrigger>
                    <SelectContent>
                      {availabilityOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="expectedSalary">Expected Compensation (Optional)</Label>
                  <Input
                    id="expectedSalary"
                    value={formData.expectedSalary}
                    onChange={(e) => handleInputChange("expectedSalary", e.target.value)}
                    placeholder="e.g., ₹50,000/month or Equity only"
                  />
                </div>
              </div>
            </div>

            {/* Cover Letter */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Tell Us About Yourself
              </h3>

              <div>
                <Label htmlFor="whyInterested">Why are you interested in this Tapri? *</Label>
                <Textarea
                  id="whyInterested"
                  value={formData.whyInterested}
                  onChange={(e) => handleInputChange("whyInterested", e.target.value)}
                  placeholder="What excites you about this opportunity? How do you align with the mission?"
                  rows={4}
                  required
                />
              </div>

              <div>
                <Label htmlFor="coverLetter">Additional Message (Optional)</Label>
                <Textarea
                  id="coverLetter"
                  value={formData.coverLetter}
                  onChange={(e) => handleInputChange("coverLetter", e.target.value)}
                  placeholder="Anything else you'd like us to know about you or your application?"
                  rows={4}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t">
              <Button
                type="submit"
                disabled={
                  isSubmitting ||
                  !formData.fullName ||
                  !formData.email ||
                  !formData.preferredRole ||
                  !formData.availability ||
                  !formData.whyInterested ||
                  selectedSkills.length === 0
                }
                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-medium py-3 text-lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Submitting Application...
                  </>
                ) : (
                  <>
                    <Star className="w-5 h-5 mr-2" />
                    Submit Application
                  </>
                )}
              </Button>

              <p className="text-sm text-gray-500 text-center mt-3">
                By submitting this application, you agree to our terms and privacy policy.
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
