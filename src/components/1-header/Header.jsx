

import { useEffect, useState } from "react";
import "./header.css";
import { linkdData } from "./NavLinksData";

function Header() {
  const [showModal, setShowModal] = useState(false);
  const [theme, setTheme] = useState(
    localStorage.getItem("currentMode") ?? "dark"
  );
  

  // Handle theme change effect
  useEffect(() => {
    if (theme === "light") {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    } else {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
    }
  }, [theme]);

  // Smooth scroll to section when clicked
  const smoothScroll = (sectionId) => {
    const section = document.querySelector(sectionId);
    section?.scrollIntoView({ behavior: "smooth" });
  
    const yOffset = -60; // Adjust this value to give margin (e.g., for sticky headers)
    const y = section.getBoundingClientRect().top + window.screenY + yOffset;

    window.scrollTo({
      top: y,
      behavior: "smooth"
    });
  };

  return (
    <header className="flex">
      <button
        onClick={() => {
          setShowModal(true);
        }}
        className="menu icon-menu flex"
      />
      <div />
      <nav>
        <ul className="flex">
          {linkdData.map((data)=>{
            return(          
            <li key={data.id}>
              <a
                href={data.href}
                onClick={(e) => {
                  e.preventDefault();
                  smoothScroll(`${data.href}`);
                }}
                >
                {data.name}
              </a>
            </li>
          )
            }
          )
          }
            
            
            </ul>
      </nav>

      <button
        onClick={() => {
          const newTheme = theme === "dark" ? "light" : "dark";
          localStorage.setItem("currentMode", newTheme);
          setTheme(newTheme);
        }}
        className="mode flex"
      >
        <span className={theme === "dark" ? "icon-moon-o" : "icon-sun"}></span>
      </button>

      {showModal && (
        <div className="fixed">
          <ul className="modal">
            <li>
              <button
                className="icon-close"
                onClick={() => {
                  setShowModal(false);
                }}
              />
            </li>
            {linkdData.map((data)=>{
            return(          
            <li key={data.id}>
              <a
                href={data.href}
                onClick={() => {
                  smoothScroll(`${data.href}`);
                  setShowModal(false);
                }}
                >
                {data.name}
              </a>
            </li>
          )
            }
          )
          }
          </ul>
        </div>
      )}
    </header>
  );
}

export default Header;
