"use client";

import { motion } from "framer-motion";
import { skillLevels, skills } from "@/data/profile";
import { fadeUp, stagger } from "@/lib/motion";
import { GlassCard } from "./GlassCard";
import { Section } from "./Section";

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="Backend-first stack with enterprise application exposure."
      description="A practical skill set for software developer, backend developer, Django developer, Python developer, and Odoo developer roles."
    >
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="mb-8 grid gap-4 lg:grid-cols-2"
      >
        {skillLevels.map((skill) => (
          <motion.div key={skill.name} variants={fadeUp}>
            <GlassCard className="p-5">
              <div className="mb-3 flex items-center justify-between gap-4">
                <div>
                  <p className="font-display text-lg font-semibold text-white">{skill.name}</p>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                    {skill.category}
                  </p>
                </div>
                <span className="rounded-md border border-emeraldSoft/20 bg-emeraldSoft/10 px-3 py-1 text-sm font-bold text-emeraldSoft">
                  {skill.level}%
                </span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.1, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-emeraldSoft via-cyanSoft to-goldSoft"
                />
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
      >
        {skills.map((group) => {
          const Icon = group.icon;
          return (
            <motion.div key={group.title} variants={fadeUp}>
              <GlassCard className="h-full p-6">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/10 text-emeraldSoft">
                    <Icon size={21} />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-white">{group.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md border border-white/10 bg-white/[0.08] px-3 py-2 text-sm text-slate-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </motion.div>
    </Section>
  );
}
