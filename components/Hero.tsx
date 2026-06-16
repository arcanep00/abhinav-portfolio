"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Download, Github, Mail, Sparkles } from "lucide-react";
import Image from "next/image";
import { profile } from "@/data/profile";

const stats = [
  ["Current", "Software Dev Intern"],
  ["Core", "Python + Django"],
  ["ERP", "Odoo + PostgreSQL"]
];

export function Hero() {
  return (
    <section
      id="hero"
      className="relative isolate min-h-screen overflow-hidden px-5 pb-16 pt-28 sm:px-8 lg:px-12"
    >
      <Image
        src="/hero-backend-workspace.png"
        alt="Dark developer workspace with code, database, and API visuals"
        fill
        priority
        className="absolute inset-0 -z-20 object-cover opacity-[0.42]"
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#071013_0%,rgba(7,16,19,0.92)_34%,rgba(7,16,19,0.68)_64%,rgba(7,16,19,0.9)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-radial-grid opacity-80" />
      <motion.div
        aria-hidden="true"
        animate={{ x: ["-20%", "120%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute top-28 -z-10 h-px w-1/2 bg-gradient-to-r from-transparent via-emeraldSoft/50 to-transparent"
      />

      <div className="mx-auto grid min-h-[calc(100vh-7rem)] max-w-7xl items-center gap-12 lg:grid-cols-[1.06fr_0.94fr]">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <div className="mb-5 flex flex-wrap gap-2">
            {profile.targetRoles.slice(0, 3).map((role) => (
              <span
                key={role}
                className="rounded-md border border-white/10 bg-white/10 px-3 py-2 text-xs font-semibold text-slate-200 backdrop-blur"
              >
                {role}
              </span>
            ))}
          </div>
          <p className="font-display text-sm font-semibold uppercase tracking-[0.22em] text-emeraldSoft">
            <span className="inline-flex items-center gap-2">
              <Sparkles size={15} /> {profile.role}
            </span>
          </p>
          <h1 className="mt-5 max-w-4xl font-display text-4xl font-semibold leading-tight text-white sm:text-6xl lg:text-7xl">
            Backend Developer for <span className="premium-text">Python, Django and Odoo ERP</span> systems.
          </h1>
          <div className="mt-4 h-1.5 w-44 rounded-full bg-gradient-to-r from-emeraldSoft via-cyanSoft to-goldSoft shadow-glow" />
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            {profile.headline} Currently contributing as a Software Development
            Intern with hands-on work across ERP customization, databases, APIs,
            debugging, and feature delivery.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-emeraldSoft px-5 py-3 text-sm font-bold text-ink transition hover:bg-white"
            >
              View Projects <ArrowRight size={17} />
            </a>
            <a
              href="/Abhinav-Pandey-Resume.pdf"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-white/[0.14] bg-white/[0.08] px-5 py-3 text-sm font-bold text-white backdrop-blur transition hover:bg-white/[0.14]"
            >
              Resume <Download size={17} />
            </a>
          </div>
          <div className="mt-9 grid max-w-2xl gap-3 sm:grid-cols-3">
            {stats.map(([label, value], index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32 + index * 0.08, duration: 0.5 }}
                className="rounded-lg border border-white/10 bg-white/[0.07] p-4 backdrop-blur-xl"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{label}</p>
                <p className="mt-2 font-display text-base font-semibold text-white">{value}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-9 flex flex-wrap gap-4 text-sm text-slate-300">
            <a className="inline-flex items-center gap-2 hover:text-white" href={`mailto:${profile.email}`}>
              <Mail size={16} /> {profile.email}
            </a>
            <a className="inline-flex items-center gap-2 hover:text-white" href="#">
              <Github size={16} /> GitHub
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="hidden lg:block"
        >
          <div className="relative rounded-lg border border-white/10 bg-white/[0.07] p-5 shadow-glow backdrop-blur-2xl">
            <motion.div
              aria-hidden="true"
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-7 -top-7 rounded-lg border border-emeraldSoft/20 bg-ink/80 px-4 py-3 text-sm font-semibold text-emeraldSoft shadow-glow backdrop-blur-xl"
            >
              REST API Ready
            </motion.div>
            <div className="mb-5 flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-goldSoft" />
              <span className="h-3 w-3 rounded-full bg-emeraldSoft" />
            </div>
            <div className="space-y-4 font-mono text-sm text-slate-300">
              <p><span className="text-cyanSoft">role</span>: backend_developer</p>
              <p><span className="text-cyanSoft">stack</span>: Python, Django, Odoo, PostgreSQL</p>
              <p><span className="text-cyanSoft">focus</span>: APIs, ERP workflows, database design</p>
              <p><span className="text-cyanSoft">status</span>: internship_experience_active</p>
            </div>
            <div className="mt-6 grid gap-3">
              {["PostgreSQL data modeling", "Odoo workflow customization", "Version-controlled delivery"].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-md border border-white/10 bg-ink/40 px-4 py-3 text-sm text-slate-200">
                  <CheckCircle2 size={16} className="text-emeraldSoft" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
