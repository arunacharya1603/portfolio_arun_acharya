import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
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
      type: "article",
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
    <main className="mx-auto max-w-5xl px-5 py-16 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <h1 className="text-4xl font-bold sm:text-5xl">
        Freelance Web Developer in {location.city}, {location.country}
      </h1>
      <p className="mt-6 text-lg text-white-200">
        Need a website or web app in {location.city}? I work with local and
        remote clients to design and build fast, modern, conversion-focused
        digital products.
      </p>

      <section className="mt-10 rounded-xl border border-white/15 p-6">
        <h2 className="text-2xl font-semibold">
          Typical {location.city} Market Pricing
        </h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-white-200">
          <li>Landing page: {location.typicalLandingPageRange}</li>
          <li>Business website: {location.typicalBusinessWebsiteRange}</li>
          <li>Custom web app: {location.typicalWebAppRange}</li>
          <li>My starting price: {location.myStartingPrice}</li>
        </ul>
      </section>

      <section className="mt-10 rounded-xl border border-white/15 p-6">
        <h2 className="text-2xl font-semibold">
          Services Offered for {location.city} Clients
        </h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-white-200">
          <li>Landing pages for lead generation and product launches</li>
          <li>Small business websites with SEO-ready structure</li>
          <li>UI/UX redesign using Figma and React implementation</li>
          <li>Full-stack web application development and deployment</li>
        </ul>
      </section>

      <section className="mt-10 rounded-xl border border-white/15 p-6">
        <h2 className="text-2xl font-semibold">Start a Project</h2>
        <p className="mt-2 text-white-200">
          Send your requirements and target timeline. I will reply with scope,
          pricing, and milestones.
        </p>
        <div className="mt-4 flex flex-wrap gap-4">
          <a
            href={`mailto:${siteConfig.email}?subject=Project%20in%20${encodeURIComponent(
              location.city
            )}`}
            className="rounded-lg bg-purple px-4 py-2 text-sm font-semibold text-black"
          >
            Contact Arun
          </a>
          <Link
            href="/pricing"
            className="rounded-lg border border-white/30 px-4 py-2 text-sm font-semibold"
          >
            Compare Pricing
          </Link>
        </div>
      </section>
    </main>
  );
}
