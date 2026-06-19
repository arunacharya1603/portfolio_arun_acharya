import type { Metadata } from "next";
import Link from "next/link";

import {
  SeoPageShell,
  seoCardClass,
  seoMutedTextClass,
} from "@/components/SeoPageShell";
import { locationMarkets } from "@/data/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Freelance Web Developer by Location",
  description:
    "Find location-specific website pricing and freelance web development support for cities in India and global markets.",
  alternates: {
    canonical: `${siteConfig.url}/locations`,
  },
  openGraph: {
    title: "Freelance Web Developer by Location | Arun Acharya",
    description:
      "Location-specific hiring pages for freelance website development, UI/UX, and full-stack web apps.",
    url: `${siteConfig.url}/locations`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Freelance Web Developer by Location | Arun Acharya",
    description:
      "Browse location-specific pages for pricing context and freelance web development support.",
  },
};

export default function LocationsPage() {
  return (
    <SeoPageShell
      eyebrow="Locations"
      title="Freelance Web Development by Location"
      description="Browse location-specific pages for pricing context, hiring details, and SEO-ready service information across India and global markets."
    >
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
