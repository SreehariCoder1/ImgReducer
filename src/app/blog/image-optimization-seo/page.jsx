import Article1_SEO from "../../../components/blog/Article1_SEO";

export const metadata = {
  title: "The Ultimate Guide to Image Optimization for SEO",
  description: "Learn how to optimize images for search engines. Improve site speed, rank higher, and drive traffic with these proven strategies.",
  alternates: {
    canonical: "https://www.img-reducer.com/blog/image-optimization-seo",
  },
  openGraph: {
    title: "The Ultimate Guide to Image Optimization for SEO",
    description: "Learn how to optimize images for search engines. Improve site speed, rank higher, and drive traffic with these proven strategies.",
    url: "https://www.img-reducer.com/blog/image-optimization-seo",
  },
};

export default function Article1Page() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://www.img-reducer.com/blog/image-optimization-seo",
      url: "https://www.img-reducer.com/blog/image-optimization-seo",
    },
    headline: "The Ultimate Guide to Image Optimization for SEO",
    description: "Learn how to optimize images for search engines. Improve site speed, rank higher, and drive traffic with these proven strategies.",
    image: "https://www.img-reducer.com/images/blog/image-optimization-for-seo.webp",
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
    datePublished: "2026-02-17T09:00:00+05:30",
    dateModified: "2026-02-17T09:00:00+05:30",
    url: "https://www.img-reducer.com/blog/image-optimization-seo",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Article1_SEO />
    </>
  );
}
