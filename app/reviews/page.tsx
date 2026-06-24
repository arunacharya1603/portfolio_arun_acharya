import { ReviewsPageContent } from "@/components/StudioPortfolio";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export function generateMetadata() {
  return createPageMetadata({
    title: "Arun Acharya Reviews and Trust Signals",
    description:
      "Delivery trust signals for Arun Acharya including clean code, fast delivery, SEO-ready builds, responsive design, Vercel deployment, and verified testimonials when approved.",
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