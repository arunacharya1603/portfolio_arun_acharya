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
  workSlug?: string;
  externalUrl?: string;
  context: string;
  role: string;
  period?: string;
  location?: string;
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
    workSlug: "sound-of-meme",
    context: "AI Music Generation Platform",
    role: "Lead Frontend Developer",
    period: "Nov 2024 - Dec 2025",
    location: "Remote",
    stack: ["React.js", "Redux Toolkit", "Axios", "Tailwind CSS"],
    summary:
      "Led React frontend development for an AI music-generation product, with work spanning the music player, song-generation interface, playlists, and song discovery.",
    highlights: [
      "Built reusable components and custom hooks for the music player and user-facing song-generation interface.",
      "Worked with Redux Toolkit and Axios on playlist and song-management state, API requests, and updates to the interface.",
      "Worked on song discovery through debounced search, filtering, and data-fetching interactions.",
      "Used lazy loading and route-level code splitting for frontend performance, alongside metadata and structured blog content for search discovery.",
    ],
  },
  {
    company: "Persist Ventures",
    product: "ChainReach.ai",
    workSlug: "chainreach-ai",
    context: "Creator and Brand Campaign Platform",
    role: "Frontend Developer",
    period: "Jan 2026 - Present",
    location: "Remote",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    summary:
      "Builds the frontend for a creator-brand platform with connected workflows for brands, creators, and administrators.",
    highlights: [
      "Developed responsive dashboards, campaign creation, creator acceptance, negotiation, and AI-assisted campaign generation flows.",
      "Implemented a global AI chat interface and integrated frontend modules with backend APIs.",
      "Maintains reusable component systems, code-splitting practices, Git workflows, and feedback-led product iteration.",
    ],
  },
  {
    company: "Persist Ventures",
    product: "HeyClo / CLO AI",
    workSlug: "heyclo-clo-ai",
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
      "Used Lighthouse testing to guide loading and page-quality improvements; historical scores are not presented as a current benchmark.",
    ],
  },
  {
    company: "Transcendence",
    product: "Transcendence",
    workSlug: "transcendence",
    context: "Holographic & Immersive Product Interfaces",
    role: "Frontend Engineer",
    period: "2026",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "GSAP", "Three.js"],
    summary:
      "Developed and refined the web frontend for Transcendence, translating its brand and design references into public pages, product presentations, and dashboard interfaces.",
    highlights: [
      "Built dedicated presentations for Unit, Experiences, and TRS, with a consistent hierarchy across the landing page and product sections.",
      "Worked on GSAP motion, smooth scrolling, interactive visuals, and responsive layouts for media-rich product storytelling.",
      "Refined WebP image delivery, preload behavior, loading states, and dashboard skeleton components.",
    ],
  },
  {
    company: "ProofCohort",
    product: "Proof Cohort",
    workSlug: "proofcohort",
    context: "Project-Based Training & Certification Platform",
    role: "Developer",
    period: "2026",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
    summary:
      "Worked on ProofCohort's public pages and student-facing product presentation, connecting program discovery, project resources, assessments, and certificate information.",
    highlights: [
      "Developed program and resource pages that explain learning tracks, project tasks, and the evidence students submit for review.",
      "Worked on certificate-unlock presentation using shared pricing values, with downloadable credentials and public verification links.",
      "Refined certificate guides, pricing behavior, brand artwork, and image loading within the Next.js and Supabase application.",
    ],
  },
  {
    company: "Personal Product",
    product: "NursePhysioWala",
    workSlug: "nursephysiowala",
    context: "Nursing & Physiotherapy Services Marketplace",
    role: "Frontend Developer",
    stack: ["Next.js App Router", "TypeScript", "Firebase Authentication", "Firestore"],
    summary:
      "Worked on the frontend and application architecture for a home-care marketplace, using Next.js App Router with Firebase authentication and Firestore.",
    highlights: [
      "Structured service discovery around nursing and physiotherapy, with clear entry points into appointment requests.",
      "Worked with Firebase Authentication and Firestore as the foundation for accounts and application data.",
      "Developed responsive service and location pages that connect care information with booking and contact actions.",
    ],
  },
  {
    company: "Freelance Client Project",
    product: "Samriddhi Interiors",
    workSlug: "samriddhi-interiors",
    context: "Interiors & Construction Business Website",
    role: "Freelance Frontend Developer",
    period: "2025",
    stack: ["Next.js", "TypeScript", "Framer Motion", "Responsive UI"],
    summary:
      "Built the business website for Samriddhi Interiors, bringing its services, project photography, studio story, and consultation options into a responsive landing-page flow.",
    highlights: [
      "Organized the page around the hero, studio introduction, service categories, signature projects, client logos, process, testimonials, and contact section.",
      "Created an image-led portfolio presentation for residential, commercial, corporate, and institutional interiors work.",
      "Connected consultation calls to action with an inquiry form and direct phone, email, and WhatsApp contact options.",
    ],
  },
  {
    company: "Transcendence",
    product: "Delphos",
    externalUrl: "https://delfos.transcendenceplatform.com/",
    context: "AI Avatar Product Presentation · Exploration",
    role: "Frontend Developer",
    stack: ["Next.js", "TypeScript", "CSS Modules"],
    summary:
      "Explored the product presentation for Delphos, shown as Delphi in the current interface, using a focused landing page to introduce the Pythia avatar and its conversational experience.",
    highlights: [
      "Composed the page around a concise product introduction, an environment image, and a dedicated avatar stage.",
      "Used the supplied Pythia portrait and shared brand components to give the avatar a clear visual identity.",
      "Implemented responsive presentation and a labeled connection control leading into the existing sign-in flow.",
    ],
  },
  {
    company: "Product Exploration",
    product: "AI Case Calculator",
    workSlug: "ai-case-calculator",
    context: "Case-Valuation Interface · Prototype",
    role: "Frontend Developer",
    stack: ["Report UI", "Responsive UI"],
    summary:
      "Developed a legal-technology product demo that introduces a case-analysis workflow and presents an example valuation report.",
    highlights: [
      "Built the public-facing presentation with sign-in and case-analysis entry points.",
      "Organized the sample report into settlement-range, probability, duration, and precedent-context cards.",
      "Focused the prototype on report readability and product presentation; the displayed estimates are illustrative sample content.",
    ],
  },
];
