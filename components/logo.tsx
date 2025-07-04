"use client"

import Link from "next/link"
import { Coffee } from "lucide-react"

export default function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2 group">
      <div className="relative">
        <Coffee className="h-8 w-8 text-yellow-500 group-hover:text-yellow-400 transition-colors duration-300" />
        <div className="absolute inset-0 bg-yellow-400 rounded-full blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
      </div>
      <span className="text-2xl font-bold bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
        Tapri
      </span>
    </Link>
  )
}
