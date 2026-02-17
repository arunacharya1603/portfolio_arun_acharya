import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "./provider";
import { siteConfig, topSeoKeywords } from "@/lib/site";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default:
      "Freelance Web Developer and UI/UX Designer | Arun Acharya Portfolio",
    template: "%s | Arun Acharya",
  },
  description:
    "Hire Arun Acharya for frontend, full-stack, and UI/UX projects. I build fast, modern websites and web apps for startups, local businesses, and global clients.",
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
    title: "Freelance Web Developer and UI/UX Designer | Arun Acharya",
    description:
      "Frontend, full-stack, and UI/UX freelance services for landing pages, business websites, and custom web apps.",
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
    title: "Freelance Web Developer and UI/UX Designer | Arun Acharya",
    description:
      "Need a website or web app for your business? Hire Arun Acharya for frontend, full-stack, and UI/UX freelance projects.",
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
    },
  },
};

const professionalServiceJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Arun Acharya Freelance Web Development",
  url: siteConfig.url,
  image: `${siteConfig.url}/og-image.png`,
  description:
    "Freelance frontend, full-stack, and UI/UX services for landing pages, business websites, and custom web apps.",
  founder: {
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: "Frontend Developer & Full-Stack Engineer",
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
  priceRange: "$100 - $2000+",
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
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Freelance Web Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Landing Page Development",
          description:
            "Conversion-focused landing pages for founders and small businesses.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Business Website Development",
          description:
            "Custom websites for local and global businesses with technical SEO setup.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Full-Stack Web Application Development",
          description:
            "Custom web applications with modern frontend, backend, and deployment architecture.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "UI/UX Design and Redesign",
          description:
            "UI/UX design in Figma and front-end implementation for better conversion and usability.",
        },
      },
    ],
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  url: siteConfig.url,
  jobTitle: "Freelance Frontend and Full-Stack Developer",
  sameAs: [siteConfig.github, siteConfig.linkedin, siteConfig.x],
  knowsAbout: [
    "Frontend Development",
    "Full-Stack Development",
    "UI/UX Design",
    "React",
    "Next.js",
    "TypeScript",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.siteName,
  url: siteConfig.url,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.png" />
        <link rel="shortcut icon" href="/favicon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon.png" />
        <meta name="theme-color" content="#000000" />
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
      <body className={inter.className}>
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
