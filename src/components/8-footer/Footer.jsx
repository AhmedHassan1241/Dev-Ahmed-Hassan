import "./footer.css";
import { linkdData } from './../1-header/NavLinksData';

const Footer = () => {
  return (
    <footer className="flex">
      <ul className="flex">
        {linkdData.map((data) => {
          return (
            <li key={data.id}>
              <a href={data.href}>{data.name}</a>
            </li>
          );
        })}
      </ul>
      <p>Copyright &copy; 2024 Ahmed Hassan. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
