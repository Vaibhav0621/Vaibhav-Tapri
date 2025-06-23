import { supabase } from "./supabase"

export class StorageService {
  private bucket = "tapri-assets"

  async uploadFile(file: File, path: string): Promise<{ url: string | null; error: string | null }> {
    try {
      // Upload file
      const { data, error } = await supabase.storage.from(this.bucket).upload(path, file, {
        cacheControl: "3600",
        upsert: true,
      })

      if (error) {
        return { url: null, error: error.message }
      }

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from(this.bucket).getPublicUrl(data.path)

      return { url: publicUrl, error: null }
    } catch (error) {
      return { url: null, error: "Upload failed" }
    }
  }

  async deleteFile(path: string): Promise<{ success: boolean; error: string | null }> {
    try {
      const { error } = await supabase.storage.from(this.bucket).remove([path])

      if (error) {
        return { success: false, error: error.message }
      }

      return { success: true, error: null }
    } catch (error) {
      return { success: false, error: "Delete failed" }
    }
  }

  generatePath(userId: string, type: "avatar" | "logo" | "banner" | "resume", fileName: string): string {
    const timestamp = Date.now()
    const extension = fileName.split(".").pop()
    return `${userId}/${type}/${timestamp}.${extension}`
  }
}

export const storageService = new StorageService()
