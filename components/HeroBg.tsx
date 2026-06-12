"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

// ── Floating CS tokens (deterministic positions — no hydration mismatch) ──
const TOKENS = [
  { text: "</>",        top: "6%",   left: "9%",   size: 13, delay: 0.0,  cyan: true  },
  { text: "{...}",      top: "13%",  left: "75%",  size: 12, delay: 1.2,  cyan: false },
  { text: "<?php",      top: "72%",  left: "6%",   size: 11, delay: 2.4,  cyan: true  },
  { text: "0xFF3A",     top: "86%",  left: "62%",  size: 12, delay: 0.8,  cyan: false },
  { text: "$this->",    top: "23%",  left: "86%",  size: 10, delay: 3.1,  cyan: true  },
  { text: "01101001",   top: "43%",  left: "3%",   size: 10, delay: 1.7,  cyan: false },
  { text: "API",        top: "60%",  left: "90%",  size: 15, delay: 2.2,  cyan: true  },
  { text: "=>",         top: "33%",  left: "1%",   size: 17, delay: 0.5,  cyan: false },
  { text: "MySQL",      top: "80%",  left: "82%",  size: 11, delay: 3.5,  cyan: true  },
  { text: "HTTP/2",     top: "16%",  left: "43%",  size: 10, delay: 1.9,  cyan: false },
  { text: "10110",      top: "53%",  left: "73%",  size: 10, delay: 2.8,  cyan: true  },
  { text: "{ }",        top: "90%",  left: "27%",  size: 14, delay: 0.3,  cyan: false },
  { text: "function()", top: "4%",   left: "52%",  size: 10, delay: 1.5,  cyan: true  },
  { text: "&&",         top: "38%",  left: "94%",  size: 18, delay: 2.0,  cyan: false },
  { text: "git commit", top: "76%",  left: "42%",  size: 9,  delay: 3.2,  cyan: true  },
  { text: "null",       top: "28%",  left: "15%",  size: 11, delay: 0.9,  cyan: false },
  { text: "0x1B4C",     top: "10%",  left: "29%",  size: 9,  delay: 2.6,  cyan: true  },
  { text: "return;",    top: "47%",  left: "59%",  size: 10, delay: 1.1,  cyan: false },
  { text: "[ ]",        top: "67%",  left: "21%",  size: 14, delay: 3.8,  cyan: true  },
  { text: "REST",       top: "19%",  left: "59%",  size: 11, delay: 2.3,  cyan: false },
  { text: "npm run",    top: "94%",  left: "75%",  size: 9,  delay: 1.6,  cyan: true  },
  { text: "interface",  top: "57%",  left: "88%",  size: 9,  delay: 0.4,  cyan: false },
  { text: "::class",    top: "84%",  left: "14%",  size: 10, delay: 2.9,  cyan: true  },
  { text: "JSON",       top: "3%",   left: "80%",  size: 12, delay: 0.7,  cyan: false },
  { text: "async/await",top: "31%",  left: "50%",  size: 9,  delay: 3.4,  cyan: true  },
];

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  r: number;
  opacity: number;
  cyan: boolean;
}

export default function HeroBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tokensRef = useRef<HTMLDivElement>(null);

  // ── Neural network canvas ──
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const COUNT = 28;      // was 42 — O(n²) pairs: 378 vs 861
    const LINK2 = 120 * 120;

    const particles: Particle[] = Array.from({ length: COUNT }, () => ({
      x:       Math.random() * canvas.width,
      y:       Math.random() * canvas.height,
      vx:      (Math.random() - 0.5) * 0.38,
      vy:      (Math.random() - 0.5) * 0.38,
      r:       Math.random() * 1.4 + 0.7,
      opacity: Math.random() * 0.45 + 0.2,
      cyan:    Math.random() > 0.45,
    }));

    // Pause ticker when hero is off-screen
    let active = true;
    const observer = new IntersectionObserver(
      ([entry]) => { active = entry.isIntersecting; },
      { threshold: 0 },
    );
    observer.observe(canvas);

    const tick = gsap.ticker.add(() => {
      if (!active) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.cyan
          ? `rgba(6,182,212,${p.opacity})`
          : `rgba(139,92,246,${p.opacity})`;
        ctx.fill();
      }

      // Quadratic falloff — no Math.sqrt in the inner loop
      ctx.lineWidth = 0.75;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx    = particles[i].x - particles[j].x;
          const dy    = particles[i].y - particles[j].y;
          const dist2 = dx * dx + dy * dy;
          if (dist2 > LINK2) continue;

          const alpha = (1 - dist2 / LINK2) * 0.20;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(80,162,230,${alpha})`;
          ctx.stroke();
        }
      }
    });

    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener("resize", resize);
      observer.disconnect();
    };
  }, []);

  // ── Floating CS tokens ──
  useEffect(() => {
    if (!tokensRef.current) return;

    const els = tokensRef.current.querySelectorAll<HTMLElement>(".cs-token");

    // Initial fade-in stagger
    gsap.fromTo(
      els,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, stagger: 0.08, duration: 1.2, ease: "power2.out", delay: 0.8 },
    );

    // Individual float + pulse on each token
    els.forEach((el) => {
      const floatY   = (Math.random() - 0.5) * 28 + 16;
      const floatDur = Math.random() * 3 + 4;
      const driftX   = (Math.random() - 0.5) * 14;

      gsap.to(el, {
        y:        `-=${floatY}`,
        x:        `+=${driftX}`,
        duration: floatDur,
        repeat:   -1,
        yoyo:     true,
        ease:     "sine.inOut",
        delay:    parseFloat(el.dataset.delay ?? "0"),
      });

      gsap.to(el, {
        opacity:  `*=0.45`,
        duration: floatDur * 0.7,
        repeat:   -1,
        yoyo:     true,
        ease:     "sine.inOut",
        delay:    parseFloat(el.dataset.delay ?? "0") + 0.5,
      });
    });
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>

      {/* Neural network canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.55 }}
      />

      {/* Floating CS tokens */}
      <div ref={tokensRef} className="absolute inset-0">
        {TOKENS.map((t, i) => (
          <span
            key={i}
            className="cs-token absolute font-mono font-semibold select-none"
            data-delay={t.delay}
            style={{
              top:      t.top,
              left:     t.left,
              fontSize: t.size,
              color:    t.cyan
                ? "rgba(6,182,212,0.13)"
                : "rgba(139,92,246,0.13)",
              textShadow: t.cyan
                ? "0 0 12px rgba(6,182,212,0.35)"
                : "0 0 12px rgba(139,92,246,0.35)",
              opacity:    0,
              letterSpacing: "0.04em",
            }}
          >
            {t.text}
          </span>
        ))}
      </div>

    </div>
  );
}
