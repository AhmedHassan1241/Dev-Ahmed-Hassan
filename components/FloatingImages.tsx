"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/*
  Each image tile:
  - pos     → { top, left } as CSS percentages (viewport-relative since container is fixed)
  - size    → width in px
  - rot     → initial rotation degrees
  - floatY  → float amplitude (px)
  - dur     → float cycle duration (s)
  - delay   → float start delay (s)
  - pSpeed  → parallax speed (higher = moves more on scroll)
*/
const TILES = [
  { src: "/1.jpg", top: "5%",  left: "0.5%",  size: 210, rot:  -8, floatY: 18, dur: 6.0, delay: 0.0, pSpeed: 0.10 },
  { src: "/2.jpg", top: "10%", left: "86%",   size: 195, rot:   6, floatY: 24, dur: 5.2, delay: 0.8, pSpeed: 0.18 },
  { src: "/3.jpg", top: "30%", left: "0%",    size: 185, rot:  -5, floatY: 20, dur: 6.5, delay: 1.6, pSpeed: 0.13 },
  { src: "/4.jpg", top: "42%", left: "87%",   size: 205, rot:   9, floatY: 22, dur: 5.5, delay: 2.2, pSpeed: 0.20 },
  { src: "/5.jpg", top: "60%", left: "0.5%",  size: 190, rot:  -7, floatY: 18, dur: 4.8, delay: 0.4, pSpeed: 0.15 },
  { src: "/6.jpg", top: "72%", left: "86%",   size: 178, rot:   6, floatY: 26, dur: 6.2, delay: 1.2, pSpeed: 0.17 },
  { src: "/7.jpg", top: "84%", left: "1%",    size: 198, rot:  -4, floatY: 22, dur: 5.8, delay: 3.0, pSpeed: 0.11 },
] as const;

export default function FloatingImages() {
  const wrapRefs  = useRef<(HTMLDivElement | null)[]>([]); // parallax wrapper
  const floatRefs = useRef<(HTMLDivElement | null)[]>([]); // float wrapper

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      TILES.forEach((tile, i) => {
        const wrap  = wrapRefs.current[i];
        const float = floatRefs.current[i];
        if (!wrap || !float) return;

        // ── Entrance: fade + scale in ──
        gsap.fromTo(
          wrap,
          { opacity: 0, scale: 0.82 },
          { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out", delay: i * 0.18 + 0.4 },
        );

        // ── Continuous float ──
        gsap.to(float, {
          y:        -tile.floatY,
          duration: tile.dur,
          repeat:   -1,
          yoyo:     true,
          ease:     "sine.inOut",
          delay:    tile.delay,
        });

        // ── Slow rotation drift ──
        gsap.to(float, {
          rotation: tile.rot + (tile.rot > 0 ? -4 : 4),
          duration: tile.dur * 1.6,
          repeat:   -1,
          yoyo:     true,
          ease:     "sine.inOut",
          delay:    tile.delay + 0.5,
        });

        // ── Scroll parallax (fixed elements move at different speeds) ──
        gsap.to(wrap, {
          y: () => -(document.body.scrollHeight * tile.pSpeed),
          ease: "none",
          scrollTrigger: {
            trigger: document.body,
            start:   "top top",
            end:     "bottom bottom",
            scrub:   1.4,
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden"
      style={{ zIndex: 1 }}
      aria-hidden
    >
      {TILES.map((tile, i) => (
        /* ── Parallax wrapper ── */
        <div
          key={i}
          ref={(el) => { wrapRefs.current[i] = el; }}
          className="absolute"
          style={{
            top:   tile.top,
            left:  tile.left,
            width: tile.size,
            opacity: 0,
            willChange: "transform",
          }}
        >
          {/* ── Float + rotation wrapper ── */}
          <div
            ref={(el) => { floatRefs.current[i] = el; }}
            style={{ transform: `rotate(${tile.rot}deg)`, willChange: "transform" }}
          >
            {/* ── Glass frame ── */}
            <div
              style={{
                borderRadius:          "16px",
                overflow:              "hidden",
                border:                "1px solid rgba(255,255,255,0.22)",
                background:            "rgba(255,255,255,0.08)",
                backdropFilter:        "blur(10px) saturate(140%)",
                WebkitBackdropFilter:  "blur(10px) saturate(140%)",
                boxShadow:
                  "0 12px 40px rgba(0,0,0,0.45), 0 0 20px rgba(6,182,212,0.10), inset 0 1px 0 rgba(255,255,255,0.16)",
                padding: "4px",
              }}
            >
              <div
                style={{
                  borderRadius: "12px",
                  overflow:     "hidden",
                  width:        tile.size - 6,
                  height:       Math.round((tile.size - 6) * 0.68),
                  position:     "relative",
                }}
              >
                <Image
                  src={tile.src}
                  alt=""
                  fill
                  sizes={`${tile.size}px`}
                  className="object-cover"
                  style={{
                    opacity: 0.50,
                    filter:  "saturate(85%) brightness(0.75)",
                  }}
                />
                {/* cyan-purple glass tint overlay */}
                <div
                  style={{
                    position:   "absolute",
                    inset:      0,
                    background: "linear-gradient(135deg, rgba(6,182,212,0.12) 0%, rgba(139,92,246,0.10) 100%)",
                    borderRadius: "12px",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
