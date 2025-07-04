// app/actions/tapri-actions.ts

"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { z } from "zod"

// Helper function to generate a unique, URL-friendly slug
function generateSlug(title: string): string {
  const slugBase = title
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
  const randomSuffix = Math.random().toString(36).substring(2, 7)
  return `${slugBase}-${randomSuffix}`
}

const tapriSchema = z.object({
  title: z.string().min(5, { message: "Project title must be at least 5 characters long." }),
  tagline: z.string().min(10, { message: "Tagline should be at least 10 characters." }).optional().or(z.literal("")),
  description: z.string().min(50, { message: "Please provide a more detailed description (at least 50 characters)." }),
  problem_statement: z
    .string()
    .min(20, { message: "Problem statement should be at least 20 characters." })
    .optional()
    .or(z.literal("")),
  solution_approach: z
    .string()
    .min(20, { message: "Solution approach should be at least 20 characters." })
    .optional()
    .or(z.literal("")),
  target_audience: z
    .string()
    .min(20, { message: "Target audience should be at least 20 characters." })
    .optional()
    .or(z.literal("")),
  mission: z.string().optional().or(z.literal("")),
  vision: z.string().optional().or(z.literal("")),
  category: z.string().min(1, { message: "Please select a project category." }),
  stage: z.string().min(1, { message: "Please select the current project stage." }),
  location: z.string().min(1, "Location is required."),
  team_size: z.preprocess((val) => Number(val), z.number().min(1)),
  open_positions: z.preprocess((val) => Number(val), z.number().min(0)),
  required_skills: z.string().optional().or(z.literal("")),
  website: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal("")),
  pitch_deck_url: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal("")),
  demo_url: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal("")),
  github_url: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal("")),
  commitment_level: z.string().min(1, { message: "Please select a commitment level." }),
  funding_stage: z.string().optional().or(z.literal("")),
  funding_amount: z.string().optional().or(z.literal("")),
  equity_offered: z.string().optional().or(z.literal("")),
})

export async function createTapriAction(formData: FormData) {
  const supabase = createClient()

  // Check if user is authenticated
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()
  if (authError || !user) {
    return { success: false, message: "You must be logged in to create a project." }
  }

  // Validate form data
  const rawFormData = Object.fromEntries(formData.entries())
  const validation = tapriSchema.safeParse(rawFormData)

  if (!validation.success) {
    const errorMessages = validation.error.issues.map((issue) => issue.message).join(" ")
    return { success: false, message: `Invalid input. ${errorMessages}` }
  }

  try {
    // Generate unique slug
    const slug = generateSlug(validation.data.title)

    // Convert required_skills string to array
    const requiredSkillsArray = validation.data.required_skills
      ? validation.data.required_skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean)
      : []

    // Prepare data for insertion
    const dataToInsert = {
      ...validation.data,
      slug,
      creator_id: user.id,
      required_skills: requiredSkillsArray,
      status: "approved" as const, // Auto-approve for now
      published_at: new Date().toISOString(),
    }

    // Insert the tapri
    const { data: newTapri, error } = await supabase.from("tapris").insert(dataToInsert).select().single()

    if (error) {
      console.error("Database error:", error)
      return { success: false, message: `Database error: ${error.message}` }
    }

    // Revalidate relevant pages
    revalidatePath("/tapris")
    revalidatePath("/my-tapris")
    revalidatePath(`/tapris/${newTapri.slug}`)

    return {
      success: true,
      message: "Project created successfully and is now live!",
      data: newTapri,
      redirectTo: `/tapris/${newTapri.slug}`,
    }
  } catch (error) {
    console.error("Unexpected error:", error)
    return { success: false, message: "An unexpected error occurred. Please try again." }
  }
}

export async function updateTapriAction(tapriId: string, formData: FormData) {
  const supabase = createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()
  if (authError || !user) {
    return { success: false, message: "You must be logged in to update a project." }
  }

  // Verify ownership
  const { data: tapri, error: fetchError } = await supabase
    .from("tapris")
    .select("creator_id")
    .eq("id", tapriId)
    .single()

  if (fetchError || !tapri || tapri.creator_id !== user.id) {
    return { success: false, message: "You can only update your own projects." }
  }

  const rawFormData = Object.fromEntries(formData.entries())
  const validation = tapriSchema.safeParse(rawFormData)

  if (!validation.success) {
    const errorMessages = validation.error.issues.map((issue) => issue.message).join(" ")
    return { success: false, message: `Invalid input. ${errorMessages}` }
  }

  try {
    const requiredSkillsArray = validation.data.required_skills
      ? validation.data.required_skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean)
      : []

    const updateData = {
      ...validation.data,
      required_skills: requiredSkillsArray,
    }

    const { data: updatedTapri, error } = await supabase
      .from("tapris")
      .update(updateData)
      .eq("id", tapriId)
      .select()
      .single()

    if (error) {
      return { success: false, message: `Database error: ${error.message}` }
    }

    revalidatePath("/tapris")
    revalidatePath("/my-tapris")
    revalidatePath(`/tapris/${updatedTapri.slug}`)

    return {
      success: true,
      message: "Project updated successfully!",
      data: updatedTapri,
    }
  } catch (error) {
    console.error("Unexpected error:", error)
    return { success: false, message: "An unexpected error occurred. Please try again." }
  }
}

