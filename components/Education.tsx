"use client";

import { motion } from "framer-motion";
import { FaUniversity, FaGraduationCap, FaStar } from "react-icons/fa";
import SectionHeading from "./SectionHeading";

export default function Education() {
  return (
    <section id="education" className="section-padding">
      <div className="section-container">
        <SectionHeading
          label="Academic Background"
          title="Education"
        />

        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55 }}
            className="glass-card p-8 relative overflow-hidden hover:border-white/15 transition-all duration-300"
          >
            {/* Background accent */}
            <div className="absolute inset-0 bg-gradient-to-br from-php/5 via-transparent to-laravel/5 pointer-events-none" />

            <div className="relative flex items-start gap-5">
              {/* Icon */}
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
                    <h3 className="text-xl font-bold text-white">
                      Computer Science
                    </h3>
                    <p className="text-slate-400 text-sm mt-0.5 font-medium">
                      October 6 University
                    </p>
                  </div>

                  {/* GPA badge */}
                  <div className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-laravel/15 border border-laravel/30">
                    <FaStar className="text-laravel" size={12} />
                    <span className="text-laravel font-bold text-lg">3.7</span>
                    <span className="text-slate-400 text-sm">/ 4.0</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {[
                    "Data Structures",
                    "Algorithms",
                    "Databases",
                    "Software Engineering",
                    "Computer Networks",
                    "OOP",
                  ].map((subject) => (
                    <span
                      key={subject}
                      className="px-2.5 py-1 text-xs text-slate-400 bg-white/[0.04] border border-white/[0.07] rounded-md"
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* DEPI Certificate */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="glass-card p-6 mt-4 relative overflow-hidden hover:border-white/15 transition-all duration-300"
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
                <p className="text-slate-400 text-sm mt-0.5">
                  Full-Stack Web Development — React, Node.js, Express & MongoDB
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
