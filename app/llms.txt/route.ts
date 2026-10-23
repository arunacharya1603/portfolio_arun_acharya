import { seoBlogPosts, seoServicePages } from "@/data/seo-content";
import { workProjects } from "@/data/work-projects";
import { personSameAsLinks, siteConfig } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const pages = [
    ["About Arun", "/about"],
    ["Selected work", "/work"],
    ["Services", "/services"],
    ["Practical guides", "/blog"],
    ["Guide author", "/blog/author/arun-acharya"],
    ["Project planning resources", "/resources"],
    ["Website cost planner", "/tools/website-cost-planner"],
    ["Packages and pricing", "/pricing"],
    ["Remote collaboration", "/locations"],
    ["Frequently asked questions", "/faq"],
    ["Project inquiry", "/contact"],
  ];

  const body = [
    "# Arun Acharya — portfolio and project index",
    "",
    `${siteConfig.name} is a frontend developer and Next.js freelancer based in India, working remotely on websites, product interfaces and dashboards.`,
    "",
    "This is a self-authored portfolio summary. Project features are not claims of sole authorship. Each case study documents the role, contribution and available evidence; founder or lead titles alone do not establish sole ownership of a product.",
    "",
    "## Portfolio",
    "",
    `- [Home](${siteConfig.url}/)`,
    ...pages.map(([label, path]) => `- [${label}](${siteConfig.url}${path})`),
    "",
    "## Profiles",
    "",
    ...personSameAsLinks.map((url) => `- ${url}`),
    "",
    "## Project case studies",
    "",
    ...workProjects.flatMap((project) => [
      `### ${project.shortName}`,
      "",
      `- [${project.name}](${siteConfig.url}/work/${project.slug})`,
      `- Status: ${project.status}`,
      `- Role: ${project.role}`,
      `- Contribution: ${project.contributionSummary}`,
      ...(project.evidenceNote ? [`- Evidence and scope: ${project.evidenceNote}`] : []),
      ...(project.externalUrl
        ? [`- ${project.status.includes("Demo") ? "Interface demo" : "Project website"}: ${project.externalUrl}`]
        : []),
      "",
    ]),
    "## Services",
    "",
    ...seoServicePages.map((service) =>
      `- [${service.navLabel}](${siteConfig.url}/services/${service.slug}): ${service.metaDescription}`
    ),
    "",
    "## Practical guides",
    "",
    ...seoBlogPosts.map((post) =>
      `- [${post.title}](${siteConfig.url}/blog/${post.slug}): ${post.description}`
    ),
    "",
    "## Contact",
    "",
    `- Email: ${siteConfig.email}`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=86400",
    },
  });
}
