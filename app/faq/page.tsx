import Link from "next/link";

import {
  SeoPageShell,
  seoCardClass,
  seoMutedTextClass,
} from "@/components/SeoPageShell";
import { seoFaqs } from "@/data/seo";
import { breadcrumbJsonLd, createPageMetadata, faqJsonLd } from "@/lib/seo";

export function generateMetadata() {
  return createPageMetadata({
    title: "Arun Acharya: Services, Pricing, and Project FAQ",
    description:
      "Direct answers about Arun Acharya's frontend, Next.js, UI/UX, website, SaaS, pricing, timeline, remote work, and project experience.",
    path: "/faq",
    keywords: [
      "Arun Acharya FAQ",
      "hire Arun Acharya",
      "Next.js freelancer pricing",
      "frontend developer services",
    ],
  });
}

export default function FaqPage() {
  const schemas = [
    faqJsonLd(seoFaqs),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "FAQ", path: "/faq" },
    ]),
  ];

  return (
    <SeoPageShell
      eyebrow="Frequently asked questions"
      title="Direct answers about hiring Arun Acharya"
      description="Arun is a frontend and full-stack product engineer available for selected React, Next.js, UI/UX, website, dashboard, SaaS, and performance projects."
    >
      {schemas.map((schema, index) => (
        <script
          key={`faq-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <section aria-labelledby="faq-heading">
        <h2 id="faq-heading" className="sr-only">
          Questions and answers
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {seoFaqs.map((faq) => (
            <article key={faq.question} className={seoCardClass}>
              <h3 className="font-grotesk text-2xl font-semibold text-[#f4efe3]">
                {faq.question}
              </h3>
              <p className={`mt-4 text-base leading-8 ${seoMutedTextClass}`}>
                {faq.answer}
              </p>
            </article>
          ))}
        </div>
      </section>

      <nav aria-label="Related portfolio information" className="mt-8 flex flex-wrap gap-3">
        {[
          ["Compare services", "/services"],
          ["See exact pricing", "/pricing"],
          ["Read case studies", "/work"],
        ].map(([label, href]) => (
          <Link
            key={href}
            href={href}
            className="rounded-full border border-[#f4efe3]/16 px-5 py-3 text-sm font-semibold text-[#f4efe3] transition hover:border-[#d8c4a4]/70 hover:bg-[#f4efe3]/[0.07]"
          >
            {label}
          </Link>
        ))}
      </nav>
    </SeoPageShell>
  );
}
