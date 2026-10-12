import Link from "next/link";
import styles from "../styles/Footer.module.css";
import { toolsData } from "../utils/toolsData";

const Footer = () => {
  const sizeTools = toolsData.filter((t) => t.category === "Size");
  const formatTools = toolsData.filter((t) => t.category === "Format");
  const presetTools = toolsData.filter((t) => t.category === "Preset");

  return (
    <footer>
      <div className={styles.content}>
        {/* Categorized Tools Links */}
        <div className={styles.toolsContainer}>
          <div className={styles.toolsGroup}>
            <h4>Compress by File Size</h4>
            <div className={styles.toolsList}>
              {sizeTools.map((t) => (
                <Link key={t.slug} href={`/${t.slug}`}>
                  {t.h1}
                </Link>
              ))}
            </div>
          </div>

          <div className={styles.toolsGroup}>
            <h4>Format Converters</h4>
            <div className={styles.toolsList}>
              {formatTools.map((t) => (
                <Link key={t.slug} href={`/${t.slug}`}>
                  {t.h1}
                </Link>
              ))}
            </div>
          </div>

          <div className={styles.toolsGroup}>
            <h4>Specialized Tools</h4>
            <div className={styles.toolsList}>
              {presetTools.map((t) => (
                <Link key={t.slug} href={`/${t.slug}`}>
                  {t.h1}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Legal & Static Navigation */}
        <div className={styles.links}>
          <Link href="/">Home</Link>
          <Link href="/about-us">About Us</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/terms-of-service">Terms of Service</Link>
        </div>

        {/* Copyright */}
        <div className={styles.copyContainer}>
          <div className={styles.copy}>
            &copy; {new Date().getFullYear()} ImgReducer. All rights reserved.
          </div>
          <div>
            <span className={styles.footerText}>imgreducer@gmail.com</span>
            <a href="mailto:imgreducer@gmail.com" className={styles.email}>
              Email Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
