import { useEffect } from 'react';

export function useAnimateOnScroll() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated');
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    function observeNew() {
      document
        .querySelectorAll('.animate-on-scroll:not([data-ao]), .animate-on-scroll-left:not([data-ao])')
        .forEach((el) => {
          el.setAttribute('data-ao', '1');
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
