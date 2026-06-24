import type { MetadataRoute } from "next";
import { locationMarkets } from "@/data/seo";
import { seoBlogPosts, seoServicePages } from "@/data/seo-content";
import { workProjects } from "@/data/work-projects";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const baseRoutes = [
    "",
    "/about",
    "/work",
    "/experience",
    "/services",
    "/process",
    "/pricing",
    "/reviews",
    "/blog",
    "/blog/author/arun-acharya",
    "/locations",
  ].map((path) => ({
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

  const serviceRoutes = seoServicePages.map((service) => ({
    url: `${siteConfig.url}/services/${service.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const blogRoutes = seoBlogPosts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.dateModified),
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));

  const workRoutes = workProjects.map((project) => ({
    url: `${siteConfig.url}/work/${project.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.78,
  }));

  return [...baseRoutes, ...workRoutes, ...serviceRoutes, ...locationRoutes, ...blogRoutes];
}
