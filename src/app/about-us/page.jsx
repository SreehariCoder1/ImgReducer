import AboutUs from "../../components/AboutUs";

export const metadata = {
  title: "About Us - ImgReducer",
  description: "About ImgReducer. Our mission is to provide fast, secure, and private image optimization for everyone.",
  alternates: {
    canonical: "https://www.img-reducer.com/about-us",
  },
  openGraph: {
    title: "About Us - ImgReducer",
    description: "About ImgReducer. Our mission is to provide fast, secure, and private image optimization for everyone.",
    url: "https://www.img-reducer.com/about-us",
  },
};

export default function AboutUsPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    url: "https://www.img-reducer.com/about-us",
    mainEntity: {
      "@type": "Organization",
      "@id": "https://www.img-reducer.com/#organization",
      name: "ImgReducer",
      url: "https://www.img-reducer.com",
      logo: "https://www.img-reducer.com/favicon.png",
      description: "Fast, secure, and private image optimization for everyone.",
      sameAs: ["https://github.com/SreehariCoder1/ImgReducer"],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <AboutUs />
    </>
  );
}
