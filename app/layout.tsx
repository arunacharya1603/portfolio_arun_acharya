import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "./provider";
import { seoServicePages } from "@/data/seo-content";
import { siteConfig, topSeoKeywords } from "@/lib/site";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default:
      "Full-Stack Architect and Freelance Web Developer | Arun Acharya",
    template: "%s | Arun Acharya",
  },
  description:
    "Hire Arun Acharya to build high-performance websites, full-stack web apps, dashboards, UI/UX redesigns, APIs, MVPs, and conversion-focused digital products.",
  keywords: topSeoKeywords,
  applicationName: siteConfig.siteName,
  category: "technology",
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.siteName,
    title: "Full-Stack Architect and Freelance Web Developer | Arun Acharya",
    description:
      "Premium websites, full-stack web apps, dashboards, UI/UX redesigns, MVPs, APIs, SEO-ready builds, and Vercel deployments.",
    images: [
      {
        url: `${siteConfig.url}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Arun Acharya freelance web developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Full-Stack Architect and Freelance Web Developer | Arun Acharya",
    description:
      "Hire Arun Acharya for premium websites, full-stack apps, dashboards, UI/UX redesigns, APIs, MVPs, and conversion-focused frontend work.",
    creator: "@143rhry112645",
    images: [`${siteConfig.url}/og-image.png`],
  },
  verification: {
    google: "k3NVUdMrzJH10e27pPETvifGnNxoZURWiEIUBvgRObQ",
  },
  alternates: {
    canonical: siteConfig.url,
    languages: {
      "en-US": siteConfig.url,
      "en-IN": siteConfig.url,
      "en-GB": siteConfig.url,
      "en-CA": siteConfig.url,
      "en-AU": siteConfig.url,
    },
  },
};

const professionalServiceJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${siteConfig.url}#studio`,
  name: "Arun Acharya Freelance Web Development",
  url: siteConfig.url,
  image: `${siteConfig.url}/og-image.png`,
  description:
    "Premium full-stack development, frontend engineering, UI/UX redesign, dashboard, API, MVP, SEO-ready website, and Vercel deployment services.",
  founder: {
    "@type": "Person",
    "@id": `${siteConfig.url}#person`,
    name: siteConfig.name,
    jobTitle: "Full-Stack Architect and UI/UX-Focused Product Builder",
    url: siteConfig.url,
    sameAs: [siteConfig.github, siteConfig.linkedin, siteConfig.x],
  },
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
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Frontend Development",
    "Full-Stack Development",
    "UI/UX Design",
    "Figma",
    "Tailwind CSS",
    "Framer Motion",
    "Node.js",
    "Vercel Deployment",
    "SEO",
    "Performance Optimization",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Freelance Web Services",
    itemListElement: seoServicePages.map((service) => ({
      "@type": "Offer",
      url: `${siteConfig.url}/services/${service.slug}`,
      itemOffered: {
        "@type": "Service",
        name: service.navLabel,
        description: service.metaDescription,
      },
    })),
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${siteConfig.url}#person`,
  name: siteConfig.name,
  url: siteConfig.url,
  jobTitle: "Full-Stack Architect and Freelance Web Developer",
  description:
    "Full-stack developer and UI/UX-focused product builder for high-performance websites, web apps, dashboards, APIs, MVPs, and conversion-focused digital products.",
  sameAs: [siteConfig.github, siteConfig.linkedin, siteConfig.x],
  knowsAbout: [
    "Frontend Development",
    "Full-Stack Development",
    "UI/UX Design",
    "Small Business Websites",
    "Frontend Revamps",
    "API Development",
    "SaaS Dashboards",
    "React",
    "Next.js",
    "TypeScript",
    "Framer Motion",
    "Node.js",
    "Vercel",
  ],
  mainEntityOfPage: siteConfig.url,
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteConfig.url}#website`,
  name: siteConfig.siteName,
  url: siteConfig.url,
  publisher: {
    "@id": `${siteConfig.url}#person`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.png" />
        <link rel="shortcut icon" href="/favicon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon.png" />
        <meta name="theme-color" content="#0e0d0c" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(professionalServiceJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased selection:bg-[#bfa17f]/30 selection:text-[#fbfbfa]`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
