import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Github, Linkedin } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { AnalyticsPreferencesButton } from "@/components/AnalyticsConsent";
import { Container } from "./Section";

const footerLinks = [
  ["Work", "/work"],
  ["About", "/about"],
  ["Experience", "/experience"],
  ["Services", "/services"],
  ["Process", "/process"],
  ["Pricing", "/pricing"],
  ["FAQ", "/faq"],
  ["Resources", "/resources"],
  ["Contact", "/contact"],
];

export function SiteFooter() {
  return (
    <footer className="border-t border-surface bg-surface/50 pb-28 pt-12 md:pb-8">
      <Container>
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div className="max-w-sm">
            <Link
              href="/"
              className="inline-flex items-center gap-3 text-lg font-bold tracking-tight"
            >
              <Image
                src="/brand/arun-graphic-logo-v2-transparent.png"
                alt=""
                width={48}
                height={48}
                sizes="48px"
                className="h-12 w-12 shrink-0 object-contain"
              />
              <span>
                Arun Acharya<span className="text-brand">.</span>
              </span>
            </Link>
            <p className="mt-3 text-sm leading-7 text-subtle">
              Thoughtful websites and products. Designed with care, built to
              work.
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-5 inline-flex items-center gap-2 break-all text-sm font-medium text-brand"
            >
              {siteConfig.email}
              <ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0" />
            </a>
          </div>
          <nav
            aria-label="Footer navigation"
            className="grid grid-cols-3 gap-x-8 gap-y-4 text-sm text-subtle sm:gap-x-12"
          >
            {footerLinks.map(([label, href]) => (
              <Link key={href} href={href} className="hover:text-brand">
                {label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-5 border-t border-line pt-6 text-xs text-subtle">
          <p>© {new Date().getFullYear()} Arun Acharya</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link href="/privacy" className="inline-flex min-h-11 items-center hover:text-brand">Privacy</Link>
            <AnalyticsPreferencesButton />
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-brand"
            >
              <Github aria-hidden="true" className="h-4 w-4" />
              GitHub
            </a>
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-brand"
            >
              <Linkedin aria-hidden="true" className="h-4 w-4" />
              LinkedIn
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
