export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  categories: string[];
  technologies: string[];
  githubLink: string;
  demoLink?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  // ── CV order: PHP projects first ──
  {
    id: 9,
    title: "Hoda El Nas Platform",
    description:
      "Multi-tenant SaaS platform for Quran & Islamic education — serves companies, kids, and adults with dedicated programs. Built on Laravel 10/PHP 8.2 with Clean Architecture & DDD concepts. Includes real-time features via Reverb, WhatsApp Cloud API webhooks, S3 storage, Laravel Queues, and RESTful APIs consumed by Next.js & Flutter apps.",
    image: "/ss-hodaelnas.png",
    categories: ["php"],
    technologies: ["PHP", "Laravel", "MySQL", "Clean Architecture", "SaaS", "Multi-tenant", "Reverb", "WhatsApp API", "AI Tools", "Docker"],
    githubLink: "",
    demoLink: "https://www.hodaelnas.online/",

    featured: true,
  },
  {
    id: 10,
    title: "Osool Delivery App",
    description:
      "Last-mile delivery & storage platform serving Saudi Arabia. Handles real-time order tracking, driver assignment, distance calculation, and delivery coordination. Backend built with Laravel — scalable RESTful APIs, Reverb real-time notifications, and MySQL.",
    image: "/ss-osool.png",
    categories: ["php"],
    technologies: ["PHP", "Laravel", "MySQL", "REST API", "Reverb"],
    githubLink: "",
    demoLink: "https://osool-website.vercel.app/",

    featured: true,
  },
  {
    id: 11,
    title: "Mandoob App",
    description:
      "Comprehensive order management system with a real-time dashboard showing revenue, agent performance, and delivery stats. Features order tracking & management, inventory and delivery coordination, customer management, and reporting tools. Resolved production issues and ensured 99% uptime.",
    image: "/ss-mandoob.png",
    categories: ["php"],
    technologies: ["PHP", "Laravel", "MySQL", "Real-time", "REST API"],
    githubLink: "",
    demoLink: "https://mandoob-mu.vercel.app/sign-in",

  },
  {
    id: 8,
    title: "Bayt Al Khyata",
    description:
      "National online training platform for sewing & tailoring. Offers courses, free articles, and enrollment management. Backend built with Laravel/PHP — secure APIs for course catalog, student enrollments, and content delivery.",
    image: "/ss-baytalkhyata.png",
    categories: ["php"],
    technologies: ["PHP", "Laravel", "MySQL", "REST API"],
    githubLink: "",
    demoLink: "https://www.baytalkhyata.com/home",

  },
  // ── React / JS projects ──
  {
    id: 2,
    title: "Movie Recommendation App",
    description:
      "Full-stack app with a custom Node.js API for movie data. Features genre-based search, detailed movie views, and a smooth React UI with responsive design.",
    image: "/movieApp.png",
    categories: ["fullstack", "nodejs", "react"],
    technologies: ["React.js", "Node.js", "Express.js", "CSS"],
    githubLink: "https://github.com/AhmedHassan1241/Movie-app",
    featured: true,
  },
  {
    id: 4,
    title: "E-commerce with React & Redux",
    description:
      "Feature-rich e-commerce app with product catalog, cart management, secure auth via Redux Persist, and payment integration with Stripe & PayPal.",
    image: "/reactApp.png",
    categories: ["react"],
    technologies: ["React.js", "Redux", "Material-UI", "Stripe", "Vite"],
    githubLink: "https://github.com/AhmedHassan1241/E-commerce-Real",
    demoLink: "https://e-commerce-real.vercel.app/",
  },
  {
    id: 3,
    title: "E-commerce API — Node.js",
    description:
      "Back-end RESTful API for an e-commerce platform. Implements CRUD operations for products and categories with Express.js and MongoDB.",
    image: "/E-commerce API with Node js.png",
    categories: ["backend", "nodejs"],
    technologies: ["Node.js", "Express.js", "MongoDB"],
    githubLink: "https://github.com/AhmedHassan1241/Node-Ecommerce",
  },
  {
    id: 5,
    title: "Basic E-commerce CRUD",
    description:
      "E-commerce app with full CRUD for products and categories. Uses JSON Server as a fake back-end with category-based filtering.",
    image: "/E-commerce with React js.png",
    categories: ["react"],
    technologies: ["React.js", "JSON Server", "CSS"],
    githubLink: "https://github.com/AhmedHassan1241/Basic-E-commerce-CRUD",
  },
  {
    id: 6,
    title: "Prayer Times App",
    description:
      "Location-aware web app that displays accurate daily prayer times. Auto-detects user location and fetches real-time data from external API.",
    image: "/TimePrayer.png",
    categories: ["javascript"],
    technologies: ["HTML5", "CSS3", "JavaScript", "Geolocation API"],
    githubLink: "https://github.com/AhmedHassan1241/Time-Prayer",
    demoLink: "https://time-prayer-seven.vercel.app",
  },
  {
    id: 7,
    title: "Social App",
    description:
      "Social media app with user authentication, post/comment management, and Tarmeez Academy API integration for real-time data.",
    image: "/socialApp.png",
    categories: ["javascript"],
    technologies: ["HTML5", "CSS3", "JavaScript", "Bootstrap"],
    githubLink: "https://github.com/AhmedHassan1241/Social-App",
  },
];

export const categoryFilters = [
  { id: "all", label: "All" },
  { id: "php", label: "PHP / Laravel" },
  { id: "backend", label: "Back-End" },
  { id: "nodejs", label: "Node.js" },
  { id: "react", label: "React" },
  { id: "javascript", label: "JS / HTML" },
];
