import { ReviewsPageContent } from "@/components/StudioPortfolio";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export function generateMetadata() {
  return createPageMetadata({
    title: "Arun Acharya: Client Proof and Reviews",
    description:
      "Review Arun Acharya's shipped work, delivery standards, responsive builds, performance care, deployment support, and approved client feedback.",
    path: "/reviews",
    keywords: ["Arun Acharya reviews", "freelance developer reviews", "frontend developer trust signals"],
  });
}

export default function ReviewsPage() {
  const breadcrumbSchema = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Reviews", path: "/reviews" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ReviewsPageContent />
    </>
  );
}
