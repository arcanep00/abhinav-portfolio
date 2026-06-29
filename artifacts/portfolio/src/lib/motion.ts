export const fadeUp = {
  hidden: { opacity: 0, y: 34, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" }
};

export const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.04
    }
  }
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94, filter: "blur(10px)" },
  show: { opacity: 1, scale: 1, filter: "blur(0px)" }
};
