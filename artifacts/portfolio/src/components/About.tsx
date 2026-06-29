import { useEffect, useRef, useCallback } from 'react';

function WireframeSphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);
  const mouseRef = useRef({ px: 0, py: 0, tx: 0, ty: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    mouseRef.current.tx = ((e.clientX - cx) / (rect.width / 2)) * 0.4;
    mouseRef.current.ty = ((e.clientY - cy) / (rect.height / 2)) * 0.3;
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current.tx = 0;
    mouseRef.current.ty = 0;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const maybeCtx = canvas.getContext("2d");
    if (!maybeCtx) return;
    const ctx: CanvasRenderingContext2D = maybeCtx;

    const W = 220, H = 220;
    canvas.width = W;
    canvas.height = H;

    const R = 82;
    const LAT = 9;
    const LON = 11;
    let yaw = 0;

    function rotateY(x: number, y: number, z: number, a: number) {
      return { x: x * Math.cos(a) + z * Math.sin(a), y, z: -x * Math.sin(a) + z * Math.cos(a) };
    }
    function rotateX(x: number, y: number, z: number, a: number) {
      return { x, y: y * Math.cos(a) - z * Math.sin(a), z: y * Math.sin(a) + z * Math.cos(a) };
    }
    function project(x: number, y: number, z: number) {
      const fov = 340;
      const scale = fov / (fov + z);
      return { sx: W / 2 + x * scale, sy: H / 2 + y * scale, scale };
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);

      const m = mouseRef.current;
      m.px += (m.tx - m.px) * 0.06;
      m.py += (m.ty - m.py) * 0.06;

      const pitchOffset = m.py;
      const yawOffset = m.px;

      for (let i = 0; i <= LAT; i++) {
        const phi = (Math.PI * i) / LAT;
        ctx.beginPath();
        let first = true;
        for (let j = 0; j <= 64; j++) {
          const theta = (2 * Math.PI * j) / 64;
          let x = R * Math.sin(phi) * Math.cos(theta);
          let y = R * Math.cos(phi);
          let z = R * Math.sin(phi) * Math.sin(theta);
          const ry = rotateY(x, y, z, yaw + yawOffset);
          const rx = rotateX(ry.x, ry.y, ry.z, pitchOffset);
          const { sx, sy } = project(rx.x, rx.y, rx.z);
          const alpha = Math.max(0.06, (rx.z / R + 1) / 2) * 0.75;
          ctx.strokeStyle = `rgba(0,255,157,${alpha.toFixed(2)})`;
          ctx.lineWidth = 0.85;
          if (first) { ctx.moveTo(sx, sy); first = false; }
          else ctx.lineTo(sx, sy);
        }
        ctx.stroke();
      }

      for (let j = 0; j < LON; j++) {
        const theta0 = (2 * Math.PI * j) / LON;
        ctx.beginPath();
        let first = true;
        for (let i = 0; i <= 64; i++) {
          const phi = (Math.PI * i) / 64;
          let x = R * Math.sin(phi) * Math.cos(theta0);
          let y = R * Math.cos(phi);
          let z = R * Math.sin(phi) * Math.sin(theta0);
          const ry = rotateY(x, y, z, yaw + yawOffset);
          const rx = rotateX(ry.x, ry.y, ry.z, pitchOffset);
          const { sx, sy } = project(rx.x, rx.y, rx.z);
          const alpha = Math.max(0.05, (rx.z / R + 1) / 2) * 0.55;
          ctx.strokeStyle = `rgba(0,245,255,${alpha.toFixed(2)})`;
          ctx.lineWidth = 0.7;
          if (first) { ctx.moveTo(sx, sy); first = false; }
          else ctx.lineTo(sx, sy);
        }
        ctx.stroke();
      }

      yaw += 0.005;
      rafRef.current = requestAnimationFrame(draw);
    }

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return (
    <div ref={containerRef} className="absolute inset-0 flex items-center justify-center cursor-crosshair">
      <canvas
        ref={canvasRef}
        style={{ opacity: 0.85, filter: 'drop-shadow(0 0 14px rgba(0,255,157,0.3))' }}
        aria-hidden="true"
      />
    </div>
  );
}

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

        <div className="hidden md:flex items-center justify-center shrink-0">
          <div className="relative w-64 h-64">
            <div className="absolute inset-0 rounded-full border border-[#00ff9d22]" style={{animation:'spin 20s linear infinite'}} />
            <div className="absolute inset-4 rounded-full border border-[#00f5ff18]" style={{animation:'spin 15s linear infinite reverse'}} />
            <div className="absolute inset-8 rounded-full border border-[#a78bfa15]" />
            <WireframeSphere />
          </div>
        </div>
      </div>
    </section>
  );
}
