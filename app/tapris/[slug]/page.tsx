import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { TapriService } from "@/lib/services/tapri-service";

// Restoring all of your original component imports
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Progress } from "@/components/ui/progress";
import { TapriHeader } from "@/components/tapri-header"; // Using the new client component
import { Mail, Globe, Star, CheckCircle, Circle, Award, Target } from "lucide-react";


// --- DYNAMIC DATA AND COLOR LOGIC --- //
// Helper function to map category to a theme color for dynamic styling
function getCategoryColor(category: string): string {
    const colorMap: { [key: string]: string } = {
        "web development": 'blue',
        "mobile app": 'green',
        "ai/ml": 'purple',
        "blockchain": 'cyan',
        "fintech": 'yellow',
        "healthtech": 'red',
        "edtech": 'pink',
        "professional development": 'orange',
    };
    return colorMap[category?.toLowerCase()] || 'gray';
}


export default async function TapriDetailPage({ params }: { params: { slug:string }}) {
    // 1. Fetch Data on the Server
    const { data: tapri, error } = await TapriService.getTapriBySlug(params.slug);
    if (error || !tapri) {
        notFound();
    }
    
    // 2. Add dynamic properties based on fetched data
    const primaryColor = getCategoryColor(tapri.category);
    const tapriForHeader = { title: tapri.title, logo_url: tapri.logo_url, primaryColor };

    // 3. Define page-specific data and structures (all from your original file, now dynamic)
    const statusColorClass = `bg-${primaryColor}-500/20 text-${primaryColor}-400`;
    
    const milestones = [
        { title: 'Project Kickoff', description: 'The journey begins!', completed: true, dueDate: 'Q1' },
        { title: 'MVP/Prototype Complete', description: 'First functional version is live.', completed: ['MVP Development', 'Beta Testing', 'Launch Ready', 'Scaling'].includes(tapri.stage), dueDate: 'Q2' },
        { title: 'First 100 Users', description: 'Building the community.', completed: ['Beta Testing', 'Launch Ready', 'Scaling'].includes(tapri.stage), dueDate: 'Q3' },
        { title: 'Scaling Phase', description: 'Ready for global reach.', completed: tapri.stage === 'Scaling', dueDate: 'Q4' },
    ];
    const progressPercentage = (milestones.filter(m => m.completed).length / milestones.length) * 100;

    const teamMembers = [
        { name: tapri.profiles?.full_name || 'Creator', role: 'Chief Visionary', bio: 'Leading the project with passion and expertise.', image: tapri.profiles?.avatar_url || '/placeholder.svg?text=C' },
        // ...You can later expand your schema to include more team members
    ];
    
    const openRoles = tapri.required_skills?.map(skill => ({
        title: `${skill} Specialist`,
        type: tapri.commitment_level || 'Flexible',
        description: `We're looking for a talented individual with strong ${skill} skills to help us achieve our next milestone.`,
        skills: [skill],
    })) || [];


    // --- JSX RENDER - All Sections Restored --- //
    return (
        <div className="flex flex-col min-h-screen bg-black text-white font-sans">
            <TapriHeader tapri={tapriForHeader} />

            {/* SECTION: Overview */}
            <section id="overview" className="relative w-full h-[80vh] flex items-end justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image src={tapri.banner_url || `/placeholder.svg?w=1600&h=1000&c=${primaryColor}`} alt={tapri.title} fill className="object-cover opacity-30" priority />
                    <div className={`absolute inset-0 bg-gradient-to-t from-black via-${primaryColor}-950/40 to-transparent`} />
                </div>
                <div className="container px-4 md:px-6 pb-16 text-center relative z-10">
                    <h1 className="text-5xl md:text-7xl font-extrabold drop-shadow-lg">{tapri.title}</h1>
                    <p className="text-xl md:text-2xl text-gray-200 mt-4 max-w-3xl mx-auto font-light">{tapri.tagline}</p>
                    <div className="flex justify-center flex-wrap gap-4 mt-6">
                        <Badge className={`${statusColorClass} font-semibold px-4 py-1 text-sm`}>{tapri.status === 'approved' ? 'Active' : tapri.status}</Badge>
                        <Badge variant="outline" className={`border-${primaryColor}-500 text-${primaryColor}-400`}>{tapri.category}</Badge>
                    </div>
                </div>
            </section>
            
             {/* SECTION: About */}
            <section id="about" className="w-full py-16 md:py-24 bg-neutral-900 border-y border-white/10">
                <div className="container grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h2 className={`text-4xl font-bold text-center md:text-left text-${primaryColor}-400`}>About This Tapri</h2>
                        <p className="text-lg text-gray-300 leading-relaxed whitespace-pre-line">{tapri.description}</p>
                        {tapri.mission && (
                            <div className="border-l-4 border-yellow-400 pl-4">
                                <h3 className="text-xl font-semibold flex items-center gap-2"><Target /> Mission</h3>
                                <p className="text-gray-400 mt-1">{tapri.mission}</p>
                            </div>
                        )}
                         {tapri.vision && (
                            <div className="border-l-4 border-yellow-400 pl-4">
                                <h3 className="text-xl font-semibold flex items-center gap-2"><Award /> Vision</h3>
                                <p className="text-gray-400 mt-1">{tapri.vision}</p>
                            </div>
                        )}
                    </div>
                     <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                        <Image src={tapri.banner_url || `/placeholder.svg?w=800&h=600`} alt="About Us" fill className="object-cover"/>
                    </div>
                </div>
            </section>

             {/* SECTION: Open Roles */}
             <section id="roles" className="w-full py-16 md:py-24">
                 <div className="container">
                     <h2 className={`text-4xl font-bold text-center mb-12 text-${primaryColor}-400`}>Open Roles ({tapri.open_positions})</h2>
                     {openRoles.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {openRoles.map((role, index) => (
                                <Card key={index} className="bg-neutral-800 border-white/10 shadow-lg hover:border-yellow-400/50 transition-colors">
                                    <CardHeader><CardTitle>{role.title}</CardTitle><Badge variant="secondary">{role.type}</Badge></CardHeader>
                                    <CardContent>
                                        <p className="text-gray-400 mb-4">{role.description}</p>
                                        <Button className="w-full" asChild>
                                            <Link href="#contact">Apply Now</Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                     ) : (
                         <p className="text-center text-gray-400">The team is currently full, but check back soon for new opportunities!</p>
                     )}
                 </div>
             </section>
             
             {/* SECTION: Roadmap */}
             <section id="roadmap" className="w-full py-16 md:py-24 bg-neutral-900 border-y border-white/10">
                <div className="container">
                    <h2 className={`text-4xl font-bold text-center mb-4 text-${primaryColor}-400`}>Project Roadmap</h2>
                    <p className="text-center text-gray-400 mb-12">Our current progress and where we're headed next.</p>
                    <div className="max-w-4xl mx-auto">
                        <div className="mb-6"><Progress value={progressPercentage} className={`h-3 bg-neutral-700`} indicatorClassName={`bg-${primaryColor}-500`} /></div>
                         <div className="grid md:grid-cols-4 gap-4">
                             {milestones.map((milestone, index) => (
                                <div key={index} className="text-center p-4">
                                     <div className="flex justify-center mb-2">{milestone.completed ? <CheckCircle className={`h-8 w-8 text-${primaryColor}-400`}/> : <Circle className="h-8 w-8 text-gray-600"/>}</div>
                                     <h4 className="font-semibold text-gray-200">{milestone.title}</h4>
                                     <p className="text-sm text-gray-400">{milestone.description}</p>
                                     <p className="text-xs text-gray-500 mt-1">ETA: {milestone.dueDate}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            
            {/* SECTION: Contact / Join */}
            <section id="contact" className="w-full py-16 md:py-24">
                <div className="container text-center">
                    <h2 className={`text-4xl font-bold mb-4 text-${primaryColor}-400`}>Ready to Join?</h2>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">Become part of the team and help shape the future of {tapri.title}.</p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                         <Button size="lg" className={`${primaryColor ? `bg-${primaryColor}-600 hover:bg-${primaryColor}-700` : `bg-primary`} text-white px-8 rounded-full`} asChild>
                            <a href={tapri.website || `mailto:${tapri.profiles?.email || ''}?subject=Joining%20${tapri.title}`} target="_blank" rel="noopener noreferrer">
                                <Star className="mr-2 h-5 w-5"/> Apply Now
                            </a>
                        </Button>
                        <Button size="lg" variant="outline" className={`rounded-full border-gray-600 text-gray-300 hover:border-gray-400 hover:text-white`} asChild>
                            <a href={`mailto:${tapri.profiles?.email || ''}?subject=Question%20about%20${tapri.title}`} target="_blank" rel="noopener noreferrer">
                               <Mail className="mr-2 h-5 w-5"/> Contact Creator
                            </a>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}

// Ensure the page is dynamically rendered to always fetch the latest data on request
export const dynamic = 'force-dynamic';
