import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronRight } from "lucide-react";
import { SeoPageShell } from "@/components/SeoPageShell";
import { GlassLink } from "@/components/ui/glass-link";
import { textLinkStyles } from "@/components/ui/control-styles";
import { getWorkProjectBySlug, workProjects, type WorkProject } from "@/data/work-projects";
import type { ProjectCaseStudy } from "@/data/case-studies";
import { getSeoServicePage, seoBlogPosts } from "@/data/seo-content";
import { ProjectCard } from "./ProjectCard";
import { CaseStudyContents } from "./CaseStudyContents";

export function WorkPageContent() {
  return (
    <SeoPageShell
      eyebrow="Selected work"
      title="Real projects. Thoughtful execution."
      description="Websites, product interfaces, and full-stack builds. Explore the brief, my contribution, and the decisions behind each project."
    >
      <div className="space-y-14 sm:space-y-20 lg:space-y-28">
        {workProjects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} headingAs="h2" imageSide={index % 2 === 0 ? "left" : "right"} />
        ))}
      </div>
    </SeoPageShell>
  );
}

const bodyText = "text-base leading-8 text-subtle";

function StorySection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="scroll-mt-28 border-t border-line pt-8 sm:pt-10">
      <h2 id={`${id}-heading`} className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
      <div className="mt-6 space-y-6">{children}</div>
    </section>
  );
}

