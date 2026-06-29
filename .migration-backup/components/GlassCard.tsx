import { cn } from "@/lib/utils";

type GlassCardProps = {
  children: React.ReactNode;
  className?: string;
};

export function GlassCard({ children, className }: GlassCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-lg border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.09),rgba(255,255,255,0.035))] shadow-glass backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-emeraldSoft/30 hover:shadow-glow",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />
      <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-emeraldSoft/10 blur-3xl transition duration-500 group-hover:bg-cyanSoft/14" />
      {children}
    </div>
  );
}
