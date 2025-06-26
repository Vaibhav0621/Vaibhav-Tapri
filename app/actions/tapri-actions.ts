"use server"
import { createSupabaseServerClient } from "@/lib/supabase"
import { revalidatePath } from "next/cache"

export async function convertFormSubmissionToTapri(submissionId: string) {
  try {
    const supabase = createSupabaseServerClient()

    // Get the form submission first
    const { data: submission, error: fetchError } = await supabase
      .from("form_submissions")
      .select("*")
      .eq("id", submissionId)
      .single()

    if (fetchError || !submission) {
      console.error("Form submission not found:", fetchError)
      return { success: false, message: "Form submission not found" }
    }

    console.log("Found submission:", submission)

    // Create a new Tapri from the form submission
    const tapriData = {
      title: submission.title,
      tagline: `${submission.category} project by ${submission.name}`,
      description: submission.description,
      category: submission.category,
      stage:
        submission.level === "beginner" ? "Idea Stage" : submission.level === "intermediate" ? "Planning" : "Prototype",
      location: "Remote",
      team_size: 1,
      open_positions: 3,
      status: "approved", // Auto-approve converted submissions
      published_at: new Date().toISOString(),
      mission: submission.modules || "Building something amazing",
      vision: `To create the best ${submission.category} solution`,
      required_skills: [submission.category, submission.level],
      benefits: ["Learn new skills", "Build your portfolio", "Network with professionals"],
      equity_range: "0-5%",
      salary_range: "Equity only",
      commitment_level: submission.level === "beginner" ? "part-time" : "full-time",
      views: 0,
      applications: 0,
      website: null,
      banner_url: null,
      logo_url: null,
      creator_id: null, // Allow null creator for converted submissions
    }

    console.log("Creating Tapri with data:", tapriData)

    // Insert the tapri
    const { data: tapri, error: createError } = await supabase.from("tapris").insert(tapriData).select().single()

    if (createError) {
      console.error("Error creating Tapri:", createError)
      return { success: false, message: `Failed to create Tapri: ${createError.message}` }
    }

    console.log("Tapri created successfully:", tapri)

    // Update the form submission status
    const { error: updateError } = await supabase
      .from("form_submissions")
      .update({
        status: "converted",
        processed_at: new Date().toISOString(),
      })
      .eq("id", submissionId)

    if (updateError) {
      console.error("Error updating submission status:", updateError)
      // Don't fail the whole operation for this
    }

    // Revalidate the pages
    revalidatePath("/tapris")
    revalidatePath("/my-tapris")

    return {
      success: true,
      message: "Tapri created successfully and is now live!",
      tapriId: tapri.id,
    }
  } catch (error) {
    console.error("Error converting form submission:", error)
    return { success: false, message: "An unexpected error occurred" }
  }
}

export async function getFormSubmissions() {
  try {
    const supabase = createSupabaseServerClient()

    const { data, error } = await supabase
      .from("form_submissions")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching form submissions:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.error("Error fetching form submissions:", error)
    return []
  }
}

// Mock data for when database isn't available
export async function getMockFormSubmissions() {
  return [
    {
      id: "1",
      title: "AI Learning Platform",
      description: "Building an AI-powered learning platform for students",
      category: "ai-ml",
      level: "intermediate",
      modules: "Machine Learning, Web Development, UI/UX",
      name: "John Doe",
      email: "john@example.com",
      status: "pending",
      created_at: new Date().toISOString(),
    },
    {
      id: "2",
      title: "Sustainable Fashion Startup",
      description: "Creating eco-friendly fashion solutions",
      category: "ecommerce",
      level: "beginner",
      modules: "Sustainability, Design, Marketing",
      name: "Jane Smith",
      email: "jane@example.com",
      status: "pending",
      created_at: new Date().toISOString(),
    },
  ]
}
