"use client";
import { NeuralBackground } from "./three/NeuralBackground";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ExternalLink, Github, Terminal, Layers, Database } from "lucide-react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/projects";
import { fadeUp } from "@/lib/motion";
import { GlassCard } from "./GlassCard";
import { Section } from "./Section";

export function Projects() {
  const [active, setActive] = useState(0);
  const activeProject = projects[active];

  return (
    <Section className="relative"
      <NeuralBackground />
      eyebrow="Portfolio"
      title="Production-grade systems."
      description="Exploring the intersection of scalable backend architecture, AI-driven automation, and enterprise-grade Python development."
    >
      <div id="projects-grid" className="grid lg:grid-cols-[1fr_400px] gap-8">
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject.slug}
              initial={{ opacity: 0, scale: 0.98, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.02, y: -20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="group relative aspect-video w-full overflow-hidden rounded-3xl border border-white/10 bg-[#111118]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#00ff9d]/20 via-transparent to-[#00f5ff]/20 opacity-40" />
              
              {/* Fake 3D "Screen" UI */}
              <div className="absolute inset-0 p-8 flex flex-col">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500/50" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500/50" />
                    <div className="h-3 w-3 rounded-full bg-emerald-500/50" />
                  </div>
                  <div className="font-mono text-[10px] text-slate-500 uppercase tracking-widest">Case Study // {activeProject.slug}</div>
                </div>

                <div className="flex-1 flex flex-col justify-center">
                  <h3 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
                    {activeProject.title}
                  </h3>
                  <p className="text-xl text-slate-400 max-w-xl leading-relaxed">
                    {activeProject.description}
                  </p>
                  
                  <div className="mt-8 flex flex-wrap gap-3">
                    {activeProject.technologies.slice(0, 4).map(tech => (
                      <span key={tech} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-[#00ff9d] uppercase tracking-widest">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-auto flex items-center justify-between pt-8 border-t border-white/5">
                  <div className="flex gap-6">
                    <a href={activeProject.github} className="text-slate-500 hover:text-white transition-colors flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                      <Github size={16} /> Source
                    </a>
                    <a href={activeProject.demo} className="text-slate-500 hover:text-white transition-colors flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                      <ExternalLink size={16} /> Live
                    </a>
                  </div>
                  <Link href={`/projects/${activeProject.slug}`} className="px-6 py-3 bg-white text-black rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform">
                    View Details
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex flex-col gap-3">
          {projects.map((project, index) => (
            <button
              key={project.slug}
              onClick={() => setActive(index)}
              className={`group relative text-left p-6 rounded-2xl border transition-all duration-300 ${
                active === index 
                  ? "bg-white/5 border-[#00ff9d]/30" 
                  : "bg-transparent border-white/5 hover:border-white/20 hover:bg-white/[0.02]"
              }`}
            >
              <div className="relative z-10 flex items-center gap-4">
                <span className={`font-mono text-xs font-bold ${active === index ? "text-[#00ff9d]" : "text-slate-600"}`}>
                  0{index + 1}
                </span>
                <div>
                  <h4 className={`font-bold transition-colors ${active === index ? "text-white" : "text-slate-400"}`}>
                    {project.title}
                  </h4>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-slate-500 mt-1">
                    {project.category}
                  </p>
                </div>
                {active === index && (
                  <motion.div 
                    layoutId="active-indicator"
                    className="ml-auto h-2 w-2 rounded-full bg-[#00ff9d] shadow-[0_0_8px_#00ff9d]"
                  />
                )}
              </div>
            </button>
          ))}
          
          <div className="mt-4 p-8 rounded-2xl border border-dashed border-white/10 flex flex-col items-center text-center gap-4">
            <div className="p-3 bg-white/5 rounded-full">
              <Terminal size={24} className="text-slate-500" />
            </div>
            <p className="text-xs text-slate-400 font-medium">Explore more contributions and experimental repositories on GitHub.</p>
            <a href="https://github.com/arcanep00" target="_blank" className="text-xs font-bold text-[#00ff9d] uppercase tracking-widest hover:underline">
              View GitHub Profile ↗
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}
