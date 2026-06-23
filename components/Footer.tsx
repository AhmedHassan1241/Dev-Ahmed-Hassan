"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { SiGmail, SiPhp, SiLaravel } from "react-icons/si";

const socials = [
  { href: "https://github.com/AhmedHassan1241",                  icon: FaGithub,   label: "GitHub"   },
  { href: "https://www.linkedin.com/in/ahmed-hassan-622364108/", icon: FaLinkedin, label: "LinkedIn" },
  { href: "tel:+201092609197",                                    icon: FaWhatsapp, label: "WhatsApp" },
  { href: "mailto:ahmed.hassan.1241999@gmail.com",               icon: SiGmail,    label: "Email"    },
];

const navItems = ["About", "Skills", "Experience", "Education", "Projects", "Contact"];
const vp = { once: true, margin: "-40px" };

export default function Footer() {
  const socialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socialsRef.current?.querySelectorAll<HTMLAnchorElement>("a").forEach((el) => {
      el.addEventListener("mouseenter", () => gsap.to(el, { y: -4, scale: 1.12, duration: 0.2, ease: "power2.out" }));
      el.addEventListener("mouseleave", () => gsap.to(el, { y:  0, scale: 1.00, duration: 0.28, ease: "power2.out" }));
    });
  }, []);

  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.06] py-10">
      <div className="section-container">
        <div className="flex flex-col items-center gap-6">

          {/* Brand */}
          <motion.div
            className="flex items-center gap-3"
            initial={{ y: 24, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={vp}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="relative w-9 h-9 flex-shrink-0">
              <div
                className="absolute inset-0 rounded-full"
                style={{ background: "linear-gradient(135deg,#06B6D4,#7C3AED)", padding: "1.5px" }}
              >
                <div className="w-full h-full rounded-full bg-[#030b18] flex items-center justify-center">
                  <span
                    className="text-[10px] font-extrabold tracking-widest"
                    style={{ background: "linear-gradient(135deg,#06B6D4,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                  >
                    AH
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-bold text-white tracking-wide">Ahmed Hassan</span>
              <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-laravel/80">Mid-Level PHP/Laravel Backend Developer</span>
            </div>
          </motion.div>

          {/* Tech stack */}
          <motion.div
            className="flex items-center gap-2"
            initial={{ y: 18, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={vp}
            transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
          >
            <SiPhp className="text-php" size={16} />
            <span className="text-slate-400 text-xs">|</span>
            <SiLaravel className="text-laravel" size={14} />
            <span className="text-slate-300 text-xs font-medium">Mid-Level PHP/Laravel Backend Developer</span>
          </motion.div>

          {/* Social icons */}
          <div ref={socialsRef} className="flex items-center gap-3">
            {socials.map(({ href, icon: Icon, label }, i) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={label}
                className="w-9 h-9 flex items-center justify-center text-slate-400 hover:text-white glass-card hover:border-white/15 transition-colors duration-300"
                initial={{ y: 20, opacity: 0, scale: 0.7 }}
                whileInView={{ y: 0, opacity: 1, scale: 1 }}
                viewport={vp}
                transition={{ duration: 0.4, delay: 0.18 + i * 0.07, ease: [0.34, 1.56, 0.64, 1] }}
              >
                <Icon size={15} />
              </motion.a>
            ))}
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {navItems.map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-slate-400 hover:text-white text-xs transition-colors duration-200"
                initial={{ y: 12, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={vp}
                transition={{ duration: 0.35, delay: 0.28 + i * 0.05, ease: "easeOut" }}
              >
                {item}
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <motion.p
            className="text-slate-400 text-xs text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={vp}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            © {year} Ahmed Hassan. Built with{" "}
            <span className="text-slate-300">Next.js</span> &amp;{" "}
            <span className="text-slate-300">Tailwind CSS</span>.
          </motion.p>

        </div>
      </div>
    </footer>
  );
}
