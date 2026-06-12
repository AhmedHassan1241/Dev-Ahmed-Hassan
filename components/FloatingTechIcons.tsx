"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  SiPhp, SiLaravel, SiMysql, SiNodedotjs, SiMongodb,
  SiReact, SiJavascript, SiTypescript, SiGit, SiLinux,
  SiExpress, SiHtml5, SiCss, SiGithub, SiCpanel,
} from "react-icons/si";
import { FaNetworkWired } from "react-icons/fa6";
import { TbServerBolt } from "react-icons/tb";

const ICONS = [
  // ── Left column (top → bottom) ──
  { Icon: SiPhp,          color: "#777BB4", top: "5%",   left: "1%",   size: 52, rot: -12, floatY: 20, dur: 5.8, delay: 0.0, pSpeed: 0.12 },
  { Icon: SiLaravel,      color: "#06B6D4", top: "17%",  left: "2%",   size: 44, rot:   8, floatY: 26, dur: 6.5, delay: 1.2, pSpeed: 0.18 },
  { Icon: SiMysql,        color: "#4479A1", top: "31%",  left: "0.5%", size: 50, rot:  -6, floatY: 18, dur: 5.2, delay: 2.0, pSpeed: 0.14 },
  { Icon: SiGit,          color: "#F05032", top: "47%",  left: "1.5%", size: 42, rot:  10, floatY: 22, dur: 6.0, delay: 0.8, pSpeed: 0.20 },
  { Icon: SiLinux,        color: "#94a3b8", top: "62%",  left: "1%",   size: 46, rot:  -9, floatY: 24, dur: 5.5, delay: 1.6, pSpeed: 0.16 },
  { Icon: SiHtml5,        color: "#E34F26", top: "76%",  left: "2%",   size: 40, rot:   7, floatY: 20, dur: 6.2, delay: 3.0, pSpeed: 0.13 },
  { Icon: TbServerBolt,   color: "#38bdf8", top: "88%",  left: "1%",   size: 44, rot:  -5, floatY: 22, dur: 5.0, delay: 2.4, pSpeed: 0.17 },

  // ── Right column (top → bottom) ──
  { Icon: SiReact,        color: "#61DAFB", top: "4%",   left: "93%",  size: 50, rot:  10, floatY: 28, dur: 6.8, delay: 0.5, pSpeed: 0.15 },
  { Icon: SiNodedotjs,    color: "#339933", top: "16%",  left: "94%",  size: 46, rot:  -8, floatY: 22, dur: 5.6, delay: 1.5, pSpeed: 0.19 },
  { Icon: SiJavascript,   color: "#F7DF1E", top: "29%",  left: "93%",  size: 42, rot:   6, floatY: 18, dur: 4.8, delay: 2.2, pSpeed: 0.11 },
  { Icon: SiTypescript,   color: "#3178C6", top: "43%",  left: "94%",  size: 44, rot: -10, floatY: 24, dur: 6.3, delay: 0.3, pSpeed: 0.22 },
  { Icon: SiMongodb,      color: "#47A248", top: "57%",  left: "93%",  size: 48, rot:   8, floatY: 20, dur: 5.4, delay: 1.8, pSpeed: 0.14 },
  { Icon: SiExpress,      color: "#94a3b8", top: "70%",  left: "94%",  size: 40, rot:  -7, floatY: 26, dur: 6.0, delay: 2.8, pSpeed: 0.18 },
  { Icon: FaNetworkWired, color: "#8B5CF6", top: "82%",  left: "93%",  size: 44, rot:   5, floatY: 22, dur: 5.8, delay: 0.9, pSpeed: 0.16 },
  { Icon: SiGithub,       color: "#94a3b8", top: "92%",  left: "94%",  size: 42, rot: -11, floatY: 18, dur: 5.2, delay: 3.5, pSpeed: 0.13 },
] as const;

export default function FloatingTechIcons() {
  const wrapRefs  = useRef<(HTMLDivElement | null)[]>([]);
  const floatRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      ICONS.forEach((item, i) => {
        const wrap  = wrapRefs.current[i];
        const float = floatRefs.current[i];
        if (!wrap || !float) return;

        // ── Staggered entrance ──
        gsap.fromTo(
          wrap,
          { opacity: 0, scale: 0.5, rotate: item.rot * 2 },
          {
            opacity: 1, scale: 1, rotate: item.rot,
            duration: 1.0, ease: "back.out(1.6)",
            delay: i * 0.12 + 0.5,
          },
        );

        // ── Float + rotation in one timeline (saves 1 tween per icon) ──
        const targetRot = item.rot + (item.rot > 0 ? -6 : 6);
        gsap.timeline({ repeat: -1, yoyo: true, delay: item.delay })
          .to(float, { y: -item.floatY,    duration: item.dur,       ease: "sine.inOut" }, 0)
          .to(float, { rotation: targetRot, duration: item.dur * 1.8, ease: "sine.inOut" }, 0);

        // ── Scroll parallax ──
        gsap.to(wrap, {
          y: () => -(document.body.scrollHeight * item.pSpeed),
          ease: "none",
          scrollTrigger: {
            trigger: document.body,
            start:   "top top",
            end:     "bottom bottom",
            scrub:   1.6,
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
      {ICONS.map((item, i) => (
        <div
          key={i}
          ref={(el) => { wrapRefs.current[i] = el; }}
          className="absolute"
          style={{
            top:     item.top,
            left:    item.left,
            opacity: 0,
          }}
        >
          <div
            ref={(el) => { floatRefs.current[i] = el; }}
            style={{ transform: `rotate(${item.rot}deg)`, willChange: "transform" }}
          >
            {/* Glass pill — no backdropFilter (saves 15 GPU compositor layers) */}
            <div
              style={{
                padding:      "10px",
                borderRadius: "14px",
                background:   "rgba(5,13,30,0.72)",
                border:       `1px solid ${item.color}30`,
                boxShadow:    `0 6px 24px rgba(0,0,0,0.45), 0 0 14px ${item.color}20`,
              }}
            >
              <item.Icon
                size={item.size}
                style={{ color: item.color, filter: `drop-shadow(0 0 8px ${item.color}60)` }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
