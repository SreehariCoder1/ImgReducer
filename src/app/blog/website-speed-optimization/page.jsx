import Article3_Speed from "../../../components/blog/Article3_Speed";

export const metadata = {
  title: "How to Improve Website Speed by Compressing Images",
  description: "Speed kills... bounce rates. Discover how compressing images can make your website lightning fast and improve conversion rates.",
  alternates: {
    canonical: "https://www.img-reducer.com/blog/website-speed-optimization",
  },
  openGraph: {
    title: "How to Improve Website Speed by Compressing Images",
    description: "Speed kills... bounce rates. Discover how compressing images can make your website lightning fast and improve conversion rates.",
    url: "https://www.img-reducer.com/blog/website-speed-optimization",
  },
};

export default function Article3Page() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://www.img-reducer.com/blog/website-speed-optimization",
      url: "https://www.img-reducer.com/blog/website-speed-optimization",
    },
    headline: "How to Improve Website Speed by Compressing Images",
    description: "Speed kills... bounce rates. Discover how compressing images can make your website lightning fast and improve conversion rates.",
    image: "https://www.img-reducer.com/images/blog/improve-website-speed-compressing-images.webp",
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
    datePublished: "2026-02-15T09:00:00+05:30",
    dateModified: "2026-02-15T09:00:00+05:30",
    url: "https://www.img-reducer.com/blog/website-speed-optimization",
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
        "name": "How to Improve Website Speed by Compressing Images",
        "item": "https://www.img-reducer.com/blog/website-speed-optimization"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([schema, breadcrumbSchema]) }}
      />
      <Article3_Speed />
    </>
  );
}
