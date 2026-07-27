import PrivacyPolicy from "../../components/PrivacyPolicy";

export const metadata = {
  title: "Privacy Policy - ImgReducer",
  description: "Privacy Policy for ImgReducer. Learn how we handle your data with 100% client-side processing.",
  alternates: {
    canonical: "https://www.img-reducer.com/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy - ImgReducer",
    description: "Privacy Policy for ImgReducer. Learn how we handle your data with 100% client-side processing.",
    url: "https://www.img-reducer.com/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
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
        "name": "Privacy Policy",
        "item": "https://www.img-reducer.com/privacy-policy"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <PrivacyPolicy />
    </>
  );
}
