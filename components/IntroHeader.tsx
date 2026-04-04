"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaPaperPlane } from "react-icons/fa";

const IntroHeader = () => {
  return (
    <div className="w-full relative pt-6 md:pt-8 lg:pt-5 z-[60]">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="w-full"
      >
        <div className="social-glass rounded-3xl p-5 md:p-8 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden group">
           {/* Subtle Background Glow */}
           <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/5 to-transparent pointer-events-none" />
           <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />
           
           <div className="flex items-center gap-6 relative z-10 w-full md:w-auto">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-500">
                 <FaPaperPlane className="text-lg" />
              </div>
              <div className="flex flex-col">
                 <p className="text-[10px] font-grotesk font-bold uppercase tracking-[0.4em] text-indigo-500 mb-1">Collaborative Materialization &bull; 2026</p>
                 <h2 className="text-lg md:text-2xl font-bold font-grotesk text-white tracking-tight leading-none">
                    Ready to convert your <span className="text-white">ideas</span> into <span className="text-indigo-400 italic">real-world solutions?</span>
                 </h2>
              </div>
           </div>

           <div className="flex items-center gap-6 relative z-10 w-full md:w-auto shrink-0">
              <div className="hidden sm:flex flex-col items-end">
                 <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full bg-green-500 pulse-active" />
                    <span className="text-[10px] font-grotesk font-bold text-white/50 uppercase tracking-widest">Available Now</span>
                 </div>
                 <p className="text-[9px] text-white/20 font-sans">Select commissions only</p>
              </div>

              <button 
                onClick={() => {
                  const element = document.getElementById('contact');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group/btn relative px-8 py-4 overflow-hidden rounded-2xl bg-white text-black font-grotesk font-bold text-xs uppercase tracking-widest transition-all duration-500 hover:pr-12 active:scale-95 shadow-xl shadow-white/5"
              >
                 <span className="relative z-10">Initialize Project</span>
                 <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover/btn:opacity-100 transition-all duration-500 translate-x-2 group-hover/btn:translate-x-0">
                    &rarr;
                 </div>
              </button>
           </div>
        </div>
      </motion.div>
    </div>
  );
};

export default IntroHeader;
