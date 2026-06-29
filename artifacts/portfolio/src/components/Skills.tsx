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

function useScrollReveal(staggerMs = 100) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = Array.from(container.querySelectorAll<HTMLElement>("[data-reveal]"));
    cards.forEach((card, i) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(40px)";
      card.style.transition = `opacity 0.55s ease ${i * staggerMs}ms, transform 0.55s ease ${i * staggerMs}ms`;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = "1";
            (entry.target as HTMLElement).style.transform = "translateY(0)";
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [staggerMs]);

  return containerRef;
}

function ProgressBar({ level }: { level: number }) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    bar.style.width = "0%";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          bar.style.transition = "width 1.1s ease";
          bar.style.width = `${level}%`;
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(bar);
    return () => observer.disconnect();
  }, [level]);

  return (
    <div className="h-2.5 overflow-hidden rounded-full bg-white/10">
      <div
        ref={barRef}
        className="h-full rounded-full"
        style={{ background: "linear-gradient(to right, #00ff9d, #00f5ff, #a78bfa)" }}
        role="progressbar"
        aria-valuenow={level}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${level}% proficiency`}
      />
    </div>
  );
}

export function Skills() {
  const levelRef = useScrollReveal(80);
  const catRef = useScrollReveal(90);

  return (
    <Section
      eyebrow="Skills"
      title="Python backend stack organized for engineering roles."
      description="Languages, frameworks, databases, and core backend concepts aligned with Python Developer, Django Developer, FastAPI Developer, and REST API Engineer positions."
    >
      <div ref={levelRef} className="mb-8 grid gap-4 lg:grid-cols-2">
        {filteredSkillLevels.map((skill) => (
          <div key={skill.name} data-reveal>
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
              <ProgressBar level={skill.level} />
            </GlassCard>
          </div>
        ))}
      </div>

      <div ref={catRef} className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredCategories.map((group) => {
          const Icon = group.icon;
          return (
            <div key={group.title} data-reveal>
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
            </div>
          );
        })}
      </div>

      <div
        className="mt-8 flex flex-wrap items-center gap-3"
        style={{ opacity: 0.6 }}
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
      </div>
    </Section>
  );
}
