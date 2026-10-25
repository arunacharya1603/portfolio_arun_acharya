import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { InstallCommand } from "@/components/InstallCommand";
import { SeoPageShell } from "@/components/SeoPageShell";
import { GlassLink } from "@/components/ui/glass-link";
import { LiquidSurface } from "@/components/ui/liquid-surface";
import { absoluteUrl, breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "seo-engineering: SEO Skill for Codex & AI Coding Agents",
  description:
    "Install seo-engineering, an SEO skill for Codex, Claude Code and Cursor. Audit technical SEO, plan relevant content and review changes with your coding agent.",
  path: "/packages/seo-engineering",
  keywords: ["seo-engineering", "SEO skill for Codex", "SEO skills for AI coding agents"],
});

const capabilities = [
  {
    title: "Understand the product and audience",
    description:
      "Start with the offer, intended customers, market and outcome. Surface missing context so recommendations address the website’s actual purpose.",
  },
  {
    title: "Technical SEO audits",
    description:
      "Guide the agent through crawlability, indexing rules, robots.txt, sitemaps, canonical URLs, redirects and rendered content, using the tools available to it.",
  },
  {
    title: "On-page SEO and content planning",
    description:
      "Review titles, descriptions, headings, internal links and structured data. Connect keyword and content planning to search intent and evidence about the product.",
  },
  {
    title: "Content accuracy and AI discovery",
    description:
      "Help your agent check whether sources support your content’s claims, review authorship and expertise, and make answers clearer for readers and AI search. Findings distinguish missing evidence from claims shown to be incorrect.",
  },
  {
    title: "Performance and website changes",
    description:
      "Guide reviews of Core Web Vitals, website migrations, ecommerce pages and international SEO. The checks depend on your project and the tools available to your agent.",
  },
  {
    title: "Prioritize changes and validate the work",
    description:
      "Organize findings into actionable next steps. When you ask the agent to implement changes, the workflow calls for focused edits, regression checks and a record of anything it could not verify.",
  },
];

const packageJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "@id": `${absoluteUrl("/packages/seo-engineering")}#package`,
  name: "seo-engineering",
  description:
    "An SEO skill for Codex, Claude Code and Cursor that supplies instructions, references and templates for website audits, content planning and implementation checks.",
  url: absoluteUrl("/packages/seo-engineering"),
  mainEntityOfPage: absoluteUrl("/packages/seo-engineering"),
  codeRepository: "https://github.com/arunacharya1603/seo-engineering",
  sameAs: ["https://www.npmjs.com/package/seo-engineering"],
  runtimePlatform: "Node.js 22.20 or newer",
  author: { "@id": siteConfig.personId },
  inLanguage: "en",
};

