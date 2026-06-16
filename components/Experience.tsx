"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { experience } from "@/data/profile";
import { fadeUp } from "@/lib/motion";
import { GlassCard } from "./GlassCard";
import { Section } from "./Section";

export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Real-world software development internship experience."
      description="Hands-on exposure to backend engineering, ERP customization, database work, API integration, debugging, testing, and version-controlled feature delivery."
    >
      <div className="space-y-6">
        {experience.map((item) => (
          <motion.div
            key={item.company}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55 }}
          >
            <GlassCard className="p-6 sm:p-8">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-emeraldSoft/[0.14] text-emeraldSoft">
                    <Briefcase size={23} />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-semibold text-white">{item.role}</h3>
                    <p className="mt-1 text-slate-300">
                      {item.company} · {item.location}
                    </p>
                  </div>
                </div>
                <span className="rounded-md border border-cyanSoft/20 bg-cyanSoft/10 px-4 py-2 text-sm font-semibold text-cyanSoft">
                  {item.period}
                </span>
              </div>
              <ul className="mt-7 grid gap-4 text-slate-300 md:grid-cols-2">
                {item.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3 leading-7">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-emeraldSoft" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
