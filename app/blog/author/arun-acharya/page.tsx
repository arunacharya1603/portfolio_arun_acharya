import Link from "next/link";

import {
  SeoPageShell,
  seoCardClass,
  seoMutedTextClass,
} from "@/components/SeoPageShell";
import { seoBlogPosts, seoServicePages } from "@/data/seo-content";
import { workProjects } from "@/data/work-projects";
import { siteConfig } from "@/lib/site";
import { breadcrumbJsonLd, createPageMetadata, personJsonLd } from "@/lib/seo";

export function generateMetadata() {
  return createPageMetadata({
    title: "Arun Acharya Author Page | Frontend, UI/UX, Next.js Articles",
    description:
      "Author page for Arun Acharya, frontend developer, UI/UX developer, Next.js freelancer, and writer on landing pages, frontend revamps, UI/UX, APIs, and SaaS builds.",
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
    ["landing-pages", "frontend-development", "ui-ux-design"].includes(service.slug)
  );
  const schemas = [
    personJsonLd(),
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
      title="Arun Acharya writes about frontend development, UI/UX, Next.js, landing pages, and product build decisions."
      description="This author page connects Arun's articles to his developer entity, service pages, and showcased project work so Google can understand the expertise behind the content."
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
          <p className="text-sm font-bold text-[#2457ff]">Author entity</p>
          <h2 className="mt-3 font-grotesk text-3xl font-semibold">
            Arun Acharya
          </h2>
          <p className={`mt-4 text-base leading-8 ${seoMutedTextClass}`}>
            Arun is a frontend developer, UI/UX developer, and Next.js freelancer
            who writes from hands-on project experience across ChainReach.ai,
            Sound Of Meme, NursePhysioWala, HeyClo / CLO AI, and client websites.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link href="/about" className="rounded-full border border-[#d8ccbb] bg-[#f8efe3] px-3 py-2 text-xs font-semibold text-[#4f4b43]">
              About Arun
            </Link>
            <Link href="/work" className="rounded-full border border-[#d8ccbb] bg-[#f8efe3] px-3 py-2 text-xs font-semibold text-[#4f4b43]">
              Selected work
            </Link>
            <Link href="/services/frontend-development" className="rounded-full border border-[#d8ccbb] bg-[#f8efe3] px-3 py-2 text-xs font-semibold text-[#4f4b43]">
              Frontend service
            </Link>
          </div>
        </article>

        <article className={seoCardClass}>
          <p className="text-sm font-bold text-[#2457ff]">Primary topics</p>
          <div className="mt-4 grid gap-3">
            {featuredServices.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="rounded-lg border border-[#d8ccbb] bg-[#f8efe3] p-4 transition hover:border-[#080809]"
              >
                <span className="block font-semibold">{service.navLabel}</span>
                <span className={`mt-2 block text-sm leading-6 ${seoMutedTextClass}`}>
                  {service.metaDescription}
                </span>
              </Link>
            ))}
          </div>
        </article>
      </section>

      <section className="mt-14">
        <h2 className="font-grotesk text-3xl font-semibold">Articles by Arun Acharya</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {seoBlogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className={`${seoCardClass} transition hover:-translate-y-0.5 hover:border-[#080809]`}
            >
              <p className="text-sm font-bold text-[#2457ff]">{post.category}</p>
              <h3 className="mt-3 font-grotesk text-2xl font-semibold">{post.title}</h3>
              <p className={`mt-3 text-sm leading-7 ${seoMutedTextClass}`}>
                {post.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-grotesk text-3xl font-semibold">Project authority behind the writing</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {workProjects.slice(0, 3).map((project) => (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              className={`${seoCardClass} transition hover:-translate-y-0.5 hover:border-[#080809]`}
            >
              <p className="text-sm font-bold text-[#2457ff]">{project.shortName}</p>
              <h3 className="mt-3 font-grotesk text-2xl font-semibold">{project.role}</h3>
              <p className={`mt-3 text-sm leading-7 ${seoMutedTextClass}`}>{project.impact}</p>
            </Link>
          ))}
        </div>
      </section>
    </SeoPageShell>
  );
}