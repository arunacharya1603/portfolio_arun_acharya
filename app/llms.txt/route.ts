import { seoBlogPosts, seoServicePages } from "@/data/seo-content";
import { locationMarkets } from "@/data/seo";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const serviceLines = seoServicePages
    .map(
      (service) =>
        `- ${service.navLabel}: ${siteConfig.url}/services/${service.slug} - ${service.metaDescription}`
    )
    .join("\n");

  const blogLines = seoBlogPosts
    .map(
      (post) =>
        `- ${post.title}: ${siteConfig.url}/blog/${post.slug} - ${post.description}`
    )
    .join("\n");

  const locationLines = locationMarkets
    .map(
      (location) =>
        `- ${location.city}, ${location.country}: ${siteConfig.url}/locations/${location.slug}`
    )
    .join("\n");

  const body = `# ${siteConfig.name}

${siteConfig.name} is a freelance full-stack developer and UI/UX-focused studio partner building premium small business websites, frontend revamps, web apps, dashboards, SaaS products, landing pages, and API-backed product experiences.

Primary services:
${serviceLines}

Helpful articles:
${blogLines}

Location pages:
${locationLines}

Core stack:
- React
- Next.js
- TypeScript
- Framer Motion
- Node.js

Contact:
- Email: ${siteConfig.email}
- Website: ${siteConfig.url}
- GitHub: ${siteConfig.github}
- LinkedIn: ${siteConfig.linkedin}
`;

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=86400",
    },
  });
}
