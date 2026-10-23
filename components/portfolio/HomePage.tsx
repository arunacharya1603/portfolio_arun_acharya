import { LiquidSurface } from "@/components/ui/liquid-surface";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Code2,
  Globe2,
  Layers3,
  PenTool,
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteActionBar } from "@/components/SiteActionBar";
import { textLinkStyles } from "@/components/ui/control-styles";
import { GlassLink } from "@/components/ui/glass-link";
import { homeWorkProjects, workProjects } from "@/data/work-projects";
import { Container, SectionHeading } from "./Section";
import { PageCta } from "./PageCta";
import { ProjectCard } from "./ProjectCard";
import { SiteFooter } from "./SiteFooter";

export const homeCapabilities = [
  {
    name: "Websites & landing pages",
    description:
      "A considered first impression, with a clear path from visitor to inquiry.",
    href: "/services/small-business-websites",
    icon: Globe2,
  },
  {
    name: "Web apps & MVPs",
    description:
      "Useful products with thoughtful workflows and a solid technical foundation.",
    href: "/services/web-apps-saas",
    icon: Layers3,
  },
  {
    name: "UI/UX & redesign",
    description:
      "Turn a complicated or dated interface into a clear, enjoyable experience.",
    href: "/services/ui-ux-design",
    icon: PenTool,
  },
  {
    name: "Frontend development",
    description:
      "Responsive React and Next.js interfaces, built with care for the details.",
    href: "/services/frontend-development",
    icon: Code2,
  },
];

const workflow = [
  {
    title: "Understand the goal",
    copy: "We align on your audience, priorities, scope, and what a successful launch looks like.",
  },
  {
    title: "Design, build, refine",
    copy: "You see progress, give feedback, and stay involved as the product takes shape.",
  },
  {
    title: "Launch with confidence",
    copy: "I check the details across devices, handle deployment, and support the handover.",
  },
];

