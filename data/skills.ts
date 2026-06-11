import {
  SiPhp,
  SiLaravel,
  SiMysql,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiReact,
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiBootstrap,
  SiGit,
  SiGithub,
  SiLinux,
  SiGnubash,
  SiCpanel,
} from "react-icons/si";
import {
  FaNetworkWired,
  FaCubes,
  FaSitemap,
  FaLayerGroup,
  FaRobot,
  FaUsers,
  FaLightbulb,
  FaBolt,
} from "react-icons/fa6";
import { TbServerBolt, TbBrain } from "react-icons/tb";
import type { IconType } from "react-icons";

export interface Skill {
  name: string;
  icon: IconType;
  color: string;
}

export interface SkillGroup {
  category: string;
  isPrimary?: boolean;
  description: string;
  skills: Skill[];
}

export const skillGroups: SkillGroup[] = [
  {
    category: "PHP / Laravel Stack",
    isPrimary: true,
    description: "Primary focus — scalable back-end systems, RESTful APIs, and real-time features",
    skills: [
      { name: "PHP", icon: SiPhp, color: "#777BB4" },
      { name: "Laravel", icon: SiLaravel, color: "#06B6D4" },
      { name: "MySQL", icon: SiMysql, color: "#4479A1" },
      { name: "RESTful APIs", icon: FaNetworkWired, color: "#94a3b8" },
      { name: "Reverb", icon: TbServerBolt, color: "#38bdf8" },
    ],
  },
  {
    category: "Architecture & Design",
    description: "Clean, scalable, and maintainable code patterns",
    skills: [
      { name: "SOLID Principles", icon: FaCubes, color: "#a78bfa" },
      { name: "Clean Architecture", icon: FaSitemap, color: "#a78bfa" },
      { name: "OOD", icon: FaLayerGroup, color: "#a78bfa" },
      { name: "DDD Concepts", icon: FaLayerGroup, color: "#c084fc" },
    ],
  },
  {
    category: "Node.js Ecosystem",
    description: "Server-side JavaScript for full-stack projects",
    skills: [
      { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
      { name: "Express.js", icon: SiExpress, color: "#e2e8f0" },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
    ],
  },
  {
    category: "Front-End",
    description: "Building interactive, responsive user interfaces",
    skills: [
      { name: "React.js", icon: SiReact, color: "#61DAFB" },
      { name: "React Hooks", icon: SiReact, color: "#38bdf8" },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "HTML5", icon: SiHtml5, color: "#3b82f6" },
      { name: "CSS3", icon: SiCss, color: "#1572B6" },
      { name: "Bootstrap", icon: SiBootstrap, color: "#7952B3" },
    ],
  },
  {
    category: "Tools & DevOps",
    description: "Version control, server management, and automation",
    skills: [
      { name: "Git", icon: SiGit, color: "#06B6D4" },
      { name: "GitHub", icon: SiGithub, color: "#e2e8f0" },
      { name: "Linux", icon: SiLinux, color: "#FCC624" },
      { name: "Bash", icon: SiGnubash, color: "#4EAA25" },
      { name: "cPanel", icon: SiCpanel, color: "#38bdf8" },
    ],
  },
  {
    category: "AI & Productivity",
    description: "Leveraging AI tools to boost development speed and quality",
    skills: [
      { name: "AI-assisted Dev", icon: FaRobot, color: "#818cf8" },
      { name: "Prompt Engineering", icon: TbBrain, color: "#c084fc" },
    ],
  },
  {
    category: "Soft Skills",
    description: "Team player, fast learner, and problem solver",
    skills: [
      { name: "Problem-solving", icon: FaLightbulb, color: "#fbbf24" },
      { name: "Team Collaboration", icon: FaUsers, color: "#34d399" },
      { name: "Quick Learner", icon: FaBolt, color: "#38bdf8" },
    ],
  },
];
