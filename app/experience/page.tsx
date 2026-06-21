import { Experience } from "@/components/Experience";
import { PageShell } from "@/components/layout/PageShell";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Experience",
  description:
    "Professional experience of Abhinav Pandey — Software Development Intern at Etelligense Technology with Python, Django, FastAPI, Odoo ERP, and PostgreSQL.",
  path: "/experience"
});

export default function ExperiencePage() {
  return (
    <PageShell>
      <Experience />
    </PageShell>
  );
}
