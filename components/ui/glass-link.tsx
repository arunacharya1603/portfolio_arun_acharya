"use client";

import type { ComponentProps } from "react";
import Link from "next/link";
import { LiquiGlass } from "@liqui-design/glass";
import { cn } from "@/lib/utils";
import { controlGlass } from "@/lib/glass";
import { trackClick, type ClickLocation, type LinkClickEvent } from "@/lib/analytics";

type GlassLinkProps = ComponentProps<typeof Link> & { variant?: "primary" | "secondary" } & (
  | { analyticsEvent: LinkClickEvent; analyticsLocation: ClickLocation }
  | { analyticsEvent?: never; analyticsLocation?: never }
);

/** A real link with a refracting surface; navigation keeps native link semantics. */
export function GlassLink({
  children,
  className,
  variant = "secondary",
  analyticsEvent,
  analyticsLocation,
  onClick,
  onAuxClick,
  ...props
}: GlassLinkProps) {
  return (
    <Link
      {...props}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented && analyticsEvent && analyticsLocation) {
          trackClick(analyticsEvent, analyticsLocation);
        }
      }}
      onAuxClick={(event) => {
        onAuxClick?.(event);
        if (event.button === 1 && !event.defaultPrevented && analyticsEvent && analyticsLocation) {
          trackClick(analyticsEvent, analyticsLocation);
        }
      }}
      className={cn(
        "glass-link group inline-flex rounded-full transition-transform duration-200 motion-safe:hover:-translate-y-0.5 motion-safe:active:scale-[0.98]",
        className,
      )}
    >
      <LiquiGlass
        {...controlGlass}
        className={cn(
          "liquid-control w-full",
          variant === "primary" && "liquid-control--primary",
        )}
        contentClassName="flex min-h-12 items-center justify-center gap-2 rounded-[inherit] px-6 py-3 text-sm font-semibold"
      >
        {children}
      </LiquiGlass>
    </Link>
  );
}
