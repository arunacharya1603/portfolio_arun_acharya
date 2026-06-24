import { siteConfig } from "@/lib/site";

export type SeoFaq = {
  question: string;
  answer: string;
};

export type SeoServicePage = {
  slug: string;
  navLabel: string;
  metaTitle: string;
  metaDescription: string;
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  primaryIntent: string;
  secondaryIntents: string[];
  bestFor: string[];
  outcomes: string[];
  includes: string[];
  process: string[];
  faqs: SeoFaq[];
  relatedServiceSlugs: string[];
  relatedBlogSlugs: string[];
  relatedWorkSlugs?: string[];
};

export type BlogSection = {
  heading: string;
  body: string[];
};

export type SeoBlogPost = {
  slug: string;
  title: string;
  description: string;
  datePublished: string;
  dateModified: string;
  readingTime: string;
  category: string;
  keywords: string[];
  audience: string;
  summary: string;
  sections: BlogSection[];
  faqs: SeoFaq[];
  relatedServiceSlugs: string[];
};

export const seoServicePages: SeoServicePage[] = [
  {
    slug: "landing-pages",
    navLabel: "Landing Pages",
    metaTitle: "Landing Page Developer for High-Converting Product and Service Pages",
    metaDescription:
      "Hire Arun Acharya as a landing page developer for fast, SEO-ready, conversion-focused landing pages built with clear copy, UI/UX polish, and Next.js frontend quality.",
    heroEyebrow: "Landing page design services",
    heroTitle: "Landing pages that explain the offer fast and turn attention into action.",
    heroDescription:
      "For founders, creators, SaaS teams, and service businesses that need a focused page for one offer, campaign, waitlist, launch, or lead-generation goal. Arun combines message hierarchy, UI/UX, frontend development, performance, and SEO structure so the page can convert and be indexed cleanly.",
    primaryIntent: "landing page developer",
    secondaryIntents: [
      "landing page design services",
      "Next.js landing page developer",
      "high converting landing page developer",
      "freelance landing page developer",
    ],
    bestFor: [
      "SaaS and product launches that need one persuasive page before a larger website.",
      "Service businesses that need a focused lead-generation page for paid or organic traffic.",
      "Founders validating a clear offer, waitlist, consultation, or demo request.",
    ],
    outcomes: [
      "A crisp page narrative: problem, promise, proof, feature logic, objections, FAQ, and CTA.",
      "Responsive Next.js or React implementation with fast loading and stable layout.",
      "Metadata, headings, FAQ schema, internal links, and crawlable content for search visibility.",
      "Visual polish grounded in real project references like HeyClo, Samriddhi Interiors, and ChainReach.ai.",
    ],
    includes: [
      "Offer and audience clarification",
      "Conversion-focused page structure",
      "Hero, proof, benefits, process, FAQ, and CTA sections",
      "Responsive UI/UX design",
      "Next.js or React implementation",
      "SEO metadata, schema, and launch checks",
    ],
    process: [
      "Define the one action the page must create and the doubts it must answer.",
      "Shape the message hierarchy around proof, service clarity, visual confidence, and mobile scanning.",
      "Build, optimize, connect contact/demo paths, add schema, and verify the page is crawlable.",
    ],
    faqs: [
      {
        question: "What makes a landing page different from a full website?",
        answer:
          "A landing page is built around one offer and one primary action. A full website supports broader trust, multiple services, blog content, and deeper navigation.",
      },
      {
        question: "Can Arun build the copy, UI, and frontend together?",
        answer:
          "Yes. Arun can shape the page story, UI hierarchy, responsive design, Next.js or React frontend, technical SEO, and launch checks in one focused scope.",
      },
      {
        question: "Which projects show this kind of landing page work?",
        answer:
          "HeyClo / CLO AI and Samriddhi Interiors are strong landing-page references, while ChainReach.ai shows product and dashboard depth when the scope grows beyond a page.",
      },
    ],
    relatedServiceSlugs: ["frontend-development", "ui-ux-design", "small-business-websites"],
    relatedBlogSlugs: ["landing-page-vs-website-vs-web-app", "small-business-website-cost-and-scope"],
    relatedWorkSlugs: ["heyclo-clo-ai", "samriddhi-interiors", "chainreach-ai"],
  },
  {
    slug: "frontend-development",
    navLabel: "Frontend Development",
    metaTitle: "Frontend Developer Portfolio and Next.js Freelancer | Arun Acharya",
    metaDescription:
      "Hire Arun Acharya for frontend development, Next.js builds, React interfaces, UI implementation, dashboards, product pages, performance work, and SEO-ready web experiences.",
    heroEyebrow: "Frontend developer portfolio",
    heroTitle: "Frontend development for polished products, dashboards, and SEO-ready websites.",
    heroDescription:
      "Arun Acharya builds production frontend surfaces with React, Next.js, TypeScript, Tailwind CSS, responsive UI systems, performance awareness, and product judgment. This service is for teams that need code quality and interface quality to move together.",
    primaryIntent: "frontend developer portfolio",
    secondaryIntents: [
      "Next.js freelancer",
      "frontend developer India",
      "React frontend developer",
      "hire frontend developer",
    ],
    bestFor: [
      "Founders and teams that need a production-ready frontend rather than static mockups.",
      "SaaS dashboards, marketplaces, product pages, creator platforms, healthcare flows, and client websites.",
      "Projects where UI/UX, API integration, responsiveness, and performance all affect launch quality.",
    ],
    outcomes: [
      "Clean React or Next.js component architecture tied to real product workflows.",
      "Responsive screens that hold up across mobile, tablet, desktop, and narrow content panes.",
      "Performance-conscious images, lazy loading, semantic HTML, and SEO-safe route structure.",
      "A stronger entity trail from Arun Acharya to ChainReach.ai, NursePhysioWala, Sound Of Meme, and other showcased builds.",
    ],
    includes: [
      "React and Next.js frontend development",
      "TypeScript component systems",
      "Dashboard and workflow UI",
      "API integration states",
      "Responsive implementation",
      "Performance, accessibility, and SEO checks",
    ],
    process: [
      "Map the product screens, routes, states, data boundaries, and conversion or workflow goals.",
      "Build reusable frontend patterns that match the design direction and product behavior.",
      "Verify responsive behavior, metadata, schema, image loading, and deployment readiness before launch.",
    ],
    faqs: [
      {
        question: "Is Arun a Next.js freelancer or only a UI designer?",
        answer:
          "Arun works across frontend development and UI/UX. He builds React and Next.js interfaces, product workflows, landing pages, dashboards, and SEO-ready website routes.",
      },
      {
        question: "Can Arun work with existing backend APIs?",
        answer:
          "Yes. Frontend development can include API integration, loading states, error states, role-aware views, forms, dashboards, and product workflows while preserving existing backend contracts.",
      },
      {
        question: "Which projects prove frontend development experience?",
        answer:
          "ChainReach.ai, Sound Of Meme, NursePhysioWala, HeyClo / CLO AI, and Samriddhi Interiors show frontend work across SaaS, AI music, healthcare, animated landing pages, and client websites.",
      },
    ],
    relatedServiceSlugs: ["ui-ux-design", "landing-pages", "web-apps-saas"],
    relatedBlogSlugs: ["frontend-revamp-checklist", "api-development-for-startup-web-apps"],
    relatedWorkSlugs: ["chainreach-ai", "sound-of-meme", "nursephysiowala"],
  },
  {
    slug: "small-business-websites",
    navLabel: "Small Business Websites",
    metaTitle: "Small Business Website Developer",
    metaDescription:
      "Hire Arun Acharya to design and build fast, modern small business websites with clear pages, conversion-focused UI, SEO structure, and launch support.",
    heroEyebrow: "Small website to medium website builds",
    heroTitle: "Small business websites built to look premium, load fast, and convert visitors.",
    heroDescription:
      "For founders, local businesses, service providers, and growing teams that need a polished website without agency drag. Arun handles structure, UI/UX, frontend development, SEO basics, and launch.",
    primaryIntent: "small business website developer",
    secondaryIntents: [
      "small website developer",
      "medium business website development",
      "freelance website developer",
      "business website redesign",
    ],
    bestFor: [
      "New service businesses that need a credible first website.",
      "Existing sites that look dated or fail to explain the offer clearly.",
      "Founders who need a lean website before moving into a bigger product build.",
    ],
    outcomes: [
      "Clear page architecture for Home, Services, About, Proof, and Contact.",
      "Responsive UI that works across mobile, tablet, and desktop.",
      "Technical SEO setup with metadata, sitemap, schema, and internal links.",
      "Fast launch path with clean handoff and deployment support.",
    ],
    includes: [
      "Website strategy and content structure",
      "UI direction and responsive design system",
      "Next.js or React implementation",
      "Contact CTA and inquiry flow",
      "Performance and accessibility pass",
      "Launch support and post-launch fixes",
    ],
    process: [
      "Clarify business goal, audience, pages, and conversion path.",
      "Design a focused interface that supports trust and action.",
      "Build, optimize, connect forms, deploy, and verify indexing basics.",
    ],
    faqs: [
      {
        question: "Can you build a small website that can grow later?",
        answer:
          "Yes. The structure can start lean and still leave room for service pages, blog posts, pricing pages, integrations, and future product flows.",
      },
      {
        question: "Do you only design or also build the website?",
        answer:
          "Arun can handle both UI/UX and implementation, including React, Next.js, responsive frontend work, forms, deployment, and SEO setup.",
      },
    ],
    relatedServiceSlugs: ["frontend-revamp", "ui-ux-design", "web-apps-saas"],
    relatedBlogSlugs: [
      "small-business-website-cost-and-scope",
      "landing-page-vs-website-vs-web-app",
    ],
  },
  {
    slug: "frontend-revamp",
    navLabel: "Frontend Revamp",
    metaTitle: "Frontend Revamp and Website Redesign Freelancer",
    metaDescription:
      "Frontend revamp services for websites and web apps that need better UI, speed, responsive behavior, conversion flow, and cleaner React or Next.js implementation.",
    heroEyebrow: "Frontend revamp and conversion cleanup",
    heroTitle: "Revamp the frontend without losing what already works.",
    heroDescription:
      "For products, dashboards, and websites that already exist but feel dated, slow, hard to use, or inconsistent. Arun can audit the interface, improve the UX, rebuild the frontend, and preserve the business logic.",
    primaryIntent: "frontend revamp freelancer",
    secondaryIntents: [
      "website redesign freelancer",
      "React frontend redesign",
      "UI revamp developer",
      "Next.js website revamp",
    ],
    bestFor: [
      "Founders whose product works but no longer looks trustworthy.",
      "Teams with messy frontend code and inconsistent components.",
      "Businesses that need better mobile UX, speed, and conversion clarity.",
    ],
    outcomes: [
      "Clearer interface hierarchy and stronger CTA paths.",
      "Responsive fixes for mobile, tablet, and desktop.",
      "Cleaner component structure and design system alignment.",
      "Performance, accessibility, and SEO improvements where the frontend affects rankings.",
    ],
    includes: [
      "Frontend and UX audit",
      "Component cleanup and visual system refresh",
      "Responsive layout fixes",
      "React or Next.js implementation",
      "Performance and Core Web Vitals review",
      "SEO-safe redirects and metadata preservation when needed",
    ],
    process: [
      "Audit the current UI, analytics signals, page structure, and technical constraints.",
      "Redesign the highest-value screens and define reusable UI patterns.",
      "Ship in focused phases so the revamp improves the product without breaking flows.",
    ],
    faqs: [
      {
        question: "Can you revamp only the frontend without touching backend logic?",
        answer:
          "Yes. Many revamp projects focus on the interface, routing, components, responsiveness, speed, and conversion flow while preserving existing backend contracts.",
      },
      {
        question: "Will a redesign hurt SEO?",
        answer:
          "A redesign can hurt SEO if URLs, headings, metadata, internal links, or content are removed carelessly. Arun keeps SEO structure visible during frontend rebuilds.",
      },
    ],
    relatedServiceSlugs: ["ui-ux-design", "small-business-websites", "web-apps-saas"],
    relatedBlogSlugs: ["frontend-revamp-checklist", "ui-ux-before-rebuild"],
  },
  {
    slug: "ui-ux-design",
    navLabel: "UI/UX Help",
    metaTitle: "UI UX Developer India for Websites, Landing Pages, and Web Apps",
    metaDescription:
      "Hire Arun Acharya as a UI UX developer in India for websites, landing pages, SaaS dashboards, Figma-to-React interfaces, responsive screens, and developer-ready product flows.",
    heroEyebrow: "UI/UX help for websites and products",
    heroTitle: "Make the product easier to understand before you spend more on development.",
    heroDescription:
      "Arun helps shape information architecture, page hierarchy, user flows, Figma screens, dashboard UX, and conversion paths so the build has a better chance of working.",
    primaryIntent: "UI UX developer India",
    secondaryIntents: [
      "UI UX freelancer",
      "Figma to React developer",
      "dashboard UX designer",
      "website UI UX help",
    ],
    bestFor: [
      "Founders who know the product idea but need sharper screens.",
      "Teams with confusing dashboards or onboarding flows.",
      "Businesses that need UI/UX thinking plus implementation support.",
    ],
    outcomes: [
      "Cleaner user journeys and more obvious next actions.",
      "Figma-ready screen direction or implementation-ready UI decisions.",
      "Responsive interface patterns for real devices.",
      "Design choices tied to conversion, trust, and usability.",
    ],
    includes: [
      "UX audit and information architecture",
      "Wireframes or polished UI direction",
      "Design system thinking",
      "Responsive behavior planning",
      "Developer-ready notes",
      "Optional React or Next.js implementation",
    ],
    process: [
      "Map the audience, use cases, friction points, and decision moments.",
      "Design screens around hierarchy, clarity, and trust.",
      "Translate the design into components, states, and implementation notes.",
    ],
    faqs: [
      {
        question: "Can you help if I already have a design?",
        answer:
          "Yes. Arun can review existing Figma files or live screens, find UX issues, and either refine the design or implement it in React/Next.js.",
      },
      {
        question: "Do you do UI/UX only, without development?",
        answer:
          "Yes, UI/UX help can be scoped as a standalone audit or design pass. Development can be added when the direction is approved.",
      },
    ],
    relatedServiceSlugs: ["frontend-revamp", "small-business-websites", "web-apps-saas"],
    relatedBlogSlugs: ["ui-ux-before-rebuild", "frontend-revamp-checklist"],
  },
  {
    slug: "api-development",
    navLabel: "API Development",
    metaTitle: "API Development for Web Apps and SaaS Products",
    metaDescription:
      "API development support for dashboards, SaaS products, MVPs, and full-stack web apps using modern backend patterns, integrations, auth, and deployment.",
    heroEyebrow: "API and backend support",
    heroTitle: "Build the API layer your web app needs to become a real product.",
    heroDescription:
      "For teams that need backend routes, auth flows, third-party integrations, dashboards, admin panels, data handling, and production-ready full-stack architecture.",
    primaryIntent: "API development freelancer",
    secondaryIntents: [
      "backend API developer",
      "full stack web app developer",
      "SaaS API developer",
      "dashboard backend developer",
    ],
    bestFor: [
      "MVPs that need secure data flows instead of mockups.",
      "Dashboards that depend on APIs, roles, and database logic.",
      "Websites that are becoming products with accounts, payments, or workflows.",
    ],
    outcomes: [
      "API routes shaped around the frontend workflow.",
      "Cleaner data contracts between UI and backend.",
      "Auth, role, and integration planning.",
      "Deployable architecture that can grow beyond the first version.",
    ],
    includes: [
      "API route design",
      "Database and integration planning",
      "Auth-aware product flows",
      "Frontend API connection",
      "Error and loading states",
      "Deployment and environment setup",
    ],
    process: [
      "Define the product actions, users, data model, and integration boundaries.",
      "Build the API contracts and connect them to real frontend states.",
      "Verify edge cases, deployment settings, and post-launch observability needs.",
    ],
    faqs: [
      {
        question: "Can you build both frontend and API together?",
        answer:
          "Yes. Arun works across the frontend and API layer, which is useful when product flows, dashboards, auth, and data contracts need to align.",
      },
      {
        question: "Can you connect third-party APIs?",
        answer:
          "Yes. API work can include third-party integrations, webhook flows, payment or auth providers, and dashboard data connections depending on scope.",
      },
    ],
    relatedServiceSlugs: ["web-apps-saas", "frontend-revamp", "small-business-websites"],
    relatedBlogSlugs: ["api-development-for-startup-web-apps", "landing-page-vs-website-vs-web-app"],
  },
  {
    slug: "web-apps-saas",
    navLabel: "Web Apps and SaaS",
    metaTitle: "Full-Stack Web App and SaaS Developer",
    metaDescription:
      "Full-stack web app and SaaS development for founders and teams that need dashboards, workflows, frontend architecture, APIs, and production launch support.",
    heroEyebrow: "Bigger builds and product systems",
    heroTitle: "From website to workflow: full-stack builds for products that need more than pages.",
    heroDescription:
      "Arun can help with SaaS interfaces, dashboards, MVPs, product workflows, API-backed features, and phased builds where design and engineering need to stay connected.",
    primaryIntent: "full stack web app developer",
    secondaryIntents: [
      "SaaS developer freelancer",
      "dashboard developer",
      "startup MVP developer",
      "Next.js full stack developer",
    ],
    bestFor: [
      "Founders validating a SaaS or MVP.",
      "Teams that need a dashboard, portal, or workflow tool.",
      "Businesses ready to move from static website to interactive product.",
    ],
    outcomes: [
      "Product architecture that connects UI, API, and data requirements.",
      "Dashboard and workflow screens designed for repeated use.",
      "Scalable frontend patterns with room for future features.",
      "Launch support, deployment, and iteration after real feedback.",
    ],
    includes: [
      "Product scope and feature mapping",
      "Dashboard or workflow UI",
      "Frontend implementation",
      "API integration or backend routes",
      "Auth and role-aware states where needed",
      "Deployment and release support",
    ],
    process: [
      "Turn the product idea into a scoped build plan and user flow map.",
      "Design the key screens, states, and architecture before deep build work.",
      "Ship an MVP or production slice, then improve from real user signals.",
    ],
    faqs: [
      {
        question: "Can you work on larger projects too?",
        answer:
          "Yes. Arun is open to discussing larger builds when the scope, timeline, communication rhythm, and delivery milestones are clear.",
      },
      {
        question: "Can the first version be small and grow later?",
        answer:
          "Yes. A good SaaS or web app build can start with a focused core workflow and expand once the product has sharper evidence.",
      },
    ],
    relatedServiceSlugs: ["api-development", "ui-ux-design", "frontend-revamp"],
    relatedBlogSlugs: ["api-development-for-startup-web-apps", "landing-page-vs-website-vs-web-app"],
  },
];

