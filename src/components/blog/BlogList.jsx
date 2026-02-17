import { Link } from "react-router-dom";
import SEO from "../SEO";
import styles from "./Blog.module.css";

const BlogList = () => {
  const articles = [
    {
      id: "image-optimization-seo",
      title: "The Ultimate Guide to Image Optimization for SEO",
      excerpt:
        "Learn why optimized images are crucial for your site ranking and how to implement best practices for faster load times and better user experience.",
      date: "February 17, 2026",
    },
    {
      id: "jpg-vs-png-vs-webp",
      title: "JPG vs PNG vs WebP: Which Format Should You Use?",
      excerpt:
        "Struggling to choose the right image format? We break down the differences, pros, and cons of each to help you make the best decision for your website.",
      date: "February 16, 2026",
    },
    {
      id: "website-speed-optimization",
      title: "How to Improve Website Speed by Compressing Images",
      excerpt:
        "Slow websites kill conversions. Discover how proper image compression can dramatically improve your Core Web Vitals and keep visitors engaged.",
      date: "February 15, 2026",
    },
  ];

  return (
    <>
      <SEO
        title="Blog - ImgReducer"
        description="Latest articles and guides on image optimization, web performance, and SEO best practices."
        url="https://www.img-reducer.com/blog"
      />
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
              to={`/blog/${article.id}`}
              className={styles.card}
            >
              <h2>{article.title}</h2>
              <p>{article.excerpt}</p>
              <span className={styles.readMore}>Read Article &rarr;</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default BlogList;
