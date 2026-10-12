"use client";

import { LiquidSurface } from "@/components/ui/liquid-surface";
import Link from "next/link";
import { useState } from "react";
import { ProjectInquiryForm } from "@/components/ProjectInquiryForm";
import { inputClass } from "@/components/ui/control-styles";
import { Button } from "@/components/ui/button";
import { GlassLink } from "@/components/ui/glass-link";
import type { ServiceProposal } from "@/data/service-proposals";

type PlannerService = { name: string; proposal: ServiceProposal };

export function WebsiteCostPlanner({
  services,
}: {
  services: PlannerService[];
}) {
  const [serviceSlug, setServiceSlug] = useState(services[0].proposal.slug);
  const [packageIndex, setPackageIndex] = useState(0);
  const [currency, setCurrency] = useState("INR");
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const service = services.find((item) => item.proposal.slug === serviceSlug)!;
  const selected = service.proposal.packages[packageIndex];
  const price =
    selected.priceUSD === "Custom"
      ? "Custom quote"
      : currency === "INR"
        ? selected.priceINR
        : `USD ${selected.priceUSD.replace("$", "")}`;
  const brief = `${service.name}: ${selected.name}\nStarting budget: ${price}\nIndicative delivery: ${selected.timeline}\nIncluded scope:\n${selected.features.map((feature) => `- ${feature}`).join("\n")}\n\nTo confirm: business goal, content readiness, integrations, review rounds, deadline, and ongoing costs.\nFinal price and timeline require an agreed written scope.`;

  async function copyBrief() {
    try {
      await navigator.clipboard.writeText(brief);
      setCopied(true);
      setCopyError(false);
    } catch {
      setCopyError(true);
    }
  }

  return (
    <div className="space-y-12">
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="space-y-6">
          <h2 className="font-grotesk text-3xl font-semibold">
            Choose your starting scope
          </h2>
          <label className="block text-sm font-semibold">
            What are you planning?
            <select
              value={serviceSlug}
              onChange={(event) => {
                setServiceSlug(event.target.value);
                setPackageIndex(0);
                setCopied(false);
              }}
              className={inputClass}
            >
              {services.map((item) => (
                <option key={item.proposal.slug} value={item.proposal.slug}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm font-semibold">
            Display prices in
            <select
              value={currency}
              onChange={(event) => {
                setCurrency(event.target.value);
                setCopied(false);
              }}
              className={inputClass}
            >
              <option value="INR">INR: Indian rupees</option>
              <option value="USD">USD: US dollars</option>
            </select>
          </label>
          <fieldset>
            <legend className="mb-3 text-sm font-semibold">
              How much scope do you need?
            </legend>
            <div className="space-y-3">
              {service.proposal.packages.map((pkg, index) => (
                <label
                  key={pkg.name}
                  className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 focus-within:ring-2 focus-within:ring-brand ${index === packageIndex ? "border-brand bg-brand-soft" : "border-line"}`}
                >
                  <input
                    className="mt-1 h-4 w-4 accent-brand"
                    type="radio"
                    name="scope"
                    value={index}
                    checked={index === packageIndex}
                    onChange={() => {
                      setPackageIndex(index);
                      setCopied(false);
                    }}
                  />
                  <span>
                    <span className="block font-semibold">{pkg.name}</span>
                    <span className="mt-1 block text-sm leading-6 text-subtle">
                      {pkg.summary}
                    </span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>
        <section
          className="glass-panel rounded-2xl border-brand/30 p-6 sm:p-8"
          aria-label="Your project scope"
        >
          <LiquidSurface radius={16} />
          <div aria-live="polite" aria-atomic="true">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
              Published starting price
            </p>
            <p className="mt-4 font-grotesk text-4xl font-semibold sm:text-5xl">
              {price}
            </p>
            <h2 className="mt-4 text-xl font-semibold">{selected.name}</h2>
            <p className="mt-2 text-sm text-subtle">
              Indicative delivery: {selected.timeline}, after scope and inputs
              are ready.
            </p>
          </div>
          <ul className="mt-6 space-y-3 border-t border-line pt-6 text-sm leading-6">
            {selected.features.map((feature) => (
              <li key={feature}>✓ {feature}</li>
            ))}
          </ul>
          <p className="mt-6 text-sm leading-7 text-subtle">
            These are Arun’s existing package prices, not a market average or a
            binding quote. INR and USD are published price options, not a live
            currency conversion. Content production, hosting, paid assets and
            third-party subscriptions are separate; taxes and payment terms are
            confirmed in the proposal.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <GlassLink href="#planner-inquiry" variant="primary">
              Discuss this scope
            </GlassLink>
            <Button onClick={copyBrief} type="button">
              {copied ? "Brief copied" : "Copy scope brief"}
            </Button>
          </div>
          <p role="status" className="mt-3 text-sm text-brand">
            {copied
              ? "Copied. Add your goal and deadline before sharing it."
              : copyError
                ? "Copy is unavailable. Select the brief below to copy it manually."
                : ""}
          </p>
          <details className="mt-3 text-sm">
            <summary className="cursor-pointer py-2 text-brand">
              Read the scope brief
            </summary>
            <pre className="mt-2 whitespace-pre-wrap font-sans leading-7">
              {brief}
            </pre>
          </details>
          <Link
            className="mt-5 inline-block text-sm text-brand underline underline-offset-4"
            href={`/services/${serviceSlug}`}
          >
            Explore {service.name.toLowerCase()} and related work
          </Link>
        </section>
      </div>
      <section
        id="planner-inquiry"
        className="scroll-mt-28 border-t border-line pt-10"
      >
        <p className="mb-6 text-sm leading-7 text-brand">
          Your inquiry will include: {service.name} · {selected.name} · {price}.
        </p>
        <ProjectInquiryForm
          source="website-cost-planner"
          context={{
            service: service.name,
            package: selected.name,
            budget: price,
            timeline: selected.timeline,
            scope: selected.features.join("; "),
          }}
        />
      </section>
    </div>
  );
}
