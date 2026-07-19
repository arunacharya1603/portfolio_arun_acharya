"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { proofMetrics } from "./proofMetricsData";

const FRAME_COUNT = 301;
const FIRST_SCROLL_FRAMES = 60;
const KEYFRAME_STEP = 6;
const READY_STARTER_COUNT = 36;
const MAX_PARALLEL_LOADS = 5;
const LOG_EVERY_N_FRAMES = 10;

type FrameStatus = "idle" | "queued" | "loading" | "loaded" | "error";
type FrameSet = "desktop" | "tablet" | "mobile";

type FrameCache = {
  images: (HTMLImageElement | null)[];
  statuses: FrameStatus[];
  loadedCount: number;
  didSignalReady: boolean;
};

type CinematicHeroProps = {
  onLoadProgress?: (progress: number) => void;
  onInitialFramesReady?: () => void;
};

const getResponsiveFrameSet = (): FrameSet => {
  if (typeof window === "undefined") return "desktop";

  const width = window.innerWidth;
  if (width < 640) return "mobile";
  if (width < 1100) return "tablet";
  return "desktop";
};

const frameSrc = (index: number, frameSet: FrameSet) => {
  const frameNumber = String(index + 1).padStart(3, "0");
  return `/scrollstory/${frameSet}/ezgif-frame-${frameNumber}.webp`;
};

const buildPriorityPlan = () => {
  const frames = new Set<number>();

  for (let i = 0; i < FIRST_SCROLL_FRAMES; i++) {
    frames.add(i);
  }

  for (let i = FIRST_SCROLL_FRAMES; i < FRAME_COUNT; i += KEYFRAME_STEP) {
    frames.add(i);
  }

  frames.add(FRAME_COUNT - 1);
  return Array.from(frames).sort((a, b) => a - b);
};

const PRIORITY_PLAN = buildPriorityPlan();
const PRIORITY_PLAN_SET = new Set(PRIORITY_PLAN);
const frameCaches = new Map<FrameSet, FrameCache>();

const getFrameCache = (frameSet: FrameSet) => {
  const cached = frameCaches.get(frameSet);
  if (cached) return cached;

  const nextCache: FrameCache = {
    images: Array(FRAME_COUNT).fill(null),
    statuses: Array(FRAME_COUNT).fill("idle"),
    loadedCount: 0,
    didSignalReady: false,
  };

  frameCaches.set(frameSet, nextCache);
  return nextCache;
};

const resetStaleQueuedFrames = (cache: FrameCache) => {
  for (let index = 0; index < cache.statuses.length; index += 1) {
    if (cache.statuses[index] === "queued") {
      cache.statuses[index] = "idle";
    }
  }
};

