// @ts-ignore
import movieApp from "../../../public/movieApp.png";
// @ts-ignore
import basicEcommerce from "../../../public/Basic-E-commerce.png";
// @ts-ignore
import EcommercewithReactJs from "../../../public/E-commerce with React js.png";
// @ts-ignore
import EcommerceNodejs from "../../../public/E-commerce API with Node js.png"
// @ts-ignore
import TimePrayer from "../../../public/TimePrayer.png";

// @ts-ignore
import socialApp from "../../../public/socialApp.png";
// @ts-ignore
import reactApp from "../../../public/reactApp.png";

export const myProjects = [
  {
    id: 1,
    projectTitle: "Movie Recommendation App",
    category: ["fullstack", "react", "node&express","bootstarp"],
    img: movieApp,
    keyFeatures: [
      "Custom API Integration: Utilizes a custom-built API to fetch movie data.",
      "Movie Search: Search for movies by title or genre.",
      "Detailed Views: Displays detailed information about each movie, such as synopsis, release date, and rating.",
      "Interactive UI: Built with React to provide a smooth and engaging experience.",
      "Responsive Design: Optimized for seamless use across devices.",
    ],
    pragraph:
      "The site offers a seamless user experience, making it easy to search for movies, view their details, and browse different genres. The site is designed to beresponsive, providing a great browsing experience on all devices.",
    Technologies: [
      "Front-End: React.js for building the interface.",
      "Back-End: Custom API for handling movie data requests.",
      "Styling: Modern CSS for a clean and user-friendly design.",
    ],
    purpose: [
      "Demonstrate custom API development and integration.",
      "Build a fully functional, personalized app for movie enthusiasts.",
    ],
    demoLink: "",
    gitHubLink: "https://github.com/AhmedHassan1241/Movie-app",
  },
  {
    id: 2,
    projectTitle: "Basic-E-commerce",
    category: ["react","bootstarp"],
    img: basicEcommerce,
    keyFeatures: [
      "Product Management: Add, view, update, and delete products.",
      "Category Management: Organize products through categories with full CRUD functionality.",
      "Interactive Front-End: Provides a responsive and intuitive interface.",
      "Fake Store API Integration: Simulates real-world data handling for back-end functionalities.",
    ],
    pragraph:
      "A foundational e-commerce project focused on demonstrating essential features for managing products and categories. This project provides a starting point for building a functional online store, leveraging a fake store API for data handling.",
    Technologies: [
      "Front-End: React.js, styled with CSS for an engaging UI.",
      "Back-End: Utilizes a fake store API for data simulation.",
    ],
    purpose: [
      "Learn and demonstrate core e-commerce features.",
      "Practice integrating front-end development with a simulated API.",
    ],
    demoLink: "https://basic-e-commerce-topaz.vercel.app/#/",
    gitHubLink: "https://github.com/AhmedHassan1241/Basic-E-commerce",
  },
  {
    id: 3,
    projectTitle: "E-commerce with React js",
    category: ["react","bootstarp"],
    img: EcommercewithReactJs,
    keyFeatures: ["Product Management: Easily add, view, update, and delete products.",
    "Category Management: Create, modify, and delete categories, offering users a structured way to organize products.",
    "Filtering: View products filtered by their assigned categories.",
    "Interactive Interface: Modern and responsive design for a seamless user experience."  
    ],
    pragraph:
      "A hands-on e-commerce project that illustrates core CRUD operations for managing products and categories. This project is an excellent starting point for exploring the functionality of an online store, utilizing a simulated back-end environment through a fake DB server.",
    Technologies: ["Front-End: React.js with CSS for a clean and intuitive UI.","Back-End: JSON Server (fake DB) for API simulation."],
    purpose: ["Demonstrate fundamental e-commerce features.","Practice front-end and back-end integration.","Simulate real-world application development with CRUD functionalities."],
    demoLink: "",
    gitHubLink: "https://github.com/AhmedHassan1241/Basic-E-commerce-CRUD",
  },
  {
    id: 4,
    projectTitle: "E-commerce API with Node js",
    category: ["node & express"],
    img: EcommerceNodejs,
    keyFeatures: ["Product Management: Perform CRUD operations (Create, Read, Update, Delete) for products.","Category Management: Organize products into categories with full CRUD functionality.","RESTful APIs: Provides structured APIs for seamless front-end integration."],
    pragraph:
"A foundational back-end project developed with Node.js, demonstrating the essential functionalities required to manage an e-commerce platform effectively.",
    Technologies: ["Back-End: Built with Node.js and Express.js to create a fast, scalable server and RESTful APIs.","Database:Integrated with a database for persistent data management."],
    purpose: ["Learning Node.js and Express.js: Gain hands-on experience in back-end development.","Foundation for Full-Stack Integration: Serves as the back-end for future full-stack projects.","API Development Practice: Build robust APIs for managing e-commerce functionalities."],
    demoLink: "",
    gitHubLink: "https://github.com/AhmedHassan1241/Node-Ecommerce",
  },
  {
    id: 5,
    projectTitle: "Time Prayer",
    category: ["html & css","java script"],
    img: TimePrayer,
    keyFeatures: ["Prayer Time Display: Shows the accurate prayer times for the user's location.","Dynamic Location Fetching: Automatically detects the user's location to provide the correct prayer times.","Responsive Design: Optimized for various devices (mobile, tablet, desktop).","Real-time Data: Prayer times are fetched in real-time from an external API.","User-Friendly Interface: A clean, minimalistic interface to ensure easy access to prayer times."],
    pragraph:
     "Time-Prayer is a web-based application designed to display accurate prayer times based on the user's location. It provides a simple and easy-to-use interface for Muslims to check the daily prayer times and stay connected with their faith. The app fetches prayer time data through a third-party API to ensure that the information is updated in real-time.",
    Technologies: ["Front-End: HTML, CSS, and JavaScript for building a dynamic and responsive user interface that works across devices.","Back-End: Uses a third-party API to fetch prayer time data"],
    purpose: ["Provide Accurate Prayer Times: Serve as a tool for Muslims to track prayer times accurately based on their geographical location.","Responsive Design: Learn and implement responsive design principles to ensure the app is accessible on any device.","Integration with External APIs: Practice integrating third-party APIs for real-time data fetching."],
    gitHubLink: "https://github.com/AhmedHassan1241/Time-Prayer",
    demoLink: "https://time-prayer-seven.vercel.app",
  },
  {
    id: 6,
    projectTitle: "Social App",
    category: ["html & css","bootstarp","java script"],
    img: socialApp,
    keyFeatures: ["User Authentication: Allows users to log in and manage their sessions securely.","Post Management: Users can add, edit, and delete posts dynamically.","Commenting System: Enables users to add comments to posts, fostering interaction.","API Integration: Utilizes Tarmeez Academy's API for real-time data handling and operations."],
    pragraph:
"Social-App is an engaging social media application featuring interactive functionalities for user-generated content management and interaction. The project emphasizes the integration of third-party APIs to deliver a realistic application experience.",    
Technologies: ["HTML: For structuring the application.","CSS: Ensures responsive and visually consistent design.","JavaScript: Handles logic and dynamic functionalities.","Tarmeez Academy API: Powers data interaction for a dynamic user experience."],
    purpose: ["To demonstrate advanced front-end development skills.","To practice building interactive user experiences with third-party API integration.","To create a functional application showcasing user authentication and CRUD operations."],
    demoLink: "",
    gitHubLink: "https://github.com/AhmedHassan1241/Social-App",
  },
  {
    id: 7,
    projectTitle: "E-commerce Using React+Vite",
    category: ["html & css","bootstarp","java script",'react'],
    img: reactApp,
    keyFeatures: ["Product Catalog: Browse products with dynamic filtering and search.",
      "Cart & Order Management: Add products to cart, manage quantities, and place orders.",
      "User Authentication: Secure login and session management using Redux Persist.",
      "Payment Integration: Supports Stripe and PayPal for seamless checkout.",
      "Modern UI: Built with Material-UI and Bootstrap for a responsive, attractive interface."
],
    pragraph:
      "Developed a responsive e-commerce web app using React, Redux, and Vite. Features include a product catalog, cart and order management, secure user authentication, and real-time payment integration with Stripe and PayPal. The UI leverages Material-UI and Bootstrap for a modern look and feel.",
Technologies: [
   "React: For building interactive user interfaces.",
      "Redux & Redux Persist: State management and persistent authentication.",
      "Vite: Fast development and build tool.",
      "Material-UI & Bootstrap: For responsive and consistent design.",
      "Stripe & PayPal: Integrated payment gateways."
    ],
    purpose: [
       "Showcase advanced front-end and state management skills.",
      "Practice integrating third-party payment APIs.",
      "Build a full-featured e-commerce application with modern technologies."
 ],
    demoLink: "https://e-commerce-real.vercel.app/",
    gitHubLink: "https://github.com/AhmedHassan1241/E-commerce-Real",
  },
];

export const categoryData= ["all", "html & css","bootstarp", "java script", "react", "node & express", "fullstack"]