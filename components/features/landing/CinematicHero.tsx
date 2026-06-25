"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const FRAME_COUNT = 301;
const FIRST_SCROLL_FRAMES = 60;
const KEYFRAME_STEP = 6;
const READY_STARTER_COUNT = 36;
const MAX_PARALLEL_LOADS = 5;
const LOG_EVERY_N_FRAMES = 10;

type FrameStatus = "idle" | "queued" | "loading" | "loaded" | "error";
type FrameSet = "desktop" | "tablet" | "mobile";

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
  const imagesRef = useRef<(HTMLImageElement | null)[]>(Array(FRAME_COUNT).fill(null));
  const statusesRef = useRef<FrameStatus[]>(Array(FRAME_COUNT).fill("idle"));
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
        if (!isMountedRef.current) return;

        if (status === "loaded") {
          try {
            await img.decode?.();
          } catch {
            // The image is still usable after onload even when decode() is unsupported or rejects.
          }
          imagesRef.current[frameIndex] = img;
          loadedImageCountRef.current += 1;
          logLoadedImageCount();
        }

        statusesRef.current[frameIndex] = status;
        activeLoadsRef.current = Math.max(0, activeLoadsRef.current - 1);

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
    frameSetRef.current = getResponsiveFrameSet();
    resizeCanvas();

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
        gsap.set(".studio-header", { opacity: 1, pointerEvents: "auto" });
        enqueueFrame(FRAME_COUNT - 1, true);
        return;
      }

      gsap.set(".studio-header", { opacity: 0, pointerEvents: "none" });

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
        .to(climaxRef.current, { opacity: 1, y: 0, duration: 1.5 }, "-=1.1")
        .to(
          ".studio-header",
          { opacity: 1, pointerEvents: "auto", duration: 0.8 },
          "-=0.8"
        );
    }, sectionRef);

    return () => {
      ctx.revert();
      gsap.set(".studio-header", { opacity: 1, pointerEvents: "auto" });
    };
    // ScrollTrigger is created once for this pinned section; refs keep frame drawing current.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#0e0d0c] overflow-hidden"
      aria-label="Cinematic canvas hero"
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover scale-100"
          style={{ willChange: "transform" }}
        />

        <div
          ref={overlayRef}
          className="absolute inset-0 opacity-100 z-10 pointer-events-none"
        />

        <div
          ref={curtainRef}
          className="absolute inset-0 bg-[#0e0d0c]/65 backdrop-blur-xl z-15 pointer-events-none"
          style={{ clipPath: "inset(100% 0% 0% 0%)", willChange: "clip-path" }}
        />

        <div className="relative z-20 w-full max-w-[1480px] mx-auto px-4 sm:px-6 h-full flex items-center justify-center">
          <div
            ref={climaxRef}
            className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center opacity-0 translate-y-6"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-[#bfa17f] mb-4 font-sans font-semibold">
              Arun Acharya
            </span>
            <h1 className="font-grotesk text-[clamp(2.5rem,8vw,7.5rem)] font-semibold uppercase leading-[0.85] text-[#fbfbfa] tracking-tighter max-w-5xl">
              I Build Products<br />That People Remember.
            </h1>
            <p className="mt-8 text-base md:text-lg text-[#fbfbfa]/60 max-w-2xl font-sans font-light leading-relaxed">
              Frontend Developer & Product Builder. Scoping, designing, and engineering high-impact digital experiences that deploy, perform, and endure.
            </p>

            <div className="absolute bottom-10 flex flex-col items-center gap-2 pointer-events-none" aria-hidden="true">
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#fbfbfa]/40 font-sans">
                Scroll to explore work
              </span>
              <div className="w-px h-8 bg-[#fbfbfa]/15 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[#bfa17f]/50 animate-scroll-indicator" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-down {
          0% { transform: translateY(-100%); }
          80%, 100% { transform: translateY(100%); }
        }
        .animate-scroll-indicator {
          animation: scroll-down 2.5s cubic-bezier(0.16, 1, 0.3, 1) infinite;
        }
      `}</style>
    </section>
  );
}