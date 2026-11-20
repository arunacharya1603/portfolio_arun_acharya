import { ServicesPageContent } from "@/components/StudioPortfolio";
import { seoServicePages } from "@/data/seo-content";
import { siteConfig } from "@/lib/site";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export function generateMetadata() {
  return createPageMetadata({
    title: "Software & Product Development Services | Arun Acharya",
    description: siteConfig.serviceDescription,
    path: "/services",
    keywords: [
      "software development services",
      "product development services",
      "website and application development",
      "custom software development",
      "API development",
    ],
  });
}

const servicesItemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${siteConfig.url}/services#itemlist`,
  name: "Arun Acharya software and product development services",
  itemListElement: seoServicePages.map((service, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: service.navLabel,
    url: `${siteConfig.url}/services/${service.slug}`,
  })),
};

export default function ServicesPage() {
  const schemas = [
    servicesItemListJsonLd,
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
    ]),
  ];

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={`services-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <ServicesPageContent />
    </>
  );
}
