"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes, FaDownload } from "react-icons/fa";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    let rafPending = false;
    const onScroll = () => {
      if (rafPending) return;
      rafPending = true;
      requestAnimationFrame(() => {
        rafPending = false;
        const y = window.scrollY;
        setScrolled(y > 50);
        const sections = navLinks.map((l) => l.href.slice(1));
        for (const id of [...sections].reverse()) {
          const el = document.getElementById(id);
          if (el && y + 120 >= el.offsetTop) {
            setActiveSection(id);
            break;
          }
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-white/[0.12] shadow-[0_8px_32px_rgba(0,0,0,0.40),inset_0_-1px_0_rgba(255,255,255,0.06)]"
          : "border-b border-white/[0.06]"
      }`}
      style={{
        background: scrolled
          ? "rgba(3,11,24,0.55)"
          : "rgba(3,11,24,0.25)",
        backdropFilter:         "blur(28px) saturate(180%)",
        WebkitBackdropFilter:   "blur(28px) saturate(180%)",
      }}
    >
      <div className="section-container">
        <nav className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#about" className="flex items-center gap-3 group">
            {/* Circular monogram with gradient ring */}
            <div className="relative w-10 h-10 flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
              <div
                className="absolute inset-0 rounded-full"
                style={{ background: "linear-gradient(135deg,#06B6D4,#7C3AED)", padding: "1.5px" }}
              >
                <div className="w-full h-full rounded-full bg-[#030b18] flex items-center justify-center">
                  <span
                    className="text-xs font-extrabold tracking-widest"
                    style={{
                      background: "linear-gradient(135deg,#06B6D4,#a78bfa)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    AH
                  </span>
                </div>
              </div>
              {/* Outer glow ring */}
              <div className="absolute inset-[-3px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "linear-gradient(135deg,rgba(6,182,212,0.25),rgba(124,58,237,0.25))", filter: "blur(6px)" }}
              />
            </div>
            {/* Name + title */}
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="text-sm font-bold text-white tracking-wide">Ahmed Hassan</span>
              <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-laravel/80">Back-End Dev</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`text-sm font-medium transition-colors relative group ${
                    activeSection === link.href.slice(1)
                      ? "text-white"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {link.label}
                  <span className={`absolute -bottom-1 left-0 h-px bg-laravel transition-all duration-300 ${
                    activeSection === link.href.slice(1) ? "w-full" : "w-0 group-hover:w-full"
                  }`} />
                </a>
              </li>
            ))}
          </ul>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <a
              href="https://drive.google.com/uc?export=download&id=1v4kN7kuaIHf8IKH2EmK8S1gaKHSdZB6X"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium text-white border border-[#06B6D4]/50 rounded-lg hover:border-[#06B6D4] hover:shadow-[0_0_16px_rgba(6,182,212,0.3)] transition-all duration-300" style={{background:"rgba(6,182,212,0.06)"}}
            >
              <FaDownload size={12} />
              Resume
            </a>
            <button
              className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <FaTimes size={19} /> : <FaBars size={19} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-[#050d1a] border-b border-white/[0.06] overflow-hidden"
          >
            <div className="section-container py-5 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-slate-300 hover:text-white py-3 px-3 text-sm font-medium transition-colors rounded-lg hover:bg-white/5"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="https://drive.google.com/uc?export=download&id=1v4kN7kuaIHf8IKH2EmK8S1gaKHSdZB6X"
                rel="noopener noreferrer"
                className="mt-2 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-white border border-laravel/50 rounded-lg hover:bg-laravel/10 transition-all duration-300"
              >
                <FaDownload size={12} /> Download Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
