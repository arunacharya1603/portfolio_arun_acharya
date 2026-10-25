import type { ReactNode } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { Container } from "@/components/portfolio/Section";
import { PageCta } from "@/components/portfolio/PageCta";
import { SiteFooter } from "@/components/portfolio/SiteFooter";

export const seoCardClass = "glass-panel min-w-0 rounded-2xl p-6";
export const seoMutedTextClass = "text-subtle";

export function SeoPageShell({
  eyebrow,
  title,
  description,
  breadcrumbs,
  heroContent,
  children,
  showFooterCta = true,
}: {
  eyebrow: string;
  title: string;
  description: string;
  breadcrumbs?: ReactNode;
  heroContent?: ReactNode;
  children: ReactNode;
  showFooterCta?: boolean;
}) {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="min-h-[60vh] pb-16">
        <Container>
          {breadcrumbs && <div className="pt-5 sm:pt-6">{breadcrumbs}</div>}
          <section className={`border-b border-line pb-12 sm:pb-16 lg:pb-20 ${breadcrumbs ? "pt-8 sm:pt-10 lg:pt-12" : "pt-12 sm:pt-16 lg:pt-20"}`}>
            <p className="mb-5 text-xs font-bold uppercase tracking-widest text-brand">
              {eyebrow}
            </p>
            <h1 className="max-w-5xl text-section">{title}</h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-subtle sm:text-lg">
              {description}
            </p>
            {heroContent && <div className="mt-8 sm:mt-10">{heroContent}</div>}
          </section>
          <div className="min-w-0 pt-10 sm:pt-14">{children}</div>
        </Container>
        {showFooterCta && <PageCta />}
      </main>
      <SiteFooter />
    </>
  );
}
