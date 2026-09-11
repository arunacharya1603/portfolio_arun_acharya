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
  typicalLandingPageRange: string;
  typicalBusinessWebsiteRange: string;
  typicalWebAppRange: string;
  myStartingPrice: string;
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
    bestFor: "Small and medium businesses that need 4 to 8 professional pages.",
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
    delivery: "Based on project complexity, up to 4 weeks",
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
    typicalLandingPageRange: "INR 12,000 to INR 35,000",
    typicalBusinessWebsiteRange: "INR 35,000 to INR 1,20,000",
    typicalWebAppRange: "INR 1,20,000 to INR 6,00,000+",
    myStartingPrice: "INR 15,000",
  },
  {
    slug: "mumbai",
    city: "Mumbai",
    region: "Maharashtra",
    country: "India",
    currency: "INR",
    typicalLandingPageRange: "INR 15,000 to INR 40,000",
    typicalBusinessWebsiteRange: "INR 40,000 to INR 1,40,000",
    typicalWebAppRange: "INR 1,50,000 to INR 7,00,000+",
    myStartingPrice: "INR 18,000",
  },
  {
    slug: "delhi",
    city: "Delhi NCR",
    region: "Delhi",
    country: "India",
    currency: "INR",
    typicalLandingPageRange: "INR 14,000 to INR 38,000",
    typicalBusinessWebsiteRange: "INR 38,000 to INR 1,30,000",
    typicalWebAppRange: "INR 1,40,000 to INR 6,50,000+",
    myStartingPrice: "INR 16,000",
  },
  {
    slug: "dubai",
    city: "Dubai",
    region: "Dubai",
    country: "UAE",
    currency: "AED",
    typicalLandingPageRange: "AED 1,500 to AED 6,000",
    typicalBusinessWebsiteRange: "AED 6,000 to AED 20,000",
    typicalWebAppRange: "AED 20,000 to AED 1,00,000+",
    myStartingPrice: "AED 1,200 equivalent",
  },
  {
    slug: "london",
    city: "London",
    region: "England",
    country: "United Kingdom",
    currency: "GBP",
    typicalLandingPageRange: "GBP 400 to GBP 1,500",
    typicalBusinessWebsiteRange: "GBP 1,500 to GBP 6,000",
    typicalWebAppRange: "GBP 6,000 to GBP 50,000+",
    myStartingPrice: "GBP 250 equivalent",
  },
  {
    slug: "new-york",
    city: "New York",
    region: "New York",
    country: "United States",
    currency: "USD",
    typicalLandingPageRange: "USD 500 to USD 2,000",
    typicalBusinessWebsiteRange: "USD 2,000 to USD 8,000",
    typicalWebAppRange: "USD 8,000 to USD 60,000+",
    myStartingPrice: "USD 200",
  },
  {
    slug: "toronto",
    city: "Toronto",
    region: "Ontario",
    country: "Canada",
    currency: "CAD",
    typicalLandingPageRange: "CAD 700 to CAD 2,500",
    typicalBusinessWebsiteRange: "CAD 2,500 to CAD 10,000",
    typicalWebAppRange: "CAD 10,000 to CAD 70,000+",
    myStartingPrice: "CAD 300 equivalent",
  },
  {
    slug: "sydney",
    city: "Sydney",
    region: "New South Wales",
    country: "Australia",
    currency: "AUD",
    typicalLandingPageRange: "AUD 700 to AUD 2,800",
    typicalBusinessWebsiteRange: "AUD 2,800 to AUD 12,000",
    typicalWebAppRange: "AUD 12,000 to AUD 80,000+",
    myStartingPrice: "AUD 320 equivalent",
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
