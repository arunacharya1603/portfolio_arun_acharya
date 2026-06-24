import { PricingPageContent } from "@/components/StudioPortfolio";
import { servicePackages } from "@/data/seo";
import { siteConfig } from "@/lib/site";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export function generateMetadata() {
  return createPageMetadata({
    title: "Freelance Website, Landing Page, and Web App Pricing",
    description:
      "Transparent starting prices for Arun Acharya's landing pages, business websites, UI/UX, frontend development, Next.js builds, and custom full-stack web apps.",
    path: "/pricing",
    keywords: ["landing page pricing", "Next.js freelancer pricing", "frontend developer pricing"],
  });
}

const pricingOfferCatalogJsonLd = {
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  "@id": `${siteConfig.url}/pricing#offers`,
  name: "Arun Acharya pricing packages",
  itemListElement: servicePackages.map((pkg) => ({
    "@type": "Offer",
    name: pkg.name,
    price: pkg.startingPriceUSD,
    priceCurrency: "USD",
    description: `${pkg.bestFor} Delivery: ${pkg.delivery}`,
    itemOffered: {
      "@type": "Service",
      name: pkg.name,
      provider: { "@id": siteConfig.personId },
    },
  })),
};

export default function PricingPage() {
  const schemas = [
    pricingOfferCatalogJsonLd,
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Pricing", path: "/pricing" },
    ]),
  ];

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={`pricing-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <PricingPageContent />
    </>
  );
}