import { useEffect, useRef } from 'react';

/* ── Icosahedron background — Canvas2D, no WebGL ───────────── */
const PHI = (1 + Math.sqrt(5)) / 2;
const ISO_VERTS: [number, number, number][] = [
  [-1, PHI, 0],[1, PHI, 0],[-1,-PHI, 0],[1,-PHI, 0],
  [0,-1, PHI],[0, 1, PHI],[0,-1,-PHI],[0, 1,-PHI],
  [PHI, 0,-1],[PHI, 0, 1],[-PHI, 0,-1],[-PHI, 0, 1],
];
const ISO_EDGES: [number,number][] = [
  [0,1],[0,5],[0,7],[0,10],[0,11],
  [1,5],[1,7],[1,8],[1,9],
  [2,3],[2,6],[2,10],[2,11],
  [3,4],[3,6],[3,8],[3,9],
  [4,5],[4,9],[4,11],
  [5,9],[5,11],
  [6,7],[6,8],[6,10],
  [7,8],[7,10],
  [8,9],[10,11],
];
/* normalise so all verts sit on unit sphere */
const ISO_NORM = ISO_VERTS.map(([x,y,z]) => {
  const l = Math.sqrt(x*x + y*y + z*z);
  return [x/l, y/l, z/l] as [number,number,number];
});

function IcosahedronBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const maybeCtx = canvas.getContext("2d");
    if (!maybeCtx) return;
    const ctx: CanvasRenderingContext2D = maybeCtx;

    /* size canvas to its CSS size */
    function resize() {
      canvas!.width  = canvas!.offsetWidth;
      canvas!.height = canvas!.offsetHeight;
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let yaw = 0;

    function rotY(v:[number,number,number], a:number):[number,number,number] {
      return [v[0]*Math.cos(a)+v[2]*Math.sin(a), v[1], -v[0]*Math.sin(a)+v[2]*Math.cos(a)];
    }
    function rotX(v:[number,number,number], a:number):[number,number,number] {
      return [v[0], v[1]*Math.cos(a)-v[2]*Math.sin(a), v[1]*Math.sin(a)+v[2]*Math.cos(a)];
    }

    function draw() {
      const W = canvas!.width, H = canvas!.height;
      ctx.clearRect(0, 0, W, H);

      const R  = Math.min(W, H) * 0.38;
      const cx = W * 0.72;   /* offset to upper-right area */
      const cy = H * 0.32;
      const fov = R * 3.2;

      const projected = ISO_NORM.map(v => {
        const r = rotX(rotY(v, yaw), yaw * 0.38);
        const sc = fov / (fov + r[2] * R);
        return { x: cx + r[0]*R*sc, y: cy + r[1]*R*sc, z: r[2] };
      });

      for (const [a, b] of ISO_EDGES) {
        const pa = projected[a], pb = projected[b];
        const depth = (pa.z + pb.z) / 2;       /* -1..1 */
        const alpha = (depth + 1) / 2 * 0.22 + 0.04;
        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.lineTo(pb.x, pb.y);
        ctx.strokeStyle = `rgba(0,255,157,${alpha.toFixed(3)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      yaw += 0.004;
      rafRef.current = requestAnimationFrame(draw);
    }

    draw();
    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0, opacity: 0.9 }}
      aria-hidden="true"
    />
  );
}

/* ── existing data ──────────────────────────────────────────── */
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
    <section ref={sectionRef} className="relative min-h-screen bg-[#050508] px-6 md:px-20 py-24 overflow-hidden">

      {/* ── background icosahedron — hidden on small screens ── */}
      <div className="hidden sm:block absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <IcosahedronBg />
      </div>

      {/* ── all existing content, lifted above bg ─────────── */}
      <div className="relative" style={{ zIndex: 1 }}>
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
      </div>
    </section>
  );
}
