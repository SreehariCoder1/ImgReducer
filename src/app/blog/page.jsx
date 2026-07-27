import BlogList from "../../components/blog/BlogList";

export const metadata = {
  title: "Blog - ImgReducer",
  description: "Latest articles and guides on image optimization, web performance, and SEO best practices.",
  alternates: {
    canonical: "https://www.img-reducer.com/blog",
  },
  openGraph: {
    title: "Blog - ImgReducer",
    description: "Latest articles and guides on image optimization, web performance, and SEO best practices.",
    url: "https://www.img-reducer.com/blog",
  },
};

export default function BlogPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    headline: "ImgReducer Blog",
    description: "Latest articles and guides on image optimization, web performance, and SEO best practices.",
    url: "https://www.img-reducer.com/blog",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.img-reducer.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://www.img-reducer.com/blog"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([schema, breadcrumbSchema]) }}
      />
      <BlogList />
    </>
  );
}
