import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const ProfileSidebar = () => {
  return (
    <div className="social-glass rounded-3xl p-4 flex flex-col gap-8 h-full border border-white/10 overflow-hidden relative group">
      {/* Glossy Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      
      {/* Profile Section */}
      <div className="flex flex-col items-center text-center gap-4 relative z-10">
        <div className="relative">
          <div className="w-24 h-24 rounded-full border-2 border-indigo-500/50 p-1 bg-black">
            <div className="w-full h-full rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-3xl font-bold text-white overflow-hidden">
               <Image 
                src="/image/arun.png" 
                alt="Arun Acharya" 
                width={96} 
                height={96} 
                className="object-cover w-full h-full"
                onError={(e) => {
                  // Fallback if image doesn't exist
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
               />
               <span className="profile-fallback">AA</span>
            </div>
          </div>
          {/* Active Pulse */}
          <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 rounded-full border-4 border-black pulse-active" />
        </div>
        
        <div>
          <h1 className="text-2xl font-bold font-grotesk tracking-tight text-white mb-1">Arun Acharya</h1>
          <p className="text-xs text-white/40 font-grotesk uppercase tracking-widest">Full-Stack Architect</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 relative z-10">
        <StatCard label="Projects" value="11+" />
        <StatCard label="Exp" value="3y+" />
        <StatCard label="Clients" value="15+" />
        <StatCard label="Rate" value="100%" />
      </div>

      {/* Bio */}
      <div className="relative z-10">
        <p className="text-sm text-white/60 leading-relaxed font-sans">
          Specializing in high-performance digital materialization. We bridge the void between technical complexity and architectural beauty.
        </p>
      </div>

      {/* Social Links */}
      <div className="flex justify-center gap-6 mt-auto relative z-10">
        <SocialIcon icon={<FaGithub />} href="https://github.com/arunacharya1603" />
        <SocialIcon icon={<FaTwitter />} href="https://x.com/143rhry112645" />
        <SocialIcon icon={<FaLinkedin />} href="https://www.linkedin.com/in/arunacharya1603/" />
      </div>
    </div>
  );
};

const StatCard = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-white/5 rounded-2xl p-2 border border-white/5 flex flex-col items-center justify-center gap-1 group-hover:bg-white/10 transition-colors">
    <span className="text-lg font-bold font-grotesk text-white">{value}</span>
    <span className="text-[10px] uppercase tracking-tighter text-white/30">{label}</span>
  </div>
);

const SocialIcon = ({ icon, href }: { icon: React.ReactNode; href: string }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="text-white/40 hover:text-indigo-400 transition-colors text-xl"
  >
    {icon}
  </a>
);

export default ProfileSidebar;
