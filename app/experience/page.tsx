import { ExperiencePageContent } from "@/components/StudioPortfolio";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export function generateMetadata() {
  return createPageMetadata({
    title: "Arun Acharya Experience | Frontend, Product, Marketing, Freelance",
    description:
      "Experience highlights for Arun Acharya across frontend engineering, Sound Of Meme, Bump FM, product marketing, UI/UX, and freelance full-stack delivery.",
    path: "/experience",
    keywords: ["Arun Acharya experience", "frontend developer experience", "full-stack developer portfolio"],
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