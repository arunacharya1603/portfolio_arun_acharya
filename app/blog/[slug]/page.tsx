import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  SeoPageShell,
  seoCardClass,
  seoMutedTextClass,
} from "@/components/SeoPageShell";
import {
  blogUrl,
  getSeoBlogPost,
  getSeoServicePage,
  seoBlogPosts,
} from "@/data/seo-content";
import { siteConfig } from "@/lib/site";

type BlogPostPageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return seoBlogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: BlogPostPageProps): Metadata {
  const post = getSeoBlogPost(params.slug);

  if (!post) {
    return {};
  }

  const canonical = blogUrl(post.slug);

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    alternates: { canonical },
    openGraph: {
      title: post.title,
      description: post.description,
      url: canonical,
      type: "article",
      publishedTime: post.datePublished,
      modifiedTime: post.dateModified,
      authors: [siteConfig.name],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getSeoBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  const canonical = blogUrl(post.slug);
  const relatedServices = post.relatedServiceSlugs
    .map(getSeoServicePage)
    .filter(Boolean);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${canonical}#article`,
    headline: post.title,
    description: post.description,
    url: canonical,
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    author: {
      "@type": "Person",
      "@id": `${siteConfig.url}#person`,
      name: siteConfig.name,
      url: siteConfig.url,
      sameAs: [siteConfig.github, siteConfig.linkedin, siteConfig.x],
    },
    publisher: {
      "@type": "Person",
      "@id": `${siteConfig.url}#person`,
      name: siteConfig.name,
    },
    mainEntityOfPage: canonical,
    about: post.keywords,
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${siteConfig.url}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: canonical,
      },
    ],
  };

  return (
    <SeoPageShell
      eyebrow={`${post.category} / ${post.readingTime}`}
      title={post.title}
      description={post.description}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <article className="grid gap-8 lg:grid-cols-[0.72fr_0.28fr]">
        <div className={seoCardClass}>
          <div className="rounded-lg border border-[#d8ccbb] bg-[#f8efe3] p-5">
            <p className="text-sm font-bold text-[#2457ff]">Short answer</p>
            <p className="mt-3 text-lg leading-8 text-[#312d27]">
              {post.summary}
            </p>
          </div>

          <div className="mt-8 space-y-8">
            {post.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-grotesk text-3xl font-semibold">
                  {section.heading}
                </h2>
                <div className={`mt-4 space-y-4 text-base leading-8 ${seoMutedTextClass}`}>
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <section className="mt-10 border-t border-[#d8ccbb] pt-8">
            <h2 className="font-grotesk text-3xl font-semibold">
              Common questions
            </h2>
            <div className="mt-5 grid gap-4">
              {post.faqs.map((faq) => (
                <article key={faq.question} className="rounded-lg border border-[#d8ccbb] bg-[#f8efe3] p-5">
                  <h3 className="font-semibold">{faq.question}</h3>
                  <p className={`mt-2 text-sm leading-7 ${seoMutedTextClass}`}>
                    {faq.answer}
                  </p>
                </article>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-5">
          <section className={seoCardClass}>
            <p className="text-sm font-bold text-[#2457ff]">Author and context</p>
            <h2 className="mt-3 font-grotesk text-2xl font-semibold">
              Arun Acharya
            </h2>
            <p className={`mt-3 text-sm leading-7 ${seoMutedTextClass}`}>
              Freelance full-stack developer and UI/UX-focused studio partner
              building websites, revamps, web apps, dashboards, and API-backed
              product experiences.
            </p>
            <p className="mt-4 text-xs font-semibold text-[#716b60]">
              Published {post.datePublished}. Updated {post.dateModified}.
            </p>
          </section>

          <section className={seoCardClass}>
            <h2 className="font-grotesk text-2xl font-semibold">
              Related services
            </h2>
            <div className="mt-5 grid gap-3">
              {relatedServices.map((service) => (
                <Link
                  key={service!.slug}
                  href={`/services/${service!.slug}`}
                  className="rounded-lg border border-[#d8ccbb] bg-[#f8efe3] p-4 font-semibold transition hover:border-[#080809]"
                >
                  {service!.navLabel}
                </Link>
              ))}
            </div>
          </section>

          <section className={seoCardClass}>
            <h2 className="font-grotesk text-2xl font-semibold">
              Project discussion
            </h2>
            <p className={`mt-3 text-sm leading-7 ${seoMutedTextClass}`}>
              Have a similar project? Share the current site, target audience,
              timeline, and what needs to improve.
            </p>
            <a
              href={`mailto:${siteConfig.email}?subject=${encodeURIComponent(
                post.title
              )}`}
              className="mt-5 inline-flex rounded-full bg-[#080809] px-5 py-3 text-sm font-semibold text-[#fff7ec]"
            >
              Ask about this
            </a>
          </section>
        </aside>
      </article>
    </SeoPageShell>
  );
}
