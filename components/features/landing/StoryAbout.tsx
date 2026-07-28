"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BookOpen, Handshake, Lightbulb, Rocket, Search, Wrench } from "lucide-react";

const chapters = [
  {
    num: "01",
    title: "Curiosity",
    signal: "Questions before answers",
    icon: Search,
    text: "Started by breaking things apart and wondering how they worked. Every website was a puzzle to reverse-engineer.",
  },
  {
    num: "02",
    title: "Learning",
    signal: "Self-taught foundation",
    icon: BookOpen,
    text: "Dove into React, TypeScript, and the modern web stack. Built projects that nobody asked for, just to understand the craft.",
  },
  {
    num: "03",
    title: "Building",
    signal: "Ideas into interfaces",
    icon: Wrench,
    text: "Shipped products for startups, agencies, and personal ideas. Each build taught something no tutorial could.",
  },
  {
    num: "04",
    title: "Freelancing",
    signal: "Ownership with clients",
    icon: Handshake,
    text: "Turned skills into a service. Started delivering real business value for clients with tight timelines and high expectations.",
  },
  {
    num: "05",
    title: "Shipping",
    signal: "11+ launches and counting",
    icon: Rocket,
    text: "11+ products launched. Landing pages, dashboards, marketplaces, MVPs. Each one pushed the standard higher.",
  },
  {
    num: "06",
    title: "Solving",
    signal: "Business-first execution",
    icon: Lightbulb,
    text: "Now I solve business problems through clean architecture, beautiful interfaces, and code that performs.",
  },
];

const CHAPTER_COUNT = chapters.length;
const DESKTOP_SCROLL_PER_CHAPTER = 1.35;

