import type { Metadata } from "next";

import { siteConfig } from "@/lib/site";

const title = "Arun Acharya — GitHub";
const description =
  "Frontend Developer · Explore my projects and open-source work.";
const pageUrl = `${siteConfig.url}/github`;
const imageUrl = `${siteConfig.url}/github-preview.jpg`;

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: pageUrl },
  openGraph: {
    title,
    description,
    url: pageUrl,
    siteName: siteConfig.name,
    type: "website",
    images: [
      {
        url: imageUrl,
        width: 731,
        height: 1280,
        alt: "Arun Acharya",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [imageUrl],
  },
};

export default function GithubLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
