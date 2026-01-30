import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "./provider";

const inter = Inter({ subsets: ["latin"] });

const siteUrl = "https://arunacharya1603.in"; // Update with your actual domain

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Arun Acharya | Frontend Developer & React Specialist",
    template: "%s | Arun Acharya",
  },
  description:
    "Hire Arun Acharya - Frontend Developer specializing in React, Next.js, and TypeScript. Building modern web applications with 2+ years of experience. Available for freelance projects.",
  keywords: [
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "Freelance Web Developer",
    "Full Stack Developer",
    "JavaScript Developer",
    "Web Developer India",
    "Hire React Developer",
    "Portfolio",
  ],
  authors: [{ name: "Arun Acharya", url: siteUrl }],
  creator: "Arun Acharya",
  publisher: "Arun Acharya",
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
    locale: "en_US",
    url: siteUrl,
    siteName: "Arun Acharya Portfolio",
    title: "Arun Acharya | Frontend Developer & React Specialist",
    description:
      "Frontend Developer specializing in React, Next.js, and TypeScript. Building modern web applications. Available for freelance projects.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Arun Acharya - Frontend Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arun Acharya | Frontend Developer",
    description:
      "Frontend Developer specializing in React, Next.js & TypeScript. Available for freelance.",
    creator: "@143rhry112645",
    images: ["/og-image.png"],
  },
  verification: {
    google: "k3NVUdMrzJH10e27pPETvifGnNxoZURWiEIUBvgRObQ",
    // Add your verification codes when you have them
    // google: "your-google-verification-code",
  },
  alternates: {
    canonical: siteUrl,
  },
};

// JSON-LD Structured Data for Person
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Arun Acharya",
  url: siteUrl,
  image: `${siteUrl}/favicon.png`,
  jobTitle: "Frontend Developer",
  worksFor: {
    "@type": "Organization",
    name: "Persist Ventures",
  },
  sameAs: [
    "https://github.com/arunacharya1603",
    "https://www.linkedin.com/in/arunacharya1603/",
    "https://x.com/143rhry112645",
  ],
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Frontend Development",
    "Web Development",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <link rel="icon" href="/favicon.png" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <meta name="theme-color" content="#000000" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
