import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Navbar.module.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <img src="/favicon.png" alt="logo" className={styles.logoIcon} />
          ImgReducer
        </Link>

        <div className={`${styles.links} ${isOpen ? styles.active : ""}`}>
          <Link to="/" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link to="/about-us" onClick={() => setIsOpen(false)}>
            About Us
          </Link>
          <Link to="/blog" onClick={() => setIsOpen(false)}>
            Blog
          </Link>
          <Link to="/privacy-policy" onClick={() => setIsOpen(false)}>
            Privacy
          </Link>
          <Link to="/terms-of-service" onClick={() => setIsOpen(false)}>
            Terms
          </Link>
        </div>

        <button
          className={styles.menuButton}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
