"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { profile } from "@/data/profile";
import { fadeUp, stagger } from "@/lib/motion";
import { GlassCard } from "./GlassCard";
import { Section } from "./Section";

const focus = ["Python", "Django", "Odoo ERP", "PostgreSQL", "REST APIs", "Backend Development"];

export function About() {
  return (
    <Section
      id="about"
      eyebrow="About Me"
      title="Software engineer profile shaped around backend and ERP delivery."
      description={profile.summary}
    >
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
      >
        {focus.map((item) => (
          <motion.div key={item} variants={fadeUp}>
            <GlassCard className="flex h-full items-center gap-3 p-5">
              <CheckCircle2 className="shrink-0 text-emeraldSoft" size={20} />
              <span className="font-semibold text-white">{item}</span>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
