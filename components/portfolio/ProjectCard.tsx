import { LiquidSurface } from "@/components/ui/liquid-surface";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { WorkProject } from "@/data/work-projects";
import { cn } from "@/lib/utils";

export function ProjectCard({
  project,
  headingAs: Heading = "h3",
}: {
  project: WorkProject;
  headingAs?: "h2" | "h3";
}) {
  return (
    <article className="min-w-0">
      <Link
        href={project.href}
        aria-label={`Read the ${project.shortName} case study`}
        className="group block rounded-xl"
      >
        <div className="glass-panel overflow-hidden rounded-3xl p-4 transition-all duration-300 group-hover:border-brand/25 group-hover:shadow-showcase motion-safe:group-hover:-translate-y-1 sm:p-6">
          <LiquidSurface radius={24} />
          <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-canvas">
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
        <div className="flex items-start justify-between gap-5 px-1 pt-5">
          <div className="min-w-0">
            <p className="text-xs font-medium text-subtle">{project.role}</p>
            <Heading className="mt-2 text-2xl font-semibold tracking-tight group-hover:text-brand">
              {project.shortName}
            </Heading>
            <p className="mt-3 max-w-xl text-sm leading-7 text-subtle">
              {project.impact}
            </p>
          </div>
          <div
            aria-hidden="true"
            className="glass-panel grid h-11 w-11 shrink-0 place-items-center rounded-full text-ink transition-colors group-hover:border-brand group-hover:text-brand"
          >
            <LiquidSurface radius={22} compact />
            <ArrowUpRight aria-hidden="true" className="h-5 w-5" />
          </div>
        </div>
      </Link>
    </article>
  );
}
