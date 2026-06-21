import { OdooExperience } from "@/components/OdooExperience";
import { PageShell } from "@/components/layout/PageShell";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Odoo ERP",
  description:
    "Odoo ERP development experience of Abhinav Pandey — module customization, workflow automation, PostgreSQL integration, and Python backend engineering.",
  path: "/odoo",
  keywords: ["Odoo ERP", "ERP Customization", "Python Backend"]
});

export default function OdooPage() {
  return (
    <PageShell>
      <OdooExperience />
    </PageShell>
  );
}
