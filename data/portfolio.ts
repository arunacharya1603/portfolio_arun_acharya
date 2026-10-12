import {
  Blocks,
  Code2,
  Figma,
  Gauge,
  Globe2,
  Rocket,
  Search,
  ServerCog,
  Wand2,
  type LucideIcon,
} from "lucide-react";

type ServiceItem = {
  slug: string;
  title: string;
  icon: LucideIcon;
  for: string;
  deliver: string;
  outcome: string;
};

type ExperienceItem = {
  company: string;
  product: string;
  context: string;
  role: string;
  period: string;
  location: string;
  stack: string[];
  summary: string;
  highlights: string[];
};

export const services: ServiceItem[] = [
  {
    slug: "landing-pages",
    title: "Landing Pages",
    icon: Rocket,
    for: "Founders, creators, and businesses validating ideas quickly.",
    deliver:
      "A focused, responsive page with conversion copy, polished UI, and launch-ready setup.",
    outcome:
      "A fast first impression that makes the offer easy to understand and act on.",
  },
  {
    slug: "small-business-websites",
    title: "Business Websites",
    icon: Globe2,
    for: "Small and medium businesses that need 4-8 professional pages.",
    deliver:
      "SEO-ready structure, responsive layouts, service pages, contact flows, and brand polish.",
    outcome:
      "A credible web presence that supports trust, discovery, and inbound leads.",
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Redesign",
    icon: Wand2,
    for: "Teams with an existing website or product that needs sharper usability.",
    deliver:
      "Figma-based redesigns converted into clean React or Next.js interfaces.",
    outcome:
      "Clearer hierarchy, smoother journeys, and a product that feels more premium.",
  },
  {
    slug: "web-apps-saas",
    title: "Full-Stack Web Apps",
    icon: ServerCog,
    for: "Products needing auth, dashboards, APIs, databases, and admin panels.",
    deliver:
      "Frontend and backend architecture with scalable data flows and deployment readiness.",
    outcome:
      "A usable product foundation that can grow beyond the first version.",
  },
  {
    slug: "performance-optimization",
    title: "Performance Optimization",
    icon: Gauge,
    for: "Sites and apps that feel slow, messy, or hard to trust on mobile.",
    deliver:
      "Speed, accessibility, SEO, responsive behavior, and deployment improvements.",
    outcome:
      "A faster, more stable product that users can move through without friction.",
  },
  {
    slug: "product-mvp-development",
    title: "Product MVP Development",
    icon: Blocks,
    for: "Founders who need to turn a concept into a launch-ready MVP.",
    deliver:
      "Strategy, interface design, product flows, engineering, and Vercel deployment.",
    outcome:
      "A real product surface ready for users, demos, investors, or early customers.",
  },
];

export const processSteps = [
  {
    step: "01",
    title: "Strategic Research",
    copy: "I deconstruct the objective, audience, brand, and business goal so every page, section, and interaction has a purpose.",
    icon: Search,
  },
  {
    step: "02",
    title: "Interface Design",
    copy: "I shape the visual system, layout, motion, and UX so the product feels premium, intuitive, and conversion-focused.",
    icon: Figma,
  },
  {
    step: "03",
    title: "Precision Engineering",
    copy: "I build clean, scalable, high-performance interfaces with modern frontend and full-stack architecture.",
    icon: Code2,
  },
  {
    step: "04",
    title: "Launch & Optimize",
    copy: "I deploy, test, refine, and optimize for speed, SEO, responsiveness, and real-world user behavior.",
    icon: Rocket,
  },
];

export const experience: ExperienceItem[] = [
  {
    company: "Persist Ventures",
    product: "Sound Of Meme",
    context: "AI Music Generation Platform",
    role: "Lead Frontend Developer",
    period: "Nov 2024 - Dec 2025",
    location: "Remote",
    stack: ["React.js", "Redux", "Tailwind CSS"],
    summary:
      "Led frontend development from scratch for an AI-powered music generation product, establishing reusable architecture and production-ready user flows.",
    highlights: [
      "Built the core music player and user-facing AI song generation experience with responsive layouts and smooth interactions.",
      "Reduced the production bundle from approximately 8 MB to 2 MB through lazy loading, route-level code splitting, shared components, and rendering optimization.",
      "Implemented SEO-focused architecture, structured content, and more than 25 blog pages to strengthen organic visibility.",
    ],
  },
  {
    company: "Persist Ventures",
    product: "ChainReach.ai",
    context: "Creator and Brand Campaign Platform",
    role: "Frontend Developer",
    period: "Jan 2026 - Present",
    location: "Remote",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    summary:
      "Builds the frontend for a large-scale creator-brand platform with connected workflows for brands, creators, and administrators.",
    highlights: [
      "Developed responsive dashboards, campaign creation, creator acceptance, negotiation, and AI-assisted campaign generation flows.",
      "Implemented a global AI chat interface and integrated frontend modules with backend APIs.",
      "Maintains reusable component systems, code-splitting practices, Git workflows, and feedback-led product iteration.",
    ],
  },
  {
    company: "Persist Ventures",
    product: "HeyClo / CLO AI",
    context: "Animated Product Landing Page",
    role: "Frontend / Framer Developer",
    period: "Mar 2026 - Present",
    location: "Remote",
    stack: ["Framer", "Lenis", "Responsive UI"],
    summary:
      "Develops a fully animated product landing page with smooth scrolling, responsive layouts, and polished product storytelling.",
    highlights: [
      "Created fluid motion and screen-friendly sections with Framer and Lenis across desktop and mobile devices.",
      "Refined loading, responsiveness, and interaction behavior for a premium browsing experience.",
      "Improved key Lighthouse quality checks into the 80-90+ range through ongoing performance testing and iteration.",
    ],
  },
];
