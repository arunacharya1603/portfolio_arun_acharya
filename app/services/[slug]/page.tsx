import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { GlassLink } from "@/components/ui/glass-link";
import { LiquidSurface } from "@/components/ui/liquid-surface";
import { notFound } from "next/navigation";
import {
  ArrowDownRight,
  ArrowRight,
  Check,
  CheckCircle2,
  Clock3,
  Mail,
  ShieldCheck,
} from "lucide-react";

import { SeoPageShell, seoMutedTextClass } from "@/components/SeoPageShell";
import { ServiceProposalForm } from "@/components/ServiceProposalForm";
import { getServiceProposal } from "@/data/service-proposals";
import {
  getSeoServicePage,
  seoBlogPosts,
  seoServicePages,
} from "@/data/seo-content";
import { getWorkProjectBySlug } from "@/data/work-projects";
import { siteConfig } from "@/lib/site";
import {
  breadcrumbJsonLd,
  createPageMetadata,
  faqJsonLd,
  serviceJsonLd as createServiceJsonLd,
} from "@/lib/seo";

type ServicePageProps = { params: { slug: string } };

export function generateStaticParams() {
  return seoServicePages.map((service) => ({ slug: service.slug }));
}

export function generateMetadata({ params }: ServicePageProps): Metadata {
  const service = getSeoServicePage(params.slug);
  if (!service) return {};

  return createPageMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
    keywords: [service.primaryIntent, ...service.secondaryIntents],
  });
}

