import { ExperiencePageContent } from "@/components/StudioPortfolio";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export function generateMetadata() {
  return createPageMetadata({
    title: "Arun Acharya Experience | Frontend Engineer",
    description:
      "Frontend engineering experience across Persist Ventures, Sound Of Meme, ChainReach.ai, and HeyClo/CLO AI, covering React, Next.js, performance, APIs, motion, and responsive product delivery.",
    path: "/experience",
    keywords: ["Arun Acharya experience", "frontend engineer experience", "React Next.js developer"],
  });
}

export default function ExperiencePage() {
  const breadcrumbSchema = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Experience", path: "/experience" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ExperiencePageContent />
    </>
  );
}