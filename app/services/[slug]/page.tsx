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
import { siteConfig } from "@/lib/site";

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

  const canonical = serviceUrl(service.slug);

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    keywords: [service.primaryIntent, ...service.secondaryIntents],
    alternates: { canonical },
    openGraph: {
      title: `${service.metaTitle} | Arun Acharya`,
      description: service.metaDescription,
      url: canonical,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.metaTitle} | Arun Acharya`,
      description: service.metaDescription,
    },
  };
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

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${canonical}#service`,
    name: service.metaTitle,
    description: service.metaDescription,
    url: canonical,
    provider: {
      "@type": "Person",
      "@id": `${siteConfig.url}#person`,
      name: siteConfig.name,
      url: siteConfig.url,
      sameAs: [siteConfig.github, siteConfig.linkedin, siteConfig.x],
    },
    serviceType: [service.primaryIntent, ...service.secondaryIntents],
    areaServed: [
      "India",
      "United States",
      "United Kingdom",
      "Canada",
      "United Arab Emirates",
      "Australia",
    ],
    audience: {
      "@type": "Audience",
      audienceType: service.bestFor.join(" "),
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: service.navLabel,
      itemListElement: service.includes.map((item) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: item,
        },
      })),
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((faq) => ({
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
        name: "Services",
        item: `${siteConfig.url}/services`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: service.navLabel,
        item: canonical,
      },
    ],
  };

  return (
    <SeoPageShell
      eyebrow={service.heroEyebrow}
      title={service.heroTitle}
      description={service.heroDescription}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <section className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <article className={seoCardClass}>
          <p className="text-sm font-bold text-[#2457ff]">Primary search intent</p>
          <h2 className="mt-3 font-grotesk text-3xl font-semibold">
            {service.primaryIntent}
          </h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {service.secondaryIntents.map((intent) => (
              <span
                key={intent}
                className="rounded-full border border-[#d8ccbb] bg-[#f8efe3] px-3 py-1 text-xs font-semibold text-[#4f4b43]"
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
                <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2457ff]" />
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
                className="rounded-lg border border-[#e2d4c2] bg-[#f8efe3] px-4 py-3"
              >
                {item}
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="mt-10 rounded-lg border border-[#080809] bg-[#fffaf2] shadow-[14px_14px_0_#e1d3c1]">
        {service.process.map((step, index) => (
          <article
            key={step}
            className="grid gap-4 border-b border-[#d8ccbb] p-6 last:border-b-0 md:grid-cols-[96px_1fr]"
          >
            <span className="font-grotesk text-4xl font-semibold text-[#ff6f59]">
              0{index + 1}
            </span>
            <p className={`text-base leading-8 ${seoMutedTextClass}`}>{step}</p>
          </article>
        ))}
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
                className="rounded-lg border border-[#d8ccbb] bg-[#f8efe3] p-4 font-semibold transition hover:border-[#080809]"
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
                className="rounded-lg border border-[#d8ccbb] bg-[#f8efe3] p-4 transition hover:border-[#080809]"
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

      <section className="mt-14 flex flex-col gap-4 rounded-lg border border-[#d8ccbb] bg-[#fffaf2] p-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="font-grotesk text-2xl font-semibold">
            Want to discuss this scope?
          </h2>
          <p className={`mt-2 text-sm leading-7 ${seoMutedTextClass}`}>
            Send the current site, goal, timeline, and a few references. Arun
            can help decide whether this should be a lean build, revamp, or
            larger product scope.
          </p>
        </div>
        <a
          href={`mailto:${siteConfig.email}?subject=${encodeURIComponent(
            service.navLabel
          )}%20Project`}
          className="w-fit rounded-full bg-[#080809] px-5 py-3 text-sm font-semibold text-[#fff7ec]"
        >
          Start this project
        </a>
      </section>
    </SeoPageShell>
  );
}
