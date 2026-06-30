import { useEffect, useRef, Suspense, lazy } from 'react';
import { isWebGLAvailable } from '@/lib/utils';

const SkillsCanvas = lazy(() => import('./three/SkillsCanvas').then(m => ({ default: m.SkillsCanvas })));

const CATEGORIES = [
  { 
    title: "Core Backend", 
    items: ["Python", "Django", "FastAPI", "AsyncIO"],
    color: "#00ff9d"
  },
  { 
    title: "Data & Infrastructure", 
    items: ["PostgreSQL", "Redis", "Docker", "Linux"],
    color: "#00f5ff"
  },
  { 
    title: "AI & Tools", 
    items: ["LLM Integration", "LangChain", "Git", "REST APIs"],
    color: "#a78bfa"
  }
];

const hasWebGL = isWebGLAvailable();

export function Skills() {
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
      <div className="mx-auto max-w-7xl">
        <p className="reveal text-[#00ff9d] text-xs font-mono tracking-widest mb-4 font-bold uppercase">// CAPABILITIES</p>
        
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 items-start">
          <div>
            <h2 className="reveal text-5xl font-bold text-white mb-8 leading-tight">
              A specialized stack for the <span className="text-[#00ff9d]">modern</span> backend.
            </h2>
            <p className="reveal text-[#9ca3af] text-xl mb-12 leading-relaxed">
              My technology choices are driven by reliability, performance, and scalability. I specialize in the Python ecosystem with a strong emphasis on enterprise-grade architecture.
            </p>

            <div className="space-y-10">
              {CATEGORIES.map((cat, i) => (
                <div key={cat.title} className="reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-1 w-8 rounded-full" style={{ backgroundColor: cat.color }} />
                    <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-white">{cat.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cat.items.map(item => (
                      <span key={item} className="px-4 py-2 bg-white/5 border border-white/10 text-slate-300 text-xs rounded-lg font-medium hover:border-white/30 transition-colors">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative h-[600px] lg:h-[700px] w-full rounded-3xl bg-[#111118]/50 border border-white/5 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00ff9d]/5 to-transparent" />
            {hasWebGL ? (
              <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-slate-500 font-mono text-xs animate-pulse">Initializing 3D Clusters...</div>}>
                <SkillsCanvas />
              </Suspense>
            ) : (
              <div className="w-full h-full flex items-center justify-center p-12 text-center">
                <div className="space-y-4">
                  <div className="inline-flex p-4 rounded-full bg-[#00ff9d]/10 text-[#00ff9d]">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-white">Advanced Visualization Stack</h4>
                  <p className="text-slate-400 text-sm max-w-xs mx-auto">
                    3D acceleration is currently unavailable in your browser environment. Core skills are listed in the side panel.
                  </p>
                </div>
              </div>
            )}
            
            {/* Legend / Info */}
            <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
              <div className="font-mono text-[10px] text-slate-500 uppercase tracking-tighter">
                Interactive Technology Graph // v2.0
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#00ff9d]" />
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Expert</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#00f5ff]" />
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Proficient</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
