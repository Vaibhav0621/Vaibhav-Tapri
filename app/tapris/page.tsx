"use client"
import { useState, useEffect, useMemo } from "react"
import { motion } from "framer-motion"

// All UI components from your original file are back
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, Users, Eye, TrendingUp, Award, Clock, Filter, AlertCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Your custom components
import { SetupBanner } from "@/components/setup-banner"

// Services and config
import { isSupabaseConfigured } from "@/lib/supabase"
import { TapriService } from "@/lib/services/tapri-service"
import { Alert, AlertDescription } from "@/components/ui/alert"

// The same, fully detailed Tapri type from your original code
type Tapri = {
  id: string;
  slug: string;
  title: string;
  tagline: string | null;
  description: string;
  category: string;
  stage: string;
  location: string;
  team_size: number;
  open_positions: number;
  banner_url: string | null;
  status: string;
  views: number;
  applications: number;
  created_at: string;
  website: string | null;
  profiles?: {
    full_name: string | null;
    avatar_url: string | null;
  };
};

// Animation variants for the container to stagger children
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Animation variants for each card
const cardVariants = {
  hidden: { y: 20, opacity: 0, scale: 0.95 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    }
  },
};


export default function TaprisPage() {
  const isConfigured = isSupabaseConfigured()
  const [tapris, setTapris] = useState<Tapri[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // All your filter states are back
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStage, setSelectedStage] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")

  useEffect(() => {
    async function fetchTapris() {
      if (!isConfigured) {
        setError("Database not configured. Please complete setup to view projects.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // Fetching is now simpler since it's only dynamic data
        const { data, error } = await TapriService.getApprovedTapris(
            1, 100, selectedCategory, selectedStage // Fetch all at once for client-side filtering
        );
        if(error) throw error;
        setTapris(data || []);
      } catch (err: any) {
        console.error("Error fetching tapris:", err);
        setError("Could not load projects. Please try again later.");
        setTapris([]);
      } finally {
        setLoading(false);
      }
    }
    
    fetchTapris()
  }, [selectedCategory, selectedStage]); // Re-fetch from DB when these change

  const filteredTapris = useMemo(() => {
    // This now only handles client-side search and location filtering
    return tapris.filter((tapri) => {
        const searchMatch = !searchTerm ||
            tapri.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tapri.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (tapri.tagline && tapri.tagline.toLowerCase().includes(searchTerm.toLowerCase()));
        
        const locationMatch = selectedLocation === 'all' || 
            tapri.location.toLowerCase().includes(selectedLocation.toLowerCase());
            
        return searchMatch && locationMatch;
    });
  }, [tapris, searchTerm, selectedLocation]);

  const getStageIcon = (stage: string) => {
    if (stage.includes("MVP") || stage.includes("Prototype")) return <Clock className="h-4 w-4" />
    if (stage.includes("Growth") || stage.includes("Scaling")) return <TrendingUp className="h-4 w-4" />
    if (stage.includes("Launch")) return <Award className="h-4 w-4" />
    return <Clock className="h-4 w-4" />
  }

  const getJoinUrl = (tapri: Tapri) => {
    if (tapri.website) return tapri.website
    return `/tapris/${tapri.slug}/join`
  }
  
  // This loader is a full-page placeholder reflecting your layout
  if (loading) {
    return (
        <div className="container mx-auto px-4 py-8 animate-pulse">
            <div className="mb-12 h-24 bg-muted rounded-lg" />
            <div className="flex flex-col gap-4 mb-8 max-w-6xl mx-auto">
                 <div className="h-12 bg-muted rounded-lg" />
                 <div className="h-10 bg-muted rounded-lg" />
            </div>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                <div className="h-24 bg-muted rounded-lg" />
                <div className="h-24 bg-muted rounded-lg" />
                <div className="h-24 bg-muted rounded-lg" />
                <div className="h-24 bg-muted rounded-lg" />
             </div>
             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                 {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-[500px] bg-muted rounded-2xl" />
                 ))}
             </div>
        </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <SetupBanner />

      {/* Hero Section */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-600 via-red-500 to-orange-500 bg-clip-text text-transparent">
          Discover Amazing Tapris
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Explore innovative projects and find your next collaboration opportunity. Join passionate creators building the future.
        </p>
      </div>

       {/* All Filters Section - RESTORED */}
      <div className="flex flex-col gap-4 mb-8 max-w-6xl mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search projects by title, description, or tagline..."
            className="pl-10 h-12 text-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Filters:</span>
            </div>
            {/* The rest of the filters are back */}
             <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48 h-10">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="EdTech">EdTech</SelectItem>
                <SelectItem value="HealthTech">HealthTech</SelectItem>
                <SelectItem value="FinTech">FinTech</SelectItem>
                 {/* ... add more */}
              </SelectContent>
            </Select>
            <Select value={selectedStage} onValueChange={setSelectedStage}>
              <SelectTrigger className="w-full md:w-48 h-10">
                <SelectValue placeholder="All Stages" />
              </SelectTrigger>
              <SelectContent>
                 <SelectItem value="all">All Stages</SelectItem>
                <SelectItem value="Idea Stage">Idea Stage</SelectItem>
                <SelectItem value="Planning">Planning</SelectItem>
                 {/* ... add more */}
              </SelectContent>
            </Select>
             <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="w-full md:w-48 h-10">
                <SelectValue placeholder="All Locations" />
              </SelectTrigger>
              <SelectContent>
                 <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="Remote">Remote</SelectItem>
                <SelectItem value="Global">Global</SelectItem>
                 {/* ... add more */}
              </SelectContent>
            </Select>
        </div>
      </div>

       {/* Stats Section - RESTORED */}
       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg border border-yellow-200">
                <div className="text-3xl font-bold text-yellow-600">{filteredTapris.length}</div>
                <div className="text-sm text-gray-600">Active Tapris</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                <div className="text-3xl font-bold text-blue-600">{filteredTapris.reduce((sum, t) => sum + t.open_positions, 0)}</div>
                <div className="text-sm text-gray-600">Open Positions</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
                <div className="text-3xl font-bold text-green-600">{filteredTapris.reduce((sum, t) => sum + t.team_size, 0)}</div>
                <div className="text-sm text-gray-600">Total Members</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                <div className="text-3xl font-bold text-purple-600">{filteredTapris.reduce((sum, t) => sum + t.applications, 0)}</div>
                <div className="text-sm text-gray-600">Applications</div>
            </div>
        </div>

      {/* Projects Grid */}
      <motion.div 
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        >
        {filteredTapris.map((tapri) => (
          <motion.div key={tapri.id} variants={cardVariants}>
            <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-yellow-300 bg-card shadow-md flex flex-col h-full">
               <Link href={`/tapris/${tapri.slug}`} className="block">
                <div className="aspect-video relative overflow-hidden">
                  <Image
                    src={tapri.banner_url || "/placeholder.svg?height=200&width=400"}
                    alt={tapri.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <Badge className="absolute top-3 left-3 bg-white/90 text-gray-800 border-white">{tapri.category}</Badge>
                  <div className="absolute bottom-3 left-3 flex items-center gap-1">
                      <Badge className="bg-black/70 text-white border-none flex items-center gap-1">{getStageIcon(tapri.stage)}{tapri.stage}</Badge>
                  </div>
                </div>
              </Link>
               <CardHeader className="pb-3">
                 <Link href={`/tapris/${tapri.slug}`} className="block">
                    <CardTitle className="text-xl group-hover:text-yellow-600 transition-colors line-clamp-1">{tapri.title}</CardTitle>
                    <CardDescription className="text-base font-medium text-muted-foreground line-clamp-1">{tapri.tagline || 'An innovative new project.'}</CardDescription>
                  </Link>
              </CardHeader>
               <CardContent className="flex-grow flex flex-col justify-between">
                <div>
                  <Link href={`/tapris/${tapri.slug}`} className="block mb-4">
                    <p className="text-sm text-muted-foreground line-clamp-3">{tapri.description}</p>
                  </Link>

                  {/* Metrics RESTORED */}
                   <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div className="flex items-center gap-2 text-gray-500"><MapPin className="h-4 w-4" /> <span className="truncate">{tapri.location}</span></div>
                      <div className="flex items-center gap-2 text-gray-500"><Users className="h-4 w-4" /> <span>{tapri.team_size} members</span></div>
                      <div className="flex items-center gap-2 text-gray-500"><Eye className="h-4 w-4" /> <span>{tapri.views.toLocaleString()} views</span></div>
                      <div className="flex items-center gap-2 text-green-600 font-medium"><Award className="h-4 w-4" /> <span>{tapri.open_positions} positions</span></div>
                  </div>

                  {/* Creator Info RESTORED */}
                   {tapri.profiles && (
                    <div className="mb-4 p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-2">
                        <Image src={tapri.profiles.avatar_url || "/placeholder.svg?size=32"} alt="Creator" width={32} height={32} className="rounded-full" />
                        <div>
                            <div className="font-medium text-sm text-foreground">{tapri.profiles.full_name || "Anonymous"}</div>
                            <div className="text-xs text-muted-foreground">Project Creator</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                 {/* Action Buttons RESTORED */}
                 <div className="flex gap-2 mt-auto">
                    <Button asChild className="flex-1" variant="outline">
                        <Link href={`/tapris/${tapri.slug}`}><Eye className="mr-2 h-4 w-4" />View Details</Link>
                    </Button>
                     <Button asChild className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white">
                        <Link href={getJoinUrl(tapri)} target={tapri.website ? "_blank" : "_self"}>
                           <Users className="mr-2 h-4 w-4" />Join Project
                        </Link>
                     </Button>
                 </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
       
      {/* Empty State and CTA - RESTORED */}
      {filteredTapris.length === 0 && !loading && (
        <div className="text-center py-16">
          <p className="text-gray-600 text-lg">No Tapris found matching your criteria.</p>
          <Button asChild className="mt-4 bg-yellow-600 hover:bg-yellow-700 text-white">
            <Link href="/create-project">Create the First One!</Link>
          </Button>
        </div>
      )}
       <div className="mt-16 text-center p-12 bg-gradient-to-r from-yellow-600 via-red-500 to-orange-500 rounded-3xl text-white">
        <h2 className="text-3xl font-bold mb-4">Have Your Own Idea?</h2>
        <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
          Don't just dream it, build it. Create your own Tapri and assemble a team to bring your vision to life.
        </p>
        <Button asChild size="lg" className="bg-white text-yellow-600 hover:bg-gray-100 font-bold">
          <Link href="/create-project">Start Building</Link>
        </Button>
      </div>

    </div>
  )
}
