import { notFound } from "next/navigation";
import { CaseStudyPage } from "@/components/CaseStudyPage";
import { JsonLd } from "@/components/JsonLd";
import { PageShell } from "@/components/layout/PageShell";
import { getProjectBySlug, getProjectSlugs } from "@/data/projects";
import { createMetadata, projectJsonLd } from "@/lib/seo";

type PageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: PageProps) {
  const project = getProjectBySlug(params.slug);
  if (!project) return {};

  return createMetadata({
    title: project.title,
    description: project.description,
    path: `/projects/${project.slug}`,
    keywords: project.technologies
  });
}

export default function ProjectCaseStudyPage({ params }: PageProps) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  return (
    <PageShell>
      <JsonLd data={projectJsonLd(project)} />
      <CaseStudyPage project={project} />
    </PageShell>
  );
}
