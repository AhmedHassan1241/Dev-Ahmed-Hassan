import { useState } from "react";
import "./main.css";
import { myProjects } from "./myProjects";
import { AnimatePresence, motion } from "framer-motion";

function Main() {
  const [current, setCurrent] = useState("all");
  const [arr, setArr] = useState(myProjects);
  const [activeCard, setActiveCard] = useState(null);

  const handleClick = (name) => {
    setCurrent(name);
    const newArr = myProjects.filter((item) => item.category.includes(name));
    setArr(name === "all" ? myProjects : newArr);
  };

  const handleModalOpen = (id) => setActiveCard(id);
  const handleModalClose = () => setActiveCard(null);

  return (
    <main className="flex" id={"projects"}>
      <section className="flex left-section">
        {["all", "html&css", "js", "react", "node&express", "fullstack"].map(
          (category) => (
            <button
              key={category}
              onClick={() => handleClick(category)}
              className={current === category ? "active" : ""}
            >
              {category.toUpperCase()}
            </button>
          )
        )}
      </section>
      <section className="right-section flex" style={{ position: "relative" }}>
        <AnimatePresence>
          {arr.map((item) => (
            <motion.article
              layout
              key={item.id}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", damping: 8, stiffness: 100 }}
              className="card"
            >
              <img
                width={266}
                src={item.img}
                alt={`${item.projectTitle} preview`}
              />
              <div style={{ width: "266px" }} className="box">
                <h1 className="title">{item.projectTitle}</h1>
                <p className="subtitle">{item.pragraph}</p>
                <div className="flex icons">
                  <a
                    href={item.gitHubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="icon-github"></div>
                  </a>
                  {item.demoLink && (
                    <a
                      href={item.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="icon-link"></div>
                    </a>
                  )}
                  <div
                    className="link flex more"
                    onClick={() => handleModalOpen(item.id)}
                  >
                    more
                    <span className="icon-arrow-right-circle"></span>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
        {myProjects
          .filter((project) => project.id === activeCard)
          .map((project) => (
            <div key={project.id} className="fixed">
              <ul className="modal">
                <li className="close">
                  <button className="icon-close" onClick={handleModalClose} />
                </li>
                <h1>{project.projectTitle}</h1>
                <p className="pragraph">{project.pragraph}</p>
                <ul style={{ marginBottom: "2rem" }}>
                {project.keyFeatures.length > 0 && (
                  <h3 style={{ marginBottom: ".8rem" }}>Key Features:</h3>
                 )} 
                 {project.keyFeatures?.map((point, index) => (
                    <li key={index} className="features">
                      {point}
                    </li>
                  ))}
                </ul>
                <ul style={{ marginBottom: "2rem" }}>
                  {project.Technologies.length > 0 && (
                    <h3 style={{ marginBottom: ".8rem" }}>Technologies:</h3>
                  )}
                  {project.Technologies?.map((point, index) => (
                    <li key={index} className="features">
                      {point}
                    </li>
                  ))}
                </ul>
                <ul style={{ marginBottom: "2rem" }}>
                {project.purpose.length > 0 && (
                    <h3 style={{ marginBottom: ".8rem" }}>Purpose:</h3>
                  )}
                  {project.purpose?.map((point, index) => (
                    <li key={index} className="features">
                      {point}
                    </li>
                  ))}
                </ul>
              </ul>
            </div>
          ))}
      </section>
    </main>
  );
}

export default Main;
