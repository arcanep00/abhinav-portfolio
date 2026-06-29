import { useEffect } from 'react';

export function useAnimateOnScroll() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    const elements = document.querySelectorAll('.animate-on-scroll, .animate-on-scroll-left');
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}
