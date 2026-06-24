import { WorkPageContent } from "@/components/StudioPortfolio";
import { workProjects } from "@/data/work-projects";
import { absoluteUrl, breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export function generateMetadata() {
  return createPageMetadata({
    title: "Selected Work and Case Studies by Arun Acharya",
    description:
      "Case studies by Arun Acharya across ChainReach.ai, HeyClo, Sound Of Meme, NursePhysioWala, Samriddhi Interiors, dashboards, landing pages, and product interfaces.",
    path: "/work",
    keywords: [
      "Arun Acharya work",
      "Arun Acharya projects",
      "chainreach.ai developer",
      "frontend developer portfolio",
    ],
  });
}

const workItemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${siteConfig.url}/work#itemlist`,
  name: "Arun Acharya selected work and case studies",
  itemListElement: workProjects.map((project, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: project.name,
    description: project.description,
    item: absoluteUrl(`/work/${project.slug}`),
  })),
};

export default function WorkPage() {
  const schemas = [
    workItemListJsonLd,
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Work", path: "/work" },
    ]),
  ];

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={`work-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <WorkPageContent />
    </>
  );
}