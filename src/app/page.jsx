import Home from "../components/Home";

export const metadata = {
  title: "ImgReducer | Resize, Compress & Convert Images Online FREE",
  description: "Free online image resizer, compressor, and converter. Reduce JPG/JPEG, PNG, SVG, WEBP, HEIC, and AVIF image size instantly without losing quality.",
  alternates: {
    canonical: "https://www.img-reducer.com",
  },
  openGraph: {
    title: "ImgReducer | Resize, Compress & Convert Images Online FREE",
    description: "Free online image resizer, compressor, and converter. Reduce JPG/JPEG, PNG, SVG, WEBP, HEIC, and AVIF image size instantly without losing quality.",
    url: "https://www.img-reducer.com",
  },
};

export default function HomePage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": "https://www.img-reducer.com/#webapp",
    name: "ImgReducer",
    url: "https://www.img-reducer.com",
    description: "Free online image resizer, compressor, and converter.",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "All",
    creator: {
      "@type": "Organization",
      name: "ImgReducer",
      url: "https://www.img-reducer.com",
    },
    featureList: [
      "Resize images online",
      "Compress images without quality loss",
      "Convert image formats",
      "Supports JPG, JPEG, PNG, SVG, WEBP, HEIC, and AVIF",
      "Fast and secure browser-based processing",
      "Works on mobile, tablet, and desktop devices",
    ],
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
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
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([schema, breadcrumbSchema]) }}
      />
      <Home />
    </>
  );
}
