import { useEffect, useRef } from 'react';

const skills = [
  { name:'FastAPI + LLM Integration', category:'BACKEND + AI', pct:85, color:'#00f5ff', featured:true },
  { name:'Python', category:'LANGUAGE', pct:90, color:'#00ff9d' },
  { name:'Django', category:'BACKEND', pct:85, color:'#00ff9d' },
  { name:'REST APIs', category:'API DESIGN', pct:88, color:'#00ff9d' },
  { name:'PostgreSQL', category:'DATABASE', pct:84, color:'#60a5fa' },
  { name:'Git & GitHub', category:'TOOLS', pct:80, color:'#a78bfa' },
  { name:'Linux', category:'TOOLS', pct:75, color:'#a78bfa' },
  { name:'JavaScript', category:'LANGUAGE', pct:70, color:'#f59e0b' },
  { name:'HTML/CSS', category:'FRONTEND', pct:75, color:'#f59e0b' },
];

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
    <section ref={sectionRef} className="min-h-screen bg-[#050508] px-6 md:px-20 py-24">
      <p className="reveal text-[#00ff9d] text-xs font-mono tracking-widest mb-4">// SKILLS</p>
      <h2 className="reveal text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
        Python backend stack organized for engineering roles.
      </h2>
      <p className="reveal text-[#9ca3af] text-lg mb-16">
        Languages, frameworks, databases, and core backend concepts aligned with Python Developer, Django Developer, FastAPI Developer, and REST API Engineer positions.
      </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map((s, i) => (
          <div key={s.name}
            className={`reveal bg-[#111118] border rounded-xl p-6 cursor-default ${s.featured ? 'border-[#00f5ff44] md:col-span-2 lg:col-span-1' : 'border-[#1f2937]'}`}
            style={{transitionDelay:`${i*0.08}s`, transition:'opacity 0.6s ease, transform 0.6s ease, box-shadow 0.3s ease'}}
            onMouseEnter={e=>{(e.currentTarget as HTMLDivElement).style.boxShadow=`0 0 20px ${s.color}33`; (e.currentTarget as HTMLDivElement).style.borderColor=`${s.color}66`; (e.currentTarget as HTMLDivElement).style.transform='translateY(-4px)';}}
            onMouseLeave={e=>{(e.currentTarget as HTMLDivElement).style.boxShadow=''; (e.currentTarget as HTMLDivElement).style.borderColor=''; (e.currentTarget as HTMLDivElement).style.transform='';}}
          >
            {s.featured && <span className="inline-block px-2 py-0.5 bg-[#00f5ff15] text-[#00f5ff] text-xs rounded font-mono mb-3">★ HERO SKILL</span>}
            <div className="flex justify-between items-start mb-3">
              <div>
                <div className="font-semibold text-white">{s.name}</div>
                <div className="text-xs text-[#6b7280] font-mono mt-0.5">{s.category}</div>
              </div>
              <span className="text-sm font-bold" style={{color:s.color}}>{s.pct}%</span>
            </div>
            <div className="h-1.5 bg-[#1f2937] rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-1000" style={{width:`${s.pct}%`, background:`linear-gradient(90deg, ${s.color}, ${s.color}88)`}} />
            </div>
          </div>
        ))}
      </div>
      <div className="reveal mt-8 flex flex-wrap gap-2">
        <span className="text-[#6b7280] text-sm font-mono mr-2">Also worked with:</span>
        {['DSA','OOP','DBMS','JWT Auth','Async Python','Odoo ERP'].map(t=>(
          <span key={t} className="px-3 py-1 bg-[#0d1117] border border-[#1f2937] text-[#6b7280] text-xs rounded font-mono">{t}</span>
        ))}
      </div>
    </section>
  );
}
