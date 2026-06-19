import type { Metadata } from "next";

import { ServicesPageContent } from "@/components/StudioPortfolio";
import { seoFaqs } from "@/data/seo";
import { seoServicePages } from "@/data/seo-content";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Freelance Web Development Services",
  description:
    "Freelance web development services for landing pages, business websites, UI/UX redesigns, performance optimization, MVPs, APIs, dashboards, and full-stack web apps.",
  alternates: {
    canonical: `${siteConfig.url}/services`,
  },
  openGraph: {
    title: "Freelance Services | Arun Acharya",
    description:
      "Hire Arun for premium landing pages, business websites, UI/UX redesigns, performance optimization, MVPs, APIs, and custom full-stack apps.",
    url: `${siteConfig.url}/services`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Freelance Services | Arun Acharya",
    description:
      "Landing pages, business websites, UI/UX redesigns, full-stack apps, dashboards, APIs, MVPs, SEO-ready builds, and Vercel deployments.",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: seoFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

const servicesItemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Freelance web development service pages",
  itemListElement: seoServicePages.map((service, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: service.navLabel,
    url: `${siteConfig.url}/services/${service.slug}`,
  })),
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(servicesItemListJsonLd),
        }}
      />
      <ServicesPageContent />
    </>
  );
}
