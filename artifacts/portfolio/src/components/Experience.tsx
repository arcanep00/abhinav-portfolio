import { useEffect, useRef } from 'react';

function RotatingCube() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const S = 48;
    canvas.width = S;
    canvas.height = S;

    const verts: [number, number, number][] = [
      [-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],
      [-1,-1, 1],[1,-1, 1],[1,1, 1],[-1,1, 1],
    ];
    const edges: [number,number][] = [
      [0,1],[1,2],[2,3],[3,0],
      [4,5],[5,6],[6,7],[7,4],
      [0,4],[1,5],[2,6],[3,7],
    ];

    let yaw = 0;
    const SCALE = 13;
    const FOV = 80;

    function rotY(v: [number,number,number], a: number): [number,number,number] {
      return [v[0]*Math.cos(a)+v[2]*Math.sin(a), v[1], -v[0]*Math.sin(a)+v[2]*Math.cos(a)];
    }
    function rotX(v: [number,number,number], a: number): [number,number,number] {
      return [v[0], v[1]*Math.cos(a)-v[2]*Math.sin(a), v[1]*Math.sin(a)+v[2]*Math.cos(a)];
    }
    function proj(v: [number,number,number]): [number,number,number] {
      const sc = FOV / (FOV + v[2]);
      return [S/2 + v[0]*SCALE*sc, S/2 + v[1]*SCALE*sc, v[2]];
    }

    function draw() {
      ctx.clearRect(0, 0, S, S);
      const t = yaw;
      const projected = verts.map(v => proj(rotX(rotY(v, t), t * 0.55)));

      for (const [a, b] of edges) {
        const pa = projected[a];
        const pb = projected[b];
        const avgZ = (pa[2] + pb[2]) / 2;
        const alpha = Math.max(0.12, (avgZ + 1) / 2) * 0.9;
        ctx.beginPath();
        ctx.moveTo(pa[0], pa[1]);
        ctx.lineTo(pb[0], pb[1]);
        ctx.strokeStyle = `rgba(0,255,157,${alpha.toFixed(2)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      for (const [px, py] of projected as [number,number,number][]) {
        ctx.beginPath();
        ctx.arc(px, py, 1.3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0,255,157,0.7)';
        ctx.fill();
      }

      yaw += 0.018;
      rafRef.current = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ filter: 'drop-shadow(0 0 6px rgba(0,255,157,0.5))', display: 'block' }}
      aria-hidden="true"
    />
  );
}

function PulseNode() {
  return (
    <div className="absolute -left-[2.35rem] top-8 hidden md:flex items-center justify-center w-5 h-5">
      <span className="absolute inline-flex w-full h-full rounded-full bg-[#00ff9d] opacity-20 animate-ping" />
      <span className="relative inline-flex w-3 h-3 rounded-full bg-[#00ff9d]"
        style={{ boxShadow: '0 0 8px rgba(0,255,157,0.8), 0 0 20px rgba(0,255,157,0.3)' }} />
    </div>
  );
}

const experiences = [
  {
    role: 'Software Development Intern',
    company: 'Etelligense Technology · Greater Noida West',
    period: 'Jan 2026 — Present',
    summary: 'Contributing to backend-driven applications and Odoo ERP customization in a production-oriented internship environment.',
    highlights: [
      ['Engineered backend features using Python and Django, integrating REST APIs with PostgreSQL-backed data models for enterprise workflows.',
       'Designed and optimized PostgreSQL queries, improving data retrieval for database-backed features and API endpoints.',
       'Built FastAPI microservices with async endpoints for high-throughput internal tooling.'],
      ['Customized Odoo ERP modules, reports, and business processes — bridging Python backend logic with real operational requirements.',
       'Built and consumed REST APIs with structured validation, error handling, and authentication-aware endpoint design.',
       'Collaborated using Git/GitHub with branching strategies for feature delivery.'],
    ],
    tech: ['Python','Django','FastAPI','PostgreSQL','REST APIs','Git','Odoo'],
  },
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
    <section ref={sectionRef} className="min-h-screen bg-[#050508] px-6 md:px-20 py-24">
      <p className="reveal text-[#00ff9d] text-xs font-mono tracking-widest mb-4">// EXPERIENCE</p>
      <h2 className="reveal text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
        Engineering impact through backend development and ERP customization.
      </h2>
      <p className="reveal text-[#9ca3af] text-lg mb-16">
        Internship experience focused on delivering reliable Python backend systems, REST APIs, and production-grade features.
      </p>

      <div className="relative">
        <div
          className="absolute left-0 top-0 bottom-0 w-0.5 hidden md:block"
          style={{
            marginLeft: '1.5rem',
            background: 'linear-gradient(to bottom, transparent 0%, #00ff9d 8%, #00ff9d 92%, transparent 100%)',
            boxShadow: '0 0 10px rgba(0,255,157,0.6), 0 0 24px rgba(0,255,157,0.15)',
          }}
          aria-hidden="true"
        />

        <div className="hidden md:flex absolute -top-14 left-0 items-center justify-center"
          style={{ marginLeft: '0.55rem' }}>
          <RotatingCube />
        </div>

        <div className="space-y-8 md:ml-16">
          {experiences.map((item) => (
            <div key={item.role} className="reveal relative"
              style={{ transition: 'opacity 0.7s ease, transform 0.7s ease' }}>
              <PulseNode />
              <div className="bg-[#111118] border border-[#1f2937] rounded-xl p-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">{item.role}</h3>
                    <p className="text-[#00ff9d] font-mono text-sm mt-1">{item.company}</p>
                  </div>
                  <span className="mt-2 md:mt-0 px-4 py-2 bg-[#1f2937] text-[#9ca3af] text-sm rounded-lg font-mono shrink-0">
                    {item.period}
                  </span>
                </div>
                <p className="text-[#6b7280] mb-6">{item.summary}</p>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  {item.highlights.map((col, ci) => (
                    <ul key={ci} className="space-y-3">
                      {col.map(b => (
                        <li key={b} className="flex gap-3 text-[#9ca3af] text-sm">
                          <span className="text-[#00ff9d] mt-1 shrink-0">•</span>{b}
                        </li>
                      ))}
                    </ul>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {item.tech.map(t => (
                    <span key={t} className="px-3 py-1 bg-[#0d1117] border border-[#1f2937] text-[#6b7280] text-xs rounded font-mono">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
