"use client";

import { useLayoutEffect, useRef, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, AtSign, Github, Linkedin, Send } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { submitProjectInquiry } from "@/lib/submit-project-inquiry";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const headlineWords = "Let's Build Something Worth Remembering.".split(" ");

const projectTypes = [
  "Landing Page",
  "Business Website",
  "UI/UX Redesign",
  "Web App",
  "MVP",
] as const;

type ProjectType = (typeof projectTypes)[number];

interface FormData {
  name: string;
  email: string;
  projectType: ProjectType | "";
  budget: string;
  message: string;
  companyFax: string;
}

const initialFormData: FormData = {
  name: "",
  email: "",
  projectType: "",
  budget: "",
  message: "",
  companyFax: "",
};

/* ------------------------------------------------------------------ */
/*  Social link helpers                                                */
/* ------------------------------------------------------------------ */

const socials = [
  { label: "GitHub", href: siteConfig.github, Icon: Github },
  { label: "LinkedIn", href: siteConfig.linkedin, Icon: Linkedin },
  {
    label: "X",
    href: siteConfig.x,
    Icon: () => (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-4 h-4"
        aria-hidden="true"
      >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ClimaticCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  /* ---- GSAP word reveal ---- */
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const section = sectionRef.current;
    const headline = headlineRef.current;
    if (!section || !headline) return;

    const ctx = gsap.context(() => {
      const innerSpans = headline.querySelectorAll<HTMLSpanElement>(
        "[data-word-inner]"
      );

      gsap.set(innerSpans, { y: "100%" });

      gsap.to(innerSpans, {
        y: 0,
        stagger: 0.06,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          end: "top 20%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* ---- Form handlers ---- */
  const updateField = <K extends keyof FormData>(
    key: K,
    value: FormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitStatus("submitting");

    try {
      await submitProjectInquiry({
        source: "homepage-contact",
        name: formData.name,
        email: formData.email,
        projectType: formData.projectType || "Not specified",
        budget: formData.budget || "Not specified",
        message: formData.message,
        companyFax: formData.companyFax,
      });
      setFormData(initialFormData);
      setSubmitStatus("success");
    } catch {
      setSubmitStatus("error");
    }
  };

  /* ---- Shared input styles ---- */
  const inputBase =
    "w-full bg-transparent border border-[#fbfbfa]/[0.12] rounded-lg px-5 py-4 text-[#fbfbfa] text-sm placeholder:text-[#fbfbfa]/30 focus:outline-none focus:border-[#bfa17f]/50 transition-colors";

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-svh flex-col items-center justify-center bg-[#0e0d0c] py-32 lg:py-40"
      aria-label="Get in touch"
    >
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 w-full">
        {/* ---- Eyebrow ---- */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-xs uppercase tracking-[0.24em] text-[#bfa17f] mb-10 text-center"
        >
          What&apos;s Next
        </motion.p>

        {/* ---- Headline — word by word reveal ---- */}
        <h2
          ref={headlineRef}
          className="flex flex-wrap justify-center gap-x-[0.3em] gap-y-2 text-center font-heading text-[clamp(2.5rem,7vw,7rem)] uppercase leading-[0.86] text-[#fbfbfa]"
        >
          {headlineWords.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden">
              <span data-word-inner className="inline-block will-change-transform">
                {word}
              </span>
            </span>
          ))}
        </h2>

        {/* ---- Description ---- */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg leading-8 text-[#fbfbfa]/[0.62] max-w-2xl mx-auto text-center mt-12"
        >
          Ready to turn your idea into a product people can&apos;t ignore? Send
          a message and I&apos;ll reply with the cleanest next step.
        </motion.p>

        {/* ---- Contact Options ---- */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mx-auto mt-12 flex w-full max-w-sm flex-col items-center gap-4 sm:mt-16 sm:max-w-none sm:flex-row sm:justify-center"
        >
          {/* Email link */}
          <a
            href={`mailto:${siteConfig.email}`}
            className="inline-flex min-h-12 w-full min-w-0 items-center justify-center gap-2 rounded-full border border-[#fbfbfa]/[0.16] bg-[#fbfbfa]/[0.025] px-4 py-3 text-[13px] text-[#fbfbfa]/80 transition-colors hover:border-[#bfa17f]/40 hover:text-[#fbfbfa] sm:min-h-0 sm:w-auto sm:bg-transparent sm:px-5 sm:text-sm"
            aria-label={`Email ${siteConfig.email}`}
          >
            <AtSign className="h-4 w-4 shrink-0" />
            <span className="min-w-0 truncate">{siteConfig.email}</span>
          </a>

          {/* Social icons */}
          <div className="flex items-center justify-center gap-3">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#fbfbfa]/[0.16] text-[#fbfbfa]/60 transition-colors hover:border-[#bfa17f]/40 hover:text-[#fbfbfa]"
              >
                <Icon />
              </a>
            ))}
          </div>
        </motion.div>

        {/* ---- Contact Form ---- */}
        <motion.form
          id="contact"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          onSubmit={handleSubmit}
          className="mx-auto mt-16 max-w-2xl space-y-6"
          aria-label="Contact form"
        >
          {/* Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Your name"
              required
              value={formData.name}
              onChange={(e) => updateField("name", e.target.value)}
              className={inputBase}
              aria-label="Your name"
            />
            <input
              type="email"
              placeholder="Your email"
              required
              value={formData.email}
              onChange={(e) => updateField("email", e.target.value)}
              className={inputBase}
              aria-label="Your email"
            />
          </div>          {/* Project type — button group */}
          <fieldset>
            <legend className="text-xs uppercase tracking-[0.2em] text-[#fbfbfa]/40 mb-3">
              Project Type
            </legend>
            <div className="flex flex-wrap gap-2">
              {projectTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => updateField("projectType", type)}
                  aria-pressed={formData.projectType === type}
                  className={`px-4 py-2 text-sm rounded-full border transition-colors ${
                    formData.projectType === type
                      ? "border-[#bfa17f] bg-[#bfa17f]/10 text-[#bfa17f]"
                      : "border-[#fbfbfa]/[0.12] text-[#fbfbfa]/50 hover:text-[#fbfbfa]/80 hover:border-[#fbfbfa]/25"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </fieldset>

          {/* Budget */}
          <input
            type="text"
            placeholder="Budget range (e.g. $2k – $5k)"
            value={formData.budget}
            onChange={(e) => updateField("budget", e.target.value)}
            className={inputBase}
            aria-label="Budget range"
          />

          {/* Message */}
          <textarea
            placeholder="Tell me about your project…"
            required
            rows={5}
            value={formData.message}
            onChange={(e) => updateField("message", e.target.value)}
            className={`${inputBase} resize-none`}
            aria-label="Project message"
          />

          <input
            type="text"
            name="companyFax"
            value={formData.companyFax}
            onChange={(e) => updateField("companyFax", e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            className="absolute -left-[9999px] h-px w-px opacity-0"
            aria-hidden="true"
          />
          {/* Submit */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p
              aria-live="polite"
              className={`text-sm ${
                submitStatus === "error"
                  ? "text-red-300"
                  : submitStatus === "success"
                    ? "text-emerald-300"
                    : "text-[#fbfbfa]/45"
              }`}
            >
              {submitStatus === "success"
                ? "Message sent. I’ll get back to you soon."
                : submitStatus === "error"
                  ? "Couldn’t send your message. Please try again."
                  : "Your message will be delivered directly to my inbox."}
            </p>
            <button
              type="submit"
              disabled={submitStatus === "submitting"}
              className="inline-flex items-center justify-center gap-2.5 rounded-full bg-[#fbfbfa] px-7 py-4 text-sm font-semibold text-[#0e0d0c] transition-colors hover:bg-[#bfa17f] disabled:cursor-wait disabled:opacity-60"
            >
              {submitStatus === "submitting" ? "Sending..." : "Send Message"}
              <Send className="w-4 h-4" />
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
