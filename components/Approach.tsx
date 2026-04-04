"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaFingerprint, FaLayerGroup, FaBolt } from "react-icons/fa";

interface MethodStepProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  order: string;
  color: string;
}

const MethodStep = ({ icon, title, desc, order, color }: MethodStepProps) => (
  <div className="flex flex-col md:flex-row items-start gap-8 group">
    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-xl text-white shadow-lg shrink-0 relative z-20 group-hover:scale-110 transition-transform duration-500`}>
       {icon}
    </div>
    <div className="flex-1">
       <div className="flex items-center gap-3 mb-2">
          <span className="text-[10px] font-grotesk font-bold uppercase tracking-widest text-indigo-500">{order}</span>
          <h3 className="text-xl font-bold font-grotesk text-white">{title}</h3>
       </div>
       <p className="text-sm text-white/50 leading-relaxed font-sans max-w-lg">
         {desc}
       </p>
    </div>
  </div>
);

const Approach = () => {
  return (
    <div className="w-full relative" id="approach">
      <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
        <div className="px-4 mb-4">
           <h2 className="text-[10px] font-grotesk font-bold uppercase tracking-[0.4em] text-white/30">Engineering Philosophy &bull; The Methodology</h2>
        </div>

        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="social-glass rounded-[32px] p-10 border border-white/10 relative overflow-hidden"
        >
          {/* Thread Connector Line */}
          <div className="absolute left-14 top-24 bottom-24 w-[1px] bg-gradient-to-b from-indigo-500/50 via-purple-500/20 to-transparent hidden md:block" />

          <div className="flex flex-col gap-16 relative z-10">
            <MethodStep 
              icon={<FaFingerprint />}
              title="Strategic Research"
              order="Step 01"
              color="from-indigo-500 to-blue-500"
              desc="We begin by deconstructing the core objective. Every pixel must serve a purpose, every interaction must feel intentional. This is where architecture meets human psychology."
            />
            
            <MethodStep 
              icon={<FaLayerGroup />}
              title="Material Design"
              order="Step 02"
              color="from-purple-500 to-pink-500"
              desc="Transforming abstract concepts into tangible digital materials. We utilize Glassmorphism, tailored motion paths, and high-density information layouts to ensure a premium feel."
            />

            <MethodStep 
              icon={<FaBolt />}
              title="Precision Engineering"
              order="Step 03"
              color="from-orange-500 to-red-500"
              desc="Clean code, hyper-performance, and surgical deployment. We build for scale and speed, ensuring the final materialization is indistinguishable from magic."
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Approach;
