"use client";

import { motion } from "framer-motion";
import { odooCapabilities, odooHighlights } from "@/data/profile";
import { fadeUp } from "@/lib/motion";
import { GlassCard } from "./GlassCard";
import { Section } from "./Section";

export function OdooExperience() {
  return (
    <Section
      eyebrow="Odoo ERP"
      title="Odoo ERP development for enterprise backend workflows."
      description="Practical ERP customization experience connecting Python backend engineering with business process automation, PostgreSQL data handling, and production feature delivery."
    >
      <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55 }}
        >
          <GlassCard className="grid h-full grid-cols-2 gap-3 p-5">
            {odooCapabilities.map((tile) => {
              const Icon = tile.icon;
              return (
                <div
                  key={tile.label}
                  className="rounded-lg border border-white/10 bg-ink/[0.46] p-5"
                >
                  <Icon className="text-emeraldSoft" size={25} aria-hidden="true" />
                  <p className="mt-4 font-display text-lg font-semibold text-white">
                    {tile.label}
                  </p>
                </div>
              );
            })}
          </GlassCard>
        </motion.div>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, delay: 0.1 }}
        >
          <GlassCard className="h-full p-6 sm:p-8">
            <p className="text-lg leading-8 text-slate-300">
              My Odoo ERP work sits at the intersection of Python backend development,
              business workflow customization, PostgreSQL-backed data handling, and
              report-level feature delivery — the same engineering discipline I apply to
              Django and FastAPI REST API projects.
            </p>
            <ul className="mt-7 space-y-4">
              {odooHighlights.map((highlight) => (
                <li key={highlight} className="flex gap-3 text-slate-300">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-emeraldSoft" />
                  <span className="leading-7">{highlight}</span>
                </li>
              ))}
            </ul>
          </GlassCard>
        </motion.div>
      </div>
    </Section>
  );
}
