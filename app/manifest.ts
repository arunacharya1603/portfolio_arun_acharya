import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.siteName,
    short_name: "Arun Portfolio",
    description:
      "Freelance web developer portfolio for frontend, full-stack, and UI/UX projects.",
    start_url: "/",
    display: "standalone",
    background_color: "#F7F9FC",
    theme_color: "#F7F9FC",
    lang: "en",
    icons: [
      {
        src: "/icon-192x192.png?v=2",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png?v=2",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
