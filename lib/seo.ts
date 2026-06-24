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
  image = "/og-image.png",
  type = "website",
  publishedTime,
  modifiedTime,
  noIndex = false,
}: PageMetadataInput): Metadata {
  const canonical = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);
  const mergedKeywords = Array.from(new Set([...keywords, ...topSeoKeywords.slice(0, 8)]));

  return {
    title,
    description,
    keywords: mergedKeywords,
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    alternates: { canonical },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          nocache: true,
        }
      : undefined,
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url: canonical,
      type,
      siteName: siteConfig.siteName,
      locale: siteConfig.locale,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${title} by ${siteConfig.name}`,
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
      title: `${title} | ${siteConfig.name}`,
      description,
      creator: "@143rhry112645",
      images: [imageUrl],
    },
    other: {
      "eeat:author": siteConfig.name,
      "eeat:expertise":
        "Frontend development, UI/UX design, Next.js development, landing pages, SaaS dashboards, performance optimization",
      "eeat:entity": "Arun Acharya developer entity",
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
    image: absoluteUrl("/og-image.png"),
    email: siteConfig.email,
    sameAs: personSameAsLinks,
    worksFor: {
      "@type": "Organization",
      "@id": `${siteConfig.url}#studio`,
      name: "Arun Acharya Freelance Web Development",
      url: siteConfig.url,
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
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/blog?query={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function professionalServiceJsonLd(services: SeoServicePage[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteConfig.url}#studio`,
    name: "Arun Acharya Freelance Web Development",
    url: siteConfig.url,
    image: absoluteUrl("/og-image.png"),
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
    availableLanguage: ["en"],
    priceRange: "$200 - $5000+",
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

export function softwareApplicationJsonLd(project: WorkProject) {
  const canonical = absoluteUrl(`/work/${project.slug}`);
  const projectRole = {
    "@type": "Role",
    roleName: project.role,
    contributor: { "@id": siteConfig.personId },
  };

  const founderOwnedProject = /founder/i.test(project.role);
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${canonical}#softwareapplication`,
    name: project.shortName,
    alternateName: project.name,
    description: project.description,
    url: canonical,
    image: absoluteUrl(project.image),
    applicationCategory: project.applicationCategory ?? "WebApplication",
    operatingSystem: "Web",
    ...(founderOwnedProject ? { creator: { "@id": siteConfig.personId } } : {}),
    contributor: projectRole,
    sameAs: project.externalUrl ? [project.externalUrl] : undefined,
    keywords: [project.shortName, project.name, ...project.stack, ...project.features].join(", "),
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
    about: post.keywords,
  };
}