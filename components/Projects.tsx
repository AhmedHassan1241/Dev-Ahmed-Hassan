"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { projects, categoryFilters } from "@/data/projects";
import SectionHeading from "./SectionHeading";

const ACCENTS: Record<string, { hex: string; glow: string }> = {
  php:        { hex: "#06B6D4", glow: "rgba(6,182,212,0.35)"   },
  react:      { hex: "#60A5FA", glow: "rgba(96,165,250,0.35)"  },
  nodejs:     { hex: "#34D399", glow: "rgba(52,211,153,0.35)"  },
  javascript: { hex: "#FBBF24", glow: "rgba(251,191,36,0.35)"  },
  backend:    { hex: "#A78BFA", glow: "rgba(167,139,250,0.35)" },
  fullstack:  { hex: "#06B6D4", glow: "rgba(6,182,212,0.35)"   },
};

function getAccent(categories: string[]) {
  for (const k of ["php", "react", "nodejs", "backend", "javascript", "fullstack"]) {
    if (categories.includes(k)) return ACCENTS[k];
  }
  return { hex: "#64748B", glow: "rgba(100,116,139,0.25)" };
}

// ── Desktop stacking card ──────────────────────────────────────────────────────
function StackCard({ project, index, total }: {
  project: (typeof projects)[0];
  index: number;
  total: number;
}) {
  const a = getAccent(project.categories);
  const tiltRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top)  / r.height;
    if (tiltRef.current)
      tiltRef.current.style.transform = `perspective(1800px) rotateX(${(y-0.5)*4}deg) rotateY(${(x-0.5)*-4}deg)`;
    if (glowRef.current) {
      glowRef.current.style.background = `radial-gradient(circle at ${x*100}% ${y*100}%, rgba(255,255,255,0.06) 0%, transparent 65%)`;
      glowRef.current.style.opacity = "1";
    }
  };

  const onLeave = () => {
    if (tiltRef.current) tiltRef.current.style.transform = "none";
    if (glowRef.current) glowRef.current.style.opacity = "0";
  };

  return (
    <div
      ref={tiltRef}
      className="h-full overflow-hidden relative flex"
      style={{
        background: "rgba(255,255,255,0.065)",
        backdropFilter: "blur(22px) saturate(160%)",
        WebkitBackdropFilter: "blur(22px) saturate(160%)",
        border: "1px solid rgba(255,255,255,0.14)",
        borderRadius: "16px",
        boxShadow: "0 12px 40px rgba(0,0,0,0.40), inset 0 1px 0 rgba(255,255,255,0.12)",
        transition: "transform 0.18s ease-out",
        willChange: "transform",
      }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {/* Accent top bar */}
      <div
        className="absolute top-0 inset-x-0 h-[2px] z-30 pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent, ${a.hex} 25%, ${a.hex} 75%, transparent)`,
          boxShadow: `0 0 16px ${a.glow}`,
        }}
      />

      {/* Cursor glow */}
      <div
        ref={glowRef}
        className="absolute inset-0 pointer-events-none z-10 rounded-2xl"
        style={{ opacity: 0, transition: "opacity 0.3s" }}
      />

      {/* Image — left 42% */}
      <div className="relative w-[42%] shrink-0 overflow-hidden bg-[#0a1628]">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#050d1a]/20 to-[#050d1a]/88" />

        {/* Big faded project number */}
        <div
          className="absolute bottom-4 left-4 leading-none select-none font-black"
          style={{ fontSize: "96px", color: "rgba(255,255,255,0.055)" }}
        >
          {String(index + 1).padStart(2, "0")}
        </div>
      </div>

      {/* Content — right */}
      <div className="flex flex-col flex-1 p-8 xl:p-10 z-20 relative justify-between overflow-hidden">
        {/* Header row */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <span
              className="text-[11px] font-bold tracking-[0.22em] uppercase"
              style={{ color: a.hex }}
            >
              {String(index + 1).padStart(2, "0")} &nbsp;/&nbsp; {String(total).padStart(2, "0")}
            </span>
            <div className="flex gap-2">
              {project.categories.slice(0, 2).map((c) => (
                <span
                  key={c}
                  className="text-[10px] px-2.5 py-0.5 rounded-full font-semibold"
                  style={{
                    color: a.hex,
                    background: `${a.hex}14`,
                    border: `1px solid ${a.hex}30`,
                  }}
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

          <h3 className="text-2xl xl:text-[1.7rem] font-bold text-white mb-3 leading-snug">
            {project.title}
          </h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Footer */}
        <div>
          {/* Tech tags */}
          <div className="flex flex-wrap gap-2 mb-5 mt-5">
            {project.technologies.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs font-semibold rounded-lg cursor-default"
                style={{
                  color: a.hex,
                  background: `${a.hex}15`,
                  border: `1px solid ${a.hex}38`,
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Links */}
          <div
            className="flex items-center gap-3 pt-4"
            style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
          >
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-300 transition-all duration-200"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.09)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.09)";
                  (e.currentTarget as HTMLElement).style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)";
                  (e.currentTarget as HTMLElement).style.color = "";
                }}
              >
                <FaGithub size={14} /> Code
              </a>
            )}
            {project.demoLink && (
              <a
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold text-white transition-all duration-200"
                style={{
                  background: `linear-gradient(135deg, ${a.hex}cc, ${a.hex}88)`,
                  border: `1px solid ${a.hex}55`,
                  boxShadow: `0 0 22px ${a.glow}`,
                }}
              >
                Live Demo <FaExternalLinkAlt size={10} />
              </a>
            )}
            {!project.githubLink && !project.demoLink && (
              <a href="#contact" className="text-sm font-medium" style={{ color: a.hex }}>
                Contact for Details
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Mobile: Wide (featured) card ───────────────────────────────────────────────
function WideCard({ project }: { project: (typeof projects)[0] }) {
  const tiltRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const a = getAccent(project.categories);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top)  / r.height;
    if (tiltRef.current)
      tiltRef.current.style.transform = `perspective(1400px) rotateX(${(y-0.5)*5}deg) rotateY(${(x-0.5)*-5}deg)`;
    if (glowRef.current) {
      glowRef.current.style.background = `radial-gradient(circle at ${x*100}% ${y*100}%, rgba(255,255,255,0.07) 0%, transparent 60%)`;
      glowRef.current.style.opacity = "1";
    }
  };

  const onEnter = () => {
    if (tiltRef.current)
      tiltRef.current.style.boxShadow = `0 20px 60px rgba(0,0,0,0.45), 0 0 40px ${a.glow}, inset 0 1px 0 rgba(255,255,255,0.18)`;
  };

  const onLeave = () => {
    if (tiltRef.current) { tiltRef.current.style.transform = "none"; tiltRef.current.style.boxShadow = ""; }
    if (glowRef.current)    glowRef.current.style.opacity = "0";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.94 }}
      animate={{ opacity: 1, y:  0, scale: 1    }}
      transition={{ duration: 0.42, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="md:col-span-2"
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div
        ref={tiltRef}
        style={{ transition: "transform 0.18s ease-out, box-shadow 0.3s ease", willChange: "transform" }}
        className="glass-card overflow-hidden group relative h-full"
      >
        <div className="absolute top-0 inset-x-0 h-[2px] z-30 pointer-events-none"
          style={{ background: `linear-gradient(90deg, transparent, ${a.hex} 30%, ${a.hex} 70%, transparent)`,
                   boxShadow: `0 0 14px ${a.glow}`, opacity: 0.9 }} />
        <div ref={glowRef} className="absolute inset-0 rounded-xl pointer-events-none z-10"
          style={{ opacity: 0, transition: "opacity 0.3s" }} />

        <div className="flex flex-col md:flex-row h-full min-h-[280px]">
          <div className="relative md:w-[48%] h-64 md:h-auto overflow-hidden bg-[#0a1628] shrink-0">
            <Image src={project.image} alt={project.title} fill
              className="object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#050d1a]/80 hidden md:block" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050d1a]/90 via-[#050d1a]/20 to-transparent md:hidden" />
          </div>
          <div className="flex flex-col flex-1 p-6 lg:p-8 z-20 relative">
            <h3 className="text-2xl font-bold text-white mb-3 leading-tight">{project.title}</h3>
            <p className="text-slate-300 text-sm leading-relaxed flex-1 mb-5">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.technologies.map((tech) => (
                <span key={tech}
                  className="px-3 py-1 text-xs font-semibold rounded-lg cursor-default transition-all duration-200"
                  style={{ color: a.hex, background: `${a.hex}15`, border: `1px solid ${a.hex}38` }}>
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-3 pt-4 border-t border-white/[0.07]">
              {project.githubLink && (
                <a href={project.githubLink} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-300 bg-white/[0.05] border border-white/[0.09] hover:bg-white/[0.09] hover:text-white hover:border-white/15 transition-all duration-200">
                  <FaGithub size={14} /> Code
                </a>
              )}
              {project.demoLink && (
                <a href={project.demoLink} target="_blank" rel="noopener noreferrer"
                  className="ml-auto flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold text-white transition-all duration-200"
                  style={{ background: `linear-gradient(135deg, ${a.hex}cc, ${a.hex}88)`,
                           border: `1px solid ${a.hex}55`, boxShadow: `0 0 22px ${a.glow}` }}>
                  Live Demo <FaExternalLinkAlt size={10} />
                </a>
              )}
              {!project.githubLink && !project.demoLink && (
                <a href="#contact" className="text-sm font-medium" style={{ color: a.hex }}>
                  Contact for Details
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Mobile: Regular card ───────────────────────────────────────────────────────
function RegularCard({ project }: { project: (typeof projects)[0] }) {
  const tiltRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const a = getAccent(project.categories);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top)  / r.height;
    if (tiltRef.current)
      tiltRef.current.style.transform = `perspective(1000px) rotateX(${(y-0.5)*10}deg) rotateY(${(x-0.5)*-10}deg)`;
    if (glowRef.current) {
      glowRef.current.style.background = `radial-gradient(circle at ${x*100}% ${y*100}%, rgba(255,255,255,0.055) 0%, transparent 60%)`;
      glowRef.current.style.opacity = "1";
    }
  };

  const onEnter = () => {
    if (tiltRef.current)
      tiltRef.current.style.boxShadow = `0 16px 48px rgba(0,0,0,0.40), 0 0 28px ${a.glow}, inset 0 1px 0 rgba(255,255,255,0.15)`;
  };

  const onLeave = () => {
    if (tiltRef.current) { tiltRef.current.style.transform = "none"; tiltRef.current.style.boxShadow = ""; }
    if (glowRef.current)    glowRef.current.style.opacity = "0";
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.93, y: 18 }}
      animate={{ opacity: 1, scale: 1,    y:  0 }}
      transition={{ duration: 0.38 }}
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div
        ref={tiltRef}
        style={{ transition: "transform 0.15s ease-out, box-shadow 0.3s ease", willChange: "transform" }}
        className="glass-card overflow-hidden flex flex-col group relative h-full"
      >
        <div className="absolute top-0 inset-x-0 h-[2px] z-30 pointer-events-none"
          style={{ background: `linear-gradient(90deg, transparent, ${a.hex} 30%, ${a.hex} 70%, transparent)`,
                   boxShadow: `0 0 10px ${a.glow}`, opacity: 0.65 }} />
        <div ref={glowRef} className="absolute inset-0 rounded-xl pointer-events-none z-10"
          style={{ opacity: 0, transition: "opacity 0.3s" }} />

        <div className="relative h-52 overflow-hidden bg-[#0a1628] shrink-0">
          <Image src={project.image} alt={project.title} fill
            className="object-cover group-hover:scale-[1.06] transition-transform duration-500 ease-out" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050d1a]/90 via-[#050d1a]/20 to-transparent" />
        </div>

        <div className="p-5 flex flex-col flex-1 relative z-20">
          <h3 className="text-[15px] font-bold text-white mb-2 leading-snug">{project.title}</h3>
          <p className="text-slate-300 text-sm leading-relaxed mb-4 flex-1">{project.description}</p>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.technologies.map((tech) => (
              <span key={tech}
                className="px-2 py-0.5 text-[11px] font-medium rounded cursor-default transition-all duration-200"
                style={{ color: `${a.hex}cc`, background: `${a.hex}10`, border: `1px solid ${a.hex}28` }}>
                {tech}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-3 pt-3 border-t border-white/[0.06]">
            {project.githubLink && (
              <a href={project.githubLink} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors">
                <FaGithub size={14} /> GitHub
              </a>
            )}
            {project.demoLink && (
              <a href={project.demoLink} target="_blank" rel="noopener noreferrer"
                className="ml-auto flex items-center gap-1.5 text-sm font-semibold transition-colors"
                style={{ color: a.hex }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = a.hex)}>
                Visit <FaExternalLinkAlt size={10} />
              </a>
            )}
            {!project.githubLink && !project.demoLink && (
              <a href="#contact" className="text-sm font-medium" style={{ color: a.hex }}>
                Contact for Details
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Section ────────────────────────────────────────────────────────────────────
export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");
  const sectionRef = useRef<HTMLElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const ctaRef     = useRef<HTMLDivElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);
  const pinRef     = useRef<HTMLDivElement>(null);

  const filtered = activeFilter === "all"
    ? projects
    : projects.filter((p) => p.categories.includes(activeFilter));

  const wideId = activeFilter === "all" ? filtered.find((p) => p.featured)?.id : undefined;

  // Filter buttons + mobile CTA animations (mount only)
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const st = { trigger: sectionRef.current, start: "top 78%", toggleActions: "play none none none" };

      gsap.fromTo(filtersRef.current, { y: -18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, ease: "power3.out", scrollTrigger: st });

      if (filtersRef.current) {
        gsap.fromTo([...filtersRef.current.children], { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, stagger: 0.07, duration: 0.38, ease: "back.out(1.7)", delay: 0.15, scrollTrigger: st });
      }

      gsap.fromTo(ctaRef.current, { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power3.out",
          scrollTrigger: { trigger: ctaRef.current, start: "top 92%", toggleActions: "play none none none" } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Stacking cards — rebuilds when filter changes
  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const pin   = pinRef.current;
        const track = trackRef.current;
        if (!pin || !track) return;

        const cards = gsap.utils.toArray<HTMLElement>(".s-card", track);
        const dots  = gsap.utils.toArray<HTMLElement>(".stack-dot", pin);
        const cta   = pin.querySelector<HTMLElement>(".projects-cta");
        const n = cards.length;
        if (n === 0) return;

        // Initial state
        gsap.set(cards.slice(1), { y: "100%" });
        if (cta) gsap.set(cta, { opacity: 0, y: 16 });

        // First dot active
        if (dots[0]) {
          gsap.set(dots[0], {
            height: "20px",
            backgroundColor: "#06B6D4",
            boxShadow: "0 0 8px rgba(6,182,212,0.7)",
          });
        }

        if (n === 1) {
          if (cta) gsap.set(cta, { opacity: 1, y: 0 });
          return;
        }

        const tl = gsap.timeline();

        cards.forEach((card, i) => {
          if (i === 0) return;
          const t = i - 1;

          // New card rises from below
          tl.to(card, { y: 0, ease: "none", duration: 1 }, t);

          // Previous cards scale back (depth cue, max 3 deep)
          for (let j = Math.max(0, i - 3); j < i; j++) {
            const depth = i - j;
            tl.to(cards[j], {
              scale: Math.max(0.88, 1 - depth * 0.04),
              ease: "none",
              duration: 1,
            }, t);
          }

          // Advance progress dots
          if (dots.length > 0) {
            tl.to(
              dots[i - 1],
              { height: "6px", backgroundColor: "rgba(255,255,255,0.22)", boxShadow: "none", ease: "none" },
              t,
            );
            if (dots[i]) {
              tl.to(
                dots[i],
                { height: "20px", backgroundColor: "#06B6D4", boxShadow: "0 0 8px rgba(6,182,212,0.7)", ease: "none" },
                t,
              );
            }
          }
        });

        ScrollTrigger.create({
          trigger: pin,
          pin: true,
          start: "top 80px",
          end: `+=${(n - 1) * 600}`,
          scrub: 1.5,
          animation: tl,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (!cta) return;
            if (self.progress >= 0.97) {
              gsap.to(cta, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out", overwrite: "auto" });
            } else {
              gsap.to(cta, { opacity: 0, y: 16, duration: 0.25, overwrite: "auto" });
            }
          },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [activeFilter]);

  return (
    <section ref={sectionRef} id="projects" className="section-padding">
      {/* Heading + Filters */}
      <div className="section-container">
        <SectionHeading
          label="What I've Built"
          title="Projects"
          subtitle="From REST APIs to full-stack apps — a look at my work."
        />

        <div ref={filtersRef} style={{ opacity: 0 }} className="flex flex-wrap justify-center gap-2 mb-10">
          {categoryFilters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 border ${
                activeFilter === f.id
                  ? "bg-laravel text-white border-laravel shadow-[0_0_18px_rgba(6,182,212,0.4)]"
                  : "text-slate-400 border-white/[0.07] bg-white/[0.03] hover:text-white hover:border-white/15 hover:bg-white/[0.06]"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Desktop: Stacking cards ── */}
      <div ref={pinRef} className="hidden lg:block relative">
        {/* Centered layout wrapper */}
        <div
          className="relative mx-auto"
          style={{ maxWidth: "min(900px, calc(100vw - 5rem))" }}
        >
          {/* Card stack (overflow:hidden clips cards rising from below) */}
          <div
            key={activeFilter}
            ref={trackRef}
            className="relative overflow-hidden"
            style={{ height: "480px", borderRadius: "18px" }}
          >
            {filtered.map((project, i) => (
              <div
                key={project.id}
                className="s-card absolute inset-0"
                style={{ zIndex: i + 1 }}
              >
                <StackCard project={project} index={i} total={filtered.length} />
              </div>
            ))}
          </div>

          {/* Progress dots — right of the card frame */}
          <div
            className="absolute top-1/2 -translate-y-1/2 flex flex-col gap-2 items-center"
            style={{ right: "-28px" }}
          >
            {filtered.map((_, i) => (
              <div
                key={i}
                className="stack-dot rounded-full"
                style={{
                  width: "5px",
                  height: "6px",
                  backgroundColor: "rgba(255,255,255,0.22)",
                  transformOrigin: "center center",
                  transition: "background-color 0.3s, height 0.3s, box-shadow 0.3s",
                }}
              />
            ))}
          </div>

          {/* Scroll hint arrows (bottom of frame) */}
          <div
            className="stack-scroll-hint absolute -bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 pointer-events-none"
            style={{ opacity: 1 }}
          >
            <span className="text-[10px] font-semibold tracking-[0.2em] text-slate-500 uppercase">
              scroll
            </span>
            <svg width="14" height="18" viewBox="0 0 14 18" fill="none" className="text-slate-600">
              <path d="M7 0v14M1 8l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* CTA — appears when all cards scrolled through */}
        <div className="projects-cta flex justify-center pt-16 pb-4" style={{ opacity: 0 }}>
          <a
            href="https://github.com/AhmedHassan1241"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={(e) => gsap.to(e.currentTarget, { y: -3, duration: 0.2 })}
            onMouseLeave={(e) => gsap.to(e.currentTarget, { y:  0, duration: 0.25 })}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 text-sm font-medium text-slate-300 border border-white/[0.08] rounded-xl bg-white/[0.03] hover:bg-white/[0.07] hover:text-white hover:border-white/15 transition-all duration-300"
          >
            <FaGithub size={17} />
            See more on GitHub
          </a>
        </div>
      </div>

      {/* ── Mobile: Bento grid ── */}
      <div className="section-container lg:hidden">
        <motion.div
          key={activeFilter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.22 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {filtered.map((project) =>
            project.id === wideId ? (
              <div key={project.id} className="md:col-span-2">
                <WideCard project={project} />
              </div>
            ) : (
              <RegularCard key={project.id} project={project} />
            )
          )}
        </motion.div>
      </div>

      {/* Mobile CTA */}
      <div className="section-container lg:hidden">
        <div ref={ctaRef} style={{ opacity: 0 }} className="text-center mt-14">
          <a
            href="https://github.com/AhmedHassan1241"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 text-sm font-medium text-slate-300 border border-white/[0.08] rounded-xl bg-white/[0.03] hover:bg-white/[0.07] hover:text-white hover:border-white/15 transition-all duration-300"
          >
            <FaGithub size={17} />
            See more on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
