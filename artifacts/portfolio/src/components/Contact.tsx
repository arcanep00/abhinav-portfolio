"use client";

import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { profile } from "@/data/profile";
import { fadeUp } from "@/lib/motion";
import { GlassCard } from "./GlassCard";
import { Section } from "./Section";

export function Contact() {
  return (
    <Section
      eyebrow="Contact"
      title="Open to Python backend, Django, and FastAPI roles."
      description="Best fit for teams hiring backend engineers who build reliable APIs, design PostgreSQL schemas, and deliver production-ready Python services."
    >
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.55 }}
      >
        <GlassCard className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div>
            <h3 className="font-display text-3xl font-semibold text-white">
              Let us build reliable backend systems.
            </h3>
            <p className="mt-4 max-w-2xl leading-8 text-slate-300">
              Reach out for Python backend developer roles, Django and FastAPI engineering
              positions, REST API development, or Odoo ERP customization opportunities.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {profile.targetRoles.map((role) => (
                <span
                  key={role}
                  className="rounded-md border border-emeraldSoft/20 bg-emeraldSoft/10 px-3 py-2 text-sm font-semibold text-emeraldSoft"
                >
                  {role}
                </span>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            {profile.contactLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.08] p-4 text-slate-200 transition hover:bg-white/[0.12] hover:text-white"
                >
                  <Icon className="text-emeraldSoft" size={19} aria-hidden="true" />
                  <span>
                    <span className="block text-xs uppercase tracking-[0.16em] text-slate-400">
                      {link.label}
                    </span>
                    <span className="block font-semibold">{link.value}</span>
                  </span>
                </a>
              );
            })}
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-emeraldSoft px-5 py-4 text-sm font-bold text-ink transition hover:bg-white"
            >
              <Send size={17} aria-hidden="true" /> Send Email
            </a>
          </div>
        </GlassCard>
      </motion.div>
    </Section>
  );
}
