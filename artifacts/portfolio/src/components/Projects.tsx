"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ExternalLink, Github, Layers3 } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import { fadeUp } from "@/lib/motion";
import { GlassCard } from "./GlassCard";
import { Section } from "./Section";

const STAGGER = ["", "stagger-1", "stagger-2", "stagger-3"];

function FloatingOctahedron() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const maybeCtx = canvas.getContext("2d");
    if (!maybeCtx) return;
    const ctx: CanvasRenderingContext2D = maybeCtx;

    const S = 120;
    canvas.width = S;
    canvas.height = S;

    const R = 36;
    const verts: [number, number, number][] = [
      [0, -R, 0], [0, R, 0],
      [R, 0, 0],  [-R, 0, 0],
      [0, 0, R],  [0, 0, -R],
    ];
    const edges: [number, number][] = [
      [0,2],[0,3],[0,4],[0,5],
      [1,2],[1,3],[1,4],[1,5],
      [2,4],[4,3],[3,5],[5,2],
    ];

    let yaw = 0;

    function rotY(v: [number,number,number], a: number): [number,number,number] {
      return [v[0]*Math.cos(a)+v[2]*Math.sin(a), v[1], -v[0]*Math.sin(a)+v[2]*Math.cos(a)];
    }
    function rotX(v: [number,number,number], a: number): [number,number,number] {
      return [v[0], v[1]*Math.cos(a)-v[2]*Math.sin(a), v[1]*Math.sin(a)+v[2]*Math.cos(a)];
    }
    function proj(v: [number,number,number]) {
      const fov = 200;
      const sc = fov / (fov + v[2]);
      return { x: S/2 + v[0]*sc, y: S/2 + v[1]*sc, z: v[2] };
    }

    function draw() {
      ctx.clearRect(0, 0, S, S);

      const projected = verts.map(v => proj(rotX(rotY(v, yaw), yaw * 0.4)));

      for (const [a, b] of edges) {
        const pa = projected[a];
        const pb = projected[b];
        const avgZ = (pa.z + pb.z) / 2;
        const alpha = Math.max(0.08, (avgZ / R + 1) / 2) * 0.85;
        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.lineTo(pb.x, pb.y);
        ctx.strokeStyle = `rgba(0,255,157,${alpha.toFixed(2)})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      for (const { x, y, z } of projected) {
        const alpha = Math.max(0.2, (z / R + 1) / 2);
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,255,157,${alpha.toFixed(2)})`;
        ctx.fill();
      }

      yaw += 0.012;
      rafRef.current = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ filter: "drop-shadow(0 0 12px rgba(0,255,157,0.45))", display: "block" }}
      aria-hidden="true"
    />
  );
}

