import type { Metadata } from "next";
import localFont from "next/font/local";

import "lenis/dist/lenis.css";
import "./globals.css";
import { ThemeProvider } from "./provider";
import { InquiryAttribution } from "@/components/InquiryAttribution";
import { AnalyticsConsent } from "@/components/AnalyticsConsent";
import { SmoothScroll } from "@/components/SmoothScroll";
import { seoServicePages } from "@/data/seo-content";
import { siteConfig, topSeoKeywords } from "@/lib/site";
import {
  personJsonLd,
  professionalServiceJsonLd,
  websiteJsonLd,
} from "@/lib/seo";

const manrope = localFont({
  src: "../node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2",
  variable: "--font-manrope",
  display: "swap",
  weight: "200 800",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.defaultTitle,
    template: "%s | Arun Acharya",
  },
  description: siteConfig.description,
  keywords: topSeoKeywords,
  applicationName: siteConfig.siteName,
  category: "technology",
  icons: {
    icon: [
      {
        url: "/favicon.ico?v=2",
        type: "image/x-icon",
        sizes: "16x16 32x32 48x48 256x256",
      },
      { url: "/favicon-16x16.png?v=2", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32x32.png?v=2", type: "image/png", sizes: "32x32" },
      { url: "/favicon.png?v=2", type: "image/png", sizes: "256x256" },
    ],
    apple: [
      { url: "/apple-touch-icon.png?v=2", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico?v=2",
  },
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
    title: siteConfig.defaultTitle,
    description: siteConfig.description,
    images: [
      {
        url: `${siteConfig.url}${siteConfig.socialImage}`,
        width: 1200,
        height: 630,
        alt: "Arun Acharya developer portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.defaultTitle,
    description: siteConfig.description,
    creator: "@143rhry112645",
    images: [`${siteConfig.url}${siteConfig.socialImage}`],
  },
  verification: {
    google: "k3NVUdMrzJH10e27pPETvifGnNxoZURWiEIUBvgRObQ",
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
        <meta name="theme-color" content="#F7F9FC" />
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
      <body
        className={`${manrope.variable} bg-canvas font-sans text-ink antialiased selection:bg-brand/15 selection:text-ink`}
      >
        <InquiryAttribution />
        <SmoothScroll />
        <AnalyticsConsent />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          forcedTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
