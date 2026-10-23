import { LiquidSurface } from "@/components/ui/liquid-surface";
import Link from "next/link";

import {
  SeoPageShell,
  seoCardClass,
  seoMutedTextClass,
} from "@/components/SeoPageShell";
import { seoBlogPosts, seoServicePages } from "@/data/seo-content";
import { workProjects } from "@/data/work-projects";
import { siteConfig } from "@/lib/site";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export function generateMetadata() {
  return createPageMetadata({
    title: "Arun Acharya: Frontend and Next.js Articles",
    description:
      "Articles by Arun Acharya on landing pages, frontend revamps, UI/UX, Next.js, APIs, SaaS products, performance, and website strategy.",
    path: "/blog/author/arun-acharya",
    keywords: [
      "Arun Acharya author",
      "Arun Acharya blog",
      "frontend developer author",
      "Next.js freelancer articles",
    ],
  });
}

const authorPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${siteConfig.url}/blog/author/arun-acharya#profile`,
  url: `${siteConfig.url}/blog/author/arun-acharya`,
  name: "Arun Acharya author profile",
  mainEntity: { "@id": siteConfig.personId },
};

export default function AuthorPage() {
  const featuredServices = seoServicePages.filter((service) =>
    ["landing-pages", "frontend-development", "ui-ux-design"].includes(
      service.slug,
    ),
  );
  const schemas = [
    authorPageJsonLd,
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: "Arun Acharya", path: "/blog/author/arun-acharya" },
    ]),
  ];

  return (
    <SeoPageShell
      eyebrow="Author"
      title="Arun Acharya — frontend developer and guide author"
      description="Practical notes on scoping websites, building product interfaces and reviewing performance, grounded in my documented frontend work."
    >
      {schemas.map((schema, index) => (
        <script
          key={`author-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <section className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <article className={seoCardClass}>
          <LiquidSurface radius={16} />
          <p className="text-sm font-bold text-brand">About the author</p>
          <h2 className="mt-3 font-grotesk text-3xl font-semibold">
            Arun Acharya
          </h2>
          <p className={`mt-4 text-base leading-8 ${seoMutedTextClass}`}>
            Arun is a frontend developer, UI/UX developer, and Next.js
            freelancer who writes from hands-on project experience across
            ChainReach.ai, Sound Of Meme, NursePhysioWala, HeyClo / CLO AI, and
            client websites.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link
              href="/about"
              className="rounded-full border border-line bg-surface px-3 py-2 text-xs font-semibold text-subtle"
            >
              About Arun
            </Link>
            <Link
              href="/work"
              className="rounded-full border border-line bg-surface px-3 py-2 text-xs font-semibold text-subtle"
            >
              Selected work
            </Link>
            <Link
              href="/services/frontend-development"
              className="rounded-full border border-line bg-surface px-3 py-2 text-xs font-semibold text-subtle"
            >
              Frontend service
            </Link>
          </div>
        </article>

        <article className={seoCardClass}>
          <LiquidSurface radius={16} />
          <p className="text-sm font-bold text-brand">Primary topics</p>
          <div className="mt-4 grid gap-3">
            {featuredServices.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="rounded-lg border border-line bg-surface p-4 transition hover:border-brand/30 hover:bg-brand-soft"
              >
                <span className="block font-semibold">{service.navLabel}</span>
                <span
                  className={`mt-2 block text-sm leading-6 ${seoMutedTextClass}`}
                >
                  {service.metaDescription}
                </span>
              </Link>
            ))}
          </div>
        </article>
      </section>

      <section className="mt-14">
        <h2 className="font-grotesk text-3xl font-semibold">
          Articles by Arun Acharya
        </h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {seoBlogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className={`${seoCardClass} transition hover:-translate-y-0.5 hover:border-brand/30 hover:bg-brand-soft`}
            >
              <LiquidSurface radius={16} />
              <p className="text-sm font-bold text-brand">{post.category}</p>
              <h3 className="mt-3 font-grotesk text-2xl font-semibold">
                {post.title}
              </h3>
              <p className={`mt-3 text-sm leading-7 ${seoMutedTextClass}`}>
                {post.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-grotesk text-3xl font-semibold">
          Project experience behind these guides
        </h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {workProjects.filter((project) => ["pivotal-physiocare", "chainreach-ai", "sound-of-meme"].includes(project.slug)).map((project) => (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              className={`${seoCardClass} transition hover:-translate-y-0.5 hover:border-brand/30 hover:bg-brand-soft`}
            >
              <LiquidSurface radius={16} />
              <p className="text-sm font-bold text-brand">
                {project.shortName}
              </p>
              <h3 className="mt-3 font-grotesk text-2xl font-semibold">
                {project.role}
              </h3>
              <p className={`mt-3 text-sm leading-7 ${seoMutedTextClass}`}>
                {project.impact}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </SeoPageShell>
  );
}
