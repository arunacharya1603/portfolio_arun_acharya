import Link from "next/link";
import type { ReactNode } from "react";

import { siteConfig } from "@/lib/site";

const seoLinks = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Blog", href: "/blog" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/#contact" },
];

export const seoCardClass =
  "min-w-0 rounded-xl border border-[#f4efe3]/12 bg-[#f4efe3]/[0.045] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.22)]";

export const seoMutedTextClass = "text-[#f4efe3]/66";

export function SeoPageShell({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <main className="relative isolate min-h-screen w-full max-w-[100vw] overflow-x-clip bg-[#0d0c09] px-3 pb-12 text-[#f4efe3] [overflow-wrap:anywhere] sm:px-5">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(90deg,rgba(244,239,227,0.035)_1px,transparent_1px),linear-gradient(rgba(244,239,227,0.025)_1px,transparent_1px)] bg-[size:96px_96px] opacity-45"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-64 bg-gradient-to-b from-[#f4efe3]/[0.06] to-transparent"
      />

      <header className="sticky top-0 z-50 pt-3 sm:pt-4">
        <div className="mx-auto w-full min-w-0 max-w-[calc(100vw-1.5rem)] overflow-hidden rounded-[8px] sm:max-w-[1480px] border border-[#f4efe3]/14 bg-[#0d0c09]/78 shadow-[0_18px_70px_rgba(0,0,0,0.34)] backdrop-blur-2xl">
          <nav
            className="flex min-w-0 items-center justify-between gap-2 px-2.5 py-2 sm:gap-4 sm:px-4"
            aria-label="Primary navigation"
          >
            <Link
              href="/"
              className="group flex min-w-0 items-center gap-2.5 rounded-[6px] pr-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f4efe3] sm:gap-3"
              aria-label="Arun Acharya home"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[6px] border border-[#f4efe3]/16 bg-[#f4efe3] font-grotesk text-sm font-semibold text-[#0d0c09] shadow-[0_10px_30px_rgba(244,239,227,0.12)] transition group-hover:bg-[#fff8e8]">
                AA
              </span>
              <span className="min-w-0 leading-none">
                <span className="block truncate font-grotesk text-sm font-semibold text-[#f4efe3] sm:text-base">
                  Arun Acharya
                </span>
                <span className="mt-1 block truncate text-[11px] text-[#f4efe3]/55 sm:text-xs">
                  Frontend Developer
                </span>
              </span>
            </Link>

            <div className="hidden items-center gap-1 rounded-[8px] border border-[#f4efe3]/10 bg-[#f4efe3]/[0.045] p-1 lg:flex">
              {seoLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative rounded-[6px] px-3 py-2 text-sm font-medium text-[#f4efe3]/62 transition hover:bg-[#f4efe3]/8 hover:text-[#f4efe3] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f4efe3]"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <Link
              href="/#contact"
              className="group hidden items-center gap-2 rounded-[6px] border border-[#f4efe3]/18 bg-[#f4efe3] px-3.5 py-2.5 text-sm font-semibold text-[#0d0c09] transition hover:bg-[#fff8e8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f4efe3] sm:inline-flex"
            >
              Start Project
            </Link>
          </nav>

          <div className="flex gap-1 overflow-x-auto border-t border-[#f4efe3]/12 bg-[#0d0c09]/92 p-2 lg:hidden">
            {seoLinks.slice(0, 6).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="shrink-0 rounded-[6px] border border-[#f4efe3]/10 bg-[#f4efe3]/[0.035] px-3 py-2 text-sm font-semibold text-[#f4efe3]/86 transition hover:border-[#f4efe3]/20 hover:bg-[#f4efe3]/8 hover:text-[#f4efe3]"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </header>

      <div className="mx-auto w-full min-w-0 max-w-[calc(100vw-1.5rem)] sm:max-w-[1180px]">
        <section className="border-b border-[#f4efe3]/12 py-16 md:py-20 lg:py-24">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.24em] text-[#d8c4a4]">
            {eyebrow}
          </p>
          <h1 className="max-w-full break-words [overflow-wrap:anywhere] font-grotesk text-4xl font-semibold leading-[0.96] text-[#f4efe3] sm:text-6xl md:text-7xl">
            {title}
          </h1>
          <p className="mt-6 max-w-full [overflow-wrap:anywhere] text-base leading-8 text-[#f4efe3]/68 sm:text-lg sm:leading-9">
            {description}
          </p>
        </section>

        <div className="min-w-0 pt-10">{children}</div>

        <section className="mt-16 rounded-xl border border-[#f4efe3]/12 bg-[#f4efe3]/[0.045] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.22)] md:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#d8c4a4]">
            Available for selected commissions
          </p>
          <h2 className="mt-4 max-w-full [overflow-wrap:anywhere] font-grotesk text-3xl font-semibold leading-[0.98] text-[#f4efe3] sm:text-4xl">
            Need the right scope before you start?
          </h2>
          <p className="mt-4 max-w-full [overflow-wrap:anywhere] text-sm leading-7 text-[#f4efe3]/68">
            Send the goal, timeline, references, and rough budget. Arun can
            shape the strategy, UI direction, technical build, and deployment
            path.
          </p>
          <a
            href={`mailto:${siteConfig.email}?subject=Project%20Inquiry`}
            className="mt-6 inline-flex rounded-[6px] bg-[#f4efe3] px-5 py-3 text-sm font-semibold text-[#0d0c09] transition hover:bg-[#fff8e8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f4efe3]"
          >
            Start a project
          </a>
        </section>
      </div>
    </main>
  );
}