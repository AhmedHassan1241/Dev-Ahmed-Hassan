import { useState } from "react";


import "./main.css";
import { myProjects } from "./myProjects";
import { AnimatePresence, motion } from 'framer-motion';
function Main() {
  
  const [current, setCurrent] = useState("all");
  const [arr, setArr] = useState(myProjects);

  const handleClick=(name)=>
    {setCurrent(`${name}`);
      const newArr =myProjects.filter((item)=>{
        const res =item.category.find((myItem)=>{
          return myItem === `${name}`;
        })
        return res ===`${name}`
      })
      setArr(newArr)
    }
  return (
    <main className="flex" id={"projects"}>
      <section className="flex left-section">
        <button
          onClick={() => {setCurrent("all");
            setArr(myProjects)
          }}
          className={current === "all" ? "active" : ""}
        >
          all Projects
        </button>
        <button
          onClick={() => handleClick("html&css") }
          className={current === "html&css" ? "active" : ""}
        >
          HTML & CSS
        </button>
        <button
          onClick={() => handleClick("js") }
          className={current === "js" ? "active" : ""}
        >
          JavaScript
        </button>
        <button
          
          onClick={() => handleClick("react") }
          className={current === "react" ? "active" : ""}
        >
          React
        </button>
        <button
          onClick={() => handleClick("node&express") }

          className={current === "node&express" ? "active" : ""}
        >
          Node & Express
        </button>
        <button
          onClick={() => handleClick("fullstack") }

          className={current === "fullstack" ? "active" : ""}
        >
          Full Stack
        </button>
      </section>
      <section className="right-section flex">
       
       <AnimatePresence>
        {arr.map((item) => {
          return (
            <motion.article
            layout
            initial={{transform:"scale(0)"}}
            animate={{transform:"scale(1)"}}
            transition={{type:"spring",damping:8,stiffness:100}}
            key={item.id} className="card">
              <img width={266} src={item.img} alt="" />

              <div style={{ width: "266px" }} className="box">
                <h1 className="title">{item.projectTitle}</h1>
                <p className="subtitle">
                  {item.pragraph}
                </p>

                <div className="flex icons">
                  <div className="flex" style={{ gap: "11px" }}>
                    {item.demoLink===""?"":(
                      <a href="" target="_blank">
                    <div className="icon-link"></div>
                    </a>)}
                  </div>
                    <a href={`${item.gitHubLink}`} target="_blank">
                    <div className="icon-github"></div>
                    </a>
                  {/* <a className="link flex" href="">
                    more
                    <span className="icon-arrow-right-circle"></span>
                  </a> */}
                </div>
              </div>
            </motion.article>
          );
        })}
        </AnimatePresence>
      </section>
    </main>
  );
}

export default Main;
