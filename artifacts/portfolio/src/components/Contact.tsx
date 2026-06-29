"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { profile } from "@/data/profile";
import { fadeUp } from "@/lib/motion";
import { GlassCard } from "./GlassCard";
import { Section } from "./Section";

function CSSGlobe() {
  const rings = [
    { size: 220, tilt: "rotateX(75deg)", duration: 22, opacity: 0.18 },
    { size: 220, tilt: "rotateX(75deg) rotateZ(60deg)", duration: 30, opacity: 0.13 },
    { size: 220, tilt: "rotateX(75deg) rotateZ(120deg)", duration: 40, opacity: 0.10 },
    { size: 160, tilt: "rotateX(30deg)", duration: 18, opacity: 0.14 },
    { size: 100, tilt: "rotateX(55deg) rotateZ(45deg)", duration: 28, opacity: 0.12 },
  ];

  return (
    <div
      className="pointer-events-none absolute right-0 top-0 -z-10 overflow-hidden"
      style={{ width: 320, height: 320, opacity: 0.9 }}
      aria-hidden="true"
    >
      <div
        className="absolute"
        style={{
          right: -60,
          top: -60,
          width: 280,
          height: 280,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <div
          className="absolute rounded-full"
          style={{
            width: 220,
            height: 220,
            border: "1.5px solid rgba(0,255,157,0.25)",
            boxShadow: "0 0 40px rgba(0,255,157,0.15), inset 0 0 40px rgba(0,255,157,0.05)"
          }}
        />

        {rings.map((ring, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: ring.size,
              height: ring.size,
              border: `1px solid rgba(0,255,157,${ring.opacity})`,
              transform: ring.tilt,
              animation: `spin-ring-${i} ${ring.duration}s linear infinite`
            }}
          />
        ))}

        {[0, 45, 90, 135].map((angle, i) => (
          <div
            key={`meridian-${i}`}
            className="absolute rounded-full"
            style={{
              width: 220,
              height: 220,
              border: "1px solid rgba(0,245,255,0.1)",
              transform: `rotateY(${angle}deg)`,
              animation: `spin-meridian ${25 + i * 5}s linear infinite`
            }}
          />
        ))}

        <div
          className="absolute rounded-full"
          style={{
            width: 10,
            height: 10,
            background: "#00ff9d",
            boxShadow: "0 0 12px #00ff9d, 0 0 24px #00ff9d66"
          }}
        />
      </div>
    </div>
  );
}

export function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes spin-ring-0 { from { transform: rotateX(75deg) rotateZ(0deg); } to { transform: rotateX(75deg) rotateZ(360deg); } }
      @keyframes spin-ring-1 { from { transform: rotateX(75deg) rotateZ(60deg); } to { transform: rotateX(75deg) rotateZ(420deg); } }
      @keyframes spin-ring-2 { from { transform: rotateX(75deg) rotateZ(120deg); } to { transform: rotateX(75deg) rotateZ(480deg); } }
      @keyframes spin-ring-3 { from { transform: rotateX(30deg) rotateZ(0deg); } to { transform: rotateX(30deg) rotateZ(360deg); } }
      @keyframes spin-ring-4 { from { transform: rotateX(55deg) rotateZ(45deg); } to { transform: rotateX(55deg) rotateZ(405deg); } }
      @keyframes spin-meridian { from { transform: rotateY(0deg); } to { transform: rotateY(360deg); } }
    `;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  return (
    <Section
      eyebrow="Contact"
      title="Open to Python backend, Django, and FastAPI roles."
      description="Best fit for teams hiring backend engineers who build reliable APIs, design PostgreSQL schemas, and deliver production-ready Python services."
    >
      <div ref={sectionRef} className="relative">
        <CSSGlobe />
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
                positions, or REST API development opportunities.
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
      </div>
    </Section>
  );
}
