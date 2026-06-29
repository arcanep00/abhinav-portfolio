"use client";

import { useEffect, useRef } from "react";
import { Briefcase } from "lucide-react";
import { experience } from "@/data/profile";
import { GlassCard } from "./GlassCard";
import { Section } from "./Section";

function useSlideIn(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.opacity = "0";
    el.style.transform = "translateX(-60px)";
    el.style.transition = "opacity 0.65s ease, transform 0.65s ease";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateX(0)";
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}

function ExperienceCard({ item, delay }: { item: typeof experience[0]; delay: number }) {
  const ref = useSlideIn(0.2);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transitionDelay = `${delay}s`;
  }, [ref, delay]);

  return (
    <div ref={ref}>
      <GlassCard className="p-6 sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-emeraldSoft/[0.14] text-emeraldSoft">
              <Briefcase size={23} aria-hidden="true" />
            </div>
            <div>
              <h3 className="font-display text-2xl font-semibold text-white">{item.role}</h3>
              <p className="mt-1 text-slate-300">
                {item.company} · {item.location}
              </p>
              <p className="mt-3 max-w-2xl leading-7 text-slate-400">{item.summary}</p>
            </div>
          </div>
          <span className="shrink-0 rounded-md border border-cyanSoft/20 bg-cyanSoft/10 px-4 py-2 text-sm font-semibold text-cyanSoft">
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
        <div className="mt-7 flex flex-wrap gap-2 border-t border-white/10 pt-6">
          {item.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-white/10 bg-white/[0.08] px-3 py-2 text-xs font-semibold text-slate-200"
            >
              {tech}
            </span>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}

export function Experience() {
  return (
    <Section
      eyebrow="Experience"
      title="Engineering impact through backend development and ERP customization."
      description="Internship experience focused on delivering reliable Python backend systems, REST APIs, and Odoo ERP solutions with measurable engineering outcomes."
    >
      <div className="relative">
        <div
          className="absolute left-6 top-0 hidden h-full w-px sm:block"
          style={{
            background: "linear-gradient(to bottom, transparent, #00ff9d 10%, #00ff9d 90%, transparent)",
            boxShadow: "0 0 8px rgba(0,255,157,0.6), 0 0 20px rgba(0,255,157,0.2)"
          }}
          aria-hidden="true"
        />
        <div className="space-y-6 sm:pl-16">
          {experience.map((item, i) => (
            <ExperienceCard key={item.company} item={item} delay={i * 0.12} />
          ))}
        </div>
      </div>
    </Section>
  );
}
