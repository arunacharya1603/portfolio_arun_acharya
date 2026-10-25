import { GlassLink } from "@/components/ui/glass-link";
import { LiquidSurface } from "@/components/ui/liquid-surface";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { Container } from "./Section";

export function PageCta() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="glass-panel glass-cta rounded-3xl px-6 py-12 sm:p-14 lg:flex lg:items-center lg:justify-between lg:gap-12">
          <LiquidSurface radius={24} />
          <div className="max-w-2xl">
            <h2 className="text-section">Have something in mind?</h2>
            <p className="mt-4 max-w-xl text-base leading-8 text-subtle">
              Let’s talk it through. In a short intro call, we’ll explore your
              goals, scope, and the next step together.
            </p>
          </div>
          <div className="mt-7 shrink-0 lg:mt-0">
            <div className="flex flex-col gap-3 sm:flex-row">
              <GlassLink href="/contact" analyticsEvent="start_project_click" analyticsLocation="page_cta">
                Start Project
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </GlassLink>
              <GlassLink
                href={siteConfig.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                analyticsEvent="book_call_click"
                analyticsLocation="page_cta"
              >
                <CalendarDays aria-hidden="true" className="h-4 w-4" />
                Book a call
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                <span className="sr-only"> (opens in a new tab)</span>
              </GlassLink>
            </div>
            <p className="mt-3 text-sm text-subtle sm:text-right">
              Choose a time that works for you.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
