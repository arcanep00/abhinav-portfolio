import { useEffect, useRef } from 'react';

/* ── Tetrahedron background — Canvas2D, no WebGL ─────────── */
const S2 = Math.sqrt(2);

/* Unit tetrahedron vertices (centred at origin, normalised to unit sphere) */
const TET_N: [number,number,number][] = (() => {
  const raw: [number,number,number][] = [
    [ 1,  0, -1/S2],
    [-1,  0, -1/S2],
    [ 0,  1,  1/S2],
    [ 0, -1,  1/S2],
  ];
  return raw.map(([x,y,z]) => {
    const l = Math.sqrt(x*x + y*y + z*z);
    return [x/l, y/l, z/l];
  });
})();

const TET_EDGES: [number,number][] = [[0,1],[0,2],[0,3],[1,2],[1,3],[2,3]];

function TetrahedronBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

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

      const R   = Math.min(W, H) * 0.26;
      const cx  = W * 0.78;
      const cy  = H * 0.28;
      const fov = R * 3.5;

      const proj = TET_N.map(v => {
        const r = rotX(rotY(v, yaw), yaw * 0.45);
        const sc = fov / (fov + r[2] * R);
        return { x: cx + r[0]*R*sc, y: cy + r[1]*R*sc, z: r[2] };
      });

      for (const [a, b] of TET_EDGES) {
        const pa = proj[a], pb = proj[b];
        const depth = (pa.z + pb.z) / 2;
        const alpha = (depth + 1) / 2 * 0.24 + 0.05;
        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.lineTo(pb.x, pb.y);
        ctx.strokeStyle = `rgba(0,255,157,${alpha.toFixed(3)})`;
        ctx.lineWidth = 1.4;
        ctx.stroke();
      }

      for (const { x, y, z } of proj) {
        const alpha = Math.max(0.15, (z + 1) / 2) * 0.5;
        ctx.beginPath();
        ctx.arc(x, y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,255,157,${alpha.toFixed(3)})`;
        ctx.fill();
      }

      yaw += 0.006;
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
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}

/* ── component ──────────────────────────────────────────────── */
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
    <section ref={sectionRef} className="relative min-h-screen bg-[#050508] px-6 md:px-20 py-24 overflow-hidden">

      {/* background tetrahedron — hidden on mobile */}
      <div className="hidden sm:block absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <TetrahedronBg />
      </div>

      {/* all existing content, lifted above bg */}
      <div className="relative" style={{ zIndex: 1 }}>
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
      </div>
    </section>
  );
}
