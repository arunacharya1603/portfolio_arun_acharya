import { LiquidSurface } from "@/components/ui/liquid-surface";
import { SeoPageShell } from "@/components/SeoPageShell";
import { processSteps } from "@/data/portfolio";

export function ProcessPageContent() {
  return (
    <SeoPageShell
      eyebrow="Process"
      title="A clear path from idea to launch."
      description="Good collaboration makes good work. Here’s how we keep the project focused, the decisions clear, and the progress visible."
    >
      <div className="grid gap-8 md:grid-cols-2">
        {processSteps.map((step) => {
          const Icon = step.icon;
          return (
            <article
              key={step.step}
              className="glass-panel rounded-3xl p-7 sm:p-9"
            >
              <LiquidSurface radius={24} />
              <div className="flex items-center justify-between text-brand">
                <Icon
                  aria-hidden="true"
                  strokeWidth={1.5}
                  className="h-7 w-7"
                />
                <span className="text-sm font-semibold">{step.step}</span>
              </div>
              <h2 className="mt-7 text-2xl font-semibold tracking-tight">
                {step.title}
              </h2>
              <p className="mt-4 text-base leading-8 text-subtle">
                {step.copy}
              </p>
            </article>
          );
        })}
      </div>
      <section className="mt-14 rounded-xl bg-brand-soft p-7 sm:p-10">
        <h2 className="text-2xl font-semibold tracking-tight">
          What makes the collaboration work
        </h2>
        <div className="mt-7 grid gap-8 md:grid-cols-3">
          {[
            [
              "Shared direction",
              "A written scope and a clear understanding of the audience before development begins.",
            ],
            [
              "Regular feedback",
              "Visible progress and focused review points, so decisions stay close to the work.",
            ],
            [
              "A considered handover",
              "Responsive checks, deployment readiness, and the context you need to manage what comes next.",
            ],
          ].map(([title, copy]) => (
            <div key={title}>
              <h3 className="text-base font-semibold">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-subtle">{copy}</p>
            </div>
          ))}
        </div>
      </section>
    </SeoPageShell>
  );
}
