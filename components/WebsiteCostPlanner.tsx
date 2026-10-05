"use client";

import Link from "next/link";
import { useState } from "react";
import { ProjectInquiryForm } from "@/components/ProjectInquiryForm";
import type { ServiceProposal } from "@/data/service-proposals";

type PlannerService = { name: string; proposal: ServiceProposal };

export function WebsiteCostPlanner({ services }: { services: PlannerService[] }) {
  const [serviceSlug, setServiceSlug] = useState(services[0].proposal.slug);
  const [packageIndex, setPackageIndex] = useState(0);
  const [currency, setCurrency] = useState("INR");
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const service = services.find((item) => item.proposal.slug === serviceSlug)!;
  const selected = service.proposal.packages[packageIndex];
  const price = selected.priceUSD === "Custom" ? "Custom quote" : currency === "INR" ? selected.priceINR : `USD ${selected.priceUSD.replace("$", "")}`;
  const brief = `${service.name}: ${selected.name}\nStarting budget: ${price}\nIndicative delivery: ${selected.timeline}\nIncluded scope:\n${selected.features.map((feature) => `- ${feature}`).join("\n")}\n\nTo confirm: business goal, content readiness, integrations, review rounds, deadline, and ongoing costs.\nFinal price and timeline require an agreed written scope.`;

  async function copyBrief() {
    try {
      await navigator.clipboard.writeText(brief);
      setCopied(true);
      setCopyError(false);
    } catch { setCopyError(true); }
  }

  return (
    <div className="space-y-12">
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="space-y-6">
          <h2 className="font-grotesk text-3xl font-semibold">Choose your starting scope</h2>
          <label className="block text-sm font-semibold">What are you planning?
            <select value={serviceSlug} onChange={(event) => { setServiceSlug(event.target.value); setPackageIndex(0); setCopied(false); }} className="mt-2 w-full rounded-lg border border-[#f4efe3]/25 bg-[#171510] p-3 text-base focus-visible:outline-[#d8c4a4]">
              {services.map((item) => <option key={item.proposal.slug} value={item.proposal.slug}>{item.name}</option>)}
            </select>
          </label>
          <label className="block text-sm font-semibold">Display prices in
            <select value={currency} onChange={(event) => { setCurrency(event.target.value); setCopied(false); }} className="mt-2 w-full rounded-lg border border-[#f4efe3]/25 bg-[#171510] p-3 text-base focus-visible:outline-[#d8c4a4]">
              <option value="INR">INR: Indian rupees</option><option value="USD">USD: US dollars</option>
            </select>
          </label>
          <fieldset>
            <legend className="mb-3 text-sm font-semibold">How much scope do you need?</legend>
            <div className="space-y-3">
              {service.proposal.packages.map((pkg, index) => (
                <label key={pkg.name} className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 focus-within:ring-2 focus-within:ring-[#d8c4a4] ${index === packageIndex ? "border-[#d8c4a4] bg-[#d8c4a4]/10" : "border-[#f4efe3]/15"}`}>
                  <input className="mt-1 h-4 w-4 accent-[#d8c4a4]" type="radio" name="scope" value={index} checked={index === packageIndex} onChange={() => { setPackageIndex(index); setCopied(false); }} />
                  <span><span className="block font-semibold">{pkg.name}</span><span className="mt-1 block text-sm leading-6 text-[#f4efe3]/75">{pkg.summary}</span></span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>
        <section className="rounded-xl border border-[#d8c4a4]/35 bg-[#f4efe3]/[0.045] p-6 sm:p-8" aria-label="Your project scope">
          <div aria-live="polite" aria-atomic="true">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#d8c4a4]">Published starting price</p>
            <p className="mt-4 font-grotesk text-4xl font-semibold sm:text-5xl">{price}</p>
            <h2 className="mt-4 text-xl font-semibold">{selected.name}</h2>
            <p className="mt-2 text-sm text-[#f4efe3]/75">Indicative delivery: {selected.timeline}, after scope and inputs are ready.</p>
          </div>
          <ul className="mt-6 space-y-3 border-t border-[#f4efe3]/15 pt-6 text-sm leading-6">
            {selected.features.map((feature) => <li key={feature}>✓ {feature}</li>)}
          </ul>
          <p className="mt-6 text-sm leading-7 text-[#f4efe3]/75">These are Arun’s existing package prices, not a market average or a binding quote. INR and USD are published price options, not a live currency conversion. Content production, hosting, paid assets and third-party subscriptions are separate; taxes and payment terms are confirmed in the proposal.</p>
          <div className="mt-6 flex flex-wrap gap-4">
            <a href="#planner-inquiry" className="rounded-lg bg-[#f4efe3] px-5 py-3 text-sm font-semibold text-[#0d0c09] focus-visible:outline focus-visible:outline-offset-4">Discuss this scope</a>
            <button onClick={copyBrief} type="button" className="rounded-lg border border-[#f4efe3]/30 px-5 py-3 text-sm font-semibold focus-visible:outline focus-visible:outline-offset-4">{copied ? "Brief copied" : "Copy scope brief"}</button>
          </div>
          <p role="status" className="mt-3 text-sm text-[#d8c4a4]">{copied ? "Copied. Add your goal and deadline before sharing it." : copyError ? "Copy is unavailable. Select the brief below to copy it manually." : ""}</p>
          <details className="mt-3 text-sm"><summary className="cursor-pointer py-2 text-[#d8c4a4]">Read the scope brief</summary><pre className="mt-2 whitespace-pre-wrap font-sans leading-7">{brief}</pre></details>
          <Link className="mt-5 inline-block text-sm text-[#d8c4a4] underline underline-offset-4" href={`/services/${serviceSlug}`}>Explore {service.name.toLowerCase()} and related work</Link>
        </section>
      </div>
      <section id="planner-inquiry" className="scroll-mt-28 border-t border-[#f4efe3]/15 pt-10">
        <p className="mb-6 text-sm leading-7 text-[#d8c4a4]">Your inquiry will include: {service.name} · {selected.name} · {price}.</p>
        <ProjectInquiryForm source="website-cost-planner" context={{ service: service.name, package: selected.name, budget: price, timeline: selected.timeline, scope: selected.features.join("; ") }} />
      </section>
    </div>
  );
}
