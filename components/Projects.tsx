"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaGithub, FaExternalLinkAlt, FaArrowRight } from "react-icons/fa";
import { projects, categoryFilters } from "@/data/projects";
import SectionHeading from "./SectionHeading";

// Portfolio brand: cyan = primary (PHP/backend), purple = secondary (frontend/JS)
const CYAN   = { hex: "#22D3EE", glow: "rgba(34,211,238,0.45)"   };
const PURPLE = { hex: "#A78BFA", glow: "rgba(167,139,250,0.45)"  };

const ACCENTS: Record<string, { hex: string; glow: string }> = {
  php:        CYAN,
  backend:    CYAN,
  fullstack:  CYAN,
  react:      PURPLE,
  nodejs:     PURPLE,
  javascript: PURPLE,
};

function getAccent(categories: string[]) {
  for (const k of ["php", "backend", "fullstack", "react", "nodejs", "javascript"]) {
    if (categories.includes(k)) return ACCENTS[k];
  }
  return CYAN;
}

// ── Desktop: stacking showcase card ───────────────────────────────────────────
function StackCard({
  project,
  index,
  total,
}: {
  project: (typeof projects)[0];
  index: number;
  total: number;
}) {
  const a = getAccent(project.categories);

  return (
    <div
      className="h-full relative flex overflow-hidden"
      style={{
        background: "#0A1628",
        backdropFilter: "blur(24px) saturate(160%)",
        WebkitBackdropFilter: "blur(24px) saturate(160%)",
        border: "1px solid rgba(34,211,238,0.15)",
        borderRadius: "16px",
        boxShadow:
          "0 16px 48px rgba(0,0,0,0.50), 0 0 0 1px rgba(34,211,238,0.06) inset",
      }}
    >
      {/* Accent top bar */}
      <div
        className="absolute top-0 inset-x-0 h-[2px] z-30 pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent 5%, ${a.hex} 30%, ${a.hex} 70%, transparent 95%)`,
          boxShadow: `0 0 24px ${a.glow}`,
        }}
      />

      {/* ── Image panel (left 46%) ── */}
      <div className="relative w-[55%] shrink-0 overflow-hidden bg-[#070f1e]">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-[1.2s] ease-out scale-[1.02] group-hover:scale-[1.06]"
        />
        {/* Edge gradient → content area - reduced opacity */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0A1628]/70" />
        {/* Bottom gradient - reduced opacity */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

        {/* Category label — top left (darker for better contrast) */}
        <div
          className="absolute top-5 left-5 flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.18em] uppercase"
          style={{
            color: "#E6FBFF",
            background: "rgba(2,6,23,0.78)",
            border: "1px solid rgba(34,211,238,0.28)",
            backdropFilter: "blur(6px)",
          }}
        >
          <span
            className="w-1 h-1 rounded-full"
            style={{ background: "#22D3EE" }}
          />
          {project.categories[0]}
        </div>

        {/* Big index — bottom right of image */}
        <div
          className="absolute bottom-4 right-5 font-black leading-none select-none"
          style={{ fontSize: "4.5rem", color: "rgba(255,255,255,0.03)" }}
        >
          {String(index + 1).padStart(2, "0")}
        </div>
      </div>

      {/* ── Content panel (right) ── */}
      <div className="flex flex-col flex-1 px-6 py-6 xl:px-8 xl:py-8 relative z-20 justify-between min-w-0">
        {/* Header */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <span
              className="font-mono text-[11px] font-bold tracking-[0.24em]"
              style={{ color: "#22D3EE" }}
            >
              {String(index + 1).padStart(2, "0")}&nbsp;/&nbsp;
              {String(total).padStart(2, "0")}
            </span>

            {/* Secondary categories */}
            <div className="flex gap-1.5 flex-wrap justify-end">
              {project.categories.slice(1, 3).map((c) => (
                <span
                  key={c}
                  className="text-[10px] px-2 py-0.5 rounded font-semibold"
                  style={{
                    color: "#94A3B8",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* Title */}
          <h3
            className="font-bold text-white leading-[1.2] mb-4"
            style={{ fontSize: "clamp(1.35rem, 2vw, 1.75rem)" }}
          >
            {project.title}
          </h3>

          {/* Description */}
          <p
            className="text-[#94A3B8] leading-relaxed"
            style={{ fontSize: "13.5px" }}
          >
            {project.description}
          </p>
        </div>

        {/* Footer */}
        <div>
          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5 mb-5 mt-5">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-[3px] text-[11px] font-semibold rounded-md cursor-default"
                style={{
                  color: "#E6FBFF",
                  background: "linear-gradient(180deg, rgba(34,211,238,0.16), rgba(34,211,238,0.10))",
                  border: "1px solid rgba(34,211,238,0.30)",
                  boxShadow: "0 2px 10px rgba(34,211,238,0.08)",
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Divider */}
          <div className="h-px bg-[#1E293B] mb-4" />

          {/* Links */}
          <div className="flex items-center gap-3">
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-medium text-[#94A3B8] transition-all duration-200"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.14)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "rgba(255,255,255,0.09)";
                  el.style.color = "#fff";
                  el.style.borderColor = "rgba(255,255,255,0.16)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "rgba(255,255,255,0.04)";
                  el.style.color = "#94A3B8";
                  el.style.borderColor = "rgba(255,255,255,0.08)";
                }}
              >
                <FaGithub size={13} />
                Code
              </a>
            )}

            {project.demoLink && (
              <a
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2 rounded-lg text-[13px] font-semibold text-white transition-all duration-200 group/link"
                style={{
                  background: "#22D3EE",
                  border: "1px solid rgba(34,211,238,0.40)",
                  boxShadow: "0 0 20px rgba(34,211,238,0.30), 0 4px 12px rgba(0,0,0,0.3)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "#38E4FD";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 32px rgba(34,211,238,0.45)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "#22D3EE";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(34,211,238,0.30), 0 4px 12px rgba(0,0,0,0.3)";
                }}
              >
                Live Demo
                <FaExternalLinkAlt
                  size={9}
                  className="transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                />
              </a>
            )}

            {!project.githubLink && !project.demoLink && (
              <a
                href="#contact"
                className="text-sm font-medium flex items-center gap-1.5 group/c"
                style={{ color: "#22D3EE" }}
              >
                Contact for Details
                <FaArrowRight
                  size={11}
                  className="transition-transform duration-200 group-hover/c:translate-x-1"
                />
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
    const y = (e.clientY - r.top) / r.height;
    if (tiltRef.current)
      tiltRef.current.style.transform = `perspective(1400px) rotateX(${(y - 0.5) * 5}deg) rotateY(${(x - 0.5) * -5}deg)`;
    if (glowRef.current) {
      glowRef.current.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.07) 0%, transparent 60%)`;
      glowRef.current.style.opacity = "1";
    }
  };
  const onEnter = () => {
    if (tiltRef.current)
      tiltRef.current.style.boxShadow = `0 20px 60px rgba(0,0,0,0.45), 0 0 40px ${a.glow}, inset 0 1px 0 rgba(255,255,255,0.18)`;
  };
  const onLeave = () => {
    if (tiltRef.current) { tiltRef.current.style.transform = "none"; tiltRef.current.style.boxShadow = ""; }
    if (glowRef.current) glowRef.current.style.opacity = "0";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.42, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="md:col-span-2"
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div
        ref={tiltRef}
        className="overflow-hidden group relative h-full"
        style={{
          transition: "transform 0.18s ease-out, box-shadow 0.3s ease",
          willChange: "transform",
          background: "#0A1628",
          backdropFilter: "blur(20px) saturate(140%)",
          border: "1px solid rgba(34,211,238,0.15)",
          borderRadius: "16px",
          boxShadow: `0 12px 40px rgba(0,0,0,0.45), 0 0 0 1px ${a.hex}15`,
        }}
      >
        <div className="absolute top-0 inset-x-0 h-[2px] z-30 pointer-events-none"
          style={{ background: `linear-gradient(90deg, transparent, ${a.hex} 30%, ${a.hex} 70%, transparent)`, boxShadow: `0 0 14px ${a.glow}`, opacity: 0.9 }} />
        <div ref={glowRef} className="absolute inset-0 rounded-xl pointer-events-none z-10" style={{ opacity: 0, transition: "opacity 0.3s" }} />
        <div className="flex flex-col md:flex-row h-full min-h-[280px]">
          <div className="relative md:w-[48%] h-64 md:h-auto overflow-hidden bg-[#0a1628] shrink-0">
            <Image src={project.image} alt={project.title} fill className="object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0A1628]/60 hidden md:block" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/70 via-[#0A1628]/10 to-transparent md:hidden" />
          </div>
          <div className="flex flex-col flex-1 p-6 lg:p-8 z-20 relative">
            <h3 className="text-2xl font-bold text-white mb-3 leading-tight">{project.title}</h3>
            <p className="text-[#94A3B8] text-sm leading-relaxed flex-1 mb-5">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.technologies.map((tech) => (
                <span key={tech} className="px-3 py-1 text-xs font-semibold rounded-lg cursor-default"
                  style={{ color: "#E6FBFF", background: "linear-gradient(180deg, rgba(34,211,238,0.16), rgba(34,211,238,0.10))", border: "1px solid rgba(34,211,238,0.30)" }}>{tech}</span>
              ))}
            </div>
            <div className="flex items-center gap-3 pt-4 border-t border-[#1E293B]">
              {project.githubLink && (
                <a href={project.githubLink} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-[#94A3B8] bg-white/[0.05] border border-white/[0.09] hover:bg-white/[0.09] hover:text-white hover:border-white/15 transition-all duration-200">
                  <FaGithub size={14} /> Code
                </a>
              )}
              {project.demoLink && (
                <a href={project.demoLink} target="_blank" rel="noopener noreferrer"
                  className="ml-auto flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold text-white transition-all duration-200"
                  style={{ background: "#22D3EE", border: "1px solid rgba(34,211,238,0.35)", boxShadow: "0 0 20px rgba(34,211,238,0.30)" }}>
                  Live Demo <FaExternalLinkAlt size={10} />
                </a>
              )}
              {!project.githubLink && !project.demoLink && (
                <a href="#contact" className="text-sm font-medium" style={{ color: "#22D3EE" }}>Contact for Details</a>
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
    const y = (e.clientY - r.top) / r.height;
    if (tiltRef.current)
      tiltRef.current.style.transform = `perspective(1000px) rotateX(${(y - 0.5) * 10}deg) rotateY(${(x - 0.5) * -10}deg)`;
    if (glowRef.current) {
      glowRef.current.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.055) 0%, transparent 60%)`;
      glowRef.current.style.opacity = "1";
    }
  };
  const onEnter = () => {
    if (tiltRef.current)
      tiltRef.current.style.boxShadow = `0 16px 48px rgba(0,0,0,0.40), 0 0 28px ${a.glow}, inset 0 1px 0 rgba(255,255,255,0.15)`;
  };
  const onLeave = () => {
    if (tiltRef.current) { tiltRef.current.style.transform = "none"; tiltRef.current.style.boxShadow = ""; }
    if (glowRef.current) glowRef.current.style.opacity = "0";
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.93, y: 18 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.38 }}
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div ref={tiltRef}
        className="overflow-hidden flex flex-col group relative h-full"
        style={{
          transition: "transform 0.15s ease-out, box-shadow 0.3s ease",
          willChange: "transform",
          background: "#0A1628",
          backdropFilter: "blur(20px) saturate(140%)",
          border: "1px solid rgba(34,211,238,0.15)",
          borderRadius: "16px",
          boxShadow: `0 12px 40px rgba(0,0,0,0.45), 0 0 0 1px ${a.hex}15`,
        }}
      >
        <div className="absolute top-0 inset-x-0 h-[2px] z-30 pointer-events-none"
          style={{ background: `linear-gradient(90deg, transparent, ${a.hex} 30%, ${a.hex} 70%, transparent)`, boxShadow: `0 0 10px ${a.glow}`, opacity: 0.65 }} />
        <div ref={glowRef} className="absolute inset-0 rounded-xl pointer-events-none z-10" style={{ opacity: 0, transition: "opacity 0.3s" }} />
        <div className="relative h-52 overflow-hidden bg-[#0a1628] shrink-0">
          <Image src={project.image} alt={project.title} fill className="object-cover group-hover:scale-[1.06] transition-transform duration-500 ease-out" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/60 via-[#0A1628]/10 to-transparent" />
        </div>
        <div className="p-5 flex flex-col flex-1 relative z-20">
          <h3 className="text-[15px] font-bold text-white mb-2 leading-snug">{project.title}</h3>
          <p className="text-[#94A3B8] text-sm leading-relaxed mb-4 flex-1">{project.description}</p>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.technologies.map((tech) => (
              <span key={tech} className="px-2 py-0.5 text-[11px] font-medium rounded cursor-default"
                style={{ color: "#E6FBFF", background: "linear-gradient(180deg, rgba(34,211,238,0.14), rgba(34,211,238,0.08))", border: "1px solid rgba(34,211,238,0.25)" }}>{tech}</span>
            ))}
          </div>
          <div className="flex items-center gap-3 pt-3 border-t border-[#1E293B]">
            {project.githubLink && (
              <a href={project.githubLink} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-[#94A3B8] hover:text-white transition-colors">
                <FaGithub size={14} /> GitHub
              </a>
            )}
            {project.demoLink && (
              <a href={project.demoLink} target="_blank" rel="noopener noreferrer"
                className="ml-auto flex items-center gap-1.5 text-sm font-semibold transition-colors"
                style={{ color: "#22D3EE" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#22D3EE")}>
                Visit <FaExternalLinkAlt size={10} />
              </a>
            )}
            {!project.githubLink && !project.demoLink && (
              <a href="#contact" className="text-sm font-medium" style={{ color: "#22D3EE" }}>Contact for Details</a>
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
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  const filtered = activeFilter === "all"
    ? projects
    : projects.filter((p) => p.categories.includes(activeFilter));

  // activeAccent previously computed here but not used; keep logic available if needed in future
  const wideId = activeFilter === "all" ? filtered.find((p) => p.featured)?.id : undefined;

  // Filter buttons + mobile CTA (mount only)
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

  // Stacking animation — rebuilds on filter change
  useEffect(() => {
    // Kill previous ScrollTrigger
    if (scrollTriggerRef.current) {
      scrollTriggerRef.current.kill();
      scrollTriggerRef.current = null;
    }

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const pin   = pinRef.current;
        const track = trackRef.current;
        if (!pin || !track) return;

        const cards     = gsap.utils.toArray<HTMLElement>(".s-card", track);
        const navItems  = gsap.utils.toArray<HTMLElement>(".proj-nav-item", pin);
        const progressEl = pin.querySelector<HTMLElement>(".stack-progress-fill");
        const cta       = pin.querySelector<HTMLElement>(".projects-cta");
        const n = cards.length;
        if (n === 0) return;

        // Precompute accent colors per card
        const accents = filtered.map((p) => getAccent(p.categories));

        // ── Initial state ──
        gsap.set(cards.slice(1), { y: "100%" });
        if (cta) gsap.set(cta, { opacity: 0, y: 20 });
        if (progressEl) gsap.set(progressEl, { width: "0%" });

        // Activate first nav item
        const setNavActive = (idx: number) => {
          navItems.forEach((item, i) => {
            const numEl   = item.querySelector<HTMLElement>(".pni-num");
            const titleEl = item.querySelector<HTMLElement>(".pni-title");
            const dotEl   = item.querySelector<HTMLElement>(".pni-dot");
            const isActive = i === idx;
            if (numEl)   gsap.set(numEl,   { color: isActive ? accents[i]?.hex ?? "#22D3EE" : "rgba(148,163,184,0.75)" });
            if (titleEl) gsap.set(titleEl, { color: isActive ? "rgba(255,255,255,0.92)" : "rgba(148,163,184,0.78)", fontWeight: isActive ? "600" : "400" });
            if (dotEl)   gsap.set(dotEl,   { opacity: isActive ? 1 : 0, background: accents[i]?.hex ?? "#22D3EE" });
          });
        };
        setNavActive(0);

        if (n === 1) {
          if (cta) gsap.set(cta, { opacity: 1, y: 0 });
          if (progressEl) gsap.set(progressEl, { width: "100%" });
          return;
        }

        // ── GSAP timeline: cards rise one by one ──
        const tl = gsap.timeline();

        cards.forEach((card, i) => {
          if (i === 0) return;
          const t = i - 1;

          // New card rises from below
          tl.to(card, { y: 0, ease: "none", duration: 1 }, t);

          // Previous cards scale back subtly
          for (let j = Math.max(0, i - 3); j < i; j++) {
            const depth = i - j;
            tl.to(cards[j], { scale: Math.max(0.88, 1 - depth * 0.04), ease: "none", duration: 1 }, t);
          }
        });

        // Add extra pause at the end for last card
        tl.to({}, { duration: 0.5 }, n - 1);

        scrollTriggerRef.current = ScrollTrigger.create({
          trigger: pin,
          pin: true,
          start: "top 20%",
          end: `+=${n * 620}`,
          scrub: 1.2,
          animation: tl,
          invalidateOnRefresh: false,
          fastScrollEnd: true,
          preventOverlaps: true,
          onUpdate: (self) => {
            // Progress bar
            if (progressEl) gsap.set(progressEl, { width: `${self.progress * 100}%` });

            // Nav active state — normalize progress to exclude end padding
            const normalizedProgress = Math.min(1, self.progress / 0.95);
            const currentIdx = Math.min(n - 1, Math.floor(normalizedProgress * n));
            setNavActive(currentIdx);

            // CTA
            if (!cta) return;
            if (self.progress >= 0.97) {
              gsap.to(cta, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out", overwrite: "auto" });
            } else {
              gsap.to(cta, { opacity: 0, y: 20, duration: 0.25, overwrite: "auto" });
            }
          },
        });
      });
    }, sectionRef);

    return () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }
      ctx.revert();
    };
  }, [filtered.length]);  // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section ref={sectionRef} id="projects" className="section-padding">
      {/* ── Heading + Filters ── */}
      <div className="section-container">
        <SectionHeading
          label="What I've Built"
          title="Projects"
          subtitle="From REST APIs to full-stack apps — a look at my work."
        />
        <div
          ref={filtersRef}
          style={{ opacity: 0 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {categoryFilters.map((f) => {
            const isActive = activeFilter === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 border ${
                  isActive
                    ? "text-white"
                    : "text-[#94A3B8] border-white/[0.07] bg-white/[0.03] hover:text-white hover:border-white/15 hover:bg-white/[0.06]"
                }`}
                style={
                  isActive
                    ? {
                        backgroundColor: "#22D3EE",
                        borderColor: "#22D3EE",
                        boxShadow: "0 0 18px rgba(34,211,238,0.45)",
                      }
                    : undefined
                }
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          Desktop: stacking showcase with side navigator
          ───────────────────────────────────────────────────────────── */}
      <div ref={pinRef} className="hidden lg:block">
        <div className="section-container">
          <div className="flex gap-8 xl:gap-10 items-start">

            {/* ── Left: project navigator ── */}
            <div className="w-[152px] xl:w-[168px] shrink-0 select-none">
              <p className="text-[9px] font-bold tracking-[0.28em] uppercase text-[#475569] mb-4 pl-1">
                All Projects
              </p>

              <div className="space-y-px">
                {filtered.map((project, i) => (
                  <div
                    key={project.id}
                    className="proj-nav-item flex items-start gap-2.5 py-2.5 px-1 rounded-lg"
                  >
                    {/* Active indicator dot */}
                    <div
                      className="pni-dot mt-[5px] w-[5px] h-[5px] rounded-full shrink-0 transition-opacity duration-300"
                      style={{
                        opacity: 0,
                        background: getAccent(project.categories).hex,
                        boxShadow: `0 0 6px ${getAccent(project.categories).glow}`,
                        flexShrink: 0,
                      }}
                    />

                    {/* Number */}
                    <span
                      className="pni-num font-mono text-[10.5px] font-bold mt-[1px] shrink-0 transition-colors duration-300"
                      style={{ color: "rgba(148,163,184,0.65)" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    {/* Title */}
                    <span
                      className="pni-title text-[12px] leading-[1.35] transition-all duration-300 line-clamp-2"
                      style={{
                        color: "rgba(148,163,184,0.72)",
                        fontWeight: "400",
                      }}
                    >
                      {project.title}
                    </span>
                  </div>
                ))}
              </div>

              {/* Thin divider */}
              <div className="h-px bg-[#1E293B] my-4 mx-1" />

              {/* Progress fraction */}
              <p className="stack-progress-label text-[10px] font-mono text-[#475569] pl-1">
                01 / {String(filtered.length).padStart(2, "0")}
              </p>
            </div>

            {/* ── Right: card + progress bar ── */}
            <div className="flex-1 min-w-0">
              {/* Card stack */}
              <div
                ref={trackRef}
                className="relative overflow-hidden group"
                style={{ height: "500px", borderRadius: "18px" }}
              >
                {filtered.map((project, i) => (
                  <div
                    key={project.id}
                    className="s-card absolute inset-0"
                    style={{ zIndex: i + 1 }}
                  >
                    <StackCard
                      project={project}
                      index={i}
                      total={filtered.length}
                    />
                  </div>
                ))}
              </div>

              {/* Progress bar */}
              <div
                className="mt-4 rounded-full overflow-hidden"
                style={{ height: "2px", background: "#1E293B" }}
              >
                <div
                  className="stack-progress-fill h-full rounded-full"
                  style={{
                    width: "0%",
                    background:
                      "linear-gradient(to right, #22D3EE, #A78BFA)",
                    boxShadow: "0 0 8px rgba(34,211,238,0.5)",
                    transition: "width 0.05s linear",
                  }}
                />
              </div>

              {/* Scroll hint */}
              <p className="mt-2.5 text-[10px] font-medium tracking-[0.18em] uppercase text-[#475569] text-right">
                Scroll to explore
              </p>
            </div>
          </div>
        </div>

        {/* CTA — revealed at scroll end */}
        <div
          className="projects-cta flex justify-center pt-14 pb-2"
          style={{ opacity: 0 }}
        >
          <a
            href="https://github.com/AhmedHassan1241"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={(e) =>
              gsap.to(e.currentTarget, { y: -3, duration: 0.2 })
            }
            onMouseLeave={(e) =>
              gsap.to(e.currentTarget, { y: 0, duration: 0.25 })
            }
            className="inline-flex items-center gap-2.5 px-7 py-3.5 text-sm font-medium text-[#94A3B8] border border-white/[0.08] rounded-xl bg-white/[0.03] hover:bg-white/[0.07] hover:text-white hover:border-white/15 transition-all duration-300"
          >
            <FaGithub size={17} />
            See more on GitHub
          </a>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          Mobile: bento grid (unchanged)
          ───────────────────────────────────────────────────────────── */}
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
            className="inline-flex items-center gap-2.5 px-7 py-3.5 text-sm font-medium text-[#94A3B8] border border-white/[0.08] rounded-xl bg-white/[0.03] hover:bg-white/[0.07] hover:text-white hover:border-white/15 transition-all duration-300"
          >
            <FaGithub size={17} />
            See more on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}