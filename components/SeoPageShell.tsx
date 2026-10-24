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
  children,
  showFooterCta = true,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  showFooterCta?: boolean;
}) {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="min-h-[60vh] pb-16">
        <Container>
          <section className="border-b border-line py-12 sm:py-16 lg:py-20">
            <p className="mb-5 text-xs font-bold uppercase tracking-widest text-brand">
              {eyebrow}
            </p>
            <h1 className="max-w-5xl text-section">{title}</h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-subtle sm:text-lg">
              {description}
            </p>
          </section>
          <div className="min-w-0 pt-10 sm:pt-14">{children}</div>
        </Container>
        {showFooterCta && <PageCta />}
      </main>
      <SiteFooter />
    </>
  );
}
