import { siteConfig } from "@/lib/site";

import { projectGuides } from "@/data/project-guides";
import { serviceProposals } from "@/data/service-proposals";

export type SeoFaq = {
  question: string;
  answer: string;
  link?: { text: string; href: string };
};

type ServiceDetailCopy = {
  engagementHeading: string;
  engagementDescription: string;
  primaryCta: string;
  secondaryCta: string;
  typicalTimeline: string;
  idealFor: string;
  overview: {
    heading: string;
    paragraphs: string[];
    link?: { text: string; href: string };
  };
  fitHeading: string;
  fitIntro?: string;
  fitItems: string[];
  fitNote?: string;
  pricingHeading: string;
  pricingDescription: string;
  pricingNotes: string[];
  processHeading: string;
  includesHeading: string;
  workHeading: string;
  projects: Record<string, { description: string; linkText: string }>;
  faqHeading: string;
  proposalHeading: string;
  proposalDescription: string;
  submitLabel: string;
  relatedReading: { text: string; href: string }[];
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
  detailCopy?: ServiceDetailCopy;
};

export type BlogSection = {
  heading: string;
  body: string[];
  link?: { text: string; href: string };
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
  relatedWorkSlugs?: string[];
  references?: { title: string; url: string }[];
  summary: string;
  sections: BlogSection[];
  faqs: SeoFaq[];
  relatedServiceSlugs: string[];
};

