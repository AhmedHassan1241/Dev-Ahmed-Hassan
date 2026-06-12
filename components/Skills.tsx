"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skillGroups } from "@/data/skills";
import SectionHeading from "./SectionHeading";

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll<HTMLElement>(".skill-card");

      cards?.forEach((card, i) => {
        const isPrimary = card.classList.contains("skill-primary");

        // Primary: curtain from bottom. Even: from left. Odd: from right.
        const fromClip = isPrimary
          ? "inset(100% 0% 0% 0%)"
          : i % 2 === 0
          ? "inset(0% 100% 0% 0%)"
          : "inset(0% 0% 0% 100%)";

        gsap.fromTo(
          card,
          { clipPath: fromClip, opacity: 0 },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            opacity: 1,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 86%",
              toggleActions: "play none none none",
            },
          },
        );

        // Badges stagger up inside each card
        gsap.fromTo(
          card.querySelectorAll<HTMLElement>(".skill-badge"),
          { y: 18, opacity: 0, scale: 0.78 },
          {
            y: 0, opacity: 1, scale: 1,
            stagger: 0.055, duration: 0.40, ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: card,
              start: "top 83%",
              toggleActions: "play none none none",
            },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="section-padding">
      <div className="section-container">
        <SectionHeading
          label="What I Work With"
          title="Technical Skills"
          subtitle="PHP & Laravel is my primary stack — here's the full picture."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {skillGroups.map((group) => (
            <div
              key={group.category}
              style={{ opacity: 0 }}
              className={`skill-card glass-card p-6 relative overflow-hidden laravel-glow-hover ${
                group.isPrimary
                  ? "skill-primary md:col-span-2 laravel-glow border-laravel/20"
                  : ""
              }`}
              onMouseEnter={(e) =>
                gsap.to(e.currentTarget, {
                  boxShadow: group.isPrimary
                    ? "0 12px 40px rgba(0,0,0,0.35), 0 0 28px rgba(6,182,212,0.14)"
                    : "0 8px 30px rgba(0,0,0,0.28), 0 0 20px rgba(139,92,246,0.10)",
                  duration: 0.25,
                })
              }
              onMouseLeave={(e) =>
                gsap.to(e.currentTarget, { boxShadow: "none", duration: 0.35 })
              }
            >
              {group.isPrimary && (
                <>
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-laravel/15 border border-laravel/30 animate-border-glow">
                    <span className="w-1.5 h-1.5 rounded-full bg-laravel animate-pulse" />
                    <span className="text-laravel text-xs font-semibold tracking-wide">
                      Primary Stack
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-laravel/5 via-transparent to-php/5 pointer-events-none" />
                </>
              )}

              <div className="relative">
                <h3
                  className={`text-lg font-bold mb-1 ${
                    group.isPrimary ? "gradient-text" : "text-slate-200"
                  }`}
                >
                  {group.category}
                </h3>
                <p className="text-slate-300 text-sm mb-6 opacity-80">
                  {group.description}
                </p>

                <div className="flex flex-wrap gap-3">
                  {group.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="skill-badge flex items-center gap-2.5 px-4 py-2.5 rounded-lg cursor-default"
                      style={{
                        opacity: 0,
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.07)",
                        transition:
                          "transform 0.15s ease, border-color 0.2s ease, box-shadow 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLDivElement;
                        el.style.transform = "translateY(-4px) scale(1.08)";
                        el.style.boxShadow = `0 0 18px ${skill.color}45, 0 0 34px ${skill.color}18`;
                        el.style.borderColor = `${skill.color}55`;
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLDivElement;
                        el.style.transform = "";
                        el.style.boxShadow = "";
                        el.style.borderColor = "rgba(255,255,255,0.07)";
                      }}
                    >
                      <skill.icon
                        size={group.isPrimary ? 22 : 18}
                        style={{ color: skill.color }}
                        className="flex-shrink-0"
                      />
                      <span className="text-slate-300 text-sm font-medium">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
