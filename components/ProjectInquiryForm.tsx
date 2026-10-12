"use client";

import { useState, type FormEvent } from "react";
import { inputClass } from "@/components/ui/control-styles";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";
import { submitProjectInquiry } from "@/lib/submit-project-inquiry";

export function ProjectInquiryForm({
  source = "portfolio-contact",
  context = {},
}: {
  source?: string;
  context?: Record<string, string>;
}) {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
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
      setError(
        cause instanceof Error
          ? cause.message
          : "Your message could not be sent.",
      );
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <h2 className="font-grotesk text-3xl font-semibold">
          Tell me about your project
        </h2>
        <p className="mt-2 text-sm leading-7 text-subtle">
          A rough idea is enough. All fields are required. I’ll review the fit
          and reply with questions or a scoped next step.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-semibold">
          Name
          <input
            className={inputClass}
            name="name"
            autoComplete="name"
            required
            maxLength={120}
            placeholder="Your name"
          />
        </label>
        <label className="block text-sm font-semibold">
          Email
          <input
            className={inputClass}
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={180}
            placeholder="you@company.com"
          />
        </label>
      </div>
      <label className="block text-sm font-semibold">
        What do you need built or improved?
        <textarea
          className={inputClass}
          name="message"
          rows={5}
          required
          maxLength={4000}
          placeholder="Your goal, current website (if any), and an ideal timeline. Add a budget if you have one."
        />
      </label>
      <div className="hidden" aria-hidden="true">
        <label>
          Leave this empty
          <input name="companyFax" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <p
        role="status"
        aria-live="polite"
        className={`text-sm leading-6 ${status === "error" ? "text-red-700" : status === "success" ? "text-emerald-700" : "text-subtle"}`}
      >
        {status === "success"
          ? "Message sent. Your inquiry has been emailed to Arun."
          : status === "error"
            ? `${error} Your details are still here; retry or email Arun directly below.`
            : "Your details are emailed to Arun to respond to your inquiry. The page and referral source are included to understand how you found this site."}
      </p>
      <Button
        variant="accent"
        type="submit"
        disabled={status === "sending"}
        className="w-full py-4"
      >
        {status === "sending" ? "Sending…" : "Send project inquiry"}
      </Button>
      <p className="text-sm leading-7 text-subtle">
        Prefer email?{" "}
        <a
          className="break-all underline underline-offset-4 text-brand"
          href={`mailto:${siteConfig.email}`}
        >
          {siteConfig.email}
        </a>
      </p>
    </form>
  );
}