export default function StoryAbout() {
  const sectionRef = useRef<HTMLElement>(null);
  const storyVisualRef = useRef<HTMLDivElement>(null);
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
          // ScrollTrigger treats relative unit strings inconsistently; calculate real pixels.
          end: () => `+=${window.innerHeight * CHAPTER_COUNT * DESKTOP_SCROLL_PER_CHAPTER}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.9,
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

        const finalChapter = document.getElementById(
          `story-chapter-mobile-${CHAPTER_COUNT - 1}`
        );

        if (storyVisualRef.current && finalChapter) {
          gsap.to(storyVisualRef.current, {
            yPercent: -115,
            ease: "none",
            scrollTrigger: {
              trigger: finalChapter,
              start: "top 72%",
              end: "top 28%",
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="story"
      ref={sectionRef}
      className="relative min-h-[100svh] overflow-x-clip bg-[#0e0d0c]"
      aria-label="About - The Story"
    >
      {/* Subtle warm gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#0e0d0c] via-[#121110] to-[#0e0d0c]"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none sticky top-14 z-[1] mb-[calc(0px_-_min(94vw,24rem))] ml-auto h-[min(94vw,24rem)] w-[min(94vw,24rem)] sm:top-16 sm:mb-[-34rem] sm:h-[34rem] sm:w-[34rem] lg:absolute lg:right-[18%] lg:top-1/2 lg:mb-0 lg:ml-0 lg:h-auto lg:w-[min(48vw,46rem)] lg:-translate-y-1/2 xl:right-[20%]"
        ref={storyVisualRef}
        aria-hidden="true"
      >
        <div className="relative aspect-square w-full translate-x-[20%] opacity-40 sm:translate-x-[12%] lg:translate-x-0 lg:opacity-55">
          <Image
            src="/image/story-layered-product-transparent.webp"
            alt=""
            fill
            sizes="(max-width: 639px) 94vw, (max-width: 1023px) 544px, 48vw"
            className="object-contain"
          />
        </div>
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1480px] flex-col px-4 py-20 sm:px-6 sm:py-24 lg:py-24 xl:py-28">
        {/* Eyebrow */}
        <span className="mb-10 block font-sans text-xs uppercase tracking-[0.24em] text-[#bfa17f] lg:mb-8">
          The Story
        </span>

        {/* Main Content Area */}
        <div className="grid flex-1 gap-10 lg:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.55fr)] lg:gap-14 xl:gap-20">
          
          {/* Left Side: Chapters (65%) */}
          <div className="relative flex min-h-[420px] w-full flex-col justify-center lg:min-h-[min(620px,72vh)]">
            
            {/* Desktop Pinned Chapters (Crossfade) */}
            <div className="hidden lg:block absolute inset-0">
              {chapters.map((chapter, index) => {
                const isActive = index === activeIndex;
                const isPast = index < activeIndex;
                const ChapterIcon = chapter.icon;
                return (
                  <div
                    key={chapter.num}
                    className="absolute inset-y-0 left-0 flex w-full flex-col justify-center transition-all duration-1000"
                    style={{
                      opacity: isActive ? 1 : 0,
                      filter: isActive ? "blur(0px)" : "blur(8px)",
                      transform: isActive
                        ? "translateY(0px) scale(1)"
                        : isPast
                        ? "translateY(-40px) scale(0.98)"
                        : "translateY(40px) scale(0.98)",
                      pointerEvents: isActive ? "auto" : "none",
                      transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                  >
                    {/* Chapter context */}
                    <div className="mb-6 flex max-w-2xl items-center gap-3">
                      <span className="grid h-11 w-11 place-items-center rounded-[10px] border border-[#bfa17f]/30 bg-[#bfa17f]/10 text-[#d6b992]">
                        <ChapterIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-[#fbfbfa]/60">
                        {chapter.signal}
                      </span>
                      <span className="ml-auto font-sans text-xs tabular-nums text-[#fbfbfa]/40">
                        {chapter.num} / {String(CHAPTER_COUNT).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Chapter number */}
                    <span
                      className="block select-none font-grotesk text-[clamp(5rem,11vw,9rem)] font-semibold leading-none text-[#fbfbfa]/[0.06]"
                      aria-hidden="true"
                    >
                      {chapter.num}
                    </span>

                    {/* Chapter title */}
                    <h3 className="-mt-5 font-heading text-[clamp(2.75rem,5.5vw,5.25rem)] uppercase leading-[0.9] text-[#fbfbfa] lg:-mt-9">
                      {chapter.title}
                    </h3>

                    {/* Chapter text */}
                    <p className="mt-7 max-w-2xl font-sans text-lg leading-8 text-[#fbfbfa]/75 xl:text-xl xl:leading-9">
                      {chapter.text}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Mobile Natural Scroll Chapters */}
            <div className="lg:hidden flex flex-col gap-10 sm:gap-12">
              {chapters.map((chapter, index) => {
                const ChapterIcon = chapter.icon;

                return (
                  <article
                    key={chapter.num}
                    id={`story-chapter-mobile-${index}`}
                    className="flex min-h-[66svh] flex-col justify-center border-b border-[#fbfbfa]/10 py-14 last:border-0 sm:min-h-[60svh] sm:py-16"
                  >
                    <div className="mb-7 flex items-center gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-[10px] border border-[#bfa17f]/30 bg-[#bfa17f]/10 text-[#d6b992]">
                        <ChapterIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-[#fbfbfa]/60">
                        {chapter.signal}
                      </span>
                      <span className="ml-auto font-sans text-[10px] tabular-nums text-[#fbfbfa]/40">
                        {chapter.num} / {String(CHAPTER_COUNT).padStart(2, "0")}
                      </span>
                    </div>
                    <span
                      className="block select-none font-grotesk text-6xl font-semibold leading-none text-[#fbfbfa]/[0.06]"
                      aria-hidden="true"
                    >
                      {chapter.num}
                    </span>
                    <h3 className="-mt-1 font-heading text-4xl uppercase leading-none text-[#fbfbfa] sm:text-5xl">
                      {chapter.title}
                    </h3>
                    <p className="mt-6 max-w-xl font-sans text-base leading-7 text-[#fbfbfa]/75 sm:text-lg sm:leading-8">
                      {chapter.text}
                    </p>
                  </article>
                );
              })}
            </div>

          </div>

          {/* Right Side: Progress indicator list */}
          <div className="hidden lg:block">
            <div className="h-full flex items-center justify-end">
              <div className="flex w-full gap-5 rounded-[16px] border border-[#fbfbfa]/10 bg-[#fbfbfa]/[0.025] p-5 xl:p-6">
                
                {/* Vertical progress line */}
                <div className="relative h-80 w-px bg-[#fbfbfa]/10">
                  <div
                    ref={progressFillRef}
                    className="absolute top-0 left-0 w-full bg-[#bfa17f]/60 transition-all duration-300 ease-out"
                    style={{ height: "0%" }}
                  />
                </div>

                {/* Chapter list */}
                <nav
                  className="flex h-80 flex-1 flex-col justify-between"
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
                      className={`min-h-12 rounded-[8px] px-3 text-left font-sans text-sm uppercase tracking-[0.12em] transition-all duration-300 ${
                        i === activeIndex
                          ? "bg-[#bfa17f]/10 text-[#d6b992]"
                          : "text-[#fbfbfa]/40 hover:bg-[#fbfbfa]/5 hover:text-[#fbfbfa]/75"
                      }`}
                      aria-label={`Chapter ${chapter.num}: ${chapter.title}`}
                      aria-current={i === activeIndex ? "step" : undefined}
                    >
                      <span className="mr-3 text-[10px] text-[#fbfbfa]/40">
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
