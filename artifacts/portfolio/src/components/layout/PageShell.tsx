import { BackgroundFX } from "@/components/BackgroundFX";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

type PageShellProps = {
  children: React.ReactNode;
};

export function PageShell({ children }: PageShellProps) {
  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{ background: "#050508" }}>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-[#00ff9d] focus:px-4 focus:py-2 focus:text-[#050508]"
      >
        Skip to main content
      </a>
      <BackgroundFX />
      <Navbar />
      <main id="main-content">{children}</main>
      <Footer />
    </div>
  );
}
