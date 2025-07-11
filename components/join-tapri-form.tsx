"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

interface JoinTapriFormProps {
  tapriId: string
  tapriTitle: string
  onClose?: () => void
}

export default function JoinTapriForm({ tapriId, tapriTitle, onClose }: JoinTapriFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(event.currentTarget)
    formData.append("access_key", "f3993f73-3c04-4f7b-ad60-630c82bb01cc")
    formData.append("tapri_id", tapriId)
    formData.append("tapri_title", tapriTitle)

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Application Submitted!",
          description: "Your request to join this Tapri has been sent to the creator.",
        })
        ;(event.target as HTMLFormElement).reset()
        onClose?.()
      } else {
        toast({
          title: "Error",
          description: "Failed to submit your application. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
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
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Join {tapriTitle}</CardTitle>
        <CardDescription>Tell us why you'd like to join this Tapri and what you can contribute.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input type="hidden" name="access_key" value="f3993f73-3c04-4f7b-ad60-630c82bb01cc" />
          <input type="hidden" name="subject" value={`Join Request: ${tapriTitle}`} />
          <input type="hidden" name="from_name" value="Tapri Join Request" />
          <input type="hidden" name="tapri_id" value={tapriId} />
          <input type="hidden" name="tapri_title" value={tapriTitle} />
          <label htmlFor="botcheck" className="sr-only">
            Botcheck
          </label>
          <input
            type="checkbox"
            id="botcheck"
            name="botcheck"
            className="hidden"
            title="Botcheck (leave unchecked)"
            tabIndex={-1}
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Your Name</Label>
              <Input id="name" name="name" placeholder="Enter your full name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" name="email" type="email" placeholder="your.email@example.com" required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="skills">Skills & Expertise</Label>
            <Textarea
              id="skills"
              name="skills"
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
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
            {onClose && (
              <Button type="button" variant="outline" className="flex-1" onClick={onClose}>
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
