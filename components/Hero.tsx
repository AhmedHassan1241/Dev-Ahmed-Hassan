"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroBg from "./HeroBg";
import {
  FaGithub,
  FaLinkedin,
  FaWhatsapp,
  FaArrowRight,
  FaDownload,
} from "react-icons/fa";
import { SiGmail } from "react-icons/si";

const ROLE = "Mid-Level PHP/Laravel Backend Developer";

const socials = [
  { href: "https://github.com/AhmedHassan1241",                      icon: FaGithub,   label: "GitHub"    },
  { href: "https://www.linkedin.com/in/ahmed-hassan-622364108/",     icon: FaLinkedin, label: "LinkedIn"  },
  { href: "tel:+201092609197",                                        icon: FaWhatsapp, label: "WhatsApp"  },
  { href: "mailto:ahmed.hassan.1241999@gmail.com",                   icon: SiGmail,    label: "Email"     },
];

export default function Hero() {
  const sectionRef  = useRef<HTMLElement>(null);
  const leftColRef  = useRef<HTMLDivElement>(null);
  const badgeRef    = useRef<HTMLDivElement>(null);
  const nameRef     = useRef<HTMLHeadingElement>(null);
  const roleRef     = useRef<HTMLDivElement>(null);
  const tagsRef     = useRef<HTMLDivElement>(null);
  const descRef     = useRef<HTMLParagraphElement>(null);
  const btnsRef     = useRef<HTMLDivElement>(null);
  const socialsRef  = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const floatRef    = useRef<HTMLDivElement>(null);
  const statsRef    = useRef<HTMLDivElement>(null);
  const ring1Ref    = useRef<HTMLDivElement>(null);
  const ring2Ref    = useRef<HTMLDivElement>(null);


  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // ── Badge drops in ──
      tl.fromTo(
        badgeRef.current,
        { y: -24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        0.1,
      );

      // ── Name: letter-by-letter reveal ──
      if (nameRef.current) {
        const raw = nameRef.current.textContent ?? "";
        nameRef.current.innerHTML = raw
          .split("")
          .map((ch) =>
            ch === " "
              ? '<span class="gs-l" style="display:inline-block">&nbsp;</span>'
              : `<span class="gs-l" style="display:inline-block;opacity:0;transform:translateY(64px)">${ch}</span>`,
          )
          .join("");
        gsap.set(nameRef.current, { opacity: 1 });
        tl.to(
          nameRef.current.querySelectorAll(".gs-l"),
          { y: 0, opacity: 1, stagger: 0.038, duration: 0.52, ease: "back.out(1.8)" },
          0.28,
        );
      }

      // ── Role slides in ──
      tl.fromTo(roleRef.current,  { x: -28, opacity: 0 }, { x: 0, opacity: 1, duration: 0.45 }, 0.82);

      // ── Tags pop in ──
      if (tagsRef.current) {
        tl.fromTo(
          [...tagsRef.current.children],
          { y: 22, opacity: 0, scale: 0.72 },
          { y: 0, opacity: 1, scale: 1, stagger: 0.09, duration: 0.4, ease: "back.out(1.6)" },
          0.96,
        );
      }

      // ── Description fades up ──
      tl.fromTo(descRef.current,  { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 1.12);

      // ── Buttons slide up ──
      if (btnsRef.current) {
        tl.fromTo(
          [...btnsRef.current.children],
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.13, duration: 0.42 },
          1.26,
        );
      }

      // ── Social icons spin in ──
      if (socialsRef.current) {
        tl.fromTo(
          [...socialsRef.current.children],
          { scale: 0, opacity: 0, rotate: -60 },
          { scale: 1, opacity: 1, rotate: 0, stagger: 0.07, duration: 0.42, ease: "back.out(2.2)" },
          1.44,
        );
      }

      // ── Right col enters from right ──
      tl.fromTo(
        parallaxRef.current,
        { x: 72, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, ease: "power4.out" },
        0.32,
      );

      // ── Stats stagger up ──
      if (statsRef.current) {
        tl.fromTo(
          [...statsRef.current.children],
          { y: 24, opacity: 0, scale: 0.82 },
          { y: 0, opacity: 1, scale: 1, stagger: 0.1, duration: 0.42, ease: "back.out(1.6)" },
          0.82,
        );
      }

      // ── Floating profile image ──
      gsap.to(floatRef.current, {
        y: -24,
        duration: 3.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 2.2,
      });

      // ── Rotating rings ──
      gsap.to(ring1Ref.current, { rotation: 360,  duration: 16, repeat: -1, ease: "none" });
      gsap.to(ring2Ref.current, { rotation: -360, duration: 26, repeat: -1, ease: "none" });

      // ── Scroll parallax ──
      gsap.to(parallaxRef.current, {
        y: -110,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      gsap.to(leftColRef.current, {
        y: -55,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen flex items-center pt-20 pb-16 w-full"
    >
      <HeroBg />

      <div className="section-container w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* ══ Left column ══ */}
          <div ref={leftColRef}>
            <div className="hero-text-panel">
              {/* Mobile photo */}
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

              {/* Available badge */}
              <div ref={badgeRef} style={{ opacity: 0 }} className="flex items-center gap-2 mb-5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
                </span>
                <span className="text-green-400 text-sm font-medium">
                  Available for opportunities
                </span>
              </div>

            {/* Name */}
            <h1
              ref={nameRef}
              style={{ opacity: 0 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight tracking-tight"
            >
              Ahmed Hassan
            </h1>

            {/* Typing role */}
            <div ref={roleRef} style={{ opacity: 0 }} className="flex flex-wrap items-center gap-3 mb-6 min-h-[2.5rem]">
              <span className="text-xl sm:text-2xl text-slate-200 font-semibold">
                {ROLE}
              </span>
            </div>

            {/* Tech tags */}
            <div ref={tagsRef} className="flex flex-wrap items-center gap-2 mb-6">
              {[
                { label: "PHP",     bg: "bg-[#777BB4]/15", tc: "text-[#a0a5d4]", bc: "border-[#777BB4]/30" },
                { label: "Laravel", bg: "bg-laravel/15",    tc: "text-laravel",   bc: "border-laravel/30"   },
                { label: "MySQL",   bg: "bg-sky-500/10",    tc: "text-sky-400",   bc: "border-sky-500/25"   },
              ].map(({ label, bg, tc, bc }) => (
                <span
                  key={label}
                  style={{ opacity: 0 }}
                  className={`px-3 py-1 ${bg} ${tc} text-sm font-bold rounded-full border ${bc} tracking-wide`}
                >
                  {label}
                </span>
              ))}
            </div>

            {/* Description */}
            <p
              ref={descRef}
              style={{ opacity: 0 }}
              className="text-slate-300 text-base leading-relaxed mb-8 max-w-md"
            >
              PHP/Laravel Backend Developer with 2 years of experience building
              scalable, production-ready systems. Specialized in RESTful API
              development, real-time features using Laravel Reverb, and multi-tenant
              SaaS architecture. Familiar with Clean Architecture and DDD concepts.
            </p>

            {/* Buttons */}
            <div ref={btnsRef} className="flex flex-wrap gap-3 mb-9">
              <a href="#projects" style={{ opacity: 0 }} className="btn-primary">
                View Projects <FaArrowRight size={13} />
              </a>
              <a
                href="https://drive.google.com/uc?export=download&id=1v4kN7kuaIHf8IKH2EmK8S1gaKHSdZB6X"
                rel="noopener noreferrer"
                style={{ opacity: 0 }}
                className="btn-ghost"
              >
                <FaDownload size={13} /> Download CV
              </a>
            </div>

            {/* Socials */}
            <div ref={socialsRef} className="flex items-center gap-3">
              {socials.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  style={{ opacity: 0 }}
                  className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-white glass-card hover:border-white/20 transition-all duration-300 hover:scale-110"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>
            {/* Stats mobile */}
            <div className="grid grid-cols-2 gap-3 mt-8 lg:hidden">
              {[
                { value: "2", label: "Years Exp.", color: "text-laravel"  },
                { value: "3", label: "Companies",  color: "text-sky-400"  },
              ].map(({ value, label, color }) => (
                <div key={label} className="glass-card p-3 text-center">
                  <div className={`text-xl font-extrabold ${color}`}>{value}</div>
                  <div className="text-slate-400 text-[11px] mt-0.5 leading-tight font-medium tracking-wide">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ══ Right column (desktop) ══ */}
          <div
            ref={parallaxRef}
            style={{ opacity: 0 }}
            className="hidden lg:flex flex-col items-center gap-6"
          >
            {/* Float wrapper */}
            <div ref={floatRef} className="relative">

              {/* Outer dashed ring (slow clockwise) */}
              <div
                ref={ring1Ref}
                className="absolute pointer-events-none"
                style={{
                  inset: "-20%",
                  borderRadius: "50%",
                  border: "1px dashed rgba(6,182,212,0.28)",
                }}
              />

              {/* Outer dotted ring (slow counter-clockwise) */}
              <div
                ref={ring2Ref}
                className="absolute pointer-events-none"
                style={{
                  inset: "-36%",
                  borderRadius: "50%",
                  border: "1px dotted rgba(139,92,246,0.22)",
                }}
              />

              {/* Profile image */}
              <div className="w-72 h-72 xl:w-80 xl:h-80 rounded-full overflow-hidden border-4 border-white/10 shadow-[0_0_60px_rgba(6,182,212,0.22),0_30px_60px_rgba(0,0,0,0.5)]">
                <Image
                  src="/profile-modified.png"
                  alt="Ahmed Hassan"
                  width={320}
                  height={320}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>

              {/* Inner static glow rings */}
              <div className="absolute inset-0 rounded-full border-2 border-laravel/30 scale-[1.08]" />
              <div className="absolute inset-0 rounded-full border   border-laravel/15 scale-[1.16]" />

              {/* Online dot */}
              <span className="absolute bottom-5 right-5 w-5 h-5 bg-green-400 rounded-full border-4 border-[#050d1a]" />
            </div>

            {/* Stats */}
            <div ref={statsRef} className="grid grid-cols-3 gap-3 w-full">
              {[
                { value: "2",   label: "Years Exp.", color: "text-laravel"  },
                { value: "3",   label: "Companies",  color: "text-sky-400"  },
                { value: "3.7", label: "GPA",        color: "text-php"      },
              ].map(({ value, label, color }) => (
                <div
                  key={label}
                  style={{ opacity: 0 }}
                  className="glass-card p-3 text-center hover:border-white/15 transition-all duration-300 cursor-default"
                >
                  <div className={`text-lg font-extrabold ${color}`}>{value}</div>
                  <div className="text-slate-400 text-[11px] mt-0.5 leading-tight">{label}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
