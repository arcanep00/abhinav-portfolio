export function BackgroundFX() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(139,233,255,0.13),transparent_28%),radial-gradient(circle_at_82%_12%,rgba(100,244,172,0.11),transparent_30%),radial-gradient(circle_at_50%_90%,rgba(246,201,111,0.08),transparent_32%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.028)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]" />
      <div className="absolute left-1/2 top-0 h-[44rem] w-[44rem] -translate-x-1/2 rounded-full border border-white/10 bg-cyanSoft/[0.035] blur-3xl" />
    </div>
  );
}
