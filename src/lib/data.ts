import {
  Database,
  Server,
  Atom,
  Hexagon,
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
  role: "MERN Stack Developer",
  tagline:
    "I design and ship full-stack products with MongoDB, Express, React and Node.js — pixel-perfect interfaces backed by APIs that never blink.",
  email: "sahnawashussain98@gmail.com",
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
  { value: 30, suffix: "+", label: "REST APIs built" },
  { value: 260, suffix: "k+", label: "Users reached" },
];

/* ---------------------------------- skills ---------------------------------- */
/* One card per MERN letter. */

export type SkillCategory = {
  title: string;
  blurb: string;
  icon: LucideIcon;
  items: { name: string; level: number }[];
};

export const skills: SkillCategory[] = [
  {
    title: "MongoDB",
    blurb: "Data modeled for scale",
    icon: Database,
    items: [
      { name: "MongoDB & Atlas", level: 92 },
      { name: "Mongoose ODM", level: 90 },
      { name: "Aggregation Pipelines", level: 84 },
      { name: "Redis / Caching", level: 80 },
    ],
  },
  {
    title: "Express",
    blurb: "APIs built to endure",
    icon: Server,
    items: [
      { name: "Express.js", level: 93 },
      { name: "REST API Design", level: 94 },
      { name: "JWT / OAuth & Auth flows", level: 89 },
      { name: "Socket.io / Real-time", level: 86 },
    ],
  },
  {
    title: "React",
    blurb: "Interfaces that feel alive",
    icon: Atom,
    items: [
      { name: "React", level: 95 },
      { name: "Next.js", level: 92 },
      { name: "TypeScript", level: 90 },
      { name: "Redux Toolkit", level: 88 },
      { name: "Tailwind CSS", level: 94 },
    ],
  },
  {
    title: "Node.js",
    blurb: "The engine room",
    icon: Hexagon,
    items: [
      { name: "Node.js", level: 93 },
      { name: "Three.js / R3F", level: 85 },
      { name: "Docker", level: 82 },
      { name: "AWS / Vercel", level: 86 },
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
  /** Paste your deployed Vercel URL here, e.g. "https://your-app.vercel.app" */
  liveUrl: string;
  /** Paste the GitHub repo URL here (optional). */
  githubUrl: string;
};

export const projects: Project[] = [
  {
    title: "ShopVerse",
    year: "2026",
    description:
      "Full-stack e-commerce platform with cart, checkout, order tracking and an admin dashboard. JWT auth, Stripe payments and Mongoose schemas designed for 100k+ SKUs.",
    tags: ["MongoDB", "Express", "React", "Node.js", "Stripe"],
    gradient: "from-emerald-500 via-teal-500 to-cyan-400",
    accent: "rgba(0, 237, 100, 0.55)",
    liveUrl: "",
    githubUrl: "",
  },
  {
    title: "DevConnect",
    year: "2025",
    description:
      "Developer social network with real-time chat, follow feeds and notifications. Socket.io over an Express server, MongoDB change streams and a React front-end.",
    tags: ["React", "Socket.io", "Express", "MongoDB"],
    gradient: "from-cyan-400 via-sky-500 to-blue-600",
    accent: "rgba(97, 218, 251, 0.55)",
    liveUrl: "",
    githubUrl: "",
  },
  {
    title: "TaskFlow",
    year: "2025",
    description:
      "Kanban project manager with drag-and-drop boards, team invites and role-based access. Redux Toolkit state, optimistic updates and a REST API on Node.",
    tags: ["React", "Redux Toolkit", "Node.js", "Express"],
    gradient: "from-violet-500 via-purple-500 to-fuchsia-400",
    accent: "rgba(167, 139, 250, 0.55)",
    liveUrl: "",
    githubUrl: "",
  },
  {
    title: "Inkwell",
    year: "2024",
    description:
      "Publishing platform with a rich-text editor, markdown support and full CRUD via authenticated REST endpoints. Server-rendered lists keep feeds fast.",
    tags: ["Next.js", "MongoDB", "Express", "JWT"],
    gradient: "from-lime-400 via-emerald-500 to-teal-500",
    accent: "rgba(132, 204, 22, 0.5)",
    liveUrl: "",
    githubUrl: "",
  },
  {
    title: "ExpenseIQ",
    year: "2024",
    description:
      "Personal finance tracker with budgets, recurring transactions and animated charts. Aggregation pipelines power the monthly insights on the server.",
    tags: ["React", "Chart.js", "Node.js", "MongoDB"],
    gradient: "from-teal-400 via-cyan-500 to-violet-500",
    accent: "rgba(45, 212, 191, 0.5)",
    liveUrl: "",
    githubUrl: "",
  },
  {
    title: "JobHive",
    year: "2023",
    description:
      "Job board with recruiter and applicant roles, application tracking and email alerts. Express REST API, Mongoose indexes and a polished React UI.",
    tags: ["React", "Express", "MongoDB", "Nodemailer"],
    gradient: "from-emerald-500 via-cyan-500 to-indigo-500",
    accent: "rgba(16, 185, 129, 0.5)",
    liveUrl: "",
    githubUrl: "",
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
    role: "Senior MERN Stack Developer",
    company: "Vertex Labs",
    description:
      "Leading a team of 5 building a real-time collaboration platform used by 200k+ teams. Own the Express API layer, MongoDB schema design and the React front-end.",
    tags: ["React", "Node.js", "MongoDB", "Socket.io"],
  },
  {
    period: "2021 — 2023",
    role: "Full-Stack Developer (MERN)",
    company: "Nova Digital",
    description:
      "Shipped 12+ client products end-to-end — e-commerce, dashboards and booking systems. Owned everything from Mongoose models to CI/CD on Vercel and AWS.",
    tags: ["MERN", "Docker", "AWS"],
  },
  {
    period: "2019 — 2021",
    role: "Frontend Developer (React)",
    company: "PixelForge Studio",
    description:
      "Built award-nominated marketing sites and design systems in React. Fell for WebGL and motion design somewhere between the shaders.",
    tags: ["React", "Three.js", "Tailwind"],
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
  "MongoDB",
  "Express",
  "React",
  "Node.js",
  "Next.js",
  "TypeScript",
  "Mongoose",
  "Redux",
  "Socket.io",
  "Tailwind CSS",
  "Docker",
  "Three.js",
];

export const marqueeValues = [
  "REST APIs",
  "JWT Auth",
  "Real-time",
  "Scalable",
  "Clean Architecture",
  "Performance",
  "Open Source",
  "Full-Stack",
];
