import { cn } from "@/lib/utils";

type GlassCardProps = {
  children: React.ReactNode;
  className?: string;
  glow?: "green" | "cyan" | "none";
};

export function GlassCard({ children, className, glow = "none" }: GlassCardProps) {
  const border =
    glow === "green" ? "rgba(0,255,157,0.18)" :
    glow === "cyan"  ? "rgba(0,245,255,0.18)" :
    "rgba(255,255,255,0.08)";
  const shadow =
    glow === "green" ? "0 0 30px rgba(0,255,157,0.1), 0 8px 32px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)" :
    glow === "cyan"  ? "0 0 30px rgba(0,245,255,0.1), 0 8px 32px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)" :
    "0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)";

  return (
    <div
      className={cn("group relative overflow-hidden rounded-xl transition duration-300 hover:-translate-y-1", className)}
      style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${border}`, boxShadow: shadow }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      {children}
    </div>
  );
}
