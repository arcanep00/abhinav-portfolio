import { useEffect, useRef, Suspense, lazy } from 'react';

const AboutCanvas = lazy(() => import('./three/AboutCanvas').then(m => ({ default: m.AboutCanvas })));

export function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in-view'); });
    }, { threshold: 0.1 });
    sectionRef.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="min-h-screen bg-[#050508] px-6 md:px-20 py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <p className="reveal text-[#00ff9d] text-xs font-mono tracking-widest mb-4 font-bold uppercase">// THE ENGINEER</p>
        
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1">
            <h2 className="reveal text-5xl md:text-6xl font-bold text-white mb-8 leading-[1.1]">
              Crafting <span className="text-[#00f5ff]">Intelligent</span> Backend Infrastructure.
            </h2>
            <div className="space-y-6">
              <p className="reveal text-[#9ca3af] text-xl leading-relaxed max-w-2xl">
                My engineering focus lies at the intersection of high-performance backend systems and AI-driven automation. I build with <span className="text-white">Python</span>, <span className="text-white">Django</span>, and <span className="text-white">FastAPI</span>.
              </p>
              <p className="reveal text-[#9ca3af] text-xl leading-relaxed max-w-2xl">
                I believe in clean API contracts, optimized database schemas, and building services that scale horizontally without friction. Currently exploring the frontier of LLM integrations into production pipelines.
              </p>
            </div>

            <div className="reveal mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                ['1+', 'Industry Experience'],
                ['3+', 'Flagship Projects'],
                ['5+', 'Core Stack'],
                ['∞', 'Commitment to Quality']
              ].map(([num, label]) => (
                <div key={label} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 transition-all hover:border-[#00ff9d]/30 hover:bg-[#00ff9d]/5">
                  <div className="text-3xl font-bold text-white transition-colors group-hover:text-[#00ff9d]">{num}</div>
                  <div className="mt-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">{label}</div>
                  <div className="absolute -right-2 -bottom-2 h-12 w-12 rounded-full bg-[#00ff9d]/5 blur-xl transition-all group-hover:bg-[#00ff9d]/20" />
                </div>
              ))}
            </div>

            <div className="reveal flex flex-wrap gap-3 mt-10">
              {['Backend Architecture', 'Python Ecosystem', 'Scalable APIs', 'AI Integration'].map(tag => (
                <span key={tag} className="px-5 py-2.5 bg-white/5 border border-white/10 text-[#00f5ff] text-xs rounded-full font-bold uppercase tracking-widest hover:border-[#00f5ff]/40 transition-colors">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="relative w-full max-w-[500px] aspect-square lg:w-[500px] flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#00ff9d]/10 via-transparent to-[#00f5ff]/10 blur-3xl rounded-full" />
            <div className="relative z-10 w-full h-full">
              <Suspense fallback={<div className="w-full h-full rounded-full border border-white/5 animate-pulse" />}>
                <AboutCanvas />
              </Suspense>
            </div>
            {/* HUD Elements */}
            <div className="absolute top-0 right-0 border-r border-t border-[#00f5ff]/40 w-12 h-12" />
            <div className="absolute bottom-0 left-0 border-l border-b border-[#00ff9d]/40 w-12 h-12" />
          </div>
        </div>
      </div>
    </section>
  );
}
