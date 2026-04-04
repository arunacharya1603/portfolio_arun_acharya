import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaLocationArrow } from "react-icons/fa6";

export const GlassCard = ({
  title,
  des,
  img,
  iconLists,
  link,
  index,
}: {
  title: string;
  des: string;
  img: string;
  iconLists: string[];
  link: string;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.2, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative w-full lg:max-w-4xl overflow-hidden glass border-white/5 cursor-pointer"
      onClick={() => window.open(link, "_blank")}
    >
      <div className="flex flex-col lg:flex-row h-full w-full">
        {/* Project Image - Grayscale by default per Stitch spec */}
        <div className="relative w-full lg:w-3/5 h-64 lg:h-[450px] overflow-hidden">
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-black via-transparent to-transparent opacity-40" />
          <Image
            src={img}
            alt={title}
            fill
            className="object-cover transition-all duration-[800ms] ease-in-out grayscale group-hover:grayscale-0 group-hover:scale-105"
          />
        </div>

        {/* Content Block */}
        <div className="flex flex-col flex-1 p-8 lg:p-12 justify-center">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-[1px] bg-white-100/20" />
              <span className="text-[10px] text-white-100/40 uppercase tracking-[0.4em] font-sans font-semibold">
                Collection 0{index + 1}
              </span>
            </div>
            
            <h3 className="text-3xl lg:text-5xl font-bold font-grotesk text-white mb-6 tracking-tight leading-tight group-hover:text-purple/80 transition-colors duration-500">
              {title}
            </h3>
            
            <p className="text-white-100/60 font-sans text-base lg:text-lg leading-relaxed mb-10 font-light max-w-md">
              {des}
            </p>

            <div className="flex items-center justify-between mt-auto">
              {/* Tech Icons */}
              <div className="flex items-center">
                {iconLists.map((icon, i) => (
                  <div
                    key={i}
                    className="border border-white/5 rounded-full bg-black-200/50 w-10 h-10 flex justify-center items-center backdrop-blur-xl"
                    style={{ transform: `translateX(-${8 * i}px)` }}
                  >
                    <Image src={icon} alt="tech-icon" width={20} height={20} className="opacity-50 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>

              {/* Action Button - Generous padding per Stitch spec */}
              <div className="flex items-center gap-4 group/link">
                <span className="text-[10px] uppercase tracking-[0.3em] font-grotesk text-white/40 group-hover/link:text-white transition-all duration-500">
                  Case Narrative
                </span>
                <div className="p-4 bg-white/5 border border-white/10 group-hover/link:bg-white group-hover/link:border-white transition-all duration-500">
                  <FaLocationArrow size={14} className="text-white group-hover/link:text-black transform rotate-45" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Subtle hover glint */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
    </motion.div>
  );
};
