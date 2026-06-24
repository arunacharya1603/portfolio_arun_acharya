"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  animate as animateValue,
  motion,
  useInView,
  useMotionValueEvent,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import Lenis from "lenis";
import {
  ArrowRight,
  ArrowUpRight,
  AtSign,
  Blocks,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Code2,
  ExternalLink,
  Figma,
  Gauge,
  Github,
  Globe2,
  Layers3,
  Linkedin,
  Menu,
  MessageSquareText,
  Rocket,
  Search,
  Send,
  ServerCog,
  ShieldCheck,
  Timer,
  Wand2,
  X,
  type LucideIcon,
} from "lucide-react";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type MouseEvent,
  type ReactNode,
} from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  CinematicHero,
  StoryAbout,
  ProjectShowcase,
  ProcessJourney,
  ProofMetrics,
  ClimaticCTA,
} from "./features/landing";
import { workProjects, type WorkProject } from "@/data/work-projects";
import { siteConfig } from "@/lib/site";

type StatItem = {
  value: number;
  suffix: string;
  label: string;
  note: string;
};

type ProjectItem = WorkProject;

type ServiceItem = {
  title: string;
  icon: LucideIcon;
  for: string;
  deliver: string;
  outcome: string;
};

type PackageItem = {
  title: string;
  price: string;
  delivery: string;
  bestFor: string;
  features: string[];
  featured?: boolean;
};

type ExperienceItem = {
  title: string;
  period: string;
  focus: string;
  details: string;
};

const navItems = [
  { name: "Work", href: "/work" },
  { name: "About", href: "/about" },
  { name: "Experience", href: "/experience" },
  { name: "Services", href: "/services" },
  { name: "Process", href: "/process" },
  { name: "Pricing", href: "/pricing" },
  { name: "Reviews", href: "/reviews" },
  { name: "Contact", href: "/#contact" },
];

const stats: StatItem[] = [
  {
    value: 11,
    suffix: "+",
    label: "Projects completed",
    note: "Websites, apps, dashboards",
  },
  {
    value: 3,
    suffix: "y+",
    label: "Experience",
    note: "Frontend and full-stack delivery",
  },
  {
    value: 15,
    suffix: "+",
    label: "Clients",
    note: "Founders, agencies, businesses",
  },
  {
    value: 100,
    suffix: "%",
    label: "Success rate",
    note: "Clear execution and ownership",
  },
];

const heroTech = ["React", "Next.js", "TypeScript", "Framer Motion", "Node.js"];

const projects: ProjectItem[] = workProjects;

const services: ServiceItem[] = [
  {
    title: "Landing Pages",
    icon: Rocket,
    for: "Founders, creators, and businesses validating ideas quickly.",
    deliver: "A focused, responsive page with conversion copy, polished UI, and launch-ready setup.",
    outcome: "A fast first impression that makes the offer easy to understand and act on.",
  },
  {
    title: "Business Websites",
    icon: Globe2,
    for: "Small and medium businesses that need 4-8 professional pages.",
    deliver: "SEO-ready structure, responsive layouts, service pages, contact flows, and brand polish.",
    outcome: "A credible web presence that supports trust, discovery, and inbound leads.",
  },
  {
    title: "UI/UX Redesign",
    icon: Wand2,
    for: "Teams with an existing website or product that needs sharper usability.",
    deliver: "Figma-based redesigns converted into clean React or Next.js interfaces.",
    outcome: "Clearer hierarchy, smoother journeys, and a product that feels more premium.",
  },
  {
    title: "Full-Stack Web Apps",
    icon: ServerCog,
    for: "Products needing auth, dashboards, APIs, databases, and admin panels.",
    deliver: "Frontend and backend architecture with scalable data flows and deployment readiness.",
    outcome: "A usable product foundation that can grow beyond the first version.",
  },
  {
    title: "Performance Optimization",
    icon: Gauge,
    for: "Sites and apps that feel slow, messy, or hard to trust on mobile.",
    deliver: "Speed, accessibility, SEO, responsive behavior, and deployment improvements.",
    outcome: "A faster, more stable product that users can move through without friction.",
  },
  {
    title: "Product MVP Development",
    icon: Blocks,
    for: "Founders who need to turn a concept into a launch-ready MVP.",
    deliver: "Strategy, interface design, product flows, engineering, and Vercel deployment.",
    outcome: "A real product surface ready for users, demos, investors, or early customers.",
  },
];

const packages: PackageItem[] = [
  {
    title: "Starter Landing Page",
    price: "Starts at USD 200 / INR 15,000",
    delivery: "3-5 days",
    bestFor: "Best for founders, creators, and local businesses validating fast.",
    features: ["Single premium page", "Responsive build", "SEO basics", "Vercel deployment"],
  },
  {
    title: "Business Website",
    price: "Starts at USD 600 / INR 45,000",
    delivery: "7-14 days",
    bestFor: "Best for small and medium businesses needing 4-8 professional pages.",
    features: ["Multi-page system", "Service content structure", "Lead capture", "Performance polish"],
    featured: true,
  },
  {
    title: "Custom Full-Stack Web App",
    price: "Starts at USD 1500 / INR 1,10,000",
    delivery: "3-8 weeks",
    bestFor: "Best for products needing auth, dashboards, APIs, and scalable architecture.",
    features: ["Auth and roles", "Dashboards", "APIs and database", "Scalable deployment"],
  },
];

const processSteps = [
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

const experience: ExperienceItem[] = [
  {
    title: "Frontend Developer & Marketing Lead at Persist Ventures",
    period: "2022-2026",
    focus: "Product frontend, marketing systems, launch support",
    details:
      "Built SoundOfMeme platform surfaces, led weekly Twitter live sessions, created LinkedIn marketing videos, conducted college outreach, implemented playlist features, Excel export, and server load testing for 1000+ songs.",
  },
  {
    title: "Frontend Engineer at Bump FM",
    period: "2022-2026",
    focus: "Social audio UX, playlist systems, performance",
    details:
      "Developed persistent playlist management with CRUD operations, sidebar integration, optimized UI/UX, and performance improvements for repeat listening flows.",
  },
  {
    title: "Freelance Full-Stack Developer",
    period: "2022-2026",
    focus: "Strategy, UI/UX, full-stack delivery, Vercel deployment",
    details:
      "Built portfolio websites and web applications for clients, managed projects from concept to deployment, and shipped products with practical end-to-end ownership.",
  },
];

const techStack = [
  "React",
  "Next.js",
  "TypeScript",
  "Framer Motion",
  "Node.js",
  "Tailwind CSS",
  "REST APIs",
  "Vercel",
  "Figma",
  "UI/UX Design",
  "SEO",
  "Performance Optimization",
];

const caseStudyPattern = [
  "Context",
  "Challenge",
  "Solution",
  "Features built",
  "UI/UX decisions",
  "Tech stack",
  "Performance",
  "Outcome",
];

const trustBadges = [
  "Fast Delivery",
  "Clean Code",
  "SEO Ready",
  "Responsive Design",
  "Vercel Deployment",
  "Post-launch Support",
];

const locations = [
  "Bengaluru",
  "Mumbai",
  "Delhi NCR",
  "Dubai",
  "London",
  "New York",
  "Toronto",
  "Sydney",
];

const socialLinks = [
  { label: "GitHub", href: siteConfig.github, icon: Github },
  { label: "LinkedIn", href: siteConfig.linkedin, icon: Linkedin },
  { label: "X", href: siteConfig.x, icon: AtSign },
];

const pageLinks = [
  {
    title: "Work",
    href: "/work",
    copy: "Case-study cards, project logic, stack, features, and outcomes.",
    icon: Layers3,
  },
  {
    title: "Experience",
    href: "/experience",
    copy: "Career highlights across product, marketing, frontend, and freelance delivery.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Services",
    href: "/services",
    copy: "Landing pages, business websites, UI/UX redesign, apps, MVPs, and optimization.",
    icon: Blocks,
  },
  {
    title: "Process",
    href: "/process",
    copy: "Research, interface design, precision engineering, launch, and optimization.",
    icon: Search,
  },
  {
    title: "Pricing",
    href: "/pricing",
    copy: "Transparent starting points for serious scopes without cheapening the work.",
    icon: Timer,
  },
  {
    title: "Reviews",
    href: "/reviews",
    copy: "Verified proof placeholder, delivery badges, and trust signals.",
    icon: ShieldCheck,
  },
];

const mailto = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
  "Project inquiry for Arun Acharya"
)}&body=${encodeURIComponent(
  "Hi Arun,\n\nI have a project in mind.\n\nProject type:\nTimeline:\nBudget range:\nWhat I want to build:\n\n"
)}`;

const callMailto = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
  "Book a project call"
)}&body=${encodeURIComponent(
  "Hi Arun,\n\nI would like to book a call.\n\nProject context:\nPreferred time:\nTimezone:\n\n"
)}`;

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0 },
};

