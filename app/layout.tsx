import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "./provider";
import { seoServicePages } from "@/data/seo-content";
import { siteConfig, topSeoKeywords } from "@/lib/site";
import {
  personJsonLd,
  professionalServiceJsonLd,
  websiteJsonLd,
} from "@/lib/seo";

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
    default: "Arun Acharya Developer Portfolio | Next.js, Frontend, UI/UX",
    template: "%s | Arun Acharya",
  },
  description:
    "Official portfolio of Arun Acharya, frontend developer, UI/UX developer, and Next.js freelancer with credited frontend contributions to ChainReach.ai, landing pages, dashboards, and product interfaces.",
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
    title: "Arun Acharya Developer Portfolio | Next.js, Frontend, UI/UX",
    description:
      "Official portfolio of Arun Acharya: frontend development, UI/UX, Next.js builds, landing pages, dashboards, and ChainReach.ai case-study attribution.",
    images: [
      {
        url: `${siteConfig.url}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Arun Acharya developer portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arun Acharya Developer Portfolio | Next.js, Frontend, UI/UX",
    description:
      "Frontend developer, UI/UX developer, Next.js freelancer, and credited frontend contributor to ChainReach.ai and other showcased products.",
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
  other: {
    "eeat:author": siteConfig.name,
    "eeat:entity": "Arun Acharya developer entity",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const baseSchemas = [
    professionalServiceJsonLd(seoServicePages),
    personJsonLd(),
    websiteJsonLd(),
  ];

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.png" />
        <link rel="shortcut icon" href="/favicon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon.png" />
        <meta name="theme-color" content="#0e0d0c" />
        <link
          rel="alternate"
          type="text/plain"
          title="LLM-readable portfolio summary"
          href="/llms.txt"
        />
        {baseSchemas.map((schema, index) => (
          <script
            key={`base-schema-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
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