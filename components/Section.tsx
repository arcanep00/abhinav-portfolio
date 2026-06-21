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
    <section
      className={`relative px-5 pb-16 pt-28 sm:px-8 lg:px-12 lg:pb-24 lg:pt-32 ${className ?? ""}`}
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mb-9 max-w-3xl"
        >
          {eyebrow ? (
            <p className="mb-3 font-display text-xs font-semibold uppercase tracking-[0.22em] text-emeraldSoft">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="font-display text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          {description ? (
            <p className="mt-4 text-base leading-8 text-slate-300">{description}</p>
          ) : null}
        </motion.div>
        {children}
      </div>
    </section>
  );
}
