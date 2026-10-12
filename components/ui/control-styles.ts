import { cn } from "@/lib/utils";

export function textLinkStyles(className?: string) {
  return cn(
    "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-brand transition-colors hover:text-brand-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand",
    className,
  );
}

export const inputClass =
  "mt-2 min-h-12 w-full rounded-xl border border-input/60 bg-surface/80 px-4 py-3 text-base font-normal text-ink shadow-inner transition-colors placeholder:text-subtle focus:border-brand focus:bg-surface focus:outline-none focus:ring-2 focus:ring-brand/20";
