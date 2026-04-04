import React from "react";
import { motion } from "framer-motion";
import { workExperience } from "@/data";
import Image from "next/image";

const Experience = () => {
  return (
    <div className="w-full relative" id="experience">
      <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
        <div className="px-4 mb-4">
           <h2 className="text-[10px] font-grotesk font-bold uppercase tracking-[0.4em] text-white/30">Career Highlights &bull; Experience Logs</h2>
        </div>

        {workExperience.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="social-glass rounded-3xl p-8 border border-white/10 relative group hover:border-white/20 transition-all transition-duration-500"
          >
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="w-16 h-16 rounded-2xl social-glass border border-white/10 p-3 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Image
                  src={card.thumbnail}
                  alt={card.title}
                  width={40}
                  height={40}
                  className="object-contain opacity-40 group-hover:opacity-100 transition-opacity"
                />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                   <h3 className="text-lg font-bold font-grotesk text-white leading-tight">
                    {card.title}
                  </h3>
                  <span className="text-[9px] font-grotesk uppercase tracking-widest text-indigo-500 font-bold">Log 0{index + 1}</span>
                </div>
                <p className="text-sm text-white/50 font-sans leading-relaxed">
                  {card.desc}
                </p>
                <div className="mt-4 flex items-center gap-2">
                   <div className="w-1 h-1 rounded-full bg-indigo-500/50" />
                   <span className="text-[9px] font-grotesk uppercase tracking-[0.2em] text-white/20">Professional Milestone &bull; 2022-2026</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
