import { Helmet } from "react-helmet-async";
import { useEffect } from "react";

export default function SEO({
  title,
  description,
  name = "ImgReducer",
  type = "website",
  url = "https://www.img-reducer.com",
  image = "https://www.img-reducer.com/favicon.png",
  schema,
}) {
  useEffect(() => {
    // Manually update title and meta description to ensure 100% update on route change
    document.title = title;

    // Helper to update or create meta tag
    const updateMeta = (keyType, keyValue, content) => {
      let element = document.querySelector(`meta[${keyType}="${keyValue}"]`);
      if (element) {
        element.setAttribute("content", content);
      } else {
        element = document.createElement("meta");
        element.setAttribute(keyType, keyValue);
        element.setAttribute("content", content);
        document.head.appendChild(element);
      }
    };

    updateMeta("name", "description", description);

    // Open Graph
    updateMeta("property", "og:title", title);
    updateMeta("property", "og:description", description);

    // Twitter
    updateMeta("name", "twitter:title", title);
    updateMeta("name", "twitter:description", description);
  }, [title, description]);

  return (
    <Helmet>
      {/* Standard SEO */}
      <title key="title">{title}</title>
      <meta name="description" content={description} key="description" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} key="og:title" />
      <meta
        property="og:description"
        content={description}
        key="og:description"
      />
      <meta property="og:image" content={image} key="og:image" />
      <meta property="og:url" content={url} key="og:url" />
      <meta property="og:site_name" content={name} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} key="twitter:title" />
      <meta
        name="twitter:description"
        content={description}
        key="twitter:description"
      />
      <meta name="twitter:image" content={image} key="twitter:image" />
      {schema && (
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      )}
    </Helmet>
  );
}
