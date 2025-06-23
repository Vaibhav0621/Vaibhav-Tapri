"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2, AlertCircle } from "lucide-react"

export default function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<{
    type: "success" | "error" | null
    message: string | null
  }>({
    type: null,
    message: null,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormStatus({ type: null, message: null })

    try {
      const formData = new FormData()
      formData.append("access_key", "f3993f73-3c04-4f7b-ad60-630c82bb01cc")
      formData.append("email", email)
      formData.append("name", name)
      formData.append("subject", "New Newsletter Subscription")
      formData.append("from_name", "Tapri Newsletter")

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (data.success) {
        setFormStatus({
          type: "success",
          message: "Thank you for subscribing to our newsletter!",
        })
        setEmail("")
        setName("")
      } else {
        setFormStatus({
          type: "error",
          message: "Failed to subscribe. Please try again.",
        })
      }
    } catch (error) {
      setFormStatus({
        type: "error",
        message: "An unexpected error occurred. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {formStatus.type && (
        <Alert
          className={`mb-4 ${
            formStatus.type === "success"
              ? "bg-green-50 text-green-800 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-900"
              : "bg-red-50 text-red-800 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-900"
          }`}
        >
          {formStatus.type === "success" ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
          <AlertDescription>{formStatus.message}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <input type="hidden" name="access_key" value="f3993f73-3c04-4f7b-ad60-630c82bb01cc" />
        <input type="hidden" name="subject" value="New Newsletter Subscription" />
        <input type="hidden" name="from_name" value="Tapri Newsletter" />
        <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} />

        <div className="flex-1">
          <Input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full"
          />
        </div>
        <Button
          type="submit"
          className="bg-yellow-500 hover:bg-yellow-600 text-black whitespace-nowrap"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Subscribing..." : "Subscribe"}
        </Button>
      </form>
    </div>
  )
}
