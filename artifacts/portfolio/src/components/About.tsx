import { useEffect, useRef } from 'react';

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
    <section ref={sectionRef} className="min-h-screen bg-[#050508] px-6 md:px-20 py-24">
      <p className="reveal text-[#00ff9d] text-xs font-mono tracking-widest mb-4">// ABOUT</p>
      <div className="flex flex-col md:flex-row gap-12 items-start">
        <div className="flex-1">
          <h2 className="reveal text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
            Backend engineer focused on Python, APIs, and production systems.
          </h2>
          <p className="reveal text-[#9ca3af] text-lg mb-6 leading-relaxed">
            My engineering work centers on the Python ecosystem — Django and Django REST Framework for structured enterprise APIs, and FastAPI for high-performance async services.
          </p>
          <p className="reveal text-[#9ca3af] text-lg mb-6 leading-relaxed">
            I design PostgreSQL schemas with normalization, indexing, and query optimization in mind. Authentication flows, serializer validation, background processing, and caching strategies are core to how I approach backend systems.
          </p>
          <p className="reveal text-[#9ca3af] text-lg mb-10 leading-relaxed">
            Whether building healthcare APIs, financial processing pipelines, or marketplace platforms, I focus on problem decomposition, API contract clarity, and code that teams can extend without rework.
          </p>
          <div className="reveal grid grid-cols-2 md:grid-cols-4 gap-4">
            {[['1+','Year Experience'],['3+','Backend Projects'],['5+','Core Technologies'],['2026','Currently Active']].map(([num,label])=>(
              <div key={label} className="bg-[#111118] border border-[#1f2937] rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-[#00ff9d]">{num}</div>
                <div className="text-xs text-[#6b7280] mt-1">{label}</div>
              </div>
            ))}
          </div>
          <div className="reveal flex flex-wrap gap-3 mt-8">
            {['Backend Engineering','Python Ecosystem','REST APIs','FastAPI + LLM'].map(tag=>(
              <span key={tag} className="px-4 py-2 border border-[#00ff9d33] text-[#00ff9d] text-sm rounded-full font-mono">{tag}</span>
            ))}
          </div>
        </div>
        <div className="hidden md:block w-64 h-64 relative">
          <div className="w-full h-full rounded-full border border-[#00ff9d33]" style={{animation:'spin 20s linear infinite'}}/>
          <div className="absolute inset-4 rounded-full border border-[#00f5ff22]" style={{animation:'spin 15s linear infinite reverse'}}/>
          <div className="absolute inset-8 rounded-full border border-[#a78bfa22]" />
          <div className="absolute inset-0 flex items-center justify-center text-[#00ff9d] font-mono text-sm">{'{ }'}</div>
        </div>
      </div>
    </section>
  );
}
