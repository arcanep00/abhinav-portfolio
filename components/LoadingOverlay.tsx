"use client";

import { motion } from "framer-motion";

export function LoadingOverlay() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0, pointerEvents: "none" }}
      transition={{ duration: 0.7, delay: 0.35, ease: "easeOut" }}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-ink"
    >
      <div className="relative h-16 w-16">
        <motion.span
          animate={{ rotate: 360 }}
          transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border border-transparent border-t-emeraldSoft"
        />
        <motion.span
          animate={{ scale: [0.85, 1, 0.85], opacity: [0.35, 1, 0.35] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-3 rounded-full bg-cyanSoft/20 blur-sm"
        />
      </div>
    </motion.div>
  );
}
