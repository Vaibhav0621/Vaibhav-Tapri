"use client"

import type React from "react"
import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { Loader2, Rocket, ExternalLink } from "lucide-react"
import { useRouter } from "next/navigation"
import { createTapri } from '../actions/tapri-actions'

export default function CreateProjectPage() {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  
  // No longer need local state for form data as we'll use FormData directly.

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget);
    
    startTransition(async () => {
        const result = await createTapri(formData);

        if (result.success) {
            toast.success("Project Submitted!", {
                description: "Your Tapri is now pending review. You will be notified upon approval.",
                action: {
                    label: "View My Tapris",
                    onClick: () => router.push('/my-tapris'),
                },
            });
            // Reset the form after successful submission
            event.currentTarget.reset();
            // Optional: redirect user
            // router.push('/my-tapris');
        } else {
            toast.error("Submission Failed", {
                description: result.message || "Please check your inputs and try again.",
            });
        }
    })
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
                Tell us about your amazing project idea. It will be reviewed by an admin before going live.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Note: Ensure each input/select has a `name` attribute that matches your database columns */}
                <div className="space-y-2">
                  <Label htmlFor="title">Project Title *</Label>
                  <Input
                    id="title"
                    name="title" // NAME IS CRUCIAL
                    placeholder="e.g., AI-Powered Personal Finance Coach"
                    required
                    minLength={5}
                  />
                </div>
                
                {/* Other form fields like tagline, description, etc. */}
                {/* Example for category */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <Select name="category" required>
                          <SelectTrigger>
                              <SelectValue placeholder="Select project category" />
                          </SelectTrigger>
                          <SelectContent>
                              {/* Add all your categories here */}
                              <SelectItem value="EdTech">EdTech</SelectItem>
                              <SelectItem value="HealthTech">HealthTech</SelectItem>
                               <SelectItem value="FinTech">FinTech</SelectItem>
                          </SelectContent>
                      </Select>
                  </div>
                   <div className="space-y-2">
                      <Label htmlFor="stage">Project Stage *</Label>
                      <Select name="stage" required>
                           <SelectTrigger>
                              <SelectValue placeholder="Select current stage" />
                          </SelectTrigger>
                          <SelectContent>
                              <SelectItem value="Idea Stage">Idea Stage</SelectItem>
                              <SelectItem value="Planning">Planning</SelectItem>
                              <SelectItem value="Prototype">Prototype</SelectItem>
                          </SelectContent>
                      </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Full Description *</Label>
                  <Textarea id="description" name="description" placeholder="Describe the problem, your solution, and your target audience..." rows={5} required />
                </div>
                

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold text-lg py-6"
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Submitting for Review...
                    </>
                  ) : (
                    "Submit Project"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
