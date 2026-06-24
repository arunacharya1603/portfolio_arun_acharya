import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { WorkProjectPageContent } from "@/components/StudioPortfolio";
import { getWorkProjectBySlug, workProjects } from "@/data/work-projects";
import {
  breadcrumbJsonLd,
  createPageMetadata,
  softwareApplicationJsonLd,
} from "@/lib/seo";

type WorkProjectPageProps = {
  params: {
    id: string;
  };
};

export function generateStaticParams() {
  return workProjects.map((project) => ({
    id: project.slug,
  }));
}

export function generateMetadata({ params }: WorkProjectPageProps): Metadata {
  const project = getWorkProjectBySlug(params.id);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  const isChainReach = project.slug === "chainreach-ai";

  return createPageMetadata({
    title: isChainReach
      ? "ChainReach.ai Frontend Developer Case Study | Arun Acharya"
      : `${project.shortName} Case Study by Arun Acharya`,
    description: isChainReach
      ? "ChainReach.ai case study by Arun Acharya, covering the creator-brand campaign platform, frontend architecture, dashboards, AI-assisted campaign flows, negotiation screens, and outcomes."
      : project.description,
    path: `/work/${project.slug}`,
    image: project.image,
    type: "article",
    keywords: [
      project.name,
      project.shortName,
      `${project.shortName} developer`,
      "Arun Acharya project",
      ...project.stack,
      ...(isChainReach
        ? ["chainreach.ai", "chainreach.ai frontend developer", "chainreach developer", "ChainReach.ai case study"]
        : []),
    ],
  });
}

export default function WorkProjectPage({ params }: WorkProjectPageProps) {
  const project = getWorkProjectBySlug(params.id);

  if (!project) {
    notFound();
  }

  const schemas = [
    softwareApplicationJsonLd(project),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Work", path: "/work" },
      { name: project.shortName, path: `/work/${project.slug}` },
    ]),
  ];

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={`work-project-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <WorkProjectPageContent project={project} />
    </>
  );
}