"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

type SectionProps = {
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children: React.ReactNode;
};

export function Section({ id, eyebrow, title, description, children }: SectionProps) {
  return (
    <section id={id} className="relative px-5 py-[4.5rem] sm:px-8 lg:px-12 lg:py-28">
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
