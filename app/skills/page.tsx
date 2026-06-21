import { Skills } from "@/components/Skills";
import { PageShell } from "@/components/layout/PageShell";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Skills",
  description:
    "Technical skills of Abhinav Pandey — Python, Django, FastAPI, REST APIs, PostgreSQL, Redis, Docker, Odoo ERP, and backend engineering concepts.",
  path: "/skills"
});

export default function SkillsPage() {
  return (
    <PageShell>
      <Skills />
    </PageShell>
  );
}
