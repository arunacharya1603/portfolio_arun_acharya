"use client";

import { useLayoutEffect, useRef, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, AtSign, Github, Linkedin, Send } from "lucide-react";
import { siteConfig } from "@/lib/site";

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
}

const initialFormData: FormData = {
  name: "",
  email: "",
  projectType: "",
  budget: "",
  message: "",
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const subject = encodeURIComponent(
      `Project Inquiry: ${formData.projectType || "General"}`
    );
    const body = encodeURIComponent(
      [
        `Name: ${formData.name}`,
        `Email: ${formData.email}`,
        `Project Type: ${formData.projectType || "Not specified"}`,
        `Budget: ${formData.budget || "Not specified"}`,
        "",
        `Message:`,
        formData.message,
      ].join("\n")
    );

    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
  };

  /* ---- Shared input styles ---- */
  const inputBase =
    "w-full bg-transparent border border-[#fbfbfa]/[0.12] rounded-lg px-5 py-4 text-[#fbfbfa] text-sm placeholder:text-[#fbfbfa]/30 focus:outline-none focus:border-[#bfa17f]/50 transition-colors";

  return (
    <section
      ref={sectionRef}
      className="relative min-h-svh bg-[#0e0d0c] py-32 lg:py-40 flex flex-col items-center justify-center"
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
          className="font-grotesk text-[clamp(2.5rem,7vw,7rem)] font-semibold uppercase leading-[0.82] text-[#fbfbfa] text-center flex flex-wrap justify-center gap-x-[0.3em] gap-y-2"
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
          className="flex items-center justify-center gap-4 mt-16"
        >
          {/* Email link */}
          <a
            href={`mailto:${siteConfig.email}`}
            className="inline-flex items-center gap-2 border border-[#fbfbfa]/[0.16] rounded-full px-5 py-3 text-sm text-[#fbfbfa]/80 hover:text-[#fbfbfa] hover:border-[#bfa17f]/40 transition-colors"
            aria-label={`Email ${siteConfig.email}`}
          >
            <AtSign className="w-4 h-4" />
            <span>{siteConfig.email}</span>
          </a>

          {/* Social icons */}
          {socials.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex items-center justify-center w-11 h-11 rounded-full border border-[#fbfbfa]/[0.16] text-[#fbfbfa]/60 hover:text-[#fbfbfa] hover:border-[#bfa17f]/40 transition-colors"
            >
              <Icon />
            </a>
          ))}
        </motion.div>

        {/* ---- Contact Form ---- */}
        <motion.form
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto mt-16 space-y-6"
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

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-2.5 bg-[#fbfbfa] text-[#0e0d0c] rounded-full px-7 py-4 text-sm font-semibold hover:bg-[#bfa17f] transition-colors"
            >
              Send Message
              <Send className="w-4 h-4" />
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
