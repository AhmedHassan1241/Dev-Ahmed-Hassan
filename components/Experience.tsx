"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaBriefcase, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import SectionHeading from "./SectionHeading";

const experiences = [
  {
    role: "PHP Developer",
    company: "Hodaelnas",
    location: "Shebin El Kom, Al Minufiyah",
    period: "11/2025 – Present",
    type: "Full-time",
    current: true,
    highlights: [
      "Contributed backend features to a multi-tenant SaaS education platform serving nurseries and educational institutions with hundreds of concurrent users.",
      "Implemented real-time notifications via Laravel Reverb and WhatsApp Cloud API integration with queued webhooks.",
      "Built RESTful APIs consumed by Next.js and Flutter clients, using JWT authentication and Spatie Permissions.",
    ],
    tags: ["PHP", "Laravel", "Clean Architecture", "SaaS", "Multi-tenant", "Reverb", "WhatsApp API"],
    color: "#06B6D4",
  },
  {
    role: "PHP Developer",
    company: "Ibtikar Gate",
    location: "Remote",
    period: "08/2025 – Present",
    type: "Full-time",
    current: true,
    highlights: [
      "Optimized existing Laravel APIs, reducing production bottlenecks and improving overall stability.",
      "Resolved critical production issues and added real-time notification features to a live system.",
    ],
    tags: ["PHP", "Laravel", "RESTful APIs", "Performance", "Real-time", "Reverb"],
    color: "#38bdf8",
  },
  {
    role: "PHP Developer",
    company: "Dotbytes",
    location: "Hybrid",
    period: "07/2024 – 07/2025",
    type: "Full-time",
    current: false,
    highlights: [
      "Developed and maintained backend features using PHP/Laravel for a hybrid work environment.",
      "Designed and delivered multiple RESTful APIs with clean structure and input validation.",
      "Improved MySQL query performance by ~40–50%, significantly reducing API response times.",
    ],
    tags: ["PHP", "Laravel", "MySQL", "RESTful APIs"],
    color: "#a78bfa",
  },
  {
    role: "Front-End Developer",
    company: "DEPI — Digital Egypt Pioneers Initiative",
    location: "Shebin El-kom, Menoufia",
    period: "04/2024 – 10/2024",
    type: "Internship",
    current: false,
    highlights: [
      "Built applications using HTML, CSS, JavaScript, and React.js.",
      "Applied Git for version control and collaboration.",
      "Gained exposure to Node.js, Express.js, and MongoDB for backend development.",
      "Solved problems and practiced algorithms using JavaScript.",
    ],
    tags: ["React.js", "Node.js", "Express.js", "MongoDB", "HTML/CSS", "Git"],
    color: "#4ade80",
  },
];

export default function Experience() {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const lineRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // ── Timeline line grows with scroll (scrub) ──
      gsap.set(lineRef.current, { scaleY: 0, transformOrigin: "top center" });
      gsap.to(lineRef.current, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 55%",
          end:   "bottom 85%",
          scrub: 0.6,
        },
      });

      // ── Cards slide in from left (ScrollTrigger.batch) ──
      ScrollTrigger.batch(".exp-card", {
        onEnter: (els) =>
          gsap.fromTo(
            els,
            { x: -48, opacity: 0 },
            { x: 0, opacity: 1, stagger: 0.12, duration: 0.65, ease: "power3.out" },
          ),
        start: "top 88%",
        once:  true,
      });

      // ── Dots pop in ──
      ScrollTrigger.batch(".exp-dot", {
        onEnter: (els) =>
          gsap.fromTo(
            els,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, stagger: 0.12, duration: 0.45, ease: "back.out(2.5)" },
          ),
        start: "top 88%",
        once:  true,
      });

      // ── Highlights slide in from right ──
      document.querySelectorAll<HTMLElement>(".exp-highlights li").forEach((li) => {
        gsap.fromTo(
          li,
          { x: 30, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 0.48, ease: "power2.out",
            scrollTrigger: { trigger: li, start: "top 92%", toggleActions: "play none none none" },
          },
        );
      });

      // ── Tags stagger inside each visible card ──
      document.querySelectorAll<HTMLElement>(".exp-tags").forEach((tagGroup) => {
        gsap.fromTo(
          tagGroup.querySelectorAll("span"),
          { opacity: 0, y: 10, scale: 0.85 },
          {
            opacity: 1, y: 0, scale: 1,
            stagger: 0.06, duration: 0.35, ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: tagGroup,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          },
        );
      });

      // ── Date/location badges slide from right ──
      document.querySelectorAll<HTMLElement>(".exp-meta").forEach((el) => {
        gsap.fromTo(
          el,
          { x: 24, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 0.45, ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none" },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className="section-padding glass-section">
      <div className="section-container">
        <SectionHeading
          label="Work History"
          title="Experience"
          subtitle="From internship to building production systems at real companies."
        />

        <div ref={sectionRef} className="relative max-w-3xl mx-auto">
          {/* Scroll-scrubbed timeline line */}
          <div
            ref={lineRef}
            className="absolute left-5 top-0 bottom-0 w-px"
            style={{
              background: "linear-gradient(to bottom, #06B6D4, rgba(6,182,212,0.25), transparent)",
            }}
          />

          {experiences.map((exp, i) => (
            <div key={i} className="relative pl-14 pb-5">
              {/* Dot */}
              <div
                className="exp-dot timeline-dot top-1.5"
                style={{
                  background: exp.color,
                  boxShadow:  `0 0 0 4px ${exp.color}20, 0 0 14px ${exp.color}60`,
                  opacity: 0,
                }}
              />

              {/* Card */}
              <div
                className={`exp-card glass-card p-6 transition-all duration-300 hover:-translate-y-1 ${
                  exp.current ? "border-white/[0.12]" : ""
                }`}
                style={{
                  opacity: 0,
                  // hover glow handled via CSS — GSAP won't interfere here
                }}
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, {
                    boxShadow: `0 8px 30px rgba(0,0,0,0.3), 0 0 20px ${exp.color}18`,
                    duration: 0.25,
                  });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, {
                    boxShadow: "none",
                    duration: 0.35,
                  });
                }}
              >
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <FaBriefcase size={12} style={{ color: exp.color }} />
                      <span className="text-xs font-bold tracking-widest uppercase" style={{ color: exp.color }}>
                        {exp.type}
                      </span>
                      {exp.current && (
                        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-green-500/15 border border-green-500/30 text-green-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                          Active
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-white">{exp.role}</h3>
                    <p className="text-slate-300 text-sm font-semibold mt-0.5">{exp.company}</p>
                  </div>
                  <div className="exp-meta flex flex-col gap-1.5 items-end text-xs text-slate-400" style={{ opacity: 0 }}>
                    <div className="flex items-center gap-1.5">
                      <FaCalendarAlt size={10} />
                      <span>{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <FaMapMarkerAlt size={10} />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>

                {/* Highlights */}
                <ul className="exp-highlights space-y-2 mb-5">
                  {exp.highlights.map((h, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-slate-300 text-sm leading-relaxed">
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-[7px]"
                        style={{ background: exp.color, opacity: 0.7 }}
                      />
                      {h}
                    </li>
                  ))}
                </ul>

                {/* Tags */}
                <div className="exp-tags flex flex-wrap gap-2">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-xs text-slate-300 bg-white/[0.05] border border-white/[0.10] rounded-md hover:border-white/20 hover:text-white transition-colors"
                    >
                      {tag}
                    </span>
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
