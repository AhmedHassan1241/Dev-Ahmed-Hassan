"use client";

import { FaGithub, FaLinkedin, FaWhatsapp, FaHeart } from "react-icons/fa";
import { SiGmail, SiPhp, SiLaravel } from "react-icons/si";

const socials = [
  { href: "https://github.com/AhmedHassan1241", icon: FaGithub, label: "GitHub" },
  { href: "https://www.linkedin.com/in/ahmed-hassan-622364108/", icon: FaLinkedin, label: "LinkedIn" },
  { href: "tel:+201092609197", icon: FaWhatsapp, label: "WhatsApp" },
  { href: "mailto:ahmed.hassan.1241999@gmail.com", icon: SiGmail, label: "Email" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.06] py-10">
      <div className="section-container">
        <div className="flex flex-col items-center gap-6">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-laravel rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-[0_0_12px_rgba(6,182,212,0.35)]">
              AH
            </div>
            <span className="text-slate-300 font-semibold text-sm">Ahmed Hassan</span>
          </div>

          {/* Tech stack badges */}
          <div className="flex items-center gap-2">
            <SiPhp className="text-php" size={16} />
            <span className="text-slate-600 text-xs">|</span>
            <SiLaravel className="text-laravel" size={14} />
            <span className="text-slate-500 text-xs font-medium">Back-End Developer</span>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-3">
            {socials.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={label}
                className="w-9 h-9 flex items-center justify-center text-slate-500 hover:text-white glass-card hover:border-white/15 transition-all duration-300"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {["About", "Skills", "Experience", "Education", "Projects", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-slate-500 hover:text-slate-300 text-xs transition-colors"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-slate-600 text-xs text-center">
            © {year} Ahmed Hassan. Built with{" "}
            <span className="text-slate-500">Next.js</span> &amp;{" "}
            <span className="text-slate-500">Tailwind CSS</span>.
          </p>
        </div>
      </div>
    </footer>
  );
}
