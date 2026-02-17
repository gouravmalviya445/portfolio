import {
  Code2,
  Layout,
  Server,
  Database,
  Wrench,
  Cpu,
  Github,
  Linkedin,
  Mail,
  Phone,
  ExternalLink,
  Code,
} from "lucide-react";
import { SkillGroup, Project, NavItem } from "../types";

export const NAV_ITEMS: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "Languages",
    skills: ["Go", "JavaScript/TypeScript", "Python", "C/C++", "SQL"],
    icon: "Code2",
  },
  {
    category: "Frontend",
    skills: ["React.js", "Next.js", "React Native", "Tailwind CSS"],
    icon: "Layout",
  },
  {
    category: "Backend",
    skills: ["Node.js (Express, NestJS)", "Go (Fiber/Gin)"],
    icon: "Server",
  },
  {
    category: "Backend Engineering",
    skills: [
      "RESTful API Design",
      "JWT Authentication",
      "RBAC",
      "Webhooks",
      "Transactional Systems",
    ],
    icon: "Cpu",
  },
  {
    category: "Databases",
    skills: ["PostgreSQL", "MongoDB", "MySQL", "Redis"],
    icon: "Database",
  },
  {
    category: "Tools",
    skills: ["Git", "Docker", "Postman"],
    icon: "Wrench",
  },
];

export const PROJECTS: Project[] = [
  {
    title: "Event Management System",
    stack: ["Node.js", "Go", "Next.js", "MongoDB", "Razorpay"],
    description:
      "A robust microservices-based system handling high-concurrency ticket bookings.",
    features: [
      "Microservices: Node.js (Auth), Go (Payments)",
      "5-minute seat reservation with transactional integrity",
      "Automated workers for unpaid reservation cleanup",
      "Razorpay webhook verification",
      "JWT + RBAC security",
    ],
    imageUrl: "https://res.cloudinary.com/dbqe9w6w0/image/upload/v1771334338/project_gatherly_piosav.png",
    links: {
      code: [
        {
          label: "Go Backend",
          url: "https://github.com/gouravmalviya445/event-booking-golang",
        },
        {
          label: "Node Backend",
          url: "https://github.com/gouravmalviya445/event-booking-node",
        },
        {
          label: "Frontend",
          url: "https://github.com/gouravmalviya445/event-booking-frontend",
        },
      ],
      live: "https://gatherly.gourav.site",
    },
  },
  {
    title: "PrepWise",
    stack: ["React.js", "Firebase", "Gemini API", "Vapi"],
    description:
      "AI-powered interview simulation platform for technical preparation.",
    features: [
      "AI interview simulation with voice interface",
      "Dynamic question generation based on user level",
      "Real-time performance feedback",
      "User management via Firebase",
    ],
    imageUrl: "https://res.cloudinary.com/dbqe9w6w0/image/upload/v1771334338/project_prepwise_tbowkm.png",
    links: {
      code: [
        {
          label: "GitHub",
          url: "https://github.com/gouravmalviya445/interview_prep_with_ai",
        },
      ],
      live: "https://prepwise.gourav.site",
    },
  },
  {
    title: "White Board",
    stack: ["React.js", "Socket.IO", "Canvas API"],
    description: "Collaborative real-time drawing tool for teams.",
    features: [
      "Real-time multi-user sync via WebSockets",
      "Advanced tools: Shapes, Text, Layer Management",
      "Infinite canvas with pan/zoom support",
      "Undo/Redo functionality",
    ],
    imageUrl: "https://res.cloudinary.com/dbqe9w6w0/image/upload/v1771334338/project_draw_pav5y9.png",
    links: {
      code: [
        {
          label: "Frontend",
          url: "https://github.com/gouravmalviya445/draw-frontend",
        },
        {
          label: "Backend",
          url: "https://github.com/gouravmalviya445/draw-backend",
        },
      ],
      live: "https://draw.gourav.site",
    },
  },
];

export const ICON_MAP: Record<string, any> = {
  Code2,
  Layout,
  Server,
  Database,
  Wrench,
  Cpu,
  Github,
  Linkedin,
  Mail,
  Phone,
  ExternalLink,
  Code,
};
