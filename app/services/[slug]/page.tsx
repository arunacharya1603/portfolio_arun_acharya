import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowDownRight, ArrowRight, Check, CheckCircle2, Clock3, Mail, ShieldCheck } from "lucide-react";

import { SeoPageShell, seoMutedTextClass } from "@/components/SeoPageShell";
import { ServiceProposalForm } from "@/components/ServiceProposalForm";
import { getServiceProposal } from "@/data/service-proposals";
import { getSeoBlogPost, getSeoServicePage, seoServicePages } from "@/data/seo-content";
import { getWorkProjectBySlug, workProjects } from "@/data/work-projects";
import { siteConfig } from "@/lib/site";
import { breadcrumbJsonLd, createPageMetadata, faqJsonLd, serviceJsonLd as createServiceJsonLd } from "@/lib/seo";

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

  const relatedServices = service.relatedServiceSlugs.map(getSeoServicePage).filter(Boolean);
  const relatedPosts = service.relatedBlogSlugs.map(getSeoBlogPost).filter(Boolean);
  const relatedProjects = service.relatedWorkSlugs?.length
    ? service.relatedWorkSlugs.map(getWorkProjectBySlug).filter(Boolean)
    : workProjects.slice(0, 3);
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
    <SeoPageShell eyebrow={service.heroEyebrow} title={service.heroTitle} description={service.heroDescription} showFooterCta={false}>
      {schemas.map((schema, index) => (
        <script key={`service-schema-${index}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <section className="grid overflow-hidden rounded-[8px] border border-[#f4efe3]/14 bg-[#f4efe3]/[0.045] lg:grid-cols-[1.2fr_0.8fr]">
        <div className="p-6 sm:p-8 lg:p-10">
          <p className="text-sm font-semibold text-[#d8c4a4]">A practical engagement, not a mystery quote</p>
          <h2 className="mt-4 max-w-2xl font-grotesk text-3xl font-semibold leading-tight text-[#f4efe3] sm:text-4xl">{proposal.shortPromise}</h2>
          <p className={`mt-5 max-w-2xl text-sm leading-7 ${seoMutedTextClass}`}>Start with a sensible scope, see the likely investment before a call, and receive a written plan before development begins.</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link href="#proposal" className="inline-flex items-center justify-center gap-2 rounded-[7px] bg-[#f4efe3] px-5 py-3 text-sm font-semibold text-[#0d0c09] transition hover:bg-[#fff8e8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f4efe3]">
              Share your requirements <ArrowDownRight className="h-4 w-4" />
            </Link>
            <Link href="#pricing" className="inline-flex items-center justify-center gap-2 rounded-[7px] border border-[#f4efe3]/16 bg-[#f4efe3]/[0.05] px-5 py-3 text-sm font-semibold text-[#f4efe3] transition hover:bg-[#f4efe3]/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f4efe3]">
              Review pricing <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
        <dl className="grid border-t border-[#f4efe3]/12 bg-[#090806]/55 sm:grid-cols-3 lg:grid-cols-1 lg:border-l lg:border-t-0">
          {[
            ["Typical starting point", `${proposal.startingPriceUSD} / ${proposal.startingPriceINR}`],
            ["Typical delivery", proposal.typicalTimeline],
            ["Best suited for", proposal.idealFor],
          ].map(([label, value]) => (
            <div key={label} className="border-b border-[#f4efe3]/10 p-5 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0 lg:border-b lg:border-r-0 lg:p-6 lg:last:border-b-0">
              <dt className="text-xs font-bold uppercase tracking-[0.14em] text-[#f4efe3]/42">{label}</dt>
              <dd className="mt-2 text-sm font-semibold leading-6 text-[#f4efe3]">{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-16 grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#d8c4a4]">Right fit</p>
          <h2 className="mt-3 font-grotesk text-3xl font-semibold text-[#f4efe3]">Built for a business outcome, not a list of screens.</h2>
        </div>
        <div className="grid gap-px overflow-hidden rounded-[8px] border border-[#f4efe3]/12 bg-[#f4efe3]/12 md:grid-cols-2">
          {service.bestFor.map((item) => (
            <div key={item} className="bg-[#0d0c09] p-5">
              <CheckCircle2 className="h-5 w-5 text-[#d8c4a4]" />
              <p className={`mt-4 text-sm leading-7 ${seoMutedTextClass}`}>{item}</p>
            </div>
          ))}
          <div className="bg-[#0d0c09] p-5">
            <ShieldCheck className="h-5 w-5 text-[#d8c4a4]" />
            <p className={`mt-4 text-sm leading-7 ${seoMutedTextClass}`}>If the project is not a good fit, the recommendation will be a smaller scope, a different specialist, or no build yet.</p>
          </div>
        </div>
      </section>

      <section id="pricing" className="scroll-mt-32 pt-20">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#d8c4a4]">Transparent starting points</p>
          <h2 className="mt-3 font-grotesk text-4xl font-semibold text-[#f4efe3]">Choose the level that matches the risk you are trying to remove.</h2>
          <p className={`mt-4 text-sm leading-7 ${seoMutedTextClass}`}>These are realistic starting prices, not fixed quotes. The final scope depends on content readiness, integrations, states, timeline, and the quality bar required.</p>
        </div>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {proposal.packages.map((item) => (
            <article key={item.name} className={`relative flex min-h-full flex-col rounded-[8px] border p-6 ${item.recommended ? "border-[#d8c4a4]/62 bg-[#d8c4a4]/[0.09]" : "border-[#f4efe3]/12 bg-[#f4efe3]/[0.035]"}`}>
              {item.recommended ? <span className="mb-5 w-fit rounded-[5px] bg-[#d8c4a4] px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[#0d0c09]">Best balance</span> : null}
              <h3 className="font-grotesk text-2xl font-semibold text-[#f4efe3]">{item.name}</h3>
              <p className="mt-4 font-grotesk text-3xl font-semibold text-[#f4efe3]">{item.priceUSD}</p>
              <p className="mt-1 text-sm font-semibold text-[#d8c4a4]">{item.priceINR}</p>
              <p className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-[#f4efe3]/58"><Clock3 className="h-4 w-4" />{item.timeline}</p>
              <p className={`mt-5 text-sm leading-7 ${seoMutedTextClass}`}>{item.summary}</p>
              <ul className="mt-6 space-y-3 border-t border-[#f4efe3]/12 pt-5">
                {item.features.map((feature) => <li key={feature} className="flex gap-3 text-sm leading-6 text-[#f4efe3]/72"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[#d8c4a4]" /><span>{feature}</span></li>)}
              </ul>
              <Link href="#proposal" className={`mt-8 inline-flex items-center justify-center gap-2 rounded-[7px] px-4 py-3 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f4efe3] ${item.recommended ? "bg-[#f4efe3] text-[#0d0c09] hover:bg-[#fff8e8]" : "border border-[#f4efe3]/16 bg-[#f4efe3]/[0.05] text-[#f4efe3] hover:bg-[#f4efe3]/10"}`}>
                Discuss this scope <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>
        <div className="mt-5 grid gap-px overflow-hidden rounded-[8px] border border-[#f4efe3]/12 bg-[#f4efe3]/12 md:grid-cols-3">
          {proposal.engagementNotes.map((note) => <p key={note} className="bg-[#0d0c09] p-4 text-xs leading-6 text-[#f4efe3]/58">{note}</p>)}
        </div>
      </section>

      <section className="mt-20 border-y border-[#f4efe3]/12 py-16">
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#d8c4a4]">How the work moves</p>
            <h2 className="mt-3 font-grotesk text-4xl font-semibold text-[#f4efe3]">Clear decisions at every step.</h2>
            <p className={`mt-4 text-sm leading-7 ${seoMutedTextClass}`}>You always know what is being decided, what is being built, and what is needed from you next.</p>
          </div>
          <div>
            {service.process.map((step, index) => (
              <article key={step} className="grid gap-4 border-b border-[#f4efe3]/12 py-6 first:pt-0 last:border-b-0 last:pb-0 sm:grid-cols-[72px_1fr]">
                <span className="font-grotesk text-2xl font-semibold text-[#d8c4a4]">0{index + 1}</span>
                <div>
                  <h3 className="font-grotesk text-xl font-semibold text-[#f4efe3]">{index === 0 ? "Clarify" : index === 1 ? "Design and build" : "Verify and launch"}</h3>
                  <p className={`mt-2 text-sm leading-7 ${seoMutedTextClass}`}>{step}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-20 grid gap-10 lg:grid-cols-2">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#d8c4a4]">What can be included</p>
          <h2 className="mt-3 font-grotesk text-3xl font-semibold text-[#f4efe3]">The scope is shaped around what moves the project forward.</h2>
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {service.includes.map((item) => <div key={item} className="flex gap-3 border-b border-[#f4efe3]/10 pb-3 text-sm leading-6 text-[#f4efe3]/72"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[#d8c4a4]" /><span>{item}</span></div>)}
          </div>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#d8c4a4]">What this should improve</p>
          <div className="mt-7 space-y-5">
            {service.outcomes.map((outcome, index) => <div key={outcome} className="grid grid-cols-[44px_1fr] gap-4"><span className="font-grotesk text-lg font-semibold text-[#f4efe3]/32">0{index + 1}</span><p className={`text-sm leading-7 ${seoMutedTextClass}`}>{outcome}</p></div>)}
          </div>
        </div>
      </section>

      <section className="mt-20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#d8c4a4]">Relevant work</p><h2 className="mt-3 font-grotesk text-4xl font-semibold text-[#f4efe3]">Proof from shipped product surfaces.</h2></div>
          <Link href="/work" className="inline-flex items-center gap-2 text-sm font-semibold text-[#d8c4a4] transition hover:text-[#f4efe3]">View all work <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {relatedProjects.map((project) => (
            <Link key={project!.slug} href={`/work/${project!.slug}`} className="group overflow-hidden rounded-[8px] border border-[#f4efe3]/12 bg-[#f4efe3]/[0.035] transition hover:border-[#d8c4a4]/48">
              <div className="relative aspect-[16/10] overflow-hidden border-b border-[#f4efe3]/12 bg-[#090806]"><Image src={project!.image} alt={`${project!.name} project preview`} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition duration-500 group-hover:scale-[1.025]" /></div>
              <div className="p-5">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#d8c4a4]">{project!.shortName}</p>
                <h3 className="mt-3 font-grotesk text-xl font-semibold text-[#f4efe3]">{project!.name}</h3>
                <p className={`mt-3 text-sm leading-6 ${seoMutedTextClass}`}>{project!.impact}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#f4efe3]">Read case study <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-20 grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
        <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#d8c4a4]">Common questions</p><h2 className="mt-3 font-grotesk text-3xl font-semibold text-[#f4efe3]">Useful answers before you spend time on a call.</h2></div>
        <div>{service.faqs.map((faq) => <article key={faq.question} className="border-b border-[#f4efe3]/12 py-6 first:pt-0"><h3 className="font-grotesk text-xl font-semibold text-[#f4efe3]">{faq.question}</h3><p className={`mt-3 text-sm leading-7 ${seoMutedTextClass}`}>{faq.answer}</p></article>)}</div>
      </section>

      <section id="proposal" className="scroll-mt-28 pt-20">
        <div className="grid gap-8 rounded-[8px] border border-[#f4efe3]/14 bg-[#f4efe3]/[0.045] p-5 sm:p-7 lg:grid-cols-[0.62fr_1.38fr] lg:p-10">
          <div>
            <div className="lg:sticky lg:top-28">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#d8c4a4]">Project brief</p>
              <h2 className="mt-3 font-grotesk text-3xl font-semibold text-[#f4efe3]">Tell me what success needs to look like.</h2>
              <p className={`mt-4 text-sm leading-7 ${seoMutedTextClass}`}>The form is detailed enough to create a useful first response without forcing you through a sales call.</p>
              <ol className="mt-8 space-y-5">
                {["You share the goal, current stage, timing, and budget range.", "I review the fit, identify unknowns, and suggest the right scope.", "You receive a clear next step before any commitment is expected."].map((step, index) => (
                  <li key={step} className="flex gap-4 text-sm leading-6 text-[#f4efe3]/68"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-[#d8c4a4]/35 text-xs font-bold text-[#d8c4a4]">{index + 1}</span><span>{step}</span></li>
                ))}
              </ol>
              <a href={`mailto:${siteConfig.email}`} className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#d8c4a4] transition hover:text-[#f4efe3]"><Mail className="h-4 w-4" />{siteConfig.email}</a>
            </div>
          </div>
          <div className="border-t border-[#f4efe3]/12 pt-7 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0"><ServiceProposalForm service={service} proposal={proposal} /></div>
        </div>
      </section>

      <section className="mt-16 grid gap-5 border-t border-[#f4efe3]/12 pt-12 md:grid-cols-2">
        <div>
          <h2 className="font-grotesk text-2xl font-semibold text-[#f4efe3]">Related services</h2>
          <div className="mt-5 flex flex-wrap gap-2">{relatedServices.map((related) => <Link key={related!.slug} href={`/services/${related!.slug}`} className="rounded-[6px] border border-[#f4efe3]/12 bg-[#f4efe3]/[0.035] px-4 py-2.5 text-sm font-semibold text-[#f4efe3]/72 transition hover:border-[#d8c4a4]/48 hover:text-[#f4efe3]">{related!.navLabel}</Link>)}</div>
        </div>
        <div>
          <h2 className="font-grotesk text-2xl font-semibold text-[#f4efe3]">Helpful reading</h2>
          <div className="mt-5 grid gap-3">{relatedPosts.map((post) => <Link key={post!.slug} href={`/blog/${post!.slug}`} className="group flex items-center justify-between gap-4 border-b border-[#f4efe3]/10 pb-3 text-sm font-semibold text-[#f4efe3]/72 transition hover:text-[#f4efe3]"><span>{post!.title}</span><ArrowRight className="h-4 w-4 shrink-0 transition group-hover:translate-x-1" /></Link>)}</div>
        </div>
      </section>
    </SeoPageShell>
  );
}
