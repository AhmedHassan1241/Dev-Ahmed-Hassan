
import Hero from "./components/2-hero-about/Hero";
import Header from "./components/1-header/Header";
import Experience from "./components/3-experience/Experience";
import Education from "./components/4-education/Education";
import Contact from "./components/7-contact/Contact";
import Footer from "./components/8-footer/Footer";
import { useEffect, useState } from "react";
import Main from "./components/6-main-project/Main";
import Skills from "./components/5-skills/Skills";

function App() {
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    });
  }, []);
  const [showScroll, setShowScroll] = useState(false);
  return (
    <div className="container">
      <Header />
      <Hero />
      <div className="divider" />
      <Experience/>
      <div className="divider" />
      <Education/>
      <div className="divider" />
      <Skills/>
      <div className="divider" />
      <Main />
      <div className="divider" />
      <Contact />
      <div className="divider" />
      <Footer />
        <button
        style={{opacity:showScroll?1:0, transition:"1s"}}
          className="scroll2Top icon-arrow_circle_up"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        />
    </div>
  );
}

export default App;
