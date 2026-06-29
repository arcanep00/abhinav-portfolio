import { useEffect } from "react";

export function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    document
      .querySelectorAll(".reveal, .reveal-left")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}
