"use client";

import { motion } from "framer-motion";
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
      "Contributed backend features to an existing multitenant SaaS education platform following Clean Architecture.",
      "Collaborated with the team to ship features and fixes on a live product.",
    ],
    tags: ["PHP", "Laravel", "Clean Architecture", "SaaS", "Multi-tenant"],
    color: "#06B6D4",
  },
  {
    role: "PHP Developer",
    company: "Ibtikar Gate",
    location: "Remote",
    period: "11/2025 – 06/2026",
    type: "Part-time",
    current: true,
    highlights: [
      "Worked on optimizing Laravel APIs, fixing production issues, and adding real-time notification features.",
    ],
    tags: ["PHP", "Laravel", "RESTful APIs", "Real-time", "Reverb"],
    color: "#38bdf8",
  },
  {
    role: "PHP Developer",
    company: "Ibtikar Gate",
    location: "Remote",
    period: "08/2025 – 11/2025",
    type: "Full-time",
    current: false,
    highlights: [
      "Worked on optimizing Laravel APIs, fixing production issues, and adding real-time notification features.",
    ],
    tags: ["PHP", "Laravel", "RESTful APIs", "Real-time", "Reverb"],
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
      "Developed backend features with PHP/Laravel, designed RESTful APIs, and improved MySQL query performance.",
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
  return (
    <section id="experience" className="section-padding">
      <div className="section-container">
        <SectionHeading
          label="Work History"
          title="Experience"
          subtitle="From internship to building production systems at real companies."
        />

        <div className="relative max-w-3xl mx-auto">
          {/* Animated timeline line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            style={{ transformOrigin: "top" }}
            className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-laravel via-laravel/30 to-transparent"
          />

          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: "easeOut" }}
              className="relative pl-14 pb-5"
            >
              {/* Glowing dot */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 + 0.2, ease: "backOut" }}
                className="timeline-dot top-1.5"
                style={{
                  background: exp.color,
                  boxShadow: `0 0 0 4px ${exp.color}20, 0 0 14px ${exp.color}60`,
                }}
              />

              {/* Card */}
              <motion.div
                whileHover={{ y: -3, boxShadow: `0 8px 30px rgba(0,0,0,0.3), 0 0 20px ${exp.color}15` }}
                transition={{ duration: 0.25 }}
                className={`glass-card p-6 transition-all duration-300 ${
                  exp.current ? "border-white/[0.12]" : ""
                }`}
              >
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <FaBriefcase size={12} style={{ color: exp.color }} />
                      <span
                        className="text-xs font-bold tracking-widest uppercase"
                        style={{ color: exp.color }}
                      >
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
                    <p className="text-slate-400 text-sm font-medium mt-0.5">{exp.company}</p>
                  </div>
                  <div className="flex flex-col gap-1.5 items-end text-xs text-slate-500">
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
                <ul className="space-y-2 mb-5">
                  {exp.highlights.map((h, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-2.5 text-slate-400 text-sm leading-relaxed"
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-[7px]"
                        style={{ background: exp.color, opacity: 0.7 }}
                      />
                      {h}
                    </li>
                  ))}
                </ul>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-xs text-slate-400 bg-white/[0.04] border border-white/[0.07] rounded-md hover:border-white/15 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
