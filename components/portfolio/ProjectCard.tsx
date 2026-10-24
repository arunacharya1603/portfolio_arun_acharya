import { LiquidSurface } from "@/components/ui/liquid-surface";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { WorkProject } from "@/data/work-projects";
import { cn } from "@/lib/utils";

export function ProjectCard({
  project,
  headingAs: Heading = "h3",
  imageSide,
}: {
  project: WorkProject;
  headingAs?: "h2" | "h3";
  imageSide?: "left" | "right";
}) {
  const isRow = imageSide !== undefined;

  return (
    <article className="min-w-0">
      <Link
        href={project.href}
        aria-label={`Explore ${project.shortName}`}
        className={cn(
          "group rounded-xl",
          isRow
            ? "grid items-center gap-6 md:grid-cols-2 md:gap-10 lg:gap-16"
            : "block",
        )}
      >
        <div
          className={cn(
            isRow
              ? "min-w-0 overflow-hidden rounded-lg"
              : "glass-panel overflow-hidden rounded-3xl p-4 transition-all duration-300 group-hover:border-brand/25 group-hover:shadow-showcase motion-safe:group-hover:-translate-y-1 sm:p-6",
            imageSide === "right" && "md:col-start-2 md:row-start-1",
          )}
        >
          {!isRow && <LiquidSurface radius={24} />}
          <div
            className={cn(
              "relative overflow-hidden rounded-lg",
              isRow ? "aspect-video" : "aspect-[16/10] bg-canvas",
            )}
          >
            <Image
              src={project.image}
              alt={`${project.shortName} website preview`}
              fill
              sizes="(min-width: 1400px) 600px, (min-width: 768px) 45vw, 90vw"
              className={cn(
                "transition-transform duration-500 motion-safe:group-hover:scale-[1.025]",
                project.imageFit === "contain"
                  ? "object-contain"
                  : "object-cover",
              )}
            />
          </div>
        </div>
        <div
          className={cn(
            isRow
              ? "min-w-0"
              : "flex items-start justify-between gap-5 px-1 pt-5",
            imageSide === "right" && "md:col-start-1 md:row-start-1",
          )}
        >
          <div className="min-w-0">
            <p className="text-xs font-medium text-subtle">{project.role}</p>
            <Heading
              className={cn(
                "mt-2 font-semibold tracking-tight transition-colors group-hover:text-brand",
                isRow ? "text-3xl sm:text-4xl" : "text-2xl",
              )}
            >
              {project.shortName}
            </Heading>
            <p
              className={cn(
                "max-w-xl text-subtle",
                isRow ? "mt-5 text-base leading-8" : "mt-3 text-sm leading-7",
              )}
            >
              {isRow ? project.listingSummary : project.impact}
            </p>
            {isRow && (
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand">
                {project.challenges.length ? "View case study" : "Explore project"}
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </span>
            )}
          </div>
          {!isRow && (
            <div
              aria-hidden="true"
              className="glass-panel grid h-11 w-11 shrink-0 place-items-center rounded-full text-ink transition-colors group-hover:border-brand group-hover:text-brand"
            >
              <LiquidSurface radius={22} compact />
              <ArrowUpRight aria-hidden="true" className="h-5 w-5" />
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}
