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
      id="contact"
      eyebrow="Contact"
      title="Open to software, backend, Django, Python, and Odoo roles."
      description="Best fit: teams looking for an early-career developer with hands-on internship exposure, strong backend fundamentals, and a focused ERP learning curve."
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
            <h3 className="font-display text-3xl font-semibold text-white">Let us build reliable backend systems.</h3>
            <p className="mt-4 max-w-2xl leading-8 text-slate-300">
              Reach out for internship-to-full-time opportunities, junior software developer roles, Python/Django backend work, or Odoo ERP development needs.
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
                  <Icon className="text-emeraldSoft" size={19} />
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
              <Send size={17} /> Send Email
            </a>
          </div>
        </GlassCard>
      </motion.div>
    </Section>
  );
}
