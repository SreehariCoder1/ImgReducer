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
  return <TermsOfService />;
}
