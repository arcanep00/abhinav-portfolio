"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import type { Project } from "@/data/projects";
import { fadeUp, stagger } from "@/lib/motion";
import { Button } from "./Button";
import { GlassCard } from "./GlassCard";

type CaseStudyPageProps = {
  project: Project;
};

export function CaseStudyPage({ project }: CaseStudyPageProps) {
  return (
    <article className="px-5 pb-20 pt-28 sm:px-8 lg:px-12 lg:pb-28 lg:pt-32">
      <div className="mx-auto max-w-4xl">
        <motion.div initial="hidden" animate="show" variants={fadeUp}>
          <Link
            href="/projects"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-emeraldSoft"
          >
            <ArrowLeft size={16} /> Back to Projects
          </Link>
          <p className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-emeraldSoft">
            Case Study
          </p>
          <h1 className="mt-3 font-display text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
            {project.title}
          </h1>
          <p className="mt-4 text-lg leading-8 text-slate-300">{project.tagline}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-white/10 bg-white/[0.08] px-3 py-2 text-xs font-semibold text-slate-200"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href={project.github} variant="secondary" external>
              <Github size={17} /> GitHub
            </Button>
            <Button href={project.demo} variant="primary" external>
              <ExternalLink size={17} /> Live Demo
            </Button>
          </div>
          <div className="mt-8 h-1 w-full max-w-xs rounded-full bg-gradient-to-r from-emeraldSoft via-cyanSoft to-goldSoft shadow-glow" />
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="mt-14 space-y-8"
        >
          {project.sections.map((section) => (
            <motion.section key={section.id} id={section.id} variants={fadeUp}>
              <GlassCard className="p-6 sm:p-8">
                <h2 className="font-display text-2xl font-semibold text-white">{section.title}</h2>
                <div className="mt-5 space-y-4">
                  {Array.isArray(section.content) ? (
                    <ul className="space-y-3">
                      {section.content.map((item) => (
                        <li key={item} className="flex gap-3 leading-7 text-slate-300">
                          <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-emeraldSoft" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="leading-8 text-slate-300">{section.content}</p>
                  )}
                  {section.code ? (
                    <pre className="overflow-x-auto rounded-lg border border-white/10 bg-ink/60 p-5 font-mono text-sm leading-7 text-cyanSoft/90">
                      <code>{section.code}</code>
                    </pre>
                  ) : null}
                </div>
              </GlassCard>
            </motion.section>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mt-12"
        >
          <GlassCard className="p-6 sm:p-8">
            <h2 className="font-display text-xl font-semibold text-white">Technology Stack</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-emeraldSoft/20 bg-emeraldSoft/10 px-3 py-2 text-sm font-semibold text-emeraldSoft"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={project.github} variant="secondary" external>
                <Github size={17} /> View on GitHub
              </Button>
              <Button href={project.demo} variant="primary" external>
                <ExternalLink size={17} /> Live Demo
              </Button>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </article>
  );
}
