import "../styles/global.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Script from "next/script";


export const metadata = {
  metadataBase: new URL("https://www.img-reducer.com/"),
  robots: "index, follow",
  verification: {
    google: "Q-Y3ggZeCu-APAugfvz_hMM7G7nwD2s-GXk71WJuSgg",
  },
  openGraph: {
    type: "website",
    images: ["/favicon.png"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Microsoft Clarity */}
        <Script
          id="clarity-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function (c, l, a, r, i, t, y) {
                c[a] =
                  c[a] ||
                  function () {
                    (c[a].q = c[a].q || []).push(arguments);
                  };
                t = l.createElement(r);
                t.async = 1;
                t.src = "https://www.clarity.ms/tag/" + i;
                y = l.getElementsByTagName(r)[0];
                y.parentNode.insertBefore(t, y);
              })(window, document, "clarity", "script", "wy2km5gea0");
            `,
          }}
        />

        {/* Google Analytics (gtag.js) */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-23TKFZLRC8"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag() {
                dataLayer.push(arguments);
              }
              gtag("js", new Date());
              gtag("config", "G-23TKFZLRC8");
            `,
          }}
        />

        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7428192121125610"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body>
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
