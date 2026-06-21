import { About } from "@/components/About";
import { PageShell } from "@/components/layout/PageShell";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "About",
  description:
    "About Abhinav Pandey — Python Backend Engineer specializing in Django, FastAPI, REST APIs, PostgreSQL, and Odoo ERP development.",
  path: "/about"
});

export default function AboutPage() {
  return (
    <PageShell>
      <About />
    </PageShell>
  );
}
