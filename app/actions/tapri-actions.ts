// app/actions/tapri-actions.ts

"use server";

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { z } from "zod";

// Helper function to generate a unique, URL-friendly slug.
function generateSlug(title: string): string {
    const slugBase = title
        .toLowerCase()
        .replace(/&/g, 'and')           // Replace & with 'and'
        .replace(/[^\w\s-]/g, '')     // Remove all non-word, non-space, non-hyphen chars
        .replace(/\s+/g, '-')          // Replace spaces with -
        .replace(/-+/g, '-')           // Replace multiple - with single -
        .trim();                       // Trim leading/trailing whitespace

    // Add a short, random alphanumeric string to prevent collisions
    const randomSuffix = Math.random().toString(36).substring(2, 7);
    return `${slugBase}-${randomSuffix}`;
}

// Define the shape of our form data for robust validation with Zod
const tapriSchema = z.object({
  title: z.string().min(5, { message: "Project title must be at least 5 characters long." }),
  tagline: z.string().min(10, { message: "Tagline should be at least 10 characters." }).optional().or(z.literal('')),
  description: z.string().min(50, { message: "Please provide a more detailed description (at least 50 characters)." }),
  category: z.string().min(1, { message: "Please select a project category." }),
  stage: z.string().min(1, { message: "Please select the current project stage." }),
  team_size: z.preprocess(val => Number(val), z.number().min(1)),
  open_positions: z.preprocess(val => Number(val), z.number().min(0)),
  location: z.string().min(1, "Location is required."),
  website: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
  commitment_level: z.string().min(1, { message: "Please select a commitment level." }),
});


export async function createTapriAction(formData: FormData) {
    const cookieStore = cookies();
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          cookies: {
            get: (name: string) => cookieStore.get(name)?.value,
            // You can add set and remove if needed for other auth actions
          },
        }
      );

    // 1. Authenticate the user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { success: false, message: "Authentication failed. Please sign in." };
    }
    
    // 2. Validate the form data
    const rawFormData = Object.fromEntries(formData.entries());
    const validation = tapriSchema.safeParse(rawFormData);
    
    if (!validation.success) {
        const errorMessages = validation.error.issues.map(issue => issue.message).join(' ');
        console.error("Validation Errors: ", validation.error.flatten());
        return { success: false, message: `Invalid input. ${errorMessages}` };
    }

    // 3. Generate the unique slug
    const slug = generateSlug(validation.data.title);
    
    // 4. Prepare data for insertion
    const dataToInsert = {
        ...validation.data,
        slug,
        creator_id: user.id, // Link the project to the logged-in user
        status: 'pending', // All new projects must be reviewed by an admin
    };

    // 5. Insert into Supabase
    try {
        const { data: newTapri, error } = await supabase
            .from('tapris')
            .insert(dataToInsert)
            .select()
            .single();

        if (error) {
            console.error('Supabase Error:', error);
            // Handle potential unique constraint violation on slug (highly unlikely but good practice)
            if (error.code === '23505') {
                 return { success: false, message: 'A project with a very similar name already exists. Please try a slightly different title.' };
            }
            return { success: false, message: `Database error: ${error.message}` };
        }

        // 6. On success, revalidate paths to show new data
        // This tells Next.js to refresh the data on these pages
        revalidatePath('/tapris');
        revalidatePath('/my-tapris'); // A page where a user can see their own projects

        return { 
            success: true, 
            message: 'Project submitted for review!', 
            data: newTapri 
        };
    } catch (e: any) {
         console.error('Catch-all Error:', e);
         return { success: false, message: `An unexpected error occurred: ${e.message}` };
    }
}
