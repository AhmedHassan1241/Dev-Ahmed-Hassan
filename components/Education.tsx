"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaUniversity, FaGraduationCap, FaStar } from "react-icons/fa";
import SectionHeading from "./SectionHeading";

const subjects = [
  "Data Structures", "Algorithms", "Databases",
  "Software Engineering", "Computer Networks", "OOP",
];

export default function Education() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const card1Ref   = useRef<HTMLDivElement>(null);
  const card2Ref   = useRef<HTMLDivElement>(null);
  const gpaRef     = useRef<HTMLDivElement>(null);
  const tagsRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const st = { trigger: sectionRef.current, start: "top 78%", toggleActions: "play none none none" };

      // ── Card 1: slides from left ──
      gsap.set(card1Ref.current, { opacity: 0, x: -60, rotationY: 4 });
      gsap.to(card1Ref.current, {
        opacity: 1, x: 0, rotationY: 0, duration: 0.72, ease: "power3.out",
        scrollTrigger: st,
      });

      // ── GPA badge counter ──
      if (gpaRef.current) {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: 3.7, duration: 1.6, ease: "power2.out", delay: 0.5,
          onUpdate() { if (gpaRef.current) gpaRef.current.textContent = obj.val.toFixed(1); },
          scrollTrigger: st,
        });
      }

      // ── Subject tags stagger ──
      if (tagsRef.current) {
        gsap.fromTo(
          [...tagsRef.current.children],
          { opacity: 0, y: 14, scale: 0.82 },
          {
            opacity: 1, y: 0, scale: 1,
            stagger: 0.08, duration: 0.4, ease: "back.out(1.5)", delay: 0.35,
            scrollTrigger: st,
          },
        );
      }

      // ── Card 2: slides from right ──
      gsap.set(card2Ref.current, { opacity: 0, x: 60, rotationY: -4 });
      gsap.to(card2Ref.current, {
        opacity: 1, x: 0, rotationY: 0, duration: 0.68, ease: "power3.out", delay: 0.18,
        scrollTrigger: st,
      });

      // ── Hover glow on both cards ──
      [card1Ref.current, card2Ref.current].forEach((card) => {
        if (!card) return;
        card.addEventListener("mouseenter", () =>
          gsap.to(card, { boxShadow: "0 12px 40px rgba(0,0,0,0.35), 0 0 24px rgba(139,92,246,0.12)", y: -4, duration: 0.28 }),
        );
        card.addEventListener("mouseleave", () =>
          gsap.to(card, { boxShadow: "none", y: 0, duration: 0.35 }),
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="education" className="section-padding">
      <div className="section-container">
        <SectionHeading label="Academic Background" title="Education" />

        <div ref={sectionRef} className="max-w-2xl mx-auto" style={{ perspective: "1000px" }}>

          {/* ── CS Degree card ── */}
          <div
            ref={card1Ref}
            style={{ opacity: 0 }}
            className="glass-card p-8 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-php/5 via-transparent to-laravel/5 pointer-events-none" />
            <div className="relative flex items-start gap-5">
              <div className="w-14 h-14 rounded-xl bg-php/15 border border-php/25 flex items-center justify-center flex-shrink-0">
                <FaUniversity className="text-php" size={24} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <FaGraduationCap className="text-php" size={14} />
                      <span className="text-xs text-php font-semibold tracking-wide uppercase">
                        Bachelor&apos;s Degree
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white">Computer Science</h3>
                    <p className="text-slate-300 text-sm mt-0.5 font-semibold">October 6 University</p>
                  </div>

                  {/* GPA badge with counter animation */}
                  <div className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-laravel/15 border border-laravel/30">
                    <FaStar className="text-laravel" size={12} />
                    <span ref={gpaRef} className="text-laravel font-bold text-lg">0.0</span>
                    <span className="text-slate-300 text-sm">/ 4.0</span>
                  </div>
                </div>

                <div ref={tagsRef} className="flex flex-wrap gap-2 mt-4">
                  {subjects.map((s) => (
                    <span
                      key={s}
                      style={{ opacity: 0 }}
                      className="px-2.5 py-1 text-xs text-slate-300 bg-white/[0.05] border border-white/[0.10] rounded-md hover:border-laravel/40 hover:text-white transition-colors"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── DEPI certificate card ── */}
          <div
            ref={card2Ref}
            style={{ opacity: 0 }}
            className="glass-card p-6 mt-4 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-laravel/5 via-transparent to-transparent pointer-events-none" />
            <div className="relative flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-laravel/15 border border-laravel/25 flex items-center justify-center flex-shrink-0">
                <FaGraduationCap className="text-laravel" size={20} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-xs text-laravel font-semibold tracking-wide uppercase">
                    Professional Certification
                  </span>
                </div>
                <h3 className="text-base font-bold text-white">
                  Digital Egypt Pioneers Initiative (DEPI)
                </h3>
                <p className="text-slate-300 text-sm mt-0.5">
                  Full-Stack Web Development — React, Node.js, Express &amp; MongoDB
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
