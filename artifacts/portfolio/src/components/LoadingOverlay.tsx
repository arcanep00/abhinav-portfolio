"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingOverlay() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 1400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
          style={{ background: "#050508" }}
        >
          <div className="relative mb-6">
            <div
              className="h-16 w-16 animate-spin rounded-full"
              style={{ border: "1px solid rgba(0,255,157,0.15)", borderTopColor: "#00ff9d" }}
            />
            <div
              className="absolute inset-2 animate-spin rounded-full"
              style={{ border: "1px solid rgba(0,245,255,0.1)", borderTopColor: "#00f5ff", animationDirection: "reverse", animationDuration: "0.8s" }}
            />
          </div>
          <p className="font-mono text-xs tracking-[0.22em] text-[#00ff9d]" style={{ textShadow: "0 0 20px rgba(0,255,157,0.5)" }}>
            INITIALIZING
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
