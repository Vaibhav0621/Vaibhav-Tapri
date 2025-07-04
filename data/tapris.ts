export interface TapriProject {
  id: string
  title: string
  tagline: string
  description: string
  fullDescription: string
  category: string
  stage: string
  location: string
  teamSize: number
  openPositions: number
  website?: string
  bannerImage: string
  logoImage: string
  status: "active" | "recruiting" | "launching" | "completed"
  views: number
  applications: number
  createdAt: string
  requiredSkills: string[]

  // Detailed information
  mission: string
  vision: string
  problemStatement: string
  solution: string
  targetAudience: string
  businessModel: string

  // Current work and future plans
  currentTasks: string[]
  futurePlans: string[]
  milestones: { title: string; description: string; completed: boolean; dueDate?: string }[]

  // Team information
  teamLeader: {
    name: string
    role: string
    bio: string
    image: string
    linkedin?: string
    twitter?: string
    achievements: string[]
  }

  teamMembers: {
    name: string
    role: string
    bio: string
    image: string
    linkedin?: string
    isCore: boolean
  }[]

  // Open positions
  openRoles: {
    id: string
    title: string
    type: "Technical" | "Design" | "Business" | "Marketing" | "Operations"
    experienceLevel: "Entry" | "Mid-level" | "Senior" | "Lead"
    description: string
    responsibilities: string[]
    requirements: string[]
    skills: string[]
    timeCommitment: string
    compensation?: string
  }[]

  // Requirements and benefits
  eligibilityCriteria: string[]
  benefits: string[]
  learningOutcomes: string[]

  // Metrics and achievements
  metrics: {
    funding?: string
    revenue?: string
    users?: string
    growth?: string
    partnerships?: number
  }

  // Media and resources
  gallery: string[]
  documents: { name: string; url: string; type: string }[]

  // Contact and application
  applicationProcess: string[]
  contactEmail: string
  applicationFormUrl: string
}

