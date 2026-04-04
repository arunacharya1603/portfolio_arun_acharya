"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const MobileProfileBar = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="lg:hidden w-full"
    >
      {/* Top App Bar */}
      <div className="flex items-center justify-between px-1 py-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center overflow-hidden">
            <Image
              src="/image/arun.png"
              alt="Arun"
              width={32}
              height={32}
              className="object-cover w-full h-full"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
            <span className="text-[10px] font-bold text-white">AA</span>
          </div>
          <span className="text-sm font-bold font-grotesk text-white">Arun Acharya</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-[9px] font-grotesk font-bold text-green-400 uppercase tracking-wider">
            Available
          </span>
        </div>
      </div>

      {/* Profile Card */}
      <div className="rounded-3xl bg-[#131313] border border-white/[0.06] py-8 px-6 flex flex-col items-center gap-5">
        {/* Avatar */}
        <div className="relative">
          <div className="w-20 h-20 rounded-full p-[2px] bg-gradient-to-br from-indigo-500 to-purple-500">
            <div className="w-full h-full rounded-full bg-black p-[2px]">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 overflow-hidden flex items-center justify-center">
                <Image
                  src="/image/arun.png"
                  alt="Arun Acharya"
                  width={80}
                  height={80}
                  className="object-cover w-full h-full rounded-full"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
                <span className="profile-fallback text-xl font-bold text-white absolute">AA</span>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-[3px] border-[#131313] pulse-active" />
        </div>

        {/* Name */}
        <div className="text-center">
          <h1 className="text-lg font-bold font-grotesk text-white tracking-tight">Arun Acharya</h1>
          <p className="text-xs text-white/40 font-sans mt-0.5">Full-Stack Architect</p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 w-full max-w-[280px]">
          <a
            href="https://www.linkedin.com/in/arunacharya1603/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2.5 rounded-full bg-indigo-500 text-center text-xs font-grotesk font-bold text-white uppercase tracking-wider active:scale-95 transition-transform"
          >
            Follow
          </a>
          <button
            onClick={() => {
              const el = document.getElementById("contact");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="flex-1 py-2.5 rounded-full bg-white/[0.06] border border-white/[0.08] text-center text-xs font-grotesk font-bold text-white uppercase tracking-wider active:scale-95 transition-transform"
          >
            Message
          </button>
        </div>

        {/* Stats Row — Minimal, no boxes */}
        <div className="flex items-center justify-center gap-0 w-full mt-1 rounded-2xl bg-white/[0.03] border border-white/[0.04] py-3">
          <StatItem value="11+" label="Projects" />
          <StatDivider />
          <StatItem value="3y+" label="Exp" />
          <StatDivider />
          <StatItem value="15+" label="Clients" />
          <StatDivider />
          <StatItem value="100%" label="Rate" />
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-5 mt-1">
          <SocialLink href="https://github.com/arunacharya1603" icon={<FaGithub />} />
          <SocialLink href="https://x.com/143rhry112645" icon={<FaTwitter />} />
          <SocialLink href="https://www.linkedin.com/in/arunacharya1603/" icon={<FaLinkedin />} />
        </div>
      </div>
    </motion.div>
  );
};

const StatItem = ({ value, label }: { value: string; label: string }) => (
  <div className="flex-1 flex flex-col items-center gap-0.5">
    <span className="text-sm font-bold font-grotesk text-white">{value}</span>
    <span className="text-[8px] uppercase tracking-widest text-white/25 font-grotesk">{label}</span>
  </div>
);

const StatDivider = () => (
  <div className="w-[1px] h-6 bg-white/[0.06]" />
);

const SocialLink = ({ href, icon }: { href: string; icon: React.ReactNode }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-white/25 hover:text-indigo-400 transition-colors text-base"
  >
    {icon}
  </a>
);

export default MobileProfileBar;
