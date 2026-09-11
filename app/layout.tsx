import type { Metadata } from "next";

import "@fontsource/fredoka/latin.css";
import "@fontsource/nothing-you-could-do/latin.css";
import "@fontsource/poetsen-one/latin.css";
import "@fontsource/varela-round/latin.css";
import "./globals.css";
import { ThemeProvider } from "./provider";
import { seoServicePages } from "@/data/seo-content";
import { siteConfig, topSeoKeywords } from "@/lib/site";
import {
  personJsonLd,
  professionalServiceJsonLd,
  websiteJsonLd,
} from "@/lib/seo";

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
        url: `${siteConfig.url}/og-image.png`,
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
    images: [`${siteConfig.url}/og-image.png`],
  },
  verification: {
    google: "k3NVUdMrzJH10e27pPETvifGnNxoZURWiEIUBvgRObQ",
  },
  alternates: {
    canonical: siteConfig.url,
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
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
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
      <body className="font-sans antialiased selection:bg-[#bfa17f]/30 selection:text-[#fbfbfa]">
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
