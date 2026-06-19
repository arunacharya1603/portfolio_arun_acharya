import type { Metadata } from "next";

import { PricingPageContent } from "@/components/StudioPortfolio";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Freelance Website Pricing",
  description:
    "Transparent premium pricing for landing pages, business websites, and custom full-stack web apps by Arun Acharya.",
  alternates: {
    canonical: `${siteConfig.url}/pricing`,
  },
  openGraph: {
    title: "Freelance Website Pricing | Arun Acharya",
    description:
      "Package starts for landing pages, business websites, and full-stack web apps with scope-dependent final quotes.",
    url: `${siteConfig.url}/pricing`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Freelance Website Pricing | Arun Acharya",
    description:
      "Premium package starts for landing pages, business websites, and full-stack web apps.",
  },
};

export default function PricingPage() {
  return <PricingPageContent />;
}
