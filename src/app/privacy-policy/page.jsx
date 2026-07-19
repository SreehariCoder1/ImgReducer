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
  return <PrivacyPolicy />;
}
