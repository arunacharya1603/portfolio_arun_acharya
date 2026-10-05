"use client";

import { useState, type FormEvent } from "react";
import { siteConfig } from "@/lib/site";
import { submitProjectInquiry } from "@/lib/submit-project-inquiry";

const inputClass = "mt-2 w-full rounded-lg border border-[#f4efe3]/20 bg-[#171510] px-4 py-3 text-base text-[#f4efe3] placeholder:text-[#f4efe3]/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d8c4a4]";

export function ProjectInquiryForm({ source = "portfolio-contact", context = {} }: {
  source?: string;
  context?: Record<string, string>;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    try {
      await submitProjectInquiry({
        ...context,
        source,
        name: String(data.get("name") ?? ""),
        email: String(data.get("email") ?? ""),
        message: String(data.get("message") ?? ""),
        companyFax: String(data.get("companyFax") ?? ""),
      });
      setStatus("success");
      form.reset();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Your message could not be sent.");
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <h2 className="font-grotesk text-3xl font-semibold">Tell me about your project</h2>
        <p className="mt-2 text-sm leading-7 text-[#f4efe3]/75">A rough idea is enough. I’ll review the fit and reply with questions or a scoped next step.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-semibold">Name
          <input className={inputClass} name="name" autoComplete="name" required maxLength={120} placeholder="Your name" />
        </label>
        <label className="block text-sm font-semibold">Email
          <input className={inputClass} name="email" type="email" autoComplete="email" required maxLength={180} placeholder="you@company.com" />
        </label>
      </div>
      <label className="block text-sm font-semibold">What do you need built or improved?
        <textarea className={inputClass} name="message" rows={5} required maxLength={4000} placeholder="Your goal, current website (if any), and an ideal timeline. Add a budget if you have one." />
      </label>
      <div className="hidden" aria-hidden="true">
        <label>Leave this empty<input name="companyFax" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <p role="status" aria-live="polite" className={`text-sm leading-6 ${status === "error" ? "text-red-300" : status === "success" ? "text-emerald-300" : "text-[#f4efe3]/70"}`}>
        {status === "success" ? "Message sent. Your inquiry has been emailed to Arun." : status === "error" ? `${error} Your details are still here; retry or email Arun directly below.` : "Your details are emailed to Arun to respond to your inquiry. The page and referral source are included to understand how you found this site."}
      </p>
      <button type="submit" disabled={status === "sending"} className="w-full rounded-lg bg-[#f4efe3] px-5 py-4 text-sm font-semibold text-[#0d0c09] hover:bg-[#d8c4a4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 disabled:cursor-wait disabled:opacity-60">
        {status === "sending" ? "Sending…" : "Send project inquiry"}
      </button>
      <p className="text-sm leading-7 text-[#f4efe3]/75">Prefer email? <a className="break-all underline underline-offset-4 text-[#d8c4a4]" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></p>
    </form>
  );
}
