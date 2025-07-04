import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Target, Heart, Award, MapPin, Calendar, ExternalLink, Coffee } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function AboutPage() {
  const teamMembers = [
    {
      id: "founder-ceo",
      name: "Arjun Sharma",
      role: "Founder & CEO",
      bio: "Visionary entrepreneur with 8+ years in tech startups. Former product manager at Google with expertise in building collaborative platforms.",
      image: "/images/college-counseling.jpeg",
      skills: ["Product Strategy", "Team Leadership", "Startup Growth", "User Experience"],
      achievements: [
        "Built 3 successful startups",
        "Featured in Forbes 30 Under 30",
        "TEDx speaker on 'Future of Collaboration'",
        "Mentor to 50+ entrepreneurs",
      ],
      linkedin: "https://linkedin.com/in/arjunsharma",
      twitter: "https://twitter.com/arjunsharma",
      location: "San Francisco, CA",
      joinedDate: "2023-01-15",
    },
    {
      id: "cto",
      name: "Priya Patel",
      role: "Chief Technology Officer",
      bio: "Full-stack engineer and AI enthusiast. Former senior engineer at Microsoft with expertise in scalable systems and machine learning.",
      image: "/images/soft-skills.jpeg",
      skills: ["Full-Stack Development", "AI/ML", "System Architecture", "DevOps"],
      achievements: [
        "Led engineering teams of 20+ developers",
        "Published 15+ papers in AI conferences",
        "Open source contributor with 10k+ GitHub stars",
        "Women in Tech leadership award",
      ],
      linkedin: "https://linkedin.com/in/priyapatel",
      twitter: "https://twitter.com/priyapatel",
      location: "Bangalore, India",
      joinedDate: "2023-02-01",
    },
    {
      id: "head-design",
      name: "Marcus Johnson",
      role: "Head of Design",
      bio: "Creative designer with a passion for user-centered design. Former design lead at Airbnb with expertise in creating intuitive user experiences.",
      image: "/images/web-development.jpeg",
      skills: ["UI/UX Design", "Design Systems", "User Research", "Prototyping"],
      achievements: [
        "Designed products used by 100M+ users",
        "Design Excellence Award recipient",
        "Speaker at 20+ design conferences",
        "Mentor in design bootcamps",
      ],
      linkedin: "https://linkedin.com/in/marcusjohnson",
      location: "New York, NY",
      joinedDate: "2023-03-15",
    },
    {
      id: "head-community",
      name: "Sarah Kim",
      role: "Head of Community",
      bio: "Community builder and growth expert. Former community manager at Discord with expertise in building engaged online communities.",
      image: "/images/automation-robot.jpeg",
      skills: ["Community Building", "Growth Marketing", "Content Strategy", "Event Management"],
      achievements: [
        "Built communities with 500k+ members",
        "Community Excellence Award",
        "Organized 100+ virtual events",
        "Featured in Community Management publications",
      ],
      linkedin: "https://linkedin.com/in/sarahkim",
      location: "Austin, TX",
      joinedDate: "2023-04-01",
    },
  ]

  const coreValues = [
    {
      icon: <Users className="h-8 w-8" />,
      title: "Community First",
      description:
        "We believe in the power of community. Every feature we build strengthens connections between learners and creators.",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Quality Learning",
      description:
        "We're committed to providing high-quality, practical learning experiences that translate to real-world success.",
      color: "from-red-500 to-pink-500",
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Inclusive Innovation",
      description:
        "Innovation thrives in diverse environments. We welcome creators from all backgrounds and experience levels.",
      color: "from-green-500 to-emerald-500",
    },
  ]

  const milestones = [
    {
      date: "Jan 2023",
      title: "Tapri Founded",
      description: "Started with a vision to democratize collaboration and project creation",
      completed: true,
    },
    {
      date: "Mar 2023",
      title: "MVP Launch",
      description: "Launched our minimum viable product with core collaboration features",
      completed: true,
    },
    {
      date: "Jun 2023",
      title: "1000+ Users",
      description: "Reached our first milestone of 1000 active creators on the platform",
      completed: true,
    },
    {
      date: "Sep 2023",
      title: "Seed Funding",
      description: "Raised $2M in seed funding to accelerate platform development",
      completed: true,
    },
    {
      date: "Dec 2023",
      title: "100+ Projects",
      description: "Facilitated over 100 successful project collaborations",
      completed: true,
    },
    {
      date: "Mar 2024",
      title: "Global Expansion",
      description: "Expanding to serve creators in 50+ countries worldwide",
      completed: false,
    },
    {
      date: "Jun 2024",
      title: "AI Integration",
      description: "Launching AI-powered project matching and collaboration tools",
      completed: false,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Coffee className="h-4 w-4" />
            About Tapri
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-600 via-red-500 to-purple-600 bg-clip-text text-transparent">
            Where Ideas Come to Life
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Tapri is more than just a platform—it's a movement. We're building the future of collaborative learning and
            innovation, one project at a time.
          </p>
        </div>

        {/* Mission Section */}
        <div className="mb-20 bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-yellow-600 to-red-500 bg-clip-text text-transparent">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              To democratize learning and innovation by connecting passionate individuals who want to create, learn, and
              grow together.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {coreValues.map((value, index) => (
            <Card
              key={index}
              className="text-center border-2 border-transparent hover:shadow-xl transition-all duration-300"
            >
              <CardHeader>
                <div className={`mx-auto mb-4 p-3 bg-gradient-to-r ${value.color} rounded-full w-fit text-white`}>
                  {value.icon}
                </div>
                <CardTitle className="text-xl font-bold">{value.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Story Section */}
        <div className="bg-gradient-to-r from-yellow-600 via-red-500 to-purple-600 rounded-3xl p-8 text-white mb-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-lg mb-6 opacity-90">
              Tapri started with a simple observation: the best learning happens when passionate people come together to
              solve real problems. Traditional education often isolates learners, but we knew there was a better way.
            </p>
            <p className="text-lg opacity-90">
              Named after the Hindi word for a small tea stall where people gather to share ideas and stories, Tapri
              embodies the spirit of community, creativity, and collaboration that drives innovation forward.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <section className="py-16 bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-yellow-600 to-red-500 bg-clip-text text-transparent">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              The passionate individuals building the future of collaboration.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {teamMembers.map((member) => (
              <Card
                key={member.id}
                className="group hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-yellow-300 bg-white dark:bg-gray-700"
              >
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-2xl font-bold">{member.name}</h3>
                    <p className="text-lg opacity-90">{member.role}</p>
                  </div>
                </div>

                <CardContent className="p-6">
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">{member.bio}</p>

                  {/* Skills */}
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">Core Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {member.skills.map((skill, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-200"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Achievements */}
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">Key Achievements</h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                      {member.achievements.slice(0, 2).map((achievement, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Award className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {member.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Joined{" "}
                      {new Date(member.joinedDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="flex gap-2">
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="flex-1 bg-white dark:bg-gray-700 text-yellow-600 dark:text-yellow-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      <Link href={member.linkedin} target="_blank">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        LinkedIn
                      </Link>
                    </Button>
                    {member.twitter && (
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-white dark:bg-gray-700 text-yellow-600 dark:text-yellow-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                      >
                        <Link href={member.twitter} target="_blank">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Twitter
                        </Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Journey Timeline */}
        <section className="py-16 bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-yellow-600 to-red-500 bg-clip-text text-transparent">
              Our Journey
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Key milestones in building the future of collaboration.
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-yellow-500 to-red-500 rounded-full" />

            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}>
                    <Card
                      className={`${milestone.completed ? "bg-gradient-to-br from-green-50 to-emerald-50 border-green-200" : "bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200"} hover:shadow-lg transition-all duration-300`}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-2 justify-between">
                          <Badge
                            variant={milestone.completed ? "default" : "secondary"}
                            className={milestone.completed ? "bg-green-500" : ""}
                          >
                            {milestone.date}
                          </Badge>
                          {milestone.completed && <Award className="h-5 w-5 text-green-500" />}
                        </div>
                        <CardTitle className="text-lg">{milestone.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 dark:text-gray-300">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Timeline Dot */}
                  <div
                    className={`w-6 h-6 rounded-full border-4 border-white ${milestone.completed ? "bg-green-500" : "bg-gray-400"} shadow-lg z-10`}
                  />

                  <div className="w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-yellow-600 to-red-500 bg-clip-text text-transparent">
            Ready to Join Our Community?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Whether you're looking to learn new skills, share your expertise, or build the next big thing, Tapri is your
            launchpad.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-yellow-600 to-red-500 hover:from-yellow-700 hover:to-red-600 text-white"
            >
              <Link href="/create-project">Start Your Journey</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-yellow-600 text-yellow-700 hover:bg-yellow-50 dark:hover:bg-yellow-950/20"
            >
              <Link href="/tapris">Explore Projects</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
