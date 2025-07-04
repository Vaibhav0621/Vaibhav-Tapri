import Link from "next/link"
import Image from "next/image"

interface LogoProps {
  className?: string
  size?: "sm" | "md" | "lg"
  showIcon?: boolean
}

export default function Logo({ className = "", size = "md", showIcon = true }: LogoProps) {
  const sizes = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-4xl",
  }

  const iconSizes = {
    sm: "h-6 w-6",
    md: "h-10 w-10",
    lg: "h-16 w-16",
  }

  return (
    <Link href="/" className={`inline-flex items-center gap-3 ${className}`}>
      {showIcon && (
        <div className="relative">
          <Image
            src="/images/tapri-logo.jpeg"
            alt="Tapri Logo"
            width={size === "sm" ? 24 : size === "md" ? 40 : 64}
            height={size === "sm" ? 24 : size === "md" ? 40 : 64}
            className={`${iconSizes[size]} object-contain`}
          />
        </div>
      )}
      <span
        className={`${sizes[size]} font-bold bg-gradient-to-r from-yellow-600 via-red-500 to-black bg-clip-text text-transparent`}
      >
        Tapri
      </span>
    </Link>
  )
}
