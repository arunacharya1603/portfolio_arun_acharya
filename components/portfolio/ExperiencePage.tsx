import { Check } from "lucide-react";
import { SeoPageShell } from "@/components/SeoPageShell";
import { experience } from "@/data/portfolio";

export function ExperiencePageContent() {
  return (
    <SeoPageShell
      eyebrow="Experience"
      title="Building products. Taking ownership."
      description="Frontend engineering at Persist Ventures since November 2024, across AI music, creator-brand workflows, and animated product experiences."
    >
      <div className="space-y-10">
        {experience.map((item) => (
          <article
            key={item.product}
            className="grid gap-6 border-b border-line pb-10 last:border-b-0 md:grid-cols-[240px_1fr] lg:gap-12"
          >
            <div>
              <p className="text-sm font-semibold text-brand">{item.period}</p>
              <p className="mt-2 text-sm leading-7 text-subtle">
                {item.company}
                <br />
                {item.location}
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
