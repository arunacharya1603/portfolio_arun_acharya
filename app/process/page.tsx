import { ProcessPageContent } from "@/components/StudioPortfolio";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export function generateMetadata() {
  return createPageMetadata({
    title: "Arun Acharya Process | UI/UX, Frontend, Next.js, Launch SEO",
    description:
      "How Arun Acharya works across strategy, UI/UX design, frontend development, Next.js engineering, launch checks, SEO structure, and performance optimization.",
    path: "/process",
    keywords: ["frontend development process", "UI UX process", "Next.js development process"],
  });
}

export default function ProcessPage() {
  const breadcrumbSchema = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Process", path: "/process" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ProcessPageContent />
    </>
  );
}