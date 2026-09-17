import { blogData } from "../../../utils/blogData";
import ArticleTemplate from "../../../components/blog/ArticleTemplate";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return blogData.map((blog) => ({
    slug: blog.id,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = blogData.find((b) => b.id === slug);
  
  if (!article) return {};

  return {
    title: article.title,
    description: article.metaDescription,
    alternates: {
      canonical: `https://www.img-reducer.com/blog/${slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.metaDescription,
      url: `https://www.img-reducer.com/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const article = blogData.find((b) => b.id === slug);

  if (!article) {
    notFound();
  }

  // Convert "February 17, 2026" to ISO timestamp roughly, or default
  const dateObj = new Date(article.date);
  const isoDate = isNaN(dateObj.getTime()) ? "2026-02-17T09:00:00+05:30" : dateObj.toISOString();

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.img-reducer.com/blog/${slug}`,
      url: `https://www.img-reducer.com/blog/${slug}`,
    },
    headline: article.title,
    description: article.metaDescription,
    image: "https://www.img-reducer.com/images/blog/image-optimization-for-seo.webp", // Default or extract if dynamic
    author: {
      "@type": "Organization",
      "@id": "https://www.img-reducer.com/#organization",
      name: "ImgReducer",
      url: "https://www.img-reducer.com",
    },
    publisher: {
      "@type": "Organization",
      name: "ImgReducer",
      logo: {
        "@type": "ImageObject",
        url: "https://www.img-reducer.com/favicon.png",
      },
    },
    datePublished: isoDate,
    dateModified: isoDate,
    url: `https://www.img-reducer.com/blog/${slug}`,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.img-reducer.com/"
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://www.img-reducer.com/blog"
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: `https://www.img-reducer.com/blog/${slug}`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([schema, breadcrumbSchema]) }}
      />
      <ArticleTemplate article={article} />
    </>
  );
}
