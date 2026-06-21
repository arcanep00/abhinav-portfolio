import { Projects } from "@/components/Projects";
import { PageShell } from "@/components/layout/PageShell";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Projects",
  description:
    "Flagship backend projects by Abhinav Pandey — Healthcare Backend API (Django REST), Financial Transaction Processing (FastAPI), and ServiQ marketplace platform.",
  path: "/projects",
  keywords: ["Django REST Framework", "FastAPI", "Celery", "Redis", "Healthcare API"]
});

export default function ProjectsPage() {
  return (
    <PageShell>
      <Projects />
    </PageShell>
  );
}
