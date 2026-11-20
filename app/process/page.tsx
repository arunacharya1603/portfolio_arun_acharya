import { ProcessPageContent } from "@/components/StudioPortfolio";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export function generateMetadata() {
  return createPageMetadata({
    title: "Software & Product Development Process | Arun Acharya",
    description:
      "How Arun Acharya takes websites, applications, and custom software from discovery and UI/UX through development, testing, deployment, and handover.",
    path: "/process",
    keywords: ["software development process", "product development process", "application development workflow"],
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
