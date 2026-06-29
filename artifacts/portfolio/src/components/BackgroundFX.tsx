export function BackgroundFX() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-50 overflow-hidden">
      <div className="absolute -left-64 -top-64 h-[600px] w-[600px] rounded-full bg-emeraldSoft/5 blur-3xl" />
      <div className="absolute -right-64 top-1/3 h-[500px] w-[500px] rounded-full bg-cyanSoft/5 blur-3xl" />
      <div className="absolute bottom-0 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-goldSoft/4 blur-3xl" />
    </div>
  );
}
