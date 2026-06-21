import { Education } from "@/components/Education";
import { PageShell } from "@/components/layout/PageShell";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Education",
  description:
    "Education of Abhinav Pandey — B.Tech in Computer Science Engineering from ABES Institute of Technology, Ghaziabad.",
  path: "/education"
});

export default function EducationPage() {
  return (
    <PageShell>
      <Education />
    </PageShell>
  );
}
