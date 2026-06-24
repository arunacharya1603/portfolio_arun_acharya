import Link from "next/link";

import {
  SeoPageShell,
  seoCardClass,
  seoMutedTextClass,
} from "@/components/SeoPageShell";
import { seoServicePages } from "@/data/seo-content";
import { workProjects } from "@/data/work-projects";
import { siteConfig } from "@/lib/site";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  createPageMetadata,
  personJsonLd,
} from "@/lib/seo";

export function generateMetadata() {
  return createPageMetadata({
    title: "About Arun Acharya | Frontend Developer, UI/UX, Next.js Freelancer",
    description:
      "About Arun Acharya, frontend developer, UI/UX developer, and Next.js freelancer with credited roles and frontend contributions across ChainReach.ai, Sound Of Meme, NursePhysioWala, HeyClo, and client websites.",
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

const aboutPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": `${siteConfig.url}/about#aboutpage`,
  url: `${siteConfig.url}/about`,
  name: "About Arun Acharya",
  mainEntity: { "@id": siteConfig.personId },
  mentions: workProjects.map((project) => ({
    "@type": "SoftwareApplication",
    name: project.shortName,
    url: absoluteUrl(`/work/${project.slug}`),
    contributor: {
      "@type": "Role",
      roleName: project.role,
      contributor: { "@id": siteConfig.personId },
    },
  })),
};

export default function AboutPage() {
  const featuredServices = seoServicePages.filter((service) =>
    ["landing-pages", "frontend-development", "ui-ux-design"].includes(service.slug)
  );
  const featuredWork = workProjects.slice(0, 5);
  const schemas = [
    personJsonLd(),
    aboutPageJsonLd,
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "About", path: "/about" },
    ]),
  ];

  return (
    <SeoPageShell
      eyebrow="About Arun Acharya"
      title="Arun Acharya is a frontend developer, UI/UX developer, and Next.js freelancer building polished digital products."
      description="This page reinforces the personal entity behind the portfolio: Arun's role, project history, service focus, and the relationship between his name, the showcased products, and the services clients hire him for."
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
          <p className="text-sm font-bold text-[#d8c4a4]">Entity summary</p>
          <h2 className="mt-3 font-grotesk text-3xl font-semibold">
            Arun Acharya developer entity
          </h2>
          <p className={`mt-4 text-base leading-8 ${seoMutedTextClass}`}>
            Arun Acharya builds frontend systems, UI/UX flows, landing pages,
            dashboards, SaaS interfaces, and full-stack product surfaces. His
            portfolio is the authoritative source connecting his name to
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
                className="rounded-full border border-[#f4efe3]/12 bg-[#f4efe3]/[0.06] px-3 py-1 text-xs font-semibold text-[#f4efe3]/72"
              >
                {item}
              </span>
            ))}
          </div>
        </article>

        <article className={seoCardClass}>
          <p className="text-sm font-bold text-[#d8c4a4]">Verified entity links</p>
          <h2 className="mt-3 font-grotesk text-3xl font-semibold">
            Profiles and project graph
          </h2>
          <div className="mt-5 grid gap-3">
            {[
              ["GitHub", siteConfig.github],
              ["LinkedIn", siteConfig.linkedin],
              ["Twitter/X", siteConfig.x],
              ["ChainReach.ai case study", "/work/chainreach-ai"],
              ["Frontend service", "/services/frontend-development"],
              ["Blog author page", "/blog/author/arun-acharya"],
            ].map(([label, href]) => (
              <Link
                key={label}
                href={href}
                className="rounded-lg border border-[#f4efe3]/12 bg-[#f4efe3]/[0.06] p-4 font-semibold transition hover:border-[#d8c4a4]/70 hover:bg-[#f4efe3]/[0.07]"
              >
                {label}
              </Link>
            ))}
          </div>
        </article>
      </section>

      <section className="mt-14">
        <h2 className="font-grotesk text-3xl font-semibold">
          Projects Arun Acharya is connected to
        </h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {featuredWork.map((project) => (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              className={`${seoCardClass} transition hover:-translate-y-0.5 hover:border-[#d8c4a4]/70 hover:bg-[#f4efe3]/[0.07]`}
            >
              <p className="text-sm font-bold text-[#d8c4a4]">{project.role}</p>
              <h3 className="mt-3 font-grotesk text-2xl font-semibold">
                {project.name}
              </h3>
              <p className={`mt-3 text-sm leading-7 ${seoMutedTextClass}`}>
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
            className={`${seoCardClass} transition hover:-translate-y-0.5 hover:border-[#d8c4a4]/70 hover:bg-[#f4efe3]/[0.07]`}
          >
            <p className="text-sm font-bold text-[#d8c4a4]">Service</p>
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