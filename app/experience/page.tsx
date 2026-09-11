import { ExperiencePageContent } from "@/components/StudioPortfolio";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export function generateMetadata() {
  return createPageMetadata({
    title: "Arun Acharya: Frontend Engineering Experience",
    description:
      "Arun Acharya's frontend engineering experience across React, Next.js, product dashboards, APIs, performance, motion, and responsive UI.",
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
