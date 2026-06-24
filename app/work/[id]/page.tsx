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

  return createPageMetadata({
    title: `${project.shortName} ${project.role} Case Study | Arun Acharya`,
    description: `${project.shortName} case study by Arun Acharya, credited as ${project.role}. Covers ${project.description}`,
    path: `/work/${project.slug}`,
    image: project.image,
    type: "article",
    keywords: [
      project.name,
      project.shortName,
      `${project.shortName} developer`,
      `${project.shortName} ${project.role}`,
      `${project.shortName} case study`,
      `Arun Acharya ${project.shortName}`,
      `Arun Acharya ${project.role}`,
      "Arun Acharya project",
      ...project.stack,
      ...project.features,
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