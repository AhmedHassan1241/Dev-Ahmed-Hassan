import { FaUniversity } from "react-icons/fa";
import { FaUserGraduate } from "react-icons/fa6";
import "./education.css";
import { motion } from "framer-motion";
import { MdGrading } from "react-icons/md";


const Education = () => {
  return (
    <section className="education" id={"education"}>
      <div className="flex">
        <FaUniversity className="briefcase" />
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="title"
        >
          Education
        </motion.h1>
      </div>
      <div className="subtitle">
        <div className="flex">
          <FaUserGraduate className="gradated" />
          <h3>
            October 6 University -{" "}
            <span style={{ fontWeight: "400" }}>
              Bachelor of Computer Science.
            </span>
          </h3>
        </div>
        <p className="flex">
            <MdGrading className="grade"/>
          <strong>GPA :</strong> 3.7
        </p>
      </div>
    </section>
  );
};

export default Education;
