"use client";

import { motion } from "framer-motion";
import { skillGroups } from "@/data/skills";
import SectionHeading from "./SectionHeading";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35, delay: i * 0.055, ease: "backOut" },
  }),
};

export default function Skills() {
  return (
    <section id="skills" className="section-padding">
      <div className="section-container">
        <SectionHeading
          label="What I Work With"
          title="Technical Skills"
          subtitle="PHP & Laravel is my primary stack — here's the full picture."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {skillGroups.map((group) => (
            <motion.div
              key={group.category}
              variants={cardVariants}
              className={`glass-card p-6 relative overflow-hidden laravel-glow-hover ${
                group.isPrimary ? "md:col-span-2 laravel-glow border-laravel/20" : ""
              }`}
            >
              {/* Primary badge */}
              {group.isPrimary && (
                <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-laravel/15 border border-laravel/30 animate-border-glow">
                  <span className="w-1.5 h-1.5 rounded-full bg-laravel animate-pulse" />
                  <span className="text-laravel text-xs font-semibold tracking-wide">
                    Primary Stack
                  </span>
                </div>
              )}

              {/* Gradient overlay for primary */}
              {group.isPrimary && (
                <div className="absolute inset-0 bg-gradient-to-br from-laravel/5 via-transparent to-php/5 pointer-events-none" />
              )}

              <div className="relative">
                <h3 className={`text-lg font-bold mb-1 ${group.isPrimary ? "gradient-text" : "text-slate-200"}`}>
                  {group.category}
                </h3>
                <p className="text-slate-500 text-sm mb-6">{group.description}</p>

                <div className="flex flex-wrap gap-3">
                  {group.skills.map((skill, si) => (
                    <motion.div
                      key={skill.name}
                      custom={si}
                      variants={badgeVariants}
                      whileHover={{
                        scale: 1.1,
                        y: -4,
                        boxShadow: `0 0 18px ${skill.color}50, 0 0 35px ${skill.color}20`,
                        borderColor: `${skill.color}60`,
                        transition: { duration: 0.2 },
                      }}
                      className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg cursor-default group"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.07)",
                        transition: "background 0.2s ease",
                      }}
                    >
                      <skill.icon
                        size={group.isPrimary ? 22 : 18}
                        style={{ color: skill.color }}
                        className="flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
                      />
                      <span className="text-slate-300 text-sm font-medium">
                        {skill.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
