import { FaLocationArrow } from "react-icons/fa6";
import { motion } from "framer-motion";

import MagicButton from "./MagicButton";

const Hero = () => {
  return (
    <div className="pb-2 pt-20 min-h-screen flex flex-col justify-center relative overflow-hidden bg-black" id="home">
      {/* Structural Tonal Background */}
      <div
        className="h-screen w-full absolute top-0 left-0 flex items-center justify-center pointer-events-none z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black-200/20 to-transparent" />
        <div
          className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black
          [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black)] opacity-60"
        />
        {/* Atmospheric Glow to mimic Stitch 'Signature Textures' */}
        <div className="absolute top-0 right-0 w-[50vw] h-[50vh] bg-purple/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[50vw] h-[50vh] bg-indigo/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 container mx-auto px-6 lg:px-24">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-20">
          
          {/* Asymmetric Content Block */}
          <div className="flex flex-col items-start max-w-4xl pt-10">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="flex items-center gap-4 mb-10"
            >
              <div className="w-12 h-[1px] bg-white-100/30" />
              <h2 className="uppercase tracking-[0.4em] text-[10px] md:text-xs text-white-100/60 font-sans font-medium">
                The Digital Atelier &bull; Arun Acharya
              </h2>
            </motion.div>

            <div className="relative">
              <motion.h1 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
                className="font-grotesk text-6xl md:text-7xl lg:text-9xl leading-[0.9] font-bold text-white tracking-tighter mb-4"
              >
                CRAFTING <br />
                <span className="ml-0 lg:ml-20">DIGITAL</span> <br />
                <span className="text-secondary opacity-60 italic font-medium">LUXURY.</span>
              </motion.h1>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
              className="mt-12 flex flex-col md:flex-row items-end gap-12"
            >
              <p className="text-start text-white-100/70 text-lg md:text-xl max-w-sm leading-relaxed font-sans font-light">
                Full-Stack Developer & UI UX Specialist. I build high-performance, 
                stunning digital experiences that feel like bespoke art.
              </p>
              
              <div className="pb-2">
                <a href="#projects">
                  <MagicButton
                    title="View Gallery"
                    icon={<FaLocationArrow />}
                    position="right"
                    otherClasses="bg-black-100 border border-white/10 hover:border-white/30 transition-all duration-500 rounded-none px-10 py-5"
                  />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right side visual - The Stitch Glass Sphere */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="hidden xl:flex relative flex-1 items-center justify-end h-[600px]"
          >
            {/* Ambient Background Depth */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple/10 blur-[100px] rounded-full animate-pulse" />
            
            {/* The Main Sphere Component */}
            <div className="relative w-[450px] h-[450px] rounded-full glass border border-white/5 flex items-center justify-center shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden">
               {/* Internal Refraction Effects */}
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.05),transparent_60%)]" />
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.03),transparent_70%)]" />
               
               {/* Orbital Lines */}
               <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute w-[350px] h-[350px] border border-white/5 rounded-full"
               />
               <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                  className="absolute w-[280px] h-[280px] border border-white/5 rounded-full border-dashed"
               />

               {/* Center Glow */}
               <div className="relative w-40 h-40 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center group overflow-hidden">
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <FaLocationArrow className="text-white/40 text-4xl transform rotate-45 group-hover:text-white transition-all duration-700 group-hover:scale-110" />
               </div>

               {/* Design Labels (Quiet Luxury Stamps) */}
               <div className="absolute inset-0 pointer-events-none font-grotesk text-[10px] tracking-[0.3em] uppercase text-white/30 p-12 flex flex-col justify-between items-center rotate-45">
                  <div className="mt-4">Precision</div>
                  <div className="flex justify-between w-full">
                    <span>Performance</span>
                    <span>Experience</span>
                  </div>
                  <div className="mb-4">Velocity</div>
               </div>
            </div>

            {/* Float Element: Cursor Lend Signifier */}
            <div className="absolute -bottom-10 right-20 px-6 py-4 glass border border-white/10 rounded-full font-grotesk text-[10px] tracking-widest uppercase text-white/60 flex items-center gap-3">
               <div className="w-1.5 h-1.5 bg-purple rounded-full animate-ping" />
               Signature Portfolio 2.4
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Stitch Vertical Stitching Line */}
      <div className="absolute right-24 top-0 h-full w-[1px] bg-gradient-to-b from-white/10 via-transparent to-white/10 z-0" />

      {/* Experience Timeline Mini-Anchor */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-4"
      >
        <span className="text-[10px] font-grotesk uppercase tracking-[0.5em] text-white-100/40">Scroll to Explore</span>
        <div className="w-[1px] h-12 bg-white/10" />
      </motion.div>
    </div>
  );
};

export default Hero;
