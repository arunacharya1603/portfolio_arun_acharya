import Link from "next/link";
import type { ReactNode } from "react";

import { siteConfig } from "@/lib/site";

const seoLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Pricing", href: "/pricing" },
  { label: "Locations", href: "/locations" },
];

export const seoCardClass =
  "rounded-lg border border-[#d8ccbb] bg-[#fffaf2] p-6 shadow-[0_14px_34px_rgba(8,8,9,0.05)]";

export const seoMutedTextClass = "text-[#5d584f]";

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
    <main className="studio-shell min-h-screen bg-[#f6efe4] px-5 py-6 text-[#080809] md:px-8">
      <div className="mx-auto max-w-6xl">
        <nav
          className="flex flex-col gap-4 rounded-lg border border-[#d8ccbb] bg-[#fbf6ee]/90 p-3 shadow-[0_18px_60px_rgba(8,8,9,0.08)] backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between"
          aria-label="SEO page navigation"
        >
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#080809] text-sm font-bold text-[#f8f1e7]">
              AA
            </span>
            <span>
              <span className="block font-grotesk text-base font-semibold">
                Arun Acharya
              </span>
              <span className="block text-xs text-[#5d584f]">
                Freelance full-stack studio
              </span>
            </span>
          </Link>
          <div className="flex flex-wrap gap-2">
            {seoLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full border border-[#d8ccbb] bg-[#fffaf2] px-4 py-2 text-sm font-semibold text-[#312d27] transition hover:border-[#080809] hover:text-[#080809]"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>

        <section className="py-16 md:py-20">
          <p className="mb-4 text-sm font-bold text-[#2457ff]">{eyebrow}</p>
          <h1 className="max-w-4xl font-grotesk text-4xl font-semibold leading-tight text-[#080809] sm:text-5xl md:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[#5d584f]">
            {description}
          </p>
        </section>

        {children}

        <section className="mt-16 rounded-lg border border-[#080809] bg-[#080809] p-6 text-[#fff7ec] md:p-8">
          <p className="text-sm font-semibold text-[#dff7b1]">
            Available for selected commissions
          </p>
          <h2 className="mt-3 font-grotesk text-3xl font-semibold">
            Need the right scope before you start?
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/[0.72]">
            Send the goal, timeline, references, and rough budget. Arun can
            shape the strategy, UI direction, technical build, and deployment
            path.
          </p>
          <a
            href={`mailto:${siteConfig.email}?subject=Project%20Inquiry`}
            className="mt-6 inline-flex rounded-full bg-[#dff7b1] px-5 py-3 text-sm font-semibold text-[#14230c]"
          >
            Start a project
          </a>
        </section>
      </div>
    </main>
  );
}
