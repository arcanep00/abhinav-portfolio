import { Contact } from "@/components/Contact";
import { PageShell } from "@/components/layout/PageShell";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Contact",
  description:
    "Contact Abhinav Pandey for Python Backend Engineer, Django Developer, FastAPI Developer, REST API, and Odoo ERP roles.",
  path: "/contact"
});

export default function ContactPage() {
  return (
    <PageShell>
      <Contact />
    </PageShell>
  );
}
