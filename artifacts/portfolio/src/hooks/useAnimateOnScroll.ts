import { useEffect } from "react";

export function useAnimateOnScroll() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -20px 0px" }
    );

    function observeNew() {
      document
        .querySelectorAll(".reveal:not([data-ao])")
        .forEach((el) => {
          el.setAttribute("data-ao", "1");
          io.observe(el);
        });
    }

    observeNew();

    const mo = new MutationObserver(observeNew);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
}
