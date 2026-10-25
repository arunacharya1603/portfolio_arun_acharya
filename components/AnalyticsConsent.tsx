"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  analyticsConsentKey,
  analyticsPreferencesEvent,
  applyAnalyticsConsent,
  readAnalyticsConsent,
  saveAnalyticsConsent,
  trackPageView,
} from "@/lib/analytics";

export function AnalyticsPreferencesButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(analyticsPreferencesEvent))}
      className="min-h-11 text-left hover:text-brand"
    >
      Analytics preferences
    </button>
  );
}

export function AnalyticsConsent() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [choice, setChoice] = useState<"granted" | "denied" | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    function restore() {
      const saved = readAnalyticsConsent();
      applyAnalyticsConsent(saved);
      setChoice(saved);
      setVisible(saved === null);
    }
    function open() {
      returnFocus.current = document.activeElement as HTMLElement;
      setVisible(true);
      requestAnimationFrame(() => heading.current?.focus());
    }
    function sync(event: StorageEvent) {
      if (event.key === analyticsConsentKey || event.key === null) restore();
    }
    restore();
    window.addEventListener(analyticsPreferencesEvent, open);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(analyticsPreferencesEvent, open);
      window.removeEventListener("storage", sync);
    };
  }, []);

  useEffect(() => {
    if (choice === "granted" && pathname) trackPageView(pathname);
  }, [pathname, choice]);

  function choose(value: "granted" | "denied") {
    saveAnalyticsConsent(value);
    setChoice(value);
    setVisible(false);
    returnFocus.current?.focus();
  }

  if (!visible) return null;

  return (
    <section
      id="analytics-preferences"
      aria-labelledby="analytics-heading"
      className="fixed inset-x-3 bottom-3 z-[80] mx-auto max-w-4xl rounded-2xl border border-line bg-surface/95 p-5 text-ink shadow-showcase backdrop-blur-xl sm:inset-x-6 sm:flex sm:items-center sm:gap-6 sm:p-6"
    >
      <div className="flex-1">
        <h2 id="analytics-heading" ref={heading} tabIndex={-1} className="text-sm font-bold">
          A small choice about analytics
        </h2>
        <p className="mt-2 text-xs leading-6 text-subtle">
          With your permission, Google Analytics measures page visits, button clicks
          and successful inquiries. Your form details stay out of analytics. You can change this
          choice in the footer. <Link href="/privacy" className="font-semibold text-brand underline underline-offset-4">Privacy details</Link>
        </p>
      </div>
      <div className="mt-4 flex shrink-0 gap-3 sm:mt-0 sm:flex-col">
        <button type="button" onClick={() => choose("granted")} className="min-h-11 flex-1 rounded-xl border border-brand/25 bg-brand-soft px-5 py-3 text-xs font-semibold text-brand hover:bg-brand/15">
          Allow analytics
        </button>
        <button type="button" onClick={() => choose("denied")} className="min-h-11 flex-1 rounded-xl border border-line bg-surface px-5 py-3 text-xs font-semibold text-ink hover:bg-canvas">
          No thanks
        </button>
      </div>
    </section>
  );
}
