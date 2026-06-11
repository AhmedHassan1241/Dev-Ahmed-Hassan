export default function AnimatedBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Cyan orb — top right */}
      <div
        className="absolute -top-56 -right-56 w-[800px] h-[800px] rounded-full animate-orb-1"
        style={{
          background:
            "radial-gradient(circle at center, rgba(6,182,212,0.22) 0%, rgba(6,182,212,0.07) 45%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />

      {/* Violet orb — bottom left */}
      <div
        className="absolute -bottom-56 -left-56 w-[900px] h-[900px] rounded-full animate-orb-2"
        style={{
          background:
            "radial-gradient(circle at center, rgba(139,92,246,0.22) 0%, rgba(119,123,180,0.08) 45%, transparent 70%)",
          filter: "blur(75px)",
        }}
      />

      {/* Blue orb — center-right */}
      <div
        className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full animate-orb-3"
        style={{
          background:
            "radial-gradient(circle at center, rgba(59,130,246,0.13) 0%, rgba(6,182,212,0.05) 50%, transparent 70%)",
          filter: "blur(65px)",
        }}
      />

      {/* Violet accent — mid left */}
      <div
        className="absolute top-1/2 -left-32 w-[420px] h-[420px] rounded-full animate-orb-2"
        style={{
          background:
            "radial-gradient(circle at center, rgba(124,58,237,0.14) 0%, transparent 70%)",
          filter: "blur(80px)",
          animationDelay: "4s",
        }}
      />

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.022]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.85) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      {/* Top fade */}
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#050d1a] to-transparent" />
      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#050d1a] to-transparent" />
    </div>
  );
}
