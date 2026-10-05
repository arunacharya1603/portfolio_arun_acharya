"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const navigation = [
  { name: "Work", href: "/work" },
  { name: "About", href: "/about" },
  { name: "Experience", href: "/experience" },
  { name: "Services", href: "/services" },
  { name: "Process", href: "/process" },
  { name: "Pricing", href: "/pricing" },
  { name: "FAQ", href: "/faq" },
  { name: "Proof", href: "/reviews" },
  { name: "Resources", href: "/resources" },
];

function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname() ?? "/";
  const { scrollY } = useScroll();
  const [open, setOpen] = useState(false);
  const [isAwayFromTop, setIsAwayFromTop] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const lastScrollYRef = useRef(0);
  const isHome = pathname === "/";

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = lastScrollYRef.current;
    const delta = current - previous;

    setIsAwayFromTop(current > 72);

    if (open || current <= 32) {
      setHeaderVisible(true);
    } else if (Math.abs(delta) > 2) {
      setHeaderVisible(delta < 0);
    }

    lastScrollYRef.current = current;
  });

  useEffect(() => {
    if (open) setHeaderVisible(true);
  }, [open]);

  useEffect(() => {
    setOpen(false);
    setIsAwayFromTop(scrollY.get() > 72);
    setHeaderVisible(true);
    lastScrollYRef.current = scrollY.get();
  }, [pathname, scrollY]);

  return (
    <motion.header
      initial={false}
      animate={{ y: headerVisible ? 0 : -120, opacity: headerVisible ? 1 : 0 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      onFocusCapture={() => setHeaderVisible(true)}
      className={`site-header z-50 px-3 pt-3 sm:px-5 sm:pt-4 ${
        isHome ? "fixed inset-x-0 top-0" : "sticky top-0"
      }`}
    >
      <div
        className={`mx-auto w-full max-w-[1480px] overflow-hidden rounded-[10px] border backdrop-blur-2xl transition-[background,border-color,box-shadow] duration-300 ${
          isAwayFromTop || open
            ? "border-[#f4efe3]/[0.14] bg-[#302b24]/[0.9] shadow-[0_18px_58px_rgba(0,0,0,0.34)]"
            : "border-[#f4efe3]/10 bg-[#302b24]/[0.74] shadow-[0_14px_42px_rgba(0,0,0,0.22)]"
        }`}
      >
        <nav
          className="flex min-w-0 items-center justify-between gap-2 px-2.5 py-2.5 sm:gap-4 sm:px-4 sm:py-3"
          aria-label="Primary navigation"
        >
          <Link
            href="/"
            className="group flex min-w-0 items-center gap-2.5 rounded-[6px] pr-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f4efe3] sm:gap-3"
            aria-label="Arun Acharya home"
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[7px] border border-[#f4efe3]/[0.12] bg-[#f4efe3] font-grotesk text-sm font-semibold text-[#0d0c09] shadow-[0_8px_24px_rgba(244,239,227,0.08)] transition group-hover:bg-[#fff8e8]">
              AA
            </span>
            <span className="min-w-0 leading-none">
              <span className="block truncate font-grotesk text-sm font-semibold text-[#f4efe3]/[0.95] sm:text-base">
                Arun Acharya
              </span>
              <span className="mt-1 block truncate text-xs text-[#f4efe3]/[0.66]">
                Full-Stack Product Engineer
              </span>
            </span>
          </Link>

          <div className="hidden items-center gap-1 xl:flex">
            {navigation.map((item) => {
              const active = isActivePath(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative rounded-[5px] px-2.5 py-2 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f4efe3] ${
                    active
                      ? "text-[#fffaf0] after:absolute after:inset-x-2.5 after:-bottom-0.5 after:h-px after:bg-[#d8c4a4]/[0.8]"
                      : "text-[#f4efe3]/[0.78] hover:bg-[#f4efe3]/[0.06] hover:text-[#fffaf0]"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          <Link
            href="/contact"
            className="group hidden items-center gap-2 rounded-[7px] bg-[#f4efe3] px-3.5 py-2.5 text-sm font-semibold text-[#0d0c09] shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition hover:bg-[#fff8e8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f4efe3] md:inline-flex"
          >
            Start Project
            <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[7px] border border-[#f4efe3]/[0.12] bg-[#f4efe3]/[0.06] text-[#f4efe3] transition hover:bg-[#f4efe3]/12 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f4efe3] xl:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="site-mobile-navigation"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        <AnimatePresence initial={false}>
          {open ? (
            <motion.div
              id="site-mobile-navigation"
              initial={{ opacity: 0, height: 0, y: -8 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -8 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="border-t border-[#f4efe3]/10 bg-[#211e19]/[0.54] xl:hidden"
            >
              <div className="grid gap-1 p-2 sm:grid-cols-2 sm:p-3">
                {navigation.map((item, index) => {
                  const active = isActivePath(pathname, item.href);

                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.18, delay: index * 0.02 }}
                    >
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={`group flex min-h-[52px] items-center justify-between gap-4 rounded-[7px] px-3.5 py-3 text-base font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f4efe3] ${
                          active
                            ? "bg-[#f4efe3]/12 text-[#f4efe3]"
                            : "text-[#f4efe3]/[0.78] hover:bg-[#f4efe3]/[0.07] hover:text-[#f4efe3]"
                        }`}
                      >
                        <span>{item.name}</span>
                        <ArrowUpRight className="h-4 w-4 text-[#f4efe3]/70 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Link>
                    </motion.div>
                  );
                })}
                <Link
                  href="/contact"
                  className="group mt-1 flex min-h-[52px] items-center justify-between rounded-[6px] bg-[#f4efe3] px-3.5 py-3 text-base font-semibold text-[#0d0c09] transition hover:bg-[#fff8e8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f4efe3] sm:col-span-2"
                >
                  Start Project
                  <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
