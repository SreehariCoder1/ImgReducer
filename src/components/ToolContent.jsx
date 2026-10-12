import Link from "next/link";
import styles from "../styles/ToolContent.module.css";
import { toolsData } from "../utils/toolsData";

export default function ToolContent({ toolData }) {
  if (!toolData) return null;

  const relatedTools = (toolData.relatedSlugs || [])
    .map((slug) => toolsData.find((t) => t.slug === slug))
    .filter(Boolean);

  return (
    <div className={styles.container}>
      {/* Privacy Guarantee Callout */}
      <div className={styles.privacyBanner}>
        <div className={styles.privacyIcon}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
            />
          </svg>
        </div>
        <div className={styles.privacyText}>
          <h3>100% Client-Side Privacy Guaranteed</h3>
          <p>
            Your images and documents never leave your browser. All compression
            and format conversion is performed on your device via WebAssembly.
            No server uploads, no logs, and works even offline.
          </p>
        </div>
      </div>

      {/* Overview Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>About {toolData.h1}</h2>
        {toolData.overview.map((paragraph, idx) => (
          <p key={idx} className={styles.overviewText}>
            {paragraph}
          </p>
        ))}
      </section>

      {/* Key Benefits Grid */}
      {toolData.features && toolData.features.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Key Features & Specifications</h2>
          <div className={styles.featuresGrid}>
            {toolData.features.map((feat, idx) => (
              <div key={idx} className={styles.featureCard}>
                <h4>{feat.title}</h4>
                <p>{feat.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* How To Steps */}
      {toolData.howTo && toolData.howTo.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>How to Use This Tool</h2>
          <div className={styles.stepsList}>
            {toolData.howTo.map((step, idx) => (
              <div key={idx} className={styles.stepItem}>
                <div className={styles.stepNumber}>{step.step || idx + 1}</div>
                <div className={styles.stepContent}>
                  <h4>{step.title}</h4>
                  <p>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FAQs */}
      {toolData.faqs && toolData.faqs.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
          <div>
            {toolData.faqs.map((faq, idx) => (
              <div key={idx} className={styles.faqItem}>
                <h4>{faq.question}</h4>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Related Tools Cross-linking */}
      {relatedTools.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Explore Related Free Tools</h2>
          <div className={styles.relatedGrid}>
            {relatedTools.map((rel) => (
              <Link
                key={rel.slug}
                href={`/${rel.slug}`}
                className={styles.relatedCard}
              >
                <span className={styles.relatedBadge}>{rel.badge}</span>
                <p className={styles.relatedTitle}>{rel.h1}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
