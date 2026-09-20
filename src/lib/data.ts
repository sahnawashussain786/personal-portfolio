import {
  Code2,
  Database,
  Server,
  Wrench,
  Github,
  Linkedin,
  Twitter,
  type LucideIcon,
} from "lucide-react";

/* ---------------------------------- profile --------------------------------- */

export const profile = {
  name: "Hussain",
  firstName: "HUSSAIN",
  lastName: "",
  role: "Full-Stack Developer",
  tagline:
    "I build immersive, high-performance web experiences — pairing beautiful interfaces with backends that never blink.",
  email: "hello@hussain.dev",
  location: "San Francisco, CA",
  availability: "Available for new projects",
};

export type Social = { label: string; href: string; icon: LucideIcon };

export const socials: Social[] = [
  { label: "GitHub", href: "https://github.com", icon: Github },
  { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
  { label: "Twitter", href: "https://twitter.com", icon: Twitter },
];

/* ----------------------------------- stats ---------------------------------- */

export const stats = [
  { value: 5, suffix: "+", label: "Years of experience" },
  { value: 40, suffix: "+", label: "Projects shipped" },
  { value: 18, suffix: "", label: "Happy clients" },
  { value: 260, suffix: "k+", label: "Users reached" },
];

/* ---------------------------------- skills ---------------------------------- */

export type SkillCategory = {
  title: string;
  blurb: string;
  icon: LucideIcon;
  items: { name: string; level: number }[];
};

export const skills: SkillCategory[] = [
  {
    title: "Frontend",
    blurb: "Interfaces that feel alive",
    icon: Code2,
    items: [
      { name: "React / Next.js", level: 95 },
      { name: "TypeScript", level: 92 },
      { name: "Three.js / R3F", level: 85 },
      { name: "Tailwind CSS", level: 96 },
      { name: "Framer Motion", level: 90 },
    ],
  },
  {
    title: "Backend",
    blurb: "APIs built to scale",
    icon: Server,
    items: [
      { name: "Node.js", level: 93 },
      { name: "GraphQL / tRPC", level: 88 },
      { name: "PostgreSQL", level: 90 },
      { name: "Redis", level: 84 },
      { name: "WebSockets", level: 87 },
    ],
  },
  {
    title: "DevOps & Cloud",
    blurb: "Ship with confidence",
    icon: Database,
    items: [
      { name: "Docker", level: 85 },
      { name: "AWS", level: 80 },
      { name: "CI / CD", level: 88 },
      { name: "Kubernetes", level: 72 },
    ],
  },
  {
    title: "Craft",
    blurb: "Details make the difference",
    icon: Wrench,
    items: [
      { name: "System Design", level: 88 },
      { name: "Testing (Jest / Playwright)", level: 85 },
      { name: "Accessibility", level: 82 },
      { name: "Performance", level: 94 },
    ],
  },
];

/* ---------------------------------- projects --------------------------------- */

export type Project = {
  title: string;
  year: string;
  description: string;
  tags: string[];
  gradient: string;
  accent: string;
  demo: string;
  github: string;
};

export const projects: Project[] = [
  {
    title: "Nebula Analytics",
    year: "2026",
    description:
      "Real-time analytics platform processing 40M events/day with sub-second dashboards, anomaly detection and a custom WebGL charting engine.",
    tags: ["Next.js", "GraphQL", "ClickHouse", "Redis"],
    gradient: "from-violet-600 via-purple-500 to-cyan-400",
    accent: "rgba(139, 92, 246, 0.55)",
    demo: "#",
    github: "#",
  },
  {
    title: "Forge Gateway",
    year: "2025",
    description:
      "Developer-first API gateway with zero-config rate limiting, request transforms and live traffic replay. 99.99% uptime across 3 regions.",
    tags: ["Node.js", "gRPC", "Redis", "Kubernetes"],
    gradient: "from-cyan-500 via-sky-500 to-blue-600",
    accent: "rgba(34, 211, 238, 0.55)",
    demo: "#",
    github: "#",
  },
  {
    title: "Lumen Commerce",
    year: "2025",
    description:
      "Headless e-commerce engine with edge-rendered storefronts, one-click checkout and a visual merchandising console. 2.4× conversion lift.",
    tags: ["Next.js", "Stripe", "Sanity", "Vercel Edge"],
    gradient: "from-fuchsia-600 via-pink-500 to-rose-400",
    accent: "rgba(232, 121, 249, 0.55)",
    demo: "#",
    github: "#",
  },
  {
    title: "Pulse Chat",
    year: "2024",
    description:
      "End-to-end encrypted team chat with presence, threads and collaborative canvases. Sync engine built on CRDTs over WebSockets.",
    tags: ["React", "Yjs", "PostgreSQL", "Fly.io"],
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    accent: "rgba(16, 185, 129, 0.5)",
    demo: "#",
    github: "#",
  },
  {
    title: "Synthwave FM",
    year: "2024",
    description:
      "Browser-native audio-reactive visualizer with 60fps particle systems driven by FFT analysis. Featured on CSS Design Awards.",
    tags: ["Three.js", "Web Audio", "GLSL"],
    gradient: "from-pink-500 via-rose-500 to-orange-400",
    accent: "rgba(236, 72, 153, 0.5)",
    demo: "#",
    github: "#",
  },
  {
    title: "Drift",
    year: "2023",
    description:
      "AI travel planner that turns messy ideas into day-by-day itineraries with live pricing. 30k trips planned in the first quarter.",
    tags: ["Next.js", "OpenAI", "tRPC", "Prisma"],
    gradient: "from-indigo-500 via-blue-500 to-sky-400",
    accent: "rgba(99, 102, 241, 0.55)",
    demo: "#",
    github: "#",
  },
];

/* --------------------------------- experience -------------------------------- */

export type Job = {
  period: string;
  role: string;
  company: string;
  description: string;
  tags: string[];
};

export const experience: Job[] = [
  {
    period: "2023 — Present",
    role: "Senior Full-Stack Engineer",
    company: "Vertex Labs",
    description:
      "Leading a team of 5 building a real-time collaboration platform used by 200k+ teams. Cut p95 latency by 68% and shipped a WebGL-powered whiteboard.",
    tags: ["Next.js", "Go", "WebSockets"],
  },
  {
    period: "2021 — 2023",
    role: "Full-Stack Developer",
    company: "Nova Digital",
    description:
      "Shipped 12+ client products end-to-end — e-commerce, fintech dashboards and headless CMS builds. Owned architecture from Postgres schemas to CI/CD.",
    tags: ["React", "Node.js", "AWS"],
  },
  {
    period: "2019 — 2021",
    role: "Frontend Developer",
    company: "PixelForge Studio",
    description:
      "Built award-nominated marketing sites and design systems. Discovered a love for WebGL and motion design somewhere between the shaders.",
    tags: ["Vue", "GSAP", "Three.js"],
  },
  {
    period: "2015 — 2019",
    role: "B.S. Computer Science",
    company: "State University",
    description:
      "Graduated with honors. Spent more time building side projects and competing in hackathons than sleeping.",
    tags: ["Algorithms", "Databases"],
  },
];

/* ---------------------------------- marquee ---------------------------------- */

export const marqueeTech = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Three.js",
  "GraphQL",
  "PostgreSQL",
  "Docker",
  "AWS",
  "Tailwind CSS",
  "Redis",
  "Framer Motion",
];

export const marqueeValues = [
  "System Design",
  "WebGL",
  "Real-time",
  "Performance",
  "Clean Architecture",
  "DX Obsession",
  "Open Source",
  "AI Tooling",
];
