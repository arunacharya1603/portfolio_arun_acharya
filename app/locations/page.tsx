import Link from "next/link";

import {
  SeoPageShell,
  seoCardClass,
  seoMutedTextClass,
} from "@/components/SeoPageShell";
import { locationMarkets } from "@/data/seo";
import { siteConfig } from "@/lib/site";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export function generateMetadata() {
  return createPageMetadata({
    title: "Freelance Web Developer by Location | Arun Acharya",
    description:
      "Location-specific website, UI/UX, frontend development, landing page, and full-stack web app support from Arun Acharya for India and global markets.",
    path: "/locations",
    keywords: ["freelance web developer India", "UI UX developer India", "landing page developer India"],
  });
}

const locationsItemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${siteConfig.url}/locations#itemlist`,
  name: "Location pages for Arun Acharya freelance services",
  itemListElement: locationMarkets.map((location, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: `${location.city}, ${location.country}`,
    item: `${siteConfig.url}/locations/${location.slug}`,
  })),
};

export default function LocationsPage() {
  const schemas = [
    locationsItemListJsonLd,
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Locations", path: "/locations" },
    ]),
  ];

  return (
    <SeoPageShell
      eyebrow="Locations"
      title="Freelance Web Development by Location"
      description="Browse location-specific pages for pricing context, hiring details, and SEO-ready service information across India and global markets."
    >
      {schemas.map((schema, index) => (
        <script
          key={`locations-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {locationMarkets.map((location) => (
          <Link
            key={location.slug}
            href={`/locations/${location.slug}`}
            className={`${seoCardClass} group transition hover:-translate-y-0.5 hover:border-[#080809]`}
          >
            <p className="text-sm font-bold text-[#2457ff]">
              {location.region}
            </p>
            <h2 className="mt-3 font-grotesk text-2xl font-semibold">
              {location.city}, {location.country}
            </h2>
            <p className={`mt-3 text-sm leading-7 ${seoMutedTextClass}`}>
              Landing page range: {location.typicalLandingPageRange}
            </p>
            <p className="mt-3 text-sm font-semibold text-[#080809]">
              My starting price: {location.myStartingPrice}
            </p>
            <span className="mt-5 inline-flex text-sm font-semibold text-[#2457ff]">
              View city page
            </span>
          </Link>
        ))}
      </div>
    </SeoPageShell>
  );
}