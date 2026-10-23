import { Check } from "lucide-react";
import Link from "next/link";
import { SeoPageShell } from "@/components/SeoPageShell";
import { experience } from "@/data/portfolio";

export function ExperiencePageContent() {
  return (
    <SeoPageShell
      eyebrow="Experience"
      title="Building products. Taking ownership."
      description="Frontend engineering at Persist Ventures since November 2024, alongside freelance and personal work across music, immersive products, analytics, education, and healthcare interfaces."
    >
      <div className="space-y-10">
        {experience.map((item) => (
          <article
            key={item.product}
            className="grid gap-6 border-b border-line pb-10 last:border-b-0 md:grid-cols-[240px_1fr] lg:gap-12"
          >
            <div>
              {item.period && (
                <p className="text-sm font-semibold text-brand">{item.period}</p>
              )}
              <p className="mt-2 text-sm leading-7 text-subtle">
                {item.company}
                {item.location && (
                  <>
                    <br />
                    {item.location}
                  </>
                )}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-subtle">{item.role}</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight">
                {item.product}
              </h2>
              <p className="mt-2 text-sm text-subtle">{item.context}</p>
              <p className="mt-6 max-w-3xl text-base leading-8 text-subtle">
                {item.summary}
              </p>
              <ul className="mt-6 space-y-4">
                {item.highlights.map((point) => (
                  <li key={point} className="flex gap-3 text-sm leading-7">
                    <Check
                      aria-hidden="true"
                      className="mt-1 h-4 w-4 shrink-0 text-brand"
                    />
                    {point}
                  </li>
                ))}
              </ul>
              {item.workSlug && (
                <Link href={`/work/${item.workSlug}`} className="mt-5 inline-flex text-sm font-semibold text-brand underline underline-offset-4">
                  Read the {item.product} case study
                </Link>
              )}
              {item.externalUrl && (
                <a href={item.externalUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex text-sm font-semibold text-brand underline underline-offset-4">
                  Visit {item.product} website
                </a>
              )}
              <div className="mt-6 flex flex-wrap gap-2">
                {item.stack.map((name) => (
                  <span
                    key={name}
                    className="rounded-md border border-line bg-surface px-3 py-1.5 text-xs font-medium text-subtle"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </SeoPageShell>
  );
}
