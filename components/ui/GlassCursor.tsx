"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export const GlassCursor = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 700 };
  const borderX = useSpring(cursorX, springConfig);
  const borderY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY, isVisible]);

  if (typeof window === "undefined") return null;

  return (
    <motion.div
      style={{
        left: borderX,
        top: borderY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        scale: isVisible ? 1 : 0 
      }}
      className="fixed pointer-events-none z-[9999] hidden md:block"
    >
      {/* Outer ring */}
      <div className="w-10 h-10 rounded-full border border-purple/30 backdrop-blur-[2px] flex items-center justify-center">
        {/* Inner dot */}
        <div className="w-1 h-1 rounded-full bg-purple" />
      </div>
      
      {/* Glow effect */}
      <div className="absolute inset-0 w-10 h-10 rounded-full bg-purple/10 blur-xl -z-10" />
    </motion.div>
  );
};
