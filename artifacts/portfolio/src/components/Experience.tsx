import { useEffect, useRef } from 'react';

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
    <section ref={sectionRef} className="min-h-screen bg-[#050508] px-6 md:px-20 py-24">
      <p className="reveal text-[#00ff9d] text-xs font-mono tracking-widest mb-4">// EXPERIENCE</p>
      <h2 className="reveal text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
        Engineering impact through backend development and ERP customization.
      </h2>
      <p className="reveal text-[#9ca3af] text-lg mb-16">
        Internship experience focused on delivering reliable Python backend systems, REST APIs, and production-grade features.
      </p>
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#00ff9d] ml-6 hidden md:block" style={{boxShadow:'0 0 10px #00ff9d'}} />
        <div className="reveal md:ml-16 bg-[#111118] border border-[#1f2937] rounded-xl p-8"
          style={{transition:'opacity 0.7s ease, transform 0.7s ease'}}>
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-white">Software Development Intern</h3>
              <p className="text-[#00ff9d] font-mono text-sm mt-1">Etelligense Technology · Greater Noida West</p>
            </div>
            <span className="mt-2 md:mt-0 px-4 py-2 bg-[#1f2937] text-[#9ca3af] text-sm rounded-lg font-mono">Jan 2026 — Present</span>
          </div>
          <p className="text-[#6b7280] mb-6">Contributing to backend-driven applications and Odoo ERP customization in a production-oriented internship environment.</p>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <ul className="space-y-3">
              {['Engineered backend features using Python and Django, integrating REST APIs with PostgreSQL-backed data models for enterprise workflows.',
                'Designed and optimized PostgreSQL queries, improving data retrieval for database-backed features and API endpoints.',
                'Built FastAPI microservices with async endpoints for high-throughput internal tooling.'].map(b=>(
                <li key={b} className="flex gap-3 text-[#9ca3af] text-sm"><span className="text-[#00ff9d] mt-1 shrink-0">•</span>{b}</li>
              ))}
            </ul>
            <ul className="space-y-3">
              {['Customized Odoo ERP modules, reports, and business processes — bridging Python backend logic with real operational requirements.',
                'Built and consumed REST APIs with structured validation, error handling, and authentication-aware endpoint design.',
                'Collaborated using Git/GitHub with branching strategies for feature delivery.'].map(b=>(
                <li key={b} className="flex gap-3 text-[#9ca3af] text-sm"><span className="text-[#00ff9d] mt-1 shrink-0">•</span>{b}</li>
              ))}
            </ul>
          </div>
          <div className="flex flex-wrap gap-2">
            {['Python','Django','FastAPI','PostgreSQL','REST APIs','Git','Odoo'].map(t=>(
              <span key={t} className="px-3 py-1 bg-[#0d1117] border border-[#1f2937] text-[#6b7280] text-xs rounded font-mono">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
