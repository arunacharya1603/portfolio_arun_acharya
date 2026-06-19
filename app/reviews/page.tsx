import type { Metadata } from "next";

import { ReviewsPageContent } from "@/components/StudioPortfolio";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Reviews and Trust Signals",
  description:
    "Verified testimonial placeholder and delivery trust signals for Arun Acharya, including fast delivery, clean code, SEO-ready builds, responsive design, and Vercel deployment.",
  alternates: {
    canonical: `${siteConfig.url}/reviews`,
  },
  openGraph: {
    title: "Reviews and Trust Signals | Arun Acharya",
    description:
      "Verified client testimonials will appear after approval. See delivery signals and trust badges for Arun Acharya.",
    url: `${siteConfig.url}/reviews`,
    type: "website",
  },
};

export default function ReviewsPage() {
  return <ReviewsPageContent />;
}