export function Projects() {
  const [active, setActive] = useState(0);
  const activeProject = projects[active];

  return (
    <Section
      eyebrow="Projects"
      title="Three flagship backend systems built for production thinking."
      description="Each project demonstrates API design, database architecture, authentication, and scalable backend patterns relevant to Python backend engineering roles."
    >
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.55 }}
        className="mb-6"
      >
        <GlassCard className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="relative min-h-72 overflow-hidden rounded-lg border border-white/10 bg-ink/70 p-5">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(100,244,172,0.18),transparent_30%),radial-gradient(circle_at_80%_70%,rgba(139,233,255,0.16),transparent_32%)]" />
            <div className="relative">
              <div className="mb-5 flex items-center justify-between">
                <span className="rounded-md border border-emeraldSoft/25 bg-emeraldSoft/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.16em] text-emeraldSoft">Featured</span>
                <Layers3 className="text-cyanSoft" size={22} aria-hidden="true" />
              </div>
              <motion.div key={activeProject.slug} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
                <p className="text-sm font-semibold text-cyanSoft">{activeProject.category}</p>
                <h3 className="mt-3 font-display text-3xl font-semibold text-white">{activeProject.title}</h3>
                <p className="mt-4 leading-8 text-slate-300">{activeProject.description}</p>
                <div className="mt-6 inline-flex items-center gap-2 rounded-md bg-white/10 px-4 py-3 text-sm font-semibold text-white">
                  <ArrowUpRight size={17} aria-hidden="true" /> {activeProject.impact}
                </div>
              </motion.div>
            </div>
          </div>
          <div className="grid gap-3">
            {projects.map((project, index) => (
              <button key={project.slug} type="button" onClick={() => setActive(index)}
                className={`rounded-lg border p-4 text-left transition duration-300 ${active === index ? "border-emeraldSoft/40 bg-emeraldSoft/10" : "border-white/10 bg-white/[0.055] hover:border-white/20 hover:bg-white/[0.08]"}`}>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">{project.category}</p>
                    <p className="mt-2 font-display text-lg font-semibold text-white">{project.title}</p>
                  </div>
                  <span className="text-sm font-bold text-emeraldSoft">0{index + 1}</span>
                </div>
              </button>
            ))}
          </div>
        </GlassCard>
      </motion.div>

      <div className="grid gap-5 lg:grid-cols-3">
        {projects.map((project, i) => (
          <div
            key={project.slug}
            className={`animate-on-scroll ${STAGGER[Math.min(i, 3)]} h-full`}
            style={{ willChange: "transform" }}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
              const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
              e.currentTarget.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${y}deg) scale(1.03)`;
              e.currentTarget.style.transition = "transform 0.1s ease";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)";
              e.currentTarget.style.transition = "transform 0.5s ease";
            }}
          >
            <GlassCard className="flex h-full flex-col p-6">
              <div className="mb-5 flex items-center justify-between gap-4">
                <span className="rounded-md border border-cyanSoft/20 bg-cyanSoft/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] text-cyanSoft">{project.category}</span>
                <ArrowUpRight className="text-slate-500" size={20} aria-hidden="true" />
              </div>
              <h3 className="font-display text-2xl font-semibold text-white">{project.title}</h3>
              <p className="mt-4 leading-7 text-slate-300">{project.description}</p>
              <div className="mt-6">
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-emeraldSoft">Features</p>
                <ul className="space-y-3 text-sm leading-6 text-slate-300">
                  {project.features.slice(0, 4).map((feature) => (
                    <li key={feature} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyanSoft" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.technologies.slice(0, 5).map((tech) => (
                  <span key={tech} className="rounded-md border border-white/10 bg-white/[0.08] px-3 py-2 text-xs font-semibold text-slate-200">{tech}</span>
                ))}
              </div>
              <div className="mt-auto flex flex-col gap-3 pt-7">
                <Link href={`/projects/${project.slug}`}
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-emeraldSoft px-4 py-3 text-sm font-semibold text-ink transition hover:bg-white">
                  Read Case Study <ArrowUpRight size={16} />
                </Link>
                <div className="flex gap-3">
                  <a href={project.github}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-md border border-white/[0.12] px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                    <Github size={16} aria-hidden="true" /> GitHub
                  </a>
                  <a href={project.demo}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-md border border-white/[0.12] px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                    <ExternalLink size={16} aria-hidden="true" /> Demo
                  </a>
                </div>
              </div>
            </GlassCard>
          </div>
        ))}
      </div>

      {/* ── Closing CTA ─────────────────────────────────────────── */}
      <div className="animate-on-scroll mt-16 flex flex-col items-center gap-6 text-center">
        <div className="relative flex items-center justify-center">
          <div className="absolute opacity-60">
            <FloatingOctahedron />
          </div>
          <div className="relative z-10 flex flex-col items-center gap-4 pt-16">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-[#00ff9d]">
              // more work
            </p>
            <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">
              Want to see more?
            </h3>
            <p className="max-w-md text-slate-400 leading-7">
              More projects, experiments, and open-source contributions are available on GitHub.
            </p>
            <a
              href="https://github.com/arcanep00"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-2 rounded-md border border-[#00ff9d]/40 bg-[#00ff9d]/10 px-6 py-3 text-sm font-semibold text-[#00ff9d] transition duration-200 hover:bg-[#00ff9d]/20 hover:border-[#00ff9d]/70"
            >
              <Github size={16} aria-hidden="true" />
              View GitHub Profile ↗
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}
