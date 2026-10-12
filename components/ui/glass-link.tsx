"use client";

import type { ComponentProps } from "react";
import Link from "next/link";
import { LiquiGlass } from "@liqui-design/glass";
import { cn } from "@/lib/utils";
import { controlGlass } from "@/lib/glass";

/** A real link with a refracting surface; navigation keeps native link semantics. */
export function GlassLink({
  children,
  className,
  variant = "secondary",
  ...props
}: ComponentProps<typeof Link> & { variant?: "primary" | "secondary" }) {
  return (
    <Link
      {...props}
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
