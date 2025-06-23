"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TestFormPage() {
  const [result, setResult] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setResult("Sending....")

    const formData = new FormData(event.currentTarget)

    // Add the access key
    formData.append("access_key", "f3993f73-3c04-4f7b-ad60-630c82bb01cc")

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    })

    const data = await response.json()

    if (data.success) {
      setResult("Form Submitted Successfully")
      ;(event.target as HTMLFormElement).reset()
    } else {
      console.log("Error", data)
      setResult(data.message)
    }

    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Test Web3Forms</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <input type="hidden" name="access_key" value="f3993f73-3c04-4f7b-ad60-630c82bb01cc" />
            <input type="hidden" name="subject" value="Test Form Submission" />
            <input type="hidden" name="from_name" value="Tapri Test Form" />
            <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} />

            <div>
              <Input type="text" name="name" placeholder="Your Name" required />
            </div>
            <div>
              <Input type="email" name="email" placeholder="Your Email" required />
            </div>
            <div>
              <textarea
                name="message"
                placeholder="Your Message"
                required
                className="w-full p-2 border rounded"
                rows={4}
              />
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Submitting..." : "Submit Form"}
            </Button>
          </form>

          {result && (
            <div className="mt-4 p-3 bg-gray-100 rounded">
              <p>{result}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
