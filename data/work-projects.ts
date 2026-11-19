import { caseStudies, type ProjectCaseStudy } from "@/data/case-studies";

export type WorkProject = {
  slug: string;
  name: string;
  shortName: string;
  seoTitle: string;
  seoDescription: string;
  status: string;
  role: string;
  contributionSummary: string;
  evidenceNote?: string;
  stack: string[];
  impact: string;
  listingSummary: string;
  description: string;
  problem: string;
  image: string;
  imageSize: { width: number; height: number };
  imageFit?: "cover" | "contain";
  href: string;
  relatedWorkSlugs: string[];
  relatedServiceSlugs: string[];
  externalUrl?: string;
  caseStudy: ProjectCaseStudy;
};

const projectEntries: Omit<WorkProject, "caseStudy">[] = [
  {
    slug: "transcendence",
    name: "Transcendence - Holographic Experiences Platform",
    shortName: "Transcendence",
    seoTitle: "Transcendence Platform Frontend Case Study | Arun Acharya",
    seoDescription: "Arun Acharya's frontend work on Transcendence's holographic platform: public pages, UNIT and TRS presentations, dashboards, motion and loading states.",
    status: "Live Website",
    role: "Frontend Engineer",
    contributionSummary:
      "I was the Frontend Engineer for the full Transcendence project. My work spans the public website, Unit and TRS product presentations, experience pages, dashboard interfaces, and the motion and loading states that connect them. The published website is linked from this case study.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "GSAP", "Three.js"],
    impact:
      "Full-project frontend engineering for an immersive holographic technology platform, from its public website to dashboards.",
    listingSummary:
      "I developed the frontend for Transcendence's public website, Unit and TRS product presentations, experience pages, and dashboard interfaces. Using Next.js, TypeScript, and Tailwind CSS, I built reusable components and responsive layouts that carry the brand across these sections. My work also included GSAP motion, Three.js visuals, scroll transitions, and dashboard loading states, with attention to accessibility, motion preferences, and image delivery on media-heavy pages.",
    description:
      "Frontend Engineer for the full Transcendence project, building the public website, product experiences, dashboards, and motion-rich interfaces.",
    problem:
      "Transcendence brings together holographic hardware, immersive experiences, and software. Its website needed to make those offerings understandable while conveying the visual ambition of the product.",
    image: "/image/transcendence-thumbnail.webp",
    imageSize: { width: 1280, height: 720 },
    imageFit: "contain",
    href: "/work/transcendence",
    relatedWorkSlugs: ["heyclo-clo-ai", "chainreach-ai"],
    relatedServiceSlugs: ["frontend-development"],
    externalUrl: "https://transcendenceplatform.com/",
  },
  {
    slug: "proofcohort",
    name: "ProofCohort - Project-Based Learning Platform",
    shortName: "Proof Cohort",
    seoTitle: "Proof Cohort (ProofCohort) Website Work | Arun Acharya",
    seoDescription: "Arun Acharya's Proof Cohort (ProofCohort) development work: public program pages, project resources, pricing presentation and certificate guides.",
    status: "Live Product",
    role: "Developer",
    contributionSummary:
      "My ProofCohort work covers public-facing pages, program presentation, project resources, pricing behavior, brand artwork, and certificate-related guides. These contributions sit within a wider learning platform with student, assessment, and verification workflows. The live product is available at proofcohort.in.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
    impact:
      "A project-based learning platform connecting programs, student workflows, assessments, and verifiable certificates.",
    listingSummary:
      "I worked on Proof Cohort's public-facing experience, helping students explore programs, understand project tasks, and find resources for their learning path. My contributions included program pages, career guides, certificate-related content, pricing behavior, and brand artwork. Working within its Next.js, TypeScript, Tailwind CSS, and Supabase foundation, I also refined resource organization and image delivery to keep the platform's public presentation consistent.",
    description:
      "Proof Cohort (ProofCohort) case study covering my development work on program pages, project resources, pricing, and certificate guides.",
    problem:
      "Project-based learning needs more than a program catalog. Students need a clear path through tasks and assessment, while certificates need a way to be checked publicly.",
    image: "/image/proofcohort-thumbnail.webp",
    imageSize: { width: 1275, height: 717 },
    imageFit: "contain",
    href: "/work/proofcohort",
    relatedWorkSlugs: ["nursephysiowala", "chainreach-ai"],
    relatedServiceSlugs: ["web-apps-saas"],
    externalUrl: "https://www.proofcohort.in/",
  },
  {
    slug: "chainreach-ai",
    name: "ChainReach.ai - Creator and Brand Campaign Platform",
    shortName: "ChainReach.ai",
    seoTitle: "ChainReach.ai Frontend & Dashboard Case Study | Arun Acharya",
    seoDescription: "Arun Acharya's ChainReach.ai frontend work: brand, creator and admin dashboards, campaign and negotiation flows, AI interfaces and API integration.",
    status: "Live Product",
    role: "Frontend Developer",
    contributionSummary:
      "I built frontend workflows for brands, creators, and administrators on ChainReach.ai: dashboards, campaign creation and acceptance, negotiation screens, AI-assisted campaign generation, and chat. I connected these interfaces to backend APIs using Next.js, TypeScript, and Tailwind CSS. Dashboard access depends on the user's account and role.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    impact: "A creator-brand platform frontend with dashboards, campaign workflows, negotiation, and AI-assisted creation.",
    listingSummary:
      "I built frontend workflows for brands, creators, and administrators using Next.js, TypeScript, and Tailwind CSS. The work covered dashboards, campaign creation and acceptance, negotiation screens, and interfaces for AI-assisted campaign generation and chat. I connected these screens to backend APIs and organized shared UI into reusable components, keeping each role's actions clear as users move between campaign details, conversations, and dashboard views.",
    description:
      "Developed frontend modules for a creator-brand platform with multi-role workflows for brands, creators, and admin users.",
    problem:
      "The platform needed clean frontend workflows for brands, creators, and admins while connecting campaign modules with backend APIs.",
    image: "/image/chainreach-thumbnail.png",
    imageSize: { width: 1425, height: 891 },
    imageFit: "contain",
    href: "/work/chainreach-ai",
    relatedWorkSlugs: ["nursephysiowala", "ai-case-calculator"],
    relatedServiceSlugs: ["frontend-development"],
    externalUrl: "https://chainreach.ai/",
  },
  {
    slug: "pivotal-physiocare",
    name: "Pivotal Physiocare - Home Physiotherapy Website",
    shortName: "Pivotal Physiocare",
    seoTitle: "Pivotal Physiocare Website Case Study | Arun Acharya",
    seoDescription: "Arun Acharya's Pivotal Physiocare website work: responsive service pages, practitioner profiles and home-visit enquiry paths for Noida and Greater Noida.",
    status: "Live Product",
    role: "Frontend / Full-Stack Developer",
    contributionSummary: "I built Pivotal Physiocare's responsive public website, organizing care information, practitioner profiles, service coverage, galleries and home-visit enquiry paths. This case study covers the website implementation, not clinical care or measured patient outcomes.",
    evidenceNote: "Patient counts, ratings, practitioner details and recovery stories are the practice's published information. They are not independently verified clinical claims or results attributed to my development work.",
    stack: ["Next.js", "Responsive UI", "Local SEO"],
    impact: "A conversion-focused home physiotherapy website combining local discovery, clinical trust, and direct booking.",
    listingSummary:
      "I developed a responsive Next.js website for a home physiotherapy practice serving Noida and Greater Noida. The site brings together service information, practitioner profiles, treatment locations, photo galleries, and patient-story sections using the practice's supplied content. My work focused on clear page structure, local service discovery, and accessible contact options, helping visitors move from learning about care to making a home-visit inquiry.",
    description:
      "Built a responsive healthcare website for Pivotal Physiocare, presenting home physiotherapy across Greater Noida and Noida through expert-led care, patient recovery stories, service pages, and direct home-visit booking.",
    problem:
      "The practice needed a trustworthy digital experience that explained its care clearly and helped patients or families move from local discovery to a confident home-visit enquiry.",
    image: "/image/pivotal-physiocare-thumbnail.png",
    imageSize: { width: 1425, height: 891 },
    imageFit: "contain",
    href: "/work/pivotal-physiocare",
    relatedWorkSlugs: ["nursephysiowala", "samriddhi-interiors"],
    relatedServiceSlugs: ["small-business-websites"],
    externalUrl: "https://www.pivotalphysiocare.com/",
  },
  {
    slug: "heyclo-clo-ai",
    name: "HeyClo / CLO AI - Animated Product Landing Page",
    shortName: "HeyClo (CLO AI)",
    seoTitle: "HeyClo (CLO AI): Next.js Landing Page | Arun Acharya",
    seoDescription: "How Arun Acharya built the HeyClo landing page with Next.js, Framer Motion and Lenis, including native mobile scrolling and reusable animated sections.",
    status: "Live Website",
    role: "Frontend Developer",
    contributionSummary:
      "I developed HeyClo's public landing page with Next.js, React, Framer Motion, and Lenis. My work covered responsive sections, animated product presentation, scrolling behavior, and the loading experience. The relationship-AI technology is outside this frontend contribution.",
    evidenceNote: "This documents my landing-page contribution, not development of HeyClo's relationship AI. Historical Lighthouse checks are not published here as a reproducible benchmark, and the live product may have changed since this work.",
    stack: ["Next.js","React","Framer Motion","Lenis"],
    impact: "A responsive product landing page with section motion and native scrolling on mobile.",
    listingSummary:
      "I developed HeyClo's product landing page with Next.js and React, translating its relationship-AI story into responsive sections and interactive visuals. Framer Motion handles section animation, while the scrolling component uses Lenis on desktop and native scrolling for touch, mobile, or reduced-motion preferences. The implementation separates lower-page sections through dynamic imports and cleans up its scroll loop when the component unmounts.",
    description:
      "A Next.js product landing page with Framer Motion sections, responsive presentation, and a native-mobile scrolling fallback.",
    problem:
      "The product needed a premium animated landing experience that stayed smooth, responsive, and performance-conscious across screen sizes.",
    image: "/image/clo.png",
    imageSize: { width: 1901, height: 936 },
    href: "/work/heyclo-clo-ai",
    relatedWorkSlugs: ["transcendence", "rey9-living"],
    relatedServiceSlugs: ["landing-pages"],
    externalUrl: "https://heyclo.com/",
  },
  {
    slug: "sound-of-meme",
    name: "Sound Of Meme - AI Music Generation Platform",
    shortName: "Sound Of Meme",
    seoTitle: "Sound Of Meme React Frontend Case Study | Arun Acharya",
    seoDescription: "Arun Acharya's Sound Of Meme frontend work: React, Redux Toolkit, Axios integrations, playlist interfaces, song discovery and debounced search.",
    status: "Frontend Project",
    role: "Lead Frontend Developer",
    contributionSummary:
      "I led Sound Of Meme's React frontend work, including music playback, song-generation screens, playlist management, and song discovery. I used Redux Toolkit for shared state and Axios for API integration, with reusable components, debounced search, and filtering. My contribution concerns the product interface rather than the underlying music-generation model.",
    evidenceNote: "This case study draws on the documented contribution and retained screenshot. The original source, current deployment, and reproducible performance measurements were not available for this review.",
    stack: ["React","Redux Toolkit","Axios","Tailwind CSS"],
    impact: "A music-product frontend connecting playback, playlists, song discovery, and generation interfaces.",
    listingSummary:
      "I led frontend development for Sound Of Meme, connecting its music player, song-generation screens, playlists, and discovery interfaces. React components, Redux Toolkit state, and Axios requests support the interactive experience. My documented work includes debounced search, filtering, data fetching, cached results, and keeping song or playlist changes reflected in the UI. The case study distinguishes that contribution from backend model development and unverified performance figures.",
    description:
      "React frontend development for music playback, playlists, song discovery, and generation interfaces, using Redux Toolkit and Axios.",
    problem:
      "The product needed a scalable frontend from scratch, smooth AI song generation flows, a music player system, and better production performance.",
    image: "/image/soundofmeme.png",
    imageSize: { width: 1440, height: 900 },
    href: "/work/sound-of-meme",
    relatedWorkSlugs: ["chainreach-ai", "heyclo-clo-ai"],
    relatedServiceSlugs: ["performance-optimization"],
  },
  {
    slug: "samriddhi-interiors",
    name: "Samriddhi Interiors - Premium Interior & Construction Website",
    shortName: "Samriddhi Interiors",
    seoTitle: "Samriddhi Interiors Website Case Study | Arun Acharya",
    seoDescription: "Arun Acharya's freelance website work for Samriddhi Interiors: service navigation, project galleries, responsive layouts and consultation enquiry flows.",
    status: "Live Freelance Project",
    role: "Freelance Frontend Developer",
    contributionSummary: "I built Samriddhi Interiors' client-facing website with Next.js and TypeScript, organizing service categories, project photography, studio information and consultation enquiries. The interior projects and customer relationships shown on that site belong to the client, not to my development portfolio.",
    evidenceNote: "Business history, client logos, testimonials and interior-project totals are content supplied or published by Samriddhi Interiors. They are not my software-delivery metrics or independently measured results of the website.",
    stack: ["Next.js", "TypeScript", "Framer Motion", "Responsive UI"],
    impact: "A live premium interiors website built to turn portfolio credibility into consultation inquiries.",
    listingSummary:
      "I built Samriddhi Interiors' business website using Next.js, TypeScript, and Framer Motion, giving its services and project photography a clear, responsive presentation. The page connects the studio's story, service offering, portfolio, process, and testimonials in a consistent visual flow. I also implemented consultation entry points through the contact form, phone, email, and WhatsApp, making it straightforward for visitors to discuss an interiors project.",
    description:
      "Built a polished business website for Samriddhi Interiors with a premium hero, service architecture, portfolio showcases, client proof, testimonials, and a direct inquiry flow.",
    problem:
      "The client needed a premium online presence that could explain a wide interior and construction service offering, showcase major projects, build trust, and convert visitors into consultation leads.",
    image: "/image/samriddhi.png",
    imageSize: { width: 1440, height: 900 },
    href: "/work/samriddhi-interiors",
    relatedWorkSlugs: ["rey9-living", "pivotal-physiocare"],
    relatedServiceSlugs: ["small-business-websites"],
    externalUrl: "https://www.samriddhiinteriors.com/",
  },
  {
    slug: "nursephysiowala",
    name: "NursePhysioWala - Healthcare Services Marketplace",
    shortName: "NursePhysioWala",
    seoTitle: "NursePhysioWala: Next.js Frontend | Arun Acharya",
    seoDescription: "Arun Acharya's NursePhysioWala frontend: Next.js App Router, Firebase authentication, Firestore, and service discovery for a healthcare marketplace concept.",
    status: "Public Website",
    role: "Frontend Developer",
    contributionSummary: "I worked on the Next.js App Router frontend and application foundation for NursePhysioWala, using Firebase authentication and Firestore. The public experience presents nursing and physiotherapy services and request entry points. Private allocation, payment, and administrative workflows are not established as completed by the available evidence.",
    stack: ["Next.js App Router","TypeScript","Firebase Auth","Firestore"],
    impact: "A healthcare marketplace frontend for nursing and physiotherapy discovery and service-request presentation.",
    listingSummary:
      "I worked on NursePhysioWala's marketplace frontend and application foundation using Next.js App Router, Firebase authentication, and Firestore. The public website presents nursing and physiotherapy services, location information, and request entry points. The case study focuses on service discovery, responsive presentation, and the application boundaries involved in a marketplace. It does not treat private allocation or payment workflows as verified deliveries.",
    description:
      "A Next.js healthcare marketplace frontend connecting nursing and physiotherapy discovery with service-request entry points.",
    problem:
      "People considering home nursing or physiotherapy need to understand the available services and where to begin a request. The design objective was to connect that public discovery journey with a marketplace-oriented application foundation.",
    image: "/image/nurse.png",
    imageSize: { width: 1440, height: 900 },
    href: "/work/nursephysiowala",
    relatedWorkSlugs: ["pivotal-physiocare", "chainreach-ai"],
    relatedServiceSlugs: ["product-mvp-development"],
    externalUrl: "https://nursephysiowala.in/",
  },
  {
    slug: "rey9-living",
    name: "Rey9 Living - Modular Interiors Website",
    shortName: "Rey9 Living",
    seoTitle: "Rey9 Living Interiors Website Demo | Arun Acharya",
    seoDescription: "Arun Acharya's Rey9 Living interface demo: modular-interiors collections, material exploration and project-planning screens. A demo, not a client-results claim.",
    status: "Website Demo",
    role: "Developer",
    contributionSummary: "I developed this Next.js interiors website demo with collection browsing, a material selector, gallery filters, and a client-side project estimator. Its calculations use local pricing factors to demonstrate the planning interaction; they are not validated commercial quotes.",
    stack: ["Next.js","TypeScript","React","Framer Motion"],
    impact:
      "An interactive interiors website showcasing steel kitchens, wardrobes, finishes, and project estimation.",
    listingSummary:
      "I developed this interiors website demo to present stainless-steel kitchens, wardrobes, materials, and finishes through a visual browsing experience. The interface combines large product imagery, collection sections, and a guided project-estimate flow, with a dark palette and warm metallic accents. My contribution focused on the public-facing presentation and planning interactions, showing how visitors could explore options before starting a project conversation.",
    description:
      "A premium interiors website demo combining product collections, material exploration, project imagery, and a guided estimate experience.",
    problem:
      "Interior products need space for visual exploration, but visitors also need practical ways to compare options and start planning a project.",
    image: "/image/rey9-living-thumbnail.webp",
    imageSize: { width: 1274, height: 717 },
    imageFit: "contain",
    href: "/work/rey9-living",
    relatedWorkSlugs: ["samriddhi-interiors", "heyclo-clo-ai"],
    relatedServiceSlugs: ["ui-ux-design"],
    externalUrl: "https://rey9living.vercel.app/",
  },
  {
    slug: "ai-case-calculator",
    name: "AI Case Calculator - Legal Technology Interface",
    shortName: "AI Case Calculator",
    seoTitle: "AI Case Calculator: Legal-Tech UI Demo | Arun Acharya",
    seoDescription: "Arun Acharya's legal-tech interface demo with case-analysis entry screens and an example valuation report. Sample figures, not validated legal estimates.",
    status: "Product Demo",
    role: "Developer",
    contributionSummary: "I developed the public-facing legal-tech interface shown in this demo, including its product introduction and sample report presentation. The displayed figures illustrate the UI; they are not validated case valuations, legal advice or evidence of AI-model development.",
    stack: ["Next.js","React","Redux Toolkit","Axios"],
    impact:
      "A legal technology product interface with an analysis entry point and a structured case-valuation report preview.",
    listingSummary:
      "I developed the public-facing interface for this legal technology demo, covering the product introduction, sign-in entry, and sample case-report presentation. The design organizes estimate figures and supporting context into readable cards so visitors can understand the proposed analysis journey. My work focuses on presenting the concept and report structure; the sample figures illustrate the interface and are not validated case valuations.",
    description:
      "A legal technology demo presenting the case-analysis journey through a focused landing page, sign-in entry, and example valuation report.",
    problem:
      "A case-analysis product needs to explain its workflow and make a dense report format understandable at a glance.",
    image: "/image/ai-case-calculator-thumbnail.webp",
    imageSize: { width: 1280, height: 720 },
    imageFit: "contain",
    href: "/work/ai-case-calculator",
    relatedWorkSlugs: ["chainreach-ai", "proofcohort"],
    relatedServiceSlugs: ["ui-ux-design"],
    externalUrl: "https://aicasecalculator-iota.vercel.app/",
  },
];

export const workProjects: WorkProject[] = projectEntries.map((project) => ({
  ...project,
  caseStudy: caseStudies[project.slug],
}));

export function getWorkProjectBySlug(slug: string) {
  return workProjects.find((project) => project.slug === slug);
}

export const homeWorkProjects = [
  "chainreach-ai",
  "heyclo-clo-ai",
  "sound-of-meme",
  "proofcohort",
]
  .map(getWorkProjectBySlug)
  .filter((project): project is WorkProject => project !== undefined);
