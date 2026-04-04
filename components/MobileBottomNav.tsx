"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineViewGrid, HiOutlineSearch, HiOutlineLightningBolt, HiOutlineUser } from "react-icons/hi";

const navItems = [
  { id: "home", icon: <HiOutlineViewGrid className="text-xl" />, href: "#home" },
  { id: "projects", icon: <HiOutlineSearch className="text-xl" />, href: "#projects" },
  { id: "experience", icon: <HiOutlineLightningBolt className="text-xl" />, href: "#experience" },
  { id: "contact", icon: <HiOutlineUser className="text-xl" />, href: "#contact" },
];

const MobileBottomNav = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);

      const sections = ["contact", "experience", "projects", "home"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      const navbarHeight = 20;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="lg:hidden fixed bottom-0 left-0 right-0 z-[5000] pb-safe"
        >
          {/* Frosted glass — minimal 4-icon bar matching Stitch design */}
          <div className="mx-4 mb-3 rounded-2xl bg-[#131313]/90 backdrop-blur-[40px] border border-white/[0.06] shadow-[0_-4px_30px_rgba(0,0,0,0.5)]">
            <div className="flex items-center justify-around py-3">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={(e) => handleClick(e, item.href)}
                    className={`relative p-2 rounded-xl transition-all duration-300 ${
                      isActive
                        ? "text-indigo-400"
                        : "text-white/20 active:text-white/40"
                    }`}
                  >
                    {item.icon}
                    {isActive && (
                      <motion.div
                        layoutId="mobile-bottom-indicator"
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-indigo-500"
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default MobileBottomNav;
