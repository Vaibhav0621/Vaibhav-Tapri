import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, Users, Calendar, ExternalLink } from "lucide-react"
import type { Database } from "@/lib/database.types"

type Tapri = Database["public"]["Tables"]["tapris"]["Row"]

interface TapriHeaderProps {
  tapri: Tapri
}

export function TapriHeader({ tapri }: TapriHeaderProps) {
  return (
    <div className="relative">
      {/* Banner Image */}
      <div className="h-64 bg-gradient-to-r from-yellow-400 via-red-500 to-black rounded-lg overflow-hidden">
        {tapri.banner_url ? (
          <img src={tapri.banner_url || "/placeholder.svg"} alt={tapri.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-yellow-400 via-red-500 to-black flex items-center justify-center">
            <h1 className="text-4xl font-bold text-white">{tapri.title}</h1>
          </div>
        )}
      </div>

      {/* Content Overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
        <div className="flex items-end gap-4">
          {/* Logo */}
          <Avatar className="h-20 w-20 border-4 border-white">
            <AvatarImage src={tapri.logo_url || undefined} alt={tapri.title} />
            <AvatarFallback className="text-2xl font-bold bg-yellow-400 text-black">
              {tapri.title.charAt(0)}
            </AvatarFallback>
          </Avatar>

          {/* Title and Info */}
          <div className="flex-1 text-white">
            <h1 className="text-3xl font-bold mb-2">{tapri.title}</h1>
            <p className="text-lg text-gray-200 mb-3">{tapri.tagline}</p>

            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{tapri.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{tapri.team_size} members</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>Since {new Date(tapri.created_at).getFullYear()}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            {tapri.website && (
              <Button variant="outline" size="sm" asChild>
                <a href={tapri.website} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Website
                </a>
              </Button>
            )}
            <Button className="bg-yellow-400 hover:bg-yellow-500 text-black">Join Project</Button>
          </div>
        </div>

        {/* Badges */}
        <div className="flex gap-2 mt-4">
          <Badge variant="secondary">{tapri.category}</Badge>
          <Badge variant="outline" className="text-white border-white">
            {tapri.stage}
          </Badge>
          {tapri.open_positions > 0 && (
            <Badge className="bg-green-500 hover:bg-green-600">{tapri.open_positions} positions open</Badge>
          )}
        </div>
      </div>
    </div>
  )
}