export default function StudioPortfolio() {
  const shouldReduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    setMounted(true);
    if (shouldReduceMotion || !isHome) {
      // Mock loading for subpages or reduced motion
      let prg = 0;
      const interval = window.setInterval(() => {
        prg = Math.min(100, prg + 10);
        setLoadProgress(prg);
        if (prg === 100) {
          window.clearInterval(interval);
          window.setTimeout(() => setLoading(false), 200);
        }
      }, 50);
      return () => window.clearInterval(interval);
    }
  }, [shouldReduceMotion, isHome]);

  useEffect(() => {
    if (!loading) {
      // Delay slightly to let the loading screen exit transition complete and layout settle
      const timeout = window.setTimeout(() => {
        ScrollTrigger.refresh();
      }, 850);
      return () => window.clearTimeout(timeout);
    }
  }, [loading]);

  return (
    <PortfolioScaffold loading={mounted && loading} loadProgress={loadProgress}>
      <LandingHome onLoadProgress={(p) => {
        if (isHome && !shouldReduceMotion) {
          setLoadProgress(p);
          if (p === 100) {
            window.setTimeout(() => setLoading(false), 300);
          }
        }
      }} />
    </PortfolioScaffold>
  );
}

export function WorkPageContent() {
  return (
    <PortfolioScaffold>
      <PageHero
        eyebrow="Work"
        title="Selected builds with product logic, interface craft, and engineering underneath."
        copy="This is the deeper work page: project context, problems solved, features, stack decisions, visual previews, and reusable case-study structure."
      />
      <WorkGrid />
      <CaseStudyBlueprint />
      <PageCta />
    </PortfolioScaffold>
  );
}

export function ExperiencePageContent() {
  return (
    <PortfolioScaffold>
      <PageHero
        eyebrow="Experience"
        title="Career highlights across product, frontend, marketing, and client delivery."
        copy="The timeline shows Arun as more than a coder: product thinking, marketing loops, user experience, performance, and end-to-end ownership."
      />
      <ExperienceTimeline />
      <PageCta />
    </PortfolioScaffold>
  );
}

export function ServicesPageContent() {
  return (
    <PortfolioScaffold>
      <PageHero
        eyebrow="Services"
        title="Conversion-focused services for founders, businesses, agencies, and product teams."
        copy="Each service is scoped around who it helps, what gets delivered, and the outcome the project should create."
      />
      <ServicesGrid />
      <PageCta />
    </PortfolioScaffold>
  );
}

export function ProcessPageContent() {
  return (
    <PortfolioScaffold>
      <PageHero
        eyebrow="Process"
        title="A clear build system for strategy, interface design, engineering, and launch."
        copy="Motion and interaction are used where they explain the process: progress, sequencing, hierarchy, and readiness."
      />
      <ProcessBlueprint />
      <TechStackSection />
      <AboutSection />
      <PageCta />
    </PortfolioScaffold>
  );
}

export function PricingPageContent() {
  return (
    <PortfolioScaffold>
      <PageHero
        eyebrow="Pricing"
        title="Premium starting points with enough clarity to plan seriously."
        copy="Transparent packages help qualify scope without making the work feel cheap. Final quote depends on timeline, integrations, content, and product complexity."
      />
      <PricingGrid />
      <LocationSeoSection />
      <PageCta />
    </PortfolioScaffold>
  );
}

export function ReviewsPageContent() {
  return (
    <PortfolioScaffold>
      <PageHero
        eyebrow="Reviews"
        title="Trust signals now. Verified testimonials only after approval."
        copy="No fake repeated quotes or placeholder names. The proof surface is ready for real client testimonials when they are verified."
      />
      <ProofSection />
      <PageCta />
    </PortfolioScaffold>
  );
}

