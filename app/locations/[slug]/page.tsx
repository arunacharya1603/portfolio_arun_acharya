import Link from "next/link";
import { notFound } from "next/navigation";

import {
  SeoPageShell,
  seoCardClass,
  seoMutedTextClass,
} from "@/components/SeoPageShell";
import { locationMarkets } from "@/data/seo";
import { siteConfig } from "@/lib/site";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

type LocationPageProps = {
  params: { slug: string };
};

const getLocation = (slug: string) =>
  locationMarkets.find((location) => location.slug === slug);

export async function generateStaticParams() {
  return locationMarkets.map((location) => ({ slug: location.slug }));
}

export async function generateMetadata({ params }: LocationPageProps) {
  const { slug } = params;
  const location = getLocation(slug);

  if (!location) {
    return {};
  }

  return createPageMetadata({
    title: `Freelance Web Developer in ${location.city}, ${location.country}`,
    description: `Hire Arun Acharya for landing pages, UI/UX, frontend development, and web app projects in ${location.city}. Pricing context and delivery support for businesses.`,
    path: `/locations/${location.slug}`,
    keywords: [
      `freelance web developer ${location.city}`,
      `landing page developer ${location.city}`,
      `UI UX developer ${location.city}`,
    ],
  });
}

export default async function LocationPage({ params }: LocationPageProps) {
  const { slug } = params;
  const location = getLocation(slug);

  if (!location) {
    notFound();
  }

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteConfig.url}/locations/${location.slug}#service`,
    name: `Freelance Website Development in ${location.city}`,
    provider: { "@id": siteConfig.personId },
    areaServed: {
      "@type": "Place",
      name: `${location.city}, ${location.country}`,
    },
    serviceType: [
      "Landing Page Development",
      "Business Website Development",
      "Full-Stack Web App Development",
      "UI/UX Design",
      "Frontend Development",
    ],
    offers: {
      "@type": "Offer",
      priceCurrency: location.currency,
      description: `Projects starting from ${location.myStartingPrice}`,
    },
  };

  const breadcrumbSchema = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Locations", path: "/locations" },
    { name: location.city, path: `/locations/${location.slug}` },
  ]);

  return (
    <SeoPageShell
      eyebrow={`${location.city} freelance development`}
      title={`Freelance Web Developer in ${location.city}, ${location.country}`}
      description={`Need a website or web app in ${location.city}? Arun works with local and remote clients to design and build fast, modern, conversion-focused digital products.`}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="grid gap-5 md:grid-cols-2">
        <section className={seoCardClass}>
          <h2 className="font-grotesk text-2xl font-semibold">
            Typical {location.city} Market Pricing
          </h2>
          <ul className={`mt-5 space-y-3 text-sm ${seoMutedTextClass}`}>
            <li>Landing page: {location.typicalLandingPageRange}</li>
            <li>Business website: {location.typicalBusinessWebsiteRange}</li>
            <li>Custom web app: {location.typicalWebAppRange}</li>
            <li className="font-semibold text-[#080809]">
              My starting price: {location.myStartingPrice}
            </li>
          </ul>
        </section>

        <section className={seoCardClass}>
          <h2 className="font-grotesk text-2xl font-semibold">
            Services Offered for {location.city} Clients
          </h2>
          <ul className={`mt-5 space-y-3 text-sm ${seoMutedTextClass}`}>
            <li>Landing pages for lead generation and product launches</li>
            <li>Small business websites with SEO-ready structure</li>
            <li>UI/UX redesign using Figma and React implementation</li>
            <li>Frontend development with React, Next.js, and TypeScript</li>
            <li>Full-stack web application development and deployment</li>
          </ul>
        </section>
      </div>

      <section className="mt-10 flex flex-col gap-4 rounded-lg border border-[#d8ccbb] bg-[#fffaf2] p-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="font-grotesk text-2xl font-semibold">
            Compare before you scope
          </h2>
          <p className={`mt-2 text-sm leading-7 ${seoMutedTextClass}`}>
            Move between city pages, pricing, services, and work examples to understand budget
            and delivery options.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href={`mailto:${siteConfig.email}?subject=Project%20in%20${encodeURIComponent(
              location.city
            )}`}
            className="rounded-full bg-[#080809] px-5 py-3 text-sm font-semibold text-[#fff7ec]"
          >
            Contact Arun
          </a>
          <Link
            href="/services/frontend-development"
            className="rounded-full border border-[#d8ccbb] px-5 py-3 text-sm font-semibold text-[#080809]"
          >
            Frontend service
          </Link>
          <Link
            href="/pricing"
            className="rounded-full border border-[#d8ccbb] px-5 py-3 text-sm font-semibold text-[#080809]"
          >
            Compare pricing
          </Link>
        </div>
      </section>
    </SeoPageShell>
  );
}