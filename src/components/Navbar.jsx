"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import styles from "../styles/Navbar.module.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsToolsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toolCategories = [
    {
      title: "Compress by Size",
      tools: [
        { name: "Compress to 20KB", slug: "compress-image-to-20kb" },
        { name: "Compress to 50KB", slug: "compress-image-to-50kb" },
        { name: "Compress to 100KB", slug: "compress-image-to-100kb" },
        { name: "Compress to 200KB", slug: "compress-image-to-200kb" },
      ],
    },
    {
      title: "Format Converters",
      tools: [
        { name: "HEIC to JPG", slug: "heic-to-jpg" },
        { name: "PNG to WebP", slug: "png-to-webp" },
        { name: "WebP to PNG", slug: "webp-to-png" },
        { name: "JPG to WebP", slug: "jpg-to-webp" },
        { name: "AVIF to JPG", slug: "avif-to-jpg" },
      ],
    },
    {
      title: "Specialized Tools",
      tools: [
        { name: "Passport Photo", slug: "passport-photo-compressor" },
        { name: "Signature Resizer", slug: "signature-resizer-online" },
      ],
    },
  ];

  const handleLinkClick = () => {
    setIsOpen(false);
    setIsToolsOpen(false);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo} onClick={handleLinkClick}>
          <img
            src="/logo.png"
            alt="logo"
            width="24"
            height="24"
            className={styles.logoIcon}
          />
          ImgReducer
        </Link>

        <div className={`${styles.links} ${isOpen ? styles.active : ""}`}>
          <Link href="/" onClick={handleLinkClick}>
            Home
          </Link>

          {/* Tools Mega Dropdown */}
          <div className={styles.dropdown} ref={dropdownRef}>
            <button
              className={styles.dropdownTrigger}
              onClick={() => setIsToolsOpen(!isToolsOpen)}
              aria-expanded={isToolsOpen}
              aria-haspopup="true"
            >
              Tools
              <svg
                className={`${styles.chevron} ${
                  isToolsOpen ? styles.chevronRotated : ""
                }`}
                width="14"
                height="14"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {isToolsOpen && (
              <div className={styles.dropdownMenu}>
                {toolCategories.map((group) => (
                  <div key={group.title} className={styles.dropdownGroup}>
                    <div className={styles.dropdownGroupTitle}>
                      {group.title}
                    </div>
                    {group.tools.map((t) => (
                      <Link
                        key={t.slug}
                        href={`/${t.slug}`}
                        onClick={handleLinkClick}
                      >
                        {t.name}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>

          <Link href="/about-us" onClick={handleLinkClick}>
            About Us
          </Link>
          <Link href="/blog" onClick={handleLinkClick}>
            Blog
          </Link>
          <Link href="/privacy-policy" onClick={handleLinkClick}>
            Privacy
          </Link>
          <Link href="/terms-of-service" onClick={handleLinkClick}>
            Terms
          </Link>
        </div>

        <button
          className={styles.menuButton}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
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
