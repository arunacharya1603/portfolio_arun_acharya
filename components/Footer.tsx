"use client";

import React from "react";
import Image from "next/image";
import { socialMedia } from "@/data";
import { siteConfig } from "@/lib/site";
import { motion } from "framer-motion";
import { FaPaperPlane, FaSmile, FaPaperclip } from "react-icons/fa";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full pb-20 relative overflow-hidden bg-black" id="contact">
      <div className="max-w-2xl mx-auto px-6">
        
        {/* DM Interface Box */}
        <div className="social-glass rounded-[32px] border border-white/10 overflow-hidden flex flex-col shadow-2xl">
          
          {/* DM Header */}
          <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center border border-white/10 relative">
                 <Image 
                    src="/image/arun.png" 
                    alt="Arun" 
                    width={40} 
                    height={40} 
                    className="object-cover rounded-full"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                 />
                 <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-black pulse-active" />
              </div>
              <div>
                <h3 className="text-sm font-bold font-grotesk text-white">Direct Message</h3>
                <p className="text-[10px] text-white/40 font-grotesk uppercase tracking-widest font-bold">Active Now</p>
              </div>
            </div>
          </div>

          {/* Chat History Area */}
          <div className="p-8 flex flex-col gap-6 min-h-[300px]">
            <ChatMessage 
              isMe={false} 
              text="Ready to take your digital experience to the next level?" 
              time="12:40 PM" 
            />
            <ChatMessage 
              isMe={false} 
              text="I am currently accepting select commissions for 2026. Send me a message below!" 
              time="12:41 PM" 
            />
            
            {/* Divider */}
            <div className="flex items-center gap-4 py-4">
               <div className="flex-1 h-[1px] bg-white/5" />
               <span className="text-[10px] font-grotesk font-bold text-white/20 uppercase tracking-[0.3em]">Today</span>
               <div className="flex-1 h-[1px] bg-white/5" />
            </div>
          </div>

          {/* Messaging Input Bar */}
          <div className="p-6 bg-white/[0.02] border-t border-white/5">
            <div className="bg-white/5 rounded-2xl p-4 flex items-center gap-4 border border-white/5 hover:border-white/10 transition-colors group">
              <FaPaperclip className="text-white/20 hover:text-white/40 cursor-pointer transition-colors" />
              <input 
                type="text" 
                placeholder="Write a message..." 
                className="flex-1 bg-transparent border-none outline-none text-sm text-white placeholder:text-white/20 font-sans"
              />
              <div className="flex items-center gap-4">
                <FaSmile className="text-white/20 hover:text-white/40 cursor-pointer transition-colors" />
                <button className="w-10 h-10 rounded-xl bg-indigo-500 hover:bg-indigo-600 flex items-center justify-center text-white transition-all shadow-lg shadow-indigo-500/20 active:scale-95">
                  <FaPaperPlane className="text-xs" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Platform Footer */}
        <div className="mt-20 flex flex-col items-center gap-8 border-t border-white/5 pt-10">
          <div className="flex items-center gap-6">
            {socialMedia.map((info) => (
              <a
                key={info.id}
                href={info.link}
                target="_blank"
                rel="noopener"
                className="text-white/20 hover:text-white transition-colors text-xl"
              >
                <Image width={20} height={20} src={info.img} alt="social" className="opacity-40 hover:opacity-100 transition-opacity" />
              </a>
            ))}
          </div>
          
          <div className="text-center">
            <p className="font-grotesk text-[10px] tracking-[0.5em] uppercase text-white/20 mb-2">
               Arun Acharya &bull; Dev Platform 3.0
            </p>
            <p className="font-sans text-[10px] text-white/10">
               Copyright © {year} All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

const ChatMessage = ({ isMe, text, time }: { isMe: boolean; text: string; time: string }) => (
  <motion.div 
    initial={{ opacity: 0, x: isMe ? 20 : -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className={`flex ${isMe ? "justify-end" : "justify-start"}`}
  >
    <div className={`max-w-[80%] p-4 rounded-2xl text-sm font-sans leading-relaxed ${isMe ? "bg-indigo-500 text-white rounded-tr-none" : "bg-white/5 text-white/80 border border-white/5 rounded-tl-none"}`}>
       {text}
       <div className={`text-[9px] mt-2 font-grotesk font-bold uppercase tracking-widest ${isMe ? "text-white/40" : "text-white/20"}`}>
          {time}
       </div>
    </div>
  </motion.div>
);

export default Footer;
