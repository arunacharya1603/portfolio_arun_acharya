"use client";

import { useLayoutEffect, useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function CinematicHero({ onLoadProgress }: { onLoadProgress?: (p: number) => void }) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const climaxRef = useRef<HTMLDivElement>(null);

  const frameCount = 301; // 150 scrollstory frames + 151 hero frames
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const activeFrameRef = useRef(0);
  const [framesPreloaded, setFramesPreloaded] = useState(false);

  // Preload all frames from public/scrollstory/
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    const handleImageLoad = () => {
      loadedCount++;
      const percent = Math.floor((loadedCount / frameCount) * 100);
      if (onLoadProgress) {
        onLoadProgress(percent);
      }
      if (loadedCount === frameCount) {
        setFramesPreloaded(true);
      }
    };

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      const numStr = i.toString().padStart(3, "0");
      img.src = `/scrollstory/ezgif-frame-${numStr}.webp`;
      img.onload = handleImageLoad;
      img.onerror = handleImageLoad; // prevent getting stuck on error
      loadedImages.push(img);
    }

    imagesRef.current = loadedImages;
  }, [onLoadProgress]);

  // Aspect-ratio cover drawing logic (canvas replica of object-cover)
  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const img = imagesRef.current[index];
    if (!img || !img.complete) return;

    // Handle high-DPI scaling (retina display resolution)
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const imgRatio = img.width / img.height;
    const canvasRatio = canvas.width / canvas.height;
    let drawWidth = canvas.width;
    let drawHeight = canvas.height;
    let offsetX = 0;
    let offsetY = 0;

    if (imgRatio > canvasRatio) {
      // Image is wider than canvas
      drawWidth = canvas.height * imgRatio;
      offsetX = (canvas.width - drawWidth) / 2;
    } else {
      // Image is taller than canvas
      drawHeight = canvas.width / imgRatio;
      offsetY = (canvas.height - drawHeight) / 2;
    }

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  // Redraw active frame on window resize
  useEffect(() => {
    const handleResize = () => {
      drawFrame(activeFrameRef.current);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [framesPreloaded]);

  // Initial draw of first frame once loaded
  useEffect(() => {
    if (imagesRef.current[0]) {
      const firstImg = imagesRef.current[0];
      if (firstImg.complete) {
        drawFrame(0);
      } else {
        firstImg.onload = () => drawFrame(0);
      }
    }
  }, [framesPreloaded]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      // If user prefers reduced motion, skip scroll narrative and show climax immediately
      if (prefersReducedMotion) {
        gsap.set(climaxRef.current, { opacity: 1, y: 0 });
        gsap.set(curtainRef.current, { clipPath: "inset(0% 0% 0% 0%)" });
        gsap.set(".studio-header", { opacity: 1, pointerEvents: "auto" });
        return;
      }

      // Hide header immediately at start
      gsap.set(".studio-header", { opacity: 0, pointerEvents: "none" });

      const frameObj = { frame: 0 };

      // Create scroll narrative timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=400%", // Scroll pin depth for 301 frames
          pin: true,
          pinSpacing: true,
          scrub: 0.8, // tight, responsive scrubbing
          refreshPriority: 10,
        },
      });

      tl
        // Scrub through all 301 frames sequentially
        .to(frameObj, {
          frame: frameCount - 1,
          snap: "frame", // snap to integer frame index
          ease: "none",
          duration: 4,
          onUpdate: () => {
            activeFrameRef.current = frameObj.frame;
            drawFrame(frameObj.frame);
          },
        }, 0)
        // Zoom and darken overlay slightly to enhance text readability as we scroll
        .to(canvasRef.current, { scale: 1.06, ease: "none", duration: 4 }, 0)
        .to(overlayRef.current, { opacity: 0.75, ease: "none", duration: 4 }, 0)

        // Curtain: Rise up from bottom to top, blurring and darkening the background
        .to(curtainRef.current, {
          clipPath: "inset(0% 0% 0% 0%)",
          ease: "power2.out",
          duration: 1.5,
        }, "-=0.6")

        // Climax State Reveal
        .to(climaxRef.current, { opacity: 1, y: 0, duration: 1.5 }, "-=1.1")
        // Fade in header and restore interaction
        .to(".studio-header", { opacity: 1, pointerEvents: "auto", duration: 0.8 }, "-=0.8");
    }, sectionRef);

    return () => {
      ctx.revert();
      // Ensure header visibility is restored if we leave the page
      gsap.set(".studio-header", { opacity: 1, pointerEvents: "auto" });
    };
  }, [framesPreloaded]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#0e0d0c] overflow-hidden"
      aria-label="Cinematic Canvas Hero"
    >
      {/* Pinned Sticky Wrapper */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Background Hardware-Accelerated Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover scale-100"
          style={{ willChange: "transform" }}
        />

        {/* Cinematic Vignette & Shadow Overlay */}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-gradient-to-b from-[#0e0d0c]/70 via-[#0e0d0c]/40 to-[#0e0d0c] opacity-55 z-10 pointer-events-none"
        />

        {/* Curtain Blur Overlay (rises from bottom to top to blur the background under the climax text) */}
        <div
          ref={curtainRef}
          className="absolute inset-0 bg-[#0e0d0c]/65 backdrop-blur-xl z-15 pointer-events-none"
          style={{ clipPath: "inset(100% 0% 0% 0%)", willChange: "clip-path" }}
        />

        {/* Climax Content Layer */}
        <div className="relative z-20 w-full max-w-[1480px] mx-auto px-4 sm:px-6 h-full flex items-center justify-center">
          
          {/* Climax State: Hero Landing Resolution */}
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

            {/* Scroll Indicator */}
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
