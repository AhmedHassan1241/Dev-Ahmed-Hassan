import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import MouseGlow from "@/components/MouseGlow";

export default function Home() {
  return (
    <>
      <AnimatedBackground />
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
