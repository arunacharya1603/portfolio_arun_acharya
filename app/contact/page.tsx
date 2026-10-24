import Link from "next/link";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import { GlassLink } from "@/components/ui/glass-link";
import { siteConfig } from "@/lib/site";
import { ProjectInquiryForm } from "@/components/ProjectInquiryForm";
import { SeoPageShell } from "@/components/SeoPageShell";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Discuss a Website or Next.js Project with Arun Acharya",
  description:
    "Contact Arun Acharya about a website, React or Next.js frontend, dashboard, or MVP. Share your goal and get a practical next step.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <SeoPageShell
      eyebrow="Work with Arun"
      title="Let’s scope your next build."
      description="Share what you want to achieve and what is getting in the way. You’ll speak directly with the developer doing the work."
      showFooterCta={false}
    >
      <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr]">
        <ProjectInquiryForm source="contact-page" />
        <aside className="space-y-5 border-t border-line pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <section className="border-b border-line pb-7">
            <h2 className="text-2xl font-semibold tracking-tight">
              Prefer to talk it through?
            </h2>
            <p className="mt-3 text-sm leading-7 text-subtle">
              Book a short intro call with me to discuss your idea, ask questions,
              and work out the next step.
            </p>
            <GlassLink
              href={siteConfig.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              className="mt-5"
            >
              <CalendarDays aria-hidden="true" className="h-4 w-4" />
              Book a call
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              <span className="sr-only"> (opens in a new tab)</span>
            </GlassLink>
          </section>
          <h2 className="font-grotesk text-2xl font-semibold">
            What happens next?
          </h2>
          <ol className="list-decimal space-y-4 pl-5 text-sm leading-7 text-subtle">
            <li>I review your goal, timeline and current site.</li>
            <li>We clarify the scope and whether I’m the right fit.</li>
            <li>You receive a written proposal before committing to work.</li>
          </ol>
          <p className="text-sm leading-7 text-subtle">
            Still deciding on scope? Compare my published packages with the free
            planner, or see how I have approached similar projects.
          </p>
          <Link
            href="/tools/website-cost-planner"
            className="block text-brand underline underline-offset-4"
          >
            Use the website cost planner
          </Link>
          <Link
            href="/work"
            className="block text-brand underline underline-offset-4"
          >
            Read the case studies
          </Link>
          <Link href="/locations" className="block text-brand underline underline-offset-4">
            How remote collaboration works
          </Link>
        </aside>
      </div>
    </SeoPageShell>
  );
}
