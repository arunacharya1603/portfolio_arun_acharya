import StudioPortfolio from "@/components/StudioPortfolio";
import { seoServicePages } from "@/data/seo-content";
import { workProjects } from "@/data/work-projects";
import { siteConfig } from "@/lib/site";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  createPageMetadata,
} from "@/lib/seo";

export function generateMetadata() {
  return createPageMetadata({
    title: siteConfig.defaultTitle,
    description: siteConfig.description,
    path: "/",
    keywords: [
      "Arun Acharya",
      "Arun Acharya developer",
      "Arun Acharya portfolio",
      "frontend developer portfolio",
      "Next.js freelancer",
      "UI UX developer India",
      "chainreach.ai developer",
    ],
  });
}

const profilePageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${siteConfig.url}/#profile-page`,
  url: siteConfig.url,
  name: "Arun Acharya Developer Portfolio",
  description: siteConfig.description,
  mainEntity: { "@id": siteConfig.personId },
  about: [
    "Arun Acharya",
    "frontend developer",
    "UI/UX developer",
    "Next.js freelancer",
    "ChainReach.ai frontend developer attribution",
    "landing page developer",
  ],
};

const homeServicesItemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${siteConfig.url}/#services-itemlist`,
  name: "Arun Acharya services",
  itemListElement: seoServicePages.slice(0, 6).map((service, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: service.navLabel,
    item: absoluteUrl(`/services/${service.slug}`),
  })),
};

const homeWorkItemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${siteConfig.url}/#work-itemlist`,
  name: "Project roles and frontend contributions by Arun Acharya",
  itemListElement: workProjects.map((project, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: project.name,
    item: absoluteUrl(`/work/${project.slug}`),
  })),
};

export default function Home() {
  const schemas = [
    profilePageJsonLd,
    homeServicesItemListJsonLd,
    homeWorkItemListJsonLd,
    breadcrumbJsonLd([{ name: "Home", path: "/" }]),
  ];

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={`home-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <StudioPortfolio />
    </>
  );
}
