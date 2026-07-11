export type ProposalPackage = {
  name: string;
  priceUSD: string;
  priceINR: string;
  timeline: string;
  summary: string;
  features: string[];
  recommended?: boolean;
};

export type ServiceProposal = {
  slug: string;
  shortPromise: string;
  startingPriceUSD: string;
  startingPriceINR: string;
  typicalTimeline: string;
  idealFor: string;
  packages: ProposalPackage[];
  engagementNotes: string[];
};

const proposal = (
  config: Omit<ServiceProposal, "engagementNotes"> & {
    engagementNotes?: string[];
  }
): ServiceProposal => ({
  ...config,
  engagementNotes: config.engagementNotes ?? [
    "A written scope and milestone plan before work begins",
    "Responsive build, launch checks, and clear handover included",
    "Third-party subscriptions, paid assets, and content production quoted separately",
  ],
});

export const serviceProposals: ServiceProposal[] = [
  proposal({
    slug: "landing-pages",
    shortPromise: "One focused page, one clear offer, and fewer reasons for a visitor to leave.",
    startingPriceUSD: "$250",
    startingPriceINR: "INR 20,000",
    typicalTimeline: "7-12 days",
    idealFor: "Launches, lead generation, waitlists, campaigns, and focused service offers.",
    packages: [
      {
        name: "Launch Page",
        priceUSD: "$250",
        priceINR: "INR 20,000",
        timeline: "7 days",
        summary: "A polished one-page launch for a clear offer and audience.",
        features: ["Up to 6 focused sections", "Responsive UI build", "Contact or lead form", "SEO essentials", "One revision round"],
      },
      {
        name: "Conversion Page",
        priceUSD: "$500",
        priceINR: "INR 40,000",
        timeline: "10-14 days",
        summary: "Deeper message strategy, proof, objections, and conversion polish.",
        features: ["Conversion-focused page structure", "Custom visual direction", "Analytics-ready events", "FAQ and schema", "Two revision rounds"],
        recommended: true,
      },
      {
        name: "Campaign System",
        priceUSD: "$900+",
        priceINR: "INR 75,000+",
        timeline: "2-3 weeks",
        summary: "A primary campaign page with supporting variants or integrations.",
        features: ["Primary page plus variants", "CMS or API integration", "Advanced motion where useful", "Performance pass", "Launch support"],
      },
    ],
  }),
  proposal({
    slug: "frontend-development",
    shortPromise: "Production frontend that feels as considered as the product behind it.",
    startingPriceUSD: "$600",
    startingPriceINR: "INR 50,000",
    typicalTimeline: "2-5 weeks",
    idealFor: "Teams with designs, APIs, or an existing product that needs reliable implementation.",
    packages: [
      {
        name: "Focused Build",
        priceUSD: "$600",
        priceINR: "INR 50,000",
        timeline: "2-3 weeks",
        summary: "A small set of production-ready screens or one focused workflow.",
        features: ["Up to 5 screens", "React or Next.js", "Responsive states", "Basic API integration", "Handover notes"],
      },
      {
        name: "Product Frontend",
        priceUSD: "$1,500",
        priceINR: "INR 1,20,000",
        timeline: "3-5 weeks",
        summary: "A cohesive frontend for a real product area with reusable patterns.",
        features: ["Reusable component system", "Core product workflows", "Loading and error states", "Accessibility pass", "Deployment support"],
        recommended: true,
      },
      {
        name: "Ongoing Delivery",
        priceUSD: "$2,500+/mo",
        priceINR: "INR 2,00,000+/mo",
        timeline: "Monthly",
        summary: "Embedded frontend ownership for a growing roadmap.",
        features: ["Planned delivery cycles", "Design-to-code execution", "API collaboration", "Performance maintenance", "Weekly progress updates"],
      },
    ],
  }),
  proposal({
    slug: "small-business-websites",
    shortPromise: "A credible business website that answers questions before the first sales call.",
    startingPriceUSD: "$650",
    startingPriceINR: "INR 55,000",
    typicalTimeline: "2-4 weeks",
    idealFor: "Service businesses that need stronger trust, search visibility, and qualified enquiries.",
    packages: [
      {
        name: "Essential Website",
        priceUSD: "$650",
        priceINR: "INR 55,000",
        timeline: "2-3 weeks",
        summary: "A professional 4-5 page foundation for a clear service business.",
        features: ["Up to 5 pages", "Mobile-first design", "Contact flow", "Technical SEO setup", "Two revision rounds"],
      },
      {
        name: "Growth Website",
        priceUSD: "$1,100",
        priceINR: "INR 90,000",
        timeline: "3-4 weeks",
        summary: "A richer trust and lead-generation system for multiple services.",
        features: ["Up to 8 pages", "Service and proof architecture", "CMS-ready content", "Analytics setup", "Conversion review"],
        recommended: true,
      },
      {
        name: "Authority Website",
        priceUSD: "$1,800+",
        priceINR: "INR 1,50,000+",
        timeline: "4-6 weeks",
        summary: "A larger search and content foundation for an established business.",
        features: ["Custom page system", "Location or industry pages", "CMS integration", "Advanced forms", "Launch and handover"],
      },
    ],
  }),
  proposal({
    slug: "frontend-revamp",
    shortPromise: "Keep what works, remove what causes friction, and rebuild the parts users feel.",
    startingPriceUSD: "$400",
    startingPriceINR: "INR 32,000",
    typicalTimeline: "1-4 weeks",
    idealFor: "Existing websites or product surfaces that feel dated, inconsistent, or difficult to use.",
    packages: [
      {
        name: "Revamp Audit",
        priceUSD: "$400",
        priceINR: "INR 32,000",
        timeline: "5-7 days",
        summary: "A prioritized UX, UI, responsive, and performance action plan.",
        features: ["Key-screen review", "Responsive findings", "Conversion friction map", "Priority roadmap", "Review call"],
      },
      {
        name: "Focused Revamp",
        priceUSD: "$900",
        priceINR: "INR 75,000",
        timeline: "2-3 weeks",
        summary: "Redesign and rebuild the highest-impact customer journey.",
        features: ["Up to 6 key screens", "Updated visual system", "Responsive rebuild", "Performance improvements", "Two revision rounds"],
        recommended: true,
      },
      {
        name: "Full Frontend Renewal",
        priceUSD: "$1,800+",
        priceINR: "INR 1,50,000+",
        timeline: "4-6 weeks",
        summary: "A structured interface renewal across the main product or website.",
        features: ["Cross-route UX review", "Reusable component system", "Core flow rebuilds", "Accessibility pass", "Migration support"],
      },
    ],
  }),
  proposal({
    slug: "ui-ux-design",
    shortPromise: "Make the product easier to understand, easier to use, and easier to trust.",
    startingPriceUSD: "$300",
    startingPriceINR: "INR 25,000",
    typicalTimeline: "1-4 weeks",
    idealFor: "Founders and product teams that need clear flows before committing to development.",
    packages: [
      {
        name: "UX Direction",
        priceUSD: "$300",
        priceINR: "INR 25,000",
        timeline: "5-7 days",
        summary: "A focused audit and redesigned direction for one important journey.",
        features: ["Journey review", "Wireframe direction", "Priority screens", "Design rationale", "Review call"],
      },
      {
        name: "Product Redesign",
        priceUSD: "$750",
        priceINR: "INR 60,000",
        timeline: "2-3 weeks",
        summary: "High-fidelity UI/UX for a cohesive product area.",
        features: ["Up to 8 key screens", "Responsive states", "Clickable prototype", "Component foundations", "Two revision rounds"],
        recommended: true,
      },
      {
        name: "Design System",
        priceUSD: "$1,400+",
        priceINR: "INR 1,15,000+",
        timeline: "4-6 weeks",
        summary: "A scalable product language for multiple workflows and teams.",
        features: ["Flow architecture", "Reusable components", "State coverage", "Design documentation", "Developer handoff"],
      },
    ],
  }),
  proposal({
    slug: "api-development",
    shortPromise: "APIs that make the frontend predictable, the data clear, and the product easier to extend.",
    startingPriceUSD: "$500",
    startingPriceINR: "INR 40,000",
    typicalTimeline: "2-5 weeks",
    idealFor: "Products that need secure integrations, database workflows, or a dependable backend layer.",
    packages: [
      {
        name: "API Sprint",
        priceUSD: "$500",
        priceINR: "INR 40,000",
        timeline: "1-2 weeks",
        summary: "A focused API or integration for one clear workflow.",
        features: ["Endpoint planning", "Core implementation", "Validation and errors", "API documentation", "Deployment support"],
      },
      {
        name: "Product API",
        priceUSD: "$1,200",
        priceINR: "INR 1,00,000",
        timeline: "3-4 weeks",
        summary: "A production backend for several connected product workflows.",
        features: ["Database design", "Auth and permissions", "Multiple endpoints", "Integration testing", "Monitoring setup"],
        recommended: true,
      },
      {
        name: "Platform Backend",
        priceUSD: "$2,500+",
        priceINR: "INR 2,00,000+",
        timeline: "5-8 weeks",
        summary: "A custom backend foundation for a deeper platform scope.",
        features: ["Architecture planning", "Role-aware workflows", "External integrations", "Background jobs", "Production handover"],
      },
    ],
  }),
  proposal({
    slug: "web-apps-saas",
    shortPromise: "Turn the product idea into a working system people can actually use.",
    startingPriceUSD: "$1,500",
    startingPriceINR: "INR 1,20,000",
    typicalTimeline: "4-8 weeks",
    idealFor: "SaaS products, dashboards, marketplaces, and role-based operational tools.",
    packages: [
      {
        name: "Lean Web App",
        priceUSD: "$1,500",
        priceINR: "INR 1,20,000",
        timeline: "4-5 weeks",
        summary: "A narrow but usable product with one primary workflow.",
        features: ["Auth and core workflow", "Responsive frontend", "Database integration", "Basic admin view", "Production deployment"],
      },
      {
        name: "SaaS Foundation",
        priceUSD: "$3,000",
        priceINR: "INR 2,50,000",
        timeline: "6-8 weeks",
        summary: "A stronger product foundation with connected roles and workflows.",
        features: ["Multiple product flows", "Roles and permissions", "Dashboard system", "API and database", "Launch support"],
        recommended: true,
      },
      {
        name: "Custom Platform",
        priceUSD: "Custom",
        priceINR: "Custom",
        timeline: "Scoped in phases",
        summary: "A phased engagement for a platform with deeper business logic.",
        features: ["Discovery sprint", "Phased roadmap", "Complex integrations", "Scalable architecture", "Ongoing delivery option"],
      },
    ],
  }),
  proposal({
    slug: "performance-optimization",
    shortPromise: "A faster, more stable product without rebuilding everything by default.",
    startingPriceUSD: "$300",
    startingPriceINR: "INR 25,000",
    typicalTimeline: "5 days-3 weeks",
    idealFor: "Slow or unstable React and Next.js sites where speed is affecting trust or conversion.",
    packages: [
      {
        name: "Performance Audit",
        priceUSD: "$300",
        priceINR: "INR 25,000",
        timeline: "5-7 days",
        summary: "A measured diagnosis with fixes ranked by impact and effort.",
        features: ["Core Web Vitals review", "Bundle and image audit", "Rendering diagnosis", "Priority plan", "Review call"],
      },
      {
        name: "Optimization Sprint",
        priceUSD: "$700",
        priceINR: "INR 58,000",
        timeline: "2 weeks",
        summary: "Hands-on fixes for the most important speed and stability issues.",
        features: ["High-impact implementation", "Image and bundle work", "Layout stability fixes", "Before and after checks", "Deployment support"],
        recommended: true,
      },
      {
        name: "Frontend Hardening",
        priceUSD: "$1,300+",
        priceINR: "INR 1,05,000+",
        timeline: "3-4 weeks",
        summary: "A broader performance and reliability pass across a larger frontend.",
        features: ["Cross-route optimization", "Architecture cleanup", "Accessibility fixes", "Monitoring setup", "Handover notes"],
      },
    ],
  }),
  proposal({
    slug: "product-mvp-development",
    shortPromise: "A disciplined first product that is convincing enough to test, demo, and improve.",
    startingPriceUSD: "$1,500",
    startingPriceINR: "INR 1,20,000",
    typicalTimeline: "4-7 weeks",
    idealFor: "Founders who need a real MVP for early customers, internal validation, or investor demos.",
    packages: [
      {
        name: "Prototype MVP",
        priceUSD: "$1,500",
        priceINR: "INR 1,20,000",
        timeline: "4 weeks",
        summary: "A focused product demo with one convincing core journey.",
        features: ["Scope workshop", "Core UX and UI", "One primary workflow", "Responsive build", "Demo deployment"],
      },
      {
        name: "Launch MVP",
        priceUSD: "$2,500",
        priceINR: "INR 2,00,000",
        timeline: "5-7 weeks",
        summary: "A usable first release with real data and essential operations.",
        features: ["Auth and user flow", "Database and APIs", "Basic admin tools", "Analytics-ready events", "Production launch"],
        recommended: true,
      },
      {
        name: "MVP + Growth Base",
        priceUSD: "$4,000+",
        priceINR: "INR 3,25,000+",
        timeline: "8-10 weeks",
        summary: "A stronger product foundation designed for the next roadmap phase.",
        features: ["Multiple key workflows", "Role-aware product", "Reusable system", "Operational tooling", "Post-launch iteration plan"],
      },
    ],
  }),
];

export function getServiceProposal(slug: string) {
  return serviceProposals.find((item) => item.slug === slug);
}
