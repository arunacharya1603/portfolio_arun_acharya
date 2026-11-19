import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { WorkProjectPageContent } from "@/components/StudioPortfolio";
import { getWorkProjectBySlug, workProjects } from "@/data/work-projects";
import {
  breadcrumbJsonLd,
  createPageMetadata,
  caseStudyJsonLd,
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
    title: project.seoTitle,
    description: project.seoDescription,
    path: `/work/${project.slug}`,
    image: project.image,
    imageSize: project.imageSize,
    type: "article",
    keywords: project.caseStudy.topics,
  });
}

export default function WorkProjectPage({ params }: WorkProjectPageProps) {
  const project = getWorkProjectBySlug(params.id);

  if (!project) {
    notFound();
  }

  const schemas = [
    caseStudyJsonLd(project),
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
        />
      ))}
      <WorkProjectPageContent project={project} />
    </>
  );
}
