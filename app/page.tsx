"use client";

import { navItems } from "@/data";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

import ProfileSidebar from "@/components/ProfileSidebar";
import TrendingSidebar from "@/components/TrendingSidebar";
import IntroHeader from "@/components/IntroHeader";
import RecentProjects from "@/components/RecentProjects";
import Experience from "@/components/Experience";
import Approach from "@/components/Approach";
import Clients from "@/components/Clients";
import Footer from "@/components/Footer";
import MobileProfileBar from "@/components/MobileProfileBar";
import MobileStories from "@/components/MobileStories";
import MobileBottomNav from "@/components/MobileBottomNav";

const FloatingNav = dynamic(
  () => import("@/components/ui/FloatingNavbar").then((mod) => mod.FloatingNav),
  { ssr: false }
);

const Home = () => {
  return (
    <main className="relative bg-black min-h-screen font-sans selection:bg-indigo/30 selection:text-white">
      {/* Platform Atmospheric Glares */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="fixed top-[20%] right-[10%] w-[30%] h-[30%] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />
      
      {/* Desktop: Floating nav — Hidden on mobile (bottom nav used instead) */}
      <div className="hidden lg:block">
        <FloatingNav navItems={navItems} />
      </div>
      
      {/* Mobile Bottom Navigation — Social platform staple */}
      <MobileBottomNav />
      
      <div className="max-w-[1400px] mx-auto px-3 md:px-6 lg:px-8 relative z-10">
        {/* IntroHeader only on desktop, mobile gets MobileProfileBar — Sticky CTA */}
        <div className="hidden lg:block top-0 z-50 bg-black pb-2">
          <IntroHeader />
        </div>

        {/* Mobile: Profile + Stories — The social platform identity layer */}
        <div className="lg:hidden flex flex-col gap-4 pt-4 pb-2" id="home">
          <MobileProfileBar />
          <MobileStories />
        </div>

        <div className="flex flex-col lg:flex-row gap-4 md:gap-8 items-start py-2 lg:py-10">
          
          {/* Left Column: Profile Pillar (Sticky) — Desktop only */}
          <aside className="hidden lg:flex lg:w-1/4 lg:sticky lg:top-[40px] self-start flex-col gap-6">
            <ProfileSidebar />
          </aside>

          {/* Center Column: The Feed (Scrollable) */}
          <section className="w-full lg:w-1/2 flex flex-col gap-6 md:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
               <RecentProjects />
            </motion.div>
            
            <Experience />
            <Approach />
            <Clients />

            {/* Mobile: CTA Banner inline before footer */}
            <div className="lg:hidden">
              <MobileCTA />
            </div>

            <Footer />
          </section>

          {/* Right Column: Trending & Stats (Sticky) — Desktop only */}
          <aside className="hidden lg:flex lg:w-1/4 lg:sticky lg:top-[40px] self-start flex-col gap-6">
             <TrendingSidebar />
          </aside>

        </div>
      </div>

      {/* Safe bottom padding for mobile bottom nav */}
      <div className="lg:hidden h-24" />
    </main>
  );
};

/* Compact CTA for mobile — drives action before footer */
const MobileCTA = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="social-glass rounded-3xl border border-white/10 p-6 relative overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/5 to-transparent pointer-events-none" />
    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />
    <div className="relative z-10 flex flex-col gap-4">
      <div>
        <p className="text-[9px] font-grotesk font-bold uppercase tracking-[0.3em] text-indigo-500 mb-1">
          Open for Commissions • 2026
        </p>
        <h3 className="text-lg font-bold font-grotesk text-white leading-tight">
          Ready to build something <span className="text-indigo-400 italic">incredible?</span>
        </h3>
      </div>
      <button
        onClick={() => {
          const element = document.getElementById("contact");
          if (element) element.scrollIntoView({ behavior: "smooth" });
        }}
        className="w-full py-3.5 rounded-2xl bg-white text-black font-grotesk font-bold text-xs uppercase tracking-widest active:scale-95 transition-transform shadow-xl shadow-white/5"
      >
        Send Message
      </button>
    </div>
  </motion.div>
);

export default Home;
