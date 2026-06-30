"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowRight, Download, Terminal, Cpu, Database, Code2 } from "lucide-react";
import { NeuralBackground } from "./three/NeuralBackground";
import { TorusKnot3D } from "./three/TorusKnot3D";
import { TypewriterCycle } from "./TypewriterCycle";
import { motion } from "framer-motion";
import { Link } from "wouter";

const TECH_BADGES = [
  { icon: Cpu, label: "Python", color: "#00ff9d" },
  { icon: Terminal, label: "Django", color: "#00f5ff" },
  { icon: Database, label: "PostgreSQL", color: "#a78bfa" },
  { icon: Code2, label: "FastAPI", color: "#00ff9d" }
];

const CODE_LINES = [
  { label: "role", value: "python_backend_engineer", color: "#00ff9d" },
  { label: "stack", value: "FastAPI, Django, PostgreSQL, Redis", color: "#00f5ff" },
  { label: "focus", value: "REST APIs, LLMs, async pipelines", color: "#a78bfa" },
  { label: "status", value: "open_to_backend_roles ✓", color: "#00ff9d" }
];

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-stagger > *",
        { opacity: 0, y: 30, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          stagger: 0.15,
          ease: "expo.out",
          delay: 0.3
        }
      );
      
      gsap.fromTo(
        ".tech-badge",
        { opacity: 0, scale: 0.8, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.7)",
          delay: 1.2
        }
      );

      gsap.fromTo(
        ".hero-code-card",
        { opacity: 0, x: 50, rotateY: -20 },
        { 
          opacity: 1, 
          x: 0, 
          rotateY: 0, 
          duration: 1.2, 
          ease: "power4.out", 
          delay: 0.8 
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative isolate flex min-h-screen items-center overflow-hidden"
      style={{ background: "#050508" }}
    >
      <NeuralBackground />

      {/* Premium Ambient Lighting */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-0 h-[500px] w-[500px] rounded-full bg-[#00ff9d]/[0.05] blur-[120px]" />
        <div className="absolute right-1/4 bottom-0 h-[500px] w-[500px] rounded-full bg-[#00f5ff]/[0.05] blur-[120px]" />
      </div>

      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-6 pb-20 pt-32 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20 lg:px-12 lg:pt-24">
        <div className="hero-stagger flex flex-col gap-6">
          <div className="flex items-center gap-3">
             <span className="inline-flex items-center gap-2 rounded-full border border-[#00ff9d]/30 bg-[#00ff9d]/10 px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-[#00ff9d]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00ff9d] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00ff9d]" />
              </span>
              Available for Python roles
            </span>
            <div className="h-px w-12 bg-[#00ff9d]/20" />
          </div>

          <div className="space-y-4">
            <h1 className="font-display text-5xl font-bold leading-[1.1] text-white sm:text-6xl lg:text-7xl xl:text-[5rem]">
              Architecting <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff9d] to-[#00f5ff]">Reliable</span><br />
              Backend Systems.
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-slate-400">
              I specialize in high-performance <span className="text-white font-medium">Python</span> backends, 
              scalable <span className="text-white font-medium">FastAPI</span> services, and robust 
              <span className="text-white font-medium"> Django</span> architectures. Currently engineering 
              at Etelligense Technology.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {TECH_BADGES.map((tech) => {
              const Icon = tech.icon;
              return (
                <div
                  key={tech.label}
                  className="tech-badge group flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 transition-all hover:border-[#00ff9d]/30 hover:bg-[#00ff9d]/5"
                >
                  <Icon size={16} style={{ color: tech.color }} className="transition-transform group-hover:scale-110" />
                  <span className="text-xs font-semibold text-slate-300 group-hover:text-white">{tech.label}</span>
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <Link
              href="/projects"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-8 py-4 text-sm font-bold text-black transition-transform active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-2">
                View My Work <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
            <a
              href="/Abhinav-Pandey-Resume.pdf"
              download
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-bold text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/40"
            >
              Download CV <Download size={18} />
            </a>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
            {[
              ["3+", "Production Projects"],
              ["2+", "Elite Frameworks"],
              ["1+", "Industry Experience"]
            ].map(([num, label]) => (
              <div key={label} className="group">
                <p className="font-display text-3xl font-bold text-white transition-colors group-hover:text-[#00ff9d]">{num}</p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex flex-col gap-8 perspective-[1000px]">
          <div className="hero-code-card relative aspect-square w-full overflow-hidden rounded-3xl bg-[#111118]/50 backdrop-blur-md lg:aspect-[4/3]">
             <div className="absolute inset-0 z-0">
                <TorusKnot3D />
             </div>
             {/* Decorative UI elements inside 3D frame */}
             <div className="absolute top-6 left-6 z-10 flex gap-1.5">
                <div className="h-2 w-2 rounded-full bg-red-500/50" />
                <div className="h-2 w-2 rounded-full bg-yellow-500/50" />
                <div className="h-2 w-2 rounded-full bg-[#00ff9d]/50" />
             </div>
             <div className="absolute bottom-6 right-6 z-10 font-mono text-[10px] text-slate-500 uppercase tracking-tighter">
                System: Stable // GPU: Active
             </div>
             <div className="absolute inset-0 rounded-3xl border border-white/10" />
          </div>

          <div
            className="hero-code-card glass-card rounded-2xl p-6 font-mono text-xs shadow-2xl"
            style={{ 
              borderColor: "rgba(0,255,157,0.15)",
              background: "rgba(10, 10, 15, 0.8)"
            }}
          >
            <div className="space-y-3">
              {CODE_LINES.map(({ label, value, color }) => (
                <div key={label} className="flex gap-4">
                  <span className="w-16 shrink-0 text-slate-500">[{label}]</span>
                  <span className="text-slate-400">{"->"}</span>
                  <span style={{ color }} className="font-semibold break-all">{value}</span>
                </div>
              ))}
              <div className="flex gap-4 pt-2">
                <span className="w-16 shrink-0 text-[#00ff9d]">EXECUTE</span>
                <span className="text-slate-400">::</span>
                <span className="animate-pulse text-white">optimized_build.sh</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-3"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-600">Explore</span>
          <div className="h-12 w-px bg-gradient-to-b from-[#00ff9d] to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
