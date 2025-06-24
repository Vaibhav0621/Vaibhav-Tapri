// app/actions/tapri-actions.ts
"use server"

import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { z } from "zod"

// Helper function to generate a URL-friendly slug
function generateSlug(title: string): string {
    const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')  // remove special chars
        .replace(/\s+/g, '-')           // replace spaces with hyphens
        .replace(/-+/g, '-');          // remove consecutive hyphens
    
    // Add a short random string to ensure uniqueness
    const randomSuffix = Math.random().toString(36).substring(2, 7);
    return `${slug}-${randomSuffix}`;
}

const tapriSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  tagline: z.string().min(10, "Tagline must be at least 10 characters").optional(),
  description: z.string().min(20, "Description is too short"),
  category: z.string().min(1, "Please select a category"),
  // ... add all other fields from your form for validation
});

export async function createTapri(formData: FormData) {
    const cookieStore = cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
        },
      }
    )

    // Get current user session
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        return { success: false, message: 'You must be logged in to create a project.' };
    }
    
    // Convert FormData to a plain object
    const rawFormData = Object.fromEntries(formData.entries())

    // Validate the data
    const validationResult = tapriSchema.safeParse(rawFormData)
    if (!validationResult.success) {
        console.error("Validation failed:", validationResult.error.flatten().fieldErrors);
        return { success: false, message: "Validation failed. Please check your inputs." };
    }

    const { title, ...otherData } = validationResult.data;

    // Generate a unique slug
    const slug = generateSlug(title);
    
    try {
        const { data: newTapri, error } = await supabase.from('tapris').insert({
            ...otherData,
            title,
            slug, // Add the generated slug
            creator_id: user.id, // Link to the logged-in user
            status: 'pending', // Default status for moderation
        }).select().single();

        if (error) {
            console.error('Supabase insert error:', error);
            // Check for specific error, like a non-unique slug (very rare but good practice)
            if(error.code === '23505') {
                 return { success: false, message: 'A project with a similar title already exists. Please try a different title.' };
            }
            throw error;
        }

        // Revalidate the paths so new data appears without a hard refresh
        revalidatePath('/tapris')
        revalidatePath('/my-tapris')

        return { success: true, message: 'Your project has been submitted for review!', data: newTapri };

    } catch (error: any) {
        return { success: false, message: error.message || 'An unexpected error occurred.' };
    }
}
