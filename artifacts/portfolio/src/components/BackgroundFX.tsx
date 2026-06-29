export function BackgroundFX() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-50 overflow-hidden">
      <div className="absolute -left-96 -top-96 h-[700px] w-[700px] rounded-full bg-[#00ff9d]/[0.04] blur-3xl" />
      <div className="absolute -right-96 top-1/3 h-[600px] w-[600px] rounded-full bg-[#00f5ff]/[0.04] blur-3xl" />
      <div className="absolute bottom-0 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#a78bfa]/[0.03] blur-3xl" />
    </div>
  );
}