export const seoServicePages: SeoServicePage[] = [
  {
    slug: "landing-pages",
    navLabel: "Landing Pages",
    metaTitle: "Landing Page Developer for Product and Service Pages",
    metaDescription:
      "Hire Arun Acharya for fast, SEO-ready landing pages with clear copy, polished UI/UX, responsive Next.js code, and conversion-focused structure.",
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
    metaTitle: "React Dashboard Development Services | Arun Acharya",
    metaDescription:
      "Hire Arun Acharya, a React and Next.js dashboard developer in India, for SaaS interfaces, API integration and responsive frontend builds worldwide.",
    heroEyebrow: "Freelance frontend developer · React · Next.js · TypeScript",
    heroTitle: "React dashboard development services for SaaS teams",
    heroDescription:
      "I’m a freelance React dashboard developer based in India, working with teams worldwide. I turn product designs and backend APIs into responsive React and Next.js interfaces, with reusable components and clear loading, empty and error states. Whether you need one workflow or a larger product frontend, we’ll define the screens, interactions and integration requirements before development begins.",
    primaryIntent: "React dashboard development services",
    secondaryIntents: [
      "React dashboard developer India",
      "hire React dashboard developer",
      "React dashboard development services India",
      "Next.js dashboard developer",
      "SaaS frontend developer",
      "freelance React dashboard developer",
    ],
    bestFor: [
      "SaaS teams with designs, APIs or an existing product.",
      "Teams building dashboards for customers, internal users or administrators.",
      "Product teams needing a defined frontend build or ongoing delivery.",
    ],
    outcomes: [
      "The aim is a frontend that users can navigate and your team can continue developing, with clear boundaries between interface work and backend responsibilities.",
    ],
    includes: [
      "React, Next.js and TypeScript development.",
      "Reusable components and consistent interface patterns.",
      "Dashboard screens, tables, forms and navigation.",
      "API integration and frontend state management.",
      "Loading, empty, validation and error states.",
      "Responsive layouts and agreed accessibility checks.",
      "Performance review, deployment support and handover.",
    ],
    process: [
      "We map the screens, user roles, interactions and API dependencies. We also identify missing designs or decisions that could affect delivery.",
      "I implement reusable components and connect the agreed workflows to your APIs, including the interface states needed for everyday use.",
      "I check responsive behaviour, interactions and the agreed accessibility and performance requirements, then support deployment and handover.",
    ],
    faqs: [
      {
        question: "Can I hire you as a React dashboard developer for an existing product?",
        answer:
          "Yes. I can work on a defined dashboard, workflow or product area within an existing React or Next.js application. I’ll review the codebase and requirements before confirming the scope.",
      },
      {
        question: "Do you work from Figma designs?",
        answer:
          "Yes. I can implement supplied designs and clarify responsive behaviour, interactions and missing interface states before building. If substantial design work is needed, we’ll include it explicitly in the scope.",
      },
      {
        question: "Does frontend development include the backend?",
        answer:
          "This service covers the interface and agreed API integration. Backend services, database design and server-side permission enforcement require their own scope. If you need the complete application, see my Web Apps & SaaS service.",
        link: { text: "Web Apps & SaaS service", href: "/services/web-apps-saas" },
      },
      {
        question: "Can work start before our APIs are ready?",
        answer:
          "Often, yes. We can agree on API contracts and use mock data for the relevant screens. Live integration and final verification still depend on the backend being available.",
      },
      {
        question: "Can you work as a SaaS frontend developer alongside our team?",
        answer:
          "Yes. I can collaborate with your designers and backend developers on a defined project or through ongoing delivery. We’ll agree on communication, review points and responsibilities before work starts.",
      },
      {
        question: "Do you work with international clients?",
        answer:
          "Yes. I’m based in India and work remotely with clients worldwide. We can agree on time-zone overlap, written updates and review sessions that fit the project.",
      },
    ],
    relatedServiceSlugs: ["ui-ux-design", "landing-pages", "web-apps-saas"],
    relatedBlogSlugs: ["saas-dashboard-development-scope"],
    relatedWorkSlugs: ["chainreach-ai", "sound-of-meme", "nursephysiowala"],
    detailCopy: {
      engagementHeading: "A frontend scope your team can plan around.",
      engagementDescription: "Bring your designs, existing product or API documentation. I’ll help turn them into a defined build with clear deliverables, milestones and responsibilities.",
      primaryCta: "Discuss your frontend",
      secondaryCta: "View packages",
      typicalTimeline: "Typically 2–5 weeks for a defined project",
      idealFor: "SaaS teams with designs, APIs or an existing product",
      overview: {
        heading: "Dashboards built around the work people need to do",
        paragraphs: [
          "A dashboard needs to support real tasks: reviewing information, submitting forms, managing records and moving a workflow forward.",
          "I build the screens and interactions around those tasks, including tables, filters, forms, navigation and role-specific views where required. The scope also covers what users see while data loads, when a result is empty and when a request fails.",
        ],
      },
      fitHeading: "Where I can help",
      fitItems: [
        "A new product frontend: Turn agreed designs and API contracts into a working React or Next.js interface.",
        "A dashboard or product area: Build a defined set of screens for customers, internal teams or administrators.",
        "An existing SaaS product: Add workflows and reusable components that fit the current application.",
        "Ongoing frontend delivery: Work alongside your design and backend teams through planned delivery cycles.",
      ],
      pricingHeading: "Frontend development packages",
      pricingDescription: "Starting prices depend on the number of screens, workflow complexity, design readiness and API requirements. Your proposal will confirm the delivery scope and dependencies.",
      pricingNotes: [
        "Every engagement begins with a written scope and milestone plan.",
        "Responsive build, launch checks, and clear handover included",
        "Third-party subscriptions, paid assets and additional work outside the agreed scope are quoted separately.",
      ],
      processHeading: "From product brief to working frontend",
      includesHeading: "What your frontend scope can include",
      workHeading: "Relevant frontend experience",
      projects: {
        "chainreach-ai": {
          description: "I built frontend dashboards for brands, creators and administrators, including campaign creation, acceptance and negotiation workflows. I also implemented interfaces for AI-assisted campaign generation and chat, connecting the frontend to backend APIs.",
          linkText: "Explore the ChainReach.ai case study",
        },
        "sound-of-meme": {
          description: "As lead frontend developer, I worked on the React and Redux application, including the player and song-generation experience, SEO architecture and bundle optimisation.",
          linkText: "Explore the Sound Of Meme case study",
        },
        nursephysiowala: {
          description: "As founder and frontend developer, I worked on patient, practitioner and administrator booking workflows, including allocation controls, service pages and deployment.",
          linkText: "Explore the NursePhysioWala case study",
        },
      },
      faqHeading: "Questions before we start",
      proposalHeading: "Tell me what your dashboard needs to do",
      proposalDescription: "Share your designs, existing application or a short list of the workflows you need. Include the status of your APIs and your preferred timeline. I’ll outline the frontend scope, dependencies and a practical starting budget.",
      submitLabel: "Request a frontend proposal",
      relatedReading: [
        { text: "What to scope before hiring a React dashboard developer", href: "/blog/saas-dashboard-development-scope" },
        { text: "Compare service pricing and engagement options", href: "/pricing" },
      ],
    },
  },
  {
    slug: "small-business-websites",
    navLabel: "Small Business Websites",
    metaTitle: "Clinic & Small Business Website Design | Arun Acharya",
    metaDescription:
      "Clinic and small business website design by Arun Acharya. Based in India, serving clients worldwide with clear service pages and enquiry forms.",
    heroEyebrow: "Independent website developer · Based in India · Working worldwide",
    heroTitle: "Clinic and small business website design",
    heroDescription:
      "I build websites that help people understand your services, trust your business and take the next step. From physiotherapy clinics to local service businesses, I bring your services, team and enquiry process together in a clear, mobile-friendly website. Work directly with me from the first brief through design, development and launch.",
    primaryIntent: "clinic website design India",
    secondaryIntents: [
      "clinic website development India",
      "physiotherapy website design India",
      "physiotherapy website design services",
      "website design for physiotherapists",
      "physiotherapy web design",
      "physical therapy website design",
      "physical therapy web design services",
      "website designer for physical therapists",
      "small business website design",
    ],
    bestFor: [
      "Clinics and physiotherapists in India and international markets.",
      "Local service businesses that need clear services and enquiry paths.",
      "Interior design firms, consultants and other service providers.",
    ],
    outcomes: [
      "The aim is to make your business easier to understand and contact, with a sound foundation for future search and content work.",
    ],
    includes: [
      "Page planning and content structure.",
      "Responsive design and React or Next.js development.",
      "Service pages, team profiles and relevant proof of your work.",
      "Contact forms and enquiry flows.",
      "Booking links or integrations agreed in the scope.",
      "Technical SEO setup and performance checks.",
      "CMS integration where included in your package.",
      "Launch support and handover.",
    ],
    process: [
      "We identify your customers, priority services and main enquiry path. Then we agree on the pages, content, features and launch requirements.",
      "I design and develop the agreed website, bringing your services, business information and supporting material into a consistent experience across screen sizes.",
      "I check forms, navigation, responsive layouts and the agreed technical SEO setup, then support deployment and provide a clear handover.",
    ],
    faqs: [
      {
        question: "Do you offer clinic website design across India?",
        answer:
          "Yes. I work remotely with clinics and service businesses across India. The scope can include service pages, practitioner profiles, location information and enquiry flows tailored to your business.",
      },
      {
        question: "Do you build websites for physiotherapy and physical therapy practices outside India?",
        answer:
          "Yes. I work with international clients remotely. The website’s language, service descriptions and contact or booking process can be adapted to your practice and audience, including the terminology your customers use.",
      },
      {
        question: "Can you add appointment booking?",
        answer:
          "I can link to your existing booking service or scope an integration. A custom booking system with patient, practitioner or administrator accounts requires a separate application scope.",
      },
      {
        question: "Will the website help us appear on Google?",
        answer:
          "The work includes the technical SEO setup agreed in your package. Clear service pages and useful business information give search engines a stronger foundation to understand your website. Rankings and enquiries also depend on competition, content, reputation and ongoing work; they are not guaranteed.",
      },
      {
        question: "Do you work with businesses other than clinics?",
        answer:
          "Yes. I also build websites for businesses such as interior design firms, consultants and other service providers. The structure is planned around your customers and the services you want to grow.",
      },
    ],
    relatedServiceSlugs: ["frontend-revamp", "ui-ux-design", "web-apps-saas"],
    relatedBlogSlugs: [
      "physiotherapy-website-booking-brief",
      "small-business-website-cost-and-scope",
    ],
    relatedWorkSlugs: ["pivotal-physiocare", "samriddhi-interiors"],
    detailCopy: {
      engagementHeading: "A clear scope, a practical budget and a website built around your business.",
      engagementDescription: "Start with the pages and features your customers actually need. Before development begins, you’ll receive a written scope covering the work, timeline, price and what I need from you.",
      primaryCta: "Discuss your website",
      secondaryCta: "View packages",
      typicalTimeline: "2–3 weeks for an Essential Website; larger packages below",
      idealFor: "Clinics, physiotherapists and businesses that sell services",
      overview: {
        heading: "Physiotherapy website design that makes the next step clear",
        paragraphs: [
          "Someone visiting a clinic website needs to understand what care is available, who provides it, where the clinic operates and how to enquire.",
          "I organise that information into clear service pages, practitioner profiles, location details and contact paths. Where needed, the website can also explain home visits and connect visitors to your existing appointment-booking process.",
          "My work on Pivotal Physiocare includes a responsive clinic website with care information, practitioner profiles, service coverage and home-visit enquiry paths.",
        ],
        link: { text: "Explore the Pivotal Physiocare website project", href: "/work/pivotal-physiocare" },
      },
      fitHeading: "Built around the questions your customers ask",
      fitIntro: "Your website should make it easy to answer:",
      fitItems: [
        "Is this the right business for me? Clear descriptions of your services and who they are for.",
        "Can I trust them? Team profiles, relevant project examples and testimonials you can substantiate.",
        "Do they serve my location? Accurate clinic, office or service-area information.",
        "What should I do next? Visible enquiry forms, contact details or booking links.",
      ],
      fitNote: "The same approach works for clinics, interior design businesses, consultants and other service providers.",
      pricingHeading: "Website packages and starting prices",
      pricingDescription: "These are starting prices for defined scopes. Your final proposal will confirm the pages, functionality, content responsibilities and delivery schedule.",
      pricingNotes: [
        "Every engagement starts with a written scope and milestone plan.",
        "Responsive build, launch checks, and clear handover included",
        "Third-party subscriptions, paid assets and content production are quoted separately.",
      ],
      processHeading: "From first brief to launch",
      includesHeading: "What your website can include",
      workHeading: "Relevant website projects",
      projects: {
        "pivotal-physiocare": {
          description: "A responsive physiotherapy website covering care information, practitioner profiles, service coverage, galleries and home-visit enquiries. My contribution covered the website implementation.",
          linkText: "View the Pivotal Physiocare case study",
        },
        "samriddhi-interiors": {
          description: "A business website that brings together services, project photography, the company story and consultation enquiries. I developed the frontend using Next.js, TypeScript and Framer Motion.",
          linkText: "View the Samriddhi Interiors case study",
        },
      },
      faqHeading: "Questions before we start",
      proposalHeading: "Tell me about your business and the website you need",
      proposalDescription: "Share your current website, priority services, target locations and preferred launch date. I’ll review the brief and outline a suitable scope, starting budget and next steps.",
      submitLabel: "Request a website proposal",
      relatedReading: [
        { text: "Planning a physiotherapy website and its booking enquiries", href: "/blog/physiotherapy-website-booking-brief" },
        { text: "Understanding small business website cost and scope", href: "/blog/small-business-website-cost-and-scope" },
      ],
    },
  },
  {
    slug: "frontend-revamp",
    navLabel: "Frontend Revamp",
    metaTitle: "Frontend Revamp and Website Redesign Freelancer",
    metaDescription:
      "Frontend revamps for websites and web apps that need clearer UI, faster loading, responsive layouts, stronger conversion paths, and cleaner Next.js code.",
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
    relatedWorkSlugs: ["sound-of-meme", "heyclo-clo-ai"],
  },
  {
    slug: "ui-ux-design",
    navLabel: "UI/UX Help",
    metaTitle: "UI/UX Developer in India for Websites and Web Apps",
    metaDescription:
      "Hire Arun Acharya for UI/UX design, SaaS dashboards, Figma-to-React interfaces, responsive screens, and developer-ready product flows.",
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
    relatedWorkSlugs: ["chainreach-ai", "rey9-living", "ai-case-calculator"],
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
    relatedWorkSlugs: ["nursephysiowala", "chainreach-ai"],
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
    relatedWorkSlugs: ["nursephysiowala", "chainreach-ai", "proofcohort"],
  },
  {
    slug: "performance-optimization",
    navLabel: "Performance Optimization",
    metaTitle: "Next.js and React Performance Optimization",
    metaDescription:
      "Performance optimization for React and Next.js sites, covering Core Web Vitals, bundles, images, layout stability, and production reliability.",
    heroEyebrow: "React and Next.js performance help",
    heroTitle: "Make the product feel faster, more stable, and easier to trust.",
    heroDescription:
      "For teams with a live site or product that loads slowly, shifts during rendering, ships too much JavaScript, or loses credibility on mobile. Arun measures the real bottlenecks, fixes the highest-impact issues, and shows what improved.",
    primaryIntent: "Next.js performance optimization",
    secondaryIntents: [
      "React performance optimization",
      "Core Web Vitals developer",
      "frontend speed optimization",
      "website performance audit",
    ],
    bestFor: [
      "Live React or Next.js products with slow routes, heavy bundles, or unstable layouts.",
      "Marketing sites where loading speed is weakening conversion and search performance.",
      "Teams that need measured improvements without assuming a complete rewrite.",
    ],
    outcomes: [
      "A prioritized diagnosis tied to real routes, devices, and user-facing delays.",
      "Smaller and better-timed JavaScript, image, font, and data-loading work.",
      "Improved layout stability, interaction readiness, and responsive behavior.",
      "Clear before-and-after evidence with the remaining technical risks documented.",
    ],
    includes: [
      "Core Web Vitals review",
      "Bundle and rendering analysis",
      "Image and font optimization",
      "Layout stability fixes",
      "Route-level performance work",
      "Before-and-after verification",
    ],
    process: [
      "Measure the live experience and identify the bottlenecks users actually feel.",
      "Prioritize fixes by impact, effort, and regression risk, then implement the agreed scope.",
      "Verify key routes again and document the improvement, trade-offs, and next priorities.",
    ],
    faqs: [
      {
        question: "Do you need to rebuild the whole site?",
        answer:
          "Usually not. The first step is measurement. Many meaningful gains come from focused work on bundles, images, fonts, rendering, data loading, and layout stability.",
      },
      {
        question: "Can you guarantee a perfect Lighthouse score?",
        answer:
          "No responsible performance engagement should guarantee a fixed score before measuring the product. The goal is a faster real experience and measurable improvement on the routes that matter.",
      },
      {
        question: "Can performance work help SEO?",
        answer:
          "Performance is one part of technical quality. Faster, stable pages can support user experience and search readiness, but content relevance, crawlability, authority, and intent still matter.",
      },
    ],
    relatedServiceSlugs: ["frontend-revamp", "frontend-development", "landing-pages"],
    relatedBlogSlugs: ["frontend-revamp-checklist", "landing-page-vs-website-vs-web-app"],
    relatedWorkSlugs: ["sound-of-meme", "heyclo-clo-ai", "chainreach-ai"],
  },
  {
    slug: "product-mvp-development",
    navLabel: "Product MVP Development",
    metaTitle: "MVP Developer for Founders and Startups",
    metaDescription:
      "MVP development for founders who need focused scope, polished UI/UX, frontend, APIs, deployment, and a practical path to user feedback.",
    heroEyebrow: "MVP design and development",
    heroTitle: "Build the smallest product that is still convincing enough to test.",
    heroDescription:
      "For founders who need more than a clickable concept but less than an overbuilt platform. Arun helps define the core workflow, design the interface, build the product, and launch a version that can support demos, early users, or the next funding conversation.",
    primaryIntent: "product MVP developer",
    secondaryIntents: [
      "startup MVP development",
      "MVP developer India",
      "Next.js MVP developer",
      "SaaS prototype development",
    ],
    bestFor: [
      "Founders turning a validated problem into a usable first product.",
      "Teams preparing an investor demo or early customer pilot.",
      "Businesses testing an internal workflow before a larger platform investment.",
    ],
    outcomes: [
      "A disciplined feature scope centered on one valuable user journey.",
      "A polished product surface that feels credible in demos and early use.",
      "Working frontend, data, APIs, and deployment where the MVP requires them.",
      "A practical post-launch roadmap based on what should be learned next.",
    ],
    includes: [
      "MVP scope and prioritization",
      "Core journey and screen design",
      "Responsive frontend development",
      "API and database integration",
      "Basic admin or operational tools",
      "Deployment and launch support",
    ],
    process: [
      "Define the user, the core problem, the proof the MVP must create, and what can wait.",
      "Design and build the smallest complete workflow with realistic states and data.",
      "Launch the product, document the operating path, and plan the next iteration from evidence.",
    ],
    faqs: [
      {
        question: "How small should the first MVP be?",
        answer:
          "Small enough to launch and learn, but complete enough that a real user can finish the primary journey without a presentation explaining the missing product.",
      },
      {
        question: "Can the MVP grow into a larger SaaS product?",
        answer:
          "Yes. The first build can establish reusable frontend, data, and workflow foundations, but growth architecture should be chosen only where the roadmap justifies it.",
      },
      {
        question: "Do you help decide what not to build?",
        answer:
          "Yes. Scope discipline is one of the most valuable parts of an MVP engagement. Features that do not improve the main proof are moved to a later phase.",
      },
    ],
    relatedServiceSlugs: ["web-apps-saas", "ui-ux-design", "api-development"],
    relatedBlogSlugs: ["api-development-for-startup-web-apps", "landing-page-vs-website-vs-web-app"],
    relatedWorkSlugs: ["chainreach-ai", "nursephysiowala", "sound-of-meme"],
  },
];

