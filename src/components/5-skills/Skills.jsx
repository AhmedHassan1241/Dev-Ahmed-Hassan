import { GiSkills } from "react-icons/gi";
import "./skills.css";
import { motion } from "framer-motion";
import { skillsData } from "./skillsData";


const Skills = () => {
  return (
    <section className="skills" id={"skills"}>
      <div className="flex">
        <GiSkills className="skill" />
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="title"
        >
          Skills
        </motion.h1>
      </div>

        <ul className="flex skillsIcons">
          {
            skillsData.map((skill)=>{
              return(
                <li key={skill.id}><skill.icon/><p>{skill.name}</p></li>
              )
            })

          }
        </ul>
      
    </section>
  );
};

export default Skills;
