import { notFound } from "next/navigation";
import Home from "../../components/Home";
import { toolsData } from "../../utils/toolsData";

export const dynamicParams = false;

export async function generateStaticParams() {
  return toolsData.map((tool) => ({
    slug: tool.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const tool = toolsData.find((t) => t.slug === slug);

  if (!tool) return {};

  const url = `https://www.img-reducer.com/${slug}`;

  return {
    title: tool.title,
    description: tool.metaDescription,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: tool.title,
      description: tool.metaDescription,
      url: url,
      type: "website",
      images: ["/favicon.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: tool.title,
      description: tool.metaDescription,
    },
  };
}

export default async function ToolPage({ params }) {
  const { slug } = await params;
  const tool = toolsData.find((t) => t.slug === slug);

  if (!tool) {
    notFound();
  }

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": `https://www.img-reducer.com/${slug}#webapp`,
    name: tool.h1,
    url: `https://www.img-reducer.com/${slug}`,
    description: tool.metaDescription,
    applicationCategory: "MultimediaApplication",
    operatingSystem: "All",
    creator: {
      "@type": "Organization",
      name: "ImgReducer",
      url: "https://www.img-reducer.com",
    },
    featureList: tool.features.map((f) => f.title),
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.img-reducer.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: tool.h1,
        item: `https://www.img-reducer.com/${slug}`,
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: tool.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to use ${tool.h1}`,
    description: tool.subtitle,
    step: tool.howTo.map((item) => ({
      "@type": "HowToStep",
      name: item.title,
      text: item.description,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            webAppSchema,
            breadcrumbSchema,
            faqSchema,
            howToSchema,
          ]),
        }}
      />
      <Home toolData={tool} />
    </>
  );
}
