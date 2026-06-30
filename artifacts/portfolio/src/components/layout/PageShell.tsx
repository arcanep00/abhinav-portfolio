import { BackgroundFX } from "@/components/BackgroundFX";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { useEffect } from "react";
import Lenis from "lenis";

type PageShellProps = {
  children: React.ReactNode;
};

export function PageShell({ children }: PageShellProps) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{ background: "#050508" }}>
      <CustomCursor />
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
