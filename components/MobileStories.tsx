"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaFireAlt, FaCode, FaBriefcase, FaCompass, FaStar, FaEnvelope } from "react-icons/fa";

const stories = [
  { icon: <FaFireAlt className="text-sm" />, label: "Trending", href: "#projects" },
  { icon: <FaCode className="text-sm" />, label: "Projects", href: "#projects" },
  { icon: <FaBriefcase className="text-sm" />, label: "Experience", href: "#experience" },
  { icon: <FaCompass className="text-sm" />, label: "Approach", href: "#approach" },
  { icon: <FaStar className="text-sm" />, label: "Reviews", href: "#testimonials" },
  { icon: <FaEnvelope className="text-sm" />, label: "Contact", href: "#contact" },
];

const MobileStories = () => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      const navbarHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <div className="lg:hidden w-full">
      <div className="flex gap-5 overflow-x-auto pb-2 scrollbar-hide px-1">
        {stories.map((story, index) => (
          <motion.a
            key={story.label}
            href={story.href}
            onClick={(e) => handleClick(e, story.href)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-1.5 shrink-0 group"
          >
            {/* Unified indigo/purple gradient ring — matches Stitch design */}
            <div className="w-[52px] h-[52px] rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 p-[2px] group-active:scale-90 transition-transform">
              <div className="w-full h-full rounded-full bg-black p-[2px]">
                <div className="w-full h-full rounded-full bg-[#191919] flex items-center justify-center text-white/60">
                  {story.icon}
                </div>
              </div>
            </div>
            <span className="text-[9px] font-grotesk text-white/30 tracking-wider">
              {story.label}
            </span>
          </motion.a>
        ))}
      </div>
    </div>
  );
};

export default MobileStories;
