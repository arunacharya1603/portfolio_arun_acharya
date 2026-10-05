export type ServicePackage = {
  slug: string;
  name: string;
  delivery: string;
  startingPriceUSD: number;
  startingPriceINR: number;
  bestFor: string;
  features: string[];
};

export type LocationMarket = {
  slug: string;
  city: string;
  region: string;
  country: string;
  currency: string;
};

export const servicePackages: ServicePackage[] = [
  {
    slug: "landing-pages",
    name: "Starter Landing Page",
    delivery: "7 days",
    startingPriceUSD: 250,
    startingPriceINR: 20000,
    bestFor: "Founders, creators, and local businesses validating ideas fast.",
    features: [
      "1 high-converting page",
      "Mobile responsive layout",
      "Basic on-page SEO",
      "Contact form integration",
      "1 revision round",
    ],
  },
  {
    slug: "small-business-websites",
    name: "Business Website",
    delivery: "2 to 3 weeks",
    startingPriceUSD: 650,
    startingPriceINR: 55000,
    bestFor: "Small and medium businesses starting with up to 5 professional pages.",
    features: [
      "Custom UI design",
      "Performance optimization",
      "Technical SEO setup",
      "Lead capture flows",
      "2 revision rounds",
    ],
  },
  {
    slug: "web-apps-saas",
    name: "Custom Full-Stack Web App",
    delivery: "4-5 weeks for a scoped app; larger builds quoted separately",
    startingPriceUSD: 1500,
    startingPriceINR: 120000,
    bestFor: "Products needing auth, dashboards, APIs, and scalable architecture.",
    features: [
      "Frontend + backend architecture",
      "Database and API integration",
      "Role-based workflows",
      "Deployment and monitoring",
      "Weekly delivery updates",
    ],
  },
];

export const locationMarkets: LocationMarket[] = [
  {
    slug: "bengaluru",
    city: "Bengaluru",
    region: "Karnataka",
    country: "India",
    currency: "INR",
  },
  {
    slug: "mumbai",
    city: "Mumbai",
    region: "Maharashtra",
    country: "India",
    currency: "INR",
  },
  {
    slug: "delhi",
    city: "Delhi NCR",
    region: "Delhi",
    country: "India",
    currency: "INR",
  },
  {
    slug: "dubai",
    city: "Dubai",
    region: "Dubai",
    country: "UAE",
    currency: "USD",
  },
  {
    slug: "london",
    city: "London",
    region: "England",
    country: "United Kingdom",
    currency: "USD",
  },
  {
    slug: "new-york",
    city: "New York",
    region: "New York",
    country: "United States",
    currency: "USD",
  },
  {
    slug: "toronto",
    city: "Toronto",
    region: "Ontario",
    country: "Canada",
    currency: "USD",
  },
  {
    slug: "sydney",
    city: "Sydney",
    region: "New South Wales",
    country: "Australia",
    currency: "USD",
  },
];

export const seoFaqs = [
  {
    question: "Who is Arun Acharya?",
    answer:
      "Arun Acharya is a frontend and full-stack product engineer focused on React, Next.js, TypeScript, UI/UX, landing pages, dashboards, SaaS products, and performance-conscious websites.",
  },
  {
    question: "What services does Arun Acharya offer?",
    answer:
      "Arun offers landing page development, small business websites, UI/UX design, frontend development and revamps, API development, web apps, SaaS dashboards, MVP development, and performance optimization.",
  },
  {
    question: "Is Arun Acharya available as a Next.js freelancer?",
    answer:
      "Yes. Arun accepts selected freelance projects involving Next.js, React, TypeScript, responsive frontend systems, API-backed interfaces, technical SEO, and production deployment.",
  },
  {
    question: "How much does a freelance website project cost?",
    answer: `Current packages start at USD ${servicePackages[0].startingPriceUSD} / INR ${servicePackages[0].startingPriceINR.toLocaleString("en-IN")} for a landing page, USD ${servicePackages[1].startingPriceUSD} / INR ${servicePackages[1].startingPriceINR.toLocaleString("en-IN")} for a business website, and USD ${servicePackages[2].startingPriceUSD.toLocaleString("en-US")} / INR ${servicePackages[2].startingPriceINR.toLocaleString("en-IN")} for a custom web app. Final pricing depends on scope.`,
  },
  {
    question: "How long does a website project take?",
    answer: `A starter landing page is typically delivered in ${servicePackages[0].delivery}, a business website in ${servicePackages[1].delivery}, and a custom web app on a scope-based schedule that can run ${servicePackages[2].delivery.toLowerCase()}.`,
  },
  {
    question: "Do you work with clients outside India?",
    answer:
      "Yes. I work with clients globally and provide asynchronous updates, clear milestones, and timezone-friendly communication.",
  },
  {
    question: "Can you redesign my existing website UI/UX?",
    answer:
      "Yes. I handle UI/UX audits, redesigns, and front-end rebuilds to improve conversions, speed, and usability.",
  },
  {
    question: "Do you build full-stack apps too?",
    answer:
      "Yes. I build full-stack solutions with modern frontend frameworks, APIs, database integration, and production deployment.",
  },
  {
    question: "Can Arun handle both UI/UX and frontend development?",
    answer:
      "Yes. A project can include information architecture, interface direction, responsive UI design, React or Next.js implementation, API integration, and launch checks in one scope.",
  },
  {
    question: "Which projects show Arun Acharya's experience?",
    answer:
      "The portfolio includes credited case studies for ChainReach.ai, Sound Of Meme, NursePhysioWala, HeyClo / CLO AI, Pivotal Physiocare, and Samriddhi Interiors.",
  },
  {
    question: "What was Arun Acharya's role on ChainReach.ai?",
    answer:
      "Arun Acharya is credited as a Frontend Developer for ChainReach.ai, working on responsive dashboards, campaign workflows, creator and brand experiences, AI-assisted flows, and frontend API integrations.",
  },
  {
    question: "Can Arun improve an existing React or Next.js website?",
    answer:
      "Yes. Frontend revamp and performance work can cover responsive behavior, UI consistency, Core Web Vitals, bundle size, image loading, accessibility, conversion paths, and SEO-safe implementation.",
  },
  {
    question: "How do I start a project with Arun Acharya?",
    answer:
      "Send the current website or product idea, target audience, desired outcome, timeline, references, and rough budget. Arun will use that context to recommend a practical scope and next step.",
  },
];
