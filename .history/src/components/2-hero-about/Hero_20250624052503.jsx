import Lottie from "lottie-react";
import devAnimation from "../../animation/developer.json";
import "./hero.css";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
// @ts-ignore
import profile from "/public/profile-modified.png";
const Hero = () => {
  return (
    <section className="hero flex" id={"hero"}>
      <div className="left-section">
        <div className="parent-avatar flex bo">
          <motion.img
            initial={{ transform: "scale(0)" }}
            animate={{ transform: "scale(1.1)" }}
            transition={{ damping: 6, type: "spring", stiffness: 100 }}
            src={profile}
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
          Full-Stack Developer
        </motion.h1>
        <p className="subtitle">
          👋 Hi, I’m Ahmed Hassan — Full-Stack Web Developer (Laravel + React)<br/>
I’ve successfully completed the Digital Egypt Pioneers Initiative (DEPI) 🌟 — a national program focused on empowering youth in software development.<br/>

I began my journey with React.js for front-end development, gaining hands-on experience building dynamic UIs and working on real-world projects.<br/>

Later, I developed basic experience with Node.js and Express, which gave me valuable insight into backend APIs and full-stack development.<br/>

🎯 Currently Focused On:<br/>
Specializing in Laravel (Back-End) — building scalable RESTful APIs, applying clean architecture principles, and managing relational databases like MySQL.
{
/* 
✨ I’m passionate about:
Writing clean, maintainable code
Solving real-world business problems
Collaborating in team environments

📌 Open To:
Back-End Laravel Developer roles
Full-Stack opportunities where Laravel is the core

🛠 Key Skills

🧩 Front-End Development:

⚛️ React.js – Building dynamic, reusable components and interactive UIs.
💻 JavaScript (ES6+) – Solid understanding of modern JavaScript.
🧱 HTML5 & CSS3 – Semantic markup and responsive layouts using Flexbox & Grid.
🎨 Bootstrap & TailwindCSS – Designing elegant and responsive UIs.

⚙️ Back-End Development:

🐘 PHP – Writing backend logic and working with MVC patterns.
🚀 Laravel – Building structured, scalable RESTful APIs and web apps.
🟢 Node.js – Server-side scripting and asynchronous programming.
📦 Express.js – Routing, middleware, and handling API requests.

🗄️ Databases:

🗄️ MySQL – Designing relational databases and complex SQL queries.
🗂️ MongoDB – Working with NoSQL structures and collections.

🧰 Tools & Workflows:

🐙 Git & GitHub – Version control and team collaboration.
🧠 Problem Solving – Debugging and analyzing complex logic issues.
🤝 Teamwork – Experienced in collaborative and agile team projects.

🌱 Let’s Connect!

I'm eager to grow, learn from experienced developers, and contribute to exciting projects.
If you're hiring, mentoring, or looking to collaborate — feel free to reach out! */
}
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
            href="https://drive.google.com/uc?export=download&id=1sJXBHJCDS0rUeVVnhtkIyz33-6HbQObW"
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
