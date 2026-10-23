import { GlassLink } from "@/components/ui/glass-link";
import { LiquidSurface } from "@/components/ui/liquid-surface";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { SeoPageShell } from "@/components/SeoPageShell";
import { textLinkStyles } from "@/components/ui/control-styles";
import { getWorkProjectBySlug, workProjects, type WorkProject } from "@/data/work-projects";
import { getSeoServicePage, seoBlogPosts } from "@/data/seo-content";
import { cn } from "@/lib/utils";
import { ProjectCard } from "./ProjectCard";

export function WorkPageContent() {
  return (
    <SeoPageShell
      eyebrow="Selected work"
      title="Real projects. Thoughtful execution."
      description="Websites, product interfaces, and full-stack builds. Explore the brief, my contribution, and the decisions behind each project."
    >
      <div className="grid gap-x-8 gap-y-14 md:grid-cols-2">
        {workProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} headingAs="h2" />
        ))}
      </div>
    </SeoPageShell>
  );
}

function DeliveryList({ title, items }: { title: string; items: string[] }) {
  if (!items.length) return null;

  return (
    <section className="min-w-0">
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      <ul className="mt-6 space-y-5">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-7 text-subtle">
            <Check
              aria-hidden="true"
              className="mt-1 h-5 w-5 shrink-0 text-brand"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function WorkProjectPageContent({ project }: { project: WorkProject }) {
  const related = project.relatedWorkSlugs
    .filter((slug) => slug !== project.slug)
    .map(getWorkProjectBySlug)
    .filter((item): item is WorkProject => Boolean(item))
    .slice(0, 2);
  const relatedServices = project.relatedServiceSlugs.map(getSeoServicePage).filter(Boolean);
  const relatedGuides = seoBlogPosts
    .filter((post) => post.relatedWorkSlugs?.includes(project.slug))
    .slice(0, 2);
  return (
    <SeoPageShell
      eyebrow={project.challenges.length ? "Case study" : "Project overview"}
      title={project.shortName}
      description={project.description}
    >
      <div className="flex flex-wrap items-center justify-between gap-5">
        <Link href="/work" className={textLinkStyles()}>
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          Back to work
        </Link>
        {project.externalUrl && (
          <GlassLink
            href={project.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant={"primary"}
          >
            {project.status.includes("Demo") ? "View interface demo" : "View project website"}
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </GlassLink>
        )}
      </div>
      <div className="glass-panel my-8 rounded-3xl p-6 sm:p-8">
        <LiquidSurface radius={24} />
        <dl className="grid gap-6 sm:auto-cols-fr sm:grid-flow-col">
          {[
            ["My role", project.role],
            ["Timeline", project.timeline],
            ["Status", project.status],
          ]
            .filter(([, value]) => Boolean(value))
            .map(([label, value]) => (
              <div key={label}>
                <dt className="text-xs font-semibold text-subtle">{label}</dt>
                <dd className="mt-2 text-sm font-semibold leading-6">{value}</dd>
              </div>
            ))}
        </dl>
      </div>
      {project.contributionSummary && (
        <section aria-labelledby="contribution-heading" className="mb-10 max-w-3xl">
          <h2 id="contribution-heading" className="text-xl font-semibold tracking-tight">
            What did I build for {project.shortName}?
          </h2>
          <p className="mt-4 text-base leading-8 text-subtle">{project.contributionSummary}</p>
          {project.evidenceNote && (
            <p className="mt-4 text-sm leading-7 text-subtle">
              <span className="font-semibold text-ink">Evidence and scope: </span>
              {project.evidenceNote}
            </p>
          )}
        </section>
      )}
      <figure>
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-line bg-surface sm:aspect-video">
          <Image
            src={project.image}
            alt={`${project.name} preview`}
            fill
            priority
            sizes="(min-width: 1400px) 1300px, 95vw"
            className={
              project.imageFit === "contain" ? "object-contain" : "object-cover"
            }
          />
        </div>
        <figcaption className="mt-5 max-w-3xl text-sm leading-7 text-subtle">
          {project.impact}
        </figcaption>
      </figure>
      <section
        id="case-study"
        className="mt-16 grid gap-10 border-t border-line pt-12 lg:grid-cols-[0.7fr_1.3fr]"
      >
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">The brief</h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <span
                key={item}
                className="rounded-md border border-line bg-surface px-3 py-1.5 text-xs font-medium text-subtle"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
        <div className="space-y-6 text-base leading-8 text-subtle">
          <p>{project.problem}</p>
          <p>{project.overview}</p>
          {relatedServices.map((service) => (
            <p key={service!.slug}>
              For similar work, explore{" "}
              <Link href={`/services/${service!.slug}`} className="text-brand underline underline-offset-4">
                {service!.navLabel}
              </Link>.
            </p>
          ))}
          {relatedGuides.map((post) => (
            <p key={post.slug}>
              Planning a similar build? Read{" "}
              <Link href={`/blog/${post.slug}`} className="text-brand underline underline-offset-4">
                {post.title}
              </Link>.
            </p>
          ))}
        </div>
      </section>
      <div
        className={cn(
          "glass-panel mt-14 grid gap-12 rounded-3xl p-6 sm:p-10",
          project.howIDid.length > 0 && "lg:grid-cols-2",
        )}
      >
        <LiquidSurface radius={24} />
        <DeliveryList title="What I delivered" items={project.whatIDid} />
        <DeliveryList title="How it was built" items={project.howIDid} />
      </div>
      {project.challenges.length > 0 && (
        <section className="mt-16">
          <h2 className="text-3xl font-semibold tracking-tight">
            Challenges & decisions
          </h2>
          <div className="mt-7 grid gap-6 lg:grid-cols-3">
            {project.challenges.map((item) => (
              <article
                key={item.title}
                className="border-t-2 border-brand/30 pt-6"
              >
                <h3 className="text-xl font-semibold tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-subtle">
                  {item.challenge}
                </p>
                <p className="mt-4 text-sm leading-7">{item.tackle}</p>
              </article>
            ))}
          </div>
        </section>
      )}
      <div className="mt-16 grid gap-12 border-y border-line py-12 lg:grid-cols-2">
        <DeliveryList title="Product features" items={project.features} />
        <DeliveryList title="Outcomes" items={project.outcomes} />
      </div>
      <section className="mt-16">
        <h2 className="text-3xl font-semibold tracking-tight">
          More of my work
        </h2>
        <div className="mt-8 grid gap-10 md:grid-cols-2">
          {related.map((item) => (
            <ProjectCard key={item.slug} project={item} />
          ))}
        </div>
      </section>
    </SeoPageShell>
  );
}
