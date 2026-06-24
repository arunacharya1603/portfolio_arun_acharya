import Link from "next/link";

import {
  SeoPageShell,
  seoCardClass,
  seoMutedTextClass,
} from "@/components/SeoPageShell";
import { blogUrl, seoBlogPosts } from "@/data/seo-content";
import { siteConfig } from "@/lib/site";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export function generateMetadata() {
  return createPageMetadata({
    title: "Web Design, Frontend, UI/UX, and Next.js Blog",
    description:
      "Articles by Arun Acharya about landing pages, frontend development, UI/UX, Next.js, API planning, SaaS builds, SEO structure, and product scoping.",
    path: "/blog",
    keywords: ["Arun Acharya blog", "frontend development blog", "Next.js freelancer blog"],
  });
}

export default function BlogPage() {
  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${siteConfig.url}/blog#blog`,
    name: "Arun Acharya Web Design and Development Blog",
    url: `${siteConfig.url}/blog`,
    description:
      "Practical articles about small business websites, frontend revamps, UI/UX, API development, SaaS builds, and project scoping by Arun Acharya.",
    author: { "@id": siteConfig.personId },
    blogPost: seoBlogPosts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: blogUrl(post.slug),
      datePublished: post.datePublished,
      dateModified: post.dateModified,
      author: { "@id": siteConfig.personId },
    })),
  };

  const schemas = [
    blogJsonLd,
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
    ]),
  ];

  return (
    <SeoPageShell
      eyebrow="Blog and guides"
      title="Practical SEO content for website, frontend, UI/UX, and full-stack project decisions."
      description="These articles are built for real client questions: what to build first, when to revamp the frontend, how UI/UX affects development, and how APIs fit into web app projects."
    >
      {schemas.map((schema, index) => (
        <script
          key={`blog-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <section className="mb-8 rounded-lg border border-[#f4efe3]/12 bg-[#f4efe3]/[0.045] p-5">
        <p className={`text-sm leading-7 ${seoMutedTextClass}`}>
          Written by{" "}
          <Link href="/blog/author/arun-acharya" className="font-semibold text-[#d8c4a4]">
            Arun Acharya
          </Link>
          , a frontend developer, UI/UX developer, and Next.js freelancer building landing pages,
          dashboards, SaaS products, and SEO-ready websites.
        </p>
      </section>

      <section className="grid gap-5 md:grid-cols-2">
        {seoBlogPosts.map((post, index) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className={`${seoCardClass} group transition hover:-translate-y-0.5 hover:border-[#d8c4a4]/70 hover:bg-[#f4efe3]/[0.07] ${
              index === 0 ? "md:col-span-2" : ""
            }`}
          >
            <p className="text-sm font-bold text-[#d8c4a4]">
              {post.category} / {post.readingTime}
            </p>
            <h2 className="mt-3 font-grotesk text-3xl font-semibold">
              {post.title}
            </h2>
            <p className={`mt-4 text-sm leading-7 ${seoMutedTextClass}`}>
              {post.description}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {post.keywords.slice(0, 3).map((keyword) => (
                <span
                  key={keyword}
                  className="rounded-full border border-[#f4efe3]/12 bg-[#f4efe3]/[0.06] px-3 py-1 text-xs font-semibold text-[#f4efe3]/72"
                >
                  {keyword}
                </span>
              ))}
            </div>
            <span className="mt-6 inline-flex text-sm font-semibold text-[#d8c4a4]">
              Read guide
            </span>
          </Link>
        ))}
      </section>
    </SeoPageShell>
  );
}