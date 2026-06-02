export default function DigitalLogoBanner() {
  return (
    <div className="home-hero-media-frame" data-style-section="home-hero-media-frame">
      <video
        className="home-hero-video"
        data-style-section="home-hero-video"
        src="/dayiiiatch-logo.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label="DAYIIIatch digital logo animation"
      />
    </div>
  );
}
