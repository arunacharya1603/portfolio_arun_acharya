"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const chapters = [
  {
    num: "01",
    title: "Curiosity",
    text: "Started by breaking things apart and wondering how they worked. Every website was a puzzle to reverse-engineer.",
  },
  {
    num: "02",
    title: "Learning",
    text: "Dove into React, TypeScript, and the modern web stack. Built projects that nobody asked for, just to understand the craft.",
  },
  {
    num: "03",
    title: "Building",
    text: "Shipped products for startups, agencies, and personal ideas. Each build taught something no tutorial could.",
  },
  {
    num: "04",
    title: "Freelancing",
    text: "Turned skills into a service. Started delivering real business value for clients with tight timelines and high expectations.",
  },
  {
    num: "05",
    title: "Shipping",
    text: "11+ products launched. Landing pages, dashboards, marketplaces, MVPs. Each one pushed the standard higher.",
  },
  {
    num: "06",
    title: "Solving",
    text: "Now I solve business problems through clean architecture, beautiful interfaces, and code that performs.",
  },
];

const CHAPTER_COUNT = chapters.length;
const DESKTOP_SCROLL_PER_CHAPTER_VH = 118;

export default function StoryAbout() {
  const sectionRef = useRef<HTMLElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) return;

      const mm = gsap.matchMedia();

      // Desktop layout: Pinned story scroll with crossfade
      mm.add("(min-width: 1024px)", () => {
        ScrollTrigger.create({
          id: "story-trigger",
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${CHAPTER_COUNT * DESKTOP_SCROLL_PER_CHAPTER_VH}vh`,
          pin: true,
          pinSpacing: true,
          scrub: 0.55,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          refreshPriority: 5, // Lower priority than CinematicHero (10), higher than ProjectShowcase (3)
          onUpdate: (self) => {
            const progress = self.progress;
            const rawIndex = Math.floor(progress * CHAPTER_COUNT);
            const newIndex = Math.min(rawIndex, CHAPTER_COUNT - 1);
            
            if (activeIndexRef.current !== newIndex) {
              activeIndexRef.current = newIndex;
              setActiveIndex(newIndex);
            }

            if (progressFillRef.current) {
              progressFillRef.current.style.height = `${progress * 100}%`;
            }
          },
        });
      });

      // Mobile layout: Natural scroll tracking
      mm.add("(max-width: 1023px)", () => {
        chapters.forEach((_, index) => {
          ScrollTrigger.create({
            trigger: `#story-chapter-mobile-${index}`,
            start: "top 50%",
            end: "bottom 50%",
            refreshPriority: 1,
            onToggle: (self) => {
              if (self.isActive) {
                if (activeIndexRef.current !== index) {
                  activeIndexRef.current = index;
                  setActiveIndex(index);
                }
              }
            },
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="story"
      ref={sectionRef}
      className="relative min-h-[100svh] bg-[#0e0d0c] overflow-hidden"
      aria-label="About - The Story"
    >
      {/* Subtle warm gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#0e0d0c] via-[#121110] to-[#0e0d0c]"
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col min-h-[100svh] max-w-[1480px] mx-auto px-4 sm:px-6 py-28 sm:py-32 lg:py-40">
        {/* Eyebrow */}
        <span className="text-xs uppercase tracking-[0.24em] text-[#bfa17f] font-sans mb-16 lg:mb-24 block">
          The Story
        </span>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          {/* Left Side: Chapters (65%) */}
          <div className="w-full lg:w-[65%] flex flex-col justify-center relative min-h-[400px] lg:min-h-[min(660px,68vh)]">
            
            {/* Desktop Pinned Chapters (Crossfade) */}
            <div className="hidden lg:block absolute inset-0">
              {chapters.map((chapter, index) => {
                const isActive = index === activeIndex;
                const isPast = index < activeIndex;
                return (
                  <div
                    key={chapter.num}
                    className="absolute inset-y-0 left-0 w-full flex flex-col justify-center transition-all duration-700"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: isActive
                        ? "translateY(0px) scale(1)"
                        : isPast
                        ? "translateY(-30px) scale(0.95)"
                        : "translateY(30px) scale(0.95)",
                      pointerEvents: isActive ? "auto" : "none",
                      transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                  >
                    {/* Chapter number */}
                    <span
                      className="block font-grotesk text-[clamp(6rem,15vw,12rem)] font-semibold text-[#fbfbfa]/[0.05] leading-none select-none"
                      aria-hidden="true"
                    >
                      {chapter.num}
                    </span>

                    {/* Chapter title */}
                    <h3 className="font-grotesk text-[clamp(2.5rem,6vw,5rem)] font-semibold uppercase leading-[0.82] text-[#fbfbfa] -mt-6 lg:-mt-12">
                      {chapter.title}
                    </h3>

                    {/* Chapter text */}
                    <p className="mt-8 text-lg leading-8 text-[#fbfbfa]/[0.68] font-sans max-w-xl">
                      {chapter.text}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Mobile Natural Scroll Chapters */}
            <div className="lg:hidden flex flex-col gap-10 sm:gap-12">
              {chapters.map((chapter, index) => (
                <div
                  key={chapter.num}
                  id={`story-chapter-mobile-${index}`}
                  className="min-h-[52svh] sm:min-h-[48svh] flex flex-col justify-center py-14 sm:py-16 border-b border-[#fbfbfa]/5 last:border-0"
                >
                  <span
                    className="block font-grotesk text-6xl font-semibold text-[#fbfbfa]/[0.05] leading-none select-none"
                    aria-hidden="true"
                  >
                    {chapter.num}
                  </span>
                  <h3 className="font-grotesk text-3xl font-semibold uppercase leading-none text-[#fbfbfa] mt-2">
                    {chapter.title}
                  </h3>
                  <p className="mt-6 text-base leading-relaxed text-[#fbfbfa]/[0.68] font-sans">
                    {chapter.text}
                  </p>
                </div>
              ))}
            </div>

          </div>

          {/* Right Side: Progress indicator list (35%) */}
          <div className="hidden lg:block lg:w-[35%]">
            <div className="h-full flex items-center justify-end">
              <div className="flex gap-6">
                
                {/* Vertical progress line */}
                <div className="relative w-px h-72 bg-[#fbfbfa]/[0.08]">
                  <div
                    ref={progressFillRef}
                    className="absolute top-0 left-0 w-full bg-[#bfa17f]/60 transition-all duration-300 ease-out"
                    style={{ height: "0%" }}
                  />
                </div>

                {/* Chapter list */}
                <nav
                  className="flex flex-col justify-between h-72 py-1"
                  aria-label="Story chapters"
                >
                  {chapters.map((chapter, i) => (
                    <button
                      key={chapter.num}
                      onClick={() => {
                        const trigger = ScrollTrigger.getById("story-trigger");
                        if (trigger) {
                          const scrollDistance = trigger.end - trigger.start;
                          const scrollPos =
                            trigger.start +
                            scrollDistance * ((i + 0.5) / CHAPTER_COUNT);
                          window.scrollTo({
                            top: scrollPos,
                            behavior: "smooth",
                          });
                        } else {
                          const el = document.getElementById(`story-chapter-mobile-${i}`);
                          el?.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                      className={`text-left text-sm font-sans uppercase tracking-[0.12em] transition-colors duration-300 ${
                        i === activeIndex
                          ? "text-[#bfa17f]"
                          : "text-[#fbfbfa]/30 hover:text-[#fbfbfa]/60"
                      }`}
                      aria-label={`Chapter ${chapter.num}: ${chapter.title}`}
                      aria-current={i === activeIndex ? "step" : undefined}
                    >
                      <span className="mr-3 text-[10px] text-[#fbfbfa]/20">
                        {chapter.num}
                      </span>
                      {chapter.title}
                    </button>
                  ))}
                </nav>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