export default function SeoEngineeringPage() {
  return (
    <SeoPageShell
      eyebrow="Public project · Available on npm"
      title="seo-engineering — SEO Skill for AI Coding Agents."
      description="Help Codex, Claude Code or Cursor understand your product, audit your website, and recommend SEO improvements relevant to your audience and goals. Created and published by Arun Acharya."
      breadcrumbs={
        <nav aria-label="Breadcrumb" className="flex flex-wrap gap-2 text-sm text-subtle">
          <Link href="/packages" className="underline underline-offset-4">Packages</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">seo-engineering</span>
        </nav>
      }
      heroContent={
        <div className="max-w-xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand">Install with npm</p>
          <InstallCommand />
          <p className="mt-3 text-sm leading-6 text-subtle">
            Node.js 22.20+ · AI coding agent required.{" "}
            <Link href="#package-requirements" className="font-medium text-brand underline underline-offset-4">
              Setup details
            </Link>
          </p>
        </div>
      }
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Packages", path: "/packages" },
              { name: "seo-engineering", path: "/packages/seo-engineering" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(packageJsonLd) }}
      />
      <section aria-labelledby="package-overview" className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="min-w-0">
          <h2 id="package-overview" className="font-grotesk text-3xl font-semibold leading-tight">
            What is seo-engineering?
          </h2>
          <p className="mt-5 text-base leading-8 text-subtle">
            seo-engineering is a free SEO skill for Codex, Claude Code and
            Cursor, distributed through npm. It helps your coding agent
            understand your product, audit your website, plan relevant content
            and validate requested changes across different website frameworks.
          </p>
          <p className="mt-4 text-base leading-8 text-subtle">
            Use it as an SEO skill for Codex, Claude Code or Cursor when you want
            recommendations grounded in your product. It adapts the work to the
            project’s framework, available evidence and tools.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <GlassLink href="https://www.npmjs.com/package/seo-engineering" target="_blank" rel="noopener noreferrer" variant="primary" analyticsEvent="npm_link_click" analyticsLocation="package_overview">
              View on npm <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              <span className="sr-only"> (opens in a new tab)</span>
            </GlassLink>
            <GlassLink href="https://github.com/arunacharya1603/seo-engineering" target="_blank" rel="noopener noreferrer" analyticsEvent="github_link_click" analyticsLocation="package_overview">
              View on GitHub <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              <span className="sr-only"> (opens in a new tab)</span>
            </GlassLink>
          </div>
        </div>
        <div className="glass-panel min-w-0 rounded-3xl p-6 sm:p-8">
          <LiquidSurface radius={24} />
          <h2 id="package-requirements" className="scroll-mt-32 font-grotesk text-2xl font-semibold">How to install seo-engineering</h2>
          <ul className="mt-5 list-disc space-y-2 pl-5 text-sm leading-7 text-subtle">
            <li>Node.js 22.20 or newer, with npm.</li>
            <li>An AI coding agent, such as Codex, Claude Code or Cursor.</li>
            <li>Access to the project and tools needed for your SEO task.</li>
          </ul>
          <p className="mt-5 border-t border-line pt-5 text-sm leading-7 text-subtle">
            Follow the installer prompts to choose your agent and installation
            scope. Installation alone does not optimize or change your website.
            You must ask your agent to use the skill and review its work.
          </p>
        </div>
      </section>

      <section aria-labelledby="package-audience" className="mt-16 border-y border-line py-10">
        <h2 id="package-audience" className="font-grotesk text-3xl font-semibold">Who it helps</h2>
        <p className="mt-5 max-w-3xl text-base leading-8 text-subtle">
          Developers, founders and small product teams who already work with an
          AI coding agent and want a repeatable way to investigate their website’s
          SEO. If you’re evaluating SEO skills for AI coding agents, this project
          brings product discovery, technical checks and implementation guidance
          into one workflow.
        </p>
      </section>

      <section aria-labelledby="package-capabilities" className="mt-16">
        <h2 id="package-capabilities" className="font-grotesk text-3xl font-semibold">What the skill helps your agent do</h2>
        <dl className="mt-8 grid gap-x-12 gap-y-8 md:grid-cols-2">
          {capabilities.map((capability) => (
            <div key={capability.title} className="border-t border-line pt-5">
              <dt className="text-lg font-semibold">{capability.title}</dt>
              <dd className="mt-3 text-base leading-8 text-subtle">{capability.description}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-8 max-w-3xl">
          <h3 className="text-lg font-semibold">Know what was checked—and what remains uncertain</h3>
          <p className="mt-3 text-base leading-8 text-subtle">
            Get findings that separate verified issues, recommendations,
            intentional choices and checks that could not be completed. See
            which changes were implemented and how they were tested.
          </p>
        </div>
        <p className="mt-8 max-w-3xl text-base leading-8 text-subtle">
          You can inspect the included{" "}
          <a href="https://github.com/arunacharya1603/seo-engineering/blob/main/templates/seo-audit-report-template.md" target="_blank" rel="noopener noreferrer" className="text-brand underline underline-offset-4">
            SEO audit report template<span className="sr-only"> (opens in a new tab)</span>
          </a>{" "}
          and{" "}
          <a href="https://github.com/arunacharya1603/seo-engineering/blob/main/templates/content-brief-template.md" target="_blank" rel="noopener noreferrer" className="text-brand underline underline-offset-4">
            content brief template<span className="sr-only"> (opens in a new tab)</span>
          </a>{" "}
          to see how the workflow organizes evidence, priorities and next steps.
        </p>
      </section>

      <section aria-labelledby="package-usage" className="mt-16">
        <h2 id="package-usage" className="font-grotesk text-3xl font-semibold">How to use the SEO skill with your coding agent</h2>
        <ol className="mt-6 list-decimal space-y-3 pl-5 text-base leading-8 text-subtle">
          <li>Open your website project and run the install command above.</li>
          <li>Choose your coding agent in the installer, then open that agent with access to the project.</li>
          <li>Describe the task and ask the agent to use seo-engineering. For example:</li>
        </ol>
        <blockquote className="glass-panel mt-6 rounded-3xl p-6 text-lg font-medium leading-8 sm:p-8">
          <LiquidSurface radius={24} />
          <p>“Use seo-engineering to understand my product and audience, audit this website, fix the highest-priority SEO issues, and test your changes.”</p>
        </blockquote>
        <p className="mt-6 max-w-3xl text-base leading-8 text-subtle">
          Review the findings, proposed changes and test results. Technical
          validation can show what was checked or corrected; search visibility
          and customer enquiries need to be measured on your actual site over time.
        </p>
      </section>

      <section aria-labelledby="package-example" className="mt-16 border-y border-line py-10">
        <h2 id="package-example" className="font-grotesk text-3xl font-semibold">Example: audit a SaaS website with Codex</h2>
        <p className="mt-5 max-w-3xl text-base leading-8 text-subtle">
          Suppose you are building scheduling software for small clinics and
          want more demo enquiries. Give your agent the product details, intended
          customers, target market and website project, then use the prompt above.
          This is an illustrative workflow you can adapt to your own product.
        </p>
        <ol className="mt-6 max-w-3xl list-decimal space-y-4 pl-5 text-base leading-8 text-subtle">
          <li><strong className="font-semibold text-ink">Establish the audience.</strong> Ask the agent to distinguish clinic owners looking for scheduling software from patients trying to book an appointment. Those searches need different content.</li>
          <li><strong className="font-semibold text-ink">Inspect the relevant pages.</strong> Have it check whether product pages can be crawled and indexed, whether titles explain the offer, and whether internal links help people reach useful details.</li>
          <li><strong className="font-semibold text-ink">Request evidence and a focused plan.</strong> Ask for affected URLs or files, the reason each issue matters, proposed fixes and validation steps. Implement changes only within the scope you give the agent.</li>
        </ol>
        <p className="mt-5 max-w-3xl text-base leading-8 text-subtle">
          The immediate deliverable is an evidence-based audit or a tested set
          of changes. Measure search impressions, relevant visits and demo
          enquiries separately after publishing.
        </p>
      </section>

      <section aria-labelledby="package-questions" className="mt-16">
        <h2 id="package-questions" className="font-grotesk text-3xl font-semibold">Before you start</h2>
        <div className="mt-8 grid gap-x-12 gap-y-8 md:grid-cols-2">
          <div>
            <h3 className="text-lg font-semibold">Is this a standalone SEO audit tool?</h3>
            <p className="mt-3 text-base leading-8 text-subtle">
              It supplies a workflow for your coding agent. The agent performs
              the audit using the project access and tools you provide. The
              package does not automatically crawl or optimize a website when
              you install it.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Can it help with short-tail and long-tail keywords?</h3>
            <p className="mt-3 text-base leading-8 text-subtle">
              It guides keyword and content planning around your audience and
              search intent. You can ask the agent to compare broad topics with
              specific searches, map relevant terms to pages and identify
              research gaps. Search volume and competition estimates need real
              data from the sources available to the agent; the skill does not
              supply a keyword database.
            </p>
          </div>
        </div>
        <p className="mt-8 max-w-3xl text-base leading-8 text-subtle">
          For evidence about the project itself, review its{" "}
          <a href="https://github.com/arunacharya1603/seo-engineering/tree/main/tests" target="_blank" rel="noopener noreferrer" className="text-brand underline underline-offset-4">
            public test cases and evaluation notes<span className="sr-only"> (opens in a new tab)</span>
          </a>.
          {" "}These document installer checks and agent behavior, not measured
          improvements in Google rankings or customer acquisition.
        </p>
      </section>

      <div className="mt-12 flex flex-wrap gap-x-8 gap-y-4 border-t border-line pt-8 text-sm font-semibold text-brand">
        <Link href="/packages" className="inline-flex min-h-11 items-center underline underline-offset-4">Explore all packages</Link>
        <Link href="/resources" className="inline-flex min-h-11 items-center underline underline-offset-4">Website planning resources</Link>
      </div>
    </SeoPageShell>
  );
}
