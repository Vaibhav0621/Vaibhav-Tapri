// app/talents/page.tsx
"use client"

import { useState, useEffect, useMemo, useTransition } from "react"
import { useAuth } from "@/components/auth/auth-provider" // Your existing auth hook
import { TalentService, type TalentProfile } from "@/lib/services/talent-service"
import { motion } from "framer-motion"

// Component Imports - a full suite for a rich UI
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { TalentCard } from "@/components/talent-card"
import { InviteTalentModal } from "@/components/invite-talent-modal"

// Icons
import { Search, BrainCircuit, Briefcase, MapPin, User, Loader2, Frown } from "lucide-react"

// For better UX, define filter options statically or fetch them from your DB
const SKILL_OPTIONS = ["React", "Next.js", "Node.js", "Python", "AI/ML", "UI/UX", "Figma", "Solidity", "DevOps", "Product Management"];
const AVAILABILITY_OPTIONS = ["Open to Work", "Exploring", "Not Available"];

export default function TalentsPage() {
    const { user } = useAuth(); // Get the currently signed-in user
    const [talents, setTalents] = useState<TalentProfile[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Filter states
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSkill, setSelectedSkill] = useState("all");
    const [selectedAvailability, setSelectedAvailability] = useState("all");

    // Invitation Modal states
    const [isInviteModalOpen, setInviteModalOpen] = useState(false);
    const [selectedTalent, setSelectedTalent] = useState<TalentProfile | null>(null);

    // Fetch talent profiles when the page loads or when DB-level filters change
    useEffect(() => {
        setLoading(true);
        // We wrap this in an async function inside useEffect
        const fetchTalent = async () => {
            const { data, error } = await TalentService.getDiscoverableTalent(1, 50, { // Fetch a decent number of profiles
                skill: selectedSkill,
                availability: selectedAvailability,
            });

            if (error) {
                console.error("Error fetching talent:", error);
                setError("Could not load the Talent Hub. Please try again later.");
                setTalents([]);
            } else {
                setTalents(data || []);
                setError(null);
            }
            setLoading(false);
        };
        fetchTalent();
    }, [selectedSkill, selectedAvailability]); // Dependencies that trigger a re-fetch

    // Client-side search filtering on the already fetched data
    const filteredTalents = useMemo(() => {
        return talents.filter(talent => {
            const searchTermLower = searchTerm.toLowerCase();
            if (!searchTermLower) return true;
            
            const nameMatch = talent.full_name?.toLowerCase().includes(searchTermLower);
            const headlineMatch = talent.headline?.toLowerCase().includes(searchTermLower);
            const skillsMatch = talent.skills?.some(s => s.toLowerCase().includes(searchTermLower));
            
            return nameMatch || headlineMatch || skillsMatch;
        });
    }, [talents, searchTerm]);

    // Function to open the invitation modal
    const handleInviteClick = (talent: TalentProfile) => {
        if (!user) {
            // In a real app, you might use a toast here and redirect to login
            alert("Please sign in to invite talent.");
            return;
        }
        setSelectedTalent(talent);
        setInviteModalOpen(true);
    };

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
    };


    return (
        <>
            <div className="container mx-auto px-4 py-12 bg-neutral-900 text-white min-h-screen">
                {/* Page Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
                        The Talent Hub
                    </h1>
                    <p className="text-lg md:text-xl text-neutral-400 mb-8 max-w-3xl mx-auto">
                        Discover and connect with the brilliant minds powering the next wave of innovation.
                    </p>
                </div>

                {/* Filters Section */}
                <div className="sticky top-16 bg-neutral-900/80 backdrop-blur-md py-4 z-40 rounded-lg mb-12">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-grow">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-500" />
                            <Input
                                placeholder="Search by name, headline, or skill..."
                                className="pl-12 h-12 text-md rounded-full bg-neutral-800 border-neutral-700 focus:ring-pink-500 text-white"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Select value={selectedSkill} onValueChange={setSelectedSkill}>
                            <SelectTrigger className="h-12 rounded-full w-full md:w-56 bg-neutral-800 border-neutral-700"><BrainCircuit className="h-4 w-4 mr-2" /> <SelectValue placeholder="All Skills" /></SelectTrigger>
                            <SelectContent><SelectItem value="all">All Skills</SelectItem>{SKILL_OPTIONS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                        </Select>
                        <Select value={selectedAvailability} onValueChange={setSelectedAvailability}>
                            <SelectTrigger className="h-12 rounded-full w-full md:w-56 bg-neutral-800 border-neutral-700"><Briefcase className="h-4 w-4 mr-2" /><SelectValue placeholder="Availability" /></SelectTrigger>
                            <SelectContent><SelectItem value="all">All Statuses</SelectItem>{AVAILABILITY_OPTIONS.map(a => <SelectItem key={a} value={a}>{a}</SelectItem>)}</SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Main Content Area */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center min-h-[40vh]">
                         <Loader2 className="h-12 w-12 animate-spin text-pink-500" />
                         <p className="mt-4 text-neutral-400">Discovering amazing people...</p>
                    </div>
                ) : error ? (
                    <Alert variant="destructive" className="bg-red-900/40 border-red-500/50 text-red-200">
                        <AlertTitle>Error Loading Talent</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                ) : filteredTalents.length > 0 ? (
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {filteredTalents.map((talent) => (
                             <motion.div key={talent.id} variants={itemVariants}>
                                <TalentCard talent={talent} onInviteClick={handleInviteClick} />
                             </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <div className="text-center py-16">
                        <Frown className="h-16 w-16 text-neutral-600 mx-auto mb-4"/>
                        <p className="text-neutral-400 text-xl mb-4">No talent found matching your criteria.</p>
                        <p className="text-neutral-500">Try adjusting your filters or search terms.</p>
                    </div>
                )}
            </div>

            {/* The Modal for Inviting Talent - only rendered when needed */}
            <InviteTalentModal
                isOpen={isInviteModalOpen}
                onClose={() => setInviteModalOpen(false)}
                talentToInvite={selectedTalent}
            />
        </>
    );
}
