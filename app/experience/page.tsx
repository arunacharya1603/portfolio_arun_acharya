import { ExperiencePageContent } from "@/components/StudioPortfolio";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export function generateMetadata() {
  return createPageMetadata({
    title: "Software & Product Engineering Experience | Arun Acharya",
    description:
      "Explore Arun Acharya's project experience across websites, applications, dashboards, APIs, and product interfaces, with specific roles and contributions.",
    path: "/experience",
    keywords: ["Arun Acharya experience", "software engineering experience", "product development portfolio"],
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
