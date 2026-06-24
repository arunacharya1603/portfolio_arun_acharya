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
  seoServicePages,
  serviceUrl,
} from "@/data/seo-content";
import { getWorkProjectBySlug, workProjects } from "@/data/work-projects";
import { siteConfig } from "@/lib/site";
import {
  breadcrumbJsonLd,
  createPageMetadata,
  faqJsonLd,
  serviceJsonLd as createServiceJsonLd,
} from "@/lib/seo";

type ServicePageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return seoServicePages.map((service) => ({ slug: service.slug }));
}

export function generateMetadata({ params }: ServicePageProps): Metadata {
  const service = getSeoServicePage(params.slug);

  if (!service) {
    return {};
  }

  return createPageMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
    keywords: [service.primaryIntent, ...service.secondaryIntents],
  });
}

export default function ServiceDetailPage({ params }: ServicePageProps) {
  const service = getSeoServicePage(params.slug);

  if (!service) {
    notFound();
  }

  const canonical = serviceUrl(service.slug);
  const relatedServices = service.relatedServiceSlugs
    .map(getSeoServicePage)
    .filter(Boolean);
  const relatedPosts = service.relatedBlogSlugs
    .map(getSeoBlogPost)
    .filter(Boolean);
  const relatedProjects = service.relatedWorkSlugs?.length
    ? service.relatedWorkSlugs.map(getWorkProjectBySlug).filter(Boolean)
    : workProjects.slice(0, 3);

  const serviceSchemaJsonLd = createServiceJsonLd(service);
  const faqSchemaJsonLd = faqJsonLd(service.faqs);
  const breadcrumbSchemaJsonLd = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: service.navLabel, path: `/services/${service.slug}` },
  ]);

  return (
    <SeoPageShell
      eyebrow={service.heroEyebrow}
      title={service.heroTitle}
      description={service.heroDescription}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchemaJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchemaJsonLd),
        }}
      />

      <section className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <article className={seoCardClass}>
          <p className="text-sm font-bold text-[#d8c4a4]">Primary search intent</p>
          <h2 className="mt-3 font-grotesk text-3xl font-semibold">
            {service.primaryIntent}
          </h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {service.secondaryIntents.map((intent) => (
              <span
                key={intent}
                className="rounded-full border border-[#f4efe3]/12 bg-[#f4efe3]/[0.06] px-3 py-1 text-xs font-semibold text-[#f4efe3]/72"
              >
                {intent}
              </span>
            ))}
          </div>
        </article>

        <article className={seoCardClass}>
          <h2 className="font-grotesk text-3xl font-semibold">
            Best-fit projects
          </h2>
          <ul className={`mt-5 space-y-3 text-sm leading-7 ${seoMutedTextClass}`}>
            {service.bestFor.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d8c4a4]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="mt-10 grid gap-5 md:grid-cols-2">
        <article className={seoCardClass}>
          <h2 className="font-grotesk text-3xl font-semibold">
            What this should improve
          </h2>
          <ul className={`mt-5 space-y-3 text-sm leading-7 ${seoMutedTextClass}`}>
            {service.outcomes.map((outcome) => (
              <li key={outcome}>{outcome}</li>
            ))}
          </ul>
        </article>

        <article className={seoCardClass}>
          <h2 className="font-grotesk text-3xl font-semibold">
            Scope can include
          </h2>
          <ul className={`mt-5 grid gap-3 text-sm ${seoMutedTextClass}`}>
            {service.includes.map((item) => (
              <li
                key={item}
                className="rounded-lg border border-[#f4efe3]/12 bg-[#f4efe3]/[0.06] px-4 py-3"
              >
                {item}
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="mt-10 rounded-lg border border-[#f4efe3]/12 bg-[#f4efe3]/[0.045] shadow-[0_24px_80px_rgba(0,0,0,0.22)]">
        {service.process.map((step, index) => (
          <article
            key={step}
            className="grid gap-4 border-b border-[#f4efe3]/12 p-6 last:border-b-0 md:grid-cols-[96px_1fr]"
          >
            <span className="font-grotesk text-4xl font-semibold text-[#d8c4a4]">
              0{index + 1}
            </span>
            <p className={`text-base leading-8 ${seoMutedTextClass}`}>{step}</p>
          </article>
        ))}
      </section>

      <section className="mt-14">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold text-[#d8c4a4]">Real project references</p>
            <h2 className="mt-2 font-grotesk text-3xl font-semibold">
              Proof from Arun Acharya&apos;s showcased work
            </h2>
          </div>
          <Link
            href="/work"
            className="w-fit rounded-full border border-[#f4efe3]/12 bg-[#f4efe3]/[0.045] px-4 py-2 text-sm font-semibold text-[#f4efe3] transition hover:border-[#d8c4a4]/70 hover:bg-[#f4efe3]/[0.07]"
          >
            View all work
          </Link>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {relatedProjects.map((project) => (
            <Link
              key={project!.slug}
              href={`/work/${project!.slug}`}
              className={`${seoCardClass} transition hover:-translate-y-0.5 hover:border-[#d8c4a4]/70 hover:bg-[#f4efe3]/[0.07]`}
            >
              <p className="text-sm font-bold text-[#d8c4a4]">{project!.shortName}</p>
              <h3 className="mt-3 font-grotesk text-2xl font-semibold">
                {project!.name}
              </h3>
              <p className={`mt-3 text-sm leading-7 ${seoMutedTextClass}`}>
                {project!.impact}
              </p>
              <span className="mt-5 inline-flex text-sm font-semibold text-[#d8c4a4]">
                Read case study
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-grotesk text-3xl font-semibold">
          Questions clients ask before this work
        </h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {service.faqs.map((faq) => (
            <article key={faq.question} className={seoCardClass}>
              <h3 className="font-semibold">{faq.question}</h3>
              <p className={`mt-2 text-sm leading-7 ${seoMutedTextClass}`}>
                {faq.answer}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-14 grid gap-5 md:grid-cols-2">
        <article className={seoCardClass}>
          <h2 className="font-grotesk text-2xl font-semibold">
            Related services
          </h2>
          <div className="mt-5 grid gap-3">
            {relatedServices.map((related) => (
              <Link
                key={related!.slug}
                href={`/services/${related!.slug}`}
                className="rounded-lg border border-[#f4efe3]/12 bg-[#f4efe3]/[0.06] p-4 font-semibold transition hover:border-[#d8c4a4]/70 hover:bg-[#f4efe3]/[0.07]"
              >
                {related!.navLabel}
              </Link>
            ))}
          </div>
        </article>

        <article className={seoCardClass}>
          <h2 className="font-grotesk text-2xl font-semibold">
            Helpful reading
          </h2>
          <div className="mt-5 grid gap-3">
            {relatedPosts.map((post) => (
              <Link
                key={post!.slug}
                href={`/blog/${post!.slug}`}
                className="rounded-lg border border-[#f4efe3]/12 bg-[#f4efe3]/[0.06] p-4 transition hover:border-[#d8c4a4]/70 hover:bg-[#f4efe3]/[0.07]"
              >
                <span className="block font-semibold">{post!.title}</span>
                <span className={`mt-2 block text-sm leading-6 ${seoMutedTextClass}`}>
                  {post!.description}
                </span>
              </Link>
            ))}
          </div>
        </article>
      </section>

      <section className="mt-14 flex flex-col gap-4 rounded-lg border border-[#f4efe3]/12 bg-[#f4efe3]/[0.045] p-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="font-grotesk text-2xl font-semibold">
            Want to discuss this scope?
          </h2>
          <p className={`mt-2 text-sm leading-7 ${seoMutedTextClass}`}>
            Send the current site, goal, timeline, and a few references. Arun
            can help decide whether this should be a lean build, revamp, or
            larger product scope.
          </p>
          <p className="mt-3 text-xs font-semibold text-[#f4efe3]/45">
            Canonical: {canonical}
          </p>
        </div>
        <a
          href={`mailto:${siteConfig.email}?subject=${encodeURIComponent(
            service.navLabel
          )}%20Project`}
          className="w-fit rounded-full bg-[#f4efe3] px-5 py-3 text-sm font-semibold text-[#0d0c09]"
        >
          Start this project
        </a>
      </section>
    </SeoPageShell>
  );
}