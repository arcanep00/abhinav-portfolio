"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowRight, Download } from "lucide-react";
import { NeuralBackground } from "./three/NeuralBackground";
import { TorusKnot3D } from "./three/TorusKnot3D";
import { TypewriterCycle } from "./TypewriterCycle";

const CHIPS = ["Python Backend Engineer", "Django Developer", "FastAPI Developer", "REST API Engineer"];

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
        { opacity: 0, y: 32, filter: "blur(8px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          delay: 0.2
        }
      );
      gsap.fromTo(
        ".hero-code-card",
        { opacity: 0, x: 40, scale: 0.96 },
        { opacity: 1, x: 0, scale: 1, duration: 0.9, ease: "power3.out", delay: 0.6 }
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

      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% -10%, rgba(0,255,157,0.09), transparent)"
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,255,157,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,157,0.025) 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }}
      />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-5 pb-20 pt-28 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:px-12 lg:pt-24">
        <div className="hero-stagger flex flex-col gap-5">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#00ff9d]/30 bg-[#00ff9d]/10 px-4 py-2 text-xs font-semibold text-[#00ff9d]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00ff9d] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00ff9d]" />
              </span>
              Open to Python Backend roles
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {CHIPS.map((chip) => (
              <span
                key={chip}
                className="rounded border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300"
              >
                {chip}
              </span>
            ))}
          </div>

          <div>
            <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.22em] text-[#00ff9d] text-glow-green">
              Python Backend Engineer
            </p>
            <h1 className="font-display text-4xl font-bold leading-[1.06] text-white sm:text-5xl lg:text-[3.6rem]">
              I build production-grade<br />
              Python backend systems with{" "}
              <TypewriterCycle />
            </h1>
          </div>

          <p className="max-w-xl text-base leading-8 text-slate-400">
            Building scalable REST APIs, async FastAPI services, PostgreSQL data layers, and
            LLM-powered pipelines. Currently engineering backend solutions at Etelligense Technology.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="/projects"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                border: "1px solid rgba(0,255,157,0.45)",
                padding: "12px 28px",
                borderRadius: 6,
                color: "#00ff9d",
                fontWeight: 600,
                textDecoration: "none",
                fontSize: 14
              }}
            >
              View My Work <ArrowRight size={16} />
            </a>
            <a
              href="/Abhinav-Pandey-Resume.pdf"
              download
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#00ff9d",
                color: "#000000",
                fontWeight: 700,
                padding: "12px 28px",
                borderRadius: 6,
                textDecoration: "none",
                fontSize: 14
              }}
            >
              Download CV <Download size={16} />
            </a>
            <a
              href="https://github.com/arcanep00"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                border: "1px solid rgba(255,255,255,0.2)",
                padding: "12px 24px",
                borderRadius: 6,
                color: "#f0f0f0",
                fontWeight: 600,
                textDecoration: "none",
                fontSize: 14
              }}
            >
              GitHub ↗
            </a>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-2">
            {[
              ["3+", "Backend Projects"],
              ["2+", "Frameworks"],
              ["1+", "Years Coding"]
            ].map(([num, label]) => (
              <div
                key={label}
                className="rounded-lg border border-white/[0.07] bg-white/[0.03] p-4 text-center"
              >
                <p className="font-display text-2xl font-bold text-[#00ff9d]">{num}</p>
                <p className="mt-1 text-xs text-slate-400">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="hero-code-card relative hidden h-72 overflow-hidden rounded-xl lg:block">
            <TorusKnot3D />
            <div
              className="pointer-events-none absolute inset-0 rounded-xl"
              style={{ border: "1px solid rgba(0,245,255,0.15)" }}
            />
          </div>

          <div
            className="hero-code-card glass-card rounded-xl p-5 font-mono text-sm"
            style={{ borderColor: "rgba(0,255,157,0.12)" }}
          >
            <div className="mb-4 flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-400/80" />
              <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
              <span className="h-3 w-3 rounded-full bg-[#00ff9d]/80" />
              <span className="ml-2 text-xs text-slate-500">abhinav@backend ~ python</span>
            </div>
            <div className="space-y-2">
              {CODE_LINES.map(({ label, value, color }) => (
                <p key={label} className="text-slate-300">
                  <span className="text-slate-500">$&nbsp;</span>
                  <span style={{ color }} className="font-semibold">{label}</span>
                  <span className="text-slate-500">: </span>
                  <span className="text-slate-200">{value}</span>
                </p>
              ))}
              <p className="text-slate-500">
                <span className="mr-1 text-[#00ff9d]">▶</span>
                <span className="animate-pulse">_</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-slate-600">scroll</span>
          <div className="h-10 w-px bg-gradient-to-b from-[#00ff9d]/40 to-transparent" />
        </div>
      </div>
    </section>
  );
}
