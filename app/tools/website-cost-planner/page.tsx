import { SeoPageShell } from "@/components/SeoPageShell";
import { WebsiteCostPlanner } from "@/components/WebsiteCostPlanner";
import { serviceProposals } from "@/data/service-proposals";
import { seoServicePages } from "@/data/seo-content";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({ title: "Website Cost & Scope Planner in INR and USD | Arun Acharya", description: "Plan a landing page, business website, Next.js frontend or SaaS build. Compare Arun’s published prices, included scope and timelines, and copy your project brief.", path: "/tools/website-cost-planner" });

export default function WebsiteCostPlannerPage() {
  const services = serviceProposals.map((proposal) => ({ proposal, name: seoServicePages.find((service) => service.slug === proposal.slug)!.navLabel }));
  return <SeoPageShell eyebrow="Free project planning tool" title="Website cost & scope planner" description="Turn a rough idea into a useful starting brief. Compare my published packages, see what is included, and choose what to discuss before committing to a build." showFooterCta={false}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Resources", path: "/resources" }, { name: "Website cost planner", path: "/tools/website-cost-planner" }])) }} />
    <WebsiteCostPlanner services={services} />
  </SeoPageShell>;
}
