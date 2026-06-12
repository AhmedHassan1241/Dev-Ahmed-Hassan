"use client";

import { useEffect, useRef } from "react";

export default function MouseGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;

    let rafId: number;
    let tx = -2000, ty = -2000;
    let cx = -2000, cy = -2000;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    const tick = () => {
      const dx = tx - cx;
      const dy = ty - cy;
      cx += dx * 0.07;
      cy += dy * 0.07;
      // Only write to DOM when movement is noticeable
      if ((dx * dx + dy * dy) > 0.25 && ref.current) {
        ref.current.style.left = `${cx}px`;
        ref.current.style.top  = `${cy}px`;
      }
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <div
        ref={ref}
        className="absolute -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at center, rgba(6,182,212,0.055) 0%, rgba(119,123,180,0.025) 40%, transparent 70%)",
          filter: "blur(45px)",
          top: "-2000px",
          left: "-2000px",
        }}
      />
    </div>
  );
}
