"use client";

import { ArrowRight, Briefcase, Code2, FolderGit2, GraduationCap, Layers } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/motion";
import { GlassCard } from "./GlassCard";

const highlights = [
  {
    title: "About",
    description: "Backend engineering focus, Python ecosystem, and production software mindset.",
    href: "/about",
    icon: Code2
  },
  {
    title: "Experience",
    description: "Internship impact at Etelligense Technology across Django, Odoo, and REST APIs.",
    href: "/experience",
    icon: Briefcase
  },
  {
    title: "Projects",
    description: "Three flagship backend systems with dedicated case studies.",
    href: "/projects",
    icon: FolderGit2
  },
  {
    title: "Skills",
    description: "Django, FastAPI, PostgreSQL, Redis, Docker, and API design.",
    href: "/skills",
    icon: Layers
  },
  {
    title: "Education",
    description: "B.Tech CSE at ABES Institute of Technology.",
    href: "/education",
    icon: GraduationCap
  }
];

export function HomeHighlights() {
  return (
    <section className="relative px-5 pb-24 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          className="mb-8 max-w-2xl"
        >
          <p className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-emeraldSoft">
            Explore
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold text-white sm:text-3xl">
            Backend engineering profile, organized for recruiters.
          </h2>
        </motion.div>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div key={item.href} variants={fadeUp}>
                <Link href={item.href} className="block h-full">
                  <GlassCard className="flex h-full flex-col p-6">
                    <Icon className="text-emeraldSoft" size={24} aria-hidden="true" />
                    <h3 className="mt-4 font-display text-xl font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 flex-1 leading-7 text-slate-300">{item.description}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-emeraldSoft">
                      View <ArrowRight size={16} aria-hidden="true" />
                    </span>
                  </GlassCard>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
