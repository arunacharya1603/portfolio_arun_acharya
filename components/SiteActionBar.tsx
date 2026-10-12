import { LiquidSurface } from "@/components/ui/liquid-surface";
import { GlassLink } from "@/components/ui/glass-link";
import Link from "next/link";
import { ArrowUpRight, Layers3 } from "lucide-react";

export function SiteActionBar() {
  return (
    <aside
      aria-label="Quick actions"
      className="pointer-events-none fixed inset-x-4 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-40 md:hidden"
    >
      <div className="glass-panel pointer-events-auto mx-auto grid max-w-sm grid-cols-2 gap-2 rounded-2xl p-2">
        <LiquidSurface radius={16} />
        <Link
          href="/work"
          className="flex min-h-11 items-center justify-center gap-2 rounded-lg text-sm font-semibold text-ink hover:bg-brand-soft"
        >
          Work
          <Layers3 aria-hidden="true" className="h-4 w-4" />
        </Link>
        <GlassLink href="/contact" variant="primary">
          Contact
          <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
        </GlassLink>
      </div>
    </aside>
  );
}