function Points({ items }: { items: string[] }) {
  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-base leading-8 text-subtle">
          <Check aria-hidden="true" className="mt-1.5 h-5 w-5 shrink-0 text-brand" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function ImplementationFlow({ flow }: { flow: NonNullable<ProjectCaseStudy["flow"]> }) {
  return (
    <figure className="rounded-xl bg-surface/80 p-5 sm:p-7">
      <h3 className="text-lg font-semibold tracking-tight">{flow.title}</h3>
      <ol className="mt-6 grid gap-8 xl:grid-cols-4 xl:gap-6">
        {flow.steps.map((step, index) => (
          <li key={step.title} className="relative min-w-0">
            <span aria-hidden="true" className="text-xs font-bold tabular-nums text-brand">{String(index + 1).padStart(2, "0")}</span>
            <p className="mt-2 text-sm font-semibold leading-6">{step.title}</p>
            <p className="mt-2 text-sm leading-6 text-subtle">{step.detail}</p>
            {index < flow.steps.length - 1 && <>
              <ArrowDown aria-hidden="true" className="absolute -bottom-6 left-0 h-4 w-4 text-brand xl:hidden" />
              <ArrowRight aria-hidden="true" className="absolute -right-5 top-0 hidden h-4 w-4 text-brand xl:block" />
            </>}
          </li>
        ))}
      </ol>
      <figcaption className="mt-6 border-t border-line pt-4 text-xs leading-6 text-subtle">{flow.caption}</figcaption>
    </figure>
  );
}

export function WorkProjectPageContent({ project }: { project: WorkProject }) {
  const story = project.caseStudy;
  const related = project.relatedWorkSlugs
    .filter((slug) => slug !== project.slug)
    .map(getWorkProjectBySlug)
    .filter((item): item is WorkProject => Boolean(item))
    .slice(0, 2);
  const services = project.relatedServiceSlugs.map(getSeoServicePage).filter(Boolean);
  const guides = seoBlogPosts.filter((post) => post.relatedWorkSlugs?.includes(project.slug)).slice(0, 2);
  const projectLink = project.externalUrl && (
    <GlassLink href={project.externalUrl} target="_blank" rel="noopener noreferrer" variant="primary">
      {project.status.includes("Demo") ? "View interface demo" : "Visit project website"}
      <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
    </GlassLink>
  );

  return (
    <SeoPageShell
      eyebrow={`${project.status.includes("Demo") ? "Demo case study" : "Case study"} · ${story.category}`}
      title={story.headline}
      description={story.summary}
      breadcrumbs={
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs leading-6 text-subtle sm:text-sm">
            <li><Link href="/" className="hover:text-brand">Home</Link></li>
            <li aria-hidden="true"><ChevronRight className="h-3 w-3" /></li>
            <li><Link href="/work" className="hover:text-brand">Work</Link></li>
            <li aria-hidden="true"><ChevronRight className="h-3 w-3" /></li>
            <li><span aria-current="page" className="text-ink">{project.shortName}</span></li>
          </ol>
        </nav>
      }
      heroContent={
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.9fr)_minmax(0,1fr)] lg:gap-10">
          <figure className="min-w-0">
            <Image src={project.image} alt={story.preview.alt} width={project.imageSize.width} height={project.imageSize.height}
              priority sizes="(min-width: 1400px) 825px, (min-width: 1024px) 62vw, 94vw"
              className="h-auto w-full rounded-lg" />
            <figcaption className="mt-3 max-w-3xl text-xs leading-6 text-subtle">{story.preview.caption}</figcaption>
          </figure>
          <div className="min-w-0 lg:border-l lg:border-line lg:pl-8">
            <dl className="grid grid-cols-2 gap-x-5 gap-y-6">
              <div><dt className="text-xs text-subtle">My role</dt><dd className="mt-2 text-sm font-semibold leading-6">{project.role}</dd></div>
              <div><dt className="text-xs text-subtle">Project status</dt><dd className="mt-2 text-sm font-semibold leading-6">{project.status}</dd></div>
              <div className="col-span-2"><dt className="text-xs text-subtle">Technology</dt><dd className="mt-2 text-sm font-medium leading-7">{project.stack.join(" / ")}</dd></div>
            </dl>
            <p className="mt-6 text-sm leading-7 text-subtle">A project story by <Link href="/about" className="font-semibold text-ink underline decoration-line underline-offset-4 hover:text-brand">Arun Acharya</Link>.</p>
            {projectLink && <div className="mt-6">{projectLink}</div>}
            <a href="#contribution" className="mt-5 inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-brand">Explore the implementation <ArrowDown aria-hidden="true" className="h-4 w-4" /></a>
          </div>
        </div>
      }
    >
      <div className="grid items-start gap-10 lg:grid-cols-[210px_minmax(0,1fr)] lg:gap-14 xl:gap-20">
        <CaseStudyContents key={project.slug} />
        <article id="case-study" aria-label={`${project.shortName} case study`} className="min-w-0 max-w-3xl scroll-mt-28 space-y-14 sm:space-y-20">
          <StorySection id="contribution" title="The brief and my contribution">
            <p className={bodyText}>{project.problem}</p>
            <div className="border-l-2 border-brand pl-5 sm:pl-6">
              <h3 className="text-base font-semibold">What I worked on</h3>
              <p className={`mt-3 ${bodyText}`}>{project.contributionSummary}</p>
            </div>
          </StorySection>
          <StorySection id="goals" title="Goals, constraints, and evaluation">
            <Points items={story.goals} />
            <div><h3 className="text-lg font-semibold">The constraints</h3><p className={`mt-3 ${bodyText}`}>{story.constraints}</p></div>
            <div><h3 className="text-lg font-semibold">How the work is assessed</h3><p className={`mt-3 ${bodyText}`}>{story.evaluation}</p></div>
          </StorySection>
          <StorySection id="architecture" title="How the implementation works">
            {story.architecture.map((part) => (
              <div key={part.title}><h3 className="text-lg font-semibold tracking-tight">{part.title}</h3><p className={`mt-3 ${bodyText}`}>{part.body}</p></div>
            ))}
            {story.flow && <ImplementationFlow flow={story.flow} />}
          </StorySection>
          <StorySection id="decisions" title="Technical decisions and trade-offs">
            <div className="space-y-5">
              {story.decisions.map((decision, index) => (
                <div key={decision.title} className="rounded-xl border border-line bg-surface/60 p-5 sm:p-7">
                  <p className="text-xs font-semibold uppercase tracking-widest text-brand">Decision {String(index + 1).padStart(2, "0")}</p>
                  <h3 className="mt-3 text-xl font-semibold tracking-tight">{decision.title}</h3>
                  <p className={`mt-4 ${bodyText}`}>{decision.choice}</p>
                  <p className="mt-5 border-t border-line pt-4 text-sm leading-7 text-subtle"><span className="font-semibold text-ink">Trade-off: </span>{decision.tradeoff}</p>
                </div>
              ))}
            </div>
          </StorySection>
          <StorySection id="challenges" title="Challenges and solutions">
            {story.challenges.map((challenge) => (
              <div key={challenge.title} className="border-b border-line pb-7 last:border-0 last:pb-0">
                <h3 className="text-xl font-semibold tracking-tight">{challenge.title}</h3>
                <p className={`mt-4 ${bodyText}`}>{challenge.problem}</p>
                <div className="mt-5 border-l-2 border-brand/40 pl-5"><p className="text-xs font-bold uppercase tracking-widest text-brand">The approach</p><p className={`mt-2 ${bodyText}`}>{challenge.solution}</p></div>
              </div>
            ))}
          </StorySection>
          <StorySection id="outcomes" title="What the work delivered">
            <Points items={story.outcomes} />
          </StorySection>
          <StorySection id="reflection" title="Lessons and next steps">
            <p className={bodyText}>{story.reflection}</p>
            <div><h3 className="mb-4 text-lg font-semibold">What I would improve next</h3><Points items={story.nextSteps} /></div>
          </StorySection>
          <StorySection id="questions" title={`Questions about ${project.shortName}`}>
            {story.faqs.map((faq) => (
              <div key={faq.question}><h3 className="text-lg font-semibold">{faq.question}</h3><p className={`mt-3 ${bodyText}`}>{faq.answer}</p></div>
            ))}
          </StorySection>
          <StorySection id="evidence" title="Evidence and further reading">
            <p className={bodyText}>{story.evidence}</p>
            {project.evidenceNote && <p className="text-sm leading-7 text-subtle">{project.evidenceNote}</p>}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
              {projectLink}
              <Link href="/work" className={textLinkStyles()}>Browse all projects <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
            </div>
            {services.length > 0 && <div><h3 className="text-base font-semibold">For a similar project</h3><ul className="mt-3 space-y-2">{services.map((service) => (
              <li key={service!.slug}><Link href={`/services/${service!.slug}`} className="inline-block py-1 text-sm leading-6 text-brand underline underline-offset-4">{service!.navLabel}</Link></li>
            ))}</ul></div>}
            {guides.length > 0 && <div><h3 className="text-base font-semibold">Related implementation guides</h3><ul className="mt-3 space-y-2">{guides.map((guide) => (
              <li key={guide.slug}><Link href={`/blog/${guide.slug}`} className="inline-block py-1 text-sm leading-6 text-brand underline underline-offset-4">{guide.title}</Link></li>
            ))}</ul></div>}
          </StorySection>
        </article>
      </div>
      <section aria-labelledby="related-projects-heading" className="mt-16 border-t border-line pt-10 sm:mt-24 sm:pt-14">
        <p className="text-xs font-bold uppercase tracking-widest text-brand">Continue exploring</p>
        <h2 id="related-projects-heading" className="mt-3 text-3xl font-semibold tracking-tight">Related project stories</h2>
        <div className="mt-8 grid gap-10 md:grid-cols-2">
          {related.map((item) => <ProjectCard key={item.slug} project={item} />)}
        </div>
      </section>
    </SeoPageShell>
  );
}
