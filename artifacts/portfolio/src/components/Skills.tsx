"use client";

import { motion } from "framer-motion";
import { skillCategories, skillLevels } from "@/data/profile";
import { fadeUp, stagger } from "@/lib/motion";
import { GlassCard } from "./GlassCard";
import { Section } from "./Section";

const ODOO_ITEMS = ["Odoo ERP"];

const filteredSkillLevels = skillLevels.filter((s) => !ODOO_ITEMS.includes(s.name));

const filteredCategories = skillCategories.map((group) => ({
  ...group,
  items: group.items.filter((item) => !ODOO_ITEMS.includes(item))
}));

export function Skills() {
  return (
    <Section
      eyebrow="Skills"
      title="Python backend stack organized for engineering roles."
      description="Languages, frameworks, databases, and core backend concepts aligned with Python Developer, Django Developer, FastAPI Developer, and REST API Engineer positions."
    >
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="mb-8 grid gap-4 lg:grid-cols-2"
      >
        {filteredSkillLevels.map((skill) => (
          <motion.div key={skill.name} variants={fadeUp}>
            <GlassCard className="p-5">
              <div className="mb-3 flex items-center justify-between gap-4">
                <div>
                  <p className="font-display text-lg font-semibold text-white">{skill.name}</p>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                    {skill.category}
                  </p>
                </div>
                <span
                  className="rounded-md px-3 py-1 text-sm font-bold"
                  style={{ border: "1px solid rgba(0,255,157,0.2)", background: "rgba(0,255,157,0.1)", color: "#00ff9d" }}
                >
                  {skill.level}%
                </span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.1, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{ background: "linear-gradient(to right, #00ff9d, #00f5ff, #a78bfa)" }}
                  role="progressbar"
                  aria-valuenow={skill.level}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${skill.name} proficiency`}
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
        {filteredCategories.map((group) => {
          const Icon = group.icon;
          return (
            <motion.div key={group.title} variants={fadeUp}>
              <GlassCard className="h-full p-6">
                <div className="mb-5 flex items-center gap-3">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-lg"
                    style={{ background: "rgba(0,255,157,0.1)", color: "#00ff9d" }}
                  >
                    <Icon size={21} aria-hidden="true" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-white">{group.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md px-3 py-2 text-sm text-slate-200"
                      style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.05)" }}
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

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="mt-8 flex flex-wrap items-center gap-3"
      >
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
          Also worked with
        </span>
        {ODOO_ITEMS.map((item) => (
          <span
            key={item}
            className="rounded px-2.5 py-1 font-mono text-xs text-slate-600"
            style={{ border: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.02)" }}
          >
            {item}
          </span>
        ))}
      </motion.div>
    </Section>
  );
}
