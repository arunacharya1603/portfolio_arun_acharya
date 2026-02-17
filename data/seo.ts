export type ServicePackage = {
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
    name: "Starter Landing Page",
    delivery: "3 to 5 days",
    startingPriceUSD: 200,
    startingPriceINR: 15000,
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
    name: "Business Website",
    delivery: "7 to 14 days",
    startingPriceUSD: 600,
    startingPriceINR: 45000,
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
    name: "Custom Full-Stack Web App",
    delivery: "3 to 8 weeks",
    startingPriceUSD: 1500,
    startingPriceINR: 110000,
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
    question: "How much does a freelance website project cost?",
    answer:
      "Pricing depends on scope, number of pages, integrations, timeline, and content quality. Most projects start from a landing page package and scale up for business websites or full-stack applications.",
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
];
