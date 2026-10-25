import { SeoPageShell } from "@/components/SeoPageShell";
import { SeoEngineeringCard } from "@/components/SeoEngineeringCard";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "npm Packages by Arun Acharya",
  description:
    "Explore Arun Acharya’s npm packages, including seo-engineering, an SEO skill for Codex and other AI coding agents. Find setup and usage guides.",
  path: "/packages",
});

export default function PackagesPage() {
  return (
    <SeoPageShell
      eyebrow="Packages"
      title="Tools I build and publish."
      description="Explore my npm packages: what they do, who they help, and how to get started."
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Packages", path: "/packages" },
            ]),
          ),
        }}
      />
      <SeoEngineeringCard />
    </SeoPageShell>
  );
}
