"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { workProjects } from "@/data/work-projects";

const featured = workProjects.slice(0, 4);

export default function ProjectShowcase() {
  const containerRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;

    if (prefersReducedMotion || !isDesktop) return;

    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.children;
      if (!cards || cards.length === 0) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "+=300%", // scroll depth
          pin: true,
          pinSpacing: true,
          scrub: 1,
          refreshPriority: 3,
        },
      });

      // Animate Card 1, 2, 3 in sequence
      for (let i = 1; i < cards.length; i++) {
        const previousCard = cards[i - 1];
        const currentCard = cards[i];

        tl.to(previousCard, {
          scale: 0.94,
          opacity: 0.25,
          y: -25,
          duration: 1,
          ease: "power1.inOut"
        }, `card-${i}`)
        .fromTo(currentCard,
          { y: "100vh", opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power1.inOut" },
          `card-${i}`
        );
      }
    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="projects"
      className="relative bg-[#0e0d0c]"
      aria-label="Selected work and projects"
    >
      {/* Desktop View: Pinned Stacking Deck */}
      <div ref={triggerRef} className="hidden lg:block h-screen w-full overflow-hidden relative">
        <div className="h-full w-full max-w-[1480px] mx-auto px-6 py-12 flex flex-col justify-between">
          
          {/* Header */}
          <div className="h-[15%] flex flex-col justify-end">
            <span className="block text-xs uppercase tracking-[0.24em] text-[#bfa17f] font-sans mb-2">
              Selected Work
            </span>
            <h2 className="font-grotesk text-4xl xl:text-5xl font-semibold uppercase leading-none text-[#fbfbfa]">
              Products I&apos;ve Shipped
            </h2>
          </div>

          {/* Cards Stage */}
          <div ref={cardsRef} className="h-[80%] relative w-full overflow-hidden">
            {featured.map((project, i) => {
              const displayIndex = String(i + 1).padStart(2, "0");
              return (
                <div
                  key={project.slug}
                  className="absolute inset-0 w-full h-full flex items-center justify-between gap-12 xl:gap-20 bg-[#0e0d0c] origin-bottom"
                  style={{ zIndex: i }}
                >
                  {/* Left: Project Image (55%) */}
                  <div className="w-[55%] aspect-[16/10] rounded-2xl overflow-hidden border border-[#fbfbfa]/[0.12] bg-[#121110] relative">
                    <Image
                      src={project.image}
                      alt={`${project.name} preview`}
                      fill
                      className="object-cover"
                      sizes="50vw"
                      priority={i === 0}
                    />
                  </div>

                  {/* Right: Project Info (45%) */}
                  <div className="w-[45%] flex flex-col gap-6 pr-6">
                    <span className="font-grotesk text-7xl xl:text-8xl font-semibold text-[#fbfbfa]/15 leading-none select-none">
                      {displayIndex}
                    </span>
                    <h3 className="font-grotesk text-3xl xl:text-4xl font-semibold text-[#fbfbfa] leading-tight">
                      {project.shortName}
                    </h3>
                    <p className="text-sm xl:text-base leading-relaxed text-[#fbfbfa]/70 font-sans max-w-lg">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-[#fbfbfa]/[0.16] px-3 py-1 text-xs text-[#fbfbfa]/70 font-sans"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={project.href}
                      className="inline-flex items-center gap-2 text-[#bfa17f] font-semibold font-sans text-sm group mt-2"
                    >
                      View Case Study
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>

      {/* Mobile View: Natural Scroll Flow */}
      <div className="lg:hidden px-4 py-20 flex flex-col gap-16">
        <div>
          <span className="block text-xs uppercase tracking-[0.24em] text-[#bfa17f] font-sans mb-3">
            Selected Work
          </span>
          <h2 className="font-grotesk text-3xl font-semibold uppercase leading-none text-[#fbfbfa]">
            Products I&apos;ve Shipped
          </h2>
        </div>

        <div className="flex flex-col gap-16">
          {featured.map((project, i) => {
            const displayIndex = String(i + 1).padStart(2, "0");
            return (
              <div key={project.slug} className="flex flex-col gap-6 border-b border-[#fbfbfa]/10 pb-12 last:border-0 last:pb-0">
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-[#fbfbfa]/[0.12] bg-[#121110]">
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <span className="font-grotesk text-5xl font-semibold text-[#fbfbfa]/15 leading-none select-none">
                    {displayIndex}
                  </span>
                  <h3 className="font-grotesk text-2xl font-semibold text-[#fbfbfa]">
                    {project.shortName}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#fbfbfa]/70 font-sans">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-[#fbfbfa]/[0.16] px-2.5 py-0.5 text-xs text-[#fbfbfa]/70 font-sans"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={project.href}
                    className="inline-flex items-center gap-2 text-[#bfa17f] font-semibold font-sans text-sm group w-fit mt-2"
                  >
                    View Case Study
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
