import type { Metadata } from "next";
import Link from "next/link";

import {
  SeoPageShell,
  seoCardClass,
  seoMutedTextClass,
} from "@/components/SeoPageShell";
import { blogUrl, seoBlogPosts } from "@/data/seo-content";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Web Design and Development Blog",
  description:
    "Practical articles about small business websites, frontend revamps, UI/UX, API development, SaaS builds, and project scoping by Arun Acharya.",
  alternates: {
    canonical: `${siteConfig.url}/blog`,
  },
  openGraph: {
    title: "Web Design and Development Blog | Arun Acharya",
    description:
      "Guides for founders and businesses planning websites, UI/UX redesigns, frontend revamps, APIs, and web apps.",
    url: `${siteConfig.url}/blog`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Design and Development Blog | Arun Acharya",
    description:
      "Practical website, UI/UX, frontend, and full-stack build guidance for clients.",
  },
};

export default function BlogPage() {
  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Arun Acharya Web Design and Development Blog",
    url: `${siteConfig.url}/blog`,
    description: metadata.description,
    author: {
      "@type": "Person",
      "@id": `${siteConfig.url}#person`,
      name: siteConfig.name,
      url: siteConfig.url,
    },
    blogPost: seoBlogPosts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: blogUrl(post.slug),
      datePublished: post.datePublished,
      dateModified: post.dateModified,
    })),
  };

  return (
    <SeoPageShell
      eyebrow="Blog and guides"
      title="Practical SEO content for website, frontend, UI/UX, and full-stack project decisions."
      description="These articles are built for real client questions: what to build first, when to revamp the frontend, how UI/UX affects development, and how APIs fit into web app projects."
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />

      <section className="grid gap-5 md:grid-cols-2">
        {seoBlogPosts.map((post, index) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className={`${seoCardClass} group transition hover:-translate-y-0.5 hover:border-[#080809] ${
              index === 0 ? "md:col-span-2" : ""
            }`}
          >
            <p className="text-sm font-bold text-[#2457ff]">
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
                  className="rounded-full border border-[#d8ccbb] bg-[#f8efe3] px-3 py-1 text-xs font-semibold text-[#4f4b43]"
                >
                  {keyword}
                </span>
              ))}
            </div>
            <span className="mt-6 inline-flex text-sm font-semibold text-[#2457ff]">
              Read guide
            </span>
          </Link>
        ))}
      </section>
    </SeoPageShell>
  );
}
