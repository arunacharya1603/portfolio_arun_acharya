import type { Metadata } from "next";

import type { SeoBlogPost, SeoFaq, SeoServicePage } from "@/data/seo-content";
import type { WorkProject } from "@/data/work-projects";
import { personSameAsLinks, siteConfig, topSeoKeywords } from "@/lib/site";

export const absoluteUrl = (path = "") => {
  if (!path) return siteConfig.url;
  if (path.startsWith("http")) return path;
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
};

type PageMetadataInput = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  image?: string;
  imageSize?: { width: number; height: number };
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  noIndex?: boolean;
};

export function createPageMetadata({
  title,
  description,
  path = "",
  keywords = [],
  image = siteConfig.socialImage,
  imageSize,
  type = "website",
  publishedTime,
  modifiedTime,
  noIndex = false,
}: PageMetadataInput): Metadata {
  const canonical = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);
  const mergedKeywords = Array.from(new Set([...keywords, ...topSeoKeywords.slice(0, 8)]));

  return {
    title: { absolute: title },
    description,
    keywords: mergedKeywords,
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    alternates: { canonical },
    ...(noIndex
      ? {
        robots: {
          index: false,
          follow: false,
          nocache: true,
        },
      }
      : {}),
    openGraph: {
      title,
      description,
      url: canonical,
      type,
      siteName: siteConfig.siteName,
      locale: siteConfig.locale,
      images: [
        {
          url: imageUrl,
          ...(imageSize ?? (image === siteConfig.socialImage ? { width: 1200, height: 630 } : {})),
          alt: title,
        },
      ],
      ...(type === "article"
        ? {
            publishedTime,
            modifiedTime,
            authors: [siteConfig.name],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@143rhry112645",
      images: [imageUrl],
    },
  };
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": siteConfig.personId,
    name: siteConfig.name,
    url: siteConfig.url,
    jobTitle: siteConfig.jobTitle,
    description:
      "Arun Acharya is a frontend developer, UI/UX developer, Next.js freelancer, and full-stack product builder for landing pages, web apps, dashboards, SaaS products, and SEO-ready websites.",
    image: absoluteUrl(siteConfig.socialImage),
    email: siteConfig.email,
    sameAs: personSameAsLinks,
    worksFor: {
      "@type": "Organization",
      "@id": `${siteConfig.url}#studio`,
      name: "Arun Acharya Freelance Web Development",
      url: siteConfig.url,
      logo: absoluteUrl(siteConfig.brandLogo),
    },
    knowsAbout: [
      "Frontend Development",
      "UI/UX Design",
      "Next.js Development",
      "React",
      "TypeScript",
      "Landing Page Development",
      "SaaS Dashboards",
      "Software Product Interfaces",
      "Technical SEO",
      "Core Web Vitals",
    ],
    mainEntityOfPage: siteConfig.url,
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": siteConfig.websiteId,
    name: siteConfig.siteName,
    url: siteConfig.url,
    inLanguage: "en",
    publisher: { "@id": siteConfig.personId },
  };
}

export function professionalServiceJsonLd(services: SeoServicePage[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteConfig.url}#studio`,
    name: "Arun Acharya Freelance Web Development",
    url: siteConfig.url,
    logo: absoluteUrl(siteConfig.brandLogo),
    image: absoluteUrl(siteConfig.socialImage),
    description:
      "Frontend development, UI/UX design, Next.js development, landing page design, dashboard development, and full-stack product build services by Arun Acharya.",
    founder: { "@id": siteConfig.personId },
    areaServed: [
      "India",
      "United States",
      "United Kingdom",
      "Canada",
      "United Arab Emirates",
      "Australia",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Project enquiries",
      email: siteConfig.email,
      availableLanguage: ["en"],
    },
    priceRange: "$250+",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Freelance Web Development Services",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        url: absoluteUrl(`/services/${service.slug}`),
        itemOffered: {
          "@type": "Service",
          name: service.navLabel,
          description: service.metaDescription,
          provider: { "@id": siteConfig.personId },
        },
      })),
    },
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqJsonLd(faqs: SeoFaq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function serviceJsonLd(service: SeoServicePage) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl(`/services/${service.slug}`)}#service`,
    name: service.metaTitle,
    description: service.metaDescription,
    url: absoluteUrl(`/services/${service.slug}`),
    provider: { "@id": siteConfig.personId },
    serviceType: [service.primaryIntent, ...service.secondaryIntents],
    areaServed: ["India", "United States", "United Kingdom", "Canada", "United Arab Emirates", "Australia"],
    audience: {
      "@type": "Audience",
      audienceType: service.bestFor.join(" "),
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: service.navLabel,
      itemListElement: service.includes.map((item) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: item,
        },
      })),
    },
  };
}

export function caseStudyJsonLd(project: WorkProject) {
  const canonical = absoluteUrl(`/work/${project.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${canonical}#case-study`,
    name: project.seoTitle,
    description: project.seoDescription,
    url: canonical,
    mainEntityOfPage: canonical,
    inLanguage: "en",
    image: absoluteUrl(project.image),
    author: { "@id": siteConfig.personId },
    creditText: `${siteConfig.name}: ${project.role}. ${project.contributionSummary}`,
    about: {
      "@type": "Thing",
      name: project.name,
      ...(project.externalUrl ? { url: project.externalUrl } : {}),
    },
  };
}

export function articleJsonLd(post: SeoBlogPost) {
  const canonical = absoluteUrl(`/blog/${post.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${canonical}#article`,
    headline: post.title,
    description: post.description,
    url: canonical,
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    author: { "@id": siteConfig.personId },
    publisher: { "@id": siteConfig.personId },
    mainEntityOfPage: canonical,
    image: absoluteUrl(siteConfig.socialImage),
    inLanguage: "en",
    about: post.keywords,
  };
}