export const seoBlogPosts: SeoBlogPost[] = [
  {
    slug: "small-business-website-cost-and-scope",
    title: "Small Business Website Cost and Scope: What to Build First",
    description:
      "A practical guide for small businesses deciding what pages, features, and budget level they need before hiring a website developer.",
    datePublished: "2026-05-24",
    dateModified: "2026-05-24",
    readingTime: "5 min read",
    category: "Website Strategy",
    keywords: [
      "small business website cost",
      "small website developer",
      "business website scope",
      "website developer for small business",
    ],
    audience: "Small business owners, founders, and service providers.",
    summary:
      "Most small business websites should start with clear positioning, a few conversion-focused pages, mobile responsiveness, and SEO-ready structure before adding complex features.",
    sections: [
      {
        heading: "Start with the decision your visitor needs to make",
        body: [
          "A small business website is not only a digital brochure. It should help a visitor understand what you offer, who it is for, why they can trust you, and what to do next.",
          "For many businesses, the first version should cover the homepage, service detail, proof or project examples, about/context, FAQ, and a simple contact path.",
        ],
      },
      {
        heading: "Keep the first build lean, but not fragile",
        body: [
          "A lean site can still be built with strong foundations: responsive layouts, fast loading, semantic HTML, metadata, sitemap, schema, and clear internal links.",
          "The mistake is cutting strategy and structure. A cheap page with unclear copy usually costs more later because it needs to be rebuilt before it can rank or convert.",
        ],
      },
      {
        heading: "When to move from website to web app",
        body: [
          "If the project needs accounts, dashboards, payments, permissions, workflows, or data entry, it is moving beyond a small business website into web app territory.",
          "That is where a full-stack scope matters. The frontend, API, database, auth, and deployment plan need to be discussed together.",
        ],
      },
    ],
    faqs: [
      {
        question: "What should a small business website include first?",
        answer:
          "Start with the pages and sections that explain the offer, build trust, answer objections, and create a contact path. Add blog, location, and service pages once the core offer is clear.",
      },
      {
        question: "Can a small website rank on Google?",
        answer:
          "Yes, but it needs useful page content, technical SEO, internal links, crawlable routes, and a clear topical focus. Ranking is stronger when the site grows with service pages and helpful articles.",
      },
    ],
    relatedServiceSlugs: ["small-business-websites", "ui-ux-design"],
  },
  {
    slug: "frontend-revamp-checklist",
    title: "Frontend Revamp Checklist for Websites, SaaS Products, and Dashboards",
    description:
      "A practical frontend revamp checklist covering UI hierarchy, responsive behavior, speed, accessibility, SEO preservation, and conversion paths.",
    datePublished: "2026-05-24",
    dateModified: "2026-05-24",
    readingTime: "6 min read",
    category: "Frontend Revamp",
    keywords: [
      "frontend revamp checklist",
      "website redesign SEO",
      "React frontend revamp",
      "dashboard UI redesign",
    ],
    audience: "Founders, product owners, and teams planning a redesign.",
    summary:
      "A frontend revamp should improve user trust, speed, responsive behavior, and conversion without accidentally removing SEO value or breaking important workflows.",
    sections: [
      {
        heading: "Audit the current product before touching visuals",
        body: [
          "A redesign should start with what users are trying to do, where they drop off, which screens feel confusing, and which existing URLs or content already bring search traffic.",
          "That audit protects the business from a common redesign mistake: making the site prettier while removing the content, headings, links, or flows that were doing useful work.",
        ],
      },
      {
        heading: "Fix responsive and performance issues early",
        body: [
          "Mobile layout, text wrapping, tap targets, image sizes, loading states, and layout shift should be part of the revamp plan from the beginning.",
          "Modern SEO and AI answer surfaces both reward pages that are easy to crawl, understand, and trust. Speed and structured content support that.",
        ],
      },
      {
        heading: "Preserve search signals during redesign",
        body: [
          "Keep strong URLs, metadata, headings, schema, internal links, and important body copy unless there is a clear reason to change them.",
          "If URL changes are necessary, plan redirects before launch. Frontend work can damage rankings when it treats SEO as a final checklist instead of a build constraint.",
        ],
      },
    ],
    faqs: [
      {
        question: "Should a frontend revamp include SEO work?",
        answer:
          "Yes. Even if the visual redesign is the main goal, headings, content structure, metadata, schema, internal links, performance, and redirects affect SEO.",
      },
      {
        question: "Can only the frontend be rebuilt?",
        answer:
          "Often yes. A frontend revamp can preserve backend APIs and business logic while improving UI, UX, performance, and maintainability.",
      },
    ],
    relatedServiceSlugs: ["frontend-revamp", "ui-ux-design", "web-apps-saas"],
  },
  {
    slug: "ui-ux-before-rebuild",
    title: "Why UI/UX Work Should Happen Before a Website or Web App Rebuild",
    description:
      "How UI/UX planning reduces rebuild waste by clarifying flows, content hierarchy, responsive behavior, and conversion paths before development.",
    datePublished: "2026-05-24",
    dateModified: "2026-05-24",
    readingTime: "4 min read",
    category: "UI/UX",
    keywords: [
      "UI UX before development",
      "website UX redesign",
      "web app UX audit",
      "Figma to React workflow",
    ],
    audience: "Clients deciding whether to design first or build immediately.",
    summary:
      "UI/UX work before development helps define the right screens, content, states, and user decisions so the rebuild is not only cleaner but more useful.",
    sections: [
      {
        heading: "Development is faster when the product decisions are clearer",
        body: [
          "A rebuild becomes expensive when layout, flows, copy, and states are still being discovered inside code.",
          "UI/UX work turns those unknowns into decisions: what the page says, what the user sees first, how the CTA works, and which states need to exist.",
        ],
      },
      {
        heading: "Good UX supports search and conversion together",
        body: [
          "Modern search is not only keywords. Pages need clear answers, useful sections, internal links, trust signals, and content that matches the visitor's intent.",
          "That means UX and SEO overlap. A well-structured service page can help people and crawlers understand the offer faster.",
        ],
      },
      {
        heading: "Design systems matter even for small sites",
        body: [
          "A small website still needs consistent buttons, forms, cards, spacing, headings, and responsive rules.",
          "Without those patterns, each new page becomes slower to build and easier to break.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do I need a full design system for a small website?",
        answer:
          "Not always. But even a small website benefits from reusable typography, spacing, buttons, cards, forms, and responsive rules.",
      },
      {
        question: "Can UI/UX work be combined with development?",
        answer:
          "Yes. Arun can combine UI/UX and implementation when the project benefits from one person carrying the strategy into the code.",
      },
    ],
    relatedServiceSlugs: ["ui-ux-design", "frontend-revamp"],
  },
  {
    slug: "api-development-for-startup-web-apps",
    title: "API Development for Startup Web Apps: What to Plan Before Building",
    description:
      "A founder-friendly guide to planning APIs, auth, data models, integrations, and frontend states for SaaS and web app projects.",
    datePublished: "2026-05-24",
    dateModified: "2026-05-24",
    readingTime: "6 min read",
    category: "Full-Stack Development",
    keywords: [
      "API development freelancer",
      "startup web app API",
      "full stack web app developer",
      "SaaS API planning",
    ],
    audience: "Founders and teams planning SaaS, dashboards, or MVPs.",
    summary:
      "API work should start from product actions, user roles, data needs, and frontend states. That keeps the backend useful instead of disconnected from the product experience.",
    sections: [
      {
        heading: "Start with product actions, not endpoints",
        body: [
          "A useful API starts by asking what users need to create, view, update, approve, pay for, export, or manage.",
          "Those actions shape routes, data models, permissions, validation, and the frontend states that users actually see.",
        ],
      },
      {
        heading: "Plan auth, roles, and integrations early",
        body: [
          "Many MVPs become fragile because auth, roles, third-party APIs, and webhook behavior are added late.",
          "If the product needs admins, customers, creators, clients, payments, or external data, the API architecture should account for that from the start.",
        ],
      },
      {
        heading: "Frontend and API should be designed together",
        body: [
          "Dashboards and SaaS products fail when backend responses do not match the UI's loading, empty, error, success, and permission states.",
          "A full-stack workflow keeps those contracts aligned so the product feels reliable from the user's side.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can a web app start without a complex backend?",
        answer:
          "Yes. Many products can start with a focused API surface and grow later. The important part is choosing a structure that does not block the next phase.",
      },
      {
        question: "Should API development happen before UI design?",
        answer:
          "They should inform each other. Product flows and UI states show what the API needs to support, while backend constraints shape what the interface can do reliably.",
      },
    ],
    relatedServiceSlugs: ["api-development", "web-apps-saas"],
  },
  {
    slug: "landing-page-vs-website-vs-web-app",
    title: "Landing Page vs Website vs Web App: Which One Should You Build?",
    description:
      "A simple guide to choosing between a landing page, a small business website, and a full web app based on goal, budget, timeline, and features.",
    datePublished: "2026-05-24",
    dateModified: "2026-05-24",
    readingTime: "5 min read",
    category: "Project Scope",
    keywords: [
      "landing page vs website",
      "website vs web app",
      "what kind of website do I need",
      "small business web app developer",
    ],
    audience: "Clients who are unsure what to ask for.",
    summary:
      "A landing page sells one offer, a website builds broader trust, and a web app supports interactive product workflows. The right choice depends on the job the project must do.",
    sections: [
      {
        heading: "Choose a landing page when the offer is focused",
        body: [
          "A landing page is best when you need to validate one product, campaign, service, or waitlist with a clear CTA.",
          "It should be fast to launch, easy to read, mobile-friendly, and designed around one primary action.",
        ],
      },
      {
        heading: "Choose a website when trust needs more room",
        body: [
          "A business website makes sense when you need multiple services, proof, about content, FAQs, contact paths, and SEO pages.",
          "This is usually the right choice for small to medium service businesses that need consistent discovery and better credibility.",
        ],
      },
      {
        heading: "Choose a web app when users need to do work",
        body: [
          "If users need accounts, dashboards, saved data, payments, approvals, uploads, or workflow automation, you are building a web app.",
          "That requires deeper planning across UI, API, database, permissions, and deployment.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can a landing page become a full website later?",
        answer:
          "Yes. A landing page can be the first phase, then expand into services, pricing, blog, location pages, and product workflows.",
      },
      {
        question: "When should I discuss a bigger web app project?",
        answer:
          "Discuss a bigger project when the site needs login, dashboards, data, API integrations, payments, roles, or ongoing product workflows.",
      },
    ],
    relatedServiceSlugs: ["small-business-websites", "web-apps-saas", "api-development"],
  },
];

export function getSeoServicePage(slug: string) {
  return seoServicePages.find((service) => service.slug === slug);
}

export function getSeoBlogPost(slug: string) {
  return seoBlogPosts.find((post) => post.slug === slug);
}

export const serviceUrl = (slug: string) => `${siteConfig.url}/services/${slug}`;

export const blogUrl = (slug: string) => `${siteConfig.url}/blog/${slug}`;
