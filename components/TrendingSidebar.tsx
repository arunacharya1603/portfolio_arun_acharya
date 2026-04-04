import React from "react";
import { motion } from "framer-motion";
import { FaFireAlt, FaArrowRight } from "react-icons/fa";
import { projects } from "@/data";

const TrendingSidebar = () => {
  // Sort projects by "Trending" (just use the first 3 for now, pretend they are trending)
  const trendingProjects = projects.slice(0, 3);
  
  return (
    <div className="social-glass rounded-3xl p-8 flex flex-col gap-10 h-full border border-white/10 overflow-hidden relative group">
      {/* Glossy Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/5 to-transparent pointer-events-none" />
      
      {/* Trending Header */}
      <div className="flex items-center justify-between relative z-10">
        <h2 className="text-xl font-bold font-grotesk tracking-tight text-white flex items-center gap-3">
          <FaFireAlt className="text-orange-500" />
          Trending <span className="text-indigo-500">Wall</span>
        </h2>
      </div>

      {/* Trending Projects List */}
      <div className="flex flex-col gap-6 relative z-10">
        {trendingProjects.map((project, index) => (
          <TrendingCard key={project.id} project={project} index={index + 1} />
        ))}
      </div>

      {/* Tech Pulse Section */}
      <div className="flex flex-col gap-6 pt-10 border-t border-white/5 relative z-10">
        <h3 className="text-[10px] font-grotesk uppercase tracking-[0.4em] text-white/30 font-bold mb-2">Tech Pulse</h3>
        <div className="flex flex-wrap gap-2">
            <TechBadge label="React" />
            <TechBadge label="Next.js" />
            <TechBadge label="TypeScript" />
            <TechBadge label="Framer Motion" />
            <TechBadge label="Node.js" />
        </div>
      </div>
    </div>
  );
};

const TrendingCard = ({ project, index }: { project: any; index: number }) => (
  <a 
    href={project.link} 
    target="_blank" 
    rel="noopener noreferrer"
    className="group/card flex items-start gap-4 p-4 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/5 transition-all duration-300"
  >
    <div className="flex flex-col items-center gap-1 group/index">
       <span className="text-[10px] font-bold font-grotesk text-white/30 group-hover/card:text-indigo-500 transition-colors uppercase tracking-widest">0{index}</span>
       <div className="w-[1px] h-6 bg-white/10 group-hover/card:bg-indigo-500/30" />
    </div>
    
    <div className="flex-1">
      <h4 className="text-sm font-bold font-grotesk text-white mb-2 leading-tight group-hover/card:text-indigo-400 transition-colors">
        {project.title}
      </h4>
      <div className="flex items-center justify-between text-[10px] text-white/40 font-grotesk uppercase tracking-widest font-bold">
        <span>Web App</span>
        <FaArrowRight className="opacity-0 group-hover/card:opacity-100 group-hover/card:translate-x-1 transition-all" />
      </div>
    </div>
  </a>
);

const TechBadge = ({ label }: { label: string }) => (
  <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-grotesk font-bold text-white/40 border border-white/5 hover:border-indigo-500/30 hover:text-indigo-400 transition-all cursor-default">
    {label}
  </span>
);

export default TrendingSidebar;
