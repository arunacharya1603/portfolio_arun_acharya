"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export function SmoothScroll() {
  const pathname = usePathname();
  const instance = useRef<Lenis | null>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    function updateMotionPreference() {
      instance.current?.destroy();
      instance.current = reducedMotion.matches
        ? null
        : new Lenis({
            autoRaf: true,
            smoothWheel: true,
            syncTouch: true,
            stopInertiaOnNavigate: true,
            prevent: (node) =>
              node.matches("input, textarea, select, [contenteditable='true']"),
          });
    }

    function stopMomentum() {
      instance.current?.scrollTo(window.scrollY, { immediate: true });
    }

    function scrollToSection(event: MouseEvent) {
      const lenis = instance.current;
      if (
        !lenis || event.defaultPrevented || event.button !== 0 ||
        event.metaKey || event.ctrlKey || event.shiftKey || event.altKey
      ) return;

      const link = event.target instanceof Element
        ? event.target.closest<HTMLAnchorElement>("a[href]")
        : null;
      if (
        !link || link.hasAttribute("download") ||
        (link.target && link.target !== "_self")
      ) return;

      const url = new URL(link.href);
      if (
        url.origin !== location.origin || url.pathname !== location.pathname ||
        url.search !== location.search || !url.hash
      ) return;

      let target: HTMLElement | null;
      try {
        target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      } catch {
        return;
      }
      if (!target) return;

      // Capture same-page links before Next.js or the browser jumps to the hash.
      event.preventDefault();
      if (location.hash !== url.hash) history.pushState(history.state, "", url);
      if (!target.hasAttribute("tabindex")) {
        target.setAttribute("tabindex", "-1");
        target.addEventListener("blur", () => target.removeAttribute("tabindex"), { once: true });
      }
      target.focus({ preventScroll: true });
      lenis.scrollTo(target);
    }

    updateMotionPreference();
    reducedMotion.addEventListener("change", updateMotionPreference);
    document.addEventListener("click", scrollToSection, true);
    window.addEventListener("popstate", stopMomentum);

    return () => {
      reducedMotion.removeEventListener("change", updateMotionPreference);
      document.removeEventListener("click", scrollToSection, true);
      window.removeEventListener("popstate", stopMomentum);
      instance.current?.destroy();
      instance.current = null;
    };
  }, []);

  useEffect(() => {
    // Keep Next.js scroll restoration while discarding the previous page's inertia.
    instance.current?.resize();
    instance.current?.scrollTo(window.scrollY, { immediate: true });
  }, [pathname]);

  return null;
}
