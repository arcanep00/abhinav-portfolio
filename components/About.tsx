"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { profile } from "@/data/profile";
import { fadeUp, stagger } from "@/lib/motion";
import { GlassCard } from "./GlassCard";
import { Section } from "./Section";

const focus = [
  "Backend Engineering",
  "Python Ecosystem",
  "REST APIs",
  "FastAPI",
  "Django",
  "Database Design",
  "Odoo ERP",
  "Scalable Systems"
];

export function About() {
  return (
    <Section
      eyebrow="About"
      title="Backend engineer focused on Python, APIs, and production systems."
    >
      <div className="mb-10 max-w-3xl space-y-5">
        {profile.aboutParagraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 40)} className="leading-8 text-slate-300">
            {paragraph}
          </p>
        ))}
      </div>
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
      >
        {focus.map((item) => (
          <motion.div key={item} variants={fadeUp}>
            <GlassCard className="flex h-full items-center gap-3 p-5">
              <CheckCircle2 className="shrink-0 text-emeraldSoft" size={20} aria-hidden="true" />
              <span className="font-semibold text-white">{item}</span>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
