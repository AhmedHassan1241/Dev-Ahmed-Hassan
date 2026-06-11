"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  FaGithub,
  FaLinkedin,
  FaWhatsapp,
  FaArrowRight,
  FaDownload,
} from "react-icons/fa";
import { SiGmail } from "react-icons/si";

const ROLES = ["Mid-Level Back-End Developer"];


function useTyping(words: string[], speed = 70, del = 45, pause = 2000) {
  const [text, setText] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = words[wordIdx];
    const id = setTimeout(() => {
      if (!deleting) {
        if (text.length < current.length) setText(current.slice(0, text.length + 1));
        else setTimeout(() => setDeleting(true), pause);
      } else {
        if (text.length > 0) setText(text.slice(0, -1));
        else { setDeleting(false); setWordIdx((i) => (i + 1) % words.length); }
      }
    }, deleting ? del : speed);
    return () => clearTimeout(id);
  }, [text, deleting, wordIdx, words, speed, del, pause]);
  return text;
}

const socials = [
  { href: "https://github.com/AhmedHassan1241", icon: FaGithub, label: "GitHub" },
  { href: "https://www.linkedin.com/in/ahmed-hassan-622364108/", icon: FaLinkedin, label: "LinkedIn" },
  { href: "tel:+201092609197", icon: FaWhatsapp, label: "WhatsApp" },
  { href: "mailto:ahmed.hassan.1241999@gmail.com", icon: SiGmail, label: "Email" },
];

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: "easeOut" },
});

export default function Hero() {
  const typedRole = useTyping(ROLES);
  return (
    <section id="about" className="min-h-screen flex items-center pt-20 pb-16">
      <div className="section-container w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* ── Left ── */}
          <div>
            {/* Profile Photo (mobile only) */}
            <div className="block lg:hidden mb-7 text-center">
              <div className="relative inline-block">
                <div className="w-36 h-36 rounded-full overflow-hidden border-2 border-laravel/60 shadow-[0_0_35px_rgba(6,182,212,0.25)]">
                  <Image
                    src="/profile-modified.png"
                    alt="Ahmed Hassan"
                    width={144}
                    height={144}
                    className="object-cover w-full h-full"
                    priority
                  />
                </div>
                <span className="absolute bottom-1.5 right-1.5 w-4 h-4 bg-green-400 rounded-full border-2 border-[#050d1a]" />
              </div>
            </div>

            <motion.div {...fadeUp(0.1)} className="flex items-center gap-2 mb-5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
              </span>
              <span className="text-green-400 text-sm font-medium">
                Available for opportunities
              </span>
            </motion.div>

            <motion.h1
              {...fadeUp(0.18)}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight tracking-tight"
            >
              Ahmed Hassan
            </motion.h1>

            <motion.div {...fadeUp(0.26)} className="flex flex-wrap items-center gap-3 mb-6 min-h-[2.5rem]">
              <span className="text-xl sm:text-2xl text-slate-300 font-semibold">
                {typedRole}<span className="animate-pulse text-laravel font-thin">|</span>
              </span>
            </motion.div>

            <motion.div {...fadeUp(0.30)} className="flex flex-wrap items-center gap-2 mb-6">
              {[
                { label: "PHP", bg: "bg-[#777BB4]/15", tc: "text-[#a0a5d4]", bc: "border-[#777BB4]/30" },
                { label: "Laravel", bg: "bg-laravel/15", tc: "text-laravel", bc: "border-laravel/30" },
                { label: "MySQL", bg: "bg-sky-500/10", tc: "text-sky-400", bc: "border-sky-500/25" },
              ].map(({ label, bg, tc, bc }) => (
                <span key={label} className={`px-3 py-1 ${bg} ${tc} text-sm font-bold rounded-full border ${bc} tracking-wide`}>
                  {label}
                </span>
              ))}
            </motion.div>

            <motion.p
              {...fadeUp(0.34)}
              className="text-slate-400 text-base leading-relaxed mb-8 max-w-md"
            >
              Back-End Developer specialized in{" "}
              <span className="text-slate-300 font-medium">
                PHP, Laravel, and MySQL
              </span>
              , with hands-on experience building scalable APIs and real-time
              applications. Completed the DEPI Program, gaining strong full-stack
              skills with React, Node.js, Express.js, and MongoDB. Proven ability
              to debug production issues, optimize queries, and deliver reliable
              solutions in both team and remote settings.
            </motion.p>

            <motion.div {...fadeUp(0.42)} className="flex flex-wrap gap-3 mb-9">
              <a href="#projects" className="btn-primary">
                View Projects <FaArrowRight size={13} />
              </a>
              <a
                href="https://drive.google.com/file/d/1Iq6ZdKCPuZIKE9sSsDd0aEZFnOsIjkXj/view"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                <FaDownload size={13} /> Download CV
              </a>
            </motion.div>

            <motion.div {...fadeUp(0.50)} className="flex items-center gap-3">
              {socials.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-white glass-card hover:border-white/20 transition-all duration-300 hover:scale-110"
                >
                  <Icon size={17} />
                </a>
              ))}
            </motion.div>

            {/* Stats (mobile only) */}
            <motion.div {...fadeUp(0.58)} className="grid grid-cols-2 gap-3 mt-8 lg:hidden">
              {[
                { value: "2", label: "Years Exp.", color: "text-laravel" },
                { value: "3", label: "Companies", color: "text-sky-400" },
              ].map(({ value, label, color }) => (
                <div key={label} className="glass-card p-3 text-center">
                  <div className={`text-lg font-extrabold ${color}`}>{value}</div>
                  <div className="text-slate-500 text-[11px] mt-0.5 leading-tight">{label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right: Profile Photo (desktop) ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
            className="hidden lg:flex flex-col items-center gap-6"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <div className="w-72 h-72 xl:w-80 xl:h-80 rounded-full overflow-hidden border-4 border-white/10 shadow-[0_0_60px_rgba(6,182,212,0.2),0_30px_60px_rgba(0,0,0,0.5)]">
                <Image
                  src="/profile-modified.png"
                  alt="Ahmed Hassan"
                  width={320}
                  height={320}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
              <div className="absolute inset-0 rounded-full border-2 border-laravel/30 scale-[1.08]" />
              <div className="absolute inset-0 rounded-full border border-laravel/15 scale-[1.16]" />
              <span className="absolute bottom-5 right-5 w-5 h-5 bg-green-400 rounded-full border-4 border-[#050d1a]" />
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 w-full">
              {[
                { value: "2", label: "Years Exp.", color: "text-laravel" },
                { value: "3", label: "Companies", color: "text-sky-400" },
                { value: "3.7", label: "GPA", color: "text-php" },
              ].map(({ value, label, color }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.8 + i * 0.09 }}
                  whileHover={{ y: -3, scale: 1.04 }}
                  className="glass-card p-3 text-center hover:border-white/15 transition-all duration-300 cursor-default"
                >
                  <div className={`text-lg font-extrabold ${color}`}>{value}</div>
                  <div className="text-slate-500 text-[11px] mt-0.5 leading-tight">{label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
