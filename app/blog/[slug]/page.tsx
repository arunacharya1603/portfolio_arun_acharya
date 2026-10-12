import { LiquidSurface } from "@/components/ui/liquid-surface";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  SeoPageShell,
  seoCardClass,
  seoMutedTextClass,
} from "@/components/SeoPageShell";
import {
  getSeoBlogPost,
  getSeoServicePage,
  seoBlogPosts,
} from "@/data/seo-content";
import { workProjects } from "@/data/work-projects";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  createPageMetadata,
  faqJsonLd,
} from "@/lib/seo";

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

  return createPageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    keywords: post.keywords,
    type: "article",
    publishedTime: post.datePublished,
    modifiedTime: post.dateModified,
  });
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getSeoBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  const relatedServices = post.relatedServiceSlugs
    .map(getSeoServicePage)
    .filter(Boolean);
  const relatedWork = post.relatedWorkSlugs
    ? workProjects.filter((project) =>
        post.relatedWorkSlugs!.includes(project.slug),
      )
    : workProjects.slice(0, 2);

  const schemas = [
    articleJsonLd(post),
    faqJsonLd(post.faqs),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: post.title, path: `/blog/${post.slug}` },
    ]),
  ];

  return (
    <SeoPageShell
      eyebrow={`${post.category} / ${post.readingTime}`}
      title={post.title}
      description={post.description}
    >
      {schemas.map((schema, index) => (
        <script
          key={`post-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <article className="grid gap-8 lg:grid-cols-[0.72fr_0.28fr]">
        <div className={seoCardClass}>
          <LiquidSurface radius={16} />
          <div className="rounded-lg border border-line bg-surface p-5">
            <p className="text-sm font-bold text-brand">Short answer</p>
            <p className="mt-3 text-lg leading-8 text-ink">{post.summary}</p>
          </div>

          <div className="mt-8 space-y-8">
            {post.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-grotesk text-3xl font-semibold">
                  {section.heading}
                </h2>
                <div
                  className={`mt-4 space-y-4 text-base leading-8 ${seoMutedTextClass}`}
                >
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {post.references?.length ? (
            <section className="mt-8 border-t border-line pt-6">
              <h2 className="text-xl font-semibold">Further reading</h2>
              <ul className="mt-4 space-y-3 text-sm text-brand">
                {post.references.map((reference) => (
                  <li key={reference.url}>
                    <a
                      href={reference.url}
                      className="underline underline-offset-4"
                    >
                      {reference.title}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <section className="mt-10 border-t border-line pt-8">
            <h2 className="font-grotesk text-3xl font-semibold">
              Common questions
            </h2>
            <div className="mt-5 grid gap-4">
              {post.faqs.map((faq) => (
                <article
                  key={faq.question}
                  className="rounded-lg border border-line bg-surface p-5"
                >
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
            <LiquidSurface radius={16} />
            <p className="text-sm font-bold text-brand">Author and context</p>
            <h2 className="mt-3 font-grotesk text-2xl font-semibold">
              Arun Acharya
            </h2>
            <p className={`mt-3 text-sm leading-7 ${seoMutedTextClass}`}>
              Freelance frontend developer, UI/UX developer, and Next.js
              freelancer building landing pages, web apps, dashboards, APIs, and
              product experiences.
            </p>
            <Link
              href="/blog/author/arun-acharya"
              className="mt-4 inline-flex text-sm font-semibold text-brand"
            >
              About the author
            </Link>
            <p className="mt-4 text-xs font-semibold text-subtle">
              Published {post.datePublished}. Updated {post.dateModified}.
            </p>
          </section>

          <section className={seoCardClass}>
            <LiquidSurface radius={16} />
            <h2 className="font-grotesk text-2xl font-semibold">
              Related services
            </h2>
            <div className="mt-5 grid gap-3">
              {relatedServices.map((service) => (
                <Link
                  key={service!.slug}
                  href={`/services/${service!.slug}`}
                  className="rounded-lg border border-line bg-surface p-4 font-semibold transition hover:border-brand/30 hover:bg-brand-soft"
                >
                  {service!.navLabel}
                </Link>
              ))}
            </div>
          </section>

          <section className={seoCardClass}>
            <LiquidSurface radius={16} />
            <h2 className="font-grotesk text-2xl font-semibold">
              Related work
            </h2>
            <div className="mt-5 grid gap-3">
              {relatedWork.map((project) => (
                <Link
                  key={project.slug}
                  href={`/work/${project.slug}`}
                  className="rounded-lg border border-line bg-surface p-4 transition hover:border-brand/30 hover:bg-brand-soft"
                >
                  <span className="block font-semibold">
                    {project.shortName}
                  </span>
                  <span
                    className={`mt-2 block text-sm leading-6 ${seoMutedTextClass}`}
                  >
                    {project.impact}
                  </span>
                </Link>
              ))}
              <Link
                href="/work"
                className="rounded-lg border border-line bg-surface p-4 text-sm font-semibold text-brand transition hover:border-brand/30 hover:bg-brand-soft"
              >
                See all case studies
              </Link>
            </div>
          </section>

          <section className={seoCardClass}>
            <LiquidSurface radius={16} />
            <h2 className="font-grotesk text-2xl font-semibold">
              Project discussion
            </h2>
            <p className={`mt-3 text-sm leading-7 ${seoMutedTextClass}`}>
              Have a similar project? Share the current site, target audience,
              timeline, and what needs to improve.
            </p>
            <Link
              href="/tools/website-cost-planner"
              className="mt-5 inline-flex rounded-full bg-brand px-5 py-3 text-sm font-semibold text-primary-foreground"
            >
              Plan a similar project
            </Link>
          </section>
        </aside>
      </article>
    </SeoPageShell>
  );
}