const businessWebsitePackage = serviceProposals.find(
  (service) => service.slug === "small-business-websites"
)!.packages[0];

export const seoBlogPosts: SeoBlogPost[] = [
  ...projectGuides,
  {
    slug: "small-business-website-cost-and-scope",
    title: "Small Business Website Cost and Scope: What to Build First",
    description:
      "A practical guide for small businesses deciding what pages, features, and budget level they need before hiring a website developer.",
    datePublished: "2026-05-24",
    dateModified: "2026-10-23",
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
        heading: "A concrete starting scope and budget",
        link: { text: "Essential Website package", href: "/services/small-business-websites" },
        body: [
          `The current Essential Website package starts at ${businessWebsitePackage.priceUSD} / ${businessWebsitePackage.priceINR}, with a typical ${businessWebsitePackage.timeline} schedule. It covers up to five pages, mobile-first design, a contact flow, technical SEO setup and two revision rounds. This is my published starting package, not an industry average or a quote for every project.`,
          "For an illustrative five-page service website, those pages could be Home, Services, Work, About and Contact, with FAQs included within the relevant pages. Agree who supplies the copy and approved project images before confirming the schedule. This example is a planning scenario, not a client result.",
          "A booking system, payments, customer accounts, substantial copy production or additional pages change the scope. Third-party subscriptions, paid assets and content production are quoted separately; confirm hosting, maintenance and ownership in the written proposal.",
        ],
      },
      {
        heading: "Start with the decision your visitor needs to make",
        body: [
          "A small business website is not only a digital brochure. It should help a visitor understand what you offer, who it is for, why they can trust you, and what to do next.",
          "For many businesses, the first version should cover the homepage, service detail, proof or project examples, about/context, FAQ, and a simple contact path.",
        ],
      },
      {
        heading: "Keep the first build lean, but not fragile",
        link: { text: "strategy and structure", href: "/blog/ui-ux-before-rebuild" },
        body: [
          "A lean site can still be built with strong foundations: responsive layouts, fast loading, semantic HTML, metadata, sitemap, schema, and clear internal links.",
          "The mistake is cutting strategy and structure. A cheap page with unclear copy usually costs more later because it needs to be rebuilt before it can rank or convert.",
        ],
      },
      {
        heading: "When to move from website to web app",
        link: { text: "accounts, dashboards, payments, permissions, workflows, or data entry", href: "/blog/landing-page-vs-website-vs-web-app" },
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
          "A small site can appear in search when its pages are accessible and useful for the query. More pages alone do not establish relevance or guarantee rankings. Use Search Console to check actual indexing, queries and impressions after launch.",
      },
    ],
    relatedServiceSlugs: ["small-business-websites", "ui-ux-design"],
    relatedWorkSlugs: ["pivotal-physiocare", "samriddhi-interiors"],
  },
  {
    slug: "frontend-revamp-checklist",
    title: "Frontend Revamp Checklist for Websites and SaaS",
    description:
      "A practical frontend revamp checklist covering UI hierarchy, responsive behavior, speed, accessibility, SEO preservation, and conversion paths.",
    datePublished: "2026-05-24",
    dateModified: "2026-10-23",
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
        link: { text: "which screens feel confusing", href: "/blog/ui-ux-before-rebuild" },
        body: [
          "A redesign should start with what users are trying to do, where they drop off, which screens feel confusing, and which existing URLs or content already bring search traffic.",
          "That audit protects the business from a common redesign mistake: making the site prettier while removing the content, headings, links, or flows that were doing useful work.",
        ],
      },
      {
        heading: "Fix responsive and performance issues early",
        link: { text: "loading states, and layout shift", href: "/blog/react-nextjs-performance-audit-brief" },
        body: [
          "Mobile layout, text wrapping, tap targets, image sizes, loading states, and layout shift should be part of the revamp plan from the beginning.",
          "Keep meaningful content and links readable in the delivered HTML. Check performance under a documented device and network profile, then compare with real-user measurements where available. Neither a lab score nor structured data guarantees a ranking or an AI citation.",
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
    relatedWorkSlugs: ["sound-of-meme", "heyclo-clo-ai"],
  },
  {
    slug: "ui-ux-before-rebuild",
    title: "Why UI/UX Should Come Before a Website Rebuild",
    description:
      "How UI/UX planning reduces rebuild waste by clarifying flows, content hierarchy, responsive behavior, and conversion paths before development.",
    datePublished: "2026-05-24",
    dateModified: "2026-09-11",
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
        link: { text: "which states need to exist", href: "/blog/saas-dashboard-development-scope" },
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
    relatedWorkSlugs: ["chainreach-ai", "samriddhi-interiors"],
  },
  {
    slug: "api-development-for-startup-web-apps",
    title: "API Planning for Startup Web Apps",
    description:
      "A founder-friendly guide to planning APIs, auth, data models, integrations, and frontend states for SaaS and web app projects.",
    datePublished: "2026-05-24",
    dateModified: "2026-10-23",
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
        link: { text: "loading, empty, error, success, and permission states", href: "/blog/saas-dashboard-development-scope" },
        body: [
          "Dashboards and SaaS products fail when backend responses do not match the UI's loading, empty, error, success, and permission states.",
          "A full-stack workflow keeps those contracts aligned so the product feels reliable from the user's side.",
          "For example, in an illustrative approval workflow, specify who can approve a record, what happens if it was already approved, and how the UI represents denied access, a timeout and a successful response. Agree which team owns permission enforcement and which owns the interface before estimating delivery.",
          "The linked case studies document my frontend integration and product-interface contributions. They are not evidence that I authored every API, database or backend behind those products. A new engagement should explicitly define those responsibilities.",
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
    relatedWorkSlugs: ["nursephysiowala", "chainreach-ai"],
  },
  {
    slug: "landing-page-vs-website-vs-web-app",
    title: "Landing Page vs Website vs Web App",
    description:
      "A simple guide to choosing between a landing page, a small business website, and a full web app based on goal, budget, timeline, and features.",
    datePublished: "2026-05-24",
    dateModified: "2026-09-11",
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
        link: { text: "A landing page", href: "/services/landing-pages" },
        body: [
          "A landing page is best when you need to validate one product, campaign, service, or waitlist with a clear CTA.",
          "It should be fast to launch, easy to read, mobile-friendly, and designed around one primary action.",
        ],
      },
      {
        heading: "Choose a website when trust needs more room",
        link: { text: "A business website", href: "/blog/small-business-website-cost-and-scope" },
        body: [
          "A business website makes sense when you need multiple services, proof, about content, FAQs, contact paths, and SEO pages.",
          "This is usually the right choice for small to medium service businesses that need consistent discovery and better credibility.",
        ],
      },
      {
        heading: "Choose a web app when users need to do work",
        link: { text: "accounts, dashboards, saved data, payments, approvals, uploads, or workflow automation", href: "/blog/saas-dashboard-development-scope" },
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
    relatedWorkSlugs: ["heyclo-clo-ai", "samriddhi-interiors", "nursephysiowala"],
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
