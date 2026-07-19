"use client";
import { useState } from "react";
import Link from "next/link";
import styles from "../styles/Navbar.module.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <img src="/favicon.png" alt="logo" className={styles.logoIcon} />
          ImgReducer
        </Link>

        <div className={`${styles.links} ${isOpen ? styles.active : ""}`}>
          <Link href="/" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link href="/about-us" onClick={() => setIsOpen(false)}>
            About Us
          </Link>
          <Link href="/blog" onClick={() => setIsOpen(false)}>
            Blog
          </Link>
          <Link href="/privacy-policy" onClick={() => setIsOpen(false)}>
            Privacy
          </Link>
          <Link href="/terms-of-service" onClick={() => setIsOpen(false)}>
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
