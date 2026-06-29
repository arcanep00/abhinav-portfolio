import { useEffect, useRef } from "react";

const NODE_COUNT = 150;
const CONNECTION_DIST = 160;

interface Node { x: number; y: number; vx: number; vy: number }

export function NeuralCanvas2D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const nodes = useRef<Node[]>([]);
  const raf = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      nodes.current = Array.from({ length: NODE_COUNT }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.55,
        vy: (Math.random() - 0.5) * 0.55
      }));
    };

    resize();
    const onResize = () => resize();
    const onMouseMove = (e: MouseEvent) => { mouse.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove);

    const draw = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      for (const n of nodes.current) {
        const dx = mouse.current.x - n.x;
        const dy = mouse.current.y - n.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 200) { n.vx += (dx / d) * 0.015; n.vy += (dy / d) * 0.015; }
        n.vx *= 0.994; n.vy *= 0.994;
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0) { n.x = 0; n.vx *= -1; }
        if (n.x > width) { n.x = width; n.vx *= -1; }
        if (n.y < 0) { n.y = 0; n.vy *= -1; }
        if (n.y > height) { n.y = height; n.vy *= -1; }
      }

      for (let i = 0; i < nodes.current.length; i++) {
        for (let j = i + 1; j < nodes.current.length; j++) {
          const dx = nodes.current[i].x - nodes.current[j].x;
          const dy = nodes.current[i].y - nodes.current[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            ctx.beginPath();
            ctx.moveTo(nodes.current[i].x, nodes.current[i].y);
            ctx.lineTo(nodes.current[j].x, nodes.current[j].y);
            ctx.strokeStyle = `rgba(0,255,157,${(1 - dist / CONNECTION_DIST) * 0.3})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      for (const n of nodes.current) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0,255,157,0.8)";
        ctx.fill();
        ctx.shadowBlur = 6;
        ctx.shadowColor = "#00ff9d";
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      raf.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 -z-10 h-full w-full" />;
}
