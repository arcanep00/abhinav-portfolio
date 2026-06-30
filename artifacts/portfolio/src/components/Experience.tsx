import { NeuralBackground } from "./three/NeuralBackground";
import { useEffect, useRef } from 'react';
import { Briefcase, Calendar, MapPin, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const experiences = [
  {
    role: 'Software Development Intern',
    company: 'Etelligense Technology',
    location: 'Greater Noida West',
    period: 'Jan 2026 — Present',
    description: 'Leading the development of Python backends and Odoo ERP customization for enterprise clients.',
    tags: ['Python', 'Django', 'FastAPI', 'PostgreSQL', 'Odoo'],
    impact: [
      'Architected async FastAPI microservices for internal data processing.',
      'Optimized PostgreSQL query performance by 40% using advanced indexing.',
      'Developed custom Odoo modules to streamline regional business workflows.'
    ]
  }
];

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in-view'); });
    }, { threshold: 0.1 });
    sectionRef.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-[#050508] px-6 md:px-20 py-24 overflow-hidden">
      <NeuralBackground />
      <div className="mx-auto max-w-7xl">
        <p className="reveal text-[#00ff9d] text-xs font-mono tracking-widest mb-4 font-bold uppercase">// TRAJECTORY</p>
        <h2 className="reveal text-5xl font-bold text-white mb-16 leading-tight">
          Professional <span className="text-[#00f5ff]">Evolution</span>.
        </h2>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-[#00ff9d] via-[#00f5ff]/40 to-transparent" />

          <div className="space-y-20">
            {experiences.map((exp, i) => (
              <div key={i} className="reveal relative pl-12 group">
                {/* Connector Node */}
                <div className="absolute left-[-5px] top-2 h-[11px] w-[11px] rounded-full bg-[#050508] border-2 border-[#00ff9d] z-10" />
                <div className="absolute left-[-5px] top-2 h-[11px] w-[11px] rounded-full bg-[#00ff9d] blur-sm animate-pulse" />

                <div className="grid lg:grid-cols-[1fr_300px] gap-12">
                  <div>
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <h3 className="text-3xl font-bold text-white">{exp.role}</h3>
                      <div className="px-4 py-1 bg-[#00ff9d]/10 border border-[#00ff9d]/20 rounded-full text-[#00ff9d] text-xs font-bold uppercase tracking-widest">
                        Active
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-6 mb-8 text-slate-400 font-medium">
                      <div className="flex items-center gap-2">
                        <Briefcase size={16} className="text-[#00f5ff]" /> {exp.company}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-[#00f5ff]" /> {exp.period}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-[#00f5ff]" /> {exp.location}
                      </div>
                    </div>

                    <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                      {exp.description}
                    </p>

                    <div className="space-y-4">
                      {exp.impact.map((point, pi) => (
                        <div key={pi} className="flex gap-4 group/point">
                          <ChevronRight size={18} className="text-[#00ff9d] mt-1 transition-transform group-hover/point:translate-x-1" />
                          <p className="text-slate-400 group-hover/point:text-white transition-colors">{point}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="lg:border-l lg:border-white/5 lg:pl-12 flex flex-col gap-6">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map(tag => (
                        <span key={tag} className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs font-bold text-slate-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="mt-auto pt-8 border-t border-white/5">
                      <div className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/5">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Reference</p>
                        <p className="text-sm font-medium text-white italic">"High attention to architectural detail and system reliability."</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
