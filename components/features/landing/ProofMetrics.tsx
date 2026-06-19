"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate as animateValue } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface Metric {
  value: number;
  suffix: string;
  label: string;
  detail: string;
}

const metrics: Metric[] = [
  {
    value: 11,
    suffix: "+",
    label: "Products Shipped",
    detail: "Landing pages, dashboards, marketplaces, MVPs",
  },
  {
    value: 3,
    suffix: "y+",
    label: "Frontend Ownership",
    detail: "React, Next.js, TypeScript, Tailwind, Motion",
  },
  {
    value: 15,
    suffix: "+",
    label: "Clients Served",
    detail: "Founders, agencies, startups, businesses",
  },
  {
    value: 100,
    suffix: "%",
    label: "Delivery Rate",
    detail: "Clear execution, ownership, and post-launch support",
  },
];

const trustBadges: string[] = [
  "Fast Delivery",
  "Clean Code",
  "SEO Ready",
  "Responsive Design",
  "Vercel Deployment",
  "Post-launch Support",
];

const techStack: string[] = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Framer Motion",
  "Node.js",
  "Vercel",
  "Figma",
  "GSAP",
];

/* ------------------------------------------------------------------ */
/*  Counter hook                                                       */
/* ------------------------------------------------------------------ */

function useCounter(target: number, inView: boolean): number {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;

    const controls = animateValue(0, target, {
      duration: 2,
      ease: [0.25, 0.46, 0.45, 0.94],
      onUpdate: (v) => setCount(Math.round(v)),
    });

    return () => controls.stop();
  }, [inView, target]);

  return count;
}

/* ------------------------------------------------------------------ */
/*  Metric Card sub-component                                          */
/* ------------------------------------------------------------------ */

function MetricCard({ metric }: { metric: Metric }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const count = useCounter(metric.value, inView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="flex flex-col"
    >
      <span className="font-grotesk text-6xl lg:text-8xl font-semibold text-[#fbfbfa] tabular-nums">
        {count}
        <span className="text-[#bfa17f]">{metric.suffix}</span>
      </span>
      <span className="text-lg font-semibold text-[#fbfbfa]/90 mt-3">
        {metric.label}
      </span>
      <span className="text-sm text-[#fbfbfa]/50 mt-1">{metric.detail}</span>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Marquee                                                            */
/* ------------------------------------------------------------------ */

const marqueeContent = techStack.join(" · ") + " · ";

function TechMarquee() {
  return (
    <div className="relative overflow-hidden mt-16" aria-hidden="true">
      <div className="flex whitespace-nowrap animate-marquee">
        {/* Duplicate the content for seamless loop */}
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="text-xs uppercase tracking-[0.2em] text-[#fbfbfa]/[0.35] pr-4 shrink-0"
          >
            {marqueeContent}
          </span>
        ))}
      </div>

      {/* Inline CSS keyframes — self-contained */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function ProofMetrics() {
  const badgesRef = useRef<HTMLDivElement>(null);
  const badgesInView = useInView(badgesRef, { once: true, margin: "-40px" });

  return (
    <section
      className="relative bg-[#121110] py-32 lg:py-40"
      aria-label="Key metrics and trust signals"
    >
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6">
        {/* ---- Header ---- */}
        <p className="text-xs uppercase tracking-[0.24em] text-[#bfa17f] mb-6">
          Proof
        </p>
        <h2 className="font-grotesk text-[clamp(3rem,8vw,7rem)] font-semibold uppercase leading-[0.82] text-[#fbfbfa]">
          Numbers That Speak
        </h2>

        {/* ---- Metrics Grid ---- */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mt-20">
          {metrics.map((m) => (
            <MetricCard key={m.label} metric={m} />
          ))}
        </div>

        {/* ---- Divider ---- */}
        <div className="border-t border-[#fbfbfa]/[0.12] my-16" />

        {/* ---- Trust Badges ---- */}
        <div
          ref={badgesRef}
          className="flex flex-wrap gap-3"
          role="list"
          aria-label="Trust signals"
        >
          {trustBadges.map((badge, i) => (
            <motion.span
              key={badge}
              role="listitem"
              initial={{ opacity: 0, y: 12 }}
              animate={badgesInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.4,
                delay: i * 0.08,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="border border-[#fbfbfa]/[0.12] bg-[#fbfbfa]/[0.04] px-4 py-2 text-sm text-[#fbfbfa]/70 rounded-sm"
            >
              {badge}
            </motion.span>
          ))}
        </div>

        {/* ---- Tech Marquee ---- */}
        <TechMarquee />
      </div>
    </section>
  );
}
