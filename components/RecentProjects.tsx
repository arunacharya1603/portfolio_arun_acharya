"use client";

import React, { useState } from "react";
import { projects } from "@/data";
import PostCard from "./PostCard";
import { motion } from "framer-motion";
import { FaPaperPlane } from "react-icons/fa";
import TechnicalFeed from "./TechnicalFeed";

const RecentProjects = () => {
  const [activeTab, setActiveTab] = useState("feed");

  return (
    <div className="relative bg-black" id="projects">
      {/* Feed Header / Tabs (Sticky) */}
      <div className="sticky top-4 lg:top-[40px] z-40 social-glass border-b border-white/5 mb-8 rounded-2xl overflow-hidden shadow-2xl">
        <div className="flex items-center justify-around p-1">
          <FeedTab 
            label="Main Feed" 
            active={activeTab === "feed"} 
            onClick={() => setActiveTab("feed")} 
          />
          <FeedTab 
            label="Technical" 
            active={activeTab === "tech"} 
            onClick={() => setActiveTab("tech")} 
          />
        </div>
      </div>

      {/* The Scrollable Stream */}
      <div className="flex flex-col gap-0 md:gap-1 w-full max-w-2xl mx-auto">
        {activeTab === "feed" ? (
          projects.map((item) => (
            <PostCard
              key={item.id}
              id={item.id}
              title={item.title}
              des={item.des}
              img={item.img}
              iconLists={item.iconLists}
              link={item.link}
            />
          ))
        ) : (
          <TechnicalFeed />
        )}
      </div>
      
      {/* Feed Decoration */}
      <div className="mt-20 flex justify-center pb-20">
        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce" />
      </div>
    </div>
  );
};

const FeedTab = ({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`relative flex-1 py-4 text-xs font-grotesk font-bold uppercase tracking-[0.4em] transition-all duration-300 ${active ? "text-indigo-400" : "text-white/30 hover:text-white/60"}`}
  >
    {label}
    {active && (
      <motion.div 
        layoutId="tab-underline"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,1)]"
      />
    )}
  </button>
);

export default RecentProjects;
