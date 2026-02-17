import type { MetadataRoute } from "next";
import { locationMarkets } from "@/data/seo";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const baseRoutes = ["", "/services", "/pricing", "/locations"].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const locationRoutes = locationMarkets.map((location) => ({
    url: `${siteConfig.url}/locations/${location.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...baseRoutes, ...locationRoutes];
}
