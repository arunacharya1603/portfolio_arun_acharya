import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { WorkProjectPageContent } from "@/components/StudioPortfolio";
import { getWorkProjectBySlug, workProjects } from "@/data/work-projects";
import { siteConfig } from "@/lib/site";

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

  return {
    title: `${project.shortName} Case Study`,
    description: project.description,
    alternates: {
      canonical: `${siteConfig.url}/work/${project.slug}`,
    },
    openGraph: {
      title: `${project.name} | Arun Acharya`,
      description: project.description,
      url: `${siteConfig.url}/work/${project.slug}`,
      type: "article",
      images: [
        {
          url: project.image,
          width: 1200,
          height: 630,
          alt: `${project.name} project preview`,
        },
      ],
    },
  };
}

export default function WorkProjectPage({ params }: WorkProjectPageProps) {
  const project = getWorkProjectBySlug(params.id);

  if (!project) {
    notFound();
  }

  return <WorkProjectPageContent project={project} />;
}
