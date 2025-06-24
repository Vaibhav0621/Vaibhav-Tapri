// components/talent-card.tsx
"use client";

import type { TalentProfile } from "@/lib/services/talent-service";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { MapPin, Award, UserPlus, Linkedin, BrainCircuit } from "lucide-react";

type TalentCardProps = {
    talent: TalentProfile;
    onInviteClick: (talent: TalentProfile) => void;
};

// Helper to determine the color of the availability badge
const getAvailabilityStyle = (availability: string | null) => {
    switch (availability) {
        case 'Open to Work': return "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300 border-green-400/50";
        case 'Exploring': return "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 border-blue-400/50";
        default: return "bg-gray-100 text-gray-700 dark:bg-gray-700/40 dark:text-gray-300 border-gray-400/50";
    }
}

export function TalentCard({ talent, onInviteClick }: TalentCardProps) {
    return (
        <Card className="group flex flex-col overflow-hidden rounded-2xl border-2 border-transparent bg-neutral-800/20 dark:bg-black/20 text-white backdrop-blur-sm transition-all duration-300 hover:border-pink-400/50 hover:shadow-2xl hover:shadow-pink-500/10 hover:-translate-y-1">
            <div className="p-6 pb-0 flex flex-col items-center text-center">
                <div className="relative mb-3">
                    <Image
                        src={talent.avatar_url || "/default-avatar.png"} // Have a default avatar in /public
                        alt={talent.full_name || "Talent Profile"}
                        width={96}
                        height={96}
                        className="rounded-full border-4 border-neutral-700 group-hover:border-pink-400 transition-colors duration-300"
                    />
                    <Badge variant="outline" className={`absolute -bottom-2 right-0 ${getAvailabilityStyle(talent.availability)}`}>
                        {talent.availability || 'Exploring'}
                    </Badge>
                </div>
                <h3 className="text-xl font-bold text-gray-100 truncate w-full">
                    {talent.full_name || 'Anonymous Creator'}
                </h3>
                <p className="text-sm text-pink-400 font-medium line-clamp-2 h-[40px]">
                    {talent.headline || 'Passionate builder and problem solver.'}
                </p>
            </div>
            
            <CardContent className="p-6 pt-4 flex-grow">
                <div className="flex flex-wrap gap-1.5 justify-center mb-5 min-h-[52px]">
                    {(talent.skills || []).slice(0, 4).map(skill => (
                        <Badge key={skill} variant="secondary" className="bg-neutral-700/50 text-neutral-300 border border-white/10">{skill}</Badge>
                    ))}
                    {(talent.skills?.length || 0) > 4 && <Badge variant="secondary" className="bg-neutral-700/50 text-neutral-300 border border-white/10">+{ (talent.skills?.length || 0) - 4} more</Badge>}
                </div>

                <div className="flex justify-between items-center text-sm text-neutral-400 pt-4 border-t border-white/10">
                     <div className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> <span>{talent.location || "The Cloud"}</span></div>
                     <div className="flex items-center gap-1.5 font-semibold text-purple-400"><Award className="h-4 w-4"/> <span>{talent.points_earned} PTS</span></div>
                </div>
            </CardContent>

            <CardFooter className="p-4 grid grid-cols-5 gap-2 border-t border-white/10">
                <Button asChild variant="outline" className="col-span-3 rounded-full border-neutral-600 hover:bg-white/10">
                     {/* Assume a dynamic profile page at /profile/[id] exists or will exist */}
                    <Link href={`/profile/${talent.id}`}>
                        <BrainCircuit className="h-4 w-4 mr-2"/> View Profile
                    </Link>
                </Button>
                
                <div className="col-span-2 flex justify-end gap-2">
                    {talent.linkedin_url && (
                        <Button asChild size="icon" variant="ghost" className="rounded-full hover:bg-white/10">
                            <a href={talent.linkedin_url} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile"><Linkedin className="h-5 w-5"/></a>
                        </Button>
                    )}
                     {talent.portfolio_url && (
                         <Button asChild size="icon" variant="ghost" className="rounded-full hover:bg-white/10">
                            <a href={talent.portfolio_url} target="_blank" rel="noopener noreferrer" aria-label="Portfolio/GitHub">{talent.portfolio_url.includes("github") ? "GH" : "Portfolio" }</a>
                        </Button>
                    )}
                </div>

                 <Button 
                    onClick={() => onInviteClick(talent)}
                    className="col-span-5 mt-2 w-full rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold hover:opacity-90 transition-all duration-300 transform hover:scale-105"
                >
                    <UserPlus className="h-4 w-4 mr-2" /> Invite to Project
                </Button>
            </CardFooter>
        </Card>
    );
}
