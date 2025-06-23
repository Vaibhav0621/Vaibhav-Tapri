import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Progress } from "@/components/ui/progress"
import { Header } from "@/components/Header"
import { TapriService } from "@/lib/services/tapri-service"
import { motion } from "framer-motion"
import {
  MapPin,
  Users,
  Briefcase,
  Target,
  Zap,
  CheckCircle,
  Circle,
  Mail,
  Globe,
  Star,
} from "lucide-react"

interface TapriData {
  id: string
  siteName: string
  title: string
  description: string
  category: string
  bannerImage: string
  logoImage: string
  status: string
  primaryColor: string
}

interface TapriDetailPageProps {
  params: {
    id: string
  }
}

export default async function TapriDetailPage({ params }: TapriDetailPageProps) {
  if (!params?.id) {
    console.error('Missing ID in params')
    notFound()
  }

  let tapri: TapriData | null = null
  try {
    const { data } = await TapriService.getTapriById(params.id)
    tapri = data ? convertDatabaseTapri(data) : null
  } catch (error) {
    console.error('Error fetching tapri:', error)
  }

  if (!tapri) {
    console.error('Tapri not found for ID:', params.id)
    notFound()
  }

  const getStatusColor = (status: string): string => {
    switch (status.toLowerCase()) {
      case 'active': return `bg-${tapri.primaryColor}-500/20 text-${tapri.primaryColor}-400`
      case 'recruiting': return `bg-${tapri.primaryColor}-600/20 text-${tapri.primaryColor}-500`
      case 'launching': return `bg-${tapri.primaryColor}-700/20 text-${tapri.primaryColor}-600`
      default: return 'bg-gray-700 text-gray-400'
    }
  }

  const milestones = [
    { title: 'Vibe Check ✅', description: 'Kicked off with max energy', completed: true },
    { title: 'MVP Drop', description: 'Dropping the hottest features soon', completed: false, dueDate: 'Dec 2025' },
    { title: 'Global Domination', description: 'Taking over the world, no cap', completed: false, dueDate: 'June 2026' },
  ]

  const teamMembers = [
    { name: 'Zoe Sparks', role: 'Chief Vibe Officer', bio: 'Keeping the energy 💯.', image: '/placeholder.svg?height=120&width=120' },
    { name: 'Kai Blaze', role: 'Tech Wizard 🧙‍♂️', bio: 'Coding bangers.', image: '/placeholder.svg?height=120&width=120' },
  ]

  const openRoles = [
    { title: 'Frontend Rockstar', type: 'Full-time', description: 'Build lit UIs.', skills: ['React', 'Tailwind', 'Vibes'] },
    { title: 'Meme Marketing Guru', type: 'Part-time', description: 'Create viral content 🔥.', skills: ['TikTok', 'Memes', 'Clout'] },
  ]

  const testimonials = [
    { name: 'Riley Hype', role: 'Stan', quote: 'This startup is giving main character energy! 😍', image: '/placeholder.svg?height=120&width=120' },
    { name: 'Jordan Flex', role: 'Hypebeast', quote: 'No cap, this is the future. 🏆', image: '/placeholder.svg?height=120&width=120' },
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
            src={tapri.bannerImage}
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
          <motion.p
            className="text-xl md:text-3xl text-gray-200 mt-6 mb-8 max-w-3xl mx-auto font-light"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {tapri.description} 🚀
          </motion.p>
          <motion.div
            className="flex justify-center gap-4 mb-8"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <Badge className={`${getStatusColor(tapri.status)} font-semibold px-4 py-1 text-sm animate-pulse`}>
              {tapri.status === 'recruiting' ? 'Hiring RN! 🔥' : tapri.status.toUpperCase()}
            </Badge>
            <Badge variant="outline" className={`border-${tapri.primaryColor}-500 text-${tapri.primaryColor}-400 bg-${tapri.primaryColor}-500/10`}>
              {tapri.category} Vibes
            </Badge>
          </motion.div>
          <motion.div
            className="flex justify-center gap-6"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <Link href="#contact">
              <Button
                className={`bg-${tapri.primaryColor}-600 hover:bg-${tapri.primaryColor}-700 text-white px-10 py-4 text-lg rounded-full transform hover:scale-110 transition-transform shadow-lg`}
              >
                Hit Us Up 😎
              </Button>
            </Link>
            <Link href="#roles">
              <Button
                variant="outline"
                className={`border-${tapri.primaryColor}-500 text-${tapri.primaryColor}-400 hover:bg-${tapri.primaryColor}-500/20 px-10 py-4 text-lg rounded-full transform hover:scale-110 transition-transform`}
              >
                Join the Squad
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
              <div className={`text-5xl font-extrabold text-${tapri.primaryColor}-400 animate-bounce`}>1K+</div>
              <div className="text-sm text-gray-400">Eyeballs 👀</div>
            </motion.div>
            <motion.div initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3 }}>
              <div className={`text-5xl font-extrabold text-${tapri.primaryColor}-400 animate-bounce`}>50+</div>
              <div className="text-sm text-gray-400">Applications 📩</div>
            </motion.div>
            <motion.div initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ delay: 0.4 }}>
              <div className={`text-5xl font-extrabold text-${tapri.primaryColor}-400 animate-bounce`}>5+</div>
              <div className="text-sm text-gray-400">Crew 😎</div>
            </motion.div>
            <motion.div initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ delay: 0.5 }}>
              <div className={`text-5xl font-extrabold text-${tapri.primaryColor}-400 animate-bounce`}>2+</div>
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
              <div>
                <h3 className={`text-xl font-semibold text-${tapri.primaryColor}-400`}>Our Vibe</h3>
                <p className="text-gray-400">We’re here to shake things up and build something iconic. No boring stuff, just pure 🔥.</p>
              </div>
              <div>
                <h3 className={`text-xl font-semibold text-${tapri.primaryColor}-400`}>Our Goal</h3>
                <p className="text-gray-400">Slay the game and make the world stan our vision. Join the revolution! 🚀</p>
              </div>
            </motion.div>
            <motion.div
              className="relative h-96 rounded-2xl overflow-hidden shadow-2xl"
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <Image src={tapri.bannerImage} alt="About Us" fill className="object-cover opacity-80" />
              <div className={`absolute inset-0 bg-gradient-to-r from-${tapri.primaryColor}-500/40 to-transparent`} />
              <div className="absolute bottom-4 left-4 text-white">
                <p className="text-lg font-bold">Ready to Join the Hype? 😎</p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section
        id="services"
        className="w-full py-16 bg-gray-900/70"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="container px-4 md:px-6">
          <h2 className={`text-4xl md:text-5xl font-bold text-center mb-12 text-${tapri.primaryColor}-400 animate-pulse`}>
            What We Bring to the Table 🍽️
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Card className="bg-gray-800 border-none shadow-2xl hover:scale-105 transition-transform rounded-2xl">
                <CardHeader>
                  <CardTitle className={`text-xl font-semibold text-${tapri.primaryColor}-400 flex items-center gap-2`}>
                    <Target className="h-6 w-6 animate-spin-slow" />
                    Big Brain Solutions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">Cooking up next-level tech to solve real problems. 😋</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <Card className="bg-gray-800 border-none shadow-2xl hover:scale-105 transition-transform rounded-2xl">
                <CardHeader>
                  <CardTitle className={`text-xl font-semibold text-${tapri.primaryColor}-400 flex items-center gap-2`}>
                    <Briefcase className="h-6 w-6 animate-bounce" />
                    Hustle Mode
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">Growth, collabs, and keeping it 100. 📈</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <Card className="bg-gray-800 border-none shadow-2xl hover:scale-105 transition-transform rounded-2xl">
                <CardHeader>
                  <CardTitle className={`text-xl font-semibold text-${tapri.primaryColor}-400 flex items-center gap-2`}>
                    <Zap className="h-6 w-6 animate-pulse" />
                    Current Slay
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">Dropping bangers that pop off. 💥</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section
        id="team"
        className="w-full py-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="container px-4 md:px-6">
          <h2 className={`text-4xl md:text-5xl font-bold text-center mb-12 text-${tapri.primaryColor}-400 animate-pulse`}>
            Our Squad 😎
          </h2>
          <Tabs defaultValue="members" className="w-full">
            <TabsList className="flex w-full bg-gray-900 border-b border-gray-700 mb-8 rounded-xl">
              <TabsTrigger
                value="members"
                className={`flex-1 text-center py-4 text-lg font-semibold text-gray-300 data-[state=active]:text-${tapri.primaryColor}-400 data-[state=active]:border-b-4 data-[state=active]:border-${tapri.primaryColor}-400 rounded-t-lg`}
              >
                The Crew
              </TabsTrigger>
            </TabsList>
            <TabsContent value="members">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {teamMembers.map((member, index) => (
                  <motion.div
                    key={index}
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.2, duration: 0.6 }}
                  >
                    <Card className="bg-gray-800 border-none shadow-2xl hover:scale-105 transition-transform rounded-2xl overflow-hidden">
                      <CardContent className="p-6 text-center">
                        <div className="relative h-24 w-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-gray-700">
                          <Image src={member.image} alt={member.name} fill className="object-cover" />
                        </div>
                        <h3 className="text-xl font-semibold">{member.name}</h3>
                        <p className={`text-${tapri.primaryColor}-400 text-sm font-bold`}>{member.role}</p>
                        <p className="text-sm text-gray-400 mt-2">{member.bio}</p>
                        <Button
                          variant="outline"
                          className={`mt-4 border-${tapri.primaryColor}-500 text-${tapri.primaryColor}-400 hover:bg-${tapri.primaryColor}-500/20 rounded-full`}
                        >
                          Connect 🤙
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
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
                    <Link href="#contact">
                      <Button
                        className={`w-full bg-${tapri.primaryColor}-600 hover:bg-${tapri.primaryColor}-700 rounded-full transform hover:scale-105 transition-transform`}
                      >
                        Apply Now ✨
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
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
        id="gallery"
        className="w-full py-16 bg-gray-900/70"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="container px-4 md:px-6">
          <h2 className={`text-4xl md:text-5xl font-bold text-center mb-12 text-${tapri.primaryColor}-400 animate-pulse`}>
            Our Aesthetic 📸
          </h2>
          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {Array.from({ length: 4 }).map((_, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <motion.div
                    className="relative h-64 w-full rounded-2xl overflow-hidden shadow-xl"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image src={tapri.bannerImage} alt={`Vibe ${index + 1}`} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className={`bg-${tapri.primaryColor}-600 hover:bg-${tapri.primaryColor}-700 rounded-full`} />
            <CarouselNext className={`bg-${tapri.primaryColor}-600 hover:bg-${tapri.primaryColor}-700 rounded-full`} />
          </Carousel>
        </div>
      </motion.section>

      <motion.section
        id="testimonials"
        className="w-full py-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="container px-4 md:px-6">
          <h2 className={`text-4xl md:text-5xl font-bold text-center mb-12 text-${tapri.primaryColor}-400 animate-pulse`}>
            The Hype is Real 🗣️
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
              >
                <Card className="bg-gray-800 border-none shadow-2xl hover:scale-105 transition-transform rounded-2xl">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-gray-700">
                        <Image src={testimonial.image} alt={testimonial.name} fill className="object-cover" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-300">{testimonial.name}</h4>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-gray-400 italic">"{testimonial.quote}"</p>
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
              <p className="text-gray-400 flex items-center gap-2 mb-4">
                <Globe className="h-5 w-5" />
                <a href="https://go-tapri.vercel.app" target="_blank">go-tapri.vercel.app</a>
              </p>
              <p className="text-gray-400 flex items-center gap-2 mb-4">
                <MapPin className="h-5 w-5" />
                Remote, Worldwide 🌍
              </p>
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  className={`border-${tapri.primaryColor}-500 text-${tapri.primaryColor}-400 hover:bg-${tapri.primaryColor}-500/20 rounded-full`}
                >
                  Twitter 🐦
                </Button>
                <Button
                  variant="outline"
                  className={`border-${tapri.primaryColor}-500 text-${tapri.primaryColor}-400 hover:bg-${tapri.primaryColor}-500/20 rounded-full`}
                >
                  Discord 🎮
                </Button>
              </div>
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
                <Image src={tapri.logoImage} alt={`${tapri.title} logo`} fill className="object-cover" />
              </div>
              <h3 className={`text-lg font-semibold text-${tapri.primaryColor}-400`}>{tapri.title}</h3>
              <p className="text-sm text-gray-400 mt-2">{tapri.description}</p>
            </div>
            <div>
              <h3 className={`text-lg font-semibold text-${tapri.primaryColor}-400`}>Quick Links</h3>
              <div className="flex flex-col gap-2 mt-2">
                <Link href="#overview" className={`text-sm text-gray-400 hover:text-${tapri.primaryColor}-400`}>Overview</Link>
                <Link href="#team" className={`text-sm text-gray-400 hover:text-${tapri.primaryColor}-400`}>Team</Link>
                <Link href="#roles" className={`text-sm text-gray-400 hover:text-${tapri.primaryColor}-400`}>Roles</Link>
                <Link href="#contact" className={`text-sm text-gray-400 hover:text-${tapri.primaryColor}-400`}>Contact</Link>
              </div>
            </div>
            <div>
              <h3 className={`text-lg font-semibold text-${tapri.primaryColor}-400`}>Vibes</h3>
              <div className="flex flex-col gap-2 mt-2">
                <a href="#contact" className={`text-sm text-gray-400 hover:text-${tapri.primaryColor}-400`}>Join the Hype</a>
                <a href="#gallery" className={`text-sm text-gray-400 hover:text-${tapri.primaryColor}-400`}>Check the Aesthetic</a>
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

function convertDatabaseTapri(dbTapri: any): TapriData {
  const category = dbTapri.category || 'startup'
  const getCategoryColor = (cat: string): string => {
    switch (cat.toLowerCase()) {
      case 'startup': return 'pink'
      case 'technology': return 'blue'
      case 'community': return 'green'
      case 'non profit/ngo': return 'purple'
      default: return 'gray'
    }
  }

  return {
    id: dbTapri.id || '',
    siteName: dbTapri.site_name || 'untitled-project',
    title: dbTapri.title || 'Untitled Project',
    description: dbTapri.description || 'A startup that’s about to blow up. Join the vibe! 😎',
    category: category,
    bannerImage: dbTapri.banner_image || '/placeholder.svg?height=700&width=1200',
    logoImage: dbTapri.logo_image || '/placeholder.svg?height=120&width=120',
    status: dbTapri.status || 'recruiting',
    primaryColor: getCategoryColor(category),
  }
}