export async function deleteTapriAction(tapriId: string) {
  const supabase = createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()
  if (authError || !user) {
    return { success: false, message: "You must be logged in to delete a project." }
  }

  // Verify ownership
  const { data: tapri, error: fetchError } = await supabase
    .from("tapris")
    .select("creator_id, slug")
    .eq("id", tapriId)
    .single()

  if (fetchError || !tapri || tapri.creator_id !== user.id) {
    return { success: false, message: "You can only delete your own projects." }
  }

  try {
    const { error } = await supabase.from("tapris").delete().eq("id", tapriId)

    if (error) {
      return { success: false, message: `Database error: ${error.message}` }
    }

    revalidatePath("/tapris")
    revalidatePath("/my-tapris")

    return { success: true, message: "Project deleted successfully!" }
  } catch (error) {
    console.error("Unexpected error:", error)
    return { success: false, message: "An unexpected error occurred. Please try again." }
  }
}

export async function applyToTapriAction(tapriId: string, formData: FormData) {
  const supabase = createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()
  if (authError || !user) {
    return { success: false, message: "You must be logged in to apply." }
  }

  const coverLetter = formData.get("cover_letter") as string
  const expectedRole = formData.get("expected_role") as string
  const availability = formData.get("availability") as string

  if (!coverLetter || coverLetter.length < 50) {
    return { success: false, message: "Cover letter must be at least 50 characters long." }
  }

  try {
    // Check if already applied
    const { data: existingApplication } = await supabase
      .from("applications")
      .select("id")
      .eq("tapri_id", tapriId)
      .eq("applicant_id", user.id)
      .single()

    if (existingApplication) {
      return { success: false, message: "You have already applied to this project." }
    }

    // Insert application
    const { error } = await supabase.from("applications").insert({
      tapri_id: tapriId,
      applicant_id: user.id,
      cover_letter: coverLetter,
      expected_role: expectedRole,
      availability: availability,
    })

    if (error) {
      return { success: false, message: `Database error: ${error.message}` }
    }

    revalidatePath(`/tapris/${tapriId}`)

    return { success: true, message: "Application submitted successfully!" }
  } catch (error) {
    console.error("Unexpected error:", error)
    return { success: false, message: "An unexpected error occurred. Please try again." }
  }
}

export async function getFormSubmissions() {
  // This function seems to be for an admin panel to view raw submissions.
  // It is being added to satisfy the import in `my-tapris/page.tsx`.
  console.warn(
    "getFormSubmissions is deprecated and will be removed. Projects now go directly to the 'tapris' table with a 'pending' status.",
  )
  // In the new system, you would query the 'tapris' table for 'pending' status instead.
  const supabase = createClient()
  const { data, error } = await supabase
    .from("tapris")
    .select(`*, profiles(full_name)`)
    .eq("status", "pending")
    .order("created_at", { ascending: false })
  if (error) return []
  // We can simulate the old structure if needed
  return (data || []).map((d) => ({
    ...d,
    name: d.profiles?.full_name || "N/A",
    email: "N/A", // email isn't joined by default, add if needed.
    level: d.stage, // map stage to level if required.
    modules: (d.required_skills || []).join(", "),
  }))
}

export async function getMockFormSubmissions() {
  // This is a fallback function, likely used for demo mode when the DB isn't configured.
  console.warn("getMockFormSubmissions is a deprecated fallback function.")
  return [
    {
      id: "mock-1",
      title: "Mock: AI Learning Platform",
      description: "...",
      category: "AI/ML",
      level: "intermediate",
      modules: "ML, Web Dev",
      name: "Mock User",
      email: "mock@user.com",
      status: "pending",
      created_at: new Date().toISOString(),
    },
  ]
}

export async function convertFormSubmissionToTapri(submissionId: string) {
  // This function is also part of an older workflow.
  // The new workflow has admins approve projects directly, changing status from 'pending' to 'approved'.
  // We will implement this as an "approval" action.
  console.warn("convertFormSubmissionToTapri is now an approval function.")
  const supabase = createClient()
  const { data, error } = await supabase
    .from("tapris")
    .update({ status: "approved", published_at: new Date().toISOString() })
    .eq("id", submissionId)
    .select()
    .single()

  if (error) return { success: false, message: `Failed to approve Tapri: ${error.message}` }

  revalidatePath("/tapris")
  revalidatePath(`/tapris/${data.slug}`)

  return { success: true, message: "Tapri approved and is now live!", tapriId: data.id }
}
