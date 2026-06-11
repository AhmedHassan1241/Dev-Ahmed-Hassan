"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { projects, categoryFilters } from "@/data/projects";
import SectionHeading from "./SectionHeading";

function ProjectCard({ project, i }: { project: (typeof projects)[0]; i: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({ x: (y - 0.5) * 10, y: (x - 0.5) * -10 });
    setGlowPos({ x: x * 100, y: y * 100 });
  };

  const onMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setGlowPos({ x: 50, y: 50 });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.92, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: 20 }}
      transition={{ duration: 0.4, delay: i * 0.06 }}
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "transform 0.15s ease-out",
      }}
      className={`glass-card overflow-hidden flex flex-col group relative ${
        project.featured ? "ring-1 ring-laravel/25" : ""
      }`}
    >
      {/* Mouse glow inside card */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"
        style={{
          background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(255,255,255,0.055) 0%, transparent 60%)`,
        }}
      />

      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-[#0a1628]">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-[1.06] transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050d1a]/90 via-[#050d1a]/20 to-transparent" />

      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 relative z-20">
        <h3 className="text-base font-bold text-white mb-2 leading-snug">
          {project.title}
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-1">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-[11px] font-medium text-slate-400 bg-white/[0.04] border border-white/[0.07] rounded hover:border-laravel/30 hover:text-slate-300 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-3 pt-3 border-t border-white/[0.06]">
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
            >
              <FaGithub size={14} /> GitHub
            </a>
          )}
          {project.demoLink && (
            <a
              href={project.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-laravel hover:text-white transition-colors ml-auto font-semibold"
            >
              Visit Project <FaExternalLinkAlt size={10} />
            </a>
          )}
          {!project.githubLink && !project.demoLink && (
            <a
              href="#contact"
              className="flex items-center gap-1.5 text-sm text-laravel hover:text-white transition-colors font-medium"
            >
              Contact for Details
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.categories.includes(activeFilter));

  return (
    <section id="projects" className="section-padding">
      <div className="section-container">
        <SectionHeading
          label="What I've Built"
          title="Projects"
          subtitle="From REST APIs to full-stack apps — a look at my work."
        />

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
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
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} i={i} />
            ))}
          </AnimatePresence>
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/AhmedHassan1241"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-slate-300
                       border border-white/[0.08] rounded-lg bg-white/[0.03]
                       hover:bg-white/[0.07] hover:text-white hover:border-white/15
                       transition-all duration-300 hover:-translate-y-0.5"
          >
            <FaGithub size={16} />
            See more on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}