const portfolioCounts = [
  { value: workProjects.length, label: "Projects in this portfolio" },
  { value: workProjects.filter((project) => project.challenges.length > 0).length, label: "Detailed case studies" },
  { value: workProjects.filter((project) => project.status.includes("Demo")).length, label: "Interface demos" },
];

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <section className="hero-stage overflow-hidden pb-10 pt-10 sm:pb-14 sm:pt-14 lg:pb-16 lg:pt-16">
          <Container>
            <div className="grid items-center gap-8 lg:min-h-[520px] lg:grid-cols-[1.05fr_1fr] lg:gap-8">
              <div>
                <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-brand">
                  Independent developer. Product-minded partner.
                </p>
                <h1 className="text-display">
                  I build products
                  <br className="hidden sm:block" /> people{" "}
                  <span className="text-brand">remember.</span>
                </h1>
                <p className="mt-7 max-w-lg text-lg leading-8 text-subtle">
                  I’m Arun Acharya, a freelance frontend and Next.js developer.
                  I build websites and product interfaces for founders and
                  businesses, with clear scope and direct collaboration.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <GlassLink href="/contact" variant={"primary"}>
                    Start Project
                    <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                  </GlassLink>
                  <GlassLink href="#projects">
                    Explore my work
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </GlassLink>
                </div>
              </div>
              <div className="hero-art relative mx-auto w-full max-w-xl lg:max-w-none">
                <Image
                  src="/illustrations/glass-studio.webp"
                  alt=""
                  width={1400}
                  height={1120}
                  priority
                  sizes="(min-width: 1400px) 660px, (min-width: 1024px) 48vw, (min-width: 640px) 576px, 95vw"
                  className="h-auto w-full lg:scale-110"
                />
              </div>
            </div>
          </Container>
        </section>

        <section
          aria-label="Work documented in this portfolio"
          className="px-5 pb-4 sm:px-8 lg:px-12"
        >
          <div className="glass-panel mx-auto grid max-w-[1304px] gap-7 rounded-3xl px-7 py-8 sm:grid-cols-3 sm:px-9 lg:grid-cols-[1.3fr_1fr_1fr_1fr] lg:py-10">
            <LiquidSurface radius={24} />
            <p className="hidden max-w-56 text-sm leading-7 text-subtle lg:block">
              Explore the work,
              <br />
              my role, and the decisions behind it.
            </p>
            {portfolioCounts.map((metric) => (
              <div
                key={metric.label}
                className="flex items-center gap-4 sm:justify-center lg:justify-start"
              >
                <p className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                  {metric.value}
                </p>
                <p className="max-w-28 text-sm leading-6 text-subtle">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="py-16 sm:py-24 lg:py-28">
          <Container>
            <SectionHeading
              title="Good work. Real products."
              description="A selection of websites and product experiences I’ve helped bring to life."
            />
            <div className="mt-10 grid gap-x-8 gap-y-12 md:grid-cols-2">
              {homeWorkProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
            <GlassLink href="/work" variant={"secondary"} className={"mt-12"}>
              View all projects
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </GlassLink>
          </Container>
        </section>

        <section className="glass-section border-y border-surface/80 py-16 sm:py-24">
          <Container className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div>
              <SectionHeading
                title="From a better website to your next big idea."
                description="Design and development that meet you where you are, and take your business forward."
              />
              <Link href="/services" className={textLinkStyles("mt-5")}>
                Explore services
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
            <div className="glass-panel rounded-3xl p-6 sm:p-8">
              <LiquidSurface radius={24} />
              {homeCapabilities.map(({ name, description, href, icon: Icon }) => (
                <Link
                  key={name}
                  href={href}
                  className="group grid grid-cols-[auto_1fr_auto] items-start gap-4 border-b border-line py-6 first:pt-0 last:border-b-0 last:pb-0 sm:gap-5"
                >
                  <Icon
                    aria-hidden="true"
                    strokeWidth={1.5}
                    className="mt-1 h-6 w-6 text-brand"
                  />
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight group-hover:text-brand">
                      {name}
                    </h3>
                    <p className="mt-2 max-w-lg text-sm leading-7 text-subtle">
                      {description}
                    </p>
                  </div>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="mt-1 h-5 w-5 text-subtle transition-transform motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5"
                  />
                </Link>
              ))}
            </div>
          </Container>
        </section>

        <section id="story" className="py-16 sm:py-24 lg:py-28">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24">
              <div>
                <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-brand">
                  The person behind the pixels
                </p>
                <SectionHeading title="A developer who sees the whole picture." />
                <p className="mt-6 max-w-xl text-base leading-8 text-subtle">
                  I’m Arun. I work across design and development to turn
                  business problems into interfaces people can actually use. You
                  work directly with the person building your product, from
                  scope to launch.
                </p>
                <Link href="/about" className={textLinkStyles("mt-4")}>
                  A little more about me
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </div>
              <div className="glass-panel rounded-3xl p-7 sm:p-9">
                <LiquidSurface radius={24} />
                <h3 className="text-2xl font-semibold tracking-tight">
                  Clear communication.
                  <br />
                  Careful execution.
                </h3>
                <ul className="mt-7 space-y-5">
                  {[
                    "A clear scope before we start",
                    "Progress you can see and give feedback on",
                    "Responsive, accessible interfaces",
                    "Deployment and a thoughtful handover",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-sm leading-7 text-subtle"
                    >
                      <Check
                        aria-hidden="true"
                        className="mt-1 h-5 w-5 shrink-0 text-brand"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-16 grid gap-8 border-t border-line pt-12 md:grid-cols-3 sm:mt-20">
              {workflow.map((step, index) => (
                <div key={step.title}>
                  <span className="text-sm font-semibold text-brand">
                    0{index + 1}
                  </span>
                  <h3 className="mt-4 text-xl font-semibold tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-subtle">
                    {step.copy}
                  </p>
                </div>
              ))}
            </div>
            <Link href="/process" className={textLinkStyles("mt-6")}>
              See how we’ll work together
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </Container>
        </section>
        <PageCta />
      </main>
      <SiteFooter />
      <SiteActionBar />
    </>
  );
}
