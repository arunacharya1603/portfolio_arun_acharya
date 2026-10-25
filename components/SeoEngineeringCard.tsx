import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { LiquidSurface } from "@/components/ui/liquid-surface";

export function SeoEngineeringCard({ headingLevel = "h2" }: { headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <article className="glass-panel min-w-0 rounded-3xl p-6 sm:p-8">
      <LiquidSurface radius={24} />
      <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-widest text-brand">
        <span>Public project</span>
        <span aria-hidden="true">·</span>
        <span>npm package</span>
      </div>
      <Heading className="mt-5 break-words font-grotesk text-3xl font-semibold">
        <Link
          href="/packages/seo-engineering"
          className="inline-flex items-center gap-3 hover:underline focus-visible:underline"
        >
          seo-engineering
          <ArrowUpRight aria-hidden="true" className="h-6 w-6 shrink-0 text-brand" />
        </Link>
      </Heading>
      <p className="mt-3 text-lg font-medium">SEO skill for AI coding agents</p>
      <p className="mt-4 max-w-2xl text-base leading-8 text-subtle">
        Give your coding agent a workflow to understand your product, audit its
        website, and recommend SEO improvements that fit your audience and goals.
      </p>
      <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 border-t border-line pt-5 text-sm text-subtle">
        <span>Codex · Claude Code · Cursor</span>
        <Link
          href="/packages/seo-engineering"
          className="inline-flex min-h-11 items-center font-semibold text-brand underline underline-offset-4"
        >
          Explore seo-engineering
        </Link>
      </div>
    </article>
  );
}