export default function ServiceDetailPage({ params }: ServicePageProps) {
  const service = getSeoServicePage(params.slug);
  const proposal = getServiceProposal(params.slug);
  if (!service || !proposal) notFound();
  const copy = service.detailCopy;

  const relatedServices = service.relatedServiceSlugs
    .map(getSeoServicePage)
    .filter(Boolean);
  const relatedPosts = seoBlogPosts
    .filter(
      (post) =>
        post.relatedServiceSlugs.includes(service.slug) ||
        service.relatedBlogSlugs.includes(post.slug),
    )
    .slice(0, 4);
  const relatedProjects = (service.relatedWorkSlugs ?? [])
    .map(getWorkProjectBySlug)
    .filter(Boolean);
  const relatedReading =
    copy?.relatedReading ??
    relatedPosts.map((post) => ({
      text: post.title,
      href: `/blog/${post.slug}`,
    }));
  const schemas = [
    createServiceJsonLd(service),
    faqJsonLd(service.faqs),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
      { name: service.navLabel, path: `/services/${service.slug}` },
    ]),
  ];

  return (
    <SeoPageShell
      eyebrow={service.heroEyebrow}
      title={service.heroTitle}
      description={service.heroDescription}
      showFooterCta={false}
    >
      {schemas.map((schema, index) => (
        <script
          key={`service-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <section className="glass-panel grid overflow-hidden rounded-3xl lg:grid-cols-[1.2fr_0.8fr]">
        <LiquidSurface />
        <div className="p-6 sm:p-8 lg:p-10">
          <p className="text-sm font-semibold text-brand">
            {copy ? "Your engagement" : "A practical engagement, not a mystery quote"}
          </p>
          <h2 className="mt-4 max-w-2xl font-grotesk text-3xl font-semibold leading-tight text-ink sm:text-4xl">
            {copy?.engagementHeading ?? proposal.shortPromise}
          </h2>
          <p
            className={`mt-5 max-w-2xl text-sm leading-7 ${seoMutedTextClass}`}
          >
            {copy?.engagementDescription ?? "Start with a sensible scope, see the likely investment before a call, and receive a written plan before development begins."}
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <GlassLink href="#proposal" variant="primary">
              {copy?.primaryCta ?? "Share your requirements"}{" "}
              <ArrowDownRight aria-hidden="true" className="h-4 w-4" />
            </GlassLink>
            <GlassLink href="#pricing">
              {copy?.secondaryCta ?? "Review pricing"}{" "}
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </GlassLink>
          </div>
        </div>
        <dl className="grid border-t border-line sm:grid-cols-3 lg:grid-cols-1 lg:border-l lg:border-t-0">
          {[
            [
              "Typical starting point",
              `${proposal.startingPriceUSD} / ${proposal.startingPriceINR}`,
            ],
            ["Typical delivery", copy?.typicalTimeline ?? proposal.typicalTimeline],
            ["Best suited for", copy?.idealFor ?? proposal.idealFor],
          ].map(([label, value]) => (
            <div
              key={label}
              className="border-b border-line p-5 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0 lg:border-b lg:border-r-0 lg:p-6 lg:last:border-b-0"
            >
              <dt className="text-xs font-bold uppercase tracking-[0.14em] text-subtle">
                {label}
              </dt>
              <dd className="mt-2 text-sm font-semibold leading-6 text-ink">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-16 grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
            Right fit
          </p>
          <h2 className="mt-3 font-grotesk text-3xl font-semibold text-ink">
            {copy?.overview.heading ?? "Built for a business outcome, not a list of screens."}
          </h2>
          {copy?.overview.paragraphs.map((paragraph) => (
            <p key={paragraph} className={`mt-4 text-sm leading-7 ${seoMutedTextClass}`}>
              {paragraph}
            </p>
          ))}
          {copy?.overview.link && (
            <Link
              href={copy.overview.link.href}
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand transition hover:text-ink"
            >
              {copy.overview.link.text}
              <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" />
            </Link>
          )}
        </div>
        <div className="glass-panel grid gap-px overflow-hidden rounded-3xl md:grid-cols-2">
          <LiquidSurface />
          {copy && (
            <div className="border-b border-line/60 p-5 md:col-span-2">
              <h3 className="font-grotesk text-xl font-semibold text-ink">
                {copy.fitHeading}
              </h3>
              {copy.fitIntro && (
                <p className={`mt-4 text-sm leading-7 ${seoMutedTextClass}`}>
                  {copy.fitIntro}
                </p>
              )}
            </div>
          )}
          {(copy?.fitItems ?? service.bestFor).map((item) => (
            <div key={item} className="border-b border-line/60 p-5">
              <CheckCircle2 aria-hidden="true" className="h-5 w-5 text-brand" />
              <p className={`mt-4 text-sm leading-7 ${seoMutedTextClass}`}>
                {item}
              </p>
            </div>
          ))}
          {copy?.fitNote && (
            <p className={`p-5 text-sm leading-7 md:col-span-2 ${seoMutedTextClass}`}>
              {copy.fitNote}
            </p>
          )}
          {!copy && (
            <div className="p-5">
              <ShieldCheck aria-hidden="true" className="h-5 w-5 text-brand" />
              <p className={`mt-4 text-sm leading-7 ${seoMutedTextClass}`}>
                If the project is not a good fit, the recommendation will be a
                smaller scope, a different specialist, or no build yet.
              </p>
            </div>
          )}
        </div>
      </section>

      <section id="pricing" className="scroll-mt-32 pt-20">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
            Transparent starting points
          </p>
          <h2 className="mt-3 font-grotesk text-4xl font-semibold text-ink">
            {copy?.pricingHeading ?? "Choose the level that matches the risk you are trying to remove."}
          </h2>
          <p className={`mt-4 text-sm leading-7 ${seoMutedTextClass}`}>
            {copy?.pricingDescription ?? "These are realistic starting prices, not fixed quotes. The final scope depends on content readiness, integrations, states, timeline, and the quality bar required."}
          </p>
        </div>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {proposal.packages.map((item) => (
            <article
              key={item.name}
              className={`glass-panel flex min-h-full flex-col rounded-3xl p-6 ${item.recommended ? "border-brand/30 ring-1 ring-brand/20" : ""}`}
            >
              <LiquidSurface />
              {item.recommended ? (
                <span className="mb-5 w-fit rounded-[5px] bg-brand px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-primary-foreground">
                  Best balance
                </span>
              ) : null}
              <h3 className="font-grotesk text-2xl font-semibold text-ink">
                {item.name}
              </h3>
              <p className="mt-4 font-grotesk text-3xl font-semibold text-ink">
                {item.priceUSD}
              </p>
              <p className="mt-1 text-sm font-semibold text-brand">
                {item.priceINR}
              </p>
              <p className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-subtle">
                <Clock3 aria-hidden="true" className="h-4 w-4" />
                {item.timeline}
              </p>
              <p className={`mt-5 text-sm leading-7 ${seoMutedTextClass}`}>
                {item.summary}
              </p>
              <ul className="mt-6 space-y-3 border-t border-line pt-5">
                {item.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex gap-3 text-sm leading-6 text-subtle"
                  >
                    <Check
                      aria-hidden="true"
                      className="mt-0.5 h-4 w-4 shrink-0 text-brand"
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <GlassLink
                href="#proposal"
                variant={item.recommended ? "primary" : "secondary"}
                className="mt-8"
              >
                Discuss this scope{" "}
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </GlassLink>
            </article>
          ))}
        </div>
        <div className="glass-panel mt-5 grid gap-px overflow-hidden rounded-3xl md:grid-cols-3">
          <LiquidSurface />
          {(copy?.pricingNotes ?? proposal.engagementNotes).map((note) => (
            <p key={note} className="p-6 text-xs leading-6 text-subtle">
              {note}
            </p>
          ))}
        </div>
      </section>

      <section className="mt-20 border-y border-line py-16">
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
              How the work moves
            </p>
            <h2 className="mt-3 font-grotesk text-4xl font-semibold text-ink">
              {copy?.processHeading ?? "Clear decisions at every step."}
            </h2>
            <p className={`mt-4 text-sm leading-7 ${seoMutedTextClass}`}>
              You always know what is being decided, what is being built, and
              what is needed from you next.
            </p>
          </div>
          <div>
            {service.process.map((step, index) => (
              <article
                key={step}
                className="grid gap-4 border-b border-line py-6 first:pt-0 last:border-b-0 last:pb-0 sm:grid-cols-[72px_1fr]"
              >
                <span className="font-grotesk text-2xl font-semibold text-brand">
                  0{index + 1}
                </span>
                <div>
                  <h3 className="font-grotesk text-xl font-semibold text-ink">
                    {index === 0
                      ? "Clarify"
                      : index === 1
                        ? "Design and build"
                        : "Verify and launch"}
                  </h3>
                  <p className={`mt-2 text-sm leading-7 ${seoMutedTextClass}`}>
                    {step}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-20 grid gap-10 lg:grid-cols-2">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
            What can be included
          </p>
          <h2 className="mt-3 font-grotesk text-3xl font-semibold text-ink">
            {copy?.includesHeading ?? "The scope is shaped around what moves the project forward."}
          </h2>
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {service.includes.map((item) => (
              <div
                key={item}
                className="flex gap-3 border-b border-line pb-3 text-sm leading-6 text-subtle"
              >
                <Check
                  aria-hidden="true"
                  className="mt-0.5 h-4 w-4 shrink-0 text-brand"
                />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
            What this should improve
          </p>
          <div className="mt-7 space-y-5">
            {service.outcomes.map((outcome, index) => (
              <div key={outcome} className="grid grid-cols-[44px_1fr] gap-4">
                <span className="font-grotesk text-lg font-semibold text-subtle">
                  0{index + 1}
                </span>
                <p className={`text-sm leading-7 ${seoMutedTextClass}`}>
                  {outcome}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
              Relevant work
            </p>
            <h2 className="mt-3 font-grotesk text-4xl font-semibold text-ink">
              {copy?.workHeading ?? "Project experience and my contribution."}
            </h2>
          </div>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand transition hover:text-ink"
          >
            View all work <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {relatedProjects.map((project) => (
            <Link
              key={project!.slug}
              href={`/work/${project!.slug}`}
              className="glass-panel group overflow-hidden rounded-3xl p-3 transition hover:border-brand/30"
            >
              <LiquidSurface />
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-surface">
                <Image
                  src={project!.image}
                  alt={`${project!.name} project preview`}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.025]"
                />
              </div>
              <div className="p-5">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand">
                  {project!.shortName}
                </p>
                <h3 className="mt-3 font-grotesk text-xl font-semibold text-ink">
                  {project!.name}
                </h3>
                <p className={`mt-3 text-sm leading-6 ${seoMutedTextClass}`}>
                  {copy?.projects[project!.slug]?.description ?? project!.contributionSummary}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-ink">
                  {copy?.projects[project!.slug]?.linkText ?? "Read case study"}{" "}
                  <ArrowRight
                    aria-hidden="true"
                    className="h-4 w-4 transition group-hover:translate-x-1"
                  />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-20 grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
            Common questions
          </p>
          <h2 className="mt-3 font-grotesk text-3xl font-semibold text-ink">
            {copy?.faqHeading ?? "Useful answers before you spend time on a call."}
          </h2>
        </div>
        <div>
          {service.faqs.map((faq) => {
            const [answerBeforeLink, answerAfterLink] = faq.link
              ? faq.answer.split(faq.link.text)
              : [faq.answer];

            return (
              <article
                key={faq.question}
                className="border-b border-line py-6 first:pt-0"
              >
                <h3 className="font-grotesk text-xl font-semibold text-ink">
                  {faq.question}
                </h3>
                <p className={`mt-3 text-sm leading-7 ${seoMutedTextClass}`}>
                  {answerBeforeLink}
                  {faq.link && (
                    <>
                      <Link
                        href={faq.link.href}
                        className="text-brand underline underline-offset-4"
                      >
                        {faq.link.text}
                      </Link>
                      {answerAfterLink}
                    </>
                  )}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section id="proposal" className="scroll-mt-28 pt-20">
        <div className="glass-panel grid gap-8 rounded-3xl p-5 sm:p-7 lg:grid-cols-[0.62fr_1.38fr] lg:p-10">
          <LiquidSurface />
          <div>
            <div className="lg:sticky lg:top-28">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
                Project brief
              </p>
              <h2 className="mt-3 font-grotesk text-3xl font-semibold text-ink">
                {copy?.proposalHeading ?? "Tell me what success needs to look like."}
              </h2>
              <p className={`mt-4 text-sm leading-7 ${seoMutedTextClass}`}>
                {copy?.proposalDescription ?? "The form is detailed enough to create a useful first response without forcing you through a sales call."}
              </p>
              <ol className="mt-8 space-y-5">
                {[
                  "You share the goal, current stage, timing, and budget range.",
                  "I review the fit, identify unknowns, and suggest the right scope.",
                  "You receive a clear next step before any commitment is expected.",
                ].map((step, index) => (
                  <li
                    key={step}
                    className="flex gap-4 text-sm leading-6 text-subtle"
                  >
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-brand/30 text-xs font-bold text-brand">
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
              <a
                href={`mailto:${siteConfig.email}`}
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand transition hover:text-ink"
              >
                <Mail aria-hidden="true" className="h-4 w-4" />
                {siteConfig.email}
              </a>
            </div>
          </div>
          <div className="border-t border-line pt-7 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <ServiceProposalForm service={service} proposal={proposal} submitLabel={copy?.submitLabel} />
          </div>
        </div>
      </section>

      <section className="mt-16 grid gap-5 border-t border-line pt-12 md:grid-cols-2">
        <div>
          <h2 className="font-grotesk text-2xl font-semibold text-ink">
            Related services
          </h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {relatedServices.map((related) => (
              <Link
                key={related!.slug}
                href={`/services/${related!.slug}`}
                className="rounded-[6px] border border-line bg-surface px-4 py-2.5 text-sm font-semibold text-subtle transition hover:border-brand/30 hover:text-ink"
              >
                {related!.navLabel}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h2 className="font-grotesk text-2xl font-semibold text-ink">
            {copy ? "Related reading" : "Helpful reading"}
          </h2>
          <div className="mt-5 grid gap-3">
            {relatedReading.map((reading) => (
              <Link
                key={reading.href}
                href={reading.href}
                className="group flex items-center justify-between gap-4 border-b border-line pb-3 text-sm font-semibold text-subtle transition hover:text-ink"
              >
                <span>{reading.text}</span>
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 transition group-hover:translate-x-1"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </SeoPageShell>
  );
}
