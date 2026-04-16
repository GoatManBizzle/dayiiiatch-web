export default function ScreenshotFrame() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[999] hidden lg:block">
      <div className="absolute inset-[40px] rounded-[2rem] border border-white/10 shadow-[0_0_80px_rgba(34,211,238,0.12)]" />

      {/* Top Label */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-black/60 px-4 py-1 text-xs text-zinc-400">
        Screenshot Frame Mode
      </div>
    </div>
  );
}