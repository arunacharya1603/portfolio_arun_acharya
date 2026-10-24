export type WorkChallenge = {
  title: string;
  challenge: string;
  tackle: string;
};

export type WorkProject = {
  slug: string;
  name: string;
  shortName: string;
  seoTitle: string;
  seoDescription: string;
  status: string;
  timeline?: string;
  role: string;
  contributionSummary: string;
  evidenceNote?: string;
  stack: string[];
  impact: string;
  listingSummary: string;
  description: string;
  problem: string;
  features: string[];
  image: string;
  imageSize: { width: number; height: number };
  imageFit?: "cover" | "contain";
  href: string;
  relatedWorkSlugs: string[];
  relatedServiceSlugs: string[];
  externalUrl?: string;
  overview: string;
  whatIDid: string[];
  howIDid: string[];
  challenges: WorkChallenge[];
  outcomes: string[];
};

export const workProjects: WorkProject[] = [
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
    features: [
      "Immersive landing page and brand storytelling",
      "Unit product showcases",
      "Experiences and project pages",
      "TRS software presentation",
      "Dashboard and analytics interfaces",
      "Demo inquiry entry points",
    ],
    image: "/image/transcendence-thumbnail.webp",
    imageSize: { width: 1280, height: 720 },
    imageFit: "contain",
    href: "/work/transcendence",
    relatedWorkSlugs: ["heyclo-clo-ai", "chainreach-ai"],
    relatedServiceSlugs: ["frontend-development"],
    externalUrl: "https://transcendenceplatform.com/",
    overview:
      "My responsibility covered the full project's frontend. I worked across the public-facing pages and dashboard interfaces, including product showcases, scroll-led storytelling, animated transitions, loading states, and responsive presentation.",
    whatIDid: [
      "Engineered the frontend across the public website, product pages, and dashboards.",
      "Built and refined the Unit, Experiences, and TRS product presentations.",
      "Implemented landing-page motion, smooth scrolling, and interactive visual treatments.",
      "Developed dashboard loading states, skeleton components, and analytics panels.",
      "Refined responsive layouts, accessibility, image delivery, and motion preferences.",
    ],
    howIDid: [
      "Used Next.js, TypeScript, and Tailwind CSS for the application and reusable frontend components.",
      "Combined GSAP-driven motion with Three.js visual components for immersive product storytelling.",
      "Used WebP assets, preloading, and loading states to support media-heavy pages.",
      "Refined page components and motion behavior across product, experience, and dashboard views.",
    ],
    challenges: [
      {
        title: "Explaining three connected offerings",
        challenge:
          "Hardware, experiences, and software each needed a distinct presentation within the same brand.",
        tackle:
          "I developed dedicated product and experience pages with a shared frontend language and clear routes through the site.",
      },
      {
        title: "Motion and usability",
        challenge:
          "Immersive animation needed to coexist with readable content and usable navigation.",
        tackle:
          "I refined scrolling, transitions, typography, accessibility, and motion preferences across the frontend.",
      },
      {
        title: "Media and loading states",
        challenge:
          "Visual sequences and dashboard content needed thoughtful presentation while loading.",
        tackle:
          "I worked on WebP assets, preload behavior, page loading states, and dashboard skeleton components.",
      },
    ],
    outcomes: [
      "Delivered frontend work across the full Transcendence project.",
      "Connected the brand website, product presentations, and dashboard interfaces through a shared visual system.",
      "Published frontend work can be explored at transcendenceplatform.com.",
    ],
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
    features: [
      "Program and learning-track discovery",
      "Student dashboard and project tasks",
      "Submission and assessment workflows",
      "Administrative review tools",
      "Public certificate verification",
      "Career resources and guides",
    ],
    image: "/image/proofcohort-thumbnail.webp",
    imageSize: { width: 1275, height: 717 },
    imageFit: "contain",
    href: "/work/proofcohort",
    relatedWorkSlugs: ["nursephysiowala", "chainreach-ai"],
    relatedServiceSlugs: ["web-apps-saas"],
    externalUrl: "https://proofcohort.in/",
    overview:
      "Proof Cohort brings program discovery, student progress, project submissions, and certificate verification into one platform. My development work includes public-facing pages, project resources, brand visuals, pricing behavior, and search-focused content.",
    whatIDid: [
      "Developed and refined the platform's public-facing pages and program presentation.",
      "Added project resources and guides across career areas.",
      "Worked on ProofCohort's brand artwork and image performance.",
      "Refined pricing behavior and certificate-related discovery content.",
    ],
    howIDid: [
      "Worked with a Next.js and TypeScript application styled with Tailwind CSS.",
      "Used the platform's Supabase-backed foundation for student and administrative workflows.",
      "Refined public-page content, image delivery, and resource organization.",
    ],
    challenges: [
      {
        title: "Turning programs into tangible work",
        challenge:
          "Visitors need to understand what they will build and how a program relates to their goals.",
        tackle:
          "I worked on program presentation and project resources that make the learning path more concrete.",
      },
      {
        title: "Making credentials discoverable",
        challenge:
          "Certificates need supporting information and a public verification path.",
        tackle:
          "I added certificate-related guides and discovery content alongside the platform's verification experience.",
      },
      {
        title: "A consistent public experience",
        challenge:
          "Programs, resources, pricing, and brand visuals need to read as parts of the same product.",
        tackle:
          "I refined public pages, pricing behavior, artwork, and image delivery across the site.",
      },
    ],
    outcomes: [
      "A live platform available at proofcohort.in.",
      "Program discovery supported by project resources and career guides.",
      "A product experience connecting learning tasks, assessment, and publicly verifiable credentials.",
    ],
  },
  {
    slug: "chainreach-ai",
    name: "ChainReach.ai - Creator and Brand Campaign Platform",
    shortName: "ChainReach.ai",
    seoTitle: "ChainReach.ai Frontend & Dashboard Case Study | Arun Acharya",
    seoDescription: "Arun Acharya's ChainReach.ai frontend work: brand, creator and admin dashboards, campaign and negotiation flows, AI interfaces and API integration.",
    status: "Live Product",
    timeline: "Jan 2026 - Present",
    role: "Frontend Developer",
    contributionSummary:
      "I built frontend workflows for brands, creators, and administrators on ChainReach.ai: dashboards, campaign creation and acceptance, negotiation screens, AI-assisted campaign generation, and chat. I connected these interfaces to backend APIs using Next.js, TypeScript, and Tailwind CSS. Dashboard access depends on the user's account and role.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    impact: "A large-scale creator-brand platform with dashboards, campaign flows, negotiation, and AI-assisted creation.",
    listingSummary:
      "I built frontend workflows for brands, creators, and administrators using Next.js, TypeScript, and Tailwind CSS. The work covered dashboards, campaign creation and acceptance, negotiation screens, and interfaces for AI-assisted campaign generation and chat. I connected these screens to backend APIs and organized shared UI into reusable components, keeping each role's actions clear as users move between campaign details, conversations, and dashboard views.",
    description:
      "Developed frontend modules for a creator-brand platform with multi-role workflows for brands, creators, and admin users.",
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
    image: "/image/chainreach-thumbnail.png",
    imageSize: { width: 1425, height: 891 },
    imageFit: "contain",
    href: "/work/chainreach-ai",
    relatedWorkSlugs: ["nursephysiowala", "ai-case-calculator"],
    relatedServiceSlugs: ["frontend-development"],
    externalUrl: "https://chainreach.ai/",
    overview:
      "ChainReach.ai is a creator and brand campaign platform with multi-role product surfaces. The frontend work covered dashboards, campaign creation, creator acceptance flows, negotiation screens, AI-assisted campaign generation, and global AI chat UI.",
    whatIDid: [
      "Developed frontend for brand, creator, and admin workflows.",
      "Developed responsive dashboards and campaign creation flows.",
      "Developed creator campaign acceptance flows and negotiation screens.",
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
      "Developed AI-assisted generation, global chat, campaign flows, dashboards, and negotiation screens.",
    ],
  },
  {
    slug: "pivotal-physiocare",
    name: "Pivotal Physiocare - Home Physiotherapy Website",
    shortName: "Pivotal Physiocare",
    seoTitle: "Pivotal Physiocare Website Case Study | Arun Acharya",
    seoDescription: "Arun Acharya's Pivotal Physiocare website work: responsive service pages, practitioner profiles and home-visit enquiry paths for Noida and Greater Noida.",
    status: "Live Product",
    timeline: "2026",
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
    features: [
      "Home-visit booking flow",
      "Care and service discovery",
      "Expert physiotherapist profiles",
      "Real treatment gallery",
      "Patient recovery stories",
      "Location-focused pages",
      "Call and contact actions",
    ],
    image: "/image/pivotal-physiocare-thumbnail.png",
    imageSize: { width: 1425, height: 891 },
    imageFit: "contain",
    href: "/work/pivotal-physiocare",
    relatedWorkSlugs: ["nursephysiowala", "samriddhi-interiors"],
    relatedServiceSlugs: ["small-business-websites"],
    externalUrl: "https://www.pivotalphysiocare.com/",
    overview:
      "Pivotal Physiocare is a live patient-enquiry website for personal home physiotherapy in Greater Noida and Noida. The experience combines expert-led credibility, real treatment moments, patient recovery journeys, care information, location coverage, and direct home-visit actions in one responsive flow.",
    whatIDid: [
      "Built the responsive public website and its patient-focused content hierarchy.",
      "Created a conversion-led hero with direct home-visit planning and call actions.",
      "Structured care, expert, location, resource, and contact paths for fast discovery.",
      "Presented the practice's published ratings, patient-count claims and care-team information.",
      "Built real-care gallery and patient-story sections around ten recovery journeys.",
      "Connected local service discovery with direct phone, contact, and booking paths.",
    ],
    howIDid: [
      "Used Next.js for a component-based, responsive website foundation.",
      "Designed the flow around a clear patient journey: trust, care options, proof, recovery stories, and enquiry.",
      "Balanced clinical credibility with calm, human photography and accessible language.",
      "Used service and location architecture to support discovery across Greater Noida and Noida.",
      "Kept high-intent actions visible through home-visit, call, and contact controls across screen sizes.",
    ],
    challenges: [
      {
        title: "Healthcare trust without a clinical feel",
        challenge:
          "The website needed to communicate professional expertise while still feeling calm, personal, and reassuring to patients and families.",
        tackle:
          "I combined named expert care, real treatment imagery, patient outcomes, clear proof points, and approachable language throughout the journey.",
      },
      {
        title: "Many recovery needs, one clear journey",
        challenge:
          "Visitors arrive with different needs including orthopedic, neurological, post-surgery, geriatric, pediatric, cardiopulmonary, and pain-management care.",
        tackle:
          "I organized the service architecture around scannable care paths while keeping home-visit planning as the consistent next action.",
      },
      {
        title: "Local discovery into direct enquiry",
        challenge:
          "The product needed to support local search intent and quickly convert it into a phone call or home-visit request.",
        tackle:
          "I connected Greater Noida and Noida coverage, location pages, service pages, persistent contact controls, and direct booking actions.",
      },
    ],
    outcomes: [
      "Delivered a live responsive website at pivotalphysiocare.com.",
      "Created direct home-visit planning, phone, and contact conversion paths.",
      "Organized practice-provided care-team information and patient stories within the website.",
      "Showcased ten patient recovery journeys and real treatment moments.",
      "Supported local service discovery across Greater Noida and Noida.",
    ],
  },
  {
    slug: "heyclo-clo-ai",
    name: "HeyClo / CLO AI - Animated Product Landing Page",
    shortName: "HeyClo (CLO AI)",
    seoTitle: "HeyClo (CLO AI) Framer Landing Page | Arun Acharya",
    seoDescription: "Arun Acharya's HeyClo (CLO AI) landing-page work with Framer and Lenis: animated sections, responsive layouts, smooth scrolling and loading behavior.",
    status: "Live Product",
    timeline: "Mar 2026 - Present",
    role: "Frontend / Framer Developer",
    contributionSummary:
      "I developed HeyClo's animated product landing page with Framer and Lenis, including responsive sections, smooth scrolling, interaction details, and the loading experience. My contribution focused on the public-facing product story and how it behaves across screen sizes. The published landing page is linked from this case study.",
    evidenceNote: "This documents my landing-page contribution, not development of HeyClo's relationship AI. Historical Lighthouse checks are not published here as a reproducible benchmark, and the live product may have changed since this work.",
    stack: ["Framer", "Lenis", "Responsive UI"],
    impact: "A fully animated product landing page with smooth scrolling and premium storytelling.",
    listingSummary:
      "I developed HeyClo's animated product landing page in Framer, translating its relationship-AI story into responsive sections and interactive visuals. I used Lenis for smooth scrolling and worked on section transitions, loading behavior, and the pacing of the page. The implementation included checks across screen sizes and Lighthouse-guided refinements, with attention to keeping navigation and text readable throughout the animated experience.",
    description:
      "Developed an animated landing page experience for HeyClo.com with smooth scrolling, responsive layouts, polished interaction design, and a loading experience tested across devices.",
    problem:
      "The product needed a premium animated landing experience that stayed smooth, responsive, and performance-conscious across screen sizes.",
    features: ["Animated landing page", "Smooth scrolling", "Responsive sections", "Loading experience", "Lighthouse checks"],
    image: "/image/clo.png",
    imageSize: { width: 1901, height: 936 },
    href: "/work/heyclo-clo-ai",
    relatedWorkSlugs: ["transcendence", "rey9-living"],
    relatedServiceSlugs: ["landing-pages"],
    externalUrl: "https://heyclo.com/",
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
      "Used Lighthouse checks to guide loading and page-quality improvements.",
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
          "I tested loading behavior and used Lighthouse findings to guide page-quality improvements.",
      },
    ],
    outcomes: [
      "Delivered a live animated product landing page.",
      "Created a smooth scrolling product storytelling experience.",
      "Improved responsiveness, animation behavior, loading quality, and Lighthouse checks.",
    ],
  },
  {
    slug: "sound-of-meme",
    name: "Sound Of Meme - AI Music Generation Platform",
    shortName: "Sound Of Meme",
    seoTitle: "Sound Of Meme React Frontend Case Study | Arun Acharya",
    seoDescription: "Arun Acharya's lead frontend work on Sound Of Meme: React and Redux architecture, music-player and song-generation interfaces, SEO and bundle optimization.",
    status: "Live Product",
    timeline: "Nov 2024 - Dec 2025",
    role: "Lead Frontend Developer",
    contributionSummary:
      "I led Sound Of Meme's frontend development from scratch using React, Redux, and Tailwind CSS. I built the music player and AI song-generation interface, established reusable components and hooks, and worked on bundle optimization and the SEO blog architecture. This case study documents that frontend scope and the engineering decisions behind it.",
    evidenceNote: "The approximately 8 MB to 2 MB bundle reduction is a historical project estimate. Before-and-after build artifacts and test conditions are not published here, so it is not a reproducible benchmark, a current site measurement or evidence of a ranking or conversion increase.",
    stack: ["React.js", "Redux", "Tailwind CSS"],
    impact: "An AI-powered music generation product with a scalable React architecture and optimized bundle size.",
    listingSummary:
      "I led frontend development for Sound Of Meme, building its React music player and song-generation interface with Redux state management and Tailwind CSS. I organized reusable components and hooks to support the product's interactive screens, then worked on lazy loading, route splitting, and rendering improvements. My contributions also included metadata, structured content, and blog presentation to support discovery alongside the core music experience.",
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
    imageSize: { width: 1440, height: 900 },
    href: "/work/sound-of-meme",
    relatedWorkSlugs: ["chainreach-ai", "heyclo-clo-ai"],
    relatedServiceSlugs: ["performance-optimization"],
    overview:
      "Sound Of Meme was an AI-powered music generation platform where I owned the frontend from scratch. The work covered scalable architecture, reusable components, custom hooks, maintainable UI flows, the core music player, AI song generation, SEO-focused frontend architecture, and production performance.",
    whatIDid: [
      "Led frontend development from scratch.",
      "Built scalable React.js architecture with reusable components and custom hooks.",
      "Built the core music player system.",
      "Built the user-facing AI song generation experience.",
      "Implemented metadata optimization, structured content, and 25+ blog pages.",
      "Worked on production bundle reduction through lazy loading and code splitting.",
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
          "The production frontend needed a smaller bundle and more selective loading.",
        tackle:
          "I used lazy loading, route-level code splitting, shared/global components, and rendering optimization to reduce the bundle. The historical size estimate and its limitations are noted above.",
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
      "Reduced the production frontend bundle; the historical estimate is qualified above.",
      "Built the core AI song generation and music player experience.",
      "Implemented SEO-focused architecture with 25+ blog pages.",
    ],
  },
  {
    slug: "samriddhi-interiors",
    name: "Samriddhi Interiors - Premium Interior & Construction Website",
    shortName: "Samriddhi Interiors",
    seoTitle: "Samriddhi Interiors Website Case Study | Arun Acharya",
    seoDescription: "Arun Acharya's freelance website work for Samriddhi Interiors: service navigation, project galleries, responsive layouts and consultation enquiry flows.",
    status: "Live Freelance Project",
    timeline: "2025",
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
    features: [
      "Premium hero section",
      "Service architecture",
      "Signature portfolio showcase",
      "Client and partner proof",
      "Process storytelling",
      "Testimonials",
      "Consultation inquiry flow",
    ],
    image: "/image/samriddhi.png",
    imageSize: { width: 1440, height: 900 },
    href: "/work/samriddhi-interiors",
    relatedWorkSlugs: ["rey9-living", "pivotal-physiocare"],
    relatedServiceSlugs: ["small-business-websites"],
    externalUrl: "https://www.samriddhiinteriors.com/",
    overview:
      "Samriddhi Interiors is a live freelance client project for an interiors and construction brand. The website presents the client's studio history, services, interior-project portfolio, client logos and testimonials alongside a consultation-focused contact flow. My contribution was the website, not the interior projects displayed within it.",
    whatIDid: [
      "Built the live client-facing website for Samriddhi Interiors.",
      "Created the premium landing structure around profile, projects, journal, about, services, and get-in-touch navigation.",
      "Built sections for 12 service categories including space planning, civil work, electrical and plumbing, renovation, sourcing, modular kitchens, custom furniture, painting, ceilings, exterior work, and fabrication.",
      "Structured portfolio and credibility sections around projects such as N.T.P.C Noida, Dabur India Limited, GTPL Hub, SK Enmove Gabriel, NIIT Center, Ease My Trip, Luxury Estate, and Serene Suite.",
      "Added client proof, testimonials, founder details, email, phone, WhatsApp, studio address, and inquiry form flow for leads.",
      "Reworked the project preview in this portfolio to use the actual live website screenshot.",
    ],
    howIDid: [
      "Used a modern Next.js and TypeScript frontend foundation for a polished, maintainable client website.",
      "Used motion and image-led sections to give the site a premium interior-studio feel without hiding the business information.",
      "Organized the page as a conversion path: hero, story, services, portfolio, clients, process, testimonials, and contact.",
      "Kept service information scannable even though the business covers a large interior and construction scope.",
      "Balanced premium visual hierarchy with practical lead-generation actions such as consultation, inquiry, phone, and WhatsApp contact.",
    ],
    challenges: [
      {
        title: "Premium trust for an offline service business",
        challenge:
          "Interior and construction clients need confidence before they inquire, especially when the business sells high-value space transformations.",
        tackle:
          "I used credibility metrics, founder context, project showcases, client logos, testimonials, and a polished editorial layout to make the brand feel established and trustworthy.",
      },
      {
        title: "Large service scope",
        challenge:
          "The business covers many services, from civil work and renovation to modular kitchens, ceilings, furniture, exterior work, and fabrication.",
        tackle:
          "I turned the services into a structured, scannable system so visitors can understand the full offering without reading a dense brochure-style page.",
      },
      {
        title: "Portfolio and lead generation together",
        challenge:
          "The site had to feel premium and visual, but still push visitors toward a practical consultation or inquiry.",
        tackle:
          "I connected the visual storytelling with clear consultation CTAs, contact details, WhatsApp/phone paths, and an inquiry form near the end of the page.",
      },
    ],
    outcomes: [
      "Delivered a live freelance client website at samriddhiinteriors.com.",
      "Showcased 12 interior and construction service categories.",
      "Presented signature portfolio work, client logos, testimonials, and founder-led credibility.",
      "Built a consultation-focused lead path with form, email, phone, WhatsApp, and address details.",
    ],
  },
  {
    slug: "nursephysiowala",
    name: "NursePhysioWala - Healthcare Services Marketplace",
    shortName: "NursePhysioWala",
    seoTitle: "NursePhysioWala Booking Platform Case Study | Arun Acharya",
    seoDescription: "Arun Acharya's NursePhysioWala work as founder and frontend developer: booking flows, patient and practitioner dashboards, allocation and deployment.",
    status: "Live Product",
    timeline: "Personal Product",
    role: "Founder and Frontend Developer",
    contributionSummary: "As NursePhysioWala's founder and frontend developer, I built the marketplace's patient, practitioner and admin workflows, request allocation with manual override, service pages and deployment setup. This is a software implementation case study, not evidence of clinical outcomes.",
    stack: ["Next.js", "TypeScript", "Firebase", "Vercel"],
    impact: "A live healthcare booking marketplace with patient, physiotherapist, and admin workflows.",
    listingSummary:
      "I built the frontend for NursePhysioWala's nursing and physiotherapy marketplace using Next.js, TypeScript, and Firebase. My work covered patient request and booking screens, practitioner dashboards, and administrative tools for allocating requests with a manual override. I also developed service-discovery pages and the Vercel deployment setup, connecting the public website with the application interfaces used to manage requests and coordinate service availability.",
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
    imageSize: { width: 1440, height: 900 },
    href: "/work/nursephysiowala",
    relatedWorkSlugs: ["pivotal-physiocare", "chainreach-ai"],
    relatedServiceSlugs: ["product-mvp-development"],
    externalUrl: "https://nursephysiowala.in/",
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
    slug: "rey9-living",
    name: "Rey9 Living - Modular Interiors Website",
    shortName: "Rey9 Living",
    seoTitle: "Rey9 Living Interiors Website Demo | Arun Acharya",
    seoDescription: "Arun Acharya's Rey9 Living interface demo: modular-interiors collections, material exploration and project-planning screens. A demo, not a client-results claim.",
    status: "Website Demo",
    role: "Developer",
    contributionSummary: "I developed the public-facing interiors website interface shown in this demo. It presents collections, materials and project-planning interactions; this overview does not claim a commissioned client launch or measured business results.",
    stack: [],
    impact:
      "An interactive interiors website showcasing steel kitchens, wardrobes, finishes, and project estimation.",
    listingSummary:
      "I developed this interiors website demo to present stainless-steel kitchens, wardrobes, materials, and finishes through a visual browsing experience. The interface combines large product imagery, collection sections, and a guided project-estimate flow, with a dark palette and warm metallic accents. My contribution focused on the public-facing presentation and planning interactions, showing how visitors could explore options before starting a project conversation.",
    description:
      "A premium interiors website demo combining product collections, material exploration, project imagery, and a guided estimate experience.",
    problem:
      "Interior products need space for visual exploration, but visitors also need practical ways to compare options and start planning a project.",
    features: [
      "Kitchen, wardrobe, and vanity collections",
      "Material and finish exploration",
      "Before-and-after comparison interface",
      "Guided project estimator",
      "Project gallery filters",
      "Consultation inquiry interface",
    ],
    image: "/image/rey9-living-thumbnail.webp",
    imageSize: { width: 1274, height: 717 },
    imageFit: "contain",
    href: "/work/rey9-living",
    relatedWorkSlugs: ["samriddhi-interiors", "heyclo-clo-ai"],
    relatedServiceSlugs: ["ui-ux-design"],
    externalUrl: "https://rey9living.vercel.app/",
    overview:
      "Rey9 Living uses a dark palette, warm metallic accents, and large product sections to present stainless-steel modular interiors. Interactive collection and planning tools extend the experience beyond a static gallery.",
    whatIDid: ["Developed the public-facing interiors website interface."],
    howIDid: [],
    challenges: [],
    outcomes: ["A live website demo showcasing product discovery and project-planning interfaces."],
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
    stack: [],
    impact:
      "A legal technology product interface with an analysis entry point and a structured case-valuation report preview.",
    listingSummary:
      "I developed the public-facing interface for this legal technology demo, covering the product introduction, sign-in entry, and sample case-report presentation. The design organizes estimate figures and supporting context into readable cards so visitors can understand the proposed analysis journey. My work focuses on presenting the concept and report structure; the sample figures illustrate the interface and are not validated case valuations.",
    description:
      "A legal technology demo presenting the case-analysis journey through a focused landing page, sign-in entry, and example valuation report.",
    problem:
      "A case-analysis product needs to explain its workflow and make a dense report format understandable at a glance.",
    features: [
      "Case-analysis entry point",
      "Sign-in navigation",
      "Example case-valuation report",
      "Settlement-range visualization",
      "Report cards for probability, duration, and precedent context",
    ],
    image: "/image/ai-case-calculator-thumbnail.webp",
    imageSize: { width: 1280, height: 720 },
    imageFit: "contain",
    href: "/work/ai-case-calculator",
    relatedWorkSlugs: ["chainreach-ai", "proofcohort"],
    relatedServiceSlugs: ["ui-ux-design"],
    externalUrl: "https://aicasecalculator-iota.vercel.app/",
    overview:
      "The public interface pairs a concise product introduction with a sample report that groups estimates and supporting context into readable cards. The displayed figures illustrate the report interface; they are not measured project outcomes.",
    whatIDid: ["Developed the public-facing legal technology product interface."],
    howIDid: [],
    challenges: [],
    outcomes: ["A publicly accessible product demo with an example report presentation."],
  },
];

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
