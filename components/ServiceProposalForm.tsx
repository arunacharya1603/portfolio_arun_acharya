"use client";

import { ArrowUpRight, CheckCircle2, Send } from "lucide-react";
import { useState, type FormEvent } from "react";

import type { ServiceProposal } from "@/data/service-proposals";
import type { SeoServicePage } from "@/data/seo-content";
import { siteConfig } from "@/lib/site";
import { submitProjectInquiry } from "@/lib/submit-project-inquiry";

const inputClass =
  "mt-2 w-full rounded-[7px] border border-[#f4efe3]/14 bg-[#090806] px-4 py-3 text-sm text-[#f4efe3] outline-none transition placeholder:text-[#f4efe3]/34 focus:border-[#d8c4a4]/75 focus:ring-2 focus:ring-[#d8c4a4]/10";

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-[#f4efe3]">{label}</span>
      <input
        className={inputClass}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
      />
    </label>
  );
}

export function ServiceProposalForm({
  service,
  proposal,
}: {
  service: SeoServicePage;
  proposal: ServiceProposal;
}) {
  const [selectedPackage, setSelectedPackage] = useState(
    proposal.packages.find((item) => item.recommended)?.name ?? proposal.packages[0].name
  );
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const goal = String(data.get("goal") || "");
    const requirements = String(data.get("requirements") || "");
    const references = String(data.get("references") || "Not provided");
    setSubmitStatus("submitting");

    try {
      await submitProjectInquiry({
        source: `service-proposal:${service.slug}`,
        service: service.navLabel,
        package: String(data.get("package") || selectedPackage),
        name: String(data.get("name") || ""),
        email: String(data.get("email") || ""),
        company: String(data.get("company") || "Not provided"),
        website: String(data.get("website") || "Not provided"),
        stage: String(data.get("stage") || "Not provided"),
        budget: String(data.get("budget") || "Not provided"),
        timeline: String(data.get("timeline") || "Not provided"),
        connection: String(data.get("connection") || "Email"),
        goal,
        requirements,
        references,
        message: [
          goal,
          `Requirements / blockers: ${requirements}`,
          `References: ${references}`,
        ].join("\n\n"),
      });
      form.reset();
      setSelectedPackage(
        proposal.packages.find((item) => item.recommended)?.name ?? proposal.packages[0].name
      );
      setSubmitStatus("success");
    } catch {
      setSubmitStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Your name" name="name" placeholder="Name" required />
        <Field label="Work email" name="email" type="email" placeholder="you@company.com" required />
        <Field label="Company or product" name="company" placeholder="Company name" />
        <Field label="Current website" name="website" type="url" placeholder="https://" />
      </div>

      <fieldset>
        <legend className="text-sm font-semibold text-[#f4efe3]">Preferred engagement</legend>
        <div className="mt-3 grid gap-2 md:grid-cols-3">
          {proposal.packages.map((item) => {
            const selected = selectedPackage === item.name;

            return (
              <label
                key={item.name}
                className={`cursor-pointer rounded-[7px] border p-4 transition ${
                  selected
                    ? "border-[#d8c4a4]/80 bg-[#d8c4a4]/10"
                    : "border-[#f4efe3]/12 bg-[#f4efe3]/[0.035] hover:border-[#f4efe3]/28"
                }`}
              >
                <input
                  type="radio"
                  name="package"
                  value={item.name}
                  checked={selected}
                  onChange={() => setSelectedPackage(item.name)}
                  className="sr-only"
                />
                <span className="flex items-start justify-between gap-3">
                  <span className="text-sm font-semibold text-[#f4efe3]">{item.name}</span>
                  {selected ? <CheckCircle2 className="h-4 w-4 shrink-0 text-[#d8c4a4]" /> : null}
                </span>
                <span className="mt-2 block text-xs leading-5 text-[#f4efe3]/54">
                  {item.priceUSD} / {item.priceINR}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-semibold text-[#f4efe3]">Project stage</span>
          <select name="stage" required defaultValue="" className={inputClass}>
            <option value="" disabled>Select stage</option>
            <option>New idea / starting from zero</option>
            <option>Designs are ready</option>
            <option>Existing product needs improvement</option>
            <option>Already in development</option>
          </select>
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-[#f4efe3]">Working budget</span>
          <select name="budget" required defaultValue="" className={inputClass}>
            <option value="" disabled>Select a range</option>
            <option>Under USD 500 / INR 40,000</option>
            <option>USD 500-1,500 / INR 40,000-1,20,000</option>
            <option>USD 1,500-3,000 / INR 1,20,000-2,50,000</option>
            <option>USD 3,000+ / INR 2,50,000+</option>
            <option>Need help defining the budget</option>
          </select>
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-[#f4efe3]">Target timeline</span>
          <select name="timeline" required defaultValue="" className={inputClass}>
            <option value="" disabled>Select timeline</option>
            <option>As soon as practical</option>
            <option>Within 2 weeks</option>
            <option>Within 1 month</option>
            <option>1-3 months</option>
            <option>Flexible / planning stage</option>
          </select>
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-[#f4efe3]">Preferred connection</span>
          <select name="connection" required defaultValue="Email" className={inputClass}>
            <option>Email</option>
            <option>LinkedIn message</option>
            <option>Video call after scope review</option>
          </select>
        </label>
      </div>

      <label className="block">
        <span className="text-sm font-semibold text-[#f4efe3]">What should this project achieve?</span>
        <textarea
          className={`${inputClass} min-h-28 resize-y`}
          name="goal"
          placeholder="For example: increase qualified demo requests, launch an MVP, or make an existing product easier to use."
          required
        />
      </label>

      <label className="block">
        <span className="text-sm font-semibold text-[#f4efe3]">Requirements or current blockers</span>
        <textarea
          className={`${inputClass} min-h-36 resize-y`}
          name="requirements"
          placeholder="Share the features, pages, integrations, constraints, or problems already known."
          required
        />
      </label>

      <label className="block">
        <span className="text-sm font-semibold text-[#f4efe3]">References or useful links</span>
        <textarea
          className={`${inputClass} min-h-24 resize-y`}
          name="references"
          placeholder="Competitors, inspiration, Figma, documents, or an existing product URL."
        />
      </label>

      <div className="flex flex-col gap-3 border-t border-[#f4efe3]/12 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p
          aria-live="polite"
          className={`max-w-md text-xs leading-5 ${
            submitStatus === "error"
              ? "text-red-300"
              : submitStatus === "success"
                ? "text-emerald-300"
                : "text-[#f4efe3]/48"
          }`}
        >
          {submitStatus === "success"
            ? "Proposal saved. I’ll review it and reply with the next step."
            : submitStatus === "error"
              ? "Couldn’t save the proposal. Please try again."
              : "Submitting saves this brief so it can be reviewed and followed up."}
        </p>
        <button
          type="submit"
          disabled={submitStatus === "submitting"}
          className="inline-flex items-center justify-center gap-2 rounded-[7px] bg-[#f4efe3] px-5 py-3.5 text-sm font-semibold text-[#0d0c09] transition hover:bg-[#fff8e8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f4efe3] disabled:cursor-wait disabled:opacity-60"
        >
          {submitStatus === "submitting" ? "Saving..." : "Request a scoped proposal"}
          <Send className="h-4 w-4" />
        </button>
      </div>

      <a
        href={siteConfig.linkedin}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 text-sm font-semibold text-[#d8c4a4] transition hover:text-[#f4efe3]"
      >
        Prefer a short introduction first? Connect on LinkedIn
        <ArrowUpRight className="h-4 w-4" />
      </a>
    </form>
  );
}
