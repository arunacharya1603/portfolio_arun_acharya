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

  // set true for the initial state so that nav bar is visible in the hero section
  const [visible, setVisible] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        // also set true for the initial state
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
    // Only run on client side
    if (typeof window === "undefined") return;
    const targetId = link.replace("#", "");
    const element = document.getElementById(targetId);

    if (element) {
      const navbarHeight = 100; // Fixed navbar height + padding
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
          initial={{
            opacity: 1,
            y: -100,
          }}
          animate={{
            y: visible ? 0 : -100,
            opacity: visible ? 1 : 0,
          }}
          exit={{
            y: -100,
            opacity: 0,
          }}
          transition={{
            duration: 0.2,
          }}
          className={cn(
            "flex max-w-fit fixed bottom-10 inset-x-0 mx-auto z-[5000] px-3 sm:px-6 py-3 border items-center justify-center gap-3 sm:gap-6 bg-gradient-to-br from-purple-500 to-pink-500 backdrop-blur-xl hover:bg-gradient-to-br hover:from-sky-500 hover:to-purple-500 rounded-full",
            className
          )}
        >
          {navItems.map((navItem: any, idx: number) => (
            <Link
              key={`link=${idx}`}
              href={navItem.link}
              onClick={(e) => handleClick(e, navItem.link)}
              className={cn(
                "relative text-neutral-50 items-center flex space-x-1 hover:text-black-100 transition-colors duration-200"
              )}
            >
              <span className="block sm:hidden">{navItem.icon}</span>
              <span className="text-sm sm:text-base font-medium cursor-pointer whitespace-nowrap">
                {navItem.name}
              </span>
            </Link>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
