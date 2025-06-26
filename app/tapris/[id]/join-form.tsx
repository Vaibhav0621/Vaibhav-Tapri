"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

interface JoinFormProps {
  tapriId: string
  tapriTitle: string
}

export default function JoinForm({ tapriId, tapriTitle }: JoinFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    skills: "",
    experience: "",
    motivation: "",
  })
  const { toast } = useToast()
  const router = useRouter()

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formDataToSend = new FormData()
      formDataToSend.append("access_key", "f3993f73-3c04-4f7b-ad60-630c82bb01cc")
      formDataToSend.append("subject", `Join Request: ${tapriTitle}`)
      formDataToSend.append("from_name", "Tapri Join Request")
      formDataToSend.append("tapri_id", tapriId)
      formDataToSend.append("tapri_title", tapriTitle)

      // Add all form fields
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value)
      })

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataToSend,
      })

      const result = await response.json()

      if (result.success) {
        toast({
          title: "Application Submitted!",
          description: "Your request to join this Tapri has been sent to the creator.",
        })

        // Reset form
        setFormData({
          name: "",
          email: "",
          skills: "",
          experience: "",
          motivation: "",
        })

        // Redirect back to the tapri page
        router.push(`/tapris/${tapriId}`)
      } else {
        toast({
          title: "Error",
          description: "Failed to submit your application. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Form submission error:", error)
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Join {tapriTitle}</CardTitle>
          <CardDescription>
            Tell us why you'd like to join this Tapri and what skills you can contribute.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <input type="hidden" name="access_key" value="f3993f73-3c04-4f7b-ad60-630c82bb01cc" />
            <input type="hidden" name="from_name" value="Tapri Join Request" />
            <input type="hidden" name="tapri_id" value={tapriId} />
            <input type="hidden" name="tapri_title" value={tapriTitle} />
            <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
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
                <Label htmlFor="email">Email Address</Label>
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

            <div className="space-y-2">
              <Label htmlFor="skills">Skills & Expertise</Label>
              <Textarea
                id="skills"
                name="skills"
                value={formData.skills}
                onChange={(e) => handleInputChange("skills", e.target.value)}
                placeholder="List your relevant skills and expertise..."
                className="min-h-[100px]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience">Relevant Experience</Label>
              <Textarea
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={(e) => handleInputChange("experience", e.target.value)}
                placeholder="Describe your relevant experience..."
                className="min-h-[100px]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="motivation">Why do you want to join?</Label>
              <Textarea
                id="motivation"
                name="motivation"
                value={formData.motivation}
                onChange={(e) => handleInputChange("motivation", e.target.value)}
                placeholder="Tell us why you're interested in this project and how you can contribute..."
                className="min-h-[120px]"
                required
              />
            </div>

            <div className="flex gap-4">
              <Button
                type="submit"
                className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2" />
                    Submitting...
                  </>
                ) : (
                  "Submit Application"
                )}
              </Button>
              <Button type="button" variant="outline" className="flex-1" onClick={() => router.back()}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
