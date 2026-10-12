import { LiquidSurface } from "@/components/ui/liquid-surface";
import Link from "next/link";

import {
  SeoPageShell,
  seoCardClass,
  seoMutedTextClass,
} from "@/components/SeoPageShell";
import { locationMarkets } from "@/data/seo";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Remote Web Developer for India & Global Clients",
  description:
    "Hire India-based developer Arun Acharya for remote Next.js, React, UI/UX, website, dashboard, and web app projects with clear milestones and handover.",
  path: "/locations",
  keywords: [
    "remote web developer India",
    "hire Next.js freelancer",
    "freelance React developer India",
  ],
});

export default function LocationsPage() {
  const breadcrumbSchema = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Remote clients", path: "/locations" },
  ]);

  return (
    <SeoPageShell
      eyebrow="Remote collaboration"
      title="India-based web developer for clients worldwide"
      description="Work directly with Arun on a landing page, business website, React or Next.js frontend, dashboard, MVP, or full-stack web app. Projects run remotely with written scope, clear milestones, timezone-friendly updates, and documented handover."
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="grid gap-5 md:grid-cols-2">
        <article className={seoCardClass}>
          <LiquidSurface radius={16} />
          <p className="text-sm font-bold text-brand">
            How remote delivery works
          </p>
          <h2 className="mt-3 font-grotesk text-3xl font-semibold">
            Clear decisions without unnecessary meetings
          </h2>
          <ul
            className={`mt-5 space-y-3 text-sm leading-7 ${seoMutedTextClass}`}
          >
            <li>
              Written scope, milestones, assumptions, and acceptance criteria
              before work starts.
            </li>
            <li>
              Async progress updates with scheduled calls when a decision needs
              discussion.
            </li>
            <li>
              Staging previews, launch checks, source-code handover, and
              deployment documentation.
            </li>
          </ul>
        </article>

        <article className={seoCardClass}>
          <LiquidSurface radius={16} />
          <p className="text-sm font-bold text-brand">Commercial clarity</p>
          <h2 className="mt-3 font-grotesk text-3xl font-semibold">
            Scope and currency agreed before development
          </h2>
          <p className={`mt-5 text-sm leading-7 ${seoMutedTextClass}`}>
            Published prices are starting points. The proposal confirms the
            payment currency, timeline, integrations, revision scope,
            third-party costs, and what you will receive at handover.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              className="rounded-full bg-brand px-5 py-3 text-sm font-semibold text-primary-foreground"
              href="/pricing"
            >
              Review pricing
            </Link>
            <Link
              className="rounded-full border border-line px-5 py-3 text-sm font-semibold"
              href="/process"
            >
              See the process
            </Link>
          </div>
        </article>
      </section>

      <section className="mt-12">
        <p className="text-sm font-bold text-brand">
          Markets currently served remotely
        </p>
        <h2 className="mt-3 font-grotesk text-3xl font-semibold">
          India and international client collaboration
        </h2>
        <p className={`mt-4 max-w-3xl text-sm leading-7 ${seoMutedTextClass}`}>
          These are service markets, not claims of a local office. Availability
          depends on project fit, communication overlap, and the agreed delivery
          schedule.
        </p>
        <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {locationMarkets.map((location) => (
            <article
              key={location.slug}
              className="rounded-lg border border-line bg-surface p-4"
            >
              <h3 className="font-grotesk text-xl font-semibold">
                {location.city}
              </h3>
              <p className={`mt-2 text-sm ${seoMutedTextClass}`}>
                {location.region}, {location.country}
              </p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.12em] text-brand">
                Remote delivery
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12 flex flex-col gap-5 rounded-lg border border-brand/30 bg-brand-soft p-6 sm:p-8 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="font-grotesk text-3xl font-semibold">
            Discuss the right scope first
          </h2>
          <p
            className={`mt-3 max-w-2xl text-sm leading-7 ${seoMutedTextClass}`}
          >
            Share the product goal, current site or references, target launch
            date, and budget range.
          </p>
        </div>
        <Link
          className="shrink-0 rounded-lg bg-brand px-6 py-4 text-sm font-semibold text-primary-foreground"
          href="/contact"
        >
          Start a project
        </Link>
      </section>
    </SeoPageShell>
  );
}
