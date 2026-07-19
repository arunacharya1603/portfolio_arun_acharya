import Link from "next/link";
import type { ReactNode } from "react";

import { siteConfig } from "@/lib/site";
import { SiteActionBar } from "@/components/SiteActionBar";
import { SiteHeader } from "@/components/SiteHeader";

export const seoCardClass =
  "min-w-0 rounded-xl border border-[#f4efe3]/12 bg-[#f4efe3]/[0.045] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.22)]";

export const seoMutedTextClass = "text-[#f4efe3]/76";

export function SeoPageShell({
  eyebrow,
  title,
  description,
  children,
  showFooterCta = true,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  showFooterCta?: boolean;
}) {
  return (
    <main className="relative isolate min-h-screen w-full max-w-[100vw] overflow-x-clip bg-[#0d0c09] px-3 pb-28 text-[#f4efe3] [overflow-wrap:anywhere] sm:px-5 md:pb-12">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(90deg,rgba(244,239,227,0.035)_1px,transparent_1px),linear-gradient(rgba(244,239,227,0.025)_1px,transparent_1px)] bg-[size:96px_96px] opacity-45"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-64 bg-gradient-to-b from-[#f4efe3]/[0.06] to-transparent"
      />

      <SiteHeader />

      <div className="mx-auto w-full min-w-0 max-w-[calc(100vw-1.5rem)] sm:max-w-[1180px]">
        <section className="font-hero border-b border-[#f4efe3]/12 py-12 sm:py-16 md:py-20">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.24em] text-[#d8c4a4]">
            {eyebrow}
          </p>
          <h1 className="max-w-full break-words [overflow-wrap:anywhere] font-grotesk text-[2.35rem] font-semibold leading-[0.98] text-[#f4efe3] sm:text-5xl md:text-6xl lg:text-7xl">
            {title}
          </h1>
          <p className="mt-5 max-w-3xl [overflow-wrap:anywhere] text-base leading-7 text-[#f4efe3]/78 sm:text-lg sm:leading-8">
            {description}
          </p>
        </section>

        <div className="min-w-0 pt-10">{children}</div>

        {showFooterCta ? (
          <section className="mt-16 rounded-xl border border-[#f4efe3]/12 bg-[#f4efe3]/[0.045] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.22)] md:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#d8c4a4]">
              Available for selected commissions
            </p>
            <h2 className="mt-4 max-w-full font-heading text-3xl leading-[1.02] text-[#f4efe3] sm:text-4xl">
              Need the right scope before you start?
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#f4efe3]/78">
              Send the goal, timeline, references, and rough budget. Arun can
              shape the strategy, UI direction, technical build, and deployment
              path.
            </p>
            <Link
              href={`mailto:${siteConfig.email}?subject=Project%20Inquiry`}
              className="mt-6 inline-flex rounded-[6px] bg-[#f4efe3] px-5 py-3 text-sm font-semibold text-[#0d0c09] transition hover:bg-[#fff8e8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f4efe3]"
            >
              Start a project
            </Link>
          </section>
        ) : null}
      </div>
      <SiteActionBar />
    </main>
  );
}