export const tapriProjects: TapriProject[] = [
  {
    id: "ai-edtech-platform",
    title: "AI-Powered EdTech Platform",
    tagline: "Revolutionizing Education Through Artificial Intelligence",
    description:
      "Building the next generation of personalized learning experiences using cutting-edge AI technology. Our platform adapts to each student's learning style, pace, and preferences.",
    fullDescription:
      "We're developing an innovative AI-powered educational platform that personalizes learning experiences for students worldwide. Using advanced machine learning algorithms, natural language processing, and adaptive learning techniques, our platform creates unique learning paths for each student.",
    category: "EdTech",
    stage: "MVP Development",
    location: "Remote",
    teamSize: 12,
    openPositions: 4,
    website: "https://aiedtech.example.com",
    bannerImage: "/images/web-development.jpeg",
    logoImage: "/images/college-illustration.jpeg",
    status: "recruiting",
    views: 2847,
    applications: 89,
    createdAt: "2024-01-15",
    requiredSkills: ["React", "Node.js", "AI/ML", "Python", "TypeScript"],

    mission: "To democratize quality education worldwide by making personalized learning accessible to every student.",
    vision: "A world where every learner can reach their full potential through AI-powered, adaptive education.",
    problemStatement:
      "Traditional education systems fail to address individual learning differences, leading to poor engagement.",
    solution:
      "An AI-powered platform that creates personalized learning experiences and adapts to individual learning styles.",
    targetAudience: "K-12 students, college students, adult learners, and educational institutions.",
    businessModel: "Freemium SaaS model with institutional licensing and premium features.",

    currentTasks: [
      "Developing AI recommendation engine for personalized learning paths",
      "Building interactive content creation tools for educators",
      "Implementing real-time progress tracking and analytics dashboard",
      "Creating mobile app for seamless learning on-the-go",
      "Conducting user testing with pilot schools",
    ],

    futurePlans: [
      "Launch beta version with 100 pilot schools by Q2 2024",
      "Integrate VR/AR capabilities for immersive learning experiences",
      "Expand to international markets starting with Southeast Asia",
      "Develop AI tutoring chatbot with natural language processing",
      "Partner with major educational publishers for content integration",
    ],

    milestones: [
      { title: "MVP Development", description: "Complete core platform features", completed: true },
      { title: "Pilot Program", description: "Launch with 10 schools", completed: true },
      { title: "Beta Release", description: "Public beta with 100 schools", completed: false, dueDate: "2024-06-30" },
      { title: "Series A Funding", description: "Raise $5M for scaling", completed: false, dueDate: "2024-09-30" },
    ],

    teamLeader: {
      name: "Sarah Chen",
      role: "CEO & Co-founder",
      bio: "Former Google Product Manager with 8 years in EdTech. Led teams that built educational tools used by millions of students worldwide.",
      image: "/images/soft-skills.jpeg",
      linkedin: "https://linkedin.com/in/sarahchen",
      twitter: "https://twitter.com/sarahchen",
      achievements: [
        "Led product team for Google Classroom (50M+ users)",
        "Featured in Forbes 30 Under 30 for Education",
        "TEDx speaker on 'The Future of Personalized Learning'",
        "Published researcher in AI and Education",
      ],
    },

    teamMembers: [
      {
        name: "Michael Rodriguez",
        role: "CTO & Co-founder",
        bio: "Ex-Microsoft engineer specializing in AI/ML. MIT graduate with expertise in machine learning and educational technology.",
        image: "/images/automation-robot.jpeg",
        linkedin: "https://linkedin.com/in/michaelrodriguez",
        isCore: true,
      },
      {
        name: "Dr. Emily Watson",
        role: "Head of Education",
        bio: "Former university professor with 15 years in curriculum design and educational psychology.",
        image: "/images/college-counseling.jpeg",
        linkedin: "https://linkedin.com/in/emilywatson",
        isCore: true,
      },
    ],

    openRoles: [
      {
        id: "fullstack-dev",
        title: "Full-Stack Developer",
        type: "Technical",
        experienceLevel: "Mid-level",
        description:
          "Join our engineering team to build scalable web applications and APIs that power personalized learning experiences.",
        responsibilities: [
          "Develop and maintain React-based frontend applications",
          "Build robust Node.js backend services and APIs",
          "Implement AI/ML model integration",
          "Optimize application performance and scalability",
          "Collaborate with design and product teams",
        ],
        requirements: [
          "3+ years of full-stack development experience",
          "Proficiency in React, Node.js, and TypeScript",
          "Experience with cloud platforms (AWS/GCP)",
          "Understanding of database design and optimization",
          "Strong problem-solving and communication skills",
        ],
        skills: ["React", "Node.js", "TypeScript", "PostgreSQL", "AWS", "Docker"],
        timeCommitment: "Full-time",
        compensation: "Competitive salary + equity",
      },
    ],

    eligibilityCriteria: [
      "Passionate about education and technology",
      "Strong problem-solving and analytical skills",
      "Excellent communication and teamwork abilities",
      "Previous startup or fast-paced environment experience preferred",
      "Bachelor's degree in relevant field or equivalent experience",
    ],

    benefits: [
      "Competitive salary and equity package",
      "Flexible remote work options",
      "Professional development budget",
      "Health and wellness benefits",
      "Opportunity to impact millions of students",
      "Work with cutting-edge AI technology",
    ],

    learningOutcomes: [
      "Gain experience in AI/ML product development",
      "Learn about educational technology and pedagogy",
      "Develop skills in scalable system architecture",
      "Experience in startup growth and scaling",
      "Build expertise in user-centered design",
    ],

    metrics: {
      funding: "$2.5M",
      users: "10,000+",
      growth: "150% MoM",
      partnerships: 25,
    },

    gallery: ["/images/web-development.jpeg", "/images/college-illustration.jpeg", "/images/soft-skills.jpeg"],

    documents: [
      { name: "Product Roadmap", url: "#", type: "PDF" },
      { name: "Technical Architecture", url: "#", type: "PDF" },
      { name: "Market Research", url: "#", type: "PDF" },
    ],

    applicationProcess: [
      "Submit application through our form",
      "Initial screening call (30 minutes)",
      "Technical/domain-specific interview",
      "Team fit interview with founders",
      "Reference checks and offer",
    ],

    contactEmail: "join@aiedtech.com",
    applicationFormUrl: "https://forms.google.com/aiedtech-application",
  },
  // Add 9 more similar projects with the same structure...
  // (I'll add a few more for demonstration)
  {
    id: "sustainable-energy-platform",
    title: "GreenTech Energy Solutions",
    tagline: "Sustainable Energy Management for Smart Homes",
    description:
      "Revolutionary solar energy management system that optimizes residential energy consumption using IoT sensors and AI-powered analytics.",
    fullDescription:
      "We're building an intelligent energy management platform that helps homeowners maximize their solar energy efficiency while reducing costs.",
    category: "CleanTech",
    stage: "Prototype",
    location: "San Francisco, CA",
    teamSize: 8,
    openPositions: 3,
    bannerImage: "/images/automation-robot.jpeg",
    logoImage: "/images/web-development.jpeg",
    status: "active",
    views: 1923,
    applications: 67,
    createdAt: "2024-02-01",
    requiredSkills: ["IoT", "Python", "React", "Solar Energy", "Hardware"],

    mission:
      "To accelerate the transition to sustainable energy by making renewable energy systems smarter and more efficient.",
    vision: "A world powered entirely by clean, renewable energy where every home is energy-independent.",
    problemStatement: "Current solar energy systems are inefficient and lack intelligent management.",
    solution: "An AI-powered energy management platform that optimizes solar energy usage and reduces waste.",
    targetAudience: "Homeowners with solar installations, property developers, and energy companies.",
    businessModel: "Hardware + Software subscription model with installation services.",

    currentTasks: [
      "Developing IoT sensor network for energy monitoring",
      "Building AI algorithms for energy consumption prediction",
      "Creating mobile app for real-time energy management",
    ],

    futurePlans: [
      "Launch commercial product in California market",
      "Expand to other renewable energy sources",
      "Develop community energy sharing platform",
    ],

    milestones: [
      { title: "Prototype Development", description: "Build working prototype system", completed: true },
      { title: "Pilot Testing", description: "Test with 50 homes", completed: false, dueDate: "2024-05-31" },
    ],

    teamLeader: {
      name: "David Park",
      role: "CEO & Founder",
      bio: "Former Tesla engineer with 10 years in renewable energy systems.",
      image: "/images/automation-robot.jpeg",
      linkedin: "https://linkedin.com/in/davidpark",
      achievements: [
        "Led energy storage team at Tesla",
        "Patent holder for smart grid technology",
        "Clean Energy Innovation Award recipient",
      ],
    },

    teamMembers: [
      {
        name: "Lisa Zhang",
        role: "CTO",
        bio: "IoT and embedded systems expert with experience at Google Nest.",
        image: "/images/soft-skills.jpeg",
        linkedin: "https://linkedin.com/in/lisazhang",
        isCore: true,
      },
    ],

    openRoles: [
      {
        id: "iot-engineer",
        title: "IoT Systems Engineer",
        type: "Technical",
        experienceLevel: "Mid-level",
        description: "Design and develop IoT sensor networks for residential energy monitoring.",
        responsibilities: [
          "Develop IoT sensor hardware and firmware",
          "Design wireless communication protocols",
          "Implement edge computing solutions",
        ],
        requirements: [
          "3+ years of IoT development experience",
          "Proficiency in C/C++ and embedded systems",
          "Experience with wireless protocols",
        ],
        skills: ["C/C++", "IoT", "Embedded Systems", "Wireless Protocols"],
        timeCommitment: "Full-time",
      },
    ],

    eligibilityCriteria: [
      "Passion for sustainable energy and environmental impact",
      "Technical background in engineering or related field",
      "Experience with hardware/software integration",
    ],

    benefits: [
      "Competitive salary and equity",
      "Work on cutting-edge clean technology",
      "Flexible work arrangements",
      "Make a positive environmental impact",
    ],

    learningOutcomes: [
      "Expertise in renewable energy systems",
      "IoT and smart home technology skills",
      "Sustainable technology development",
    ],

    metrics: {
      funding: "$1.8M",
      users: "500+",
      growth: "200% QoQ",
    },

    gallery: ["/images/automation-robot.jpeg", "/images/web-development.jpeg"],
    documents: [],

    applicationProcess: [
      "Submit application with portfolio",
      "Technical screening interview",
      "On-site/virtual technical assessment",
      "Team interview and culture fit",
    ],

    contactEmail: "careers@greentech.com",
    applicationFormUrl: "https://forms.google.com/greentech-application",
  },
]

// Helper functions
export function getAllTapris(): TapriProject[] {
  return tapriProjects
}

export function getTapriById(id: string): TapriProject | undefined {
  return tapriProjects.find((tapri) => tapri.id === id)
}

export function filterTapris(filters: {
  category?: string
  stage?: string
  location?: string
  status?: string
}): TapriProject[] {
  return tapriProjects.filter((tapri) => {
    if (filters.category && filters.category !== "all" && tapri.category !== filters.category) {
      return false
    }
    if (filters.stage && filters.stage !== "all" && tapri.stage !== filters.stage) {
      return false
    }
    if (
      filters.location &&
      filters.location !== "all" &&
      !tapri.location.toLowerCase().includes(filters.location.toLowerCase())
    ) {
      return false
    }
    if (filters.status && filters.status !== "all" && tapri.status !== filters.status) {
      return false
    }
    return true
  })
}
