import TermsOfService from "../../components/TermsOfService";

export const metadata = {
  title: "Terms of Service - ImgReducer",
  description: "Terms of Service for ImgReducer. Read our conditions of use.",
  alternates: {
    canonical: "https://www.img-reducer.com/terms-of-service",
  },
  openGraph: {
    title: "Terms of Service - ImgReducer",
    description: "Terms of Service for ImgReducer. Read our conditions of use.",
    url: "https://www.img-reducer.com/terms-of-service",
  },
};

export default function TermsOfServicePage() {
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
        "name": "Terms of Service",
        "item": "https://www.img-reducer.com/terms-of-service"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <TermsOfService />
    </>
  );
}
