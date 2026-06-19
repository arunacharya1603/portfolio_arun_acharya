import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  SeoPageShell,
  seoCardClass,
  seoMutedTextClass,
} from "@/components/SeoPageShell";
import { locationMarkets } from "@/data/seo";
import { siteConfig } from "@/lib/site";

type LocationPageProps = {
  params: { slug: string };
};

const getLocation = (slug: string) =>
  locationMarkets.find((location) => location.slug === slug);

export async function generateStaticParams() {
  return locationMarkets.map((location) => ({ slug: location.slug }));
}

export async function generateMetadata({
  params,
}: LocationPageProps): Promise<Metadata> {
  const { slug } = params;
  const location = getLocation(slug);

  if (!location) {
    return {};
  }

  const title = `Freelance Web Developer in ${location.city}, ${location.country}`;
  const description = `Hire Arun Acharya for website and web app projects in ${location.city}. Pricing context, delivery scope, and project support for businesses.`;
  const canonical = `${siteConfig.url}/locations/${location.slug}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
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
    name: `Freelance Website Development in ${location.city}`,
    provider: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: {
      "@type": "Place",
      name: `${location.city}, ${location.country}`,
    },
    serviceType: [
      "Landing Page Development",
      "Business Website Development",
      "Full-Stack Web App Development",
      "UI/UX Design",
    ],
    offers: {
      "@type": "Offer",
      priceCurrency: location.currency,
      description: `Projects starting from ${location.myStartingPrice}`,
    },
  };

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
            Move between city pages, pricing, and services to understand budget
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
