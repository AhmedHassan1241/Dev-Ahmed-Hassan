export default function AnimatedBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* ── Cyan orb — top right ── */}
      <div
        className="absolute -top-48 -right-48 w-[900px] h-[900px] rounded-full animate-orb-1"
        style={{
          background: "radial-gradient(circle at center, rgba(6,182,212,0.48) 0%, rgba(6,182,212,0.18) 40%, transparent 68%)",
          filter: "blur(52px)",
          willChange: "transform",
        }}
      />

      {/* ── Purple orb — bottom left ── */}
      <div
        className="absolute -bottom-48 -left-48 w-[1000px] h-[1000px] rounded-full animate-orb-2"
        style={{
          background: "radial-gradient(circle at center, rgba(139,92,246,0.44) 0%, rgba(124,58,237,0.16) 42%, transparent 68%)",
          filter: "blur(58px)",
          willChange: "transform",
        }}
      />

      {/* ── Blue-cyan orb — center ── */}
      <div
        className="absolute top-1/3 right-1/4 w-[600px] h-[600px] rounded-full animate-orb-3"
        style={{
          background: "radial-gradient(circle at center, rgba(59,130,246,0.28) 0%, rgba(6,182,212,0.10) 48%, transparent 68%)",
          filter: "blur(50px)",
          willChange: "transform",
        }}
      />

      {/* ── Violet accent — mid left ── */}
      <div
        className="absolute top-1/2 -left-24 w-[500px] h-[500px] rounded-full animate-orb-2"
        style={{
          background: "radial-gradient(circle at center, rgba(124,58,237,0.32) 0%, transparent 68%)",
          filter: "blur(62px)",
          animationDelay: "4s",
          willChange: "transform",
        }}
      />

      {/* ── Dot grid (slightly more visible) ── */}
      <div
        className="absolute inset-0 opacity-[0.032]"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.90) 1px, transparent 1px)",
          backgroundSize:  "44px 44px",
        }}
      />

      {/* ── Noise texture for glass depth ── */}
      <div
        className="absolute inset-0 opacity-[0.018]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      {/* ── Edge fades (keep colors away from edges) ── */}
      <div className="absolute inset-x-0 top-0    h-40 bg-gradient-to-b from-[#030b18] to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#030b18] to-transparent" />
    </div>
  );
}
