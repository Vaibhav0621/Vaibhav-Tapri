// app/actions/tapri-actions.ts

"use server"

import { createServerClient } from '@/lib/supabase/server'
import { revalidatePath } from "next/cache"
import { z } from "zod"

// Helper function to generate a unique, URL-friendly slug
function generateSlug(title: string): string {
    const slugBase = title
        .toLowerCase()
        .replace(/&/g, 'and')
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
    const randomSuffix = Math.random().toString(36).substring(2, 7);
    return `${slugBase}-${randomSuffix}`;
}

const tapriSchema = z.object({
  title: z.string().min(5, { message: "Project title must be at least 5 characters long." }),
  tagline: z.string().min(10, { message: "Tagline should be at least 10 characters." }).optional().or(z.literal('')),
  description: z.string().min(50, { message: "Please provide a more detailed description (at least 50 characters)." }),
  category: z.string().min(1, { message: "Please select a project category." }),
  stage: z.string().min(1, { message: "Please select the current project stage." }),
  location: z.string().min(1, "Location is required."),
  team_size: z.preprocess(val => Number(val), z.number().min(1)),
  open_positions: z.preprocess(val => Number(val), z.number().min(0)),
  website: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
  commitment_level: z.string().min(1, { message: "Please select a commitment level." }),
});

export async function createTapriAction(formData: FormData) {
    // This is the core function from our previous discussion
    // It's already complete and correct.
    const supabase = createServerClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        return { success: false, message: 'You must be logged in to create a project.' };
    }
    const rawFormData = Object.fromEntries(formData.entries())
    const validation = tapriSchema.safeParse(rawFormData)
    if (!validation.success) {
        const errorMessages = validation.error.issues.map(issue => issue.message).join(' ');
        return { success: false, message: `Invalid input. ${errorMessages}` };
    }
    const slug = generateSlug(validation.data.title);
    const dataToInsert = { ...validation.data, slug, creator_id: user.id, status: 'pending' as const };
    const { data: newTapri, error } = await supabase.from('tapris').insert(dataToInsert).select().single();
    if (error) {
        return { success: false, message: `Database error: ${error.message}` };
    }
    revalidatePath('/tapris');
    revalidatePath('/my-tapris');
    return { success: true, message: 'Project submitted for review!', data: newTapri };
}


// --- THE MISSING EXPORTS MENTIONED IN THE ERROR LOG --- //

export async function getFormSubmissions() {
    // This function seems to be for an admin panel to view raw submissions.
    // It is being added to satisfy the import in `my-tapris/page.tsx`.
    console.warn("getFormSubmissions is deprecated and will be removed. Projects now go directly to the 'tapris' table with a 'pending' status.");
    // In the new system, you would query the 'tapris' table for 'pending' status instead.
    const supabase = createServerClient()
    const { data, error } = await supabase
        .from("tapris")
        .select(`*, profiles(full_name)`)
        .eq('status', 'pending')
        .order("created_at", { ascending: false });
    if(error) return [];
    // We can simulate the old structure if needed
    return (data || []).map(d => ({
        ...d,
        name: d.profiles?.full_name || 'N/A',
        email: 'N/A', // email isn't joined by default, add if needed.
        level: d.stage, // map stage to level if required.
        modules: (d.required_skills || []).join(', '),
    }));
}

export async function getMockFormSubmissions() {
    // This is a fallback function, likely used for demo mode when the DB isn't configured.
    console.warn("getMockFormSubmissions is a deprecated fallback function.");
    return [
      { id: "mock-1", title: "Mock: AI Learning Platform", description: "...", category: "AI/ML", level: "intermediate", modules: "ML, Web Dev", name: "Mock User", email: "mock@user.com", status: "pending", created_at: new Date().toISOString() },
    ];
}

export async function convertFormSubmissionToTapri(submissionId: string) {
    // This function is also part of an older workflow.
    // The new workflow has admins approve projects directly, changing status from 'pending' to 'approved'.
    // We will implement this as an "approval" action.
    console.warn("convertFormSubmissionToTapri is now an approval function.");
    const supabase = createServerClient()
    const { data, error } = await supabase
        .from('tapris')
        .update({ status: 'approved', published_at: new Date().toISOString() })
        .eq('id', submissionId)
        .select()
        .single();
    
    if(error) return { success: false, message: `Failed to approve Tapri: ${error.message}`};

    revalidatePath('/tapris');
    revalidatePath(`/tapris/${data.slug}`);

    return { success: true, message: 'Tapri approved and is now live!', tapriId: data.id };
}
