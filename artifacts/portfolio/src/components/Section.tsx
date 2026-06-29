"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

type SectionProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
};

export function Section({ eyebrow, title, description, children, className }: SectionProps) {
  return (
    <section className={`relative px-5 pb-20 pt-28 sm:px-8 lg:px-12 lg:pb-28 lg:pt-32 ${className ?? ""}`}>
      <div className="mx-auto max-w-7xl">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-10 max-w-3xl"
        >
          {eyebrow && (
            <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.22em] text-[#00ff9d]"
               style={{ textShadow: "0 0 20px rgba(0,255,157,0.5)" }}>
              // {eyebrow}
            </p>
          )}
          <h2 className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          {description && (
            <p className="mt-4 text-base leading-8 text-slate-400">{description}</p>
          )}
        </motion.div>
        {children}
      </div>
    </section>
  );
}
