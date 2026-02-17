import type { Metadata } from "next";
import Link from "next/link";
import { locationMarkets } from "@/data/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Freelance Web Developer by Location",
  description:
    "Find location-specific website pricing and freelance web development support for cities in India and global markets.",
  alternates: {
    canonical: `${siteConfig.url}/locations`,
  },
};

export default function LocationsPage() {
  return (
    <main className="mx-auto max-w-5xl px-5 py-16 text-white">
      <h1 className="text-4xl font-bold sm:text-5xl">
        Freelance Web Development by Location
      </h1>
      <p className="mt-5 text-white-200">
        Browse location-specific pages for pricing context and hiring details.
      </p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {locationMarkets.map((location) => (
          <Link
            key={location.slug}
            href={`/locations/${location.slug}`}
            className="rounded-xl border border-white/15 p-5 transition hover:border-white/40"
          >
            <h2 className="text-xl font-semibold">
              {location.city}, {location.country}
            </h2>
            <p className="mt-2 text-sm text-white-200">
              Landing page range: {location.typicalLandingPageRange}
            </p>
            <p className="text-sm text-white-200">
              My starting price: {location.myStartingPrice}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
