import type { Metadata } from "next";
import Link from "next/link";
import { locationMarkets, servicePackages } from "@/data/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Freelance Website Pricing",
  description:
    "Transparent freelance pricing for landing pages, business websites, and full-stack web apps with location-based market ranges.",
  alternates: {
    canonical: `${siteConfig.url}/pricing`,
  },
  openGraph: {
    title: "Freelance Website Pricing | Arun Acharya",
    description:
      "See package pricing and market ranges by location for web development and UI/UX projects.",
    url: `${siteConfig.url}/pricing`,
    type: "website",
  },
};

export default function PricingPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-16 text-white">
      <h1 className="text-4xl font-bold sm:text-5xl">
        Freelance Website Pricing and Market Ranges
      </h1>
      <p className="mt-6 text-lg text-white-200">
        Use this page to estimate budgets for small to medium website projects.
        Final quotes depend on scope, timeline, integrations, and content.
      </p>

      <section className="mt-12 grid gap-6 md:grid-cols-3">
        {servicePackages.map((pkg) => (
          <article
            key={pkg.name}
            className="rounded-xl border border-white/15 bg-black-100/60 p-6"
          >
            <h2 className="text-xl font-semibold">{pkg.name}</h2>
            <p className="mt-2 text-sm text-white-200">{pkg.bestFor}</p>
            <p className="mt-3 text-sm font-semibold">
              Starts at USD {pkg.startingPriceUSD} / INR {pkg.startingPriceINR}
            </p>
            <p className="mt-2 text-xs uppercase tracking-wide text-white-200">
              Delivery: {pkg.delivery}
            </p>
          </article>
        ))}
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-semibold">
          Location-Based Market Pricing Snapshot
        </h2>
        <p className="mt-2 text-sm text-white-200">
          These are broad market ranges for planning, not fixed quotes.
        </p>
        <div className="mt-5 overflow-x-auto rounded-xl border border-white/15">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-white/5">
              <tr>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Landing Page</th>
                <th className="px-4 py-3">Business Website</th>
                <th className="px-4 py-3">Web App</th>
                <th className="px-4 py-3">My Start Price</th>
              </tr>
            </thead>
            <tbody>
              {locationMarkets.map((location) => (
                <tr key={location.slug} className="border-t border-white/10">
                  <td className="px-4 py-3">
                    <Link href={`/locations/${location.slug}`} className="underline">
                      {location.city}, {location.country}
                    </Link>
                  </td>
                  <td className="px-4 py-3">{location.typicalLandingPageRange}</td>
                  <td className="px-4 py-3">
                    {location.typicalBusinessWebsiteRange}
                  </td>
                  <td className="px-4 py-3">{location.typicalWebAppRange}</td>
                  <td className="px-4 py-3">{location.myStartingPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-14 rounded-xl border border-white/15 p-6">
        <h2 className="text-2xl font-semibold">Need an Exact Quote?</h2>
        <p className="mt-2 text-white-200">
          Share your required pages, features, and delivery date. I will send a
          practical proposal with timeline and cost.
        </p>
        <div className="mt-4 flex flex-wrap gap-4">
          <a
            href={`mailto:${siteConfig.email}?subject=Pricing%20Quote`}
            className="rounded-lg bg-purple px-4 py-2 text-sm font-semibold text-black"
          >
            Request Proposal
          </a>
          <Link
            href="/services"
            className="rounded-lg border border-white/30 px-4 py-2 text-sm font-semibold"
          >
            Compare Services
          </Link>
        </div>
      </section>
    </main>
  );
}
