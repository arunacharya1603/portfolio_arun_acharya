"use client";

import { navItems } from "@/data";
import dynamic from "next/dynamic";
import Link from "next/link";

import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import Approach from "@/components/Approach";
import Experience from "@/components/Experience";
import RecentProjects from "@/components/RecentProjects";

// Dynamic imports to prevent SSR issues
const FloatingNav = dynamic(
  () => import("@/components/ui/FloatingNavbar").then((mod) => mod.FloatingNav),
  { ssr: false }
);

// Grid uses Lottie which requires document
const Grid = dynamic(() => import("@/components/Grid"), { ssr: false });

const Home = () => {
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full">
        <FloatingNav navItems={navItems} />
        <Hero />
        <Grid />
        <RecentProjects />
        <section className="py-20" id="about">
          <h2 className="heading">
            Freelance <span className="text-purple">web development</span> for
            small to medium projects
          </h2>
          <div className="mx-auto mt-8 max-w-4xl space-y-4 text-center text-white-200">
            <p>
              I help startups, local businesses, and creators build websites
              that convert. If you need a landing page, business website, UI/UX
              redesign, or a custom full-stack app, I can handle design,
              development, and deployment.
            </p>
            <p>
              I work with clients in India, US, UK, UAE, Canada, and Australia.
              See service details, pricing, and location-specific market ranges
              below.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/services"
              className="rounded-lg bg-purple px-4 py-2 text-sm font-semibold text-black"
            >
              View Services
            </Link>
            <Link
              href="/pricing"
              className="rounded-lg border border-white/30 px-4 py-2 text-sm font-semibold"
            >
              View Pricing
            </Link>
            <Link
              href="/locations"
              className="rounded-lg border border-white/30 px-4 py-2 text-sm font-semibold"
            >
              Browse Locations
            </Link>
          </div>
        </section>
        {/* <Clients /> */}
        <Experience />
        <Approach />
        <Footer />
      </div>
    </main>
  );
};

export default Home;
