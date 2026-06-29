"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { profile } from "@/data/profile";
import { fadeUp, stagger } from "@/lib/motion";
import { GlassCard } from "./GlassCard";
import { Section } from "./Section";

const focus = [
  "Backend Engineering",
  "Python Ecosystem",
  "REST APIs",
  "FastAPI",
  "Django",
  "Database Design",
  "Scalable Systems"
];

function FloatingSphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const raf = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = 220, H = 220;
    canvas.width = W;
    canvas.height = H;

    const R = 88;
    const LAT = 10;
    const LON = 12;
    let angle = 0;

    function project(x: number, y: number, z: number) {
      const scale = 320 / (320 + z);
      return {
        sx: W / 2 + x * scale,
        sy: H / 2 + y * scale,
        scale
      };
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);

      for (let i = 0; i <= LAT; i++) {
        const phi = (Math.PI * i) / LAT;
        ctx.beginPath();
        let first = true;
        for (let j = 0; j <= 64; j++) {
          const theta = (2 * Math.PI * j) / 64 + angle;
          const x = R * Math.sin(phi) * Math.cos(theta);
          const y = R * Math.cos(phi);
          const z = R * Math.sin(phi) * Math.sin(theta);
          const { sx, sy, scale } = project(x, y, z);
          const alpha = Math.max(0, (z / R + 1) / 2) * 0.6 + 0.1;
          ctx.strokeStyle = `rgba(0,255,157,${alpha})`;
          ctx.lineWidth = 0.8;
          if (first) { ctx.moveTo(sx, sy); first = false; }
          else ctx.lineTo(sx, sy);
        }
        ctx.stroke();
      }

      for (let j = 0; j < LON; j++) {
        const theta0 = (2 * Math.PI * j) / LON + angle;
        ctx.beginPath();
        let first = true;
        for (let i = 0; i <= 64; i++) {
          const phi = (Math.PI * i) / 64;
          const x = R * Math.sin(phi) * Math.cos(theta0);
          const y = R * Math.cos(phi);
          const z = R * Math.sin(phi) * Math.sin(theta0);
          const { sx, sy } = project(x, y, z);
          const alpha = Math.max(0, (z / R + 1) / 2) * 0.55 + 0.08;
          ctx.strokeStyle = `rgba(0,245,255,${alpha})`;
          ctx.lineWidth = 0.7;
          if (first) { ctx.moveTo(sx, sy); first = false; }
          else ctx.lineTo(sx, sy);
        }
        ctx.stroke();
      }

      angle += 0.004;
      raf.current = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(raf.current);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ opacity: 0.75, filter: "drop-shadow(0 0 18px rgba(0,255,157,0.35))" }}
      aria-hidden="true"
    />
  );
}

export function About() {
  return (
    <Section
      eyebrow="About"
      title="Backend engineer focused on Python, APIs, and production systems."
    >
      <div className="relative">
        <div
          className="pointer-events-none absolute -right-4 -top-8 hidden lg:block"
          aria-hidden="true"
        >
          <FloatingSphere />
        </div>

        <div className="mb-10 max-w-3xl space-y-5">
          {profile.aboutParagraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="leading-8 text-slate-300">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
      >
        {focus.map((item) => (
          <motion.div key={item} variants={fadeUp}>
            <GlassCard className="flex h-full items-center gap-3 p-5">
              <CheckCircle2 className="shrink-0 text-emeraldSoft" size={20} aria-hidden="true" />
              <span className="font-semibold text-white">{item}</span>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
