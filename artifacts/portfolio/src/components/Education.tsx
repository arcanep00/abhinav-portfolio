"use client";

import { useEffect, useRef } from "react";
import { education } from "@/data/profile";
import { GlassCard } from "./GlassCard";
import { Section } from "./Section";

export function Education() {
  const Icon = education.icon;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.opacity = "0";
    el.style.transform = "translateY(50px)";
    el.style.transition = "opacity 0.65s ease, transform 0.65s ease";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Section
      eyebrow="Education"
      title="Computer Science foundation supporting backend engineering."
      description="B.Tech in Computer Science Engineering with coursework directly applicable to backend systems, databases, and software architecture."
    >
      <div ref={ref}>
        <GlassCard className="p-6 sm:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-cyanSoft/[0.12] text-cyanSoft">
                <Icon size={24} aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-display text-2xl font-semibold text-white">{education.degree}</h3>
                <p className="mt-2 text-slate-300">
                  {education.institute} · {education.location}
                </p>
              </div>
            </div>
            <span className="shrink-0 rounded-md border border-white/[0.12] px-4 py-2 text-sm font-semibold text-white">
              {education.period}
            </span>
          </div>
          <div className="mt-7 flex flex-wrap gap-2">
            {education.coursework.map((course) => (
              <span
                key={course}
                className="rounded-md border border-white/10 bg-white/[0.08] px-3 py-2 text-sm text-slate-200"
              >
                {course}
              </span>
            ))}
          </div>
        </GlassCard>
      </div>
    </Section>
  );
}
