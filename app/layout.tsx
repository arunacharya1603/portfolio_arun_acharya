import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "./provider";

const inter = Inter({ subsets: ["latin"] });

const siteUrl = "https://arunacharya1603.in"; // Update with your actual domain

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Arun Acharya | I Build Beautiful Websites You'll Actually Love",
    template: "%s | Arun Acharya",
  },
  description:
    "Hi, I'm Arun! I specialize in UI/UX improvement, static & dynamic website development at affordable prices. Need a modern website that works? Let's talk. Expert in React, Next.js & TypeScript.",
  keywords: [
    // Core Developer Skills
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "Full Stack Developer",
    "JavaScript Developer",
    
    // Agency & Services
    "Web Design Agency",
    "Website Development Agency",
    "UI UX Design Agency",
    "Professional Web Design Services",
    "Custom Website Development",
    
    // Service Offerings
    "UI UX Improvement",
    "Website UI Redesign",
    "Static Website Development",
    "Dynamic Website Development",
    "Responsive Web Design",
    "Modern Website Design",
    
    // Pricing & Value Proposition
    "Affordable Website Development",
    "Budget Friendly Web Design",
    "Low Cost Website Design",
    "Cheap Website Development India",
    "Website Development Services India",
    
    // Technical Expertise
    "React Web Development",
    "Tailwind CSS Developer",
    "Next.js Web Design",
    "Modern Web Applications",
    
    // Target Audience
    "Hire React Developer",
    "Freelance Web Developer",
    "Web Developer India",
    "Remote Web Developer",
    
    // Specific Services
    "Landing Page Design",
    "Portfolio Website Design",
    "Business Website Development",
    "E-commerce Website Development",
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
    siteName: "Arun Acharya - Portfolio",
    title: "I Build Beautiful Websites You'll Love | UI/UX & Development",
    description:
      "Hi! I'm Arun — I specialize in UI/UX improvement and building static & dynamic websites at prices that make sense. Let's create something amazing together.",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Arun Acharya - Web Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "I Build Beautiful Websites | Affordable UI/UX & Development",
    description:
      "Hi! I'm Arun — I help businesses with UI/UX improvement, static & dynamic websites. Quality work at affordable prices.",
    creator: "@143rhry112645",
    images: [`${siteUrl}/og-image.png`],
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

// JSON-LD Structured Data for Person & Services
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Arun Acharya - Web Developer",
  url: siteUrl,
  image: `${siteUrl}/favicon.png`,
  description: "I specialize in UI/UX improvement, static and dynamic website development at affordable prices. Expert in React, Next.js & modern web technologies.",
  founder: {
    "@type": "Person",
    name: "Arun Acharya",
    jobTitle: "Frontend Developer & Full-Stack Engineer",
    url: siteUrl,
    sameAs: [
      "https://github.com/arunacharya1603",
      "https://www.linkedin.com/in/arunacharya1603/",
      "https://x.com/143rhry112645",
    ],
  },
  priceRange: "$$",
  areaServed: "IN",
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Frontend Development",
    "Web Development",
    "UI/UX Design",
    "UI/UX Improvement",
    "Static Website Development",
    "Dynamic Website Development",
    "Responsive Web Design",
    "Tailwind CSS",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Web Design Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "UI/UX Improvement",
          description: "Professional UI/UX redesign and improvement services for existing websites"
        }
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Static Website Development",
          description: "Fast, affordable static website development for businesses and portfolios"
        }
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Dynamic Website Development",
          description: "Feature-rich dynamic web applications with modern technologies"
        }
      }
    ]
  }
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
