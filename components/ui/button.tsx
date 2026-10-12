"use client";

import { forwardRef, type CSSProperties } from "react";
import { Button as BaseButton } from "@base-ui/react/button";
import { LiquiGlass, type LiquiGlassProps } from "@liqui-design/glass";
import { controlGlass } from "@/lib/glass";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends Omit<BaseButton.Props, "className" | "style" | "render"> {
  className?: string;
  style?: CSSProperties;
  variant?: "glass" | "accent" | "danger";
  size?: "sm" | "md";
  glass?: Partial<LiquiGlassProps>;
}

// Liqui's lens surrounds the native button, preserving form submission and refs.
export const Button = forwardRef<HTMLElement, ButtonProps>(function Button(
  { variant = "glass", size = "md", glass, className, style, ...props },
  ref,
) {
  const controlClass = cn(
    "inline-flex h-full w-full cursor-pointer items-center justify-center gap-2 rounded-[inherit] font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand disabled:cursor-not-allowed",
    size === "sm" ? "min-h-11 px-4 py-2 text-sm" : "min-h-12 px-6 py-3 text-sm",
    glass?.contentClassName,
  );

  if (variant === "danger") {
    return (
      <BaseButton
        {...props}
        ref={ref}
        style={style}
        className={cn(
          controlClass,
          "rounded-full bg-destructive text-primary-foreground",
          className,
        )}
      />
    );
  }

  return (
    <LiquiGlass
      {...controlGlass}
      {...glass}
      style={style}
      data-disabled={props.disabled || undefined}
      className={cn(
        "liquid-control inline-flex align-middle transition-transform duration-200 data-[disabled]:opacity-50 motion-safe:active:scale-[0.98]",
        variant === "accent" && "liquid-control--primary",
        className,
      )}
      contentClassName="h-full w-full rounded-[inherit]"
    >
      <BaseButton {...props} ref={ref} className={controlClass} />
    </LiquiGlass>
  );
});
