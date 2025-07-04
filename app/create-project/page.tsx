// app/create-project/page.tsx

"use client"

import type React from "react"
import { useTransition } from "react"
import { useRouter } from "next/navigation"

// Your UI components
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Rocket, ExternalLink } from "lucide-react"

// Your custom components
import { useToast } from "@/hooks/use-toast"
import { toast as sonnerToast } from "sonner" // Using Sonner for more flexible toasts

// The Server Action
import { createTapriAction } from "@/app/actions/tapri-actions"

export default function CreateProjectPage() {
  const router = useRouter()
  // useTransition hook is perfect for handling pending states with server actions
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast(); // From ShadCN, good for simple messages

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
        const result = await createTapriAction(formData);

        if (result.success) {
            // Use Sonner for a more interactive toast
            sonnerToast.success("Project Submitted for Review!", {
                description: "Your Tapri will appear on the browse page once it's approved by an admin.",
                action: {
                    label: "View My Submissions",
                    onClick: () => router.push('/my-tapris'),
                },
                duration: 8000,
            });
            (event.target as HTMLFormElement).reset(); // Reset form on success
        } else {
            sonnerToast.error("Submission Failed", {
                description: result.message || "Please check your inputs and try again.",
            });
        }
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-yellow-600 to-red-500 bg-clip-text text-transparent mb-4">
              Create Your Tapri
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Share your project idea with the world. Let's build something amazing together.
            </p>
          </div>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Rocket className="h-6 w-6 text-yellow-600" />
                Your Project Blueprint
              </CardTitle>
              <CardDescription>
                Fill in the details below. All submissions are reviewed by our team before going live.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* The name attributes MUST match the keys in our Zod schema */}
              <form onSubmit={handleSubmit} className="space-y-8">
                
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-lg font-semibold">Project Title *</Label>
                  <Input id="title" name="title" placeholder="e.g., AI-Powered Personal Finance Coach" required minLength={5} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tagline" className="text-lg font-semibold">Project Tagline</Label>
                  <Input id="tagline" name="tagline" placeholder="A short, catchy slogan for your project" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-lg font-semibold">Project Description *</Label>
                  <Textarea id="description" name="description" placeholder="Describe the problem you're solving, your proposed solution, your target audience, and what makes your project unique." rows={6} required minLength={50} />
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                      <Label htmlFor="category" className="text-lg font-semibold">Category *</Label>
                      <Select name="category" required>
                        <SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="EdTech">EdTech</SelectItem>
                          <SelectItem value="HealthTech">HealthTech</SelectItem>
                          <SelectItem value="FinTech">FinTech</SelectItem>
                          <SelectItem value="Web Development">Web Development</SelectItem>
                          <SelectItem value="Mobile App">Mobile App</SelectItem>
                           {/* Add all relevant categories */}
                        </SelectContent>
                      </Select>
                  </div>
                   <div className="space-y-2">
                       <Label htmlFor="stage" className="text-lg font-semibold">Project Stage *</Label>
                        <Select name="stage" required>
                         <SelectTrigger><SelectValue placeholder="Select current stage" /></SelectTrigger>
                         <SelectContent>
                           <SelectItem value="Idea Stage">Idea Stage</SelectItem>
                           <SelectItem value="Planning">Planning</SelectItem>
                           <SelectItem value="Prototype">Prototype</SelectItem>
                           <SelectItem value="MVP Development">MVP Development</SelectItem>
                           <SelectItem value="Scaling">Scaling</SelectItem>
                         </SelectContent>
                       </Select>
                   </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="space-y-2">
                      <Label htmlFor="location" className="text-lg font-semibold">Location *</Label>
                      <Input id="location" name="location" defaultValue="Remote" required />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="team_size" className="text-lg font-semibold">Current Team Size *</Label>
                        <Input id="team_size" name="team_size" type="number" defaultValue="1" min="1" required/>
                    </div>
                    <div className="space-y-2">
                       <Label htmlFor="open_positions" className="text-lg font-semibold">Open Positions *</Label>
                        <Input id="open_positions" name="open_positions" type="number" defaultValue="1" min="0" required />
                    </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="website" className="text-lg font-semibold">Project Website / Join Link</Label>
                  <Input id="website" name="website" type="url" placeholder="https://your-project.com (Optional)" />
                   <p className="text-sm text-gray-500">
                    <ExternalLink className="inline h-3 w-3 mr-1" />
                    If you have a website or a specific sign-up form, link it here.
                  </p>
                </div>

                 <div className="space-y-2">
                      <Label htmlFor="commitment_level" className="text-lg font-semibold">Commitment Level *</Label>
                       <Select name="commitment_level" required>
                         <SelectTrigger><SelectValue placeholder="What kind of commitment are you looking for?" /></SelectTrigger>
                         <SelectContent>
                            <SelectItem value="part-time">Part-time (Flexible)</SelectItem>
                            <SelectItem value="full-time">Full-time</SelectItem>
                            <SelectItem value="contract">Contract / Freelance</SelectItem>
                         </SelectContent>
                       </Select>
                </div>


                <div className="pt-4">
                  <Button type="submit" size="lg" className="w-full text-lg" disabled={isPending}>
                    {isPending ? (
                      <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Submitting for Review...</>
                    ) : (
                      "Submit Project for Review"
                    )}
                  </Button>
                </div>

              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
