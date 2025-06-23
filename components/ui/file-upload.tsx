"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "./button"
import { X, FileText, ImageIcon } from "lucide-react"
import { storageService } from "@/lib/storage"
import { useAuth } from "@/hooks/use-auth"

interface FileUploadProps {
  onUpload: (url: string) => void
  accept?: string
  maxSize?: number // in MB
  type: "avatar" | "logo" | "banner" | "resume"
  currentUrl?: string
  className?: string
}

export function FileUpload({
  onUpload,
  accept = "image/*",
  maxSize = 5,
  type,
  currentUrl,
  className = "",
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(currentUrl || null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { user } = useAuth()

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file || !user) return

    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      alert(`File size must be less than ${maxSize}MB`)
      return
    }

    setUploading(true)

    try {
      // Generate unique path
      const path = storageService.generatePath(user.id, type, file.name)

      // Upload file
      const { url, error } = await storageService.uploadFile(file, path)

      if (error) {
        alert(`Upload failed: ${error}`)
        return
      }

      if (url) {
        setPreview(url)
        onUpload(url)
      }
    } catch (error) {
      alert("Upload failed. Please try again.")
    } finally {
      setUploading(false)
    }
  }

  const removeFile = () => {
    setPreview(null)
    onUpload("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const isImage = accept.includes("image")

  return (
    <div className={`space-y-4 ${className}`}>
      <input ref={fileInputRef} type="file" accept={accept} onChange={handleFileSelect} className="hidden" />

      {preview ? (
        <div className="relative">
          {isImage ? (
            <div className="relative w-full h-32 bg-gray-100 rounded-lg overflow-hidden">
              <img src={preview || "/placeholder.svg"} alt="Preview" className="w-full h-full object-cover" />
              <button
                onClick={removeFile}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-gray-500" />
                <span className="text-sm text-gray-700">File uploaded</span>
              </div>
              <button onClick={removeFile} className="p-1 text-red-500 hover:text-red-700">
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="w-full h-32 border-dashed border-2 border-gray-300 hover:border-gray-400"
        >
          <div className="flex flex-col items-center space-y-2">
            {uploading ? (
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
            ) : (
              <>
                {isImage ? (
                  <ImageIcon className="h-8 w-8 text-gray-400" />
                ) : (
                  <FileText className="h-8 w-8 text-gray-400" />
                )}
                <span className="text-sm text-gray-500">{uploading ? "Uploading..." : `Upload ${type}`}</span>
              </>
            )}
          </div>
        </Button>
      )}
    </div>
  )
}
