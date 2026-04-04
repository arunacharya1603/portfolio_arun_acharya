"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    link: string
  ) => {
    e.preventDefault();
    if (typeof window === "undefined") return;
    const targetId = link.replace("#", "");
    const element = document.getElementById(targetId);

    if (element) {
      const navbarHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <AnimatePresence mode="wait">
      {visible && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{
              y: visible ? 0 : 50,
              opacity: visible ? 1 : 0,
              scale: 1
            }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "flex max-w-fit fixed bottom-10 inset-x-0 mx-auto z-[5000] px-10 py-5 border border-white/5 items-center justify-center gap-10 glass rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.5)]",
              className
            )}
          >
            {/* Signature Edge Glint (Stitch Spec) */}
            <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            
            {navItems.map((navItem: any, idx: number) => (
              <Link
                key={`link-${idx}`}
                href={navItem.link}
                onClick={(e) => handleClick(e, navItem.link)}
                className={cn(
                  "relative text-white-100/60 items-center flex space-x-1 hover:text-white transition-all duration-500 font-grotesk tracking-widest uppercase text-[10px]"
                )}
              >
                <span className="block sm:hidden">{navItem.icon}</span>
                <span className="hidden sm:block cursor-pointer whitespace-nowrap">
                  {navItem.name}
                </span>
                {/* Active Indicator Hover Effect */}
                <motion.div 
                  className="absolute -bottom-2 left-0 right-0 h-[1px] bg-purple opacity-0 transition-opacity"
                  whileHover={{ opacity: 0.4 }}
                />
              </Link>
            ))}
          </motion.div>
      )}
    </AnimatePresence>
  );
};
