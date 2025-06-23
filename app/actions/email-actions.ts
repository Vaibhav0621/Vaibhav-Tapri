"use server"
import { createSupabaseServerClient } from "@/lib/supabase"

export async function sendTapriCreationEmail(formData: FormData): Promise<{ success: boolean; message: string }> {
  try {
    // Extract form data
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const category = formData.get("category") as string
    const level = formData.get("level") as string
    const modules = formData.get("modules") as string
    const email = formData.get("email") as string
    const name = formData.get("name") as string

    console.log("Form data received:", { title, description, category, level, modules, email, name })

    // Validate required fields
    if (!title || !description || !category || !level || !modules || !email) {
      return {
        success: false,
        message: "All fields are required",
      }
    }

    const supabase = createSupabaseServerClient()

    // Insert directly without any checks
    const { error } = await supabase.from("form_submissions").insert({
      type: "tapri_creation",
      email,
      name: name || null,
      title,
      description,
      category,
      level,
      modules,
      status: "pending",
    })

    if (error) {
      console.error("Database error:", error)
      return {
        success: false,
        message: `Database error: ${error.message}`,
      }
    }

    return {
      success: true,
      message: "Your Tapri project request has been submitted successfully! We'll review it and get back to you soon.",
    }
  } catch (error) {
    console.error("Error:", error)
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    }
  }
}

export async function subscribeToNewsletter(formData: FormData): Promise<{ success: boolean; message: string }> {
  try {
    const email = formData.get("email") as string
    const name = formData.get("name") as string

    if (!email) {
      return {
        success: false,
        message: "Email is required",
      }
    }

    const supabase = createSupabaseServerClient()

    // Simple insert
    const { error } = await supabase.from("newsletter_subscribers").insert({
      email,
      name: name || null,
      is_active: true,
      source: "website",
    })

    if (error) {
      console.error("Newsletter error:", error)

      if (error.code === "23505") {
        return {
          success: false,
          message: "This email is already subscribed to our newsletter.",
        }
      }

      return {
        success: false,
        message: `Error: ${error.message}`,
      }
    }

    return {
      success: true,
      message: "You have been subscribed to our newsletter! Welcome aboard! 🎉",
    }
  } catch (error) {
    console.error("Error:", error)
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    }
  }
}
