import Link from "next/link";
import { notFound } from "next/navigation";

import {
  SeoPageShell,
  seoCardClass,
  seoMutedTextClass,
} from "@/components/SeoPageShell";
import { locationMarkets, servicePackages } from "@/data/seo";
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
    title: `Remote Web Developer for ${location.city} Businesses`,
    description: `Work remotely with Arun Acharya on a website, React frontend or web app for your ${location.city} business. See published starting prices and project examples.`,
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
    name: `Remote Website Development for ${location.city}`,
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
      price: location.currency === "INR" ? servicePackages[0].startingPriceINR : servicePackages[0].startingPriceUSD,
      description: "Starter landing page; final quote depends on agreed scope.",
    },
  };

  const breadcrumbSchema = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Locations", path: "/locations" },
    { name: location.city, path: `/locations/${location.slug}` },
  ]);

  return (
    <SeoPageShell
      eyebrow={`Remote collaboration / ${location.city}`}
      title={`Web development for ${location.city} businesses`}
      description={`Work directly with Arun, an India-based freelance developer, on your website or product. Delivery is remote, with scope, meeting times and handover agreed before work begins.`}
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
            Published starting prices
          </h2>
          <ul className={`mt-5 space-y-3 text-sm ${seoMutedTextClass}`}>
            {servicePackages.map((pkg) => <li key={pkg.slug}><Link className="underline underline-offset-4" href={`/services/${pkg.slug}`}>{pkg.name}</Link>: {location.currency} {(location.currency === "INR" ? pkg.startingPriceINR : pkg.startingPriceUSD).toLocaleString(location.currency === "INR" ? "en-IN" : "en-US")}</li>)}
          </ul>
          <p className={`mt-5 text-sm leading-7 ${seoMutedTextClass}`}>These are my package starting prices, shared across locations. Final scope, payment currency, taxes and third-party costs are confirmed in a written proposal.</p>
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

      <section className="mt-10 flex flex-col gap-4 rounded-lg border border-[#f4efe3]/12 bg-[#f4efe3]/[0.045] p-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="font-grotesk text-2xl font-semibold">
            Compare before you scope
          </h2>
          <p className={`mt-2 text-sm leading-7 ${seoMutedTextClass}`}>
            Use the planner to compare included scope and timelines, then discuss your
            business goals and remote collaboration needs.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="rounded-full bg-[#f4efe3] px-5 py-3 text-sm font-semibold text-[#0d0c09]"
          >
            Contact Arun
          </Link>
          <Link
            href="/services/frontend-development"
            className="rounded-full border border-[#f4efe3]/12 px-5 py-3 text-sm font-semibold text-[#f4efe3]"
          >
            Frontend service
          </Link>
          <Link
            href="/tools/website-cost-planner"
            className="rounded-full border border-[#f4efe3]/12 px-5 py-3 text-sm font-semibold text-[#f4efe3]"
          >
            Plan your scope
          </Link>
        </div>
      </section>
    </SeoPageShell>
  );
}
