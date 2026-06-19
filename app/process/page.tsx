import type { Metadata } from "next";

import { ProcessPageContent } from "@/components/StudioPortfolio";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Process and Tech Stack",
  description:
    "How Arun Acharya works across strategy, UI/UX design, precision engineering, launch, SEO, performance, and modern React/Next.js development.",
  alternates: {
    canonical: `${siteConfig.url}/process`,
  },
  openGraph: {
    title: "Process and Tech Stack | Arun Acharya",
    description:
      "A clear build system for strategy, interface design, full-stack engineering, launch, and optimization.",
    url: `${siteConfig.url}/process`,
    type: "website",
  },
};

export default function ProcessPage() {
  return <ProcessPageContent />;
}
