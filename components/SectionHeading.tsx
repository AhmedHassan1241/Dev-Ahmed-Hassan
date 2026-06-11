"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  label: string;
  title: string;
  subtitle?: string;
}

export default function SectionHeading({ label, title, subtitle }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, ease: "easeOut" }}
      className="mb-16 text-center"
    >
      <motion.span
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1, ease: "backOut" }}
        className="label-badge mb-5 inline-flex"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-laravel animate-pulse" />
        {label}
      </motion.span>

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
        className="text-4xl sm:text-5xl font-extrabold mb-4 gradient-text tracking-tight"
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-slate-400 text-base max-w-xl mx-auto leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}

      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
        className="flex items-center justify-center gap-3 mt-6 max-w-sm mx-auto"
      >
        <div className="flex-1 h-px rounded-full" style={{background:"linear-gradient(to right,transparent,#06B6D4)"}} />
        <div className="w-2.5 h-2.5 rounded-full animate-pulse flex-shrink-0" style={{background:"linear-gradient(135deg,#06B6D4,#8B5CF6)",boxShadow:"0 0 10px rgba(6,182,212,0.8),0 0 22px rgba(139,92,246,0.4)"}} />
        <div className="flex-1 h-px rounded-full" style={{background:"linear-gradient(to left,transparent,#8B5CF6)"}} />
      </motion.div>
    </motion.div>
  );
}
