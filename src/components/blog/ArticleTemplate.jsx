import Link from "next/link";
import styles from "./Blog.module.css";

const ArticleTemplate = ({ article }) => {
  if (!article) return null;

  return (
    <>
      <div className={styles.articleContainer}>
        <Link href="/blog" className={styles.backLink}>
          &larr; Back to Blog
        </Link>
        <h1 className={styles.articleTitle}>{article.title}</h1>
        <div className={styles.meta}>
          Published on {article.date} • 5 min read
        </div>

        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: article.contentHtml }}
        />
        
        <div className={styles.ctaBox}>
          <p>
            <strong>Ready to optimize your images?</strong>{" "}
            <Link href="/">Try our free online image compressor</Link> to
            significantly reduce file sizes without losing quality.
          </p>
        </div>
      </div>
    </>
  );
};

export default ArticleTemplate;