export default function CinematicHero({
  onLoadProgress,
  onInitialFramesReady,
}: CinematicHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const climaxRef = useRef<HTMLDivElement>(null);

  const frameSetRef = useRef<FrameSet>("desktop");
  const cacheRef = useRef(getFrameCache("desktop"));
  const imagesRef = useRef<(HTMLImageElement | null)[]>(cacheRef.current.images);
  const statusesRef = useRef<FrameStatus[]>(cacheRef.current.statuses);
  const queueRef = useRef<number[]>([]);
  const activeLoadsRef = useRef(0);
  const activeFrameRef = useRef(0);
  const loadedImageCountRef = useRef(0);
  const canvasSizeRef = useRef({ width: 0, height: 0, dpr: 1 });
  const didSignalReadyRef = useRef(false);
  const isMountedRef = useRef(false);
  const onLoadProgressRef = useRef(onLoadProgress);
  const onInitialFramesReadyRef = useRef(onInitialFramesReady);

  useEffect(() => {
    onLoadProgressRef.current = onLoadProgress;
  }, [onLoadProgress]);

  useEffect(() => {
    onInitialFramesReadyRef.current = onInitialFramesReady;
  }, [onInitialFramesReady]);

  const logLoadedImageCount = () => {
    if (process.env.NODE_ENV === "production") return;

    const count = loadedImageCountRef.current;
    const shouldLog =
      count === 1 ||
      count === FRAME_COUNT ||
      count % LOG_EVERY_N_FRAMES === 0;

    if (!shouldLog) return;
    console.log("images:", count);
  };

  const reportPriorityProgress = () => {
    const statuses = statusesRef.current;
    const loadedPriority = PRIORITY_PLAN.reduce((count, frame) => {
      const status = statuses[frame];
      return status === "loaded" || status === "error" ? count + 1 : count;
    }, 0);

    const progress = Math.min(
      99,
      Math.round((loadedPriority / PRIORITY_PLAN.length) * 100)
    );

    onLoadProgressRef.current?.(progress);

    const starterLoaded = statuses
      .slice(0, FIRST_SCROLL_FRAMES)
      .filter((status) => status === "loaded" || status === "error").length;

    if (
      !didSignalReadyRef.current &&
      (statuses[0] === "loaded" || statuses[0] === "error") &&
      starterLoaded >= READY_STARTER_COUNT
    ) {
      didSignalReadyRef.current = true;
      cacheRef.current.didSignalReady = true;
      onInitialFramesReadyRef.current?.();
    }
  };

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = Math.max(1, Math.round(rect.width * dpr));
    const height = Math.max(1, Math.round(rect.height * dpr));

    const current = canvasSizeRef.current;
    if (current.width === width && current.height === height && current.dpr === dpr) {
      return;
    }

    canvas.width = width;
    canvas.height = height;
    canvasSizeRef.current = { width, height, dpr };
  };

  const findClosestLoadedFrame = (targetIndex: number) => {
    const statuses = statusesRef.current;
    if (statuses[targetIndex] === "loaded") return targetIndex;

    for (let offset = 1; offset < FRAME_COUNT; offset++) {
      const before = targetIndex - offset;
      const after = targetIndex + offset;

      if (before >= 0 && statuses[before] === "loaded") return before;
      if (after < FRAME_COUNT && statuses[after] === "loaded") return after;
    }

    return -1;
  };

  const drawFrame = (targetIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    resizeCanvas();

    const frameIndex = findClosestLoadedFrame(targetIndex);
    if (frameIndex < 0) return;

    const img = imagesRef.current[frameIndex];
    if (!img) return;

    const { width: canvasWidth, height: canvasHeight } = canvasSizeRef.current;
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = canvasWidth / canvasHeight;
    let drawWidth = canvasWidth;
    let drawHeight = canvasHeight;
    let offsetX = 0;
    let offsetY = 0;

    if (imgRatio > canvasRatio) {
      drawWidth = canvasHeight * imgRatio;
      offsetX = (canvasWidth - drawWidth) / 2;
    } else {
      drawHeight = canvasWidth / imgRatio;
      offsetY = (canvasHeight - drawHeight) / 2;
    }

    context.clearRect(0, 0, canvasWidth, canvasHeight);
    context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  const pumpQueue = () => {
    if (!isMountedRef.current) return;

    while (activeLoadsRef.current < MAX_PARALLEL_LOADS && queueRef.current.length > 0) {
      const frameIndex = queueRef.current.shift();
      if (frameIndex === undefined) return;

      if (statusesRef.current[frameIndex] !== "queued") continue;

      statusesRef.current[frameIndex] = "loading";
      activeLoadsRef.current += 1;

      const img = new Image();
      img.decoding = "async";
      img.src = frameSrc(frameIndex, frameSetRef.current);

      const settle = async (status: "loaded" | "error") => {
        if (status === "loaded") {
          try {
            await img.decode?.();
          } catch {
            // The image is still usable after onload even when decode() is unsupported or rejects.
          }

          if (statusesRef.current[frameIndex] !== "loaded") {
            imagesRef.current[frameIndex] = img;
            statusesRef.current[frameIndex] = "loaded";
            cacheRef.current.loadedCount += 1;
            loadedImageCountRef.current = cacheRef.current.loadedCount;
            logLoadedImageCount();
          }
        } else if (statusesRef.current[frameIndex] !== "loaded") {
          statusesRef.current[frameIndex] = "error";
        }

        activeLoadsRef.current = Math.max(0, activeLoadsRef.current - 1);

        if (!isMountedRef.current) return;

        if (frameIndex === 0 || Math.abs(frameIndex - activeFrameRef.current) <= 2) {
          drawFrame(activeFrameRef.current);
        }

        if (PRIORITY_PLAN_SET.has(frameIndex)) {
          reportPriorityProgress();
        }

        pumpQueue();
      };

      img.onload = () => void settle("loaded");
      img.onerror = () => void settle("error");
    }
  };

  const enqueueFrame = (frameIndex: number, priority = false) => {
    if (frameIndex < 0 || frameIndex >= FRAME_COUNT) return;

    const status = statusesRef.current[frameIndex];
    if (status === "loaded" || status === "loading") return;

    if (status === "queued") {
      if (priority) {
        queueRef.current = queueRef.current.filter((frame) => frame !== frameIndex);
        queueRef.current.unshift(frameIndex);
      }
      return;
    }

    statusesRef.current[frameIndex] = "queued";
    if (priority) {
      queueRef.current.unshift(frameIndex);
    } else {
      queueRef.current.push(frameIndex);
    }

    pumpQueue();
  };

  const requestNearbyFrames = (targetIndex: number) => {
    const offsets = [0, 1, -1, 2, -2, 3, -3, 5, -5, 8, -8];
    for (const offset of offsets) {
      enqueueFrame(targetIndex + offset, true);
    }
  };

  useEffect(() => {
    isMountedRef.current = true;

    const frameSet = getResponsiveFrameSet();
    const cache = getFrameCache(frameSet);
    resetStaleQueuedFrames(cache);

    frameSetRef.current = frameSet;
    cacheRef.current = cache;
    imagesRef.current = cache.images;
    statusesRef.current = cache.statuses;
    loadedImageCountRef.current = cache.loadedCount;
    didSignalReadyRef.current = cache.didSignalReady;

    resizeCanvas();

    if (cache.didSignalReady) {
      onLoadProgressRef.current?.(99);
      onInitialFramesReadyRef.current?.();
    } else if (cache.loadedCount > 0) {
      reportPriorityProgress();
    }

    drawFrame(activeFrameRef.current);
    enqueueFrame(0, true);

    for (let i = 1; i < FIRST_SCROLL_FRAMES; i++) {
      enqueueFrame(i, false);
    }

    for (const frame of PRIORITY_PLAN) {
      enqueueFrame(frame, false);
    }

    const backgroundTimer = window.setTimeout(() => {
      const enqueueRemaining = () => {
        if (!isMountedRef.current) return;

        let frame = 0;
        const loadChunk = () => {
          if (!isMountedRef.current) return;

          const start = performance.now();
          while (frame < FRAME_COUNT && performance.now() - start < 8) {
            enqueueFrame(frame, false);
            frame += 1;
          }

          if (frame < FRAME_COUNT) {
            window.setTimeout(loadChunk, 80);
          }
        };

        loadChunk();
      };

      if ("requestIdleCallback" in window) {
        window.requestIdleCallback(enqueueRemaining, { timeout: 1200 });
      } else {
        enqueueRemaining();
      }
    }, 2600);

    const handleResize = () => {
      resizeCanvas();
      drawFrame(activeFrameRef.current);
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      isMountedRef.current = false;
      window.clearTimeout(backgroundTimer);
      window.removeEventListener("resize", handleResize);
    };
    // Frame loading is bootstrapped once; mutable refs keep live frame state and callbacks.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(climaxRef.current, { opacity: 1, y: 0 });
        gsap.set(curtainRef.current, { clipPath: "inset(0% 0% 0% 0%)" });
        enqueueFrame(FRAME_COUNT - 1, true);
        return;
      }

      const frameObj = { frame: 0 };
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=400%",
          pin: true,
          pinSpacing: true,
          scrub: 0.8,
          refreshPriority: 10,
        },
      });

      tl
        .to(
          frameObj,
          {
            frame: FRAME_COUNT - 1,
            snap: "frame",
            ease: "none",
            duration: 4,
            onUpdate: () => {
              const nextFrame = Math.round(frameObj.frame);
              activeFrameRef.current = nextFrame;
              requestNearbyFrames(nextFrame);
              drawFrame(nextFrame);
            },
          },
          0
        )
        .to(canvasRef.current, { scale: 1.06, ease: "none", duration: 4 }, 0)
        .to(overlayRef.current, { opacity: 0.75, ease: "none", duration: 4 }, 0)
        .to(
          curtainRef.current,
          {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "power2.out",
            duration: 1.5,
          },
          "-=0.6"
        )
        .to(climaxRef.current, { opacity: 1, y: 0, duration: 1.5 }, "-=1.1");
    }, sectionRef);

    return () => {
      ctx.revert();
    };
    // ScrollTrigger is created once for this pinned section; refs keep frame drawing current.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      ref={sectionRef}
      className="font-hero relative w-full min-h-screen bg-[#0e0d0c] overflow-hidden"
      aria-label="Cinematic canvas hero"
    >
      <div className="sticky top-0 h-[100svh] min-h-[560px] w-full flex items-center justify-center overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover scale-100"
          style={{ willChange: "transform" }}
        />

        <div
          ref={overlayRef}
          className="absolute inset-0 z-10 bg-[#0e0d0c]/20 opacity-100 pointer-events-none"
        />

        <div
          ref={curtainRef}
          className="absolute inset-0 z-[15] bg-[#0e0d0c]/75 backdrop-blur-[10px] pointer-events-none"
          style={{ clipPath: "inset(100% 0% 0% 0%)", willChange: "clip-path" }}
        />

        <div className="relative z-20 h-full w-full">
          <div
            ref={climaxRef}
            className="absolute inset-0 translate-y-6 opacity-0"
          >
            <div className="mx-auto flex h-full w-full max-w-[1380px] flex-col px-5 pb-6 pt-6 sm:px-8 sm:pb-8 sm:pt-8 lg:px-12 lg:pb-10 lg:pt-10">
              <div className="grid flex-1 content-center gap-7 py-8 sm:gap-9 sm:py-10 lg:grid-cols-[minmax(0,1.28fr)_minmax(380px,0.72fr)] lg:items-end lg:gap-12 lg:py-14">
                <h1
                  aria-label="I build products that people remember."
                  className="font-grotesk text-[2.25rem] font-semibold leading-[1.02] text-[#fffdf8] [text-shadow:0_3px_28px_rgba(0,0,0,0.72)] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[4.75rem] xl:text-[5.5rem] 2xl:text-[6.25rem]"
                >
                  <span className="block sm:hidden" aria-hidden="true">
                    <span className="block">I build</span>
                    <span className="block">products that</span>
                    <span className="block">people</span>
                    <span className="block text-[#d6b992]">remember.</span>
                  </span>
                  <span className="hidden sm:block" aria-hidden="true">
                    <span className="block whitespace-nowrap">I build products</span>
                    <span className="block whitespace-nowrap">that people</span>
                    <span className="block whitespace-nowrap text-[#d6b992]">remember.</span>
                  </span>
                </h1>

                <aside
                  className="max-w-xl border-t border-[#fbfbfa]/30 pt-5 lg:mb-2 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0"
                  aria-label="Selected proof metrics"
                >
                  <p className="font-sans text-sm font-medium leading-7 text-[#fffdf8]/90 [text-shadow:0_2px_16px_rgba(0,0,0,0.78)] sm:text-base sm:leading-8">
                    Full-Stack Product Engineer. Scoping, designing, and engineering high-impact digital experiences that deploy, perform, and endure.
                  </p>
                  <div className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-[10px] border border-[#fffdf8]/20 bg-[#fffdf8]/20" role="list">
                    {proofMetrics.map((metric) => (
                      <div key={metric.label} className="bg-[#11100e]/90 px-3 py-3 sm:px-4" role="listitem">
                        <span className="block font-hero text-2xl leading-none text-[#fffdf8] tabular-nums sm:text-3xl">
                          {metric.value}<span className="text-[#d6b992]">{metric.suffix}</span>
                        </span>
                        <span className="mt-1.5 block font-sans text-[10px] font-semibold uppercase tracking-[0.12em] text-[#fffdf8]/70 sm:text-xs">
                          {metric.shortLabel}
                        </span>
                      </div>
                    ))}
                  </div>
                </aside>
              </div>

              <div className="flex items-center justify-between gap-6 border-t border-[#fbfbfa]/30 pt-4 sm:pt-5" aria-hidden="true">
                <span className="font-sans text-[10px] font-semibold text-[#fffdf8]/80 [text-shadow:0_2px_12px_rgba(0,0,0,0.75)] sm:text-xs">
                  Scroll to explore work
                </span>
                <div className="relative h-px w-16 overflow-hidden bg-[#fbfbfa]/30 sm:w-24">
                  <div className="absolute inset-0 bg-[#d6b992]/70 animate-scroll-indicator" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-down {
          0% { transform: translateX(-100%); }
          80%, 100% { transform: translateX(100%); }
        }
        .animate-scroll-indicator {
          animation: scroll-down 2.5s cubic-bezier(0.16, 1, 0.3, 1) infinite;
        }
      `}</style>
    </section>
  );
}
