import { GlassLink } from "@/components/ui/glass-link";
import { LiquidSurface } from "@/components/ui/liquid-surface";
import Link from "next/link";
import { ArrowRight, Check, Clock3 } from "lucide-react";
import { SeoPageShell } from "@/components/SeoPageShell";
import { textLinkStyles } from "@/components/ui/control-styles";
import { services } from "@/data/portfolio";
import { servicePackages } from "@/data/seo";
import { seoServicePages } from "@/data/seo-content";
import { cn } from "@/lib/utils";

export function ServicesPageContent() {
  return (
    <SeoPageShell
      eyebrow="Services"
      title="The right expertise for your next step."
      description="A new website, a clearer interface, or a product ready to launch. Every engagement starts with your goals and a practical scope."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <article
              key={service.slug}
              className="glass-panel flex flex-col rounded-3xl p-7 sm:p-9"
            >
              <LiquidSurface radius={24} />
              <Icon
                aria-hidden="true"
                strokeWidth={1.5}
                className="h-7 w-7 text-brand"
              />
              <h2 className="mt-6 text-2xl font-semibold tracking-tight">
                {service.title}
              </h2>
              <p className="mt-4 text-base leading-8 text-subtle">
                {service.deliver}
              </p>
              <dl className="mt-6 space-y-5 border-t border-line pt-6">
                <div>
                  <dt className="text-sm font-semibold">A good fit for</dt>
                  <dd className="mt-2 text-sm leading-7 text-subtle">
                    {service.for}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-semibold">
                    What we’re working toward
                  </dt>
                  <dd className="mt-2 text-sm leading-7 text-subtle">
                    {service.outcome}
                  </dd>
                </div>
              </dl>
              <Link
                href={`/services/${service.slug}`}
                className={textLinkStyles("mt-auto justify-start pt-7")}
              >
                Explore {service.title}
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </article>
          );
        })}
      </div>
      <nav aria-label="Specialist services" className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
        {seoServicePages
          .filter((service) => !services.some((item) => item.slug === service.slug))
          .map((service) => (
            <Link key={service.slug} href={`/services/${service.slug}`} className={textLinkStyles()}>
              {service.navLabel}
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          ))}
      </nav>
    </SeoPageShell>
  );
}

export function PricingPageContent() {
  return (
    <SeoPageShell
      eyebrow="Pricing"
      title="Clear starting points. A scope that fits."
      description="Plan with transparent package prices. Your final proposal reflects the work, integrations, content, and timeline your project needs."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {servicePackages.map((pkg, index) => (
          <article
            key={pkg.slug}
            className={cn(
              "glass-panel flex flex-col rounded-3xl p-7",
              index === 1 && "border-brand/40 ring-1 ring-brand/20",
            )}
          >
            <LiquidSurface radius={24} />
            <h2 className="text-xl font-semibold tracking-tight">{pkg.name}</h2>
            <p className="mt-5 min-h-14 text-sm leading-7 text-subtle">
              {pkg.bestFor}
            </p>
            <p className="mt-8 text-xs font-semibold text-subtle">
              Starting at
            </p>
            <p className="mt-2 text-4xl font-semibold tracking-tight">
              ${pkg.startingPriceUSD.toLocaleString("en-US")}
              <span className="ml-2 text-sm font-medium text-subtle">USD</span>
            </p>
            <p className="mt-2 text-sm text-subtle">
              ₹{pkg.startingPriceINR.toLocaleString("en-IN")} INR
            </p>
            <p className="mt-6 flex items-start gap-2 text-sm leading-6 text-subtle">
              <Clock3 aria-hidden="true" className="mt-1 h-4 w-4 shrink-0" />
              {pkg.delivery}
            </p>
            <ul className="my-7 space-y-4 border-t border-line pt-7">
              {pkg.features.map((feature) => (
                <li key={feature} className="flex gap-3 text-sm leading-6">
                  <Check
                    aria-hidden="true"
                    className="mt-0.5 h-4 w-4 shrink-0 text-brand"
                  />
                  {feature}
                </li>
              ))}
            </ul>
            <GlassLink
              href={`/services/${pkg.slug}#pricing`}
              variant={index === 1 ? "primary" : "secondary"}
              className={"mt-auto"}
            >
              View {pkg.name} scope
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </GlassLink>
          </article>
        ))}
      </div>
      <div className="mt-10 flex flex-col justify-between gap-5 rounded-xl border border-line p-6 sm:flex-row sm:items-center sm:p-8">
        <div>
          <h2 className="text-xl font-semibold">
            Still working out the scope?
          </h2>
          <p className="mt-2 text-sm leading-7 text-subtle">
            Compare packages and prepare a brief with the website cost planner.
          </p>
        </div>
        <GlassLink
          href="/tools/website-cost-planner"
          variant={"secondary"}
          className={"shrink-0"}
        >
          Open the planner
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </GlassLink>
      </div>
    </SeoPageShell>
  );
}
