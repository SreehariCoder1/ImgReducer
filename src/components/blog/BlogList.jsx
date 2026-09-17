import Link from "next/link";
import styles from "./Blog.module.css";
import { blogData } from "../../utils/blogData";

const BlogList = () => {
  const articles = blogData;

  return (
    <div className={styles.container}>
        <h1 className={styles.title}>ImgReducer Blog</h1>
        <p className={styles.intro}>
          Expert tips, guides, and insights to help you master image
          optimization and boost your website's performance.
        </p>

        <div className={styles.grid}>
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/blog/${article.id}`}
              className={styles.card}
            >
              <h2>{article.title}</h2>
              <p>{article.excerpt}</p>
              <span className={styles.readMore}>Read Article &rarr;</span>
            </Link>
          ))}
        </div>
      </div>
  );
};

export default BlogList;
