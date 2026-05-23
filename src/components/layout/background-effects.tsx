type BackgroundEffectsProps = {
  fixedMainImage?: boolean;
};

export default function BackgroundEffects({
  fixedMainImage = false,
}: BackgroundEffectsProps) {
  const layerClassName = fixedMainImage ? "fixed inset-0" : "absolute inset-0";

  return (
    <>
      <div
        className={
          fixedMainImage
            ? "main-public-background"
            : "absolute inset-0 bg-[url('/bg-main.png')] bg-cover bg-center bg-no-repeat opacity-50"
        }
      />

      <div
        className={`${layerClassName} bg-[linear-gradient(to_bottom,rgba(3,7,18,0.42),rgba(3,7,18,0.68),rgba(0,0,0,0.82))]`}
      />

      <div
        className={`${layerClassName} bg-[radial-gradient(circle_at_top_left,_rgba(139,92,246,0.13),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(59,130,246,0.08),_transparent_24%),radial-gradient(circle_at_bottom_right,_rgba(34,211,238,0.08),_transparent_30%)]`}
      />

      <div className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-violet-500/10 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-[18rem] h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
    </>
  );
}
