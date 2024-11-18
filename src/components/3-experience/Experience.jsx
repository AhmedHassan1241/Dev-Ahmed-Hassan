import  './experience.css'
import { motion } from 'framer-motion';
import { FaBriefcase } from "react-icons/fa6";

const Experience = () => {
  return (
    <section className='experience' id={"experience"}>
        <div className='flex'>

        <FaBriefcase className='briefcase'/>
      <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="title"
          >
          Work Experience
        </motion.h1>
            </div>

            <div className="subtitle">
                <h2>React Front-End Internship</h2>
                <p><em><strong>DEPI</strong> | Shebin El-kom, Menofia</em></p>
            </div>
            <ul className="body">
                <li>Developed applications using HTML5, JavaScript, CSS3, and Bootstrap.</li>
                <li>Useful Git Commands and Basic Concepts.</li>
                <li>Fundamentals of frontend development and how to build web applications using the React library.</li>
                <li>Created RESTful APIs using Node.js, MongoDB with Mongoose and Express.</li>
                <li>Using JavaScript in problem-solving.</li>
            </ul>
    </section>
  )
}

export default Experience
