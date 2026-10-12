import { GlassLink } from "@/components/ui/glass-link";
import { LiquidSurface } from "@/components/ui/liquid-surface";
import { ArrowUpRight } from "lucide-react";
import { Container } from "./Section";

export function PageCta() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="glass-panel glass-cta rounded-3xl px-6 py-12 sm:p-14 lg:flex lg:items-center lg:justify-between lg:gap-12">
          <LiquidSurface radius={24} />
          <div className="max-w-2xl">
            <h2 className="text-section">Have something in mind?</h2>
            <p className="mt-4 max-w-xl text-base leading-8 text-subtle">
              Tell me where you want to go. We’ll work out the right scope,
              design, and next step together.
            </p>
          </div>
          <GlassLink
            href="/contact"
            variant={"primary"}
            className={"mt-7 shrink-0 lg:mt-0"}
          >
            Start Project
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </GlassLink>
        </div>
      </Container>
    </section>
  );
}
