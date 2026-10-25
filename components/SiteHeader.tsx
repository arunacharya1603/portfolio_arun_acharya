"use client";

import { GlassLink } from "@/components/ui/glass-link";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowUpRight, CalendarDays, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { LiquiGlass } from "@liqui-design/glass";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { cardGlass } from "@/lib/glass";
import { siteConfig } from "@/lib/site";
import { textLinkStyles } from "@/components/ui/control-styles";
import { trackClick } from "@/lib/analytics";

const navigation = [
  { name: "Work", href: "/work" },
  { name: "Packages", href: "/packages" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Pricing", href: "/pricing" },
  { name: "Blog", href: "/blog" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLElement>(null);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    }
    function closeOnOutsidePointer(event: PointerEvent) {
      if (!headerRef.current?.contains(event.target as Node)) setOpen(false);
    }
    // Clear the disclosure state when the full navigation becomes visible.
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOnOutsidePointer);
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOnOutsidePointer);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [open]);

  function navLink(item: (typeof navigation)[number], mobile = false) {
    const active =
      pathname === item.href || pathname?.startsWith(`${item.href}/`);
    return (
      <Link
        key={item.href}
        href={item.href}
        aria-current={active ? "page" : undefined}
        onClick={() => setOpen(false)}
        className={cn(
          "rounded-md font-medium transition-colors hover:bg-brand-soft hover:text-brand",
          mobile
            ? "flex min-h-12 items-center justify-between px-4 text-base"
            : "px-4 py-3 text-sm",
          active ? "bg-brand-soft text-brand" : "text-subtle",
        )}
      >
        {item.name}
        {mobile && <ArrowUpRight aria-hidden="true" className="h-4 w-4" />}
      </Link>
    );
  }

  return (
    <header
      ref={headerRef}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
      className="sticky top-0 z-50 px-3 py-3 sm:px-6 sm:py-4"
    >
      <a
        href="#main-content"
        className="sr-only rounded-lg bg-brand px-5 py-3 text-primary-foreground focus:not-sr-only focus:absolute focus:left-5 focus:top-4 focus:z-50"
      >
        Skip to content
      </a>
      <LiquiGlass
        {...cardGlass}
        radius={16}
        blur={2}
        frost={0.35}
        bezel={18}
        className="liquid-navigation mx-auto max-w-site rounded-lg"
      >
        <nav
          aria-label="Primary navigation"
          className="flex h-[72px] items-center justify-between gap-4 px-4 sm:px-6"
        >
          <Link
            href="/"
            aria-label="Arun Acharya home"
            className="flex shrink-0 items-center gap-3"
          >
            <Image
              src="/brand/arun-graphic-logo-v2-transparent.png"
              alt=""
              width={48}
              height={48}
              sizes="48px"
              priority
              className="h-12 w-12 shrink-0 object-contain"
            />
            <span className="text-sm font-bold tracking-tight sm:text-base">
              Arun Acharya
            </span>
          </Link>
          <div className="hidden items-center gap-1 lg:flex">
            {navigation.map((item) => navLink(item))}
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className={textLinkStyles("hidden xl:inline-flex")}
              onClick={() => trackClick("start_project_click", "header")}
              onAuxClick={(event) => {
                if (event.button === 1) trackClick("start_project_click", "header");
              }}
            >
              Start Project
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </Link>
            <GlassLink
              href={siteConfig.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant={"primary"}
              className={"hidden shrink-0 sm:inline-flex"}
              analyticsEvent="book_call_click"
              analyticsLocation="header"
            >
              <CalendarDays aria-hidden="true" className="h-4 w-4" />
              Book a call
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              <span className="sr-only"> (opens in a new tab)</span>
            </GlassLink>
            <Button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="site-mobile-navigation"
              glass={{
                radius: 14,
                contentClassName: "h-full w-full !p-0",
              }}
              className="h-12 w-12 text-ink lg:hidden"
            >
              {open ? (
                <X aria-hidden="true" className="h-5 w-5" />
              ) : (
                <Menu aria-hidden="true" className="h-5 w-5" />
              )}
            </Button>
          </div>
        </nav>
        {open && (
          <nav
            id="site-mobile-navigation"
            data-lenis-prevent
            aria-label="Mobile navigation"
            className="absolute inset-x-0 top-[calc(100%+0.5rem)] z-10 max-h-[calc(100dvh-7rem)] overflow-y-auto overscroll-contain rounded-lg border border-line bg-surface p-4 shadow-xl lg:hidden"
          >
            <div className="mx-auto grid max-w-3xl gap-1 sm:grid-cols-2">
              {navigation.map((item) => navLink(item, true))}
              <GlassLink
                href="/contact"
                onClick={() => setOpen(false)}
                className="mt-3 sm:col-start-1"
                analyticsEvent="start_project_click"
                analyticsLocation="mobile_menu"
              >
                Start Project
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </GlassLink>
              <GlassLink
                href={siteConfig.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                variant="primary"
                className="mt-2 sm:mt-3"
                analyticsEvent="book_call_click"
                analyticsLocation="mobile_menu"
              >
                <CalendarDays aria-hidden="true" className="h-4 w-4" />
                Book a call
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                <span className="sr-only"> (opens in a new tab)</span>
              </GlassLink>
            </div>
          </nav>
        )}
      </LiquiGlass>
    </header>
  );
}
