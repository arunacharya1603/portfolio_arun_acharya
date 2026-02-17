import type { Metadata } from "next";
import Link from "next/link";
import { seoFaqs, servicePackages } from "@/data/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Freelance Services",
  description:
    "Freelance frontend, full-stack, and UI/UX services for landing pages, business websites, and web applications.",
  alternates: {
    canonical: `${siteConfig.url}/services`,
  },
  openGraph: {
    title: "Freelance Services | Arun Acharya",
    description:
      "Hire Arun for website development, UI/UX design, and custom web app builds.",
    url: `${siteConfig.url}/services`,
    type: "website",
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

export default function ServicesPage() {
  return (
    <main className="mx-auto max-w-5xl px-5 py-16 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <h1 className="text-4xl font-bold sm:text-5xl">
        Freelance Web Development and UI/UX Services
      </h1>
      <p className="mt-6 text-lg text-white-200">
        I help founders, local businesses, and growing teams build high-quality
        websites and web apps. Projects include landing pages, business
        websites, dashboard apps, and UI/UX redesigns in Figma.
      </p>

      <section className="mt-12 space-y-6">
        {servicePackages.map((pkg) => (
          <article
            key={pkg.name}
            className="rounded-xl border border-white/15 bg-black-100/60 p-6"
          >
            <h2 className="text-2xl font-semibold">{pkg.name}</h2>
            <p className="mt-2 text-white-200">{pkg.bestFor}</p>
            <p className="mt-3 text-sm text-white-200">
              Delivery: {pkg.delivery} | Starting at USD {pkg.startingPriceUSD}{" "}
              or INR {pkg.startingPriceINR}
            </p>
            <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-white-200">
              {pkg.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
        <div className="mt-5 space-y-4">
          {seoFaqs.map((faq) => (
            <article
              key={faq.question}
              className="rounded-xl border border-white/10 p-5"
            >
              <h3 className="font-semibold">{faq.question}</h3>
              <p className="mt-2 text-sm text-white-200">{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-14 rounded-xl border border-white/15 p-6">
        <h2 className="text-2xl font-semibold">Book a Project Discussion</h2>
        <p className="mt-2 text-white-200">
          Share your goals and timeline. I will reply with a scope and estimate.
        </p>
        <div className="mt-4 flex flex-wrap gap-4">
          <a
            href={`mailto:${siteConfig.email}?subject=Project%20Inquiry`}
            className="rounded-lg bg-purple px-4 py-2 text-sm font-semibold text-black"
          >
            Email for Quote
          </a>
          <Link
            href="/pricing"
            className="rounded-lg border border-white/30 px-4 py-2 text-sm font-semibold"
          >
            View Pricing Page
          </Link>
        </div>
      </section>
    </main>
  );
}
