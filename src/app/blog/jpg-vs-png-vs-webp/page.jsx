import Article2_Formats from "../../../components/blog/Article2_Formats";

export const metadata = {
  title: "JPG vs PNG vs WebP: Which Format Should You Use?",
  description: "A comprehensive comparison of image formats. Discover when to use JPEG, PNG, or WebP for the best balance of quality and performance.",
  alternates: {
    canonical: "https://www.img-reducer.com/blog/jpg-vs-png-vs-webp",
  },
  openGraph: {
    title: "JPG vs PNG vs WebP: Which Format Should You Use?",
    description: "A comprehensive comparison of image formats. Discover when to use JPEG, PNG, or WebP for the best balance of quality and performance.",
    url: "https://www.img-reducer.com/blog/jpg-vs-png-vs-webp",
  },
};

export default function Article2Page() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://www.img-reducer.com/blog/jpg-vs-png-vs-webp",
      url: "https://www.img-reducer.com/blog/jpg-vs-png-vs-webp",
    },
    headline: "JPG vs PNG vs WebP: Which Format Should You Use?",
    description: "A comprehensive comparison of image formats. Discover when to use JPEG, PNG, or WebP for the best balance of quality and performance.",
    image: "https://www.img-reducer.com/images/blog/jpg-vs-png-vs-webp.webp",
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
    datePublished: "2026-02-16T09:00:00+05:30",
    dateModified: "2026-02-16T09:00:00+05:30",
    url: "https://www.img-reducer.com/blog/jpg-vs-png-vs-webp",
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
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "JPG vs PNG vs WebP: Which Format Should You Use?",
        "item": "https://www.img-reducer.com/blog/jpg-vs-png-vs-webp"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([schema, breadcrumbSchema]) }}
      />
      <Article2_Formats />
    </>
  );
}
