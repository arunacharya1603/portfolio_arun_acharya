import { LiquidSurface } from "@/components/ui/liquid-surface";
import Link from "next/link";

import {
  SeoPageShell,
  seoCardClass,
  seoMutedTextClass,
} from "@/components/SeoPageShell";
import { seoServicePages } from "@/data/seo-content";
import { workProjects } from "@/data/work-projects";
import { siteConfig } from "@/lib/site";
import { absoluteUrl, breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export function generateMetadata() {
  return createPageMetadata({
    title: "About Arun Acharya: Frontend & Next.js Developer",
    description:
      "Meet Arun Acharya, a frontend and Next.js developer whose portfolio covers UI/UX, dashboards, landing pages, and credited product work.",
    path: "/about",
    keywords: [
      "Arun Acharya",
      "Arun Acharya developer",
      "Arun Acharya portfolio",
      "UI UX developer India",
      "Next.js freelancer",
      "frontend developer portfolio",
    ],
  });
}

const featuredWork = workProjects.slice(0, 5);

const aboutPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": `${siteConfig.url}/about#aboutpage`,
  url: `${siteConfig.url}/about`,
  name: "About Arun Acharya",
  mainEntity: { "@id": siteConfig.personId },
  mentions: featuredWork.map((project) => ({
    "@type": "CreativeWork",
    "@id": `${absoluteUrl(`/work/${project.slug}`)}#case-study`,
    name: project.seoTitle,
    url: absoluteUrl(`/work/${project.slug}`),
  })),
};

export default function AboutPage() {
  const featuredServices = seoServicePages.filter((service) =>
    ["landing-pages", "frontend-development", "ui-ux-design"].includes(
      service.slug,
    ),
  );
  const schemas = [
    aboutPageJsonLd,
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "About", path: "/about" },
    ]),
  ];

  return (
    <SeoPageShell
      eyebrow="About Arun Acharya"
      title="Arun Acharya is a full-stack product engineer focused on frontend systems, UI/UX, and Next.js delivery."
      description="Meet the developer behind the work. Explore my role in shipped products, the problems I work on, and how I can help with your next build."
    >
      {schemas.map((schema, index) => (
        <script
          key={`about-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <section className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <article className={seoCardClass}>
          <LiquidSurface radius={16} />
          <p className="text-sm font-bold text-brand">What I do</p>
          <h2 className="mt-3 font-grotesk text-3xl font-semibold">
            From product idea to a usable interface
          </h2>
          <p className={`mt-4 text-base leading-8 ${seoMutedTextClass}`}>
            Arun Acharya builds frontend systems, UI/UX flows, landing pages,
            dashboards, SaaS interfaces, and full-stack product surfaces. His
            case studies describe his specific role and contribution to
            ChainReach.ai and the other showcased projects.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {[
              "Frontend development",
              "UI/UX design",
              "Next.js freelancer",
              "Landing pages",
              "SaaS dashboards",
              "Product interfaces",
            ].map((item) => (
              <span
                key={item}
                className="rounded-full border border-line bg-surface px-3 py-1 text-[13px] font-semibold text-subtle"
              >
                {item}
              </span>
            ))}
          </div>
        </article>

        <article className={seoCardClass}>
          <LiquidSurface radius={16} />
          <p className="text-sm font-bold text-brand">
            Background and experience
          </p>
          <h2 className="mt-3 font-grotesk text-3xl font-semibold">
            Find me and my work
          </h2>
          <div className="mt-5 grid gap-3">
            {[
              ["GitHub", siteConfig.github],
              ["LinkedIn", siteConfig.linkedin],
              ["Frontend engineer profile at Corpvance", siteConfig.corpvance],
              ["Twitter/X", siteConfig.x],
              ["ChainReach.ai case study", "/work/chainreach-ai"],
              ["Frontend service", "/services/frontend-development"],
              ["Blog author page", "/blog/author/arun-acharya"],
              ["Professional experience", "/experience"],
            ].map(([label, href]) => (
              <Link
                key={label}
                href={href}
                className="rounded-lg border border-line bg-surface p-4 font-semibold transition hover:border-brand/30 hover:bg-brand-soft"
              >
                {label}
              </Link>
            ))}
          </div>
        </article>
      </section>

      <section className="mt-14">
        <h2 className="font-heading text-4xl leading-tight">
          Selected projects and my role
        </h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {featuredWork.map((project) => (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              className={`${seoCardClass} transition hover:-translate-y-0.5 hover:border-brand/30 hover:bg-brand-soft`}
            >
              <LiquidSurface radius={16} />
              <p className="text-sm font-bold text-brand">{project.role}</p>
              <h3 className="mt-3 font-grotesk text-2xl font-semibold">
                {project.name}
              </h3>
              <p className={`mt-3 text-base leading-7 ${seoMutedTextClass}`}>
                {project.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-14 grid gap-5 md:grid-cols-3">
        {featuredServices.map((service) => (
          <Link
            key={service.slug}
            href={`/services/${service.slug}`}
            className={`${seoCardClass} transition hover:-translate-y-0.5 hover:border-brand/30 hover:bg-brand-soft`}
          >
            <LiquidSurface radius={16} />
            <p className="text-sm font-bold text-brand">Service</p>
            <h3 className="mt-3 font-grotesk text-2xl font-semibold">
              {service.navLabel}
            </h3>
            <p className={`mt-3 text-sm leading-7 ${seoMutedTextClass}`}>
              {service.metaDescription}
            </p>
          </Link>
        ))}
      </section>
    </SeoPageShell>
  );
}
