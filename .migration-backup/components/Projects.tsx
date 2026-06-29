"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink, Github, Layers3 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { projects } from "@/data/projects";
import { fadeUp, stagger } from "@/lib/motion";
import { GlassCard } from "./GlassCard";
import { Section } from "./Section";

export function Projects() {
  const [active, setActive] = useState(0);
  const activeProject = projects[active];

  return (
    <Section
      eyebrow="Projects"
      title="Three flagship backend systems built for production thinking."
      description="Each project demonstrates API design, database architecture, authentication, and scalable backend patterns relevant to Python backend engineering roles."
    >
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.55 }}
        className="mb-6"
      >
        <GlassCard className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="relative min-h-72 overflow-hidden rounded-lg border border-white/10 bg-ink/70 p-5">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(100,244,172,0.18),transparent_30%),radial-gradient(circle_at_80%_70%,rgba(139,233,255,0.16),transparent_32%)]" />
            <div className="relative">
              <div className="mb-5 flex items-center justify-between">
                <span className="rounded-md border border-emeraldSoft/25 bg-emeraldSoft/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.16em] text-emeraldSoft">
                  Featured
                </span>
                <Layers3 className="text-cyanSoft" size={22} aria-hidden="true" />
              </div>
              <motion.div
                key={activeProject.slug}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
              >
                <p className="text-sm font-semibold text-cyanSoft">{activeProject.category}</p>
                <h3 className="mt-3 font-display text-3xl font-semibold text-white">
                  {activeProject.title}
                </h3>
                <p className="mt-4 leading-8 text-slate-300">{activeProject.description}</p>
                <div className="mt-6 inline-flex items-center gap-2 rounded-md bg-white/10 px-4 py-3 text-sm font-semibold text-white">
                  <ArrowUpRight size={17} aria-hidden="true" /> {activeProject.impact}
                </div>
              </motion.div>
            </div>
          </div>
          <div className="grid gap-3">
            {projects.map((project, index) => (
              <button
                key={project.slug}
                type="button"
                onClick={() => setActive(index)}
                className={`rounded-lg border p-4 text-left transition duration-300 ${
                  active === index
                    ? "border-emeraldSoft/40 bg-emeraldSoft/10"
                    : "border-white/10 bg-white/[0.055] hover:border-white/20 hover:bg-white/[0.08]"
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                      {project.category}
                    </p>
                    <p className="mt-2 font-display text-lg font-semibold text-white">
                      {project.title}
                    </p>
                  </div>
                  <span className="text-sm font-bold text-emeraldSoft">0{index + 1}</span>
                </div>
              </button>
            ))}
          </div>
        </GlassCard>
      </motion.div>
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.18 }}
        className="grid gap-5 lg:grid-cols-3"
      >
        {projects.map((project) => (
          <motion.article key={project.slug} variants={fadeUp} whileHover={{ y: -8 }}>
            <GlassCard className="flex h-full flex-col p-6">
              <div className="mb-5 flex items-center justify-between gap-4">
                <span className="rounded-md border border-cyanSoft/20 bg-cyanSoft/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] text-cyanSoft">
                  {project.category}
                </span>
                <ArrowUpRight className="text-slate-500" size={20} aria-hidden="true" />
              </div>
              <h3 className="font-display text-2xl font-semibold text-white">{project.title}</h3>
              <p className="mt-4 leading-7 text-slate-300">{project.description}</p>
              <div className="mt-6">
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-emeraldSoft">
                  Features
                </p>
                <ul className="space-y-3 text-sm leading-6 text-slate-300">
                  {project.features.slice(0, 4).map((feature) => (
                    <li key={feature} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyanSoft" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.technologies.slice(0, 5).map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-white/10 bg-white/[0.08] px-3 py-2 text-xs font-semibold text-slate-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="mt-auto flex flex-col gap-3 pt-7">
                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-emeraldSoft px-4 py-3 text-sm font-semibold text-ink transition hover:bg-white"
                >
                  Read Case Study <ArrowUpRight size={16} />
                </Link>
                <div className="flex gap-3">
                  <a
                    href={project.github}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-md border border-white/[0.12] px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    <Github size={16} aria-hidden="true" /> GitHub
                  </a>
                  <a
                    href={project.demo}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-md border border-white/[0.12] px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    <ExternalLink size={16} aria-hidden="true" /> Demo
                  </a>
                </div>
              </div>
            </GlassCard>
          </motion.article>
        ))}
      </motion.div>
    </Section>
  );
}
