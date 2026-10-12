"use client";

import { LiquiGlass } from "@liqui-design/glass";
import { cardGlass, controlGlass } from "@/lib/glass";

/** Decorative lens behind a semantic card; the content remains server rendered. */
export function LiquidSurface({
  radius = 24,
  compact = false,
}: {
  radius?: number;
  compact?: boolean;
}) {
  return (
    <LiquiGlass
      {...(compact ? controlGlass : cardGlass)}
      radius={radius}
      aria-hidden="true"
      className="liquid-material pointer-events-none"
    />
  );
}
