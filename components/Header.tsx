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
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = navLinks.map((l) => l.href.slice(1));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY + 120 >= el.offsetTop) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#050d1a]/95 backdrop-blur-md border-b border-white/[0.06] shadow-xl shadow-black/30"
          : "bg-[#050d1a]/60 backdrop-blur-md border-b border-white/[0.04]"
      }`}
    >
      <div className="section-container">
        <nav className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#about" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-sm group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(6,182,212,0.5),0_0_40px_rgba(124,58,237,0.2)]" style={{background:"linear-gradient(135deg,#06B6D4,#7C3AED)"}}>
              AH
            </div>
            <span className="font-semibold text-slate-200 hidden sm:block text-sm tracking-wide">
              Ahmed Hassan
            </span>
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
              href="https://drive.google.com/file/d/1Iq6ZdKCPuZIKE9sSsDd0aEZFnOsIjkXj/view"
              target="_blank"
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
                href="https://drive.google.com/file/d/1Iq6ZdKCPuZIKE9sSsDd0aEZFnOsIjkXj/view?usp=sharing"
                target="_blank"
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
