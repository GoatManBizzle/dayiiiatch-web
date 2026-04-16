export default function BackgroundEffects() {
  return (
    <>
      <div className="absolute inset-0 bg-[url('/bg-main.png')] bg-cover bg-center bg-no-repeat opacity-50" />

      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(3,7,18,0.58),rgba(3,7,18,0.82),rgba(0,0,0,0.92))]" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(139,92,246,0.18),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(59,130,246,0.10),_transparent_24%),radial-gradient(circle_at_bottom_right,_rgba(34,211,238,0.10),_transparent_30%)]" />

      <div className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-violet-500/10 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-[18rem] h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
    </>
  );
}