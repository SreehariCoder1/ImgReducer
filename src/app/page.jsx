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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is it safe to use ImgReducer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, absolutely. Unlike other online tools that upload your photos to a remote server for processing, ImgReducer runs entirely in your browser using modern WebAssembly technology. This means your images never leave your device. You can even disconnect from the internet after loading the page, and the tool will still work perfectly. Your privacy is our top priority."
        }
      },
      {
        "@type": "Question",
        "name": "What image formats are supported?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We support all modern image formats. You can upload JPG/JPEG, PNG, WebP, AVIF, SVG, and HEIC. The tool can convert between these formats as well. For example, you can convert a batch of HEIC photos from your iPhone directly to JPEG or WebP for better compatibility with websites and Windows devices."
        }
      },
      {
        "@type": "Question",
        "name": "Does compression reduce image quality?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "It depends on the method you choose. Lossless compression reduces file size without removing any image data, keeping the quality 100% identical to the original. Lossy compression (which we use for high reduction) intelligently removes data that the human eye cannot easily perceive. Our advanced algorithms ensure that even with significant size reduction, your images look crisp and professional to the naked eye."
        }
      },
      {
        "@type": "Question",
        "name": "Is this tool free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, ImgReducer is 100% free to use for both personal and commercial projects. There are no hidden fees, watermarks, or daily limits. We rely on ads to keep the website running and the tool free for everyone."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Use ImgReducer",
    "description": "Optimizing your images for the web has never been easier. ImgReducer provides a seamless, client-side experience that respects your privacy while delivering top-tier compression results. Follow this simple guide to get started.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Uploading your images",
        "text": "To begin, simply drag and drop/paste/click to upload your images into the designated drop zone at the top of the page. ImgReducer supports a wide variety of formats including JPG, PNG, SVG, WebP, AVIF, and even HEIC files from iPhones. You can upload multiple files at once for batch processing, making it perfect for photographers and developers managing large assets."
      },
      {
        "@type": "HowToStep",
        "name": "Choosing compression settings",
        "text": "Once your images are loaded, you have full control over the output. You can choose to compress by Target Filesize (e.g., '50KB') or by Quality Percentage. If you need images for a specific platform with strict size limits (like email attachments or government portals), simply enter the desired size, and our algorithm will iteratively adjust the quality to match it. You can easily convert image formats, such as changing a heavy PNG into a lightweight WebP, with just one click."
      },
      {
        "@type": "HowToStep",
        "name": "Downloading",
        "text": "Once you are satisfied with your compression settings, click the Download button on an image card. The button will show 'Processing...' while the image is being processed. Once processing is successful, the button text will change to 'Saved' and your image(s) will be automatically downloaded to your system in the selected size and format. You can click Download on multiple images; they will be downloaded one by one in a queue."
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([schema, breadcrumbSchema, faqSchema, howToSchema]) }}
      />
      <Home />
    </>
  );
}
