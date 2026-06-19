import type { Metadata } from "next";

import { WorkPageContent } from "@/components/StudioPortfolio";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Selected Work and Case Studies",
  description:
    "Selected work by Arun Acharya across wellness products, creator dashboards, healthcare websites, premium portfolios, audio products, and AI dashboards.",
  alternates: {
    canonical: `${siteConfig.url}/work`,
  },
  openGraph: {
    title: "Selected Work | Arun Acharya",
    description:
      "Case-study style project work across premium websites, dashboards, full-stack apps, and product interfaces.",
    url: `${siteConfig.url}/work`,
    type: "website",
  },
};

export default function WorkPage() {
  return <WorkPageContent />;
}
