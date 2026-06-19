export type WorkChallenge = {
  title: string;
  challenge: string;
  tackle: string;
};

export type WorkProject = {
  slug: string;
  name: string;
  shortName: string;
  status: string;
  timeline: string;
  role: string;
  stack: string[];
  impact: string;
  description: string;
  problem: string;
  features: string[];
  image: string;
  href: string;
  overview: string;
  whatIDid: string[];
  howIDid: string[];
  challenges: WorkChallenge[];
  outcomes: string[];
};

export const workProjects: WorkProject[] = [
  {
    slug: "heyclo-clo-ai",
    name: "HeyClo / CLO AI - Animated Product Landing Page",
    shortName: "CLO AI",
    status: "Live Product",
    timeline: "Mar 2026 - Present",
    role: "Frontend / Framer Developer",
    stack: ["Framer", "Lenis", "Responsive UI"],
    impact: "A fully animated product landing page with smooth scrolling and premium storytelling.",
    description:
      "Developed an animated landing page experience for CLO AI with smooth scrolling, responsive layouts, polished interaction design, and a loading experience tested across devices.",
    problem:
      "The product needed a premium animated landing experience that stayed smooth, responsive, and performance-conscious across screen sizes.",
    features: ["Animated landing page", "Smooth scrolling", "Responsive sections", "Loading experience", "Lighthouse checks"],
    image: "/image/clo.png",
    href: "/work/heyclo-clo-ai",
    overview:
      "HeyClo / CLO AI was built as a product landing page where motion, responsiveness, and page quality mattered as much as the visual direction. The work focused on turning the product story into screen-friendly sections with smooth scroll behavior and polished interaction design.",
    whatIDid: [
      "Developed the fully animated landing page experience.",
      "Built responsive layouts and screen-friendly sections.",
      "Created smooth scrolling and polished interaction behavior with Framer and Lenis.",
      "Tested responsiveness, animation behavior, loading experience, and Lighthouse performance.",
    ],
    howIDid: [
      "Used Framer for interaction and section motion so the page could feel premium without becoming random.",
      "Used Lenis to make scrolling feel fluid and controlled across the landing flow.",
      "Checked the page across devices so the animation system did not break the responsive layout.",
      "Improved page quality toward 80-90+ Lighthouse scores across key checks.",
    ],
    challenges: [
      {
        title: "Motion without breaking usability",
        challenge:
          "The page needed a fully animated product story, but the motion still had to stay readable and screen-friendly.",
        tackle:
          "I kept the animation tied to section pacing, smooth scrolling, and interaction states instead of adding disconnected decoration.",
      },
      {
        title: "Responsive animation behavior",
        challenge:
          "Animations that look polished on desktop can easily feel cramped or unstable on mobile.",
        tackle:
          "I tested responsiveness and animation behavior across devices, then adjusted the sections to stay usable on smaller screens.",
      },
      {
        title: "Performance quality",
        challenge:
          "A motion-heavy page still needed strong Lighthouse and loading behavior.",
        tackle:
          "I tested loading experience and Lighthouse performance, improving the page quality to the 80-90+ range across key checks.",
      },
    ],
    outcomes: [
      "Delivered a live animated product landing page.",
      "Created a smooth scrolling product storytelling experience.",
      "Improved responsiveness, animation behavior, loading quality, and Lighthouse checks.",
    ],
  },
  {
    slug: "chainreach-ai",
    name: "ChainReach.ai - Creator and Brand Campaign Platform",
    shortName: "ChainReach.ai",
    status: "Live Product",
    timeline: "Jan 2026 - Present",
    role: "Frontend Developer",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    impact: "A large-scale creator-brand platform with dashboards, campaign flows, negotiation, and AI-assisted creation.",
    description:
      "Built frontend modules for a creator-brand platform with multi-role workflows for brands, creators, and admin users.",
    problem:
      "The platform needed clean frontend workflows for brands, creators, and admins while connecting campaign modules with backend APIs.",
    features: [
      "Brand dashboards",
      "Creator workflows",
      "Campaign creation",
      "Negotiation screens",
      "AI-assisted campaign generation",
      "Global AI chat UI",
    ],
    image: "/image/chainreach.png",
    href: "/work/chainreach-ai",
    overview:
      "ChainReach.ai is a creator and brand campaign platform with multi-role product surfaces. The frontend work covered dashboards, campaign creation, creator acceptance flows, negotiation screens, AI-assisted campaign generation, and global AI chat UI.",
    whatIDid: [
      "Built frontend for brand, creator, and admin workflows.",
      "Developed responsive dashboards and campaign creation flows.",
      "Built creator campaign acceptance flows and negotiation screens.",
      "Implemented AI-assisted campaign generation interfaces.",
      "Implemented global AI chat UI and connected frontend modules with backend APIs.",
    ],
    howIDid: [
      "Used Next.js, TypeScript, and Tailwind CSS for a reusable component-based frontend architecture.",
      "Connected frontend modules with backend APIs while keeping the UI system clean and maintainable.",
      "Used reusable UI systems, custom components, code splitting, Git workflows, and feedback-based product iteration.",
      "Handled the platform as a multi-role workflow system instead of a set of isolated pages.",
    ],
    challenges: [
      {
        title: "Multi-role product complexity",
        challenge:
          "Brands, creators, and admins each needed separate workflows inside one platform.",
        tackle:
          "I structured the frontend around reusable components and workflow-specific surfaces so each role could move through the product clearly.",
      },
      {
        title: "Campaign and negotiation depth",
        challenge:
          "The platform needed campaign creation, acceptance, and negotiation screens without becoming messy.",
        tackle:
          "I built dedicated campaign flows and negotiation interfaces, then iterated with product feedback to keep the UI practical.",
      },
      {
        title: "AI modules inside product UI",
        challenge:
          "AI-assisted campaign generation and global AI chat needed to feel integrated, not bolted on.",
        tackle:
          "I connected the AI interfaces with backend APIs and kept them inside the same reusable frontend system as the rest of the product.",
      },
    ],
    outcomes: [
      "Delivered frontend surfaces for a live creator-brand platform.",
      "Supported brand, creator, and admin workflows.",
      "Built AI-assisted generation, global chat, campaign flows, dashboards, and negotiation screens.",
    ],
  },
  {
    slug: "sound-of-meme",
    name: "Sound Of Meme - AI Music Generation Platform",
    shortName: "Sound Of Meme",
    status: "Live Product",
    timeline: "Nov 2024 - Dec 2025",
    role: "Lead Frontend Developer",
    stack: ["React.js", "Redux", "Tailwind CSS"],
    impact: "An AI-powered music generation product with a scalable React architecture and optimized bundle size.",
    description:
      "Led frontend development from scratch for an AI music generation platform, including the music player, song generation experience, SEO architecture, and performance optimization.",
    problem:
      "The product needed a scalable frontend from scratch, smooth AI song generation flows, a music player system, and better production performance.",
    features: [
      "Scalable React architecture",
      "Reusable components",
      "Custom hooks",
      "Music player system",
      "AI song generation",
      "SEO blog architecture",
    ],
    image: "/image/soundofmeme.png",
    href: "/work/sound-of-meme",
    overview:
      "Sound Of Meme was an AI-powered music generation platform where I owned the frontend from scratch. The work covered scalable architecture, reusable components, custom hooks, maintainable UI flows, the core music player, AI song generation, SEO-focused frontend architecture, and production performance.",
    whatIDid: [
      "Led frontend development from scratch.",
      "Built scalable React.js architecture with reusable components and custom hooks.",
      "Built the core music player system.",
      "Built the user-facing AI song generation experience.",
      "Implemented metadata optimization, structured content, and 25+ blog pages.",
      "Reduced production bundle size from approximately 8 MB to 2 MB.",
    ],
    howIDid: [
      "Used React.js, Redux, and Tailwind CSS to build maintainable UI flows.",
      "Used lazy loading, route-level code splitting, shared/global components, and rendering optimization.",
      "Structured the frontend around reusable systems instead of one-off screens.",
      "Built SEO-focused architecture with metadata optimization and structured content.",
    ],
    challenges: [
      {
        title: "Building from scratch",
        challenge:
          "The platform needed a complete frontend foundation, not just isolated screens.",
        tackle:
          "I built the React architecture with reusable components, custom hooks, Redux state, and maintainable UI flows.",
      },
      {
        title: "Performance at production size",
        challenge:
          "The production bundle was approximately 8 MB, which was too heavy for a responsive product experience.",
        tackle:
          "I used lazy loading, route-level code splitting, shared/global components, and rendering optimization to reduce it to approximately 2 MB.",
      },
      {
        title: "AI music UX",
        challenge:
          "The AI generation experience and music player needed to feel smooth and production-ready.",
        tackle:
          "I built the core music player system and user-facing AI song generation experience with responsive layouts and smooth interactions.",
      },
    ],
    outcomes: [
      "Reduced production bundle size from approximately 8 MB to 2 MB.",
      "Built the core AI song generation and music player experience.",
      "Implemented SEO-focused architecture with 25+ blog pages.",
    ],
  },
  {
    slug: "nursephysiowala",
    name: "NursePhysioWala - Healthcare Services Marketplace",
    shortName: "NursePhysioWala",
    status: "Live Product",
    timeline: "Personal Product",
    role: "Founder and Frontend Developer",
    stack: ["Next.js", "TypeScript", "Firebase", "Vercel"],
    impact: "A live healthcare booking marketplace with patient, physiotherapist, and admin workflows.",
    description:
      "Built a healthcare booking marketplace from scratch for home physiotherapy and nursing services, including booking flows, dashboards, allocation logic, SEO pages, and production deployment.",
    problem:
      "The product needed to coordinate patient requests, professional dashboards, admin allocation, and SEO-friendly service discovery in one live platform.",
    features: [
      "Patient request forms",
      "Service booking flow",
      "Payment-ready flow",
      "Admin dashboard",
      "Physiotherapist dashboard",
      "Automated allocation",
      "SEO service and city pages",
    ],
    image: "/image/nurse.png",
    href: "/work/nursephysiowala",
    overview:
      "NursePhysioWala is a live healthcare services marketplace for home physiotherapy and nursing services. I built it from scratch as the founder and frontend developer, covering patient workflows, physiotherapist workflows, admin operations, allocation logic, SEO pages, and production deployment.",
    whatIDid: [
      "Built the live marketplace from scratch.",
      "Developed patient request forms and service booking flow.",
      "Built payment-ready flow, admin dashboard, physiotherapist dashboard, and request allocation workflow.",
      "Implemented automated allocation logic with admin override capability.",
      "Created SEO-friendly service pages, city pages, responsive UI, optimized images, and production deployment.",
    ],
    howIDid: [
      "Used Next.js and TypeScript for the product frontend.",
      "Used Firebase services and Vercel for production deployment.",
      "Built separate workflows for patients, physiotherapists, and admins.",
      "Used allocation logic based on bid, experience, professionalism, and credentials, with admin override support.",
      "Optimized images and created SEO service/city pages to support search discovery.",
    ],
    challenges: [
      {
        title: "Healthcare marketplace workflow",
        challenge:
          "The product needed patient, physiotherapist, and admin workflows to work together clearly.",
        tackle:
          "I built separate dashboards and request flows, then connected them through the allocation workflow.",
      },
      {
        title: "Request allocation",
        challenge:
          "Service requests needed to be assigned using practical professional criteria while still allowing admin control.",
        tackle:
          "I implemented automated allocation logic based on bid, experience, professionalism, and credentials, with admin override capability.",
      },
      {
        title: "Search and production readiness",
        challenge:
          "The marketplace needed SEO-friendly discovery and reliable production deployment.",
        tackle:
          "I created service pages, city pages, responsive UI, optimized images, and deployed the product with Vercel and Firebase services.",
      },
    ],
    outcomes: [
      "Delivered a live healthcare booking marketplace.",
      "Built patient, physiotherapist, and admin workflows.",
      "Implemented automated allocation with admin override.",
      "Created SEO-friendly service and city pages with optimized images.",
    ],
  },
  {
    slug: "samriddhi-interiors",
    name: "Samriddhi Interiors - Premium Interior Portfolio Website",
    shortName: "Samriddhi Interiors",
    status: "Live Product",
    timeline: "Client Project",
    role: "Freelance Frontend Developer",
    stack: ["Next.js", "TypeScript", "Framer Motion"],
    impact: "A client-facing interior and construction services website with animated sections and lead-generation flows.",
    description:
      "Developed a premium portfolio and business website for an interior and construction services brand with responsive animated sections, reusable components, and production deployment.",
    problem:
      "The client needed a website that could showcase services, project portfolio, brand credibility, and lead-generation flows with polished frontend quality.",
    features: ["Animated sections", "Reusable components", "Optimized layout structure", "Service showcase", "Project portfolio", "Lead-generation flows"],
    image: "/image/samriddhi.png",
    href: "/work/samriddhi-interiors",
    overview:
      "Samriddhi Interiors was a client-facing portfolio and business website for an interior and construction services brand. The build focused on responsive animated sections, reusable components, optimized layout structure, clean frontend architecture, service presentation, portfolio presentation, brand credibility, and lead-generation flows.",
    whatIDid: [
      "Developed the client-facing portfolio and business website.",
      "Created responsive animated sections with Framer Motion.",
      "Built reusable components and optimized layout structure.",
      "Built the site to showcase services, project portfolio, brand credibility, and lead-generation flows.",
      "Delivered clean frontend architecture and production deployment.",
    ],
    howIDid: [
      "Used Next.js and TypeScript for the frontend foundation.",
      "Used Framer Motion for animated sections.",
      "Structured the website around reusable components and optimized layouts.",
      "Prioritized service clarity, project portfolio presentation, credibility, and lead-generation paths.",
    ],
    challenges: [
      {
        title: "Portfolio plus business website",
        challenge:
          "The site needed to show project work while also supporting service discovery and inquiries.",
        tackle:
          "I structured the website around services, project portfolio, credibility sections, and lead-generation flows.",
      },
      {
        title: "Polished animated presentation",
        challenge:
          "The brand needed a premium interface without losing responsive quality.",
        tackle:
          "I created responsive animated sections with Framer Motion and kept the layout structure optimized across devices.",
      },
      {
        title: "Clean frontend delivery",
        challenge:
          "The site needed to be maintainable after launch instead of a one-off page.",
        tackle:
          "I used reusable components, clean frontend architecture, and production deployment practices.",
      },
    ],
    outcomes: [
      "Delivered a live client-facing portfolio and business website.",
      "Created animated responsive sections and reusable components.",
      "Supported services, portfolio, brand credibility, and lead-generation flows.",
    ],
  },
];

export function getWorkProjectBySlug(slug: string) {
  return workProjects.find((project) => project.slug === slug);
}
