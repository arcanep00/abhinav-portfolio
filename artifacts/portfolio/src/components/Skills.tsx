"use client";

import { useEffect, useRef } from "react";
import { skillCategories, skillLevels } from "@/data/profile";
import { GlassCard } from "./GlassCard";
import { Section } from "./Section";

const ODOO_ITEMS = ["Odoo ERP"];
const filteredSkillLevels = skillLevels.filter((s) => !ODOO_ITEMS.includes(s.name));
const filteredCategories = skillCategories.map((group) => ({
  ...group,
  items: group.items.filter((item) => !ODOO_ITEMS.includes(item))
}));

const STAGGER = ["", "stagger-1", "stagger-2", "stagger-3", "stagger-4", "stagger-5"];

function ProgressBar({ level, name }: { level: number; name: string }) {
  const barRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { bar.style.width = `${level}%`; observer.disconnect(); } },
      { threshold: 0.5 }
    );
    observer.observe(bar.parentElement!);
    return () => observer.disconnect();
  }, [level]);

  return (
    <div className="h-2.5 overflow-hidden rounded-full bg-white/10">
      <div
        ref={barRef}
        className="h-full rounded-full"
        style={{ width: 0, background: "linear-gradient(to right, #00ff9d, #00f5ff, #a78bfa)", transition: "width 1.2s ease" }}
        role="progressbar" aria-valuenow={level} aria-valuemin={0} aria-valuemax={100} aria-label={`${name} proficiency`}
      />
    </div>
  );
}

export function Skills() {
  return (
    <Section
      eyebrow="Skills"
      title="Python backend stack organized for engineering roles."
      description="Languages, frameworks, databases, and core backend concepts aligned with Python Developer, Django Developer, FastAPI Developer, and REST API Engineer positions."
    >
      <div className="mb-8 grid gap-4 lg:grid-cols-2">
        {filteredSkillLevels.map((skill, i) => (
          <div key={skill.name} className={`animate-on-scroll ${STAGGER[Math.min(i, 5)]}`}>
            <GlassCard className="p-5">
              <div className="mb-3 flex items-center justify-between gap-4">
                <div>
                  <p className="font-display text-lg font-semibold text-white">{skill.name}</p>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{skill.category}</p>
                </div>
                <span className="rounded-md px-3 py-1 text-sm font-bold"
                  style={{ border: "1px solid rgba(0,255,157,0.2)", background: "rgba(0,255,157,0.1)", color: "#00ff9d" }}>
                  {skill.level}%
                </span>
              </div>
              <ProgressBar level={skill.level} name={skill.name} />
            </GlassCard>
          </div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredCategories.map((group, i) => {
          const Icon = group.icon;
          return (
            <div key={group.title} className={`animate-on-scroll ${STAGGER[Math.min(i, 5)]}`}>
              <GlassCard className="h-full p-6">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg"
                    style={{ background: "rgba(0,255,157,0.1)", color: "#00ff9d" }}>
                    <Icon size={21} aria-hidden="true" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-white">{group.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span key={skill} className="rounded-md px-3 py-2 text-sm text-slate-200"
                      style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.05)" }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">Also worked with</span>
        {ODOO_ITEMS.map((item) => (
          <span key={item} className="rounded px-2.5 py-1 font-mono text-xs text-slate-600"
            style={{ border: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.02)" }}>
            {item}
          </span>
        ))}
      </div>
    </Section>
  );
}
