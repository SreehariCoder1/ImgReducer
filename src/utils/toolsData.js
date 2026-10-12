export const toolsData = [
  // --- Target Size Compressors ---
  {
    slug: "compress-image-to-20kb",
    category: "Size",
    categoryLabel: "Target File Size",
    title: "Compress Image to 20KB Online Free (JPG, PNG, WebP) - ImgReducer",
    metaDescription: "Compress image to 20KB or less online for free without losing quality. Ideal for UPSC, SSC, government portals, signatures, and job applications.",
    h1: "Compress Image to 20KB Online",
    subtitle: "Reduce JPG, PNG, and WebP files to exactly 20KB or less. Fast, free, and 100% private in your browser.",
    defaultSettings: {
      targetSize: 20,
      targetUnit: "KB",
      targetFormat: "image/jpeg",
      resizeMode: "size",
    },
    badge: "20KB Target Size",
    overview: [
      "Many government portals, exam registration systems (such as UPSC, SSC, IBPS, GATE), and job applications strictly mandate image uploads under 20KB. If your photo or signature is even 1KB over the limit, your submission is rejected.",
      "ImgReducer's 20KB compressor uses smart binary-search compression algorithms running entirely in your browser. It progressively optimizes the image resolution and compression level until it hits under 20KB while preserving facial clarity and readability.",
      "Best of all, your documents, photos, and signatures never leave your device. All processing happens locally with WebAssembly, ensuring 100% privacy for your sensitive IDs."
    ],
    features: [
      {
        title: "Guaranteed Under 20KB",
        description: "Precisely dials in compression to guarantee your file meets the 20KB upload threshold."
      },
      {
        title: "Safe for Signatures & IDs",
        description: "Zero cloud uploads. Your signature and identity proofs are processed privately in your browser."
      },
      {
        title: "Crisp Readability",
        description: "Preserves sharp edges and contrast so official documents and signatures pass verification."
      },
      {
        title: "Instant Batch Support",
        description: "Compress multiple candidate photos and signatures simultaneously in seconds."
      }
    ],
    howTo: [
      {
        step: 1,
        title: "Upload Your Photo or Signature",
        description: "Drag and drop or select your photo (JPG, PNG, or WebP). The tool automatically loads it locally."
      },
      {
        step: 2,
        title: "Verify the 20KB Target",
        description: "The target size is pre-set to 20 KB. You can adjust the format or fine-tune if needed."
      },
      {
        step: 3,
        title: "Download Compressed File",
        description: "Click Download. Your image is instantly processed and saved to your device ready for upload."
      }
    ],
    faqs: [
      {
        question: "Why do exam portals require images under 20KB?",
        answer: "Large government and university portals handle millions of applications simultaneously. Imposing strict 20KB limits on candidate photos and signatures ensures their database servers remain responsive and bandwidth costs stay low."
      },
      {
        question: "Will my signature or photo become unreadable at 20KB?",
        answer: "No. ImgReducer removes hidden EXIF metadata and optimizes chroma channels while keeping high visual contrast, so text, strokes, and faces remain clear and legible."
      },
      {
        question: "Is it safe to compress private ID photos and signatures here?",
        answer: "Yes, completely. Unlike other cloud-based compressors that send your files to external servers, ImgReducer processes everything client-side in your browser. Disconnect your Wi-Fi, and it still works!"
      }
    ],
    relatedSlugs: ["compress-image-to-50kb", "compress-image-to-100kb", "signature-resizer-online", "passport-photo-compressor"]
  },

  {
    slug: "compress-image-to-50kb",
    category: "Size",
    categoryLabel: "Target File Size",
    title: "Compress Image to 50KB Online Free (No Quality Loss) - ImgReducer",
    metaDescription: "Reduce JPG, PNG, and WebP image size to 50KB online. Free, secure, client-side compressor ideal for passports, visa applications, and student portals.",
    h1: "Compress Image to 50KB Online",
    subtitle: "Quickly reduce image file size to 50KB or less without blurry results. 100% private browser-based tool.",
    defaultSettings: {
      targetSize: 50,
      targetUnit: "KB",
      targetFormat: "image/jpeg",
      resizeMode: "size",
    },
    badge: "50KB Target Size",
    overview: [
      "50KB is the single most common file size restriction on the internet today. From passport renewals and visa portals (US Visa, Schengen, UK Visa) to corporate onboarding systems, 50KB is the industry gold standard.",
      "Compressing a modern 5MB smartphone photo down to 50KB without making it look pixelated requires intelligent optimization. ImgReducer strikes the perfect balance between dimension scaling and quality matrix adjustment.",
      "Because our compression engine runs inside your browser using WebAssembly, you don't have to worry about your personal photos sitting on someone else's server."
    ],
    features: [
      {
        title: "Exact 50KB Precision",
        description: "Automatically targets 50KB without manual trial-and-error slider adjustments."
      },
      {
        title: "Perfect for Passport & Visa",
        description: "Designed specifically to satisfy strict photo submission requirements."
      },
      {
        title: "100% Private & Offline",
        description: "Your pictures never touch external servers or cloud storage."
      },
      {
        title: "Works on All Devices",
        description: "Seamlessly compress photos directly from iPhone, Android, Mac, or Windows."
      }
    ],
    howTo: [
      {
        step: 1,
        title: "Select Your Image",
        description: "Drag and drop your photo or click to browse from your computer or phone."
      },
      {
        step: 2,
        title: "Confirm Settings",
        description: "The target size is already locked to 50KB. Feel free to tweak format or dimensions."
      },
      {
        step: 3,
        title: "Save Your 50KB Image",
        description: "Hit Download to generate your optimized image within milliseconds."
      }
    ],
    faqs: [
      {
        question: "How do I compress an image to exactly 50KB?",
        answer: "Simply upload your picture to this page. Our algorithm iteratively tests compression levels to ensure the final output file is under 50KB while retaining maximum visual clarity."
      },
      {
        question: "Can I compress images on my mobile phone?",
        answer: "Yes, ImgReducer is fully responsive and runs in mobile Safari, Chrome, and Firefox on both iOS and Android devices."
      },
      {
        question: "Does compressing to 50KB blur facial features?",
        answer: "Our algorithm uses selective chroma subsampling and dimension preservation so facial outlines and eyes remain sharp and clear for identity verification."
      }
    ],
    relatedSlugs: ["compress-image-to-20kb", "compress-image-to-100kb", "passport-photo-compressor", "heic-to-jpg"]
  },

  {
    slug: "compress-image-to-100kb",
    category: "Size",
    categoryLabel: "Target File Size",
    title: "Compress Image to 100KB Online Free - ImgReducer",
    metaDescription: "Compress JPG, PNG, and WebP images to 100KB online for free. Maintain high visual quality while reducing file size for web, email, and portals.",
    h1: "Compress Image to 100KB Online",
    subtitle: "Shrink images to 100KB or less for fast website loading, email attachments, and online forms.",
    defaultSettings: {
      targetSize: 100,
      targetUnit: "KB",
      targetFormat: "image/jpeg",
      resizeMode: "size",
    },
    badge: "100KB Target Size",
    overview: [
      "100KB is the sweet spot for modern web assets, blog images, email attachments, and profile pictures. At 100KB, images load almost instantaneously even on slower 4G mobile connections, while still delivering vibrant colors and crisp details.",
      "Most smartphone cameras produce files between 3MB and 12MB. Uploading these directly to websites slows page speeds and hurts Google SEO scores. ImgReducer shrinks those files by over 95% down to 100KB in seconds.",
      "Everything happens client-side using hardware-accelerated OffscreenCanvas and WebAssembly, so your images process at lightning speeds with zero privacy risks."
    ],
    features: [
      {
        title: "95%+ Size Reduction",
        description: "Effortlessly downsize multi-megabyte photos to a lightweight 100KB file."
      },
      {
        title: "Vibrant Color Retention",
        description: "Intelligent compression removes invisible metadata while preserving color accuracy."
      },
      {
        title: "Batch Optimization",
        description: "Compress up to 10 images at once to streamline your workflow."
      },
      {
        title: "Zero Quality Artifacts",
        description: "High-fidelity algorithms prevent banding and pixelation."
      }
    ],
    howTo: [
      {
        step: 1,
        title: "Upload Images",
        description: "Drag and drop one or several images onto the upload area."
      },
      {
        step: 2,
        title: "Check Target Limit",
        description: "Target size is configured to 100KB by default."
      },
      {
        step: 3,
        title: "Download",
        description: "Download your compressed images individually or sequentially."
      }
    ],
    faqs: [
      {
        question: "Why should web images be under 100KB?",
        answer: "Google's Core Web Vitals prioritize pages that load under 2.5 seconds (LCP). Keeping hero and blog images under 100KB dramatically reduces bandwidth consumption and accelerates page rendering."
      },
      {
        question: "Can I convert format while compressing to 100KB?",
        answer: "Yes, you can easily convert to WebP or JPG during the 100KB compression process for even higher compression efficiency."
      }
    ],
    relatedSlugs: ["compress-image-to-50kb", "compress-image-to-200kb", "png-to-webp", "jpg-to-webp"]
  },

  {
    slug: "compress-image-to-200kb",
    category: "Size",
    categoryLabel: "Target File Size",
    title: "Compress Image to 200KB Online Free - ImgReducer",
    metaDescription: "Reduce image size to 200KB without visible quality loss. Free online photo compressor for high-resolution web banners, social media, and presentations.",
    h1: "Compress Image to 200KB Online",
    subtitle: "Shrink high-resolution photography and graphic banners to 200KB. Keep maximum visual quality.",
    defaultSettings: {
      targetSize: 200,
      targetUnit: "KB",
      targetFormat: "image/jpeg",
      resizeMode: "size",
    },
    badge: "200KB Target Size",
    overview: [
      "When working with high-resolution hero banners, e-commerce product photos, or presentation slides, 50KB might be too aggressive. 200KB provides the perfect balance for rich, high-fidelity images that still load fast on mobile devices.",
      "ImgReducer optimizes your images down to 200KB by eliminating redundant pixel data, stripping bulky camera headers (EXIF, GPS, camera model tags), and optimizing color matrices.",
      "Enjoy frictionless, unlimited processing with no sign-ups, no fees, and complete client-side security."
    ],
    features: [
      {
        title: "High-Resolution Friendly",
        description: "Maintains larger canvas dimensions suitable for full-screen hero displays."
      },
      {
        title: "Privacy First",
        description: "Runs 100% in your browser; no server ever sees your files."
      },
      {
        title: "Clean Stripping of EXIF Data",
        description: "Removes location and camera metadata to protect your privacy and reduce bloat."
      },
      {
        title: "Instant Conversion",
        description: "Choose to export in JPEG, WebP, or PNG depending on your requirements."
      }
    ],
    howTo: [
      {
        step: 1,
        title: "Upload High-Res Photo",
        description: "Drop your 4K or high-resolution camera photo into the drop zone."
      },
      {
        step: 2,
        title: "Target 200KB",
        description: "The 200KB target size is automatically applied."
      },
      {
        step: 3,
        title: "Save",
        description: "Click Download to receive your web-optimized 200KB asset."
      }
    ],
    faqs: [
      {
        question: "Is 200KB small enough for website speed?",
        answer: "Yes, for wide desktop banners and full-width heroes, 150KB–200KB is the industry recommended maximum for achieving good Core Web Vitals scores."
      },
      {
        question: "What image formats can I compress to 200KB?",
        answer: "You can compress JPG, PNG, WebP, AVIF, SVG, and iPhone HEIC photos."
      }
    ],
    relatedSlugs: ["compress-image-to-100kb", "png-to-webp", "jpg-to-webp", "heic-to-jpg"]
  },

  // --- Format Converters ---
  {
    slug: "heic-to-jpg",
    category: "Format",
    categoryLabel: "Format Converter",
    title: "Convert HEIC to JPG Online Free (iPhone Photos) - ImgReducer",
    metaDescription: "Convert Apple HEIC photos to JPG online for free. Fast, client-side converter for iPhone images. No upload limits, no software install, 100% private.",
    h1: "Convert HEIC to JPG Online",
    subtitle: "Turn Apple iPhone HEIC pictures into universally compatible JPGs instantly in your browser. No files uploaded to servers.",
    defaultSettings: {
      targetSize: 100,
      targetUnit: "KB",
      targetFormat: "image/jpeg",
      resizeMode: "size",
    },
    badge: "HEIC to JPG",
    overview: [
      "iPhones capture photos in Apple's High Efficiency Image Container (.HEIC) format by default. While great for conserving iPhone storage, HEIC files are notorious for failing to open on Windows PCs, Android devices, website uploaders, and government forms.",
      "ImgReducer solves this instantly by decoding HEIC files directly in your web browser using modern WebAssembly. There is no software to install and no cloud server uploading your personal gallery.",
      "Convert your HEIC photos into standard, universally compatible JPG files with customizable compression and zero quality loss."
    ],
    features: [
      {
        title: "Direct iPhone Support",
        description: "Upload .HEIC and .HEIF photos directly from your Apple device or desktop."
      },
      {
        title: "100% Private (No Cloud Upload)",
        description: "Most online HEIC converters upload your personal photos to their servers. ImgReducer runs completely on your local device."
      },
      {
        title: "Universal Compatibility",
        description: "Output standard JPEG images that open on any PC, Android, Mac, or web application."
      },
      {
        title: "Built-In Compression",
        description: "Optionally compress your photos to target file sizes like 50KB or 100KB while converting."
      }
    ],
    howTo: [
      {
        step: 1,
        title: "Upload HEIC Files",
        description: "Select or drag your .heic photos directly into the converter."
      },
      {
        step: 2,
        title: "Confirm JPG Format",
        description: "Output format is preset to JPG. You can also specify an exact target size if needed."
      },
      {
        step: 3,
        title: "Download Compatible JPGs",
        description: "Click Download to save your photos in standard JPG format."
      }
    ],
    faqs: [
      {
        question: "Why can't I open HEIC photos on my computer?",
        answer: "HEIC is a proprietary container created by MPEG and adopted by Apple in iOS 11. Older Windows systems and standard photo viewers lack native HEIC decoders, which is why converting to JPG is necessary."
      },
      {
        question: "Is it safe to convert private iPhone photos here?",
        answer: "Yes, 100%. ImgReducer uses in-browser WebAssembly (heic2any) to decode the image locally. Your photos are never transferred across the internet."
      },
      {
        question: "Can I convert multiple HEIC photos at once?",
        answer: "Yes! You can upload up to 10 HEIC files simultaneously and batch-convert them into JPG."
      }
    ],
    relatedSlugs: ["compress-image-to-50kb", "jpg-to-webp", "png-to-webp", "passport-photo-compressor"]
  },

  {
    slug: "png-to-webp",
    category: "Format",
    categoryLabel: "Format Converter",
    title: "Convert PNG to WebP Online Free (Reduce File Size by 70%) - ImgReducer",
    metaDescription: "Convert PNG to WebP online for free. Cut image file sizes by up to 70% while keeping transparent backgrounds. Improve website speed and Core Web Vitals.",
    h1: "Convert PNG to WebP Online",
    subtitle: "Transform heavy PNG images into ultra-lightweight WebP files with full transparency support. Boost page speed instantly.",
    defaultSettings: {
      targetSize: 100,
      targetUnit: "KB",
      targetFormat: "image/webp",
      resizeMode: "size",
    },
    badge: "PNG to WebP",
    overview: [
      "PNGs are great for transparent logos and crisp graphics, but their lossless nature means they often bloat to 1MB or more. Modern web standards favor WebP, a Google-developed image format that retains transparency while cutting file size by 30% to 70%.",
      "By converting your PNG assets to WebP using ImgReducer, your website loads significantly faster, improving Google Core Web Vitals (LCP) and lowering bounce rates.",
      "The conversion happens entirely in your browser using native HTML5 Canvas encoding, providing maximum speed and zero privacy leaks."
    ],
    features: [
      {
        title: "Full Transparency Preservation",
        description: "WebP retains alpha channels so your transparent logos and icons remain flawless."
      },
      {
        title: "Up to 70% Smaller",
        description: "Dramatically smaller file sizes compared to traditional PNG compression."
      },
      {
        title: "Faster Web Pages & Better SEO",
        description: "Smaller images directly improve your Google Lighthouse and Core Web Vitals scores."
      },
      {
        title: "Client-Side Processing",
        description: "Lightning-fast conversions executed on your own device hardware."
      }
    ],
    howTo: [
      {
        step: 1,
        title: "Upload PNG Files",
        description: "Drag and drop your transparent or regular PNG images."
      },
      {
        step: 2,
        title: "WebP is Selected",
        description: "The output format is pre-configured to WebP."
      },
      {
        step: 3,
        title: "Download",
        description: "Download your lightweight WebP files immediately."
      }
    ],
    faqs: [
      {
        question: "Does WebP support transparent backgrounds?",
        answer: "Yes! Unlike JPG, WebP fully supports alpha-channel transparency, making it the ideal modern replacement for PNG."
      },
      {
        question: "Do modern browsers support WebP?",
        answer: "Yes, over 97% of all web browsers worldwide (including Chrome, Safari, Firefox, Edge, and iOS/Android) natively support WebP."
      }
    ],
    relatedSlugs: ["webp-to-png", "jpg-to-webp", "compress-image-to-100kb", "heic-to-jpg"]
  },

  {
    slug: "webp-to-png",
    category: "Format",
    categoryLabel: "Format Converter",
    title: "Convert WebP to PNG Online Free (High Quality) - ImgReducer",
    metaDescription: "Convert WebP images to high-quality PNG online for free. Keep transparency and unlock editing in Photoshop, Word, and older graphics software.",
    h1: "Convert WebP to PNG Online",
    subtitle: "Easily convert WebP images back into standard PNG format for editing, printing, and universal software compatibility.",
    defaultSettings: {
      targetSize: 200,
      targetUnit: "KB",
      targetFormat: "image/png",
      resizeMode: "size",
    },
    badge: "WebP to PNG",
    overview: [
      "Ever downloaded an image from a website only to find it's a `.webp` file that your image editor, Word document, or printing tool cannot open? WebP is fantastic for the web, but legacy software frequently refuses to work with it.",
      "ImgReducer's WebP to PNG converter allows you to instantly revert any WebP file back into a standard, lossless PNG. Transparent backgrounds are completely preserved, and image sharpness is 100% maintained.",
      "No uploads, no software installations, and no watermarks—just clean, private conversion in your browser."
    ],
    features: [
      {
        title: "Universal Software Support",
        description: "PNGs open natively in Photoshop, Microsoft Office, Canva, and every operating system."
      },
      {
        title: "Alpha Transparency Preserved",
        description: "Transparent backgrounds in your WebP graphics are accurately retained in the PNG output."
      },
      {
        title: "Lossless Quality",
        description: "Converts pixel-by-pixel with no compression artifacts."
      },
      {
        title: "Private & Safe",
        description: "All conversions occur in your local browser sandbox."
      }
    ],
    howTo: [
      {
        step: 1,
        title: "Upload WebP File",
        description: "Select or drop your WebP image onto the converter."
      },
      {
        step: 2,
        title: "Confirm PNG Selection",
        description: "Target format is pre-configured to PNG."
      },
      {
        step: 3,
        title: "Download PNG",
        description: "Hit Download to save the PNG file to your computer or phone."
      }
    ],
    faqs: [
      {
        question: "Why do downloaded web images save as WebP?",
        answer: "Websites use WebP because it loads faster and consumes less bandwidth than PNG or JPG. However, converting it back to PNG is necessary if you need to edit it in older creative software."
      },
      {
        question: "Will converting WebP to PNG lower image quality?",
        answer: "No. The decoding and encoding pipeline translates the visual data directly without introducing extra compression noise."
      }
    ],
    relatedSlugs: ["png-to-webp", "jpg-to-webp", "heic-to-jpg", "compress-image-to-100kb"]
  },

  {
    slug: "jpg-to-webp",
    category: "Format",
    categoryLabel: "Format Converter",
    title: "Convert JPG to WebP Online Free - ImgReducer",
    metaDescription: "Convert JPG/JPEG photos to modern WebP format online for free. Drastically reduce file sizes for faster website speeds and better SEO.",
    h1: "Convert JPG to WebP Online",
    subtitle: "Switch from legacy JPEG to Google's next-generation WebP format. Cut image bandwidth by 30% or more.",
    defaultSettings: {
      targetSize: 100,
      targetUnit: "KB",
      targetFormat: "image/webp",
      resizeMode: "size",
    },
    badge: "JPG to WebP",
    overview: [
      "JPEG has powered the web for over 30 years, but modern web performance demands more efficient compression. Google developed WebP specifically to deliver comparable or superior image fidelity at 25% to 34% smaller file sizes than JPEG.",
      "Converting your blog photos, product catalogs, and website assets to WebP drastically improves your Google PageSpeed Insights and Lighthouse scores.",
      "With ImgReducer, conversion is completely client-side. Convert photos one by one or in batches of up to 10 without uploading a single byte to external servers."
    ],
    features: [
      {
        title: "30%+ Smaller than JPEG",
        description: "Significantly lighter files with identical perceived visual quality."
      },
      {
        title: "Boost SEO & Core Web Vitals",
        description: "Google rewards fast websites. Faster image loads mean higher search rankings."
      },
      {
        title: "Instant In-Browser Speed",
        description: "Runs via native browser APIs for sub-second conversions."
      },
      {
        title: "Zero Data Stored",
        description: "Your pictures remain on your computer; we never store your files."
      }
    ],
    howTo: [
      {
        step: 1,
        title: "Upload JPG/JPEG",
        description: "Drop your JPEG photos into the upload zone."
      },
      {
        step: 2,
        title: "WebP is Configured",
        description: "The converter is preset to WebP format."
      },
      {
        step: 3,
        title: "Save WebP",
        description: "Download your newly optimized WebP files ready for the web."
      }
    ],
    faqs: [
      {
        question: "Why should I convert JPG to WebP?",
        answer: "WebP offers superior lossy compression compared to JPEG. A 500KB JPEG can typically be compressed to 300KB or less in WebP format with zero noticeable change in quality."
      },
      {
        question: "Can I use WebP on WordPress or Shopify?",
        answer: "Yes, both WordPress (version 5.8+) and Shopify natively support WebP images."
      }
    ],
    relatedSlugs: ["png-to-webp", "heic-to-jpg", "compress-image-to-100kb", "compress-image-to-50kb"]
  },

  {
    slug: "avif-to-jpg",
    category: "Format",
    categoryLabel: "Format Converter",
    title: "Convert AVIF to JPG Online Free - ImgReducer",
    metaDescription: "Convert AVIF images to standard JPG format online for free. Fast, private in-browser converter to make AVIF photos compatible with any device.",
    h1: "Convert AVIF to JPG Online",
    subtitle: "Convert modern AVIF images into standard JPG files for universal compatibility on all operating systems and software.",
    defaultSettings: {
      targetSize: 100,
      targetUnit: "KB",
      targetFormat: "image/jpeg",
      resizeMode: "size",
    },
    badge: "AVIF to JPG",
    overview: [
      "AVIF (AV1 Image File Format) is an ultra-modern image format offering incredible compression. However, compatibility is still limited: many image viewers, social media uploaders, email clients, and older computers cannot open AVIF files.",
      "ImgReducer's AVIF to JPG converter bridges this gap. It reads your AVIF file locally and converts it into a universally supported JPEG with rich color rendering and high compatibility.",
      "Enjoy unlimited conversions with zero tracking, no watermarks, and complete browser-level privacy."
    ],
    features: [
      {
        title: "Open Anywhere",
        description: "Convert stubborn AVIF files into standard JPGs that open in any app."
      },
      {
        title: "Lossless Decoding",
        description: "Captures full dynamic color range and resolution."
      },
      {
        title: "Private & Local",
        description: "Your AVIF images are processed in your browser without cloud uploads."
      },
      {
        title: "Batch Convert",
        description: "Convert multiple AVIF files at once."
      }
    ],
    howTo: [
      {
        step: 1,
        title: "Upload AVIF Image",
        description: "Drop your .avif files into the converter."
      },
      {
        step: 2,
        title: "Preset to JPG",
        description: "JPG output is pre-selected for maximum compatibility."
      },
      {
        step: 3,
        title: "Download",
        description: "Click Download to receive your universal JPG images."
      }
    ],
    faqs: [
      {
        question: "Why won't my computer open an AVIF file?",
        answer: "AVIF requires an AV1 video codec decoder, which older versions of Windows and macOS lack. Converting to JPG solves this immediately."
      },
      {
        question: "Can I convert AVIF back to PNG or WebP as well?",
        answer: "Yes, you can select PNG, WebP, or JPG as your target output format in the image card settings."
      }
    ],
    relatedSlugs: ["heic-to-jpg", "webp-to-png", "compress-image-to-100kb", "jpg-to-webp"]
  },

  // --- Use-Case Presets ---
  {
    slug: "passport-photo-compressor",
    category: "Preset",
    categoryLabel: "Use-Case Tool",
    title: "Passport Photo Compressor Online Free (Under 50KB / 20KB) - ImgReducer",
    metaDescription: "Compress passport photos to 50KB or 20KB online for free. Guaranteed to meet US Visa, Schengen, Indian Passport, and online portal specifications.",
    h1: "Passport Photo Compressor Online",
    subtitle: "Compress and resize passport and visa photos to meet strict government portal requirements. 100% private & secure.",
    defaultSettings: {
      targetSize: 50,
      targetUnit: "KB",
      targetFormat: "image/jpeg",
      resizeMode: "size",
    },
    badge: "Passport & Visa Photo",
    overview: [
      "Government passport and visa portals (such as the US State Department DS-160, Schengen Visa, UK Visas and Immigration, and Indian Passport Seva) have notoriously strict image upload constraints. Uploads are routinely rejected if file sizes exceed 50KB or if facial dimensions get warped.",
      "ImgReducer's Passport Photo Compressor is specially tuned for identity photos. It reduces file size to under 50KB (or 20KB) while keeping facial contours, eye clarity, and natural lighting crisp and uncompressed.",
      "Most importantly, **your passport photo never touches a remote server**. Because ImgReducer runs completely client-side in your browser, your biometric identity remains 100% private."
    ],
    features: [
      {
        title: "Strict Portal Compliance",
        description: "Effortlessly targets exact requirements like under 50KB or under 20KB."
      },
      {
        title: "100% Biometric Privacy",
        description: "Never upload sensitive personal ID photos to unknown third-party servers. All processing stays on your device."
      },
      {
        title: "Facial Sharpness Protection",
        description: "Prioritizes high contrast on facial features to prevent automated portal rejection."
      },
      {
        title: "Works for All Visas",
        description: "Compliant with US Visa, Schengen Visa, Canadian PR, Australian Visa, and Indian Passport portals."
      }
    ],
    howTo: [
      {
        step: 1,
        title: "Upload Passport Photo",
        description: "Upload your white-background passport headshot from your phone or PC."
      },
      {
        step: 2,
        title: "Select Target Size",
        description: "Pre-set to 50KB. Change to 20KB if your specific portal demands a stricter limit."
      },
      {
        step: 3,
        title: "Download Verified Photo",
        description: "Save your compliant passport photo and upload directly to your portal."
      }
    ],
    faqs: [
      {
        question: "What is the standard size for passport photos online?",
        answer: "Most international visa and passport upload systems require images to be between 10KB and 50KB in JPEG format."
      },
      {
        question: "Is it safe to compress my official passport photo here?",
        answer: "Yes, absolutely. ImgReducer runs purely inside your browser using WebAssembly. Disconnect your internet connection after loading the page and it will still compress your photo perfectly. We never see or store your pictures."
      },
      {
        question: "Can I also compress my signature for the same application?",
        answer: "Yes, use our dedicated Signature Resizer tool which targets 20KB or 10KB for official signature uploads."
      }
    ],
    relatedSlugs: ["signature-resizer-online", "compress-image-to-50kb", "compress-image-to-20kb", "heic-to-jpg"]
  },

  {
    slug: "signature-resizer-online",
    category: "Preset",
    categoryLabel: "Use-Case Tool",
    title: "Signature Resizer Online Free (Compress to 10KB - 20KB) - ImgReducer",
    metaDescription: "Resize and compress signature images to 10KB - 20KB online for free. Ideal for UPSC, SSC, IBPS, banking, and government exam registration forms.",
    h1: "Signature Resizer & Compressor Online",
    subtitle: "Compress scanned signatures to under 20KB with razor-sharp pen strokes and transparent or white backgrounds.",
    defaultSettings: {
      targetSize: 20,
      targetUnit: "KB",
      targetFormat: "image/jpeg",
      resizeMode: "size",
    },
    badge: "Signature Resizer",
    overview: [
      "Job application portals and competitive examination systems (UPSC, SSC, IBPS, Railways, GATE, State PSCs) require candidates to upload a scanned specimen signature, usually with a strict size limit between 10KB and 20KB.",
      "Ordinary image editors often smear ink strokes, turn paper backgrounds gray, or produce blurry signatures that fail automated verification. ImgReducer's algorithm sharpens pen strokes and removes background compression noise to pass verification with flying colors.",
      "Your signature is an essential legal identifier. Unlike cloud converters that store uploaded files, ImgReducer processes everything client-side in your browser, guaranteeing total security."
    ],
    features: [
      {
        title: "Strict 10KB - 20KB Compliance",
        description: "Easily hits the strict 20KB or 10KB ceiling required by examination boards."
      },
      {
        title: "Razor-Sharp Ink Lines",
        description: "Specialized edge preservation prevents signature strokes from fading or blurring."
      },
      {
        title: "Total Legal Security",
        description: "Your signature never leaves your device. No cloud storage, no logs, zero tracking."
      },
      {
        title: "Instant Mobile Photo Conversion",
        description: "Snap a photo of your signature with your phone and compress it immediately."
      }
    ],
    howTo: [
      {
        step: 1,
        title: "Upload Scanned Signature",
        description: "Upload a cropped photo or scan of your signature on white paper."
      },
      {
        step: 2,
        title: "Verify Target 20KB",
        description: "Target size is pre-set to 20KB for maximum portal compatibility."
      },
      {
        step: 3,
        title: "Download & Upload",
        description: "Download your compressed signature ready for immediate portal submission."
      }
    ],
    faqs: [
      {
        question: "Why does my signature get rejected on exam portals?",
        answer: "Portals reject signatures if they exceed the file size limit (often 20KB) or if compression makes the pen strokes too faint or pixelated to verify."
      },
      {
        question: "How do I get the best results from a mobile phone photo of my signature?",
        answer: "Sign with a dark blue or black pen on plain unlined white paper. Crop tightly around the signature before uploading, then let ImgReducer compress it to 20KB."
      },
      {
        question: "Does anyone have access to my signature?",
        answer: "No. The entire compression process takes place inside your browser. No files are uploaded to any server."
      }
    ],
    relatedSlugs: ["passport-photo-compressor", "compress-image-to-20kb", "compress-image-to-50kb", "heic-to-jpg"]
  }
];
