"use client";

import React from "react";
import { testimonials } from "@/data";
import { motion } from "framer-motion";

const Clients = () => {
  return (
    <div className="w-full relative" id="testimonials">
      <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto pb-10">
        <div className="px-4 mb-4">
           <h2 className="text-[10px] font-grotesk font-bold uppercase tracking-[0.4em] text-white/30">Social Proof &bull; Endorsement Logs</h2>
        </div>

        <div className="flex flex-col gap-6">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="social-glass rounded-3xl p-8 border border-white/10 relative group hover:border-white/20 transition-all shadow-xl"
            >
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center shrink-0">
                   <span className="text-white/40 font-bold font-grotesk text-xs">{item.name.charAt(0)}</span>
                </div>
                <div className="flex-1">
                   <p className="text-sm text-white/70 italic font-sans leading-relaxed mb-4">
                    "{item.quote}"
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold font-grotesk text-white">{item.name}</h4>
                      <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold">{item.title}</p>
                    </div>
                    <span className="text-[9px] font-grotesk uppercase tracking-widest text-indigo-500 font-bold">Endorsement</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Clients;
