import Link from "next/link"
import Image from "next/image"
import { notFound, redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Progress } from "@/components/ui/progress"
import { Header } from "@/components/Header"
import { TapriService } from "@/lib/services/tapri-service"
import { motion } from "framer-motion"
import { MapPin, Users, Briefcase, Target, Zap, CheckCircle, Circle, Mail, Globe, Star } from "lucide-react"

interface TapriData {
  id: string
  title: string
  tagline: string | null
  description: string
  category: string
  stage: string
  location: string
  team_size: number
  open_positions: number
  website: string | null
  banner_url: string | null
  logo_url: string | null
  mission: string | null
  vision: string | null
  status: string
  required_skills: string[] | null
  commitment_level: string
  views: number
  applications: number
  primaryColor: string
}

interface TapriDetailPageProps {
  params: { slug: string }
}

export default async function TapriDetailPage({ params }: TapriDetailPageProps) {
  if (!params?.slug) {
    console.error('Missing slug in params')
    notFound()
  }

  let tapri: TapriData | null = null
  try {
    const { data } = await TapriService.getTapriBySlug(params.slug)
    if (!data) {
      console.error('No data found for slug:', params.slug)
      notFound()
    }
    // Redirect if slug is title-based and not UUID
    if (!isUUID(params.slug) && data.id) {
      redirect(`/tapris/${data.id}`)
    }
    tapri = convertDatabaseTapri(data)
  } catch (error) {
    console.error('Error fetching tapri:', error)
    notFound()
  }

  if (!tapri) {
    console.error('Tapri not found for slug:', params.slug)
    notFound()
  }

  const getStatusColor = (status: string): string => {
    switch (status.toLowerCase()) {
      case 'approved': return `bg-${tapri.primaryColor}-500/20 text-${tapri.primaryColor}-400`
      case 'pending': return `bg-${tapri.primaryColor}-600/20 text-${tapri.primaryColor}-500`
      case 'rejected': return `bg-red-600/20 text-red-500`
      default: return 'bg-gray-700 text-gray-400'
    }
  }

  const milestones = [
    { title: 'Vibe Check ✅', description: 'Kicked off with max energy', completed: tapri.stage !== 'idea', dueDate: 'Dec 2024' },
    { title: 'MVP Drop', description: 'Dropping the hottest features soon', completed: tapri.stage === 'mvp-development' || tapri.stage === 'beta-testing' || tapri.stage === 'launch-ready' || tapri.stage === 'scaling', dueDate: 'Dec 2025' },
    { title: 'Global Domination', description: 'Taking over the world, no cap', completed: tapri.stage === 'scaling', dueDate: 'June 2026' },
  ]

  const teamMembers = [
    { name: 'Creator', role: 'Chief Vibe Officer', bio: 'Leading the squad with 💯 energy.', image: '/placeholder.svg?height=120&width=120' },
    { name: 'TBD', role: 'Hustler', bio: tapri.open_positions > 0 ? `Join us! ${tapri.open_positions} spots open.` : 'Crew complete!', image: '/placeholder.svg?height=120&width=120' },
  ]

  const openRoles = tapri.required_skills?.map((skill, i) => ({
    title: `${skill} Rockstar`,
    type: tapri.commitment_level || 'Flexible',
    description: `Bring your ${skill} skills to slay this project.`,
    skills: [skill],
  })) || []

  const testimonials = [
    { name: 'Hype Stan', role: 'Fan', quote: 'This project is straight fire! 🔥', image: '/placeholder.svg?height=120&width=120' },
  ]

  const progressPercentage = (milestones.filter((m) => m.completed).length / milestones.length) * 100

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white font-sans">
      <Header tapri={tapri} primaryColor={tapri.primaryColor} />

      <motion.section
        id="overview"
        className="relative w-full h-[90vh] flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <div className="absolute inset-0">
          <Image
            src={tapri.banner_url || '/placeholder.svg?height=700&width=1200'}
            alt={tapri.title}
            fill
            className="object-cover opacity-40 scale-110"
            priority
          />
          <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-${tapri.primaryColor}-900/30 to-transparent`} />
        </div>
        <div className="container px-4 md:px-6 text-center relative z-10">
          <motion.div
            className="relative inline-block"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <h1
              className={`text-5xl md:text-8xl font-extrabold text-${tapri.primaryColor}-400 drop-shadow-2xl glitch`}
              data-text={tapri.title}
            >
              {tapri.title}
            </h1>
          </motion.div>
          {tapri.tagline && (
            <motion.p
              className="text-xl md:text-3xl text-gray-200 mt-4 mb-6 max-w-3xl mx-auto font-light"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {tapri.tagline}
            </motion.p>
          )}
          <motion.p
            className="text-lg text-gray-300 mt-2 max-w-2xl mx-auto"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            {tapri.description} 🚀
          </motion.p>
          <motion.div
            className="flex justify-center gap-4 mt-6"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <Badge className={`${getStatusColor(tapri.status)} font-semibold px-4 py-1 text-sm animate-pulse`}>
              {tapri.status === 'approved' ? 'Live! 🔥' : tapri.status.toUpperCase()}
            </Badge>
            <Badge variant="outline" className={`border-${tapri.primaryColor}-500 text-${tapri.primaryColor}-400 bg-${tapri.primaryColor}-500/10`}>
              {tapri.category} Vibes
            </Badge>
          </motion.div>
          <motion.div
            className="flex justify-center gap-6 mt-8"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
          >
            {tapri.website && (
              <a href={tapri.website} target="_blank" rel="noopener noreferrer">
                <Button
                  className={`bg-${tapri.primaryColor}-600 hover:bg-${tapri.primaryColor}-700 text-white px-10 py-4 text-lg rounded-full transform hover:scale-110 transition-transform shadow-lg`}
                >
                  Join Project 😎
                </Button>
              </a>
            )}
            <Link href="#contact">
              <Button
                variant="outline"
                className={`border-${tapri.primaryColor}-500 text-${tapri.primaryColor}-400 hover:bg-${tapri.primaryColor}-500/20 px-10 py-4 text-lg rounded-full transform hover:scale-110 transition-transform`}
              >
                Hit Us Up
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        className="w-full py-12 bg-gray-900/70 backdrop-blur-sm"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <motion.div initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2 }}>
              <div className={`text-5xl font-extrabold text-${tapri.primaryColor}-400 animate-bounce`}>{tapri.views || 0}K+</div>
              <div className="text-sm text-gray-400">Eyeballs 👀</div>
            </motion.div>
            <motion.div initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3 }}>
              <div className={`text-5xl font-extrabold text-${tapri.primaryColor}-400 animate-bounce`}>{tapri.applications || 0}+</div>
              <div className="text-sm text-gray-400">Applications 📩</div>
            </motion.div>
            <motion.div initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ delay: 0.4 }}>
              <div className={`text-5xl font-extrabold text-${tapri.primaryColor}-400 animate-bounce`}>{tapri.team_size || 1}+</div>
              <div className="text-sm text-gray-400">Crew 😎</div>
            </motion.div>
            <motion.div initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ delay: 0.5 }}>
              <div className={`text-5xl font-extrabold text-${tapri.primaryColor}-400 animate-bounce`}>{tapri.open_positions || 0}+</div>
              <div className="text-sm text-gray-400">Open Gigs 💼</div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section
        id="about"
        className="w-full py-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="container px-4 md:px-6">
          <h2 className={`text-4xl md:text-5xl font-bold text-center mb-12 text-${tapri.primaryColor}-400 animate-pulse`}>
            Who We Are 🫶
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              className="space-y-6"
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <p className="text-lg text-gray-300 leading-relaxed">{tapri.description}</p>
              {tapri.mission && (
                <div>
                  <h3 className={`text-xl font-semibold text-${tapri.primaryColor}-400`}>Our Mission</h3>
                  <p className="text-gray-400">{tapri.mission}</p>
                </div>
              )}
              {tapri.vision && (
                <div>
                  <h3 className={`text-xl font-semibold text-${tapri.primaryColor}-400`}>Our Vision</h3>
                  <p className="text-gray-400">{tapri.vision}</p>
                </div>
              )}
              <div>
                <h3 className={`text-xl font-semibold text-${tapri.primaryColor}-400`}>Deets</h3>
                <p className="text-gray-400">Stage: {tapri.stage || 'Idea'}</p>
                <p className="text-gray-400">Location: {tapri.location || 'Remote'}</p>
                <p className="text-gray-400">Commitment: {tapri.commitment_level || 'Flexible'}</p>
              </div>
            </motion.div>
            <motion.div
              className="relative h-96 rounded-2xl overflow-hidden shadow-2xl"
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <Image
                src={tapri.banner_url || '/placeholder.svg?height=700&width=1200'}
                alt="About Us"
                fill
                className="object-cover opacity-80"
              />
              <div className={`absolute inset-0 bg-gradient-to-r from-${tapri.primaryColor}-500/40 to-transparent`} />
              <div className="absolute bottom-4 left-4 text-white">
                <p className="text-lg font-bold">Ready to Join the Hype? 😎</p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section
        id="roles"
        className="w-full py-16 bg-gray-900/70"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="container px-4 md:px-6">
          <h2 className={`text-4xl md:text-5xl font-bold text-center mb-12 text-${tapri.primaryColor}-400 animate-pulse`}>
            Join the Glow-Up 💼
          </h2>
          {openRoles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {openRoles.map((role, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                >
                  <Card className="bg-gray-800 border-none shadow-2xl hover:scale-105 transition-transform rounded-2xl">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold">{role.title}</CardTitle>
                      <Badge variant="outline" className={`border-${tapri.primaryColor}-500 text-${tapri.primaryColor}-400 bg-${tapri.primaryColor}-500/10`}>
                        {role.type}
                      </Badge>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-gray-400">{role.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {role.skills.map((skill, i) => (
                          <Badge key={i} variant="secondary" className="bg-gray-700 text-gray-300 rounded-full">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      {tapri.website && (
                        <a href={tapri.website} target="_blank" rel="noopener noreferrer">
                          <Button
                            className={`w-full bg-${tapri.primaryColor}-600 hover:bg-${tapri.primaryColor}-700 rounded-full transform hover:scale-105 transition-transform`}
                          >
                            Apply Now ✨
                          </Button>
                        </a>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400">No open roles yet, but stay tuned! 👀</p>
          )}
        </div>
      </motion.section>

      <motion.section
        id="roadmap"
        className="w-full py-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="container px-4 md:px-6">
          <h2 className={`text-4xl md:text-5xl font-bold text-center mb-12 text-${tapri.primaryColor}-400 animate-pulse`}>
            Our Glow-Up Plan 🌟
          </h2>
          <Progress
            value={progressPercentage}
            className={`h-4 bg-gray-700 mb-8 rounded-full`}
            indicatorClassName={`bg-${tapri.primaryColor}-500 rounded-full`}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
              >
                <Card className="bg-gray-800 border-none shadow-2xl hover:scale-105 transition-transform rounded-2xl">
                  <CardContent className="p-6 flex items-start gap-4">
                    {milestone.completed ? (
                      <CheckCircle className={`h-6 w-6 text-${tapri.primaryColor}-400 animate-pulse`} />
                    ) : (
                      <Circle className="h-6 w-6 text-gray-600" />
                    )}
                    <div>
                      <h4 className="font-semibold text-gray-300 text-lg">{milestone.title}</h4>
                      <p className="text-sm text-gray-400">{milestone.description}</p>
                      {milestone.dueDate && (
                        <p className="text-xs text-gray-500 mt-1">Dropping: {milestone.dueDate}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        id="contact"
        className="w-full py-16 bg-gray-900/70"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="container px-4 md:px-6">
          <h2 className={`text-4xl md:text-5xl font-bold text-center mb-12 text-${tapri.primaryColor}-400 animate-pulse`}>
            Slide into Our DMs 📩
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <h3 className="text-2xl font-semibold mb-6">Connect with Us</h3>
              <p className="text-gray-400 flex items-center gap-2 mb-4">
                <Mail className="h-5 w-5" />
                <a href="mailto:contact@go-tapri.com">contact@go-tapri.com</a>
              </p>
              {tapri.website && (
                <p className="text-gray-400 flex items-center gap-2 mb-4">
                  <Globe className="h-5 w-5" />
                  <a href={tapri.website} target="_blank" rel="noopener noreferrer">{tapri.website}</a>
                </p>
              )}
              <p className="text-gray-400 flex items-center gap-2 mb-4">
                <MapPin className="h-5 w-5" />
                {tapri.location || 'Remote, Worldwide 🌍'}
              </p>
            </motion.div>
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <Card className="bg-gray-800 border-none shadow-2xl rounded-2xl">
                <CardHeader>
                  <CardTitle className={`text-xl font-semibold text-${tapri.primaryColor}-400`}>Drop a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 mb-4">Got ideas or wanna collab? Let’s make it pop! 💥</p>
                  <a href="mailto:contact@go-tapri.com">
                    <Button
                      className={`w-full bg-${tapri.primaryColor}-600 hover:bg-${tapri.primaryColor}-700 rounded-full transform hover:scale-105 transition-transform`}
                    >
                      Send the Tea ☕
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <footer className="w-full py-12 bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="relative h-12 w-12 mb-4 rounded-full overflow-hidden">
                <Image
                  src={tapri.logo_url || '/placeholder.svg?height=120&width=120'}
                  alt={`${tapri.title} logo`}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className={`text-lg font-semibold text-${tapri.primaryColor}-400`}>{tapri.title}</h3>
              <p className="text-sm text-gray-400 mt-2">{tapri.tagline || tapri.description}</p>
            </div>
            <div>
              <h3 className={`text-lg font-semibold text-${tapri.primaryColor}-400`}>Quick Links</h3>
              <div className="flex flex-col gap-2 mt-2">
                <Link href="#overview" className={`text-sm text-gray-400 hover:text-${tapri.primaryColor}-400`}>Overview</Link>
                <Link href="#roles" className={`text-sm text-gray-400 hover:text-${tapri.primaryColor}-400`}>Roles</Link>
                <Link href="#contact" className={`text-sm text-gray-400 hover:text-${tapri.primaryColor}-400`}>Contact</Link>
              </div>
            </div>
            <div>
              <h3 className={`text-lg font-semibold text-${tapri.primaryColor}-400`}>Vibes</h3>
              <div className="flex flex-col gap-2 mt-2">
                <a href="#contact" className={`text-sm text-gray-400 hover:text-${tapri.primaryColor}-400`}>Join the Hype</a>
              </div>
            </div>
            <div>
              <h3 className={`text-lg font-semibold text-${tapri.primaryColor}-400`}>Deets</h3>
              <p className="text-sm text-gray-400 flex items-center gap-2 mt-2">
                <Star className="h-4 w-4" />
                Launched June 2025
              </p>
              <p className="text-sm text-gray-400 flex items-center gap-2 mt-2">
                <Zap className="h-4 w-4" />
                Building the Future
              </p>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-gray-500">
            © 2025 {tapri.title}. All rights reserved. Made with 💖 by the Tapri Crew.
          </div>
        </div>
      </footer>
    </div>
  )
}

function isUUID(slug: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  return uuidRegex.test(slug)
}

function convertDatabaseTapri(dbTapri: any): TapriData {
  const category = dbTapri.category || 'startup'
  const getCategoryColor = (cat: string): string => {
    switch (cat.toLowerCase()) {
      case 'web-development': return 'blue'
      case 'mobile-app': return 'green'
      case 'ai-ml': return 'purple'
      case 'blockchain': return 'cyan'
      case 'fintech': return 'yellow'
      case 'healthtech': return 'red'
      case 'edtech': return 'pink'
      default: return 'gray'
    }
  }

  return {
    id: dbTapri.id || '',
    title: dbTapri.title || 'Untitled Project',
    tagline: dbTapri.tagline || null,
    description: dbTapri.description || 'A startup that’s about to blow up. Join the vibe! 😎',
    category: category,
    stage: dbTapri.stage || 'idea',
    location: dbTapri.location || 'Remote',
    team_size: dbTapri.team_size || 1,
    open_positions: dbTapri.open_positions || 0,
    website: dbTapri.website || null,
    banner_url: dbTapri.banner_url || null,
    logo_url: dbTapri.logo_url || null,
    mission: dbTapri.mission || null,
    vision: dbTapri.vision || null,
    status: dbTapri.status || 'pending',
    required_skills: dbTapri.required_skills || null,
    commitment_level: dbTapri.commitment_level || 'part-time',
    views: dbTapri.views || 0,
    applications: dbTapri.applications || 0,
    primaryColor: getCategoryColor(category),
  }
}

export async function generateStaticParams() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('tapris')
    .select('id, title')
    .eq('status', 'approved')

  if (error) {
    console.error('Supabase error in generateStaticParams:', error.message)
    return []
  }

  return data?.map((tapri) => ({
    slug: tapri.id,
  })) || []
}
