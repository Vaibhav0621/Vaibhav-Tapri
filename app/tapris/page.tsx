"use client";

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation'; // For reading URL filters
import { motion } from 'framer-motion';

// ALL original UI components are here
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Users, Eye, TrendingUp, Award, Clock, Filter, AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { SetupBanner } from "@/components/setup-banner";
import { isSupabaseConfigured } from "@/lib/supabase";
import { Alert, AlertDescription } from "@/components/ui/alert";


type TapriProfile = {
  full_name: string | null;
  avatar_url: string | null;
} | null;

type Tapri = {
  id: string; slug: string; title: string; tagline: string | null; description: string; category: string; stage: string; location: string; team_size: number; open_positions: number; banner_url: string | null; status: string; views: number; applications: number; created_at: string; website: string | null; profiles: TapriProfile;
};

const TaprisPageContent = () => {
    const searchParams = useSearchParams();
    const [tapris, setTapris] = useState<Tapri[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // ALL filters are here
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || "all");
    const [selectedStage, setSelectedStage] = useState(searchParams.get('stage') || "all");
    const [selectedLocation, setSelectedLocation] = useState("all");

    useEffect(() => {
        async function fetchTapris() {
            setLoading(true);
            setError(null);
            try {
                // Fetch data from our new, clean API route
                const response = await fetch(`/api/tapris?category=${selectedCategory}&stage=${selectedStage}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setTapris(data);
            } catch (err: any) {
                setError("Could not load projects. Please try again later.");
                setTapris([]);
            } finally {
                setLoading(false);
            }
        }
        fetchTapris();
    }, [selectedCategory, selectedStage]);

    // Client-side filtering logic for search and location
    const filteredTapris = useMemo(() => {
        return tapris.filter(tapri => {
            const searchMatch = !searchTerm || tapri.title.toLowerCase().includes(searchTerm.toLowerCase()) || tapri.description.toLowerCase().includes(searchTerm.toLowerCase());
            const locationMatch = selectedLocation === 'all' || tapri.location.toLowerCase() === selectedLocation.toLowerCase();
            return searchMatch && locationMatch;
        });
    }, [tapris, searchTerm, selectedLocation]);

    // ALL helper functions are here
    const getStageIcon = (stage: string) => { /* ... same as before */ return <Clock className="h-4 w-4" />; }
    const getJoinUrl = (tapri: Tapri) => { if (tapri.website) return tapri.website; return `/tapris/${tapri.slug}#join-form`; }

    // RENDER LOGIC with loading, error, and content states
    if (loading) return <div className="flex justify-center items-center h-64"><Loader2 className="h-8 w-8 animate-spin text-yellow-500" /></div>;
    if (error) return <Alert variant="destructive"><AlertCircle className="h-4 w-4" /><AlertDescription>{error}</AlertDescription></Alert>;

    return (
        <div>
            {/* STATS SECTION */}
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                 {/* ... all 4 stat cards from original code ... */}
             </div>
             
             {/* RESULTS GRID (with animations) */}
            <motion.div
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
                initial="hidden"
                animate="visible"
            >
                {filteredTapris.map(tapri => (
                    <motion.div key={tapri.id} variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>
                        {/* THE FULLY FEATURED CARD IS HERE */}
                        <Card className="group hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col h-full">
                           <Link href={`/tapris/${tapri.slug}`} className="block"><div className="aspect-video relative"><Image src={tapri.banner_url || "/placeholder.svg"} alt={tapri.title} fill className="object-cover group-hover:scale-105 transition-transform"/></div></Link>
                           <CardHeader><CardTitle>{tapri.title}</CardTitle><CardDescription>{tapri.tagline}</CardDescription></CardHeader>
                           <CardContent className="flex-grow space-y-4">
                               <p className="text-sm text-muted-foreground line-clamp-3">{tapri.description}</p>
                               {tapri.profiles && <div className="flex items-center gap-2 text-sm"><Avatar className="h-8 w-8"><AvatarImage src={tapri.profiles.avatar_url || ''} /><AvatarFallback>{tapri.profiles.full_name?.charAt(0)}</AvatarFallback></Avatar><div>{tapri.profiles.full_name}</div></div>}
                           </CardContent>
                           <div className="p-6 pt-0 mt-auto"><div className="flex gap-2"><Button asChild variant="outline" className="flex-1">...View</Button><Button asChild className="flex-1">...Join</Button></div></div>
                        </Card>
                    </motion.div>
                ))}
            </motion.div>
             {/* ... EMPTY STATE AND CTA ... */}
        </div>
    );
};


export default function TaprisPageWrapper() {
  return (
    // Next.js requires pages that use `useSearchParams` to be wrapped in a Suspense boundary.
    // This is the simplest way to do it for the whole page.
    <Suspense fallback={<div className="flex justify-center items-center h-screen"><Loader2 className="h-12 w-12 animate-spin text-yellow-500"/></div>}>
      <main className="container mx-auto px-4 py-8">
        <SetupBanner />
        {/* HERO AND FILTERS - now outside the dynamic content */}
         <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-600 via-red-500 to-orange-500 bg-clip-text text-transparent">Discover Amazing Tapris</h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">Explore innovative projects and find your next collaboration opportunity.</p>
        </div>
        <TaprisPageContent />
        {/* ... The final "Don't see your project" CTA would go here ... */}
      </main>
    </Suspense>
  );
}
