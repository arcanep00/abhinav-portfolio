import { Hero } from "@/components/Hero";
import { HomeHighlights } from "@/components/HomeHighlights";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { PageShell } from "@/components/layout/PageShell";

export default function HomePage() {
  return (
    <PageShell>
      <LoadingOverlay />
      <Hero />
      <HomeHighlights />
    </PageShell>
  );
}
