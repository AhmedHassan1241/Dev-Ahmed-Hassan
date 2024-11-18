import Lottie from "lottie-react";
import devAnimation from "../../animation/developer.json";
import "./hero.css";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

const Hero = () => {
  return (
    <section className="hero flex" id={"hero"}>
      <div className="left-section">
        <div className="parent-avatar flex bo">
          <motion.img
            initial={{ transform: "scale(0)" }}
            animate={{ transform: "scale(1.1)" }}
            transition={{ damping: 6, type: "spring", stiffness: 100 }}
            src="dist/assets/profile-modified.png"
            className="avatar"
            alt=""
          />
          <div className="icon-verified"></div>
        </div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="title"
        >
          Front-End Developer
        </motion.h1>
        <p className="subtitle">
          Hi, I’m Ahmed Hassan , an aspiring React Front-End Developer actively
          participating in the Digital Egypt Pioneers Initiative (DEPI) . I am
          passionate about creating engaging and user-friendly web applications.
          Currently, I am building a foundation in React.js while also studying
          the basics of Node.js, Express , and MongoDB , which enables me to
          understand full-stack development
        </p>

        <div className="all-icons flex">
          <a href="https://github.com/AhmedHassan1241" target="_blank">
            <div className="icon icon-github"></div>
          </a>
          <a
            href="https://www.linkedin.com/in/ahmed-hassan-622364108/"
            target="_blank"
          >
            <div className="icon icon-linkedin-square"></div>
          </a>
          <a href="tel:+201092609197">
            <div className="icon flex">
              <FaWhatsapp />
            </div>
          </a>
          <a href="mailto:ahmed.hassan.1241999@gmail.com">
            <div className="icon ">
              <SiGmail />
            </div>
          </a>
          <a
            href="https://drive.google.com/file/d/1BId4quQKGRYGbv8BWDwWRVUAI_NBeI5k/view"
            target="_blank"
          >
            <div
              className="icon"
              style={{
                fontWeight: "800",
                padding: "2px",
                borderRadius: "5px",
                boxShadow: "1px 1px,-1px -1px",
              }}
            >
              CV
            </div>
          </a>
        </div>
      </div>
      <div className="right-section animation">
        <Lottie
          className="devAnimation"
          style={{ height: 350, width: 350 }}
          animationData={devAnimation}
        />
      </div>
    </section>
  );
};

export default Hero;
