import { useEffect, useRef } from 'react';

export function Education() {
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
      <p className="reveal text-[#00ff9d] text-xs font-mono tracking-widest mb-4">// EDUCATION</p>
      <h2 className="reveal text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
        Computer Science foundation supporting backend engineering.
      </h2>
      <p className="reveal text-[#9ca3af] text-lg mb-16">
        B.Tech in Computer Science Engineering with coursework directly applicable to backend systems, databases, and software architecture.
      </p>
      <div className="reveal bg-[#111118] border border-[#1f2937] rounded-xl p-8"
        style={{transition:'opacity 0.7s ease, transform 0.7s ease'}}>
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#0d1117] border border-[#1f2937] rounded-lg flex items-center justify-center text-2xl">🎓</div>
            <div>
              <h3 className="text-xl font-bold text-white">Bachelor of Technology — Computer Science Engineering</h3>
              <p className="text-[#00ff9d] font-mono text-sm mt-1">ABES Institute of Technology · Ghaziabad</p>
            </div>
          </div>
          <span className="mt-4 md:mt-0 px-4 py-2 bg-[#1f2937] text-[#9ca3af] text-sm rounded-lg font-mono">2023 — 2027</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {['Data Structures & Algorithms','Database Management Systems','Object-Oriented Programming','Operating Systems','Software Engineering','Computer Networks','Web Development'].map((c,i)=>(
            <span key={c} className="reveal px-3 py-1.5 bg-[#0d1117] border border-[#1f2937] text-[#9ca3af] text-sm rounded font-mono"
              style={{transitionDelay:`${i*0.07}s`}}>{c}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
