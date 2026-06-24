import { ServicesPageContent } from "@/components/StudioPortfolio";
import { seoFaqs } from "@/data/seo";
import { seoServicePages } from "@/data/seo-content";
import { siteConfig } from "@/lib/site";
import { breadcrumbJsonLd, createPageMetadata, faqJsonLd } from "@/lib/seo";

export function generateMetadata() {
  return createPageMetadata({
    title: "Frontend, UI/UX, Next.js, and Landing Page Services",
    description:
      "Freelance services by Arun Acharya for landing pages, UI/UX design, frontend development, Next.js builds, business websites, APIs, dashboards, MVPs, and SaaS products.",
    path: "/services",
    keywords: [
      "landing page developer",
      "UI UX developer India",
      "Next.js freelancer",
      "frontend development services",
      "landing page design services",
    ],
  });
}

const servicesItemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${siteConfig.url}/services#itemlist`,
  name: "Arun Acharya freelance services",
  itemListElement: seoServicePages.map((service, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: service.navLabel,
    url: `${siteConfig.url}/services/${service.slug}`,
  })),
};

export default function ServicesPage() {
  const schemas = [
    faqJsonLd(seoFaqs),
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