export function WorkProjectPageContent({ project }: { project: ProjectItem }) {
  const relatedProjects = projects.filter((item) => item.slug !== project.slug).slice(0, 3);
  const projectFacts = [
    { label: "Role", value: project.role },
    { label: "Timeline", value: project.timeline },
    { label: "Status", value: project.status },
  ];
  const narrativeSections = [
    {
      eyebrow: "01",
      title: "What I delivered",
      copy: "The work stayed focused on the real product surface: layout, motion, responsiveness, and launch quality.",
      items: project.whatIDid,
    },
    {
      eyebrow: "02",
      title: "How it was built",
      copy: "The implementation choices were shaped around clarity, controlled interaction, and a page that holds together across screen sizes.",
      items: project.howIDid,
    },
  ];

  return (
    <PortfolioScaffold>
      <section className="px-4 pb-10 pt-8 sm:px-6 lg:pb-14 lg:pt-12">
        <div className="mx-auto w-full max-w-6xl">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 rounded-full border border-[#f4efe3]/12 px-4 py-2 text-sm font-semibold text-[#f4efe3]/74 transition hover:border-[#f4efe3]/35 hover:bg-[#f4efe3] hover:text-[#0d0c09] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f4efe3]"
          >
            <ArrowRight className="h-4 w-4 rotate-180" />
            Back to work
          </Link>

          <div className="mt-10 grid min-w-0 gap-9 lg:grid-cols-[minmax(0,0.68fr)_minmax(280px,0.32fr)] lg:items-end">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-[#d8c4a4]">{project.status}</p>
              <h1 className="mt-4 max-w-full break-words [overflow-wrap:anywhere] [word-break:break-word] font-grotesk text-6xl font-semibold leading-[0.9] text-[#f4efe3] sm:text-7xl lg:text-8xl" style={{ maxWidth: "min(56rem, calc(100vw - 2rem))" }}>
                {project.shortName}
              </h1>
              <p className="mt-5 max-w-full break-words [overflow-wrap:anywhere] [word-break:break-word] text-base font-semibold leading-7 text-[#f4efe3]/86 sm:text-xl sm:leading-8" style={{ maxWidth: "min(48rem, calc(100vw - 2rem))" }}>
                {project.name}
              </p>
              <p className="mt-6 max-w-full break-words [overflow-wrap:anywhere] [word-break:break-word] text-base leading-8 text-[#f4efe3]/72 sm:text-lg sm:leading-9" style={{ maxWidth: "min(48rem, calc(100vw - 2rem))" }}>
                {project.description}
              </p>
            </div>

            <aside className="max-w-full border-y border-[#f4efe3]/12 text-sm" style={{ maxWidth: "min(100%, calc(100vw - 2rem))" }}>
              {projectFacts.map((fact) => (
                <div key={fact.label} className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-4 border-b border-[#f4efe3]/12 py-4 last:border-b-0">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#f4efe3]/38">{fact.label}</p>
                  <p className="font-semibold leading-6 text-[#f4efe3]">{fact.value}</p>
                </div>
              ))}
            </aside>
          </div>
        </div>
      </section>

      <section className="px-4 pb-14 sm:px-6 lg:pb-20">
        <div className="mx-auto w-full max-w-6xl">
          <figure>
            <div className="relative aspect-[16/11] overflow-hidden rounded-lg border border-[#f4efe3]/12 bg-[#15120d] sm:aspect-[16/9]">
              <Image
                src={project.image}
                alt={`${project.name} preview`}
                fill
                priority
                sizes="(min-width: 1280px) 72rem, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-5 grid gap-3 border-l border-[#d8c4a4]/50 pl-4 text-sm leading-7 text-[#f4efe3]/72 sm:grid-cols-[7rem_minmax(0,1fr)]">
              <span className="font-bold uppercase tracking-[0.16em] text-[#d8c4a4]">Impact</span>
              <span>{project.impact}</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section id="case-study" className="px-4 py-14 sm:px-6 lg:py-20">
        <div className="mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-[280px_minmax(0,1fr)] lg:items-start">
          <aside className="lg:sticky lg:top-28">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#f4efe3]/40">Case study</p>
            <h2 className="mt-4 font-grotesk text-4xl font-semibold leading-[0.96] text-[#f4efe3]">
              Clear scope. Real decisions. Finished work.
            </h2>
            <div className="mt-7 flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <span key={item} className="rounded-full border border-[#f4efe3]/12 px-3 py-1.5 text-xs font-semibold text-[#f4efe3]/70">
                  {item}
                </span>
              ))}
            </div>
          </aside>

          <div className="min-w-0">
            <div className="grid gap-6 border-y border-[#f4efe3]/12 py-8 lg:grid-cols-2">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#d8c4a4]">Problem</p>
                <p className="mt-4 text-base leading-8 text-[#f4efe3]/76">{project.problem}</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#d8c4a4]">Project read</p>
                <p className="mt-4 text-base leading-8 text-[#f4efe3]/76">{project.overview}</p>
              </div>
            </div>

            <div className="divide-y divide-[#f4efe3]/12 border-b border-[#f4efe3]/12">
              {narrativeSections.map((section) => (
                <ProjectDetailBlock key={section.title} {...section} />
              ))}
            </div>
          </div>
        </div>
      </section>


      <section id="challenges" className="px-4 py-14 sm:px-6 lg:py-20">
        <div className="mx-auto w-full max-w-6xl">
          <div className="grid gap-5 border-b border-[#f4efe3]/12 pb-8 lg:grid-cols-[0.38fr_0.62fr] lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#f4efe3]/40">Challenges</p>
              <h2 className="mt-4 font-grotesk text-4xl font-semibold leading-[0.96] text-[#f4efe3] sm:text-5xl">
                The parts that needed judgment.
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-8 text-[#f4efe3]/70 lg:justify-self-end">
              These are the design and implementation decisions that kept the page useful, responsive, and polished instead of just animated.
            </p>
          </div>

          <div className="divide-y divide-[#f4efe3]/12 border-b border-[#f4efe3]/12">
            {project.challenges.map((item, index) => (
              <article key={item.title} className="grid gap-5 py-8 lg:grid-cols-[5rem_minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
                <p className="font-grotesk text-3xl font-semibold leading-none text-[#d8c4a4]">{String(index + 1).padStart(2, "0")}</p>
                <div>
                  <h3 className="font-grotesk text-3xl font-semibold leading-[0.98] text-[#f4efe3]">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-[#f4efe3]/66">{item.challenge}</p>
                </div>
                <div className="border-l border-[#f4efe3]/12 pl-5">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#f4efe3]/38">Response</p>
                  <p className="mt-3 text-sm leading-7 text-[#f4efe3]/78">{item.tackle}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="outcome" className="px-4 py-14 sm:px-6 lg:py-20">
        <div className="mx-auto grid w-full max-w-6xl gap-8 border-y border-[#f4efe3]/12 py-10 lg:grid-cols-[0.38fr_0.62fr] lg:items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#f4efe3]/40">Outcome</p>
            <h2 className="mt-4 font-grotesk text-4xl font-semibold leading-[0.96] text-[#f4efe3] sm:text-5xl">
              What the work left behind.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-[#f4efe3]/70">{project.impact}</p>
          </div>

          <div className="divide-y divide-[#f4efe3]/12 border-t border-[#f4efe3]/12 lg:border-t-0">
            {project.outcomes.map((outcome) => (
              <div key={outcome} className="flex gap-4 py-5">
                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#d8c4a4]" />
                <p className="text-sm leading-7 text-[#f4efe3]/80">{outcome}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 lg:py-20">
        <div className="mx-auto w-full max-w-6xl">
          <div className="flex flex-col gap-5 border-b border-[#f4efe3]/12 pb-7 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#f4efe3]/40">More work</p>
              <h2 className="mt-4 font-grotesk text-4xl font-semibold leading-[0.96] text-[#f4efe3]">
                Other selected builds.
              </h2>
            </div>
            <Link
              href="/work"
              className="group inline-flex w-fit items-center gap-2 rounded-full bg-[#f4efe3] px-5 py-3 text-sm font-semibold text-[#0d0c09] transition hover:bg-[#d8cfc0] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f4efe3]"
            >
              All Work
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {relatedProjects.map((item, index) => (
              <ProjectPreviewCard key={item.slug} project={item} index={index} />
            ))}
          </div>
        </div>
      </section>
    </PortfolioScaffold>
  );
}

function ProjectDetailBlock({
  eyebrow,
  title,
  copy,
  items,
}: {
  eyebrow: string;
  title: string;
  copy: string;
  items: string[];
}) {
  return (
    <article className="grid gap-6 py-9 lg:grid-cols-[0.38fr_0.62fr] lg:items-start">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#d8c4a4]">{eyebrow}</p>
        <h3 className="mt-4 font-grotesk text-3xl font-semibold leading-[0.98] text-[#f4efe3] sm:text-4xl">
          {title}
        </h3>
        <p className="mt-4 max-w-xl text-sm leading-7 text-[#f4efe3]/66">{copy}</p>
      </div>

      <div className="divide-y divide-[#f4efe3]/12 border-t border-[#f4efe3]/12 lg:border-t-0">
        {items.map((item) => (
          <div key={item} className="flex gap-4 py-4 first:pt-0 lg:first:pt-0">
            <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d8c4a4]" />
            <p className="text-sm leading-7 text-[#f4efe3]/78">{item}</p>
          </div>
        ))}
      </div>
    </article>
  );
}
function PortfolioScaffold({
  children,
  loading = false,
  loadProgress = 0,
}: {
  children: ReactNode;
  loading?: boolean;
  loadProgress?: number;
}) {
  return (
    <main className="relative isolate min-h-screen w-full max-w-[100vw] overflow-x-clip bg-[#0d0c09] text-[#f4efe3]">
      <SmoothScroll />
      <ScrollProgress />
      <PointerSignal />
      <AnimatePresence>{loading ? <LoadingScreen progress={loadProgress} /> : null}</AnimatePresence>
      <StudioHeader />
      {children}
      <StudioFooter />
      <MobileActionBar />
    </main>
  );
}

function SmoothScroll() {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 0.95,
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    lenis.on('scroll', () => {
      ScrollTrigger.update();
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };

    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [shouldReduceMotion]);

  return null;
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    mass: 0.18,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed left-0 top-0 z-[90] h-px w-full origin-left bg-[#f4efe3]"
      style={{ scaleX }}
    />
  );
}

function PointerSignal() {
  const shouldReduceMotion = useReducedMotion();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 420, damping: 34, mass: 0.25 });
  const springY = useSpring(y, { stiffness: 420, damping: 34, mass: 0.25 });
  const cursorX = useTransform(springX, (value) => value - 18);
  const cursorY = useTransform(springY, (value) => value - 18);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const supportsFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!supportsFinePointer) return;

    const handlePointerMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [shouldReduceMotion, x, y]);

  if (shouldReduceMotion) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[80] hidden h-9 w-9 rounded-full border border-[#f4efe3]/45 md:block"
      style={{ x: cursorX, y: cursorY }}
    >
      <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f4efe3]" />
    </motion.div>
  );
}

function LoadingScreen({ progress }: { progress: number }) {
  const shouldReduceMotion = useReducedMotion();
  const currentProgress = shouldReduceMotion ? 100 : progress;

  return (
    <motion.div
      className="fixed inset-0 z-[100] overflow-hidden bg-[#f4efe3] text-[#0d0c09]"
      initial={{ opacity: 1 }}
      exit={{ y: "-100%", transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] } }}
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-y-0 left-0 bg-[#0d0c09]"
        initial={{ width: "0%" }}
        animate={{ width: `${currentProgress}%` }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      />

      <div className="relative z-10 flex min-h-screen flex-col justify-between p-5 mix-blend-difference sm:p-8 lg:p-10">
        <div className="flex items-center justify-between gap-4 text-[#f4efe3]">
          <p className="font-grotesk text-lg font-semibold">Arun Acharya</p>
          <p className="text-right text-xs font-bold uppercase tracking-[0.22em] text-[#f4efe3]/80">
            Full-stack portfolio
          </p>
        </div>

        <div className="py-12 text-[#f4efe3]">
          <div className="overflow-hidden">
            <motion.p
              className="font-grotesk text-[18vw] font-semibold uppercase leading-[0.78] tracking-normal sm:text-[16vw] lg:text-[12vw]"
              initial={{ y: "115%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              Arun
            </motion.p>
          </div>
          <div className="overflow-hidden">
            <motion.p
              className="font-grotesk text-[18vw] font-semibold uppercase leading-[0.78] tracking-normal sm:text-[16vw] lg:text-[12vw]"
              initial={{ y: "115%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
            >
              Acharya
            </motion.p>
          </div>
        </div>

        <div className="text-[#f4efe3]">
          <div className="flex items-end justify-between gap-5 border-b border-[#f4efe3]/35 pb-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#f4efe3]/70">
                Loading the work
              </p>
              <p className="mt-2 max-w-xl text-sm leading-6 text-[#f4efe3]/80">
                Strategy, interface, code, launch.
              </p>
            </div>
            <p className="font-grotesk text-6xl font-semibold leading-none sm:text-8xl">
              {currentProgress.toString().padStart(2, "0")}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function StudioHeader() {
  const [open, setOpen] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");
  const [isAwayFromTop, setIsAwayFromTop] = useState(false);
  const { scrollY } = useScroll();
  const shouldReduceMotion = useReducedMotion();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const shouldHideHeader =
    !shouldReduceMotion && !open && isAwayFromTop && scrollDirection === "down";
  const shouldCompactHeader = isAwayFromTop || open;

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? current;
    const diff = current - previous;

    setIsAwayFromTop(current > 72);

    if (Math.abs(diff) < 6) return;
    setScrollDirection(diff > 0 ? "down" : "up");
  });

  return (
    <motion.header
      className={`studio-header z-50 px-3 pt-3 transition-opacity duration-500 sm:px-5 sm:pt-4 ${
        isHome ? "fixed left-0 right-0 top-0" : "sticky top-0"
      }`}
      animate={{ y: shouldHideHeader ? -104 : 0 }}
      transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className={`mx-auto w-full max-w-[1480px] overflow-hidden border backdrop-blur-2xl transition-[background,border-color,box-shadow,padding] duration-300 ${
          shouldCompactHeader
            ? "border-[#f4efe3]/16 bg-[#0d0c09]/78 shadow-[0_18px_70px_rgba(0,0,0,0.34)]"
            : "border-[#f4efe3]/10 bg-[#0d0c09]/42 shadow-none"
        } rounded-[8px]`}
      >
        <nav
          className={`flex min-w-0 items-center justify-between gap-2 px-2.5 transition-[padding] duration-300 sm:gap-4 sm:px-4 ${
            shouldCompactHeader ? "py-2" : "py-2.5 sm:py-3"
          }`}
          aria-label="Primary navigation"
        >
          <Link
            href="/"
            className="group flex min-w-0 items-center gap-2.5 rounded-[6px] pr-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f4efe3] sm:gap-3"
            aria-label="Arun Acharya home"
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[6px] border border-[#f4efe3]/16 bg-[#f4efe3] font-grotesk text-sm font-semibold text-[#0d0c09] shadow-[0_10px_30px_rgba(244,239,227,0.12)] transition group-hover:bg-[#fff8e8]">
              AA
            </span>
            <span className="min-w-0 leading-none">
              <span className="block truncate font-grotesk text-sm font-semibold text-[#f4efe3] sm:text-base">
                Arun Acharya
              </span>
              <span className="mt-1 block truncate text-[11px] text-[#f4efe3]/55 sm:text-xs">
                Full-Stack Architect
              </span>
            </span>
          </Link>

          <div className="hidden items-center gap-1 rounded-[8px] border border-[#f4efe3]/10 bg-[#f4efe3]/[0.045] p-1 lg:flex">
            {navItems.map((item) => {
              const active = item.href !== "/#contact" && pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative rounded-[6px] px-3 py-2 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f4efe3] ${
                    active
                      ? "bg-[#f4efe3]/12 text-[#f4efe3]"
                      : "text-[#f4efe3]/62 hover:bg-[#f4efe3]/8 hover:text-[#f4efe3]"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <Link
              href="/#contact"
              className="group inline-flex items-center gap-2 rounded-[6px] border border-[#f4efe3]/18 bg-[#f4efe3] px-3.5 py-2.5 text-sm font-semibold text-[#0d0c09] transition hover:bg-[#fff8e8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f4efe3]"
            >
              Start Project
              <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[6px] border border-[#f4efe3]/16 bg-[#f4efe3]/8 text-[#f4efe3] transition hover:bg-[#f4efe3]/12 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f4efe3] lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        <AnimatePresence>
          {open ? (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -8 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -8 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="border-t border-[#f4efe3]/12 bg-[#0d0c09]/92 lg:hidden"
            >
              <div className="grid gap-1 p-2 sm:grid-cols-2 sm:p-3">
                {navItems.map((item, index) => {
                  const active = item.href !== "/#contact" && pathname === item.href;

                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.025 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={`group flex min-h-[52px] items-center justify-between gap-4 rounded-[6px] border px-3.5 py-3 text-base font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f4efe3] ${
                          active
                            ? "border-[#f4efe3]/22 bg-[#f4efe3]/12 text-[#f4efe3]"
                            : "border-[#f4efe3]/10 bg-[#f4efe3]/[0.035] text-[#f4efe3]/86 hover:border-[#f4efe3]/20 hover:bg-[#f4efe3]/8 hover:text-[#f4efe3]"
                        }`}
                      >
                        <span>{item.name}</span>
                        <ArrowUpRight className="h-4 w-4 text-[#f4efe3]/45 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#f4efe3]" />
                      </Link>
                    </motion.div>
                  );
                })}
                <Link
                  href="/#contact"
                  onClick={() => setOpen(false)}
                  className="group mt-1 flex min-h-[52px] items-center justify-between rounded-[6px] bg-[#f4efe3] px-3.5 py-3 text-base font-semibold text-[#0d0c09] transition hover:bg-[#fff8e8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f4efe3] sm:col-span-2"
                >
                  Start Project
                  <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}

function LandingHome({ onLoadProgress }: { onLoadProgress?: (p: number) => void }) {
  return (
    <>
      <CinematicHero onLoadProgress={onLoadProgress} />
      <StoryAbout />
      <ProjectShowcase />
      <ProcessJourney />
      <ProofMetrics />
      <ClimaticCTA />
    </>
  );
}

function PageHero({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy: string;
}) {
  return (
    <section className="px-4 pb-12 pt-14 sm:px-6 lg:pb-16 lg:pt-20">
      <div className="mx-auto max-w-7xl border-b border-white/10 pb-12">
        <Reveal>
          <p className="text-sm font-bold text-cyan-200">{eyebrow}</p>
          <h1 className="mt-5 max-w-5xl font-grotesk text-4xl font-semibold leading-tight text-white md:text-6xl lg:text-7xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-xl">
            {copy}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function WorkGrid() {
  return (
    <section className="px-4 py-12 sm:px-6 lg:py-16">
      <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 xl:grid-cols-12">
        {projects.map((project, index) => (
          <ProjectCard key={project.name} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: ProjectItem; index: number }) {
  const isExternal = project.href.startsWith("http");
  const span =
    index === 0
      ? "xl:col-span-7"
      : index === 1
        ? "xl:col-span-5"
        : index === 6
          ? "xl:col-span-8"
          : "xl:col-span-4";

  return (
    <Reveal delay={index * 0.035} className={`h-full ${span}`}>
      <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-[#f4efe3]/12 bg-[#f4efe3]/[0.045]">
        <ProjectImage project={project} priority={index < 2} />

        <div className="flex flex-1 flex-col p-5 md:p-6">
          <div className="flex items-start justify-between gap-5">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-[#f4efe3]/55">{project.role}</p>
              <h2 className="mt-2 line-clamp-2 min-h-[3.75rem] font-grotesk text-2xl font-semibold leading-tight text-[#f4efe3] md:min-h-[4.75rem] md:text-3xl">
                {project.name}
              </h2>
            </div>
            <ProjectAction href={project.href} label={`View case study for ${project.name}`} />
          </div>

          <p className="mt-4 text-sm leading-7 text-[#f4efe3]/72">{project.description}</p>

          <div className="mt-5 grid gap-4 border-t border-[#f4efe3]/12 pt-5 lg:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#f4efe3]/40">Problem solved</p>
              <p className="mt-2 text-sm leading-6 text-[#f4efe3]/70">{project.problem}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#f4efe3]/40">Key features</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {project.features.map((feature) => (
                  <span key={feature} className="rounded-full border border-[#f4efe3]/12 bg-[#f4efe3]/6 px-3 py-1 text-xs font-semibold text-[#f4efe3]/70">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <span key={item} className="rounded-full bg-[#d8c4a4]/10 px-3 py-1 text-xs font-semibold text-[#d8c4a4]">
                {item}
              </span>
            ))}
          </div>

          <Link
            href={project.href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#f4efe3] transition hover:text-[#d8c4a4] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d8c4a4]"
          >
            View Case Study
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </Link>
        </div>
      </article>
    </Reveal>
  );
}

function ProjectPreviewCard({ project, index }: { project: ProjectItem; index: number }) {
  return (
    <Reveal delay={index * 0.05}>
      <Link
        href={project.href}
        className="group block h-full overflow-hidden rounded-xl border border-[#f4efe3]/12 bg-[#f4efe3]/[0.045] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d8c4a4]"
      >
        <ProjectImage project={project} priority={index === 0} compact />
        <div className="p-5">
          <p className="line-clamp-2 min-h-12 text-sm font-semibold leading-6 text-[#d8c4a4]">{project.impact}</p>
          <h3 className="mt-3 line-clamp-2 min-h-[3.75rem] font-grotesk text-2xl font-semibold leading-tight text-[#f4efe3]">{project.name}</h3>
          <p className="mt-3 text-sm leading-7 text-[#f4efe3]/62">{project.description}</p>
        </div>
      </Link>
    </Reveal>
  );
}

function ProjectImage({
  project,
  priority = false,
  compact = false,
}: {
  project: ProjectItem;
  priority?: boolean;
  compact?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden bg-[#0d0c09] ${compact ? "aspect-[16/11]" : "aspect-[16/10]"}`}>
      <Image
        src={project.image}
        alt={`${project.name} preview`}
        fill
        priority={priority}
        sizes="(min-width: 1280px) 44vw, (min-width: 768px) 50vw, 100vw"
        className="object-cover opacity-90 transition duration-700 group-hover:scale-[1.035]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d0c09] via-[#0d0c09]/10 to-transparent" />
      <span className="absolute inset-y-0 left-0 w-px origin-top scale-y-0 bg-[#f4efe3] transition duration-700 group-hover:scale-y-100" />
      <div className="absolute inset-x-0 bottom-0 p-4">
        <p className="text-sm font-semibold text-[#f4efe3]">{project.impact}</p>
      </div>
    </div>
  );
}

function ProjectAction({ href, label }: { href: string; label: string }) {
  const isExternal = href.startsWith("http");

  return (
    <Link
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#f4efe3]/12 bg-[#f4efe3]/7 text-[#f4efe3] transition hover:border-[#f4efe3]/45 hover:bg-[#f4efe3] hover:text-[#0d0c09] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f4efe3]"
      aria-label={label}
    >
      {isExternal ? <ExternalLink className="h-5 w-5" /> : <ArrowUpRight className="h-5 w-5" />}
    </Link>
  );
}

function CaseStudyBlueprint() {
  return (
    <section className="px-4 py-12 sm:px-6 lg:py-16">
      <div className="mx-auto max-w-7xl rounded-lg border border-white/10 bg-white/[0.035] p-6 md:p-8">
        <SectionIntro
          eyebrow="Case Study Pattern"
          title="Every project can become a premium product story."
          copy="This structure is reusable across all project detail pages when deeper case-study routes are added."
        />
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {caseStudyPattern.map((item, index) => (
            <Reveal key={item} delay={index * 0.025}>
              <div className="flex items-center gap-3 border-b border-white/10 pb-3 text-sm font-semibold text-slate-300">
                <span className="text-xs text-cyan-200">0{index + 1}</span>
                {item}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceTimeline() {
  return (
    <section className="px-4 py-12 sm:px-6 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="relative">
          <div className="absolute left-5 top-4 hidden h-[calc(100%-2rem)] w-px bg-white/12 md:block" />
          <div className="space-y-5">
            {experience.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.08}>
                <article className="relative rounded-lg border border-white/10 bg-white/[0.045] p-5 md:ml-14 md:p-6">
                  <span className="absolute -left-[3.25rem] top-6 hidden h-10 w-10 items-center justify-center rounded-full border border-cyan-300/25 bg-[#07101d] text-sm font-bold text-cyan-100 md:flex">
                    {index + 1}
                  </span>
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-cyan-200">{item.period}</p>
                      <h2 className="mt-2 font-grotesk text-2xl font-semibold text-white">
                        {item.title}
                      </h2>
                    </div>
                    <span className="w-fit rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-bold text-emerald-200">
                      {item.focus}
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-slate-300">{item.details}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesGrid() {
  return (
    <section className="px-4 py-12 sm:px-6 lg:py-16">
      <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service, index) => {
          const Icon = service.icon;

          return (
            <Reveal key={service.title} delay={index * 0.04}>
              <article className="group h-full rounded-lg border border-white/10 bg-white/[0.045] p-6 transition hover:border-cyan-300/30 hover:bg-white/[0.06]">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-cyan-300/20 bg-cyan-300/10 text-cyan-100">
                  <Icon className="h-6 w-6 transition group-hover:scale-105" />
                </div>
                <h2 className="mt-6 font-grotesk text-2xl font-semibold text-white">{service.title}</h2>
                <InfoLine label="Who it is for" value={service.for} />
                <InfoLine label="What Arun delivers" value={service.deliver} />
                <InfoLine label="Expected outcome" value={service.outcome} />
                <Link
                  href="/#contact"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-100 transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                >
                  Request Proposal
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </Link>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

function ProcessBlueprint() {
  return (
    <section className="px-4 py-12 sm:px-6 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="relative grid gap-5 lg:grid-cols-4">
          {processSteps.map((step, index) => {
            const Icon = step.icon;

            return (
              <Reveal key={step.step} delay={index * 0.06}>
                <article className="relative h-full rounded-lg border border-white/10 bg-white/[0.045] p-5">
                  {index < processSteps.length - 1 ? (
                    <motion.div
                      aria-hidden="true"
                      className="absolute left-[calc(100%-8px)] top-10 hidden h-px w-6 bg-cyan-300/45 lg:block"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.12, duration: 0.5 }}
                      style={{ transformOrigin: "left" }}
                    />
                  ) : null}
                  <div className="flex items-center justify-between gap-4">
                    <div className="grid h-12 w-12 place-items-center rounded-lg border border-white/10 bg-white/6 text-cyan-100">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="font-grotesk text-2xl font-semibold text-white">{step.step}</span>
                  </div>
                  <h2 className="mt-6 font-grotesk text-2xl font-semibold text-white">{step.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{step.copy}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PricingGrid() {
  return (
    <section className="px-4 py-12 sm:px-6 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-5 lg:grid-cols-3">
          {packages.map((pkg, index) => (
            <Reveal key={pkg.title} delay={index * 0.06}>
              <article className={`h-full rounded-lg border p-6 ${pkg.featured ? "border-cyan-300/35 bg-cyan-300/10" : "border-white/10 bg-white/[0.045]"}`}>
                <div className="flex items-center justify-between gap-4">
                  <h2 className="font-grotesk text-2xl font-semibold text-white">{pkg.title}</h2>
                  {pkg.featured ? (
                    <span className="rounded-full bg-cyan-300 px-3 py-1 text-xs font-bold text-[#06111d]">
                      Popular
                    </span>
                  ) : null}
                </div>
                <p className="mt-5 font-grotesk text-3xl font-semibold text-white">{pkg.price}</p>
                <p className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-emerald-200">
                  <Timer className="h-4 w-4" />
                  Delivery: {pkg.delivery}
                </p>
                <p className="mt-4 text-sm leading-7 text-slate-300">{pkg.bestFor}</p>
                <div className="mt-6 space-y-3">
                  {pkg.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3 text-sm text-slate-300">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-cyan-200" />
                      {feature}
                    </div>
                  ))}
                </div>
                <Link
                  href="/#contact"
                  className="mt-7 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white px-5 py-3 text-sm font-semibold text-[#05070d] transition hover:bg-cyan-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                >
                  Request Proposal
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </article>
            </Reveal>
          ))}
        </div>

        <p className="mt-6 rounded-lg border border-white/10 bg-white/[0.035] p-4 text-sm leading-7 text-slate-300">
          Final quote depends on scope, timeline, integrations, and content.
        </p>
      </div>
    </section>
  );
}

function ProofSection() {
  return (
    <section className="px-4 py-12 sm:px-6 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <SectionIntro
            eyebrow="Social Proof"
            title="Credibility without fake names."
            copy="The site keeps the proof section honest while still showing delivery signals that clients care about."
          />

          <Reveal>
            <div className="rounded-lg border border-white/10 bg-white/[0.045] p-6">
              <div className="flex items-start gap-4">
                <div className="grid h-12 w-12 place-items-center rounded-lg border border-violet-300/25 bg-violet-300/10 text-violet-100">
                  <MessageSquareText className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="font-grotesk text-2xl font-semibold text-white">
                    Client testimonials will appear here after verification.
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    Until published client permission is available, this section uses trust badges instead of invented endorsements.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {trustBadges.map((badge, index) => (
            <Reveal key={badge} delay={index * 0.04}>
              <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.035] p-4 text-sm font-semibold text-slate-200">
                <ShieldCheck className="h-5 w-5 text-emerald-200" />
                {badge}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function TechStackSection() {
  return (
    <section className="px-4 py-12 sm:px-6 lg:py-16">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <SectionIntro
          eyebrow="Skills / Tech Stack"
          title="Modern stack. Clean architecture. Smooth interfaces. Fast delivery."
          copy="The stack supports responsive interfaces, reliable deployment, product-grade UX, SEO, performance, and full-stack extensibility."
        />

        <Reveal>
          <div className="rounded-lg border border-white/10 bg-[#07101d] p-5">
            <div className="border-b border-white/10 pb-4 font-mono text-xs text-slate-500">
              capabilities.sh
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {techStack.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.025, duration: 0.28 }}
                  className="rounded-lg border border-white/10 bg-white/6 px-4 py-3 text-sm font-semibold text-slate-200"
                >
                  {item}
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section className="px-4 py-12 sm:px-6 lg:py-16">
      <div className="mx-auto grid max-w-7xl gap-10 rounded-lg border border-white/10 bg-white/[0.035] p-6 md:p-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="text-sm font-bold text-cyan-200">About Arun</p>
          <h2 className="mt-4 font-grotesk text-4xl font-semibold leading-tight text-white md:text-6xl">
            Design taste meets full-stack execution.
          </h2>
        </div>
        <div>
          <p className="text-lg leading-9 text-slate-300">
            I am Arun Acharya, a full-stack developer who loves building digital products that look beautiful, feel smooth, and solve real business problems. I combine frontend engineering, UI/UX thinking, performance optimization, and practical product strategy to help clients launch websites and apps that feel premium from the first click.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              "Product thinking",
              "Clean frontend architecture",
              "UI/UX taste",
              "Business-focused execution",
              "Reliable communication",
              "End-to-end ownership",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 border-b border-white/10 pb-3 text-sm font-semibold text-slate-200">
                <CheckCircle2 className="h-4 w-4 text-emerald-200" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function LocationSeoSection() {
  return (
    <section className="px-4 py-12 sm:px-6 lg:py-16">
      <div className="mx-auto max-w-7xl rounded-lg border border-white/10 bg-white/[0.035] p-6 md:p-8">
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
          <div>
            <p className="text-sm font-bold text-cyan-200">Remote-friendly development</p>
            <h2 className="mt-3 font-grotesk text-3xl font-semibold text-white">
              Website design and full-stack development for startups, creators, local businesses, and agencies.
            </h2>
          </div>
          <div>
            <p className="text-sm leading-7 text-slate-300">
              Serving India-focused clients in Bengaluru, Mumbai, and Delhi NCR, plus international clients in Dubai, London, New York, Toronto, and Sydney.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {locations.map((location) => (
                <span key={location} className="rounded-full border border-white/10 bg-white/7 px-3 py-1 text-xs font-semibold text-slate-300">
                  {location}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="px-4 py-16 sm:px-6 lg:py-28">
      <div className="mx-auto grid max-w-[1480px] gap-12 lg:grid-cols-[0.88fr_0.92fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#f4efe3]/50">Contact</p>
          <h2 className="mt-5 max-w-[10ch] font-grotesk text-[clamp(4rem,9vw,9rem)] font-semibold uppercase leading-[0.76] text-[#f4efe3]">
            Start the next build.
          </h2>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-[#f4efe3]/72">
            Send the brief, the rough idea, or the broken current site. I will turn the signal into a practical next step.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col">
            <a
              href={mailto}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f4efe3] px-5 py-3 text-sm font-semibold text-[#0d0c09] transition hover:bg-[#d8cfc0] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f4efe3]"
            >
              Send Message
              <Send className="h-4 w-4" />
            </a>
            <a
              href={callMailto}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#f4efe3]/12 bg-[#f4efe3]/8 px-5 py-3 text-sm font-semibold text-[#f4efe3] transition hover:bg-[#f4efe3]/12 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f4efe3]"
            >
              Book a Call
              <CalendarDays className="h-4 w-4" />
            </a>
            <a
              href={mailto}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#f4efe3]/24 bg-[#f4efe3]/10 px-5 py-3 text-sm font-semibold text-[#f4efe3] transition hover:bg-[#f4efe3] hover:text-[#0d0c09] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f4efe3]"
            >
              Request Proposal
              <BriefcaseBusiness className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-10 grid gap-4 text-sm leading-7 text-[#f4efe3]/62">
            <p>01 / Landing pages with a strong opening moment.</p>
            <p>02 / Dashboards and MVPs with actual product logic.</p>
            <p>03 / Responsive interfaces that keep their composition under pressure.</p>
          </div>
        </div>

        <div className="rounded-[1.75rem] bg-[#f4efe3]/[0.045] p-6 text-[#f4efe3] md:p-10 lg:p-12">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

function ContactForm() {
  const projectTypes = [
    "Landing Page",
    "Business Website",
    "UI/UX Redesign",
    "Full-Stack Web App",
    "Dashboard",
    "MVP",
  ];
  const [projectType, setProjectType] = useState(projectTypes[0]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = [
      `Name: ${data.get("name") ?? ""}`,
      `Email: ${data.get("email") ?? ""}`,
      `Project type: ${data.get("projectType") ?? projectType}`,
      `Budget range: ${data.get("budget") ?? ""}`,
      `Timeline: ${data.get("timeline") ?? ""}`,
      "",
      `Message: ${data.get("message") ?? ""}`,
    ].join("\n");

    window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
      "Project inquiry from portfolio"
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <p className="font-grotesk text-3xl font-semibold text-[#f4efe3]">Project intake</p>
        <p className="mt-2 text-sm leading-7 text-[#f4efe3]/64">
          Share the signal. I will reply with the next practical step.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" name="name" placeholder="Your name" required />
        <Field label="Email" name="email" type="email" placeholder="you@example.com" required />
      </div>

      <label className="block">
        <span className="text-sm font-semibold text-[#f4efe3]">Project type</span>
        <select
          name="projectType"
          value={projectType}
          onChange={(event) => setProjectType(event.target.value)}
          className="mt-2 w-full rounded-lg border border-[#f4efe3]/12 bg-[#f4efe3]/8 px-4 py-3 text-sm text-[#f4efe3] outline-none transition focus:border-[#f4efe3]"
        >
          {projectTypes.map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>
      </label>

      <div className="flex flex-wrap gap-2">
        {projectTypes.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setProjectType(type)}
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
              projectType === type
                ? "border-[#f4efe3] bg-[#f4efe3] text-[#0d0c09]"
                : "border-[#f4efe3]/12 bg-[#f4efe3]/6 text-[#f4efe3]/64 hover:bg-[#f4efe3]/10"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-semibold text-[#f4efe3]">Budget range</span>
          <select
            name="budget"
            className="mt-2 w-full rounded-lg border border-[#f4efe3]/12 bg-[#f4efe3]/8 px-4 py-3 text-sm text-[#f4efe3] outline-none transition focus:border-[#f4efe3]"
            defaultValue=""
          >
            <option value="" disabled>Select range</option>
            <option>USD 200-600</option>
            <option>USD 600-1500</option>
            <option>USD 1500-5000</option>
            <option>Custom scope</option>
          </select>
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-[#f4efe3]">Timeline</span>
          <select
            name="timeline"
            className="mt-2 w-full rounded-lg border border-[#f4efe3]/12 bg-[#f4efe3]/8 px-4 py-3 text-sm text-[#f4efe3] outline-none transition focus:border-[#f4efe3]"
            defaultValue=""
          >
            <option value="" disabled>Select timeline</option>
            <option>3-5 days</option>
            <option>1-2 weeks</option>
            <option>3-8 weeks</option>
            <option>Flexible</option>
          </select>
        </label>
      </div>

      <label className="block">
        <span className="text-sm font-semibold text-[#f4efe3]">Message</span>
        <textarea
          name="message"
          rows={5}
          placeholder="Tell me what you want to launch."
          className="mt-2 w-full resize-none rounded-lg border border-[#f4efe3]/12 bg-[#f4efe3]/8 px-4 py-3 text-sm text-[#f4efe3] outline-none transition placeholder:text-[#f4efe3]/35 focus:border-[#f4efe3]"
          required
        />
      </label>

      <button
        type="submit"
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#f4efe3] px-6 py-4 text-sm font-semibold text-[#0d0c09] transition hover:bg-[#d8cfc0] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f4efe3]"
      >
        Send Message
        <Send className="h-4 w-4" />
      </button>
    </form>
  );
}

function PageCta() {
  return (
    <section className="px-4 py-14 sm:px-6 lg:py-20">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 rounded-xl border border-[#f4efe3]/12 bg-[#f4efe3]/[0.045] p-6 md:flex-row md:items-center md:justify-between md:p-8">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#f4efe3]/52">Next step</p>
          <h2 className="mt-2 font-grotesk text-3xl font-semibold text-[#f4efe3]">
            Have a similar project in mind?
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-[#f4efe3]/72">
            Send the brief, rough idea, or current website. Arun will help shape the next practical move.
          </p>
        </div>
        <Link
          href="/#contact"
          className="inline-flex w-fit items-center gap-2 rounded-full bg-[#f4efe3] px-5 py-3 text-sm font-semibold text-[#0d0c09] transition hover:bg-[#d8cfc0] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f4efe3]"
        >
          Start a Project
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

function StudioFooter() {
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className="px-4 pb-28 pt-8 sm:px-6 md:pb-10">
      <div className="mx-auto max-w-7xl border-t border-[#f4efe3]/12 pt-8">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-start">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-lg border border-[#f4efe3]/24 bg-[#f4efe3]/8 font-grotesk text-sm font-semibold text-[#f4efe3]">
                AA
              </span>
              <div>
                <p className="font-grotesk text-xl font-semibold text-[#f4efe3]">Arun Acharya</p>
                <p className="mt-1 text-sm text-[#f4efe3]/55">
                  Full-Stack Architect for premium websites, apps, dashboards, and MVPs.
                </p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {navItems.slice(0, -1).map((item) => (
                <Link key={item.href} href={item.href} className="rounded-full border border-[#f4efe3]/12 bg-[#f4efe3]/6 px-3 py-1.5 text-xs font-semibold text-[#f4efe3]/70 hover:text-[#f4efe3]">
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 md:items-end">
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((item) => {
                const Icon = item.icon;

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#f4efe3]/12 bg-[#f4efe3]/7 text-[#f4efe3]/80 transition hover:border-[#f4efe3]/45 hover:text-[#f4efe3] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f4efe3]"
                    aria-label={item.label}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
            <p className="text-sm text-[#f4efe3]/45">Copyright {currentYear}. Arun Acharya.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function MobileActionBar() {
  return (
    <div className="fixed inset-x-3 bottom-3 z-40 md:hidden">
      <div className="grid grid-cols-2 gap-2 rounded-full border border-[#f4efe3]/12 bg-[#0d0c09] p-2 shadow-[0_20px_70px_rgba(0,0,0,0.35)]">
        <Link
          href="/work"
          className="inline-flex items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-semibold text-[#f4efe3]/85"
        >
          Work
          <Layers3 className="h-4 w-4" />
        </Link>
        <Link
          href="/#contact"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f4efe3] px-4 py-3 text-sm font-semibold text-[#0d0c09]"
        >
          Contact
          <Send className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

function StatCard({ stat }: { stat: StatItem }) {
  return (
    <div className="rounded-xl border border-[#f4efe3]/12 bg-[#f4efe3]/[0.045] p-4">
      <div className="font-grotesk text-3xl font-semibold text-[#f4efe3]">
        <AnimatedNumber value={stat.value} suffix={stat.suffix} />
      </div>
      <div className="mt-1 text-sm font-semibold text-[#f4efe3]/90">{stat.label}</div>
      <div className="mt-2 text-xs leading-5 text-[#f4efe3]/45">{stat.note}</div>
    </div>
  );
}

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const shouldReduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(shouldReduceMotion ? value : 0);

  useEffect(() => {
    if (!inView || shouldReduceMotion) {
      if (shouldReduceMotion) setDisplay(value);
      return;
    }

    const controls = animateValue(0, value, {
      duration: 1,
      ease: "easeOut",
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });

    return () => controls.stop();
  }, [inView, shouldReduceMotion, value]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

function SectionIntro({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy: string;
}) {
  return (
    <div className="max-w-4xl">
      <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#f4efe3]/52">{eyebrow}</p>
      <h2 className="mt-4 font-grotesk text-5xl font-semibold leading-[0.94] text-[#f4efe3] md:text-7xl">
        {title}
      </h2>
      <p className="mt-5 max-w-2xl text-base leading-8 text-[#f4efe3]/72 md:text-lg">
        {copy}
      </p>
    </div>
  );
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={revealVariants}
      initial={shouldReduceMotion ? false : "hidden"}
      whileInView={shouldReduceMotion ? undefined : "visible"}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.62, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function MotionLink({
  href,
  variant,
  children,
}: {
  href: string;
  variant: "primary" | "secondary";
  children: ReactNode;
}) {
  const className =
    variant === "primary"
      ? "bg-[#f4efe3] text-[#0d0c09] hover:bg-[#d8cfc0]"
      : "border border-[#f4efe3]/12 bg-[#f4efe3]/7 text-[#f4efe3] hover:border-[#f4efe3]/45 hover:bg-[#f4efe3]/10";

  return (
    <motion.a
      href={href}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`inline-flex w-full max-w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-base font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f4efe3] sm:w-auto ${className}`}
    >
      {children}
    </motion.a>
  );
}

function InfoLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="mt-5 border-t border-white/10 pt-4">
      <p className="text-xs font-bold text-slate-500">{label}</p>
      <p className="mt-2 text-sm leading-7 text-slate-300">{value}</p>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-[#f4efe3]">{label}</span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="mt-2 w-full rounded-lg border border-[#f4efe3]/12 bg-[#f4efe3]/8 px-4 py-3 text-sm text-[#f4efe3] outline-none transition placeholder:text-[#f4efe3]/35 focus:border-[#f4efe3]"
      />
    </label>
  );
}

function ChatBubble({
  side,
  children,
}: {
  side: "me" | "them";
  children: ReactNode;
}) {
  return (
    <div className={`flex ${side === "me" ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[86%] rounded-lg px-4 py-3 text-sm leading-6 ${
          side === "me"
            ? "bg-[#f4efe3] text-[#0d0c09]"
            : "border border-[#f4efe3]/12 bg-[#f4efe3]/8 text-[#f4efe3]/90"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
