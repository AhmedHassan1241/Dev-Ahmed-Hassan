"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface Props { label: string; title: string; subtitle?: string; }

export default function SectionHeading({ label, title, subtitle }: Props) {
  const wrapRef      = useRef<HTMLDivElement>(null);
  const labelRef     = useRef<HTMLSpanElement>(null);
  const titleRef     = useRef<HTMLHeadingElement>(null);
  const subtitleRef  = useRef<HTMLParagraphElement>(null);
  const lineLeftRef  = useRef<HTMLDivElement>(null);
  const lineRightRef = useRef<HTMLDivElement>(null);
  const dotRef       = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const refreshId  = setTimeout(() => ScrollTrigger.refresh(), 100);
    // Fallback: if ScrollTrigger doesn't fire within 800ms, force-show everything
    const fallbackId = setTimeout(() => {
      if (!wrapRef.current) return;
      gsap.to(wrapRef.current.querySelectorAll("[data-sh]"), { opacity: 1, y: 0, x: 0, scale: 1, duration: 0.4 });
    }, 800);

    const ctx = gsap.context(() => {
      const st = {
        trigger: wrapRef.current,
        start: "top 100%",
        toggleActions: "play none none none",
        onEnter: () => clearTimeout(fallbackId),
      };
      const tl = gsap.timeline({ scrollTrigger: st });

      // ── Label drops from top ──
      tl.fromTo(
        labelRef.current,
        { y: -26, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.48, ease: "power3.out" },
        0,
      );

      // ── Title: word-by-word clip reveal (slide up from behind) ──
      if (titleRef.current) {
        const raw = titleRef.current.textContent?.trim() ?? "";
        titleRef.current.innerHTML = raw
          .split(" ")
          .map(
            (w) =>
              `<span style="display:inline-block;overflow:hidden;vertical-align:bottom;padding-bottom:0.1em">` +
              `<span class="sh-word" style="display:inline-block">${w}</span>` +
              `</span>`,
          )
          .join(" ");
        tl.fromTo(
          titleRef.current.querySelectorAll(".sh-word"),
          { y: "115%", skewX: 5, opacity: 0 },
          { y: "0%", skewX: 0, opacity: 1, stagger: 0.09, duration: 0.7, ease: "power4.out" },
          0.18,
        );
      }

      // ── Subtitle fades in from below ──
      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.46, ease: "power2.out" },
          0.40,
        );
      }

      // ── Lines draw from center outward ──
      tl.fromTo(lineLeftRef.current,  { scaleX: 0, transformOrigin: "right center" }, { scaleX: 1, duration: 0.58, ease: "power3.out" }, 0.52);
      tl.fromTo(lineRightRef.current, { scaleX: 0, transformOrigin: "left center"  }, { scaleX: 1, duration: 0.58, ease: "power3.out" }, 0.52);

      // ── Dot pops from center ──
      tl.fromTo(
        dotRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.46, ease: "back.out(2.8)" },
        0.62,
      );

      // ── Dot glow pulse — infinite ──
      gsap.to(dotRef.current, {
        boxShadow: "0 0 22px rgba(6,182,212,1), 0 0 46px rgba(139,92,246,0.65)",
        duration: 1.5, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1.1,
      });
    }, wrapRef);

    return () => { ctx.revert(); clearTimeout(refreshId); clearTimeout(fallbackId); };
  }, []);

  return (
    <div ref={wrapRef} className="mb-16 text-center">
      <span ref={labelRef} data-sh style={{ opacity: 0 }} className="label-badge mb-5 inline-flex">
        <span className="w-1.5 h-1.5 rounded-full bg-laravel animate-pulse" />
        {label}
      </span>

      <h2
        ref={titleRef}
        data-sh
        className="text-4xl sm:text-5xl font-extrabold mb-4 gradient-text tracking-tight"
      >
        {title}
      </h2>

      {subtitle && (
        <p
          ref={subtitleRef}
          data-sh
          style={{ opacity: 0 }}
          className="text-slate-300 text-base max-w-xl mx-auto leading-relaxed"
        >
          {subtitle}
        </p>
      )}

      <div className="flex items-center justify-center gap-3 mt-6 max-w-sm mx-auto">
        <div
          ref={lineLeftRef}
          className="flex-1 h-px rounded-full"
          style={{ background: "linear-gradient(to right, transparent, #06B6D4)" }}
        />
        <div
          ref={dotRef}
          data-sh
          style={{
            width: "10px", height: "10px", borderRadius: "50%",
            flexShrink: 0, opacity: 0,
            background: "linear-gradient(135deg, #06B6D4, #8B5CF6)",
            boxShadow: "0 0 10px rgba(6,182,212,0.8), 0 0 22px rgba(139,92,246,0.4)",
          }}
        />
        <div
          ref={lineRightRef}
          className="flex-1 h-px rounded-full"
          style={{ background: "linear-gradient(to left, transparent, #8B5CF6)" }}
        />
      </div>
    </div>
  );
}
