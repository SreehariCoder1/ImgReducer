import { Link } from "react-router-dom";
import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <footer>
      <div className={styles.content}>
        <div className={styles.copyContainer}>
          <div className={styles.copy}>
            &copy; {new Date().getFullYear()} ImgReducer. All rights reserved.
          </div>
          <div>
            <span className={styles.footerText}>imgreducer@gmail.com</span>
            <a href="mailto:imgreducer@gmail.com" className={styles.email}>
              {" "}
              Email Us
            </a>
          </div>
        </div>
        <div className={styles.links}>
          <Link to="/">Home</Link>
          <Link to="/about-us">About Us</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/terms-of-service">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
