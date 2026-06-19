import type { Metadata } from "next";

import { ExperiencePageContent } from "@/components/StudioPortfolio";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Experience Logs",
  description:
    "Career highlights for Arun Acharya across frontend engineering, marketing systems, social audio, SoundOfMeme, Bump FM, and freelance full-stack delivery.",
  alternates: {
    canonical: `${siteConfig.url}/experience`,
  },
  openGraph: {
    title: "Experience Logs | Arun Acharya",
    description:
      "Product, marketing, frontend, and freelance delivery experience from Arun Acharya.",
    url: `${siteConfig.url}/experience`,
    type: "website",
  },
};

export default function ExperiencePage() {
  return <ExperiencePageContent />;
}
