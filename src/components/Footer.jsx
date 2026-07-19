import Link from "next/link";
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
          <Link href="/">Home</Link>
          <Link href="/about-us">About Us</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/terms-of-service">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
