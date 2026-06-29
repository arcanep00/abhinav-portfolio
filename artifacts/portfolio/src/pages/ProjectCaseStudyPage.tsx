import { useParams } from "wouter";
import { CaseStudyPage } from "@/components/CaseStudyPage";
import { PageShell } from "@/components/layout/PageShell";
import { getProjectBySlug } from "@/data/projects";
import NotFound from "@/pages/not-found";

export default function ProjectCaseStudyPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = getProjectBySlug(slug ?? "");

  if (!project) return <NotFound />;

  return (
    <PageShell>
      <CaseStudyPage project={project} />
    </PageShell>
  );
}
