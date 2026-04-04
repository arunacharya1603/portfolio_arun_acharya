"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaReact, FaHtml5, FaCss3Alt, FaGithub, FaGitAlt } from "react-icons/fa";
import { SiTypescript, SiJavascript, SiNextdotjs, SiTailwindcss, SiRedux, SiBootstrap, SiVercel } from "react-icons/si";
import { TbApi } from "react-icons/tb";
import { FiCode, FiLayers, FiDatabase, FiCpu, FiTool, FiZap } from "react-icons/fi";

const techCategories = [
  {
    id: 1,
    title: "Languages",
    icon: <FiCode className="text-blue-400" />,
    description: "Core building blocks for high-performance applications.",
    items: [
      { name: "JavaScript (ES6+)", icon: <SiJavascript className="text-yellow-400" /> },
      { name: "TypeScript", icon: <SiTypescript className="text-blue-400" /> },
      { name: "HTML5", icon: <FaHtml5 className="text-orange-500" /> },
      { name: "CSS3", icon: <FaCss3Alt className="text-blue-500" /> },
    ]
  },
  {
    id: 2,
    title: "Frameworks & Libraries",
    icon: <FiLayers className="text-purple-400" />,
    description: "Modern architectures for scalable web development.",
    items: [
      { name: "React.js", icon: <FaReact className="text-cyan-400" /> },
      { name: "Next.js", icon: <SiNextdotjs className="text-white" /> },
    ]
  },
  {
    id: 3,
    title: "State Management & Styling",
    icon: <FiDatabase className="text-green-400" />,
    description: "Ensuring predictable state and responsive UI design.",
    items: [
      { name: "Redux", icon: <SiRedux className="text-purple-500" /> },
      { name: "Redux Thunk", icon: <SiRedux className="text-purple-400" /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-400" /> },
      { name: "Bootstrap", icon: <SiBootstrap className="text-indigo-500" /> },
    ]
  },
  {
    id: 4,
    title: "Performance Optimization",
    icon: <FiCpu className="text-red-400" />,
    description: "Delivering instantaneous experiences through advanced techniques.",
    items: [
      { name: "Code Splitting", icon: <FiZap className="text-yellow-400" /> },
      { name: "Lazy Loading", icon: <FiZap className="text-yellow-400" /> },
      { name: "Memoization", icon: <FiZap className="text-yellow-400" /> },
      { name: "Lighthouse Opt.", icon: <FiZap className="text-yellow-400" /> },
    ]
  },
  {
    id: 5,
    title: "Tools & Integrations",
    icon: <FiTool className="text-orange-400" />,
    description: "Version control, deployment, and ecosystem integrations.",
    items: [
      { name: "Git", icon: <FaGitAlt className="text-orange-600" /> },
      { name: "GitHub", icon: <FaGithub className="text-white" /> },
      { name: "Vercel", icon: <SiVercel className="text-white" /> },
      { name: "REST APIs", icon: <TbApi className="text-green-400" /> },
      { name: "WebSockets", icon: <TbApi className="text-emerald-400" /> },
    ]
  }
];

const TechnicalFeed = () => {
  return (
    <div className="flex flex-col gap-6 md:gap-8 w-full max-w-2xl mx-auto">
      {techCategories.map((category, index) => (
        <motion.div
          key={category.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="social-glass rounded-3xl p-6 md:p-8 border border-white/10 relative overflow-hidden group shadow-xl"
        >
          {/* Subtle Glow Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          
          <div className="relative z-10 flex flex-col gap-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-black/50 border border-white/10 flex items-center justify-center text-2xl shadow-lg shrink-0 group-hover:scale-110 group-hover:bg-white/5 transition-all duration-500">
                {category.icon}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  <span className="text-[10px] font-grotesk font-bold text-white/40 uppercase tracking-widest">
                    Technical Pulse
                  </span>
                </div>
                <h3 className="text-lg md:text-xl font-bold font-grotesk text-white tracking-wide leading-tight">
                  {category.title}
                </h3>
                <p className="text-xs md:text-sm text-white/50 mt-1">{category.description}</p>
              </div>
            </div>

            {/* Grid of Skills */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4 mt-2">
              {category.items.map((item, idx) => (
                <div 
                  key={idx} 
                  className="bg-black/60 border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center gap-3 hover:bg-white/10 hover:border-white/10 transition-all duration-300 group/item hover:-translate-y-1"
                >
                  {item.icon && (
                    <div className="text-3xl opacity-70 group-hover/item:opacity-100 group-hover/item:scale-110 drop-shadow-lg transition-all duration-300">
                      {item.icon}
                    </div>
                  )}
                  <span className="text-[10px] md:text-[11px] font-grotesk font-bold text-white/70 tracking-wider text-center uppercase group-hover/item:text-white transition-colors">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default TechnicalFeed;
