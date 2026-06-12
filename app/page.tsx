"use client";

import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AnimatedBackground from "@/components/AnimatedBackground";

// Decoration — no SSR needed, loads after hydration
const FloatingTechIcons = dynamic(() => import("@/components/FloatingTechIcons"), { ssr: false });
const MouseGlow         = dynamic(() => import("@/components/MouseGlow"),         { ssr: false });

// Below-fold — SSR kept for SEO, JS split into separate chunks
const Skills     = dynamic(() => import("@/components/Skills"));
const Experience = dynamic(() => import("@/components/Experience"));
const Education  = dynamic(() => import("@/components/Education"));
const Projects   = dynamic(() => import("@/components/Projects"));
const Contact    = dynamic(() => import("@/components/Contact"));
const Footer     = dynamic(() => import("@/components/Footer"));

export default function Home() {
  return (
    <>
      <AnimatedBackground />
      <FloatingTechIcons />
      <MouseGlow />
      <main className="relative z-10">
        <Header />
        <Hero />
        <Skills />
        <Experience />
        <Education />
        <Projects />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
