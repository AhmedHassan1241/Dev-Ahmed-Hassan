"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { projects, categoryFilters } from "@/data/projects";
import SectionHeading from "./SectionHeading";

// Per-category accent
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

// ── Wide (bento featured) card ─────────────────────────────────────────────────
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
      className="lg:col-span-2"
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div
        ref={tiltRef}
        style={{ transition: "transform 0.18s ease-out, box-shadow 0.3s ease", willChange: "transform" }}
        className="glass-card overflow-hidden group relative h-full"
      >
        {/* top accent bar */}
        <div className="absolute top-0 inset-x-0 h-[2px] z-30 pointer-events-none"
          style={{ background: `linear-gradient(90deg, transparent, ${a.hex} 30%, ${a.hex} 70%, transparent)`,
                   boxShadow: `0 0 14px ${a.glow}`, opacity: 0.9 }} />

        {/* cursor glow */}
        <div ref={glowRef} className="absolute inset-0 rounded-xl pointer-events-none z-10"
          style={{ opacity: 0, transition: "opacity 0.3s" }} />

        <div className="flex flex-col md:flex-row h-full min-h-[280px]">
          {/* Image */}
          <div className="relative md:w-[48%] h-64 md:h-auto overflow-hidden bg-[#0a1628] shrink-0">
            <Image src={project.image} alt={project.title} fill
              className="object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#050d1a]/80 hidden md:block" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050d1a]/90 via-[#050d1a]/20 to-transparent md:hidden" />
          </div>

          {/* Content */}
          <div className="flex flex-col flex-1 p-6 lg:p-8 z-20 relative">
            <h3 className="text-2xl font-bold text-white mb-3 leading-tight">{project.title}</h3>
            <p className="text-slate-300 text-sm leading-relaxed flex-1 mb-5">{project.description}</p>

            {/* Tech tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.technologies.map((tech) => (
                <span key={tech}
                  className="px-3 py-1 text-xs font-semibold rounded-lg cursor-default transition-all duration-200"
                  style={{ color: a.hex, background: `${a.hex}15`, border: `1px solid ${a.hex}38` }}>
                  {tech}
                </span>
              ))}
            </div>

            {/* Links */}
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

// ── Regular card ────────────────────────────────────────────────────────────────
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
        {/* Accent bar */}
        <div className="absolute top-0 inset-x-0 h-[2px] z-30 pointer-events-none"
          style={{ background: `linear-gradient(90deg, transparent, ${a.hex} 30%, ${a.hex} 70%, transparent)`,
                   boxShadow: `0 0 10px ${a.glow}`, opacity: 0.65 }} />

        {/* Cursor glow */}
        <div ref={glowRef} className="absolute inset-0 rounded-xl pointer-events-none z-10"
          style={{ opacity: 0, transition: "opacity 0.3s" }} />

        {/* Image */}
        <div className="relative h-52 overflow-hidden bg-[#0a1628] shrink-0">
          <Image src={project.image} alt={project.title} fill
            className="object-cover group-hover:scale-[1.06] transition-transform duration-500 ease-out" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050d1a]/90 via-[#050d1a]/20 to-transparent" />
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1 relative z-20">
          <h3 className="text-[15px] font-bold text-white mb-2 leading-snug">{project.title}</h3>
          <p className="text-slate-300 text-sm leading-relaxed mb-4 flex-1">{project.description}</p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.technologies.map((tech) => (
              <span key={tech}
                className="px-2 py-0.5 text-[11px] font-medium rounded cursor-default transition-all duration-200"
                style={{ color: `${a.hex}cc`, background: `${a.hex}10`, border: `1px solid ${a.hex}28` }}>
                {tech}
              </span>
            ))}
          </div>

          {/* Links */}
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

  // Filter buttons + CTA animations (mount only)
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

  // Horizontal scroll — rebuilds whenever filter changes
  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const track = trackRef.current;
        const pin   = pinRef.current;
        if (!track || !pin) return;

        // Cards slide up on enter
        gsap.from(track.querySelectorAll(".h-card"), {
          y: 70, opacity: 0, scale: 0.9,
          stagger: 0.1, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: pin, start: "top 80%", toggleActions: "play none none none" },
        });

        // Pin section + scrub cards horizontally
        const getX = () => -(track.scrollWidth - pin.offsetWidth);
        const cta  = pin.querySelector<HTMLElement>(".projects-cta");

        if (cta) gsap.set(cta, { opacity: 0, y: 16 });

        gsap.to(track, {
          x: getX,
          ease: "none",
          scrollTrigger: {
            trigger: pin,
            pin: true,
            scrub: 1.4,
            start: "top 80px",
            end: () => `+=${Math.abs(getX())}`,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (!cta) return;
              if (self.progress >= 0.97) {
                gsap.to(cta, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out", overwrite: "auto" });
              } else {
                gsap.to(cta, { opacity: 0, y: 16, duration: 0.25, overwrite: "auto" });
              }
            },
          },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [activeFilter]);

  return (
    <section ref={sectionRef} id="projects" className="section-padding">
      {/* ── Heading + Filters (always inside container) ── */}
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

      {/* ── Desktop: Horizontal pin-scroll strip ── */}
      <div ref={pinRef} className="hidden lg:block">
        <div
          key={activeFilter}
          ref={trackRef}
          className="flex gap-5 items-stretch will-change-transform"
          style={{
            paddingLeft: "max(2rem, calc((100vw - 72rem) / 2 + 2rem))",
            paddingRight: "4rem",
            paddingTop: "2.5rem",
            paddingBottom: "2.5rem",
          }}
        >
          {filtered.map((project) =>
            project.id === wideId ? (
              <div key={project.id} className="h-card flex-none w-[620px] h-[460px]">
                <WideCard project={project} />
              </div>
            ) : (
              <div key={project.id} className="h-card flex-none w-[360px] h-[460px]">
                <RegularCard project={project} />
              </div>
            )
          )}
        </div>

        {/* CTA — appears when horizontal scroll completes */}
        <div className="projects-cta flex justify-center py-6" style={{ opacity: 0 }}>
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

      {/* ── GitHub CTA — mobile only (desktop CTA is inside the scroll track) ── */}
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
