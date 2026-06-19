"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface Step {
  num: string;
  title: string;
  desc: string;
}

const steps: Step[] = [
  {
    num: "01",
    title: "Discover",
    desc: "I deconstruct the objective, audience, and business goal so every decision has a clear reason.",
  },
  {
    num: "02",
    title: "Strategy",
    desc: "I shape the project architecture, content hierarchy, and conversion path before writing a line of code.",
  },
  {
    num: "03",
    title: "Design",
    desc: "I craft the visual system, layout, motion language, and UX so the product feels premium and intuitive.",
  },
  {
    num: "04",
    title: "Build",
    desc: "I engineer clean, scalable, high-performance interfaces with modern frontend and full-stack architecture.",
  },
  {
    num: "05",
    title: "Launch",
    desc: "I deploy, test, refine, and optimize for speed, SEO, responsiveness, and real-world behavior.",
  },
  {
    num: "06",
    title: "Scale",
    desc: "I ensure the product foundation can grow — post-launch support, iterations, and performance monitoring.",
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ProcessJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    /* Respect reduced-motion preference */
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      /* Measure how far the track must travel */
      const getScrollDistance = () =>
        track.scrollWidth - section.offsetWidth;

      /* --- Horizontal scroll pinning --- */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 0.8,
          start: "top top",
          end: () => `+=${getScrollDistance()}`,
          invalidateOnRefresh: true,
          refreshPriority: 1,
        },
      });

      tl.to(track, {
        x: () => -getScrollDistance(),
        ease: "none",
      });

      /* --- Progress line --- */
      gsap.to(progressRef.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          scrub: 0.8,
          start: "top top",
          end: () => `+=${getScrollDistance()}`,
          refreshPriority: 1,
        },
      });

      /* --- Card opacity based on active position --- */
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${getScrollDistance()}`,
        scrub: true,
        refreshPriority: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const total = steps.length;
          const activeIndex = Math.min(
            Math.floor(progress * total),
            total - 1
          );

          cardRefs.current.forEach((card, i) => {
            if (!card) return;
            gsap.to(card, {
              opacity: i === activeIndex ? 1 : 0.3,
              duration: 0.35,
              overwrite: "auto",
            });
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#0e0d0c]"
      aria-label="My working process"
    >
      {/* ---- Section Header ---- */}
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 pt-32 lg:pt-40 pb-16">
        <p className="text-xs uppercase tracking-[0.24em] text-[#bfa17f] mb-6">
          The Process
        </p>
        <h2 className="font-grotesk text-[clamp(3rem,8vw,7rem)] font-semibold uppercase leading-[0.82] text-[#fbfbfa]">
          How I Work
        </h2>
      </div>

      {/* ---- Horizontal Track ---- */}
      <div className="relative">
        {/* Progress line background */}
        <div className="absolute top-0 left-0 right-0 h-px bg-[#fbfbfa]/12 z-10" />

        {/* Progress line fill */}
        <div
          ref={progressRef}
          className="absolute top-0 left-0 right-0 h-px bg-[#bfa17f] z-20 origin-left"
          style={{ transform: "scaleX(0)" }}
        />

        <div
          ref={trackRef}
          className="flex will-change-transform"
        >
          {steps.map((step, i) => (
            <div
              key={step.num}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="min-w-[85vw] sm:min-w-[60vw] lg:min-w-[35vw] px-8 py-12 shrink-0 transition-opacity"
              style={{ opacity: i === 0 ? 1 : 0.3 }}
            >
              {/* Dot indicator */}
              <span className="block w-2 h-2 rounded-full bg-[#bfa17f] mb-8" />

              {/* Step number */}
              <span className="text-[#bfa17f] font-grotesk text-xl font-semibold">
                {step.num}
              </span>

              {/* Title */}
              <h3 className="font-grotesk text-4xl lg:text-5xl font-semibold text-[#fbfbfa] mt-4">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-base leading-8 text-[#fbfbfa]/[0.62] mt-6 max-w-md">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom padding to avoid visual cut */}
      <div className="h-16 lg:h-24" />
    </section>
  );
}
