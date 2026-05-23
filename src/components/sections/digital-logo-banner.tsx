export default function DigitalLogoBanner() {
  return (
    <section className="relative left-1/2 -mt-4 w-[min(90rem,calc(100vw-0.35rem))] -translate-x-1/2 overflow-hidden rounded-b-[1.5rem] border border-cyan-400/20 border-t-transparent bg-black shadow-[0_0_70px_rgba(34,211,238,0.18)] sm:-mt-8 sm:w-[min(90rem,calc(100vw-1rem))] sm:rounded-b-[2.5rem]">
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-cyan-400/16 via-transparent to-violet-500/18" />
      <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_38%,rgba(0,0,0,0.72)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 z-20 h-20 bg-gradient-to-t from-zinc-950 via-zinc-950/72 to-transparent sm:h-28" />

      <video
        src="/dayiiiatch-logo.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="h-[138px] w-full object-cover object-center sm:h-[240px] md:h-[300px] lg:h-[340px]"
        aria-label="DAYIIIatch digital logo animation"
      />

      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex justify-center px-3 pt-3 sm:px-4 sm:pt-5">
        <div className="max-w-[calc(100vw-2rem)] rounded-full border border-cyan-400/20 bg-black/35 px-3 py-1.5 text-center shadow-[0_0_28px_rgba(34,211,238,0.16)] backdrop-blur-xl sm:px-4 sm:py-2">
          <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-cyan-100 sm:text-xs sm:tracking-[0.32em]">
            DAYIIIatch Solutions
          </p>
          <p className="mt-1 hidden text-[10px] font-medium uppercase tracking-[0.22em] text-zinc-400 sm:block">
            Creative Systems / Digital Builds / Automation
          </p>
        </div>
      </div>
    </section>
  );
}